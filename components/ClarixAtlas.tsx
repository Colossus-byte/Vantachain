
import React from 'react';
import { TOPICS } from '../constants';
import { UserProgress, Difficulty } from '../types';

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  [Difficulty.BASIC]: 'Level 1 — Beginner',
  [Difficulty.FUNDAMENTAL]: 'Level 2 — Practical',
  [Difficulty.MID]: 'Level 3 — Intermediate',
  [Difficulty.PRO]: 'Level 4 — Advanced',
};

interface ClarixAtlasProps {
  progress: UserProgress;
  onSelectTopic: (id: string) => void;
}

const ClarixAtlas: React.FC<ClarixAtlasProps> = ({ progress, onSelectTopic }) => {
  return (
    <div className="mb-12 md:mb-24 py-8 md:py-12 px-6 md:px-10 rounded-[2rem] md:rounded-[3.5rem] bg-surface border border-white/5 relative overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-cyber-lime/5 blur-[80px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10 md:mb-16">
        <div>
          <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1 md:mb-2">Your Learning Path</h3>
          <p className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">Knowledge Atlas</p>
        </div>
        <div className="px-4 md:px-6 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
          PROGRESS: {((progress.completedTopics.length / TOPICS.length) * 100).toFixed(0)}% Complete
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        <svg className="absolute top-1/2 left-0 w-full h-1 hidden md:block opacity-10" style={{ transform: 'translateY(-50%)' }}>
          <line x1="0" y1="0" x2="100%" y2="0" stroke="#ccff00" strokeWidth="2" strokeDasharray="8,8" />
        </svg>

        {TOPICS.map((topic, i) => {
          const isUnlocked = i === 0 || progress.completedTopics.includes(TOPICS[i-1].id);
          const isCompleted = progress.completedTopics.includes(topic.id);
          const isCurrent = progress.currentTopicId === topic.id;

          return (
            <button
              key={topic.id}
              disabled={!isUnlocked}
              onClick={() => onSelectTopic(topic.id)}
              className={`relative z-10 w-full md:w-64 p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-500 flex flex-col items-center gap-3 md:gap-4 text-center group ${
                isCompleted ? 'bg-cyber-lime/10 border-cyber-lime/40' :
                isCurrent ? 'bg-white/10 border-white/30 scale-[1.02] md:scale-105 shadow-2xl shadow-white/5' :
                isUnlocked ? 'bg-white/[0.02] border-white/10 hover:border-white/30' :
                'bg-black/40 border-white/5 opacity-30 grayscale cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-base md:text-xl shadow-lg transition-transform duration-500 ${
                isCompleted ? 'bg-cyber-lime text-black' :
                isCurrent ? 'bg-white text-black animate-pulse' : 'bg-white/5 text-slate-600 group-hover:text-white'
              }`}>
                <i className={`fa-solid ${isCompleted ? 'fa-check' : isCurrent ? 'fa-bolt' : 'fa-lock'}`}></i>
              </div>
              
              <div>
                <span className="text-[7px] md:text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-0.5 md:mb-1">{DIFFICULTY_LABELS[topic.difficulty]}</span>
                <h4 className="text-xs md:text-sm font-black text-white uppercase tracking-tight">{topic.title}</h4>
              </div>

              {!isUnlocked && (
                <div className="absolute -top-2 md:-top-3 px-2 md:px-3 py-0.5 md:py-1 bg-rose-500/20 border border-rose-500/40 rounded-lg text-[6px] md:text-[7px] font-black text-rose-500 uppercase tracking-widest">
                  Complete previous level first
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClarixAtlas;
