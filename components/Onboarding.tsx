
import React, { useState, useEffect } from 'react';
import { Guild } from '../types';
import { DEFAULT_AVATARS } from '../constants';

interface OnboardingProps {
  onComplete: (username: string, avatarUrl: string, bio: string, role: string, guild: Guild) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  const [role, setRole] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<Guild>(Guild.NONE);
  
  // New personalization states
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);

  const fullText = "INITIALIZING SECURE SOUL-SYNC PROTOCOL... [OK]\nSCANNING FOR NEURAL SIGNATURE... [DONE]\nACCESSING DECENTRALIZED REPOSITORY... [CONNECTED]\nWELCOME, UNKNOWN ENTITY. CHOOSE YOUR PATH.";

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
    { id: 'engineer', label: 'Architect', icon: 'fa-code-branch', desc: 'I build the protocols.' },
    { id: 'analyst', label: 'Strategist', icon: 'fa-bolt-lightning', desc: 'I optimize the flows.' },
    { id: 'auditor', label: 'Guardian', icon: 'fa-user-shield', desc: 'I protect the nodes.' },
  ];

  if (step === 0) {
    return (
      <div className="fixed inset-0 z-[500] bg-[#020205] flex items-center justify-center p-6 md:p-8">
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
              className="group relative w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent border border-[#ccff00] text-[#ccff00] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-[#ccff00] hover:text-black transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10">Initialize Sync</span>
              <div className="absolute inset-0 w-full h-full bg-[#ccff00] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[500] bg-[#020205] flex items-center justify-center p-4 md:p-6 overflow-y-auto no-scrollbar">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl w-full relative z-10 py-8">
        <div className="flex justify-between items-center mb-8 md:mb-16">
          <div className="flex gap-1.5 md:gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 w-8 md:w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#ccff00]' : 'bg-white/10'}`}></div>
            ))}
          </div>
          <span className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest">Protocol Sync Status: {step === 1 ? '30%' : step === 2 ? '60%' : '90%'}</span>
        </div>

        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tighter">WHO ARE YOU?</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-8 md:mb-12 font-medium">Your role determines your starting toolset and neural interface.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`group p-6 md:p-8 rounded-2xl md:rounded-3xl border text-left transition-all duration-500 ${
                    role === r.id ? 'bg-[#8b5cf6]/10 border-[#8b5cf6] scale-[1.02]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl mb-4 md:mb-6 transition-all ${role === r.id ? 'bg-[#8b5cf6] text-white' : 'bg-white/5 text-slate-500'}`}>
                    <i className={`fa-solid ${r.icon}`}></i>
                  </div>
                  <h4 className="font-bold text-lg md:text-xl text-white mb-1 md:mb-2">{r.label}</h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">{r.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-12 md:mt-16 flex justify-end">
              <button 
                disabled={!role}
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 md:px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-[8px] md:text-[10px] rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
              >
                Proceed to Guild Choice
              </button>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tighter">CHOOSE YOUR TRIBE</h2>
             <p className="text-xs md:text-sm text-slate-400 mb-8 md:mb-12 font-medium">Guilds represent your alignment in the new digital economy.</p>
             
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
                <button 
                  disabled={selectedGuild === Guild.NONE}
                  onClick={() => setStep(3)}
                  className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-[#ccff00] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
                >
                  Configure Identity
                </button>
             </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 tracking-tighter uppercase italic">Identity Synthesis</h2>
            <p className="text-xs md:text-sm text-slate-400 mb-8 md:mb-12 font-medium">Define your presence in the Nexus neural network.</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.2)] overflow-hidden mb-4 md:mb-6 bg-black/40">
                  <img src={selectedAvatar} alt="Identity Core" className="w-full h-full object-cover" />
                </div>
                <p className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest mb-3 md:mb-4">Neural Portrait Selection</p>
                <div className="grid grid-cols-4 sm:grid-cols-3 gap-2 md:gap-3">
                  {DEFAULT_AVATARS.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAvatar(url)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 overflow-hidden transition-all ${selectedAvatar === url ? 'border-[#ccff00] scale-110' : 'border-white/10 hover:border-white/30'}`}
                    >
                      <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6 md:space-y-8">
                <div>
                  <label className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest block mb-2 md:mb-3">Protocol Handle</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter unique alias..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 text-lg md:text-xl font-bold text-white focus:outline-none focus:border-[#ccff00]/40 transition-all"
                  />
                </div>

                <div>
                  <label className="terminal-text text-[8px] md:text-[10px] uppercase tracking-widest block mb-2 md:mb-3">Neural Bio / Credentials</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell the Nexus about your expertise..."
                    className="w-full h-24 md:h-32 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-6 text-xs md:text-sm font-medium text-slate-300 focus:outline-none focus:border-[#ccff00]/40 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-between items-center gap-6">
              <button onClick={() => setStep(2)} className="text-slate-500 font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:text-white transition-colors">Back</button>
              <button 
                disabled={!username.trim()}
                onClick={() => onComplete(username, selectedAvatar, bio, role, selectedGuild)}
                className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-5 bg-[#ccff00] text-black font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_40px_rgba(204,255,0,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
              >
                Enter The Nexus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
