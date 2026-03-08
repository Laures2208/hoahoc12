import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Trophy, Clock, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { LESSONS } from '../constants';
import { Progress } from '../types';

export const Dashboard = ({ onSelectLesson }: { onSelectLesson: (id: string) => void }) => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const userEmail = "mainamanh22082008@gmail.com"; // In a real app, this would come from auth

  useEffect(() => {
    fetch(`/api/progress/${userEmail}`)
      .then(res => res.json())
      .then(data => setProgress(data));
  }, []);

  const completedCount = progress.filter(p => p.completed).length;
  const avgScore = progress.length > 0 ? Math.round(progress.reduce((acc, p) => acc + p.score, 0) / progress.length) : 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">Welcome back, Student!</h1>
          <p className="text-slate-500 mt-1">Ready to master the science of metal extraction?</p>
        </div>
        <div className="flex gap-4">
          <div className="glass p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Avg. Score</p>
              <p className="text-xl font-display font-bold">{avgScore}%</p>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-accent/10 text-accent rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Completed</p>
              <p className="text-xl font-display font-bold">{completedCount}/{LESSONS.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LESSONS.map((lesson, i) => {
          const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
          const isCompleted = lessonProgress?.completed;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectLesson(lesson.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-xl transition-all relative overflow-hidden"
            >
              {isCompleted && (
                <div className="absolute top-4 right-4 text-accent">
                  <CheckCircle size={20} fill="currentColor" className="text-white" />
                </div>
              )}
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2">{lesson.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{lesson.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  {isCompleted ? 'Review' : 'Start Lesson'} <ArrowRight size={14} />
                </span>
                {lessonProgress && (
                  <span className="text-xs text-slate-400 font-mono">{lessonProgress.score}% Score</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles size={24} />
            <h2 className="text-2xl font-display font-bold">AI Suggested Path</h2>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300 italic">
              "Based on your recent activity, you should focus on **Molten Electrolysis**. It's the most complex method and often appears in exams. Try the interactive diagram to visualize the ion flow!"
            </p>
          </div>
          <button 
            onClick={() => onSelectLesson('electro')}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            Jump to Electrolysis <ArrowRight size={20} />
          </button>
        </div>

        <div className="glass p-8 rounded-3xl flex flex-col justify-center items-center text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Clock size={40} />
          </div>
          <h3 className="text-xl font-display font-bold">Study Streak</h3>
          <p className="text-slate-500">You've studied for 3 days in a row! Keep it up to unlock the "Metallurgist" badge.</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(d => (
              <div key={d} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${d <= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'}`}>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
