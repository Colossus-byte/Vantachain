
import React from 'react';
import { MasteryMetrics } from '../types';

interface SkillSpiderProps {
  metrics: MasteryMetrics;
}

const SkillSpider: React.FC<SkillSpiderProps> = ({ metrics }) => {
  const categories = [
    { key: 'cryptography' as const, label: 'CRYPTO' },
    { key: 'defi' as const, label: 'DEFI' },
    { key: 'security' as const, label: 'SECURITY' },
    { key: 'economics' as const, label: 'ECON' },
  ];

  // Simple SVG Radar Logic
  const size = 200;
  const center = size / 2;
  const radius = center - 20;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = categories.map((cat, i) => getPoint(i, metrics[cat.key]));
  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 md:mb-6 self-start">
        <i className="fa-solid fa-chart-pie text-emerald-500 text-[8px] md:text-[10px]"></i>
        <span className="text-[7px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest">Neural Mastery Profile</span>
      </div>
      
      <div className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Background Circles */}
          {[0.25, 0.5, 0.75, 1].map((r, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius * r}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.05"
            />
          ))}
          
          {/* Axis Lines */}
          {categories.map((_, i) => {
            const p = getPoint(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.05"
              />
            );
          })}

          {/* Skill Polygon */}
          <polygon
            points={polygonPath}
            fill="rgba(16, 185, 129, 0.1)"
            stroke="#10b981"
            strokeWidth="2"
            className="transition-all duration-1000"
          />

          {/* Category Labels */}
          {categories.map((cat, i) => {
            const p = getPoint(i, 115);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                className="text-[8px] font-black fill-slate-500 tracking-tighter"
              >
                {cat.label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mt-6 md:mt-8">
        {categories.map((cat) => (
          <div key={cat.key} className="flex flex-col">
            <span className="text-[6px] md:text-[7px] font-bold text-slate-600 uppercase mb-0.5 md:mb-1 tracking-widest">{cat.label} LVL</span>
            <span className="text-[10px] md:text-xs font-bold text-white tracking-tighter">{metrics[cat.key]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillSpider;
