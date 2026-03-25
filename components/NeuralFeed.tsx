
import React, { useState, useEffect } from 'react';
import { FeedEvent, Guild } from '../types';
import { GUILD_DATA } from '../constants';

const DUMMY_EVENTS: FeedEvent[] = [
  { id: 'e1', type: 'certification', user: '0xVortex', guild: Guild.SENTINELS, detail: 'Earned Security Level 4', timestamp: Date.now() - 5000 },
  { id: 'e2', type: 'transaction', user: '0xNode_Alpha', guild: Guild.ARCHITECTS, detail: 'Sent 1.2k $PATH to 0xGhost', timestamp: Date.now() - 15000 },
  { id: 'e3', type: 'achievement', user: '0xCatalyst', guild: Guild.LIQUIDATORS, detail: 'Unlocked: Genesis Miner', timestamp: Date.now() - 30000 },
  { id: 'e4', type: 'guild_join', user: '0xSovereign', guild: Guild.ARCHITECTS, detail: 'Aligned with EVM Architects', timestamp: Date.now() - 60000 },
];

interface NeuralFeedProps {
  isPrivate: boolean;
}

const NeuralFeed: React.FC<NeuralFeedProps> = ({ isPrivate }) => {
  const [events, setEvents] = useState<FeedEvent[]>(DUMMY_EVENTS);

  useEffect(() => {
    const interval = setInterval(() => {
      const users = ['0xNode_Beta', '0xShadow', '0xRogue', '0xValidator'];
      const details = ['Synthesized a new block', 'Updated identity bio', 'Voted on Proposal #42', 'Minted soul-bound NFT'];
      const guilds = [Guild.ARCHITECTS, Guild.SENTINELS, Guild.LIQUIDATORS];
      
      const newEvent: FeedEvent = {
        id: Math.random().toString(),
        type: 'achievement',
        user: users[Math.floor(Math.random() * users.length)],
        guild: guilds[Math.floor(Math.random() * guilds.length)],
        detail: details[Math.floor(Math.random() * details.length)],
        timestamp: Date.now()
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 7)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 border-t border-white/5 bg-black/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></div>
        <h4 className="terminal-text text-[9px] font-black uppercase tracking-[0.4em]">Neural Pulse Stream</h4>
      </div>
      
      <div className="space-y-4">
        {events.map((e) => {
          const guild = GUILD_DATA[e.guild];
          return (
            <div key={e.id} className="flex flex-col gap-1 animate-in slide-in-from-left-4 duration-500">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold tracking-tight uppercase transition-all duration-500 ${isPrivate ? 'text-[#8b5cf6] blur-[2px] opacity-40' : 'text-white'}`}>
                  {isPrivate ? 'ZK_PROOF_' + e.user.slice(-2) : e.user}
                </span>
                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className={`text-[9px] font-medium leading-relaxed opacity-70 flex items-center gap-2 text-${guild.color}-500`}>
                <i className={`fa-solid ${guild.icon} text-[7px]`}></i>
                {e.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeuralFeed;
