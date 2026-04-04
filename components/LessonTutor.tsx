import React, { useState } from 'react';
import { askTutor } from '../services/claudeService';

interface LessonTutorProps {
  lessonTitle: string;
  lessonContent: string;
}

const LessonTutor: React.FC<LessonTutorProps> = ({ lessonTitle, lessonContent }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || isLoading) return;
    setIsLoading(true);
    setAnswer('');
    try {
      const response = await askTutor(lessonTitle, lessonContent, question.trim());
      setAnswer(response);
      setHasAsked(true);
    } catch {
      setAnswer('Sorry, I had trouble answering that. Try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const handleAskAnother = () => {
    setQuestion('');
    setAnswer('');
    setHasAsked(false);
  };

  return (
    <div className="mt-10 p-6 rounded-2xl bg-electric-violet/5 border border-electric-violet/15">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center">
          <i className="fa-solid fa-robot text-electric-violet text-sm"></i>
        </div>
        <div>
          <p className="text-xs font-black text-white">AI Tutor</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest">Powered by Claude</p>
        </div>
      </div>

      {!hasAsked ? (
        <div>
          <p className="text-sm text-slate-400 mb-3 font-medium">
            Have a question about <span className="text-white font-bold">"{lessonTitle}"</span>? Ask me anything.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. What's the difference between a hot and cold wallet?"
              disabled={isLoading}
              maxLength={300}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-electric-violet/50 focus:ring-1 focus:ring-electric-violet/30 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleAsk}
              disabled={!question.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-electric-violet/20 border border-electric-violet/30 text-electric-violet font-bold text-xs uppercase tracking-wider hover:bg-electric-violet/30 transition-all disabled:opacity-30 flex items-center gap-2 whitespace-nowrap"
            >
              {isLoading ? (
                <><i className="fa-solid fa-circle-notch fa-spin"></i> Thinking...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Ask</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="mb-3 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Your question</p>
            <p className="text-sm text-slate-300 font-medium">{question}</p>
          </div>
          <div className="mb-4 px-3 py-3 rounded-xl bg-electric-violet/10 border border-electric-violet/20">
            <p className="text-[10px] text-electric-violet uppercase tracking-widest font-black mb-2">
              <i className="fa-solid fa-robot mr-1"></i> AI Tutor
            </p>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
          <button
            onClick={handleAskAnother}
            className="text-xs text-slate-500 hover:text-white underline underline-offset-4 transition-colors"
          >
            Ask another question
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonTutor;
