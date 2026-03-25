
import React from 'react';
import { MASTERY_TIMELINE } from '../constants';

const MasteryTimeline: React.FC = () => {
  return (
    <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <i className="fa-solid fa-calendar-check"></i>
        </div>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Mastery Protocol</h3>
          <p className="text-sm font-bold text-white tracking-tight">The 60-Day Road to Mainnet</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {MASTERY_TIMELINE.map((step, idx) => (
          <div key={idx} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Week {step.week}</span>
              <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-indigo-500 transition-colors shadow-[0_0_8px_transparent] group-hover:shadow-indigo-500/50"></div>
            </div>
            <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tighter italic">{step.phase}</h4>
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">{step.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasteryTimeline;
