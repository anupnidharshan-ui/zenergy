
import React from 'react';
import { VibeType } from '../types';
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { VIBES } from '../constants';

interface RightSidebarProps {
  currentVibe: VibeType;
  onChangeVibe: () => void;
}


const RightSidebar: React.FC<RightSidebarProps> = ({ currentVibe, onChangeVibe }) => {
const [userProfile, setUserProfile] = useState<any>(null);
  const vibeConfig = VIBES[currentVibe];

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserProfile(snap.data());
      }
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="flex flex-col gap-9 h-full w-full py-2">
     
      <div className="glass-morphism rounded-[2rem] p-6 relative overflow-hidden group border-white/10 bg-white/[0.02]">
        {/* Large subtle glow element on the right */}
        <div 
          className="absolute -top-4 -right-12 size-40 opacity-[0.08] blur-[60px] rounded-full"
          style={{ backgroundColor: vibeConfig.color }}
        ></div>
        
        <div className="flex items-center gap-4 mb-10 min-w-0">

  <div className="size-14 rounded-2xl  border border-white/10 p-0.5 bg-white/5">
    <img
src={
  userProfile?.avatarUrl ||
  userProfile?.photoURL ||
  "/default-avatar.png"
}      alt="profile"
      className="w-full h-full object-cover rounded-[14px]"
    />
  </div>

  <div className="min-w-0">
    <h3 className="font-bold text-[16px] tracking-tight text-white/95">
{userProfile?.displayName || userProfile?.username || "User"}
</h3>

    <p className="text-white/30 text-[13px] font-medium">
@{userProfile?.username || "user"}
    </p>
  </div>

</div>

        <div className="space-y-4">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Active Frequencies</p>
          <div className="flex items-center justify-between p-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3">
              <div 
                className={`size-10 rounded-xl flex items-center justify-center bg-white/5 shadow-[0_0_10px_rgba(255,255,255,0.05)] ${vibeConfig.accentClass}`}
              >
                <span className="material-symbols-outlined text-2xl">{vibeConfig.icon}</span>
              </div>
              <div>
                <span className="text-[13px] font-bold block">{vibeConfig.label} Vibe</span>
                <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">SYNCHRONIZED</span>
              </div>
            </div>
            <button 
              onClick={onChangeVibe}
              className="size-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group/btn"
              title="Change Vibe"
            >
              <span className="material-symbols-outlined text-[18px] text-white/40 group-hover/btn:rotate-180 transition-transform duration-700">sync</span>
            </button>
          </div>
        </div>
      </div>


      {/* Trending Hashtags */}
      <div className="space-y-5">
        <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] px-2">Trending locally</h4>
        <div className="flex flex-wrap gap-2 px-1">
          {['#NeonNights', '#FutureSocial', '#ZenergyVibe', '#CyberLife', '#GlassUI'].map(tag => (
            <a key={tag} href="#" className="glass-morphism px-3 py-1.5 rounded-xl text-[10px] font-bold text-white/40 border-white/[0.05] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Social Links & Copyright */}
      <footer className="mt-auto px-2 opacity-30 pb-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-bold uppercase tracking-widest mb-4">
          <a href="#" className="hover:text-white transition-colors">Lab</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Meta</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
        </div>
        <p className="text-[9px] font-black tracking-[0.2em]">© 2026 ZENERGY SOCIAL SYSTEMS</p>
      </footer>
    </div>
  );
};

export default RightSidebar;
