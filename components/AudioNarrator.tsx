
import React, { useState, useRef } from 'react';
import { generateLessonAudio } from '../services/geminiService';
import { Language } from '../types';

interface AudioNarratorProps {
  text: string;
  language: Language;
}

const AudioNarrator: React.FC<AudioNarratorProps> = ({ text, language }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const handlePlay = async () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }

    setIsGenerating(true);
    const audioData = await generateLessonAudio(text, language);
    if (audioData) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const bytes = decode(audioData);
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = audioCtx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
        setIsPlaying(true);
      } catch (e) {
        console.error("Playback failed", e);
      }
    }
    setIsGenerating(false);
  };

  return (
    <button 
      onClick={handlePlay}
      disabled={isGenerating}
      className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl border transition-all ${
        isPlaying ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
      }`}
    >
      {isGenerating ? (
        <i className="fa-solid fa-spinner animate-spin text-xs md:text-sm"></i>
      ) : isPlaying ? (
        <i className="fa-solid fa-pause text-xs md:text-sm"></i>
      ) : (
        <i className="fa-solid fa-volume-high text-xs md:text-sm"></i>
      )}
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">
        {isGenerating ? 'Synthesizing...' : isPlaying ? 'Voice Active' : 'Narrate Node'}
      </span>
    </button>
  );
};

export default AudioNarrator;
