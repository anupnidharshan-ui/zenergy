
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface VibeGeneratorProps {
  currentBio: string;
  onClose: () => void;
  onUpdate: (bio: string, vibe: string) => void;
}

const VibeGenerator: React.FC<VibeGeneratorProps> = ({ currentBio, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{ bio: string; vibe: string } | null>(null);

  const generateVibe = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given this user bio: "${currentBio}", generate a new creative social media bio and a short "vibe" tag (2-3 words). 
        The bio should be stylish, modern, and aesthetic.
        Return in JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bio: { type: Type.STRING },
              vibe: { type: Type.STRING },
            },
            required: ["bio", "vibe"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setSuggestion({ bio: data.bio, vibe: data.vibe.toUpperCase() });
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate vibe. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-xl">
      <div className="w-full max-w-lg bg-[#0f1115] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              Vibe Architect
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Current Bio</p>
            <p className="text-sm italic text-white/60">{currentBio}</p>
          </div>

          {suggestion ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">New Suggestion</span>
                  <div className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {suggestion.vibe}
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed font-light">{suggestion.bio}</p>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => onUpdate(suggestion.bio, suggestion.vibe)}
                  className="flex-1 bg-primary text-background-dark font-bold py-4 rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:scale-[1.02] transition-all"
                >
                  Apply Change
                </button>
                <button 
                  onClick={generateVibe}
                  disabled={loading}
                  className="px-6 bg-white/5 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-50"
                >
                   <span className="material-symbols-outlined">refresh</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-6">
              <p className="text-white/40 text-sm">Use Gemini AI to re-architect your digital persona and find a new vibe.</p>
              <button 
                onClick={generateVibe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold py-4 rounded-2xl shadow-[0_0_40px_rgba(188,0,255,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                   <>
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Thinking...
                   </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">magic_button</span>
                    Analyze My Vibe
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeGenerator;
