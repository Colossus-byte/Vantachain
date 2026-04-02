
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onCancel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === current.correctAnswerIndex) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const passed = score >= questions.length * 0.7;
    return (
      <div className="cyber-panel p-8 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
        <div className={`w-16 md:w-24 h-16 md:h-24 rounded-full mx-auto mb-6 md:mb-10 flex items-center justify-center text-2xl md:text-4xl shadow-2xl ${passed ? 'bg-cyber-lime text-black shadow-cyber-lime/20' : 'bg-neon-rose text-white shadow-neon-rose/20'}`}>
          <i className={`fa-solid ${passed ? 'fa-check-double' : 'fa-xmark'}`}></i>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tighter uppercase italic">{passed ? 'VALIDATION SUCCESS' : 'SYNC FAILED'}</h2>
        <p className="text-slate-400 mb-8 md:mb-12 text-sm md:text-lg font-medium leading-relaxed">
          Your knowledge proof resulted in {score}/{questions.length} successful nodes validated.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => onComplete(score, questions.length)} className="flex-1 py-4 md:py-5 bg-cyber-lime text-black font-bold uppercase tracking-widest text-[8px] md:text-xs rounded-xl md:rounded-2xl hover:scale-[1.02] transition-all">Record Attestation</button>
          {!passed && <button onClick={onCancel} className="flex-1 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[8px] md:text-xs rounded-xl md:rounded-2xl hover:bg-white/10">Re-Initialize Nodes</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-panel p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <span className="terminal-text text-[8px] md:text-[10px] uppercase tracking-[0.4em]">Validation Protocol 0{currentIndex + 1}</span>
        <div className="h-1 w-24 md:w-32 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-cyber-lime transition-all duration-1000" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 md:mb-12 tracking-tight leading-tight">{current.question}</h3>

      <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
        {current.options.map((opt, i) => {
          let state = "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] text-slate-400";
          if (showExplanation) {
            if (i === current.correctAnswerIndex) state = "bg-cyber-lime/10 border-cyber-lime text-cyber-lime";
            else if (i === selected) state = "bg-neon-rose/10 border-neon-rose text-neon-rose";
            else state = "opacity-30 border-white/5 text-slate-600";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showExplanation}
              className={`w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 font-bold text-sm md:text-lg flex justify-between items-center ${state}`}
            >
              {opt}
              {showExplanation && i === current.correctAnswerIndex && <i className="fa-solid fa-circle-check"></i>}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mb-8 md:mb-12 animate-in slide-in-from-top-4 duration-500 p-6 md:p-8 bg-white/[0.02] rounded-[1.5rem] md:rounded-[2rem] border border-white/5">
           <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium italic">
             <span className="text-white font-black uppercase tracking-widest text-[8px] md:text-[10px] block mb-2">Protocol Logic:</span>
             {current.explanation}
           </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!showExplanation}
          className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-black font-bold uppercase tracking-widest text-[8px] md:text-[10px] rounded-xl md:rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-xl"
        >
          {currentIndex === questions.length - 1 ? 'Finalize Attestation' : 'Synchronize Next Node'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
