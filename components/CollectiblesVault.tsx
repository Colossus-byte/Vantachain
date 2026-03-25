
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

interface CollectiblesVaultProps {
  unlockedIds: string[];
  onClose: () => void;
}

const CollectiblesVault: React.FC<CollectiblesVaultProps> = ({ unlockedIds, onClose }) => {
  const rarityColors = {
    common: 'text-slate-400 border-slate-500/20 bg-slate-500/5',
    rare: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    epic: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
    legendary: 'text-amber-400 border-amber-500/30 bg-amber-500/5'
  };

  const rarityGlows = {
    common: 'shadow-slate-500/5',
    rare: 'shadow-emerald-500/10',
    epic: 'shadow-indigo-500/10',
    legendary: 'shadow-amber-500/20'
  };

  return (
    <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl glass-panel rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-500 border border-white/5 custom-scrollbar">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-display text-white tracking-tight uppercase">Protocol Vault</h2>
            <p className="text-slate-500 font-bold text-[8px] md:text-[10px] uppercase tracking-[0.3em] mt-1 md:mt-2">Authenticated Artifacts & Collectibles</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all border border-white/5"
          >
            <i className="fa-solid fa-xmark text-lg md:text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedIds.includes(ach.id);
            return (
              <div 
                key={ach.id} 
                className={`group relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 ${
                  isUnlocked 
                    ? `${rarityColors[ach.rarity]} border-white/10 ${rarityGlows[ach.rarity]} shadow-2xl` 
                    : 'bg-white/[0.02] border-white/5 grayscale opacity-40'
                }`}
              >
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center text-xl md:text-2xl transition-transform duration-700 ${
                  isUnlocked ? 'group-hover:rotate-[360deg] group-hover:scale-110' : ''
                } ${isUnlocked ? 'bg-white/5' : 'bg-transparent'}`}>
                  <i className={`fa-solid ${ach.icon}`}></i>
                </div>
                
                <h3 className={`text-base md:text-lg font-black tracking-tight mb-1 md:mb-2 uppercase ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                  {ach.title}
                </h3>
                <p className={`text-[10px] md:text-xs leading-relaxed font-medium ${isUnlocked ? 'text-slate-400' : 'text-slate-700'}`}>
                  {isUnlocked ? ach.description : 'Locked Protocol Node'}
                </p>

                {isUnlocked && (
                  <div className={`absolute top-4 md:top-6 right-4 md:right-6 text-[7px] md:text-[8px] font-black uppercase tracking-widest px-1.5 md:px-2 py-0.5 rounded border border-current opacity-60`}>
                    {ach.rarity}
                  </div>
                )}

                {isUnlocked && (
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem] md:rounded-[2rem] pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {unlockedIds.length === 0 && (
          <div className="py-16 md:py-24 text-center">
            <i className="fa-solid fa-vault text-4xl md:text-6xl text-slate-800 mb-4 md:mb-6"></i>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs md:text-sm">No Artifacts Recovered Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectiblesVault;
