import React, { createContext, useContext, useState, useCallback } from 'react';
import { STORAGE } from '../utils/storage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => STORAGE.getLang());
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageData, setPageData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toasts, setToasts] = useState([]);

  const setLang = useCallback((l) => {
    STORAGE.setLang(l);
    setLangState(l);
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = lang === 'zh' ? 'en' : 'zh';
    setLang(newLang);
    addToast('info', '🌐', newLang === 'en' ? 'Switched to English' : '已切换到中文');
  }, [lang]);

  const navigateTo = useCallback((page, data) => {
    setCurrentPage(page);
    setPageData(data || null);
  }, []);

  const refresh = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const addToast = useCallback((type, icon, message, sub) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, icon, message, sub }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      lang, setLang, toggleLanguage,
      currentPage, navigateTo, pageData,
      refreshKey, refresh,
      toasts, addToast, removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
