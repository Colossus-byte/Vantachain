
import React from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatarUrl: string;
  score: number;
  guild: string;
  trend: 'up' | 'down' | 'stable';
}

const GlobalLeaderboard: React.FC = () => {
  const leaders: LeaderboardEntry[] = [
    { rank: 1, username: 'Satoshi_Ghost', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost', score: 12540, guild: 'CipherPunks', trend: 'stable' },
    { rank: 2, username: 'Vanta_Queen', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen', score: 11200, guild: 'ZkKnights', trend: 'up' },
    { rank: 3, username: 'BlockMaster', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Master', score: 10850, guild: 'NeuralNodes', trend: 'down' },
    { rank: 4, username: 'Ether_Drifter', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Drifter', score: 9900, guild: 'CipherPunks', trend: 'up' },
    { rank: 5, username: 'ZeroKnowledge', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zero', score: 9450, guild: 'ZkKnights', trend: 'stable' },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <i className="fa-solid fa-trophy text-6xl md:text-8xl text-[#ccff00]"></i>
      </div>
      
      <div className="flex items-center gap-4 mb-8 md:mb-12 relative z-10">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/20">
          <i className="fa-solid fa-ranking-star text-[#ccff00] text-lg"></i>
        </div>
        <div>
          <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#ccff00] mb-1">Global Consensus</h3>
          <p className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">Top Node Operators</p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 relative z-10">
        {leaders.map((leader) => (
          <div 
            key={leader.rank} 
            className="flex items-center justify-between p-4 md:p-5 rounded-xl md:rounded-2xl bg-black/40 border border-white/5 hover:border-[#ccff00]/30 transition-all group/item"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-6 md:w-8 text-center">
                <span className={`text-sm md:text-lg font-black ${leader.rank === 1 ? 'text-[#ccff00]' : 'text-slate-500'}`}>
                  #{leader.rank}
                </span>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white/10 overflow-hidden group-hover/item:border-[#ccff00]/50 transition-colors">
                <img src={leader.avatarUrl} alt={leader.username} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm md:text-base tracking-tight uppercase">{leader.username}</p>
                <p className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest">{leader.guild}</p>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-4 md:gap-8">
              <div className="hidden sm:block">
                <p className="text-[6px] md:text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1">Consensus Score</p>
                <p className="text-sm md:text-lg font-black text-white tracking-tighter">{leader.score.toLocaleString()} <span className="text-[8px] text-slate-500">$PATH</span></p>
              </div>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                leader.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 
                leader.trend === 'down' ? 'text-rose-500 bg-rose-500/10' : 
                'text-slate-500 bg-white/5'
              }`}>
                <i className={`fa-solid ${
                  leader.trend === 'up' ? 'fa-arrow-trend-up' : 
                  leader.trend === 'down' ? 'fa-arrow-trend-down' : 
                  'fa-minus'
                } text-xs md:text-sm`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 md:mt-12 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all">
        View Full Protocol Ranking
      </button>
    </div>
  );
};

export default GlobalLeaderboard;
