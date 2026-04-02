import React from 'react';
import { motion } from 'motion/react';

interface WalletSummaryCardProps {
  address: string;
}

const WalletSummaryCard: React.FC<WalletSummaryCardProps> = ({ address }) => {
  // Mock data for public blockchain data
  const ethBalance = "1.45";
  const ethValue = "$4,825.30";
  
  const topHoldings = [
    { symbol: "USDC", amount: "2,500.00", value: "$2,500.00", icon: "fa-solid fa-dollar-sign", color: "text-blue-400" },
    { symbol: "LINK", amount: "150.00", value: "$2,850.00", icon: "fa-solid fa-link", color: "text-indigo-400" },
    { symbol: "UNI", amount: "400.00", value: "$3,200.00", icon: "fa-brands fa-ethereum", color: "text-pink-400" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-slate-900 to-surface border border-white/10 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <i className="fa-solid fa-wallet text-blue-500 text-sm"></i>
            </div>
            <h3 className="text-sm md:text-base font-bold text-white tracking-wide">Your Connected Wallet</h3>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 w-fit min-h-[30px] flex items-center">
            {address ? (
              address
            ) : (
              <span className="flex items-center gap-2 text-slate-500">
                <i className="fa-solid fa-link-slash opacity-50"></i> 
                <span className="italic opacity-70">0x... (Awaiting Connection)</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">{ethBalance} <span className="text-lg text-blue-500">ETH</span></h2>
          </div>
          <p className="text-sm text-emerald-400 font-medium mt-1">≈ {ethValue}</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5">
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Top Holdings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topHoldings.map((holding, idx) => (
            <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-black/40 flex items-center justify-center ${holding.color}`}>
                  <i className={holding.icon}></i>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{holding.symbol}</p>
                  <p className="text-xs text-slate-400">{holding.amount}</p>
                </div>
              </div>
              <p className="text-white font-medium text-sm">{holding.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WalletSummaryCard;
