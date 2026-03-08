import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const Quiz = ({ questions, onComplete }: QuizProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.answer;
    if (isCorrect) setScore(s => s + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      onComplete(Math.round((score / questions.length) * 100));
    }
  };

  if (showResult) {
    return (
      <div className="text-center py-12 space-y-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-4">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-display font-bold">Quiz Completed!</h2>
          <p className="text-slate-500 text-lg">You scored {score} out of {questions.length}</p>
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={() => {
                setCurrentIdx(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
                setIsSubmitted(false);
              }}
              className="flex items-center gap-2 px-6 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors"
            >
              <RotateCcw size={20} /> Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{currentQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuestion.type === 'mcq' && currentQuestion.options?.map((opt, i) => (
            <button
              key={i}
              disabled={isSubmitted}
              onClick={() => setSelectedAnswer(opt)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === opt 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              } ${isSubmitted && opt === currentQuestion.answer ? 'border-accent bg-accent/5 text-accent' : ''}
                ${isSubmitted && selectedAnswer === opt && selectedAnswer !== currentQuestion.answer ? 'border-red-500 bg-red-50 text-red-500' : ''}
              `}
            >
              {opt}
            </button>
          ))}

          {currentQuestion.type === 'tf' && (
            <div className="flex gap-4">
              {[true, false].map((val) => (
                <button
                  key={val.toString()}
                  disabled={isSubmitted}
                  onClick={() => setSelectedAnswer(val)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    selectedAnswer === val 
                      ? 'border-primary bg-primary/5 text-primary' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  } ${isSubmitted && val === currentQuestion.answer ? 'border-accent bg-accent/5 text-accent' : ''}
                    ${isSubmitted && selectedAnswer === val && selectedAnswer !== currentQuestion.answer ? 'border-red-500 bg-red-50 text-red-500' : ''}
                  `}
                >
                  {val ? 'True' : 'False'}
                </button>
              ))}
            </div>
          )}
        </div>

        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border ${selectedAnswer === currentQuestion.answer ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-red-50 border-red-100 text-red-600'}`}
          >
            <div className="flex items-start gap-3">
              {selectedAnswer === currentQuestion.answer ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              <div>
                <p className="font-bold">{selectedAnswer === currentQuestion.answer ? 'Correct!' : 'Incorrect'}</p>
                <p className="text-sm opacity-90 mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end">
          {!isSubmitted ? (
            <button
              disabled={selectedAnswer === null}
              onClick={handleSubmit}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark disabled:opacity-50 transition-all shadow-md"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
            >
              {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
