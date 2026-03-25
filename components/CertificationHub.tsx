
import React, { useState } from 'react';
import { Topic, UserProgress } from '../types';
import { TOPICS } from '../constants';

interface CertificationHubProps {
  progress: UserProgress;
}

const CertificationHub: React.FC<CertificationHubProps> = ({ progress }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintedIds, setMintedIds] = useState<string[]>([]);

  const completedTopics = TOPICS.filter(t => progress.completedTopics.includes(t.id));

  const handleMint = (id: string) => {
    setIsMinting(true);
    setTimeout(() => {
      setMintedIds(prev => [...prev, id]);
      setIsMinting(false);
    }, 2500);
  };

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-gradient-to-br from-[#0c0e14] to-[#050608] border border-amber-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-500/[0.03] blur-[80px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-black shadow-xl shadow-amber-500/20">
              <i className="fa-solid fa-award text-2xl md:text-3xl"></i>
            </div>
            <div>
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-1">PoK Registry: Proof of Knowledge</h3>
              <p className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase italic">Institutional Credential Hub</p>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Authenticated via</span>
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-tight">Path-Chain Mainnet</span>
          </div>
        </div>

        {completedTopics.length === 0 ? (
          <div className="py-12 md:py-16 text-center bg-white/[0.01] border border-white/5 rounded-[2rem] md:rounded-[2.5rem]">
            <i className="fa-solid fa-lock text-3xl md:text-4xl text-slate-800 mb-4 md:mb-6"></i>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] md:text-sm px-4">Complete Modules to Unlock Verifiable Credentials</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {completedTopics.map(topic => (
              <div key={topic.id} className="p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[8px] md:text-[9px] font-black text-amber-500/70 uppercase tracking-widest">{topic.category} Specialist</span>
                    <span className="text-[8px] md:text-[9px] font-black text-slate-600 uppercase tracking-widest">Hash: 0x{topic.id}A7...</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-black text-white mb-2 uppercase tracking-tight">{topic.title}</h4>
                  <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-medium mb-6 md:mb-8">This credential validates advanced competency in {topic.category} architecture and protocol logic.</p>
                </div>
                
                {mintedIds.includes(topic.id) ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg md:rounded-xl text-emerald-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                      <i className="fa-solid fa-check-double"></i>
                      Verified SBT
                    </div>
                    <button className="text-[8px] md:text-[9px] font-black text-slate-500 hover:text-white uppercase tracking-widest">View on Explorer</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleMint(topic.id)}
                    disabled={isMinting}
                    className="w-full py-3 md:py-4 rounded-lg md:rounded-xl bg-white text-black font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
                  >
                    {isMinting ? <i className="fa-solid fa-spinner animate-spin mr-2"></i> : 'Mint Soul-Bound Credential'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 md:mt-12 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center gap-4 md:gap-6">
           <i className="fa-solid fa-building-columns text-amber-500/40 text-xl md:text-2xl"></i>
           <div className="flex-1">
              <p className="text-[10px] md:text-[11px] text-slate-400 font-medium leading-relaxed">
                <strong className="text-white">Institutional Value:</strong> These certificates are recognized by 40+ Tier-1 Web3 protocols for fast-tracked hiring. Each SBT carries your historical quiz performance and audit lab accuracy data.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationHub;
