
import React, { useState, useEffect } from 'react';

const ProtocolLab: React.FC = () => {
  const [difficulty, setDifficulty] = useState(3);
  const [isMining, setIsMining] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [hash, setHash] = useState("");
  const [found, setFound] = useState(false);

  const target = "0".repeat(difficulty);

  const simulateMining = () => {
    setIsMining(true);
    setFound(false);
    let currentNonce = 0;
    
    const interval = setInterval(() => {
      currentNonce += Math.floor(Math.random() * 100);
      const mockHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setNonce(currentNonce);
      setHash(mockHash);

      if (mockHash.startsWith(target) || currentNonce > 10000) {
        setIsMining(false);
        setHash(target + mockHash.substring(difficulty));
        setFound(true);
        clearInterval(interval);
      }
    }, 50);
  };

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-surface border border-emerald-500/20 relative overflow-hidden group">
      <div className="absolute -top-24 -left-24 w-48 md:w-64 h-48 md:h-64 bg-emerald-500/10 blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <i className="fa-solid fa-microchip text-xl md:text-2xl"></i>
            </div>
            <div>
              <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-0.5 md:mb-1">USP: Protocol Sandbox</h3>
              <p className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase italic">Consensus Engine Lab</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
            <div className="flex flex-col">
              <span className="text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">Network Difficulty</span>
              <input 
                type="range" min="1" max="5" value={difficulty} 
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="accent-emerald-500 bg-white/10 h-1 rounded-full w-24 md:w-32"
              />
            </div>
            <div className="text-lg md:text-xl font-black text-emerald-500 w-6 md:w-8">{difficulty}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-4 md:space-y-6">
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-black/40 border border-white/5 space-y-3 md:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Node Stats</span>
                <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isMining ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`}>
                  {isMining ? 'Mining Block...' : found ? 'Block Validated' : 'Node Idle'}
                </span>
              </div>
              <div className="font-mono text-[10px] md:text-xs break-all text-slate-400 bg-black/60 p-4 md:p-5 rounded-lg md:rounded-xl border border-white/5">
                <span className="text-emerald-500/50">HASH:</span> {hash || "0x000000000000000000..."}
              </div>
              <div className="flex justify-between items-center px-1 md:px-2">
                <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase">Nonce Counter:</span>
                <span className="text-base md:text-lg font-black text-white">{nonce.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={simulateMining}
              disabled={isMining}
              className="w-full py-4 md:py-6 rounded-xl md:rounded-2xl bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isMining ? 'Computing Proof...' : 'Initiate Block Forge'}
            </button>
          </div>

          <div className="flex flex-col justify-center space-y-4 md:space-y-6 p-2 md:p-4">
             <div className="flex gap-3 md:gap-4">
                <i className="fa-solid fa-circle-info text-emerald-500 mt-1 text-sm md:text-base"></i>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed italic">
                  Increase the <strong>Difficulty</strong> to see how many more guesses (Nonces) it takes to find a hash starting with zeros. This is exactly how Bitcoin handles security.
                </p>
             </div>
             <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 md:mb-3">Learning Outcome</div>
                <p className="text-[10px] md:text-xs font-bold text-white uppercase">Understanding Proof-of-Work Latency</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolLab;
