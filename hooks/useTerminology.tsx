import React, { useState } from 'react';
import { useNewbieMode } from '../contexts/NewbieModeContext';
import { motion, AnimatePresence } from 'motion/react';

const glossary: Record<string, string> = {
  'Neural Network Analytics': 'Smart Signals',
  'On-chain data': 'Live blockchain activity',
  'DeFi protocols': 'Crypto earning tools',
  'Market cap': 'Total coin value',
  'Liquidity': 'How easy to buy/sell',
  'Volatility': 'Price swing level',
  'Yield farming': 'Earning while holding',
  'Smart contract': 'Automated agreement',
  'Gas fees': 'Network cost',
  'Bull market': 'Rising market',
  'Bear market': 'Falling market',
  'Portfolio': 'Your crypto holdings',
  'Staking': 'Lock and earn',
  'Wallet address': 'Your crypto ID',
  'Token': 'Coin / Asset',
  'Slippage': 'Price shift risk',
  'Tier Level': 'Plan',
  'APY': 'Yearly earnings rate',
  'DEX': 'Crypto exchange',
  'NFT': 'Digital collectible',
  'ATH': 'All time high'
};

export const Term: React.FC<{ term: string; showHelp?: boolean }> = ({ term, showHelp = true }) => {
  const { t, isNewbieMode } = useTerminology();
  const [showTooltip, setShowTooltip] = useState(false);
  const translated = t(term);
  const isTranslated = translated !== term && isNewbieMode;

  if (!isNewbieMode) {
    return <span>{term}</span>;
  }

  return (
    <span 
      className="relative inline-flex items-center gap-1 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className={`transition-colors duration-300 ${isTranslated ? 'text-[#3b82f6] border-b border-dashed border-[#3b82f6]/50 cursor-help' : ''}`}>
        {translated}
      </span>
      {isTranslated && showHelp && (
        <span className="text-[10px] text-[#f59e0b] cursor-help hover:underline ml-1 whitespace-nowrap">
          (What does this mean?)
        </span>
      )}
      <AnimatePresence>
        {showTooltip && isTranslated && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-[#0a0a0f] border border-[#3b82f6]/30 rounded-xl shadow-xl z-50 text-xs text-slate-300 text-center pointer-events-none"
          >
            <span className="block text-[#3b82f6] font-bold mb-1">{term}</span>
            In crypto, this means: <span className="text-white font-medium">{translated}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export const useTerminology = () => {
  const { isNewbieMode } = useNewbieMode();

  const t = (term: string) => {
    if (!isNewbieMode) return term;
    const match = Object.keys(glossary).find(k => k.toLowerCase() === term.toLowerCase());
    return match ? glossary[match] : term;
  };

  return { t, Term, isNewbieMode };
};
