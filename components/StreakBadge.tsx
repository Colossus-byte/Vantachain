import React from 'react';

interface StreakBadgeProps {
  streak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  xp: number;
}

const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, lastActiveDate, xp }) => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
  const isActiveToday = lastActiveDate === today;
  const expiringTonight = lastActiveDate === yesterday;

  const flameColor =
    streak === 0 ? 'text-slate-500' :
    streak < 3   ? 'text-orange-400' :
    streak < 7   ? 'text-amber-400' :
    streak < 14  ? 'text-yellow-400' :
                   'text-rose-400';

  const bgColor =
    streak === 0 ? 'bg-white/5 border-white/10' :
    streak < 3   ? 'bg-orange-500/10 border-orange-500/20' :
    streak < 7   ? 'bg-amber-500/10 border-amber-500/20' :
    streak < 14  ? 'bg-yellow-500/10 border-yellow-500/20' :
                   'bg-rose-500/10 border-rose-500/20';

  return (
    <div className="flex items-center gap-3">
      {/* Streak */}
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${bgColor} transition-all`}>
        <i className={`fa-solid fa-fire text-sm ${flameColor} ${isActiveToday ? 'animate-pulse' : ''}`}></i>
        <div>
          <span className={`text-sm font-black ${streak > 0 ? 'text-white' : 'text-slate-500'}`}>
            {streak}
          </span>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider ml-1">day streak</span>
        </div>
        {expiringTonight && (
          <span className="text-[8px] font-black text-amber-400 uppercase tracking-wider animate-pulse ml-1">
            expiring!
          </span>
        )}
      </div>

      {/* XP */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-electric-violet/10 border border-electric-violet/20">
        <i className="fa-solid fa-bolt text-electric-violet text-xs"></i>
        <span className="text-sm font-black text-white">{(xp || 0).toLocaleString()}</span>
        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">XP</span>
      </div>
    </div>
  );
};

export default StreakBadge;
