import React, { useState, useRef, useEffect } from 'react';
import { generateLessonAudio } from '../services/geminiService';
import { Language } from '../types';

interface AudioNarratorProps {
  text: string;
  language: Language;
}

// Module-level singleton — only one audio context plays at a time across the whole app.
let globalAudioCtx: AudioContext | null = null;
let globalAudioSource: AudioBufferSourceNode | null = null;

function stopGlobalAudio() {
  try {
    if (globalAudioSource) {
      globalAudioSource.onended = null;
      globalAudioSource.stop();
      globalAudioSource.disconnect();
      globalAudioSource = null;
    }
    if (globalAudioCtx) {
      globalAudioCtx.close();
      globalAudioCtx = null;
    }
  } catch {
    // Already stopped or context already closed — safe to ignore.
  }
  // Also cancel any Web Speech API utterances that may be running.
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

const AudioNarrator: React.FC<AudioNarratorProps> = ({ text, language }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Track whether this specific instance owns the current global playback.
  const ownsPlayback = useRef(false);

  // Stop audio when the component unmounts (e.g. user navigates to a new lesson).
  useEffect(() => {
    return () => {
      if (ownsPlayback.current) {
        stopGlobalAudio();
        ownsPlayback.current = false;
      }
    };
  }, []);

  const decode = (base64: string): Uint8Array => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const handlePlay = async () => {
    // If this instance is already playing, pause/stop it.
    if (isPlaying && ownsPlayback.current) {
      stopGlobalAudio();
      ownsPlayback.current = false;
      setIsPlaying(false);
      return;
    }

    // Stop any other instance that may be playing.
    stopGlobalAudio();
    ownsPlayback.current = false;
    setIsPlaying(false);

    setIsGenerating(true);
    try {
      const audioData = await generateLessonAudio(text, language);
      if (!audioData) {
        setIsGenerating(false);
        return;
      }

      // Stop again in case another play was triggered while we were fetching.
      stopGlobalAudio();

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      globalAudioCtx = audioCtx;

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
      globalAudioSource = source;

      source.onended = () => {
        if (ownsPlayback.current) {
          globalAudioSource = null;
          globalAudioCtx = null;
          ownsPlayback.current = false;
          setIsPlaying(false);
        }
      };

      source.start();
      ownsPlayback.current = true;
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio playback failed', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isGenerating}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all ${
        isPlaying
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-white/[0.03] border-white/[0.07] text-slate-400 hover:text-white hover:border-white/15'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isGenerating ? (
        <i className="fa-solid fa-spinner animate-spin text-xs"></i>
      ) : isPlaying ? (
        <i className="fa-solid fa-pause text-xs"></i>
      ) : (
        <i className="fa-solid fa-volume-high text-xs"></i>
      )}
      <span className="text-xs font-medium">
        {isGenerating ? 'Generating audio...' : isPlaying ? 'Pause narration' : 'Listen to lesson'}
      </span>
    </button>
  );
};

export default AudioNarrator;
