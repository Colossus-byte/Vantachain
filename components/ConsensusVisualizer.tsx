
import React, { useState } from 'react';

const ConsensusVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'linear' | 'dag'>('linear');

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-surface border border-amber-500/10 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-amber-500/5 blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
              <i className="fa-solid fa-diagram-project text-xl md:text-2xl"></i>
            </div>
            <div>
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-1">Expert Sandbox: Topology Lab</h3>
              <p className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">Consensus Structure Analysis</p>
            </div>
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 self-start md:self-auto">
            <button 
              onClick={() => setMode('linear')}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'linear' ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >
              Blockchain
            </button>
            <button 
              onClick={() => setMode('dag')}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'dag' ? 'bg-amber-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >
              DAG
            </button>
          </div>
        </div>

        <div className="h-48 md:h-64 flex items-center justify-center relative bg-black/40 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 overflow-hidden">
          {mode === 'linear' ? (
            <div className="flex gap-2 md:gap-4 items-center animate-in slide-in-from-left-8 duration-700 overflow-x-auto px-4 md:px-0 custom-scrollbar">
               {[1, 2, 3, 4].map(i => (
                 <React.Fragment key={i}>
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-500 font-mono text-[10px] md:text-xs">
                      B-{i}
                    </div>
                    {i < 4 && <div className="flex-shrink-0 w-4 md:w-8 h-0.5 bg-amber-500/20"></div>}
                 </React.Fragment>
               ))}
            </div>
          ) : (
            <div className="relative w-full h-full p-4 md:p-8 animate-in zoom-in-95 duration-700">
               <div className="absolute top-1/4 left-1/4 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono text-[8px] md:text-[10px]">TX-A</div>
               <div className="absolute top-2/4 left-2/4 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono text-[8px] md:text-[10px]">TX-B</div>
               <div className="absolute bottom-1/4 right-1/4 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-mono text-[8px] md:text-[10px]">TX-C</div>
               <div className="absolute top-1/2 right-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/20 animate-pulse"></div>
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="indigo" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="indigo" strokeWidth="2" />
                  <line x1="75%" y1="75%" x2="25%" y2="25%" stroke="indigo" strokeWidth="2" />
               </svg>
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
           <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5">
              <h4 className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Critical Insight</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                {mode === 'linear' 
                  ? "Standard blockchains like Bitcoin or Ethereum process one block at a time. This ensures total ordering but limits throughput." 
                  : "DAGs allow multiple transactions to be processed in parallel. Each new vertex (transaction) validates multiple previous vertices, removing the linear bottleneck."}
              </p>
           </div>
           <div className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5">
              <h4 className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Protocol Example</h4>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <i className="fa-solid fa-link text-[10px] text-amber-500"></i>
                 </div>
                 <span className="text-sm md:text-base text-white font-bold">{mode === 'linear' ? 'Ethereum (LMD-GHOST)' : 'Fantom (Lachesis)'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConsensusVisualizer;
