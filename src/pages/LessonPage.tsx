import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, GraduationCap, Sparkles, Play, Loader2, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { LESSONS, QUIZZES } from '../constants';
import { Quiz } from '../components/Quiz';
import { BlastFurnaceDiagram, ElectrolysisDiagram } from '../components/Diagrams';

interface LessonPageProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonPage = ({ lessonId, onBack }: LessonPageProps) => {
  const [view, setView] = useState<'content' | 'quiz'>('content');
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const lesson = LESSONS.find(l => l.id === lessonId);
  const quiz = QUIZZES[lessonId];

  if (!lesson) return null;

  const handleQuizComplete = (score: number) => {
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "mainamanh22082008@gmail.com",
        lesson_id: lessonId,
        completed: 1,
        score
      })
    });
  };

  const askAIExplanation = async (concept: string) => {
    setIsExplaining(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [{ role: 'user', parts: [{ text: `Explain the concept of "${concept}" in the context of ${lesson.title} for a high school student. Keep it concise and use an analogy.` }] }]
      });
      setAiExplanation(response.text || "Could not generate explanation.");
    } catch (error) {
      console.error(error);
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
            <p className="text-slate-500">{lesson.description}</p>
          </div>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button 
            onClick={() => setView('content')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${view === 'content' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Study
          </button>
          <button 
            onClick={() => setView('quiz')}
            className={`px-6 py-2 rounded-lg font-bold transition-all ${view === 'quiz' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Quiz
          </button>
        </div>
      </div>

      {view === 'content' ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="glass p-8 rounded-3xl prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
            
            <div className="mt-8 flex flex-wrap gap-3 not-prose">
              <button 
                onClick={() => askAIExplanation(lesson.title)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all font-bold text-sm"
              >
                <Sparkles size={16} /> AI Explain Concept
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 transition-all font-bold text-sm">
                <Play size={16} /> Watch Video
              </button>
            </div>
          </div>

          {aiExplanation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary/5 border border-primary/20 p-6 rounded-3xl relative"
            >
              <button onClick={() => setAiExplanation(null)} className="absolute top-4 right-4 text-primary/50 hover:text-primary">
                <ArrowLeft size={16} className="rotate-90" />
              </button>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Sparkles size={20} />
                <h4 className="font-display font-bold">AI Explanation</h4>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{aiExplanation}</ReactMarkdown>
              </div>
            </motion.div>
          )}

          {isExplaining && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          )}

          <section className="space-y-6">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <GraduationCap className="text-primary" /> Visualizing the Process
            </h2>
            {lessonId === 'pyro' && <BlastFurnaceDiagram />}
            {lessonId === 'electro' && <ElectrolysisDiagram />}
            {lessonId === 'hydro' && (
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
                <div className="flex justify-center gap-8 items-end h-40">
                  <div className="w-20 bg-blue-400/20 border-2 border-blue-400 rounded-b-lg relative">
                    <div className="absolute bottom-0 w-full h-1/2 bg-blue-400/40"></div>
                    <span className="absolute -top-8 left-0 w-full text-xs font-bold">CuSO4 Solution</span>
                  </div>
                  <ArrowLeft className="text-slate-300 rotate-180 mb-12" />
                  <div className="w-20 bg-slate-200 border-2 border-slate-400 rounded-b-lg relative">
                    <div className="absolute bottom-0 w-full h-1/2 bg-orange-400/60"></div>
                    <span className="absolute -top-8 left-0 w-full text-xs font-bold">Cu Precipitate</span>
                  </div>
                </div>
                <p className="text-slate-500 italic">Diagram: Iron displacing Copper from solution.</p>
              </div>
            )}
          </section>

          <div className="flex justify-center pt-8">
            <button 
              onClick={() => setView('quiz')}
              className="px-12 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
            >
              Ready for the Quiz? <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass p-12 rounded-3xl"
        >
          <Quiz questions={quiz} onComplete={handleQuizComplete} />
        </motion.div>
      )}
    </div>
  );
};
