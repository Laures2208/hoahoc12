export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'tf' | 'fill' | 'match';
  question: string;
  options?: string[];
  answer: string | boolean | string[];
  explanation: string;
}

export interface Progress {
  lesson_id: string;
  completed: boolean;
  score: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
