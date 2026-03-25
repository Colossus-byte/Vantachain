
import React, { useState, useEffect } from 'react';
import { generatePathRecommendation } from '../services/geminiService';
import { UserProgress, Recommendation } from '../types';

interface NeuralPathOptimizerProps {
  progress: UserProgress;
  onSelectPath: (topicId: string) => void;
}

const NeuralPathOptimizer: React.FC<NeuralPathOptimizerProps> = ({ progress, onSelectPath }) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizePath = async () => {
    setIsOptimizing(true);
    const rec = await generatePathRecommendation(progress);
    setRecommendation(rec);
    setIsOptimizing(false);
  };

  useEffect(() => {
    if (progress.completedTopics.length > 0 && !recommendation) {
      optimizePath();
    }
  }, [progress.completedTopics.length]);

  if (isOptimizing) {
    return (
      <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
        <div className="w-12 h-12 relative mb-6">
          <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Running Path Optimization Scans...</p>
      </div>
    );
  }

  if (!recommendation) return null;

  return (
    <div className="mt-12 p-10 rounded-[2.5rem] bg-emerald-500/[0.03] border border-emerald-500/10 relative overflow-hidden group animate-in zoom-in-95 duration-700">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <i className="fa-solid fa-route"></i>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">AI-Optimized Trajectory</h4>
              <p className="text-sm font-bold text-white uppercase tracking-tight">Personalized Goal: {recommendation.specializationRole}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
            {recommendation.estimatedPathLength}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-black text-white mb-4 uppercase leading-tight tracking-tighter">
            Next Critical Node: {recommendation.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            {recommendation.rationale}
          </p>
        </div>

        <button 
          onClick={() => onSelectPath(recommendation.targetTopicId)}
          className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-500/10"
        >
          Initialize Targeted Sync
        </button>
      </div>
    </div>
  );
};

export default NeuralPathOptimizer;
