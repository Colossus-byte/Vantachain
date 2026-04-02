
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getTutorResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

interface AIAssistantProps {
  currentContext: string;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentContext, isOpen, onClose, language }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to your Secure Hub. I'm your AI Co-Pilot. You can type your questions or initiate a Live Voice Link!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Live API refs
  const sessionRef = useRef<any>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    const response = await getTutorResponse(userMsg, currentContext, messages, language);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const toggleLiveMode = async () => {
    if (isLiveMode) {
      if (sessionRef.current) sessionRef.current.close();
      setIsLiveMode(false);
      return;
    }

    try {
      setIsLiveMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const encode = (bytes: Uint8Array) => {
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary);
      };

      const decode = (base64: string) => {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        return bytes;
      };

      const inputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = inputAudioCtx;
      outputAudioContextRef.current = outputAudioCtx;
      
      let nextStartTime = 0;
      const sources = new Set<AudioBufferSourceNode>();

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
              const source = inputAudioCtx.createMediaStreamSource(stream);
              const scriptProcessor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const int16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
                });
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputAudioCtx.destination);
            });
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const bytes = decode(audioData);
              const dataInt16 = new Int16Array(bytes.buffer);
              const buffer = outputAudioCtx.createBuffer(1, dataInt16.length, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
              
              const source = outputAudioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputAudioCtx.destination);
              
              nextStartTime = Math.max(nextStartTime, outputAudioCtx.currentTime);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
              sources.add(source);
              source.onended = () => sources.delete(source);
            }

            if (msg.serverContent?.interrupted) {
              for (const source of sources.values()) {
                try { source.stop(); } catch(err) {}
              }
              sources.clear();
              nextStartTime = 0;
            }
          },
          onerror: (e: any) => {
            console.error("Live sync error", e);
          },
          onclose: (e: any) => {
            console.log("Live sync closed", e);
            setIsLiveMode(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are the Clarix Live Tutor. Engaging in a real-time voice conversation about crypto in ${language === Language.EN ? 'English' : language === Language.ES ? 'Spanish' : language === Language.FR ? 'French' : 'Chinese'}. Context: ${currentContext}`,
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error("Live Lab failed", e);
      setIsLiveMode(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 md:right-8 bottom-0 md:bottom-28 w-full md:w-[420px] h-full md:h-[650px] glass-panel rounded-none md:rounded-[2.5rem] flex flex-col z-[110] animate-in slide-in-from-bottom md:slide-in-from-right-8 fade-in duration-300`}>
      <div className="p-5 md:p-7 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
            <i className={`fa-solid ${isLiveMode ? 'fa-signal animate-pulse' : 'fa-brain-circuit'} text-lg md:text-xl`}></i>
          </div>
          <div>
            <h2 className="font-bold text-base md:text-lg text-white font-display uppercase tracking-tight">AI Co-Pilot</h2>
            <div className="flex items-center gap-1.5">
               <span className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'} shadow-[0_0_8px_#10b981]`}></span>
               <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest">{isLiveMode ? 'LIVE SYNC ACTIVE' : 'SECURE NODE'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLiveMode}
            className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${isLiveMode ? 'bg-rose-500 text-white' : 'bg-white/5 text-emerald-400 hover:bg-emerald-500/10'}`}
            title="Toggle Live Voice Lab"
          >
            <i className={`fa-solid ${isLiveMode ? 'fa-phone-slash' : 'fa-microphone'} text-sm md:text-base`}></i>
          </button>
          <button onClick={onClose} className="w-9 h-9 md:w-10 md:h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-slate-500 transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-7 space-y-5 md:space-y-6 text-sm md:text-[15px] no-scrollbar">
        {isLiveMode ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-emerald-500/20 border border-emerald-500/40 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fa-solid fa-waveform-lines text-3xl md:text-4xl text-emerald-400"></i>
              </div>
            </div>
            <p className="text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-widest">Bi-Directional Audio Stream Established</p>
            <p className="text-[10px] md:text-xs text-slate-500 max-w-[240px]">Speak naturally to your tutor. Your microphone is live and processing nodes.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] md:max-w-[88%] p-4 md:p-5 rounded-2xl md:rounded-3xl leading-relaxed shadow-lg ${
                msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-slate-800/80 text-slate-100 rounded-tl-none border border-white/10'
              }`}>
                <div className="markdown-content">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && !isLiveMode && (
          <div className="flex justify-start">
             <div className="flex gap-2 items-center bg-white/5 px-4 md:px-5 py-3 md:py-4 rounded-2xl md:rounded-3xl">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
      </div>

      {!isLiveMode && (
        <div className="p-4 md:p-6 pb-8 md:pb-6 bg-black/60 border-t border-white/5 backdrop-blur-md">
          <form onSubmit={handleSend} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-surface border border-white/20 rounded-2xl md:rounded-[2rem] py-4 md:py-5 pl-5 md:pl-7 pr-14 md:pr-16 focus:outline-none focus:border-emerald-500 transition-all text-xs md:text-sm text-white placeholder:text-slate-500 shadow-inner"
            />
            <button type="submit" className="absolute right-2 md:right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
              <i className="fa-solid fa-arrow-up text-base md:text-lg"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
