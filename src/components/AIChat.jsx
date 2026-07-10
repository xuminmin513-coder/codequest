import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { STORAGE } from '../utils/storage';

const API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-v4-pro';

export default function AIChat({ lessonContent, language }) {
  const { lang, addToast, navigateTo } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSystemPrompt = () => {
    const zh = `你是编程教学助手，帮助学生学习 Python。当前关卡内容是：\n\n${lessonContent || '无'}\n\n请用中文回答，给出简洁的提示和代码示例，不要直接给出完整答案，引导学生自己思考。`;
    const en = `You are a coding tutor helping students learn Python. The current lesson content is:\n\n${lessonContent || 'None'}\n\nAnswer in English, give concise hints and code examples. Guide students to think rather than giving the full answer.`;
    return lang === 'zh' ? zh : en;
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const apiKey = STORAGE.getDeepSeekKey();
    if (!apiKey) {
      addToast('error', '⚠️', lang === 'zh' ? '请先在设置中配置 DeepSeek API Key' : 'Configure DeepSeek API Key in Settings');
      navigateTo('settings');
      return;
    }

    const userMsg = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: getSystemPrompt() },
            ...updated,
          ],
          temperature: 1.0,
          top_p: 1.0,
          max_tokens: 2048,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API error (${res.status}): ${err}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || '(no response)';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      addToast('error', '❌', `${lang === 'zh' ? '请求失败' : 'Request failed'}: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    addToast('info', '🗑️', lang === 'zh' ? '对话已清空' : 'Chat cleared');
  };

  return (
    <>
      <button
        className="btn btn-pixel btn-ai"
        onClick={() => setOpen(!open)}
        title={lang === 'zh' ? 'AI 助手' : 'AI Assistant'}
      >
        🤖 {open ? '✕' : (lang === 'zh' ? 'AI 助手' : 'AI Help')}
      </button>

      {open && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <span>🤖 DeepSeek V4-Pro</span>
            <div className="ai-chat-actions">
              <button className="ai-chat-clear" onClick={clearChat} title={lang === 'zh' ? '清空对话' : 'Clear chat'}>
                🗑️
              </button>
            </div>
          </div>
          <div className="ai-chat-messages">
            {messages.length === 0 && (
              <div className="ai-chat-empty">
                {lang === 'zh'
                  ? '遇到难题了吗？在这里向 AI 提问获取帮助吧！'
                  : 'Stuck? Ask AI for help here!'}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ${msg.role}`}>
                <div className="ai-msg-label">{msg.role === 'user' ? '👤' : '🤖'}</div>
                <div className="ai-msg-content">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg assistant">
                <div className="ai-msg-label">🤖</div>
                <div className="ai-msg-content ai-thinking">...</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="ai-chat-input-area">
            <textarea
              className="ai-chat-input"
              placeholder={lang === 'zh' ? '输入你的问题...' : 'Ask a question...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              disabled={loading}
            />
            <button className="btn btn-pixel btn-primary ai-send-btn" onClick={sendMessage} disabled={loading}>
              {loading ? '...' : '➤'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
