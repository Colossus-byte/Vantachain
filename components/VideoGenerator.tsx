
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { generateVisualPrompt } from '../services/geminiService';

interface VideoGeneratorProps {
  lessonTitle: string;
  lessonContent: string;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ lessonTitle, lessonContent }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const statusMessages = [
    "Analyzing Technical Context...",
    "Synthesizing Visual Narrative...",
    "Initializing Neural Rendering Engine...",
    "Synthesizing Visual Meta-Data...",
    "Allocating GPU Clusters for Deep Frame Synthesis...",
    "Encoding Blockchain Visualization Layers...",
    "Polishing Cinematic Textures...",
    "Finalizing Visual Brief Protocol...",
    "Securing Transmission Stream..."
  ];

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      let idx = 0;
      setStatusMessage(statusMessages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % statusMessages.length;
        setStatusMessage(statusMessages[idx]);
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Check for API Key selection (required for Veo models)
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      // Stage 1: Generate a dynamic, content-aware prompt using Gemini
      setStatusMessage("Extracting Visual Metaphors...");
      const cinematicPrompt = await generateVisualPrompt(lessonTitle, lessonContent);
      
      // Stage 2: Create a fresh instance for Veo
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: cinematicPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Transmission failed: No video URI returned.");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key Error: Please re-select a paid API key from a project with billing enabled.");
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        setError("Visual Synthesis Interrupted. Please ensure your API key has VEO-3 permissions.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-emerald-500/5 blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <i className="fa-solid fa-film text-base md:text-lg"></i>
          </div>
          <div>
            <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">Visual Synthesis Protocol</h3>
            <p className="text-xs md:text-sm font-bold text-white tracking-tight">Generate Cinematic Visual Brief for {lessonTitle}</p>
          </div>
        </div>

        {!videoUrl && !isGenerating && (
          <div className="flex flex-col items-center py-8 md:py-12 text-center">
            <p className="text-slate-400 text-xs md:text-sm max-w-md mb-6 md:mb-8 leading-relaxed">
              Synthesize a technical motion graphic summary of this module. Our AI extracts core technical concepts from the content to generate unique visual metaphors.
              <span className="block mt-2 text-[8px] md:text-[10px] text-amber-500/70 font-black uppercase tracking-widest">Requires Paid API Key Selection</span>
            </p>
            <button 
              onClick={handleGenerate}
              className="w-full sm:w-auto bg-emerald-500 text-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/10"
            >
              Initialize Technical Synthesis
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              className="mt-4 md:mt-6 text-[8px] md:text-[10px] text-slate-600 font-bold hover:text-slate-400 transition-colors underline underline-offset-4"
            >
              Billing Documentation
            </a>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center py-16 md:py-24 text-center animate-in fade-in duration-500">
            <div className="relative mb-8 md:mb-12">
              <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-emerald-500/20 rounded-full animate-ping absolute"></div>
              <div className="w-16 h-16 md:w-24 md:h-24 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-microchip text-emerald-500 text-xl md:text-2xl"></i>
              </div>
            </div>
            <h4 className="text-base md:text-lg font-black text-white mb-2 uppercase tracking-tighter">{statusMessage}</h4>
            <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">Transmission Estimated: 60-120 seconds</p>
          </div>
        )}

        {videoUrl && (
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-700">
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full aspect-video object-cover"
            />
            <div className="absolute top-4 md:top-6 left-4 md:left-6 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-black/60 backdrop-blur-md rounded-lg md:rounded-xl border border-white/10">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">VISUAL BRIEF LOADED</span>
            </div>
            <button 
              onClick={() => { setVideoUrl(null); handleGenerate(); }}
              className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-emerald-400 transition-all"
            >
              <i className="fa-solid fa-rotate text-sm"></i>
            </button>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-5">
             <i className="fa-solid fa-triangle-exclamation text-rose-500 text-xl"></i>
             <p className="text-xs font-bold text-rose-200">{error}</p>
             <div className="ml-auto flex gap-2">
                <button onClick={handleGenerate} className="text-[10px] font-black text-white bg-rose-500 px-4 py-2 rounded-lg uppercase tracking-widest">Retry</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;
