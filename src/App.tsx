import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, BookOpen, Video, Moon, Sun, GraduationCap, Menu, X } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { LessonPage } from './pages/LessonPage';
import { VeoGenerator } from './pages/VeoGenerator';
import { AIChat } from './components/AIChat';

type View = 'dashboard' | 'lesson' | 'veo';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigateToLesson = (id: string) => {
    setSelectedLesson(id);
    setCurrentView('lesson');
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <GraduationCap size={24} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">Metallurgy Lab</span>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentView === 'dashboard' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('veo')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentView === 'veo' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Video size={20} /> Veo Visualizer
            </button>
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold"
            >
              <div className="flex items-center gap-3">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
              <div className={`w-10 h-5 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-primary' : 'bg-slate-300'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-500">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-display font-bold text-lg">Metallurgy Lab</span>
          <div className="w-8" />
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView + (selectedLesson || '')}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'dashboard' && <Dashboard onSelectLesson={navigateToLesson} />}
              {currentView === 'lesson' && selectedLesson && (
                <LessonPage lessonId={selectedLesson} onBack={() => setCurrentView('dashboard')} />
              )}
              {currentView === 'veo' && <VeoGenerator />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AIChat />
    </div>
  );
}
