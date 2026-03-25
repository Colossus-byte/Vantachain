import React from 'react';
import { Recommendation } from '../types';
import { motion } from 'motion/react';

interface NeuralRoadmapProps {
  recommendation: Recommendation | null;
  onNavigate: (topicId: string) => void;
  isLoading?: boolean;
}

const NeuralRoadmap: React.FC<NeuralRoadmapProps> = ({ recommendation, onNavigate, isLoading }) => {
  if (isLoading || !recommendation) {
    return (
      <div className="p-8 md:p-12 rounded-[3rem] bg-[#080810] border border-indigo-500/20 relative overflow-hidden animate-pulse">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5"></div>
              <div className="space-y-2">
                <div className="h-3 w-32 bg-white/10 rounded"></div>
                <div className="h-8 w-64 bg-white/5 rounded"></div>
              </div>
            </div>
            <div className="h-48 w-full bg-white/5 rounded-[2rem]"></div>
            <div className="h-16 w-full bg-white/10 rounded-[2rem]"></div>
          </div>
          <div className="w-full lg:w-80 h-80 bg-white/5 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 rounded-[3rem] bg-[#080810] border border-indigo-500/20 relative overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <i className="fa-solid fa-route text-xl"></i>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-1">AI Neural Roadmap</h3>
              <p className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Your Adaptive Path</p>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Target Role</span>
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                {recommendation.specializationRole}
              </span>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-xl font-black text-white uppercase tracking-tight">{recommendation.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "{recommendation.rationale}"
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Est. Path Length</p>
                <p className="text-sm font-bold text-white">{recommendation.estimatedPathLength}</p>
              </div>
              <div className="h-8 w-px bg-white/5"></div>
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Neural Confidence</p>
                <p className="text-sm font-bold text-emerald-400">98.4%</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate(recommendation.targetTopicId)}
            className="w-full py-6 rounded-[2rem] bg-indigo-500 text-white font-black uppercase tracking-[0.3em] text-xs shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
          >
            Initialize Next Node
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>

        <div className="w-full lg:w-80 h-80 relative flex items-center justify-center">
          {/* Futuristic Roadmap Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute w-48 h-48 rounded-full border border-indigo-500/10 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute w-32 h-32 rounded-full border border-emerald-500/10 animate-[spin_10s_linear_infinite]"></div>
          </div>

          <div className="relative z-10 space-y-4 text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-indigo-500 mx-auto flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 relative">
              <i className="fa-solid fa-microchip text-3xl"></i>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#080810] animate-pulse"></div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-white uppercase tracking-widest">NODE_SYNC</p>
              <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">OPTIMIZED</p>
            </div>
          </div>

          {/* Floating Nodes */}
          {[
            { top: '10%', left: '20%', icon: 'fa-link', color: 'indigo' },
            { top: '20%', right: '10%', icon: 'fa-shield', color: 'emerald' },
            { bottom: '15%', left: '15%', icon: 'fa-coins', color: 'amber' },
            { bottom: '10%', right: '20%', icon: 'fa-code', color: 'rose' },
          ].map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className={`absolute w-10 h-10 rounded-xl bg-${node.color}-500/10 border border-${node.color}-500/20 flex items-center justify-center text-${node.color}-400 shadow-lg`}
              style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom }}
            >
              <i className={`fa-solid ${node.icon} text-xs`}></i>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeuralRoadmap;
