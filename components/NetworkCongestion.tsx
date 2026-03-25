
import React, { useState, useEffect } from 'react';

const NetworkCongestion: React.FC = () => {
  const [load, setLoad] = useState(15);
  const [gasPrice, setGasPrice] = useState(20);

  useEffect(() => {
    setGasPrice(Math.floor(20 + (load * load) / 10));
  }, [load]);

  const triggerEvent = (type: 'mint' | 'hack') => {
    const surge = type === 'mint' ? 40 : 80;
    setLoad(prev => Math.min(100, prev + surge));
    setTimeout(() => {
      const interval = setInterval(() => {
        setLoad(prev => {
          if (prev <= 20) {
            clearInterval(interval);
            return 20;
          }
          return prev - 2;
        });
      }, 100);
    }, 2000);
  };

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-[#050608] border border-amber-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-500/5 blur-[80px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          <div className="flex-1 space-y-6 md:space-y-10 w-full">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-black">
                  <i className="fa-solid fa-bolt-lightning text-lg md:text-xl"></i>
                </div>
                <div>
                  <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 mb-0.5 md:mb-1">PROTOCOL SIM: VANTA MEMPOOL</h3>
                  <p className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase italic">Network Congestion Engine</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium italic">
                Simulate network surges and observe the exponential rise in Vanta-Gas fees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <button 
                onClick={() => triggerEvent('mint')}
                className="py-3 md:py-4 rounded-xl border border-white/10 bg-white/5 text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
              >
                NFT Free Mint Surge
              </button>
              <button 
                onClick={() => triggerEvent('hack')}
                className="py-3 md:py-4 rounded-xl border border-white/10 bg-white/5 text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest hover:bg-rose-500/10 hover:border-rose-500/30 transition-all"
              >
                Protocol Exploit Panic
              </button>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col items-center gap-6 md:gap-8">
            <div className="relative w-full h-32 md:h-48 bg-black rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden p-4 md:p-6 flex items-end gap-0.5 md:gap-1">
              {Array.from({ length: 40 }).map((_, i) => {
                const h = Math.max(10, (load * (0.8 + Math.random() * 0.4)));
                return (
                  <div 
                    key={i} 
                    className="flex-1 rounded-t-sm transition-all duration-500" 
                    style={{ height: `${h}%`, backgroundColor: load > 70 ? '#f43f5e' : load > 40 ? '#fbbf24' : '#ccff00', opacity: 0.3 + (i / 40) * 0.7 }}
                  ></div>
                );
              })}
              <div className="absolute top-4 md:top-6 left-4 md:left-6">
                <p className="text-[7px] md:text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5 md:mb-1">Mempool Load</p>
                <p className="text-lg md:text-2xl font-black text-white">{load}%</p>
              </div>
            </div>

            <div className="w-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-amber-500 text-black flex items-center justify-between">
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1 opacity-60">Calculated Priority Fee</p>
                <p className="text-3xl md:text-5xl font-black tracking-tighter italic">{gasPrice} <span className="text-base md:text-lg">GWEI</span></p>
              </div>
              <div className="text-right">
                <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] mb-0.5 md:mb-1 opacity-60">Status</p>
                <p className="text-[10px] md:text-base font-bold uppercase tracking-tight">{load > 60 ? 'Extreme Congestion' : 'Nominal Flow'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCongestion;
