
import React, { useState, useMemo } from 'react';
import { useTerminology } from '../hooks/useTerminology';

const DeFiSimulator: React.FC = () => {
  const { Term } = useTerminology();
  const [priceChange, setPriceChange] = useState(50); // -100% to +400%
  const [tradingVolume, setTradingVolume] = useState(25); 

  const ilData = useMemo(() => {
    // Standard IL formula: 2 * sqrt(priceRatio) / (1 + priceRatio) - 1
    const priceRatio = (priceChange + 100) / 100;
    const impermanentLoss = (2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1) * 100;
    
    // Simple fee simulation
    const feesEarned = (tradingVolume * 0.3); // 0.3% fee model
    const totalPnl = impermanentLoss + feesEarned;

    return { il: impermanentLoss.toFixed(2), fees: feesEarned.toFixed(2), total: totalPnl.toFixed(2) };
  }, [priceChange, tradingVolume]);

  return (
    <div className="mt-8 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-void border border-emerald-500/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 md:w-96 h-32 md:h-96 bg-emerald-500/5 blur-[60px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          <div className="flex-1 space-y-6 md:space-y-10 w-full">
            <div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                  <i className="fa-solid fa-chart-area text-lg md:text-xl"></i>
                </div>
                <div>
                  <h3 className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-0.5 md:mb-1">PRO TOOL: <Term term="Liquidity" /> ENGINE</h3>
                  <p className="text-base md:text-2xl font-black text-white tracking-tighter uppercase italic">Impermanent Loss Visualizer</p>
                </div>
              </div>
              <p className="text-[9px] md:text-sm text-slate-400 leading-relaxed font-medium italic">
                Simulate how price <Term term="Volatility" /> affects your staked assets in an AMM.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Price Movement (Asset B)</span>
                  <span className="text-sm md:text-lg font-black text-white">{priceChange}%</span>
                </div>
                <input 
                  type="range" min="-90" max="400" value={priceChange} 
                  onChange={(e) => setPriceChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1 bg-white/10 rounded-full cursor-pointer"
                />
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Cumulative Trading Volume</span>
                  <span className="text-sm md:text-lg font-black text-white">${tradingVolume}k</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={tradingVolume} 
                  onChange={(e) => setTradingVolume(Number(e.target.value))}
                  className="w-full accent-electric-violet h-1 bg-white/10 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-black border border-white/5 flex flex-col justify-between">
              <p className="text-[7px] md:text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3 md:mb-4">Impermanent Loss</p>
              <p className="text-xl md:text-4xl font-black text-white tracking-tighter italic">{ilData.il}%</p>
              <div className="mt-4 md:mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: `${Math.abs(Number(ilData.il))}%` }}></div>
              </div>
            </div>

            <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-black border border-white/5 flex flex-col justify-between">
              <p className="text-[7px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 md:mb-4">Accrued Fees</p>
              <p className="text-xl md:text-4xl font-black text-white tracking-tighter italic">+{ilData.fees}%</p>
              <div className="mt-4 md:mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Number(ilData.fees) * 10)}%` }}></div>
              </div>
            </div>

            <div className="sm:col-span-2 p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-500 to-indigo-600 text-black flex items-center justify-between">
              <div>
                <p className="text-[7px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1 opacity-60">Net Yield vs Holding</p>
                <p className="text-xl md:text-5xl font-black tracking-tighter italic">{ilData.total}%</p>
              </div>
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-md">
                <i className={`fa-solid ${Number(ilData.total) >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'} text-lg md:text-2xl`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiSimulator;
