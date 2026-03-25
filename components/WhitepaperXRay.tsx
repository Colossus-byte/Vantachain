
import React, { useState } from 'react';
// Correct import from @google/genai
import { GoogleGenAI, Type } from "@google/genai";

const WhitepaperXRay: React.FC = () => {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!input) return;
    setIsScanning(true);
    try {
      // Create a fresh instance for each request
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        // Upgrade to gemini-3-pro-preview for complex reasoning tasks
        model: 'gemini-3-pro-preview',
        contents: `Analyze the following cryptocurrency project description or whitepaper snippet. 
        Break it down into: 
        1. Core Innovation (What makes it new?)
        2. Economic Sustainability (Where does the value come from?)
        3. Critical Risk Vectors (What could go wrong?)
        
        Keep each point concise and professional.
        
        Project Content: ${input}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            // Use Type enum instead of string literals
            type: Type.OBJECT,
            properties: {
              innovation: { type: Type.STRING },
              economics: { type: Type.STRING },
              risks: { type: Type.STRING },
            },
            required: ["innovation", "economics", "risks"]
          }
        }
      });
      
      // Extract text output using response.text property
      setAnalysis(JSON.parse(response.text || "{}"));
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="mt-12 md:mt-24 p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-[#0c0e12] border border-indigo-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-indigo-500/5 blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-10">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-microscope text-xl md:text-2xl"></i>
          </div>
          <div>
            <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-0.5 md:mb-1">Advanced Tool: Whitepaper X-Ray</h3>
            <p className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase italic">Protocol Dissection Engine</p>
          </div>
        </div>

        {!analysis ? (
          <div className="space-y-4 md:space-y-6">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste project description, whitepaper abstract, or technical specs here..."
              className="w-full h-32 md:h-40 bg-black/40 border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 text-xs md:text-sm text-slate-300 font-medium focus:outline-none focus:border-indigo-500/30 transition-all resize-none"
            />
            <button 
              onClick={handleScan}
              disabled={isScanning || !input}
              className="w-full py-4 md:py-5 bg-indigo-500 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
            >
              {isScanning ? <><i className="fa-solid fa-spinner animate-spin mr-2"></i> Analyzing Protocol Structure...</> : 'Initialize X-Ray Scan'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-in zoom-in-95 duration-500">
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5">
              <h4 className="text-[8px] md:text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 md:mb-4">Core Innovation</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{analysis.innovation}</p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5">
              <h4 className="text-[8px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 md:mb-4">Sustainability</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{analysis.economics}</p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/5">
              <h4 className="text-[8px] md:text-[10px] font-black text-rose-500 uppercase tracking-widest mb-3 md:mb-4">Critical Risks</h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{analysis.risks}</p>
            </div>
            <button 
              onClick={() => setAnalysis(null)}
              className="md:col-span-3 text-[8px] md:text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest pt-2 md:pt-4"
            >
              Scan New Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhitepaperXRay;
