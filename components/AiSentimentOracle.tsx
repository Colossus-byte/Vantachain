
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { useTerminology } from '../hooks/useTerminology';

const AiSentimentOracle: React.FC = () => {
  const { Term } = useTerminology();
  const [narratives, setNarratives] = useState([
    { id: 'zk', name: 'ZK-Privacy', sentiment: 88, trend: 'up' },
    { id: 'ai', name: 'AI Agents', sentiment: 94, trend: 'up' },
    { id: 'rwa', name: 'RWA Tokens', sentiment: 42, trend: 'down' },
    { id: 'depin', name: 'DePIN Infra', sentiment: 67, trend: 'stable' }
  ]);
  const [directive, setDirective] = useState("AI sentiment is highly bullish on Agentic infrastructure. Strategic reallocation to compute-based sub-sectors is recommended for maximum capital efficiency.");
  const [loading, setLoading] = useState(false);

  const refreshSentiment = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze the current top 4 crypto narratives. Provide a list of names/sentiments/trends and a one-sentence 'Tactical Directive' summarizing the current optimal market behavior.",
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }]
        }
      });
      
      // Simulation for interactivity
      setTimeout(() => {
        setNarratives(prev => prev.map(n => ({ ...n, sentiment: Math.min(100, Math.max(10, n.sentiment + (Math.random() * 10 - 5))) })));
        setLoading(false);
      }, 1500);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-surface border border-electric-violet/20 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-electric-violet/5 blur-2xl md:blur-3xl"></div>
      
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-electric-violet/10 flex items-center justify-center text-electric-violet">
            <i className="fa-solid fa-wand-sparkles text-xs md:text-sm"></i>
          </div>
          <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500"><Term term="Neural Network Analytics" /></h4>
        </div>
        <button 
          onClick={refreshSentiment}
          disabled={loading}
          className={`w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all disabled:opacity-50 ${loading ? 'animate-spin' : ''}`}
        >
          <i className="fa-solid fa-rotate-right text-[8px] md:text-[10px]"></i>
        </button>
      </div>

      <div className="space-y-5 md:space-y-6 mb-6 md:mb-8">
        {narratives.map((n) => (
          <div key={n.id} className="space-y-1.5 md:space-y-2">
            <div className="flex justify-between items-center text-[8px] md:text-[9px] font-black uppercase tracking-widest">
              <span className="text-white">{n.name}</span>
              <span className={n.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
                {n.sentiment.toFixed(0)}% <i className={`fa-solid fa-arrow-${n.trend} text-[6px] md:text-[8px]`}></i>
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-electric-violet to-cyber-lime transition-all duration-1000" 
                style={{ width: `${n.sentiment}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-5">
          <i className="fa-solid fa-brain text-4xl md:text-5xl"></i>
        </div>
        <p className="text-[6px] md:text-[7px] font-black text-slate-600 uppercase tracking-widest mb-1.5 md:mb-2">Tactical Directive:</p>
        <div className="text-[9px] md:text-[10px] text-slate-300 font-medium leading-relaxed italic markdown-content">
          <ReactMarkdown>{"\"" + directive + "\""}</ReactMarkdown>
        </div>
      </div>
      
      <p className="mt-6 md:mt-8 text-[7px] md:text-[8px] font-bold text-slate-600 uppercase tracking-widest text-center">
        AI-Augmented Narrative Analysis
      </p>
    </div>
  );
};

export default AiSentimentOracle;
