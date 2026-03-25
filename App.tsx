
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import Quiz from './components/Quiz';
import VideoGenerator from './components/VideoGenerator';
import NewsPulse from './components/NewsPulse';
import AudioNarrator from './components/AudioNarrator';
import ProtocolLab from './components/ProtocolLab';
import AuditLab from './components/AuditLab';
import RichContent from './components/RichContent';
import SkillSpider from './components/SkillSpider';
import MarketIntelligence from './components/MarketIntelligence';
import Onboarding from './components/Onboarding';
import PortfolioTracker from './components/PortfolioTracker';
import CertificationHub from './components/CertificationHub';
import GuildHub from './components/GuildHub';
import GovernanceForum from './components/GovernanceForum';
import PeerNexus from './components/PeerNexus';
import ProfileView from './components/ProfileView';
import InstitutionalPortal from './components/InstitutionalPortal';
import NeuralRoadmap from './components/NeuralRoadmap';
import DeFiSimulator from './components/DeFiSimulator';
import NetworkCongestion from './components/NetworkCongestion';
import NotificationSystem from './components/NotificationSystem';
import Manifesto from './components/Manifesto';
import ZkPrivacyCloak from './components/ZkPrivacyCloak';
import AiSentimentOracle from './components/AiSentimentOracle';
import VantaAtlas from './components/VantaAtlas';
import { TOPICS, UI_TRANSLATIONS, DEFAULT_AVATARS } from './constants';
import { UserProgress, QuizQuestion, Language, Guild, P2PMessage, P2PTransaction, ProtocolNotification, Recommendation } from './types';
import { generateQuiz, generatePathRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('vantachain_v1_state');
    if (saved) return JSON.parse(saved);
    return { 
      completedSubtopics: [], 
      completedTopics: [],
      tokenBalance: 0, 
      currentTopicId: 'b1', 
      currentSubtopicIndex: 0,
      discoveredFactIds: [],
      quizHistory: [],
      onboarded: false,
      achievements: [],
      metrics: { cryptography: 5, defi: 0, security: 0, economics: 10 },
      language: Language.EN,
      guild: Guild.NONE,
      votedProposalIds: [],
      p2pTransactions: [],
      p2pMessages: [],
      username: 'UnknownEntity',
      bio: '',
      avatarUrl: DEFAULT_AVATARS[0],
      notifications: [],
      vantaRank: 1,
      isPro: false,
      isPrivate: false,
      aiSentinelAccess: true
    };
  });

  const [activeView, setActiveView] = useState<'academy' | 'certification' | 'institutional' | 'guilds' | 'governance' | 'peers' | 'profile'>('academy');
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [showManifesto, setShowManifesto] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);

  useEffect(() => {
    localStorage.setItem('vantachain_v1_state', JSON.stringify(progress));
  }, [progress]);

  const addNotification = (title: string, message: string, type: ProtocolNotification['type'] = 'info') => {
    const newNotif: ProtocolNotification = {
      id: Math.random().toString(),
      title,
      message,
      type,
      timestamp: Date.now()
    };
    setProgress(p => ({ ...p, notifications: [newNotif, ...p.notifications] }));
  };

  const dismissNotification = (id: string) => {
    setProgress(p => ({ ...p, notifications: p.notifications.filter(n => n.id !== id) }));
  };

  const currentTopic = useMemo(() => 
    TOPICS.find(t => t.id === progress.currentTopicId) || TOPICS[0]
  , [progress.currentTopicId]);

  const currentSubtopic = currentTopic.subtopics[progress.currentSubtopicIndex];

  const handleNext = () => {
    const isLastSubtopic = progress.currentSubtopicIndex === currentTopic.subtopics.length - 1;
    if (isLastSubtopic) {
      handleStartQuiz();
    } else {
      setProgress(prev => ({ ...prev, currentSubtopicIndex: prev.currentSubtopicIndex + 1 }));
    }
  };

  const handleStartQuiz = async () => {
    setIsGeneratingQuiz(true);
    const questions = await generateQuiz(currentTopic.subtopics.map(s => s.content).join(' '), progress.language);
    setQuizQuestions(questions);
    setIsQuizMode(true);
    setIsGeneratingQuiz(false);
  };

  const handleQuizComplete = (score: number, total: number) => {
    if (score >= total * 0.7) {
      const currentIndex = TOPICS.findIndex(t => t.id === currentTopic.id);
      const nextTopic = TOPICS[currentIndex + 1];
      const newCompletedTopics = [...new Set([...progress.completedTopics, currentTopic.id])];
      
      const updatedProgress = {
        ...progress,
        completedTopics: newCompletedTopics,
        tokenBalance: progress.tokenBalance + currentTopic.rewardTokens,
        currentTopicId: nextTopic?.id || progress.currentTopicId,
        currentSubtopicIndex: 0,
        vantaRank: progress.vantaRank + 1
      };

      setProgress(updatedProgress);
      addNotification('Protocol Proof Success', `Authenticated node. Reward: ${currentTopic.rewardTokens} $PATH.`, 'success');
      
      // Generate AI recommendation based on new progress
      generateNewRecommendation(updatedProgress);
    }
    setIsQuizMode(false);
  };

  const generateNewRecommendation = async (currentProgress: UserProgress) => {
    setIsGeneratingRecommendation(true);
    try {
      const rec = await generatePathRecommendation(currentProgress);
      setRecommendation(rec);
    } catch (error) {
      console.error("Failed to generate recommendation:", error);
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };

  const finishOnboarding = (username: string, avatarUrl: string, bio: string, role: string, guild: Guild) => {
    setProgress(p => ({ ...p, onboarded: true, username, avatarUrl, bio, guild }));
    setShowManifesto(true);
  };

  const togglePrivacy = () => {
    setProgress(p => {
      const newState = !p.isPrivate;
      addNotification('ZK-Shield Update', newState ? 'Privacy Cloaking Active' : 'Identity De-masked', 'info');
      return { ...p, isPrivate: newState };
    });
  };

  const togglePro = () => {
    setProgress(p => {
      const newState = !p.isPro;
      addNotification('Institutional Calibration', newState ? 'Vanta Pro Activated' : 'Standard Node Active', 'success');
      return { ...p, isPro: newState };
    });
  };

  if (!progress.onboarded) return <Onboarding onComplete={finishOnboarding} />;

  const t = UI_TRANSLATIONS[progress.language] || UI_TRANSLATIONS[Language.EN];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#020205] text-[#e2e8f0] relative">
      {showManifesto && <Manifesto onClose={() => setShowManifesto(false)} />}
      
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>

      <div className={`fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
          progress={progress} 
          onSelectTopic={(id) => {
            setProgress(p => ({ ...p, currentTopicId: id, currentSubtopicIndex: 0 }));
            setIsSidebarOpen(false);
          }}
          onSelectView={(v) => {
            setActiveView(v as any);
            setIsSidebarOpen(false);
          }}
          onLanguageChange={(l) => setProgress(p => ({ ...p, language: l }))}
          activeTopicId={currentTopic.id}
          activeView={activeView}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <NotificationSystem notifications={progress.notifications} onDismiss={dismissNotification} />

      <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
        <header className="h-16 md:h-24 border-b border-white/5 flex items-center justify-between px-4 md:px-12 bg-black/40 backdrop-blur-xl sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-3 md:gap-12">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              <i className="fa-solid fa-bars-staggered text-sm"></i>
            </button>

            <div onClick={() => setActiveView('profile')} className="flex items-center gap-2 md:gap-4 cursor-pointer group">
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 overflow-hidden transition-all duration-500 ${progress.isPrivate ? 'border-[#8b5cf6] blur-sm' : 'border-[#ccff00]/30 group-hover:border-[#ccff00]'}`}>
                <img src={progress.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <p className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest mb-0.5 md:mb-1 opacity-50">Identity Proxy</p>
                <h2 className="text-white font-bold tracking-tighter text-xs md:text-sm uppercase group-hover:text-[#ccff00] transition-colors">
                  {progress.isPrivate ? 'ZK_ENTITY_ANON' : progress.username}
                </h2>
              </div>
            </div>
            <div className="hidden md:block h-8 w-px bg-white/10"></div>
            <button 
              onClick={() => setShowManifesto(true)}
              className="hidden lg:block px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-white/5 border border-white/10 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
            >
              Protocol Manifesto
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4 bg-white/5 px-3 md:px-6 py-1.5 md:py-3 rounded-full border border-white/10">
              <i className="fa-solid fa-coins text-[#ccff00] text-[10px] md:text-base"></i>
              <span className="text-xs md:text-lg font-bold text-white tracking-tighter">{progress.tokenBalance.toLocaleString()} <span className="text-[7px] md:text-[10px] text-slate-500">$PATH</span></span>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
          {activeView === 'academy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
              <div className="lg:col-span-12 space-y-12">
                {!isQuizMode && (recommendation || isGeneratingRecommendation) && (
                  <NeuralRoadmap 
                    recommendation={recommendation} 
                    onNavigate={(id) => setProgress(p => ({ ...p, currentTopicId: id, currentSubtopicIndex: 0 }))} 
                    isLoading={isGeneratingRecommendation}
                  />
                )}
                {!isQuizMode && <VantaAtlas progress={progress} onSelectTopic={(id) => setProgress(p => ({ ...p, currentTopicId: id, currentSubtopicIndex: 0 }))} />}
              </div>
              
              <div className="lg:col-span-8">
                {isQuizMode ? (
                  <Quiz questions={quizQuestions} onComplete={handleQuizComplete} onCancel={() => setIsQuizMode(false)} />
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <span className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {currentTopic.difficulty} BLOCK
                      </span>
                      <span className="text-[8px] md:text-[10px] font-bold text-[#8b5cf6] uppercase tracking-[0.2em]">{currentTopic.category}</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 md:mb-12 tracking-tighter leading-none">{currentSubtopic.title}</h1>

                    <div className="mb-12 md:mb-16"><RichContent content={currentSubtopic.content} /></div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-8 md:py-12 border-t border-white/5">
                      <AudioNarrator text={currentSubtopic.content} language={progress.language} />
                      <button 
                        onClick={handleNext}
                        disabled={isGeneratingQuiz}
                        className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-6 bg-[#ccff00] text-black font-black uppercase tracking-widest text-[10px] md:text-xs rounded-2xl md:rounded-3xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4"
                      >
                        {isGeneratingQuiz ? 'Forging Block...' : progress.currentSubtopicIndex === currentTopic.subtopics.length - 1 ? 'Proof of Knowledge' : 'Sync Next Node'}
                        <i className="fa-solid fa-chevron-right text-[8px] md:text-[10px]"></i>
                      </button>
                    </div>

                    {currentTopic.id === 'f1' && <NetworkCongestion />}
                    {currentTopic.id === 'm1' && <DeFiSimulator />}
                    {currentTopic.id === 'p1' && <AuditLab />}
                    <ProtocolLab />
                    <NewsPulse topicTitle={currentTopic.title} language={progress.language} />
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 space-y-8 md:space-y-12 lg:sticky lg:top-36 h-fit">
                {!isQuizMode && (
                  <>
                    <ZkPrivacyCloak isActive={progress.isPrivate} onToggle={togglePrivacy} />
                    <AiSentimentOracle />
                    <PortfolioTracker progress={progress} />
                    <SkillSpider metrics={progress.metrics} />
                  </>
                )}
              </div>
            </div>
          )}

          {activeView === 'peers' && <PeerNexus progress={progress} onSendMessage={() => {}} onSendTokens={() => {}} />}
          {activeView === 'institutional' && <InstitutionalPortal isPro={progress.isPro} onTogglePro={togglePro} />}
          {activeView === 'guilds' && <GuildHub progress={progress} onJoinGuild={(g) => setProgress(p => ({ ...p, guild: g }))} />}
          {activeView === 'governance' && <GovernanceForum progress={progress} onVote={() => {}} />}
          {activeView === 'certification' && <CertificationHub progress={progress} />}
          {activeView === 'profile' && <ProfileView progress={progress} onUpdate={(u) => setProgress(p => ({ ...p, ...u }))} />}
        </div>
      </main>

      <div 
        onClick={() => setIsAiOpen(!isAiOpen)}
        className={`fixed right-6 md:left-12 bottom-6 md:bottom-12 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-500 z-[100] ${
          isAiOpen ? 'bg-white text-black scale-90' : 'bg-[#8b5cf6] text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-110'
        }`}
      >
        <i className={`fa-solid ${isAiOpen ? 'fa-xmark' : 'fa-brain-circuit'} text-lg md:text-xl`}></i>
      </div>

      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} currentContext={currentSubtopic.content} language={progress.language} />
    </div>
  );
};

export default App;
