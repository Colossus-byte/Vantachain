import React from 'react';
import { useNewbieMode } from '../contexts/NewbieModeContext';
import { motion } from 'motion/react';

const NewbieToggle: React.FC = () => {
  const { isNewbieMode, toggleNewbieMode } = useNewbieMode();

  return (
    <button
      onClick={toggleNewbieMode}
      className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden group shrink-0"
    >
      <div className="relative z-10 flex items-center gap-2">
        <i className={`fa-solid ${isNewbieMode ? 'fa-graduation-cap text-hyper-gold' : 'fa-bolt text-blue-500'} transition-colors duration-300`}></i>
        <span className="text-[10px] md:text-xs font-bold text-white tracking-wide whitespace-nowrap">
          {isNewbieMode ? 'Switch to Expert Mode' : 'Switch to Newbie Mode'}
        </span>
      </div>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-hyper-gold/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </button>
  );
};

export default NewbieToggle;
