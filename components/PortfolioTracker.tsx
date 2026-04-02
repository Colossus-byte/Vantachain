
import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { useTerminology } from '../hooks/useTerminology';

interface PortfolioTrackerProps {
  progress: UserProgress;
  onUpdate?: (updates: Partial<UserProgress>) => void;
}

const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({ progress, onUpdate }) => {
  const { Term } = useTerminology();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Simulated valuation: $PATH is pinned to $0.05 for the simulation
  const pathValue = progress.tokenBalance * 0.05;
  
  const handleSaveToIPFS = () => {
    setIsSaving(true);
    // Simulate IPFS upload delay
    setTimeout(() => {
      const mockCid = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
      if (onUpdate) {
        onUpdate({ ipfsPortfolioCid: mockCid });
      }
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-gradient-to-br from-surface to-surface border border-white/[0.03] overflow-hidden relative group">
      <div className="absolute bottom-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-indigo-500/5 blur-[40px] md:blur-[50px] pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <i className="fa-solid fa-wallet text-[8px] md:text-[10px] text-indigo-400"></i>
          </div>
          <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"><Term term="Portfolio" /> Inventory</h4>
        </div>
        
        {progress.ipfsPortfolioCid && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20" title="Stored on IPFS">
            <i className="fa-solid fa-cube text-blue-500 text-[8px]"></i>
            <span className="text-[6px] md:text-[8px] font-bold text-blue-500 uppercase tracking-widest">IPFS</span>
          </div>
        )}
      </div>

      <div className="space-y-5 md:space-y-6">
        <div>
          <span className="text-[7px] md:text-[8px] font-black text-slate-600 uppercase tracking-widest block mb-1">Estimated Net Worth</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-black text-white">${pathValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <span className="text-[8px] md:text-[10px] font-bold text-emerald-500">+12.4% (Sim)</span>
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between p-2.5 md:p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg md:rounded-xl">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-[6px] md:text-[8px]">
                <i className="fa-solid fa-p"></i>
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-tighter">$PATH (Earned)</span>
            </div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-400">{progress.tokenBalance.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center justify-between p-2.5 md:p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg md:rounded-xl opacity-40">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-[6px] md:text-[8px]">
                <i className="fa-brands fa-ethereum"></i>
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-tighter">WETH (Locked)</span>
            </div>
            <span className="text-[8px] md:text-[10px] font-black text-slate-600">0.00</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button className="w-full py-2.5 md:py-3 bg-white/[0.02] border border-white/10 rounded-lg md:rounded-xl text-[7px] md:text-[8px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 transition-all">
            Sync External <Term term="Wallet address" />
          </button>
          <button 
            onClick={handleSaveToIPFS}
            disabled={isSaving || isSaved}
            className={`w-full py-2.5 md:py-3 border rounded-lg md:rounded-xl text-[7px] md:text-[8px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              isSaved 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                : 'bg-blue-500/10 border-blue-500/20 text-blue-500 hover:bg-blue-500/20'
            }`}
          >
            {isSaving ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> Uploading to IPFS...</>
            ) : isSaved ? (
              <><i className="fa-solid fa-check"></i> Saved to IPFS</>
            ) : (
              <><i className="fa-solid fa-cloud-arrow-up"></i> Backup to IPFS</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTracker;
