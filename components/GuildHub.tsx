
import React from 'react';
import { Guild, UserProgress } from '../types';
import { GUILD_DATA } from '../constants';

interface GuildHubProps {
  progress: UserProgress;
  onJoinGuild: (guild: Guild) => void;
}

const GuildHub: React.FC<GuildHubProps> = ({ progress, onJoinGuild }) => {
  const currentGuild = GUILD_DATA[progress.guild];

  return (
    <div className="mt-12 md:mt-24 page-transition">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-12 text-center md:text-left">
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2.5rem] bg-${currentGuild.color}-500 flex items-center justify-center text-white shadow-2xl shadow-${currentGuild.color}-500/20`}>
          <i className={`fa-solid ${currentGuild.icon} text-3xl md:text-4xl`}></i>
        </div>
        <div>
          <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1">Active Collective Hub</h3>
          <p className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{currentGuild.name}</p>
        </div>
      </div>

      {progress.guild === Guild.NONE ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {(Object.keys(GUILD_DATA) as Guild[]).filter(g => g !== Guild.NONE).map(g => {
            const data = GUILD_DATA[g];
            return (
              <button 
                key={g}
                onClick={() => onJoinGuild(g)}
                className={`p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 text-left group hover:bg-${data.color}-500/10 hover:border-${data.color}-500/30 transition-all`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-${data.color}-500/10 flex items-center justify-center text-${data.color}-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fa-solid ${data.icon} text-xl md:text-2xl`}></i>
                </div>
                <h4 className="text-lg md:text-xl font-black text-white mb-2 md:mb-3 uppercase tracking-tight">{data.name}</h4>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium leading-relaxed mb-6 md:mb-8">{data.desc}</p>
                <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Align Identity <i className="fa-solid fa-arrow-right ml-1"></i>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0c0e14] border border-white/5 relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-${currentGuild.color}-500/5 blur-[80px] md:blur-[100px]`}></div>
               <h4 className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 md:mb-8">Faction Consensus Dashboard</h4>
               <div className="space-y-8 md:space-y-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                     <div>
                        <p className="text-2xl md:text-3xl font-black text-white mb-1 uppercase tracking-tight">Mainnet Sync: Stage 3</p>
                        <p className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Objective Active</p>
                     </div>
                     <div className="sm:text-right">
                        <p className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Estimated Completion</p>
                        <p className="text-lg md:text-xl font-black text-white tracking-tight">12:04:55</p>
                     </div>
                  </div>
                  <div className="w-full h-3 md:h-4 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-${currentGuild.color}-500 shadow-[0_0_15px_${currentGuild.color}]`} style={{ width: '68%' }}></div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
               <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5">
                  <h5 className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 md:mb-6">Guild Leaderboard</h5>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between py-3 md:py-4 border-b border-white/5 last:border-0">
                       <div className="flex items-center gap-3 md:gap-4">
                          <span className="text-[10px] md:text-xs font-black text-slate-700">0{i}</span>
                          <span className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">Node_Operator_{i}</span>
                       </div>
                       <span className="text-[10px] md:text-xs font-black text-emerald-500 tracking-widest">+{(1000 - i * 150).toLocaleString()} $PATH</span>
                    </div>
                  ))}
               </div>
               <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 flex flex-col justify-center text-center">
                  <i className="fa-solid fa-users-rays text-3xl md:text-4xl text-slate-800 mb-4 md:mb-6"></i>
                  <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Member Count</p>
                  <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">4.2k</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10">
               <h5 className="text-[8px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 md:mb-6">Mentor Directives</h5>
               <div className="space-y-4 md:space-y-6">
                  <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-black/40 border border-white/5">
                     <p className="text-[9px] md:text-[10px] font-bold text-slate-300 leading-relaxed uppercase">Validate 5 newcomers in the Audit Lab to earn the "Sentinel Warden" status.</p>
                  </div>
                  <button className="w-full py-3 md:py-4 rounded-lg md:rounded-xl border border-indigo-500/30 text-indigo-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                     Enter Mentor Lobby
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildHub;
