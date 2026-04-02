import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: string) => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-surface border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-white/5 text-center relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-lime/10 border border-cyber-lime/20 mb-4">
              <i className="fa-solid fa-bolt text-cyber-lime text-xs"></i>
              <span className="text-[10px] font-bold text-cyber-lime uppercase tracking-widest">Upgrade Required</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Unlock Clarix Pro</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Get the insights you need to move with confidence. Access institutional-grade analytics, AI sentiment oracles, and dedicated nodes.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="p-6 md:p-8 overflow-y-auto no-scrollbar bg-surface">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Free Plan */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">Standard Node</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-white">$0</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-slate-600 mt-1"></i>
                    <span>Basic Academy Access</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-slate-600 mt-1"></i>
                    <span>Community Forums</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-slate-600 mt-1"></i>
                    <span>Standard Node Sync</span>
                  </li>
                </ul>
                <button 
                  disabled
                  className="w-full py-3 rounded-xl bg-white/5 text-slate-500 font-bold text-sm uppercase tracking-widest cursor-not-allowed"
                >
                  Current Plan
                </button>
              </div>

              {/* Pro Plan */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/30 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
                <h3 className="text-lg font-bold text-blue-500 mb-2">Clarix Pro</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">$29</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                    <span>Institutional Portal Access</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                    <span>AI Sentiment Oracle</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                    <span>ZK Privacy Cloak</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <i className="fa-solid fa-check text-blue-500 mt-1"></i>
                    <span>Priority Network Support</span>
                  </li>
                </ul>
                <button 
                  onClick={() => onUpgrade('pro')}
                  className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-[1.02] active:scale-95"
                >
                  Start 7-Day Free Trial
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-3">No credit card required for trial.</p>
              </div>

              {/* Elite Plan */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2">Elite Node</h3>
                <div className="mb-6">
                  <span className="text-3xl font-black text-white">$99</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-cyber-lime mt-1"></i>
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-cyber-lime mt-1"></i>
                    <span>Full API Access</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-cyber-lime mt-1"></i>
                    <span>Dedicated RPC Node</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-300">
                    <i className="fa-solid fa-check text-cyber-lime mt-1"></i>
                    <span>1-on-1 Mentorship</span>
                  </li>
                </ul>
                <button 
                  onClick={() => onUpgrade('elite')}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-widest transition-all"
                >
                  Contact Sales
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpgradeModal;
