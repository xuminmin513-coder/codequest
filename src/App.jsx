import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { STORAGE } from './utils/storage';
import { GAMIFICATION } from './utils/gamification';
import { CHAPTERS } from './data/courses';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CourseMap from './components/CourseMap';
import Lesson from './components/Lesson';
import Achievements from './components/Achievements';
import Settings from './components/Settings';
import ReviewList from './components/ReviewList';
import Shortcuts from './components/Shortcuts';
import Graduation from './components/Graduation';
import Toast from './components/Toast';
import './styles/global.css';

function PageRouter() {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'courses':
      return <CourseMap />;
    case 'lesson':
      return <Lesson />;
    case 'achievements':
      return <Achievements />;
    case 'settings':
      return <Settings />;
    case 'reviews':
      return <ReviewList />;
    case 'shortcuts':
      return <Shortcuts />;
    case 'graduation':
      return <Graduation />;
    default:
      return <Dashboard />;
  }
}

function AppContent() {
  const { addToast, refresh } = useApp();

  useEffect(() => {
    // Check daily streak on mount
    const streak = STORAGE.getStreak();
    if (streak > 0 && streak % 7 === 0) {
      const lang = STORAGE.getLang();
      addToast('info', '🔥', `${lang === 'zh' ? '连续学习' : 'Streak'} ${streak} ${lang === 'zh' ? '天！' : 'days!'}`);
    }

    // Migrate old progress to review data
    STORAGE.migrateReviewData();
    refresh();

    // Global keyboard shortcuts
    const handleKeyDown = (e) => {
      // Escape to go back to courses
      if (e.key === 'Escape') {
        // Let Lesson component handle its own state
        const lessonPage = document.getElementById('page-lesson');
        // We can't easily detect lesson page from here, so skip
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <PageRouter />
      </main>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
