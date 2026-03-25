
import React, { useState, useEffect, useRef } from 'react';
import { TOPICS } from '../constants';
import { Topic, Subtopic } from '../types';

interface SearchResult {
  topicId: string;
  subtopicIndex: number;
  title: string;
  type: 'Topic' | 'Subtopic';
  preview: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (topicId: string, subtopicIndex: number) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const matched: SearchResult[] = [];

    TOPICS.forEach(topic => {
      // Search Topic Title/Desc
      const topicMatches = searchTerms.every(term => 
        topic.title.toLowerCase().includes(term) || 
        topic.description.toLowerCase().includes(term)
      );

      if (topicMatches) {
        matched.push({
          topicId: topic.id,
          subtopicIndex: 0,
          title: topic.title,
          type: 'Topic',
          preview: topic.description
        });
      }

      // Search Subtopics
      topic.subtopics.forEach((sub, idx) => {
        const subMatches = searchTerms.every(term => 
          sub.title.toLowerCase().includes(term) || 
          sub.content.toLowerCase().includes(term)
        );

        if (subMatches && !matched.some(m => m.title === sub.title)) {
          matched.push({
            topicId: topic.id,
            subtopicIndex: idx,
            title: sub.title,
            type: 'Subtopic',
            preview: sub.content.substring(0, 80).replace(/[#*`]/g, '') + '...'
          });
        }
      });
    });

    setResults(matched.slice(0, 8));
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      if (results[activeIndex]) {
        const res = results[activeIndex];
        onSelect(res.topicId, res.subtopicIndex);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-8 md:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl glass-steel rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300">
        <div className="flex items-center px-4 md:px-8 py-4 md:py-6 border-b border-white/5 gap-3 md:gap-4">
          <i className="fa-solid fa-magnifying-glass text-slate-500 text-sm md:text-lg"></i>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Protocol: type to scan nodes..."
            className="flex-1 bg-transparent border-none outline-none text-white text-sm md:text-lg font-medium placeholder:text-slate-600"
          />
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESC</span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-500 hover:text-white p-2">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="p-2 md:p-4 max-h-[70vh] md:max-h-[480px] overflow-y-auto no-scrollbar">
          {!query ? (
            <div className="py-10 md:py-12 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-slate-700">
                 <i className="fa-solid fa-terminal text-xl md:text-2xl"></i>
              </div>
              <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Awaiting Input Query</p>
              <p className="text-[7px] md:text-[10px] text-slate-700 font-black mt-1.5 md:mt-2">SCANNING 100+ KNOWLEDGE NODES</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 md:py-12 text-center text-slate-500">
              <i className="fa-solid fa-triangle-exclamation text-rose-500/50 text-xl md:text-2xl mb-3 md:mb-4"></i>
              <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest">Zero Consensus Matches Found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((res, idx) => (
                <button
                  key={`${res.topicId}-${res.subtopicIndex}`}
                  onClick={() => { onSelect(res.topicId, res.subtopicIndex); onClose(); }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`w-full flex items-center gap-3 md:gap-5 p-3 md:p-5 rounded-xl md:rounded-2xl transition-all text-left ${
                    idx === activeIndex ? 'bg-emerald-500/10 border border-emerald-500/20' : 'border border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${
                    res.type === 'Topic' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    <i className={`fa-solid ${res.type === 'Topic' ? 'fa-layer-group' : 'fa-book-open'} text-xs md:text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-0.5 md:mb-1">
                      <h4 className="font-bold text-white truncate text-xs md:text-base">{res.title}</h4>
                      <span className={`text-[5px] md:text-[8px] font-black px-1 md:px-2 py-0.5 rounded border uppercase tracking-widest ${
                        res.type === 'Topic' ? 'border-indigo-500/30 text-indigo-500' : 'border-emerald-500/30 text-emerald-500'
                      }`}>
                        {res.type}
                      </span>
                    </div>
                    <p className="text-[9px] md:text-xs text-slate-500 truncate font-medium">{res.preview}</p>
                  </div>
                  <i className={`fa-solid fa-chevron-right text-[7px] md:text-[10px] transition-all ${idx === activeIndex ? 'text-emerald-500 translate-x-1' : 'text-slate-800'}`}></i>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 md:px-8 py-3 md:py-4 border-t border-white/5 bg-black/20 flex items-center justify-between">
           <div className="hidden md:flex gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Navigate</span>
                <div className="flex gap-1">
                  <span className="w-5 h-5 flex items-center justify-center bg-white/5 rounded border border-white/10 text-[10px] text-slate-400">↑</span>
                  <span className="w-5 h-5 flex items-center justify-center bg-white/5 rounded border border-white/10 text-[10px] text-slate-400">↓</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Select</span>
                <span className="px-2 h-5 flex items-center justify-center bg-white/5 rounded border border-white/10 text-[10px] text-slate-400">ENTER</span>
              </div>
           </div>
           <div className="text-[7px] md:text-[10px] font-black text-emerald-500/50 uppercase tracking-[0.2em] w-full md:w-auto text-center md:text-right">Index: V4.1-SEARCH</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
