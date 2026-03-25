
import React, { useState } from 'react';

const ModularVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    { id: 'execution', title: 'Execution', desc: 'Rollups like Arbitrum or Optimism. This is where smart contracts run.', color: 'emerald' },
    { id: 'settlement', title: 'Settlement', desc: 'Where disputes are resolved and liquidity is bridged (e.g., Ethereum).', color: 'indigo' },
    { id: 'consensus', title: 'Consensus', desc: 'Agreement on the ordering of transactions.', color: 'amber' },
    { id: 'da', title: 'Data Availability', desc: 'Celestia or Avail. Ensuring transaction data is accessible to all.', color: 'rose' }
  ];

  return (
    <div className="mt-24 p-12 rounded-[3rem] bg-[#0c0e14] border border-emerald-500/10 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-5 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-layer-group text-2xl"></i>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-1">Architecture Sandbox: The Modular Stack</h3>
            <p className="text-2xl font-black text-white tracking-tighter uppercase italic">Layer Decoupling Analysis</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 py-8">
          {layers.map((layer, idx) => (
            <div 
              key={layer.id}
              onMouseEnter={() => setActiveLayer(layer.id)}
              className={`w-full max-w-md p-6 rounded-2xl border transition-all duration-500 cursor-help relative group/layer ${
                activeLayer === layer.id 
                  ? `bg-${layer.color}-500/10 border-${layer.color}-500/40 scale-[1.05] z-10` 
                  : 'bg-white/[0.02] border-white/5 opacity-60'
              }`}
              style={{ transform: `perspective(1000px) rotateX(25deg) translateY(${idx * -10}px)` }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-black uppercase tracking-widest text-${layer.color}-500`}>{layer.title} Layer</span>
                <i className={`fa-solid fa-microchip text-${layer.color}-500 opacity-0 group-hover/layer:opacity-100 transition-opacity`}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 min-h-[120px] transition-all duration-500">
          {activeLayer ? (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h4 className="text-white font-bold mb-2 uppercase tracking-tight text-lg">
                {layers.find(l => l.id === activeLayer)?.title} Insights
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {layers.find(l => l.id === activeLayer)?.desc}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full opacity-40 italic text-slate-500 text-sm">
              Hover over a layer to inspect its function in the modular stack.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModularVisualizer;
