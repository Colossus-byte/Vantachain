import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Guild, UserProgress } from '../types';
import { GUILD_DATA } from '../constants';

interface LeaderEntry {
  uid: string;
  username: string;
  xp: number;
  streak: number;
  guild: Guild;
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

// Seeded demo entries so the board never looks empty
const DEMO_LEADERS: LeaderEntry[] = [
  { uid: 'd1', username: 'SatoshiSam',   xp: 3450, streak: 14, guild: Guild.ARCHITECTS },
  { uid: 'd2', username: 'CryptoAmara',  xp: 2980, streak: 9,  guild: Guild.SENTINELS  },
  { uid: 'd3', username: 'DefiDave',     xp: 2650, streak: 7,  guild: Guild.LIQUIDATORS},
  { uid: 'd4', username: 'BlockBuilderZ',xp: 2200, streak: 5,  guild: Guild.ARCHITECTS },
  { uid: 'd5', username: 'WalletWatcher',xp: 1870, streak: 3,  guild: Guild.SENTINELS  },
];

interface Props {
  progress: UserProgress;
}

const GuildLeaderboard: React.FC<Props> = ({ progress }) => {
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<Guild>(
    progress.guild !== Guild.NONE ? progress.guild : Guild.ARCHITECTS
  );

  useEffect(() => {
    let isMounted = true;

    const fetchLeaders = async () => {
      try {
        const q = query(
          collection(db, 'leaderboard'),
          where('guild', '==', selectedGuild),
          orderBy('xp', 'desc'),
          limit(5)
        );
        const snap = await getDocs(q);
        if (!isMounted) return;

        const real: LeaderEntry[] = snap.docs.map(d => ({
          uid: d.id,
          ...(d.data() as Omit<LeaderEntry, 'uid'>),
          isCurrentUser: false,
        }));

        // Merge current user into list
        const currentUserEntry: LeaderEntry | null = progress.username && progress.guild === selectedGuild ? {
          uid: 'current',
          username: progress.username,
          xp: progress.xp || 0,
          streak: progress.streak || 0,
          guild: selectedGuild,
          isCurrentUser: true,
        } : null;

        let merged = real.length > 0 ? real : DEMO_LEADERS.filter(d => d.guild === selectedGuild || real.length === 0);

        if (currentUserEntry) {
          const alreadyIn = merged.some(l => l.isCurrentUser);
          if (!alreadyIn) merged = [...merged, currentUserEntry];
        }

        merged = merged.sort((a, b) => b.xp - a.xp).slice(0, 5);
        setLeaders(merged);
      } catch {
        // fallback to demo
        const demo = DEMO_LEADERS.slice(0, 5);
        if (isMounted) setLeaders(demo);
      }
    };

    fetchLeaders();
    return () => { isMounted = false; };
  }, [selectedGuild, progress.xp, progress.username]);

  const guildTabs = Object.entries(GUILD_DATA).filter(([g]) => g !== Guild.NONE) as [Guild, any][];

  return (
    <div className="p-6 rounded-2xl bg-surface border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Guild Leaderboard</h3>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Top learners this week</p>
        </div>
        <i className="fa-solid fa-crown text-hyper-gold text-sm"></i>
      </div>

      {/* Guild tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {guildTabs.map(([guildKey, data]) => (
          <button
            key={guildKey}
            onClick={() => setSelectedGuild(guildKey)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${
              selectedGuild === guildKey
                ? `bg-${data.color}-500/15 border-${data.color}-500/40 text-${data.color}-400`
                : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
            }`}
          >
            <i className={`fa-solid ${data.icon} text-[8px]`}></i>
            {data.name.split(' ')[1] ?? data.name}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {leaders.map((entry, i) => (
          <div
            key={entry.uid}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              entry.isCurrentUser
                ? 'bg-electric-violet/10 border-electric-violet/30'
                : 'bg-white/[0.02] border-white/5'
            }`}
          >
            {/* Rank */}
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black ${
              i === 0 ? 'bg-hyper-gold/20 text-hyper-gold' :
              i === 1 ? 'bg-slate-400/20 text-slate-400' :
              i === 2 ? 'bg-amber-700/20 text-amber-700' :
              'bg-white/5 text-slate-600'
            }`}>
              {i === 0 ? <i className="fa-solid fa-crown text-[8px]"></i> : i + 1}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-bold truncate ${entry.isCurrentUser ? 'text-electric-violet' : 'text-white'}`}>
                {entry.username} {entry.isCurrentUser && <span className="text-[8px] text-slate-500">(you)</span>}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-slate-500">
                  <i className="fa-solid fa-fire text-orange-400 mr-0.5"></i>{entry.streak}d
                </span>
              </div>
            </div>

            {/* XP */}
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-black text-white">{(entry.xp).toLocaleString()}</p>
              <p className="text-[8px] text-slate-600 uppercase tracking-wider">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuildLeaderboard;
