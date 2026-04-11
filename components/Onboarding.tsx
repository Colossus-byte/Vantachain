
import React, { useState, useEffect } from 'react';
import { Guild } from '../types';
import { DEFAULT_AVATARS } from '../constants';

interface OnboardingProps {
  onComplete: (username: string, avatarUrl: string, bio: string, role: string, guild: Guild) => void;
  onSkip?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  const [role, setRole] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<Guild>(Guild.NONE);
  
  // New personalization states
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);

  const fullText = "SETTING UP YOUR CLARIX WORKSPACE... [OK]\nANALYZING CURRENT MARKET DATA... [DONE]\nPREPARING YOUR PERSONALIZED INSIGHTS... [CONNECTED]\nWELCOME TO CLARIX. LET'S GET STARTED.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const roles = [
    { id: 'beginner', label: 'Learner', icon: 'fa-book-open', desc: 'I want to understand crypto basics.' },
    { id: 'investor', label: 'Investor', icon: 'fa-chart-line', desc: 'I want to grow my portfolio safely.' },
    { id: 'trader', label: 'Trader', icon: 'fa-bolt-lightning', desc: 'I want to catch market movements.' },
  ];

  if (step === 0) {
    return (
      <div className="fixed inset-0 z-[500] bg-void flex items-center justify-center p-6 md:p-8">
        <div className="max-w-xl w-full">
          <div className="mb-8 md:mb-12">
            <pre className="terminal-text text-[10px] md:text-sm whitespace-pre-wrap leading-relaxed h-40 md:h-32">
              {terminalText}
              <span className="animate-pulse">_</span>
            </pre>
          </div>
          {terminalText.length >= fullText.length && (
            <button 
              onClick={() => setStep(1)}
              className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent border border-blue-500 text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-blue-500 hover:text-white transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 w-full h-full bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[500] bg-void flex items-center justify-center p-4 md:p-6 overflow-y-auto no-scrollbar">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl w-full relative z-10 py-8">
        <div className="flex justify-between items-center mb-8 md:mb-16">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 md:gap-2">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-1 w-8 md:w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-500' : 'bg-white/10'}`}></div>
              ))}
            </div>
            <span className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest text-slate-500">
              Step {step} of 4
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 uppercase tracking-widest">
              <i className="fa-solid fa-bolt text-[8px]"></i>+{step === 1 ? '25' : step === 2 ? '50' : step === 3 ? '75' : '100'} XP on finish
            </span>
          </div>
        </div>

        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">WHAT'S YOUR GOAL?</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-1 font-medium">This helps us personalize your dashboard and insights.</p>
            <p className="text-[10px] text-slate-600 mb-8 md:mb-12 italic">Why this matters: tailors your learning path and AI recommendations to what matters most to you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`group p-6 md:p-8 rounded-2xl md:rounded-3xl border text-left transition-all duration-500 ${
                    role === r.id ? 'bg-blue-500/10 border-blue-500 scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl mb-4 md:mb-6 transition-all ${role === r.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <i className={`fa-solid ${r.icon}`}></i>
                  </div>
                  <h4 className="font-bold text-lg md:text-xl text-white mb-1 md:mb-2">{r.label}</h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">{r.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex flex-col items-end gap-4">
              <button
                disabled={!role}
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-[8px] md:text-[10px] rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
              >
                Next Step
              </button>
              {onSkip && (
                <button onClick={onSkip} className="text-slate-600 hover:text-slate-400 text-[9px] uppercase tracking-widest transition-colors">
                  Skip setup
                </button>
              )}
            </div>
          </div>
        ) : step === 2 ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">CHOOSE YOUR COMMUNITY</h2>
             <p className="text-xs md:text-sm text-slate-400 mb-1 font-medium">Join a community of like-minded people to learn and grow together.</p>
             <p className="text-[10px] text-slate-600 mb-8 md:mb-12 italic">Why this matters: guilds unlock leaderboards, group challenges, and exclusive rewards.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { id: Guild.SENTINELS, name: 'Sentinels', color: '#ff0055', icon: 'fa-shield-halved' },
                  { id: Guild.ARCHITECTS, name: 'Architects', color: '#8b5cf6', icon: 'fa-cube' },
                  { id: Guild.LIQUIDATORS, name: 'Liquidators', color: '#ccff00', icon: 'fa-water' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGuild(g.id)}
                    className={`p-6 md:p-10 rounded-2xl md:rounded-3xl border text-center transition-all duration-500 flex flex-col items-center gap-4 md:gap-6 ${
                      selectedGuild === g.id ? `bg-white/5 border-[${g.color}] scale-[1.05]` : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                    }`}
                    style={{ borderColor: selectedGuild === g.id ? g.color : '' }}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-1 md:mb-2" style={{ backgroundColor: `${g.color}20`, color: g.color }}>
                      <i className={`fa-solid ${g.icon}`}></i>
                    </div>
                    <h4 className="font-bold text-lg md:text-xl text-white uppercase tracking-tighter">{g.name}</h4>
                  </button>
                ))}
             </div>

             <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
                <button onClick={() => setStep(1)} className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:text-white transition-colors">Back</button>
                <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                  <button
                    disabled={selectedGuild === Guild.NONE}
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-blue-500 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
                  >
                    Set Up Profile
                  </button>
                  {onSkip && (
                    <button onClick={onSkip} className="text-slate-600 hover:text-slate-400 text-[9px] uppercase tracking-widest transition-colors">
                      Skip setup
                    </button>
                  )}
                </div>
             </div>
          </div>
         ) : step === 3 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter uppercase italic">Set Up Your Profile</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-1 font-medium">Tell us a bit about yourself so we can personalize your experience.</p>
            <p className="text-[10px] text-slate-600 mb-8 md:mb-12 italic">Why this matters: your identity earns you recognition and trust across the Clarix network.</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] overflow-hidden mb-4 md:mb-6 bg-black/40">
                  <img src={selectedAvatar} alt="Identity Core" className="w-full h-full object-cover" />
                </div>
                <p className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest mb-3 md:mb-4 text-slate-400">Choose an Avatar</p>
                <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 md:gap-3">
                  {DEFAULT_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAvatar(url)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 overflow-hidden transition-all ${selectedAvatar === url ? 'border-blue-500 scale-110' : 'border-white/10 hover:border-white/30'}`}
                    >
                      <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <div>
                  <label className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest block mb-2 md:mb-3 text-slate-400">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 text-lg md:text-xl font-bold text-white focus:outline-none focus:border-blue-500/40 transition-all"
                  />
                </div>

                <div>
                  <label className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest block mb-2 md:mb-3 text-slate-400">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about your crypto journey so far..."
                    className="w-full h-24 md:h-32 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 text-xs md:text-sm font-medium text-slate-300 focus:outline-none focus:border-blue-500/40 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

             <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
              <button onClick={() => setStep(2)} className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:text-white transition-colors">Back</button>
              <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                <button
                  disabled={!username.trim()}
                  onClick={() => setStep(4)}
                  className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-5 bg-blue-500 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
                >
                  Next Step
                </button>
                {onSkip && (
                  <button onClick={onSkip} className="text-slate-600 hover:text-slate-400 text-[9px] uppercase tracking-widest transition-colors">
                    Skip setup
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter uppercase italic">Explore Clarix</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-1 font-medium">Here are the core features you'll use to master Web3.</p>
            <p className="text-[10px] text-slate-600 mb-8 md:mb-12 italic">Why this matters: knowing the platform unlocks every tool from day one.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-blue-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl mb-6">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h4 className="font-bold text-xl text-white mb-3">Academy</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Master Web3 concepts through interactive learning modules and earn $PATH tokens.</p>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-purple-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl mb-6">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h4 className="font-bold text-xl text-white mb-3">Neural Feed</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Get AI-powered insights, real-time market sentiment, and personalized crypto news.</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-emerald-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl mb-6">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h4 className="font-bold text-xl text-white mb-3">Market Intel</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Track your portfolio, analyze live token data, and discover new opportunities.</p>
              </div>
            </div>

            {/* Reward preview */}
            <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <i className="fa-solid fa-gift text-blue-400 text-lg shrink-0"></i>
              <p className="text-sm text-blue-200">
                Complete setup → unlock <span className="font-bold text-white">Knowledge Atlas</span> + earn <span className="font-bold text-cyan-400">100 XP</span>
              </p>
            </div>

            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
              <button onClick={() => setStep(3)} className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:text-white transition-colors">Back</button>
              <button
                onClick={() => onComplete(username, selectedAvatar, bio, role, selectedGuild)}
                className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Enter Clarix
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
