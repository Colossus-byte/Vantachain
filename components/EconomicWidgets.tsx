
import React, { useState } from 'react';

export const StakingCalculator: React.FC = () => {
  const [amount, setAmount] = useState(1000);
  const [apy, setApy] = useState(12);

  const monthly = (amount * (apy / 100)) / 12;

  return (
    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-steel border border-white/5 space-y-5 md:space-y-6">
      <div className="flex items-center gap-3">
        <i className="fa-solid fa-chart-line text-emerald-500 text-xs md:text-base"></i>
        <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Staking Simulator</h4>
      </div>
      <div className="space-y-4 md:space-y-4">
        <div className="flex flex-col gap-2 md:gap-2">
          <label className="text-[8px] md:text-[10px] font-black text-slate-600 uppercase">Principal ($)</label>
          <input 
            type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
            className="bg-black/40 border border-white/10 rounded-xl md:rounded-xl p-3 md:p-3 text-white font-bold text-sm md:text-base focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-4">
          <div className="p-4 md:p-5 rounded-2xl md:rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[7px] md:text-[8px] font-black text-slate-600 uppercase mb-1">Monthly Yield</div>
            <div className="text-base md:text-lg font-black text-emerald-500">${monthly.toFixed(2)}</div>
          </div>
          <div className="p-4 md:p-5 rounded-2xl md:rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[7px] md:text-[8px] font-black text-slate-600 uppercase mb-1">APY Fixed</div>
            <div className="text-base md:text-lg font-black text-white">{apy}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GasTracker: React.FC = () => {
  const [gas, setGas] = useState(24);

  return (
    <div className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] glass-steel border border-white/5">
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-gas-pump text-amber-500 text-xs md:text-base"></i>
          <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Gas Forecast</h4>
        </div>
        <span className="text-[7px] md:text-[10px] font-black text-amber-500 uppercase px-1.5 md:px-2 py-0.5 rounded border border-amber-500/20">Standard</span>
      </div>
      <div className="flex items-end gap-1.5 md:gap-2 mb-4 md:mb-4">
        <span className="text-3xl md:text-4xl font-black text-white">{gas}</span>
        <span className="text-[9px] md:text-xs font-bold text-slate-600 mb-1 md:mb-1.5 uppercase">Gwei</span>
      </div>
      <div className="w-full bg-white/5 h-1 md:h-1.5 rounded-full overflow-hidden">
        <div className="bg-amber-500 h-full w-[40%]"></div>
      </div>
    </div>
  );
};
