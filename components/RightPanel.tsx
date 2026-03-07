
import React, { useState } from 'react';
import { generateReelVibe } from '../services/geminiService';
import { useEffect } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { limit } from "firebase/firestore";

const RightPanel: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiVibe, setAiVibe] = useState<string | null>(null);

  const [upNext, setUpNext] = useState<any[]>([]);

  useEffect(() => {
  const fetchFollowing = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const followQuery = query(
  collection(db, "follows"),
  where("followerId", "==", user.uid),
  limit(5)
);

    const followSnapshot = await getDocs(followQuery);

    const users = [];

    for (const followDoc of followSnapshot.docs) {
      const followingId = followDoc.data().followingId;

      const userDoc = await getDoc(doc(db, "users", followingId));

      if (userDoc.exists()) {
        users.push({
          id: userDoc.id,
          ...userDoc.data()
        });
      }
    }

    setUpNext(users);
  };

  fetchFollowing();
}, []);

  const handleAIVibe = async () => {
    setIsGenerating(true);
    const vibe = await generateReelVibe("A cyberpunk girl coding in a neon district at midnight.");
    setAiVibe(vibe);
    setIsGenerating(false);
  };

  return (
    <aside className="w-80 p-10 flex flex-col gap-8">
      <div className="space-y-6">
        <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest px-2">Up Next Vibe</h4>
        <div className="space-y-4">
          {upNext.length === 0 && (
  <p className="text-[11px] text-white/40 px-2">
    Follow creators to see upcoming vibes.
  </p>
)}
{upNext.map((vibe) => (
              <div 
              key={vibe.id} 
              className="p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-xl overflow-hidden border border-white/10">
                  <img alt={vibe.username} className="w-full h-full object-cover" src={vibe.avatarUrl} />
                </div>
                <span className="text-sm font-bold group-hover:text-primary transition-colors">{vibe.username}</span>
              </div>
              <p className="text-[10px] text-white/40 line-clamp-1">{vibe.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 p-5 rounded-3xl border border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-neon-cyan">auto_fix_high</span>
          <h5 className="text-xs font-bold uppercase tracking-wider">AI Vibe Generator</h5>
        </div>
        <p className="text-[11px] text-white/60 leading-relaxed">
          Generate an AI-powered vibe for the current scene using Gemini Pro.
        </p>
        <button 
          onClick={handleAIVibe}
          disabled={isGenerating}
          className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50"
        >
          {isGenerating ? 'Analyzing...' : 'Generate New Vibe'}
        </button>
        {aiVibe && (
          <div className="mt-2 p-2 bg-white/5 rounded-xl border border-neon-cyan/30 text-center">
            <span className="text-[10px] font-bold text-neon-cyan animate-pulse">{aiVibe}</span>
          </div>
        )}
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-2 px-1">
          {['#VerticalVibe', '#InfiniteScroll', '#Cyberpunk2077', '#GeminiAI'].map((tag) => (
            <a 
              key={tag}
              className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-all" 
              href="#"
            >
              {tag}
            </a>
          ))}
        </div>
        <p className="text-[10px] text-white/10 px-2 uppercase tracking-widest">© 2024 ZENERGY SOCIAL</p>
      </div>
    </aside>
  );
};

export default RightPanel;
