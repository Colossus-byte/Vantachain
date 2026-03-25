
import React, { useState, useMemo } from 'react';
import { TOPICS, DID_YOU_KNOW_FACTS, UI_TRANSLATIONS, LANGUAGES } from './constants';
import { Difficulty, UserProgress, Language } from './types';
import CollectiblesVault from './components/CollectiblesVault';

interface SidebarProps {
  progress: UserProgress;
  onSelectTopic: (id: string) => void;
  onSelectView: (view: string) => void;
  onLanguageChange: (lang: Language) => void;
  activeTopicId: string;
  activeView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ progress, onSelectTopic, onSelectView, onLanguageChange, activeTopicId, activeView }) => {
  const [showVault, setShowVault] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const difficulties = Object.values(Difficulty);

  const t = UI_TRANSLATIONS[progress.language] || UI_TRANSLATIONS[Language.EN];

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return TOPICS;
    const query = searchQuery.toLowerCase();
    return TOPICS.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentLang = LANGUAGES.find(l => l.code === progress.language) || LANGUAGES[0];

  return (
    <div className="w-72 h-full flex flex-col bg-[#05060a] border-r border-white/[0.03] z-20 overflow-hidden shadow-2xl">
      <div className="p-8 shrink-0">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl crypto-gradient flex items-center justify-center text-black shadow-lg shadow-emerald-500/10">
              <i className="fa-solid fa-cube text-base"></i>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-display text-white uppercase leading-none tracking-tight">CryptoPath</h1>
              <span className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.25em] mt-1">{t.access_level}</span>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <span className="text-xs">{currentLang.flag}</span>
            </button>
            
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-[#11141d] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${progress.language === lang.code ? 'text-emerald-500 bg-emerald-500/5' : 'text-slate-400'}`}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-8">
           <button 
             onClick={() => onSelectView('academy')}
             className={`w-full py-4 px-5 rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest ${activeView === 'academy' ? 'bg-white/10 text-white border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
           >
             <i className="fa-solid fa-graduation-cap text-xs"></i>
             {t.academy}
           </button>
           <button 
             onClick={() => onSelectView('guilds')}
             className={`w-full py-4 px-5 rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest ${activeView === 'guilds' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/10' : 'text-slate-500 hover:text-rose-400'}`}
           >
             <i className="fa-solid fa-users-gear text-xs"></i>
             {t.guilds}
           </button>
           <button 
             onClick={() => onSelectView('governance')}
             className={`w-full py-4 px-5 rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest ${activeView === 'governance' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10' : 'text-slate-500 hover:text-amber-400'}`}
           >
             <i className="fa-solid fa-landmark text-xs"></i>
             {t.governance}
           </button>
           <button 
             onClick={() => onSelectView('certification')}
             className={`w-full py-4 px-5 rounded-2xl flex items-center gap-4 transition-all text-[11px] font-black uppercase tracking-widest ${activeView === 'certification' ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-white'}`}
           >
             <i className="fa-solid fa-certificate text-xs"></i>
             {t.certification}
           </button>
        </div>

        <div className="relative mb-6">
          <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-600"></i>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.scan_modules}
            className="w-full bg-white/[0.02] border border-white/[0.04] rounded-xl py-3 pl-10 pr-4 text-[9px] font-bold uppercase tracking-widest text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-10 no-scrollbar">
        {activeView === 'academy' && difficulties.map(diff => {
          const filteredDiffTopics = filteredTopics.filter(t => t.difficulty === diff);
          if (filteredDiffTopics.length === 0) return null;

          return (
            <div key={diff}>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-700 mb-4 px-4">
                {diff} {t.level}S
              </h3>
              <div className="space-y-1 px-2">
                {filteredDiffTopics.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    className={`w-full group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                      activeTopicId === topic.id 
                        ? 'bg-white/[0.04] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]'
                    }`}
                  >
                    {activeTopicId === topic.id && (
                      <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_10px_#10b981]"></div>
                    )}
                    
                    <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] transition-all ${
                      progress.completedTopics.includes(topic.id) 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : activeTopicId === topic.id ? 'bg-white/10 text-white' : 'bg-white/5 text-slate-800'
                    }`}>
                      {progress.completedTopics.includes(topic.id) ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-circle text-[4px]"></i>
                      )}
                    </div>

                    <span className="text-[13px] font-semibold truncate tracking-tight leading-none">{topic.title}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        
        {activeView !== 'academy' && (
           <div className="px-4 py-12 text-center opacity-40">
              <i className="fa-solid fa-compass-drafting text-4xl mb-4 text-slate-700"></i>
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{t.search_restricted}</p>
           </div>
        )}
      </div>

      <div className="p-8 border-t border-white/[0.03]">
        <button 
          onClick={() => setShowVault(true)}
          className="w-full py-4 rounded-xl border border-white/5 bg-white/[0.01] text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest"
        >
          <i className="fa-solid fa-vault text-[10px]"></i>
          {t.collectibles} ({progress.achievements.length})
        </button>
      </div>

      {showVault && (
        <CollectiblesVault 
          unlockedIds={progress.achievements} 
          onClose={() => setShowVault(false)} 
        />
      )}
    </div>
  );
};

export default Sidebar;
