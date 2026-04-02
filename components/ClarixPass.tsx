
import React from 'react';
import { UserProgress, Guild } from '../types';
import { GUILD_DATA } from '../constants';

interface ClarixPassProps {
  progress: UserProgress;
}

const ClarixPass: React.FC<ClarixPassProps> = ({ progress }) => {
  const guild = GUILD_DATA[progress.guild];
  const isPrivate = progress.isPrivate;

  return (
    <div className="relative group perspective-1000 w-full max-w-md mx-auto">
      <div className="relative h-56 md:h-64 w-full rounded-2xl md:rounded-3xl p-0.5 md:p-1 bg-surface border border-white/10 overflow-hidden transition-all duration-700 hover:rotate-y-12 hover:scale-[1.02] shadow-2xl">
        {/* Holographic Sheen Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
        
        {/* Card Content */}
        <div className={`h-full w-full rounded-[1.2rem] md:rounded-[1.4rem] p-6 md:p-8 flex flex-col justify-between relative z-10 transition-all duration-500 ${isPrivate ? 'bg-gradient-to-br from-black to-surface' : 'bg-gradient-to-br from-white/[0.05] to-transparent'}`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 p-0.5 overflow-hidden transition-all duration-500 ${isPrivate ? 'border-electric-violet blur-sm' : 'border-cyber-lime/40'}`}>
                <img src={progress.avatarUrl} alt="ID" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className={`text-xs md:text-sm font-black uppercase tracking-tighter italic leading-none transition-all duration-500 ${isPrivate ? 'text-electric-violet opacity-30 select-none' : 'text-white'}`}>
                  {isPrivate ? 'ZK_PROOF_ENTITY' : progress.username}
                </h3>
                <p className="text-[6px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mt-0.5 md:mt-1">RANK {progress.vantaRank}</p>
              </div>
            </div>
            <div className={`px-3 md:px-4 py-1 md:py-1.5 rounded-lg border text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
              isPrivate ? 'border-electric-violet/30 bg-electric-violet/10 text-electric-violet' : `border-${guild.color}-500/30 bg-${guild.color}-500/10 text-${guild.color}-500`
            }`}>
              {isPrivate ? 'ANONYMOUS NODE' : guild.name}
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[6px] md:text-[7px] font-black text-slate-600 uppercase tracking-[0.3em] mb-0.5 md:mb-1">Authenticated Identity Hash</p>
                <p className="font-mono text-[8px] md:text-[10px] text-slate-400">
                  {isPrivate ? '0xMASKED_' + Math.random().toString(16).substring(7).toUpperCase() : '0xVANTA_' + Math.random().toString(36).substring(7).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[6px] md:text-[7px] font-black text-slate-600 uppercase tracking-[0.3em] mb-0.5 md:mb-1">PATH Reputation</p>
                <p className="text-lg md:text-xl font-black text-cyber-lime tracking-tighter italic">{progress.tokenBalance} $PATH</p>
              </div>
            </div>

            <div className="pt-3 md:pt-4 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-1 md:gap-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-0.5 md:w-1 h-2 md:h-3 rounded-full ${i <= (progress.completedTopics.length % 5) ? 'bg-cyber-lime' : 'bg-white/5'}`}></div>
                ))}
              </div>
              <div className="text-[6px] md:text-[7px] font-black text-slate-700 uppercase tracking-[0.5em]">VANTA CORE: V10.42-ZK</div>
            </div>
          </div>
        </div>

        {/* Brand Background watermark */}
        <i className="fa-solid fa-v absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 text-[120px] md:text-[180px] opacity-[0.03] text-white -rotate-12 pointer-events-none"></i>
      </div>
    </div>
  );
};

export default ClarixPass;
