import React, { useState } from 'react';

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
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Given this user bio: "${currentBio}", generate a stylish modern social media bio and a short vibe tag (2 words). Return JSON format: {"bio":"","vibe":""}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await res.json();

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      const parsed = JSON.parse(text);

      setSuggestion({
        bio: parsed.bio,
        vibe: parsed.vibe.toUpperCase()
      });

    } catch (error) {
      console.error(error);

      // fallback for demo safety
      setSuggestion({
        bio: "Neon dreamer navigating digital galaxies.",
        vibe: "CYBER SOUL"
      });
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
            <div className="space-y-4">
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">New Suggestion</span>
                  <div className="bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {suggestion.vibe}
                  </div>
                </div>
                <p className="text-white text-lg leading-relaxed font-light">{suggestion.bio}</p>
              </div>

              <button 
                onClick={() => onUpdate(suggestion.bio, suggestion.vibe)}
                className="w-full bg-primary text-background-dark font-bold py-4 rounded-2xl"
              >
                Apply Change
              </button>
            </div>
          ) : (
            <div className="py-10 text-center space-y-6">
              <p className="text-white/40 text-sm">Use AI to re-architect your digital persona.</p>
              <button 
                onClick={generateVibe}
                disabled={loading}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold py-4 rounded-2xl"
              >
                {loading ? "Thinking..." : "Analyze My Vibe"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VibeGenerator;