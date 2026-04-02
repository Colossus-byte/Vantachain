// components/AiSentimentOracle.tsx
// Clarix — Claude-powered AI Sentiment Oracle

import React, { useState, useEffect } from 'react';
import { generateSentimentAnalysis, SentimentAnalysis } from '../services/claudeService';

interface Props {
  userRole?: string;
  completedTopics?: string[];
}

const AiSentimentOracle: React.FC<Props> = ({ userRole = 'Investor', completedTopics = [] }) => {
  const [data, setData] = useState<SentimentAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchSentiment = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateSentimentAnalysis(userRole, completedTopics);
      setData(result);
      setLastRefresh(new Date());
    } catch (err: any) {
      setError('Oracle temporarily offline. Check your Claude API key.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSentiment();
    // Refresh every 5 minutes
    const interval = setInterval(fetchSentiment, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [userRole]);

  const sentimentColor = (s: string) => {
    switch (s) {
      case 'Bullish': return 'text-cyber-lime';
      case 'Bearish': return 'text-red-400';
      case 'Volatile': return 'text-orange-400';
      default: return 'text-yellow-400';
    }
  };

  const riskColor = (r: string) => {
    switch (r) {
      case 'Low': return 'bg-cyber-lime/10 text-cyber-lime border-cyber-lime/20';
      case 'Medium': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20';
      case 'High': return 'bg-orange-400/10 text-orange-400 border-orange-400/20';
      case 'Extreme': return 'bg-red-400/10 text-red-400 border-red-400/20';
      default: return 'bg-white/5 text-slate-400 border-white/10';
    }
  };

  const signalColor = (s: string) => {
    switch (s) {
      case 'Buy': return 'text-cyber-lime bg-cyber-lime/10 border-cyber-lime/20';
      case 'Hold': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Watch': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Caution': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center">
            <i className="fa-solid fa-brain-circuit text-electric-violet text-sm"></i>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">AI Sentiment Oracle</h3>
            <p className="text-slate-500 text-[10px]">Powered by Claude AI</p>
          </div>
        </div>
        <button
          onClick={fetchSentiment}
          disabled={isLoading}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          <i className={`fa-solid fa-rotate text-slate-400 text-xs ${isLoading ? 'animate-spin' : ''}`}></i>
        </button>
      </div>

      {/* Loading */}
      {isLoading && !data && (
        <div className="px-5 py-8 flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-electric-violet border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 text-xs">Oracle analyzing markets...</p>
        </div>
      )}

      {/* Error */}
      {error && !data && (
        <div className="px-5 py-6 text-center">
          <i className="fa-solid fa-triangle-exclamation text-orange-400 mb-2"></i>
          <p className="text-orange-400 text-xs mb-3">{error}</p>
          <button onClick={fetchSentiment} className="text-electric-violet text-xs underline">Retry</button>
        </div>
      )}

      {/* Data */}
      {data && (
        <div className="px-5 py-4 space-y-4">

          {/* Overall Sentiment */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Overall Signal</p>
              <p className={`text-2xl font-black tracking-tight ${sentimentColor(data.overallSentiment)}`}>
                {data.overallSentiment}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">Risk Level</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskColor(data.riskLevel)}`}>
                {data.riskLevel}
              </span>
            </div>
          </div>

          {/* Score Bar */}
          <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
              <span>Fear</span>
              <span>Score: {data.sentimentScore}/100</span>
              <span>Greed</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${data.sentimentScore}%`,
                  background: `linear-gradient(to right, #ef4444, #eab308, #84cc16)`,
                }}
              />
            </div>
          </div>

          {/* Market Narrative */}
          <p className="text-slate-300 text-xs leading-relaxed border-l-2 border-electric-violet/40 pl-3">
            {data.marketNarrative}
          </p>

          {/* Asset Signals */}
          <div className="space-y-2">
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Asset Signals</p>
            {data.signals.map((signal, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white text-xs font-bold">{signal.asset}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${signalColor(signal.signal)}`}>
                      {signal.signal}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] leading-snug">{signal.rationale}</p>
                </div>
                <div className="ml-3 text-right shrink-0">
                  <p className="text-slate-400 text-[10px]">{signal.confidence}%</p>
                  <p className="text-slate-600 text-[9px]">conf.</p>
                </div>
              </div>
            ))}
          </div>

          {/* Africa Note */}
          <div className="rounded-xl bg-cyber-lime/5 border border-cyber-lime/10 px-4 py-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px]">🌍</span>
              <p className="text-cyber-lime text-[10px] font-bold uppercase tracking-widest">Africa Market Note</p>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">{data.africanMarketNote}</p>
          </div>

          {/* Last refresh */}
          {lastRefresh && (
            <p className="text-slate-600 text-[10px] text-right">
              Last analyzed: {lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AiSentimentOracle;
