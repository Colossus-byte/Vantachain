import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

interface FeedEntry {
  id: string;
  displayId: string;
  lessonTitle: string;
  topicTitle: string;
  timestamp: number; // ms since epoch (from Firestore Timestamp or Date.now())
}

// Demo data for when the feed is empty or loading
const DEMO_ENTRIES: Omit<FeedEntry, 'id'>[] = [
  { displayId: '0x7a3f...c2d1', lessonTitle: 'Wallets — Your Crypto Bank Account', topicTitle: 'Getting Started', timestamp: Date.now() - 95_000 },
  { displayId: '0xb29e...04a3', lessonTitle: 'How to Buy Your First Crypto Safely', topicTitle: 'Your First Steps', timestamp: Date.now() - 210_000 },
  { displayId: '0xf1c8...9e72', lessonTitle: 'What Is Crypto and Why It Matters', topicTitle: 'Getting Started', timestamp: Date.now() - 380_000 },
  { displayId: '0x3d5a...71bb', lessonTitle: 'DeFi Basics — Earning Yield', topicTitle: 'Going Deeper', timestamp: Date.now() - 610_000 },
  { displayId: '0xe7f2...a301', lessonTitle: 'How to Spot and Avoid Crypto Scams', topicTitle: 'Your First Steps', timestamp: Date.now() - 890_000 },
  { displayId: '0x92c4...5d8f', lessonTitle: 'Reading Crypto Charts', topicTitle: 'Your First Steps', timestamp: Date.now() - 1_200_000 },
  { displayId: '0x14ba...2c9e', lessonTitle: 'Stablecoins — Your Digital Dollar', topicTitle: 'Going Deeper', timestamp: Date.now() - 1_540_000 },
  { displayId: '0x6011...f43a', lessonTitle: 'Building a Crypto Portfolio', topicTitle: 'Smart Strategies', timestamp: Date.now() - 2_100_000 },
];

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const ActivityFeed: React.FC = () => {
  const [entries, setEntries] = useState<FeedEntry[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'activity_feed'),
      orderBy('timestamp', 'desc'),
      limit(15)
    );

    const unsub = onSnapshot(q, snapshot => {
      const real: FeedEntry[] = snapshot.docs.map(d => {
        const data = d.data();
        const ts = data.timestamp?.toMillis?.() ?? data.timestamp ?? Date.now();
        return { id: d.id, displayId: data.displayId, lessonTitle: data.lessonTitle, topicTitle: data.topicTitle, timestamp: ts };
      });

      if (real.length > 0) {
        setIsLive(true);
        setEntries(real);
      } else {
        // No real data yet — use demo entries
        setEntries(DEMO_ENTRIES.map((e, i) => ({ ...e, id: `demo-${i}` })));
      }
    }, () => {
      // Firestore error — fall back to demo
      setEntries(DEMO_ENTRIES.map((e, i) => ({ ...e, id: `demo-${i}` })));
    });

    return () => unsub();
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-surface border border-white/5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-widest">Live Activity</h3>
          <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">Learners worldwide right now</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`relative flex h-2 w-2`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-cyber-lime' : 'bg-slate-600'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-cyber-lime' : 'bg-slate-600'}`}></span>
          </span>
          <span className={`text-[8px] font-bold uppercase tracking-widest ${isLive ? 'text-cyber-lime' : 'text-slate-500'}`}>
            {isLive ? 'Live' : 'Demo'}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto scrollbar-thin pr-1">
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 animate-in fade-in slide-in-from-left-2"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="w-7 h-7 rounded-lg bg-cyber-lime/10 border border-cyber-lime/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="fa-solid fa-graduation-cap text-cyber-lime text-[9px]"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-slate-400 font-mono">{entry.displayId}</p>
              <p className="text-[11px] text-white font-semibold truncate">{entry.lessonTitle}</p>
              <p className="text-[9px] text-slate-600 mt-0.5">{entry.topicTitle} · {timeAgo(entry.timestamp)}</p>
            </div>
            <i className="fa-solid fa-check text-cyber-lime text-[9px] flex-shrink-0 mt-1"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
