
import React, { useState } from 'react';
import { Reel } from '../types';
import { auth } from '@/firebase';

interface ReelItemProps {
  reel: Reel;
}

const ReelItem: React.FC<ReelItemProps> = ({ reel }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <section className="reel-section">
      <div className="reel-player">
        {/* Placeholder for Video. In a real app, use <video src={reel.videoUrl} /> */}
        {reel.videoUrl ? (
  <video
    src={reel.videoUrl}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
) : (
  <img
    src={reel.imageUrl}
    alt="post"
    className="w-full h-full object-cover"
  />
)}
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-transparent to-black/20">
          {reel.isLive && (
            <div className="absolute top-8 left-8">
              <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                <div className="size-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-widest uppercase">Live View</span>
              </div>
            </div>
          )}

          <div className="w-full space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full border-2 border-white overflow-hidden shadow-2xl">
  <img
src={reel.avatarUrl || "/default-avatar.png"}
    className="w-full h-full object-cover"
  />
</div>

<div>
  <h3 className="font-bold text-lg drop-shadow-lg">{reel.username}</h3>
  <p className="text-white/70 text-sm">@{reel.username}</p>
</div>
              <button className="ml-2 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all transform active:scale-95">
                Follow
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm leading-relaxed drop-shadow-md">
             {reel.text}                {' '}
                <span className="text-primary font-medium">{reel.vibeId && (
  <span className="text-primary font-medium">#{reel.vibeId}</span>
)}</span>
              </p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neon-purple/20 border border-neon-purple/40 rounded-full backdrop-blur-md">
                <span className={`material-symbols-outlined text-[16px] text-neon-purple ${reel.id === '1' ? 'neon-glow-purple' : 'neon-glow-cyan'}`}>
                  {reel.vibeIcon}
                </span>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">{reel.vibe}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div 
              className={`h-full reels-progress-bar-glow transition-all duration-300 ${reel.id === '1' ? 'bg-primary w-[65%]' : 'bg-neon-cyan w-[25%]'}`}
            ></div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`size-12 reels-interaction-bar rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10 ${isLiked ? 'text-red-500' : 'text-white'}`}>
              <span className={`material-symbols-outlined text-3xl ${isLiked ? 'fill-[1]' : ''}`}>favorite</span>
            </div>
            <span className="text-[11px] font-bold drop-shadow-lg">{reel.likes?.length || 0}</span>
          </button>

          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="size-12 reels-interaction-bar rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
              <span className="material-symbols-outlined text-3xl text-white group-hover:text-primary transition-colors">mode_comment</span>
            </div>
            <span className="text-[11px] font-bold drop-shadow-lg">{reel.comments}</span>
          </div>

          <div className="flex flex-col items-center  gap-1 group cursor-pointer">
            <div className="size-12   reels-interaction-bar rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
              <span className="material-symbols-outlined text-3xl text-white group-hover:text-neon-cyan transition-colors">send</span>
            </div>
            <span className="text-[11px] font-bold drop-shadow-lg">Share</span>
          </div>

          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div className={`size-12 reels-interaction-bar rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10 ${isSaved ? 'text-yellow-400' : 'text-white'}`}>
              <span className={`material-symbols-outlined text-3xl ${isSaved ? 'fill-[1]' : ''}`}>bookmark</span>
            </div>
            <span className="text-[11px] font-bold drop-shadow-lg">Save</span>
          </button>

          {reel.audioSource && (
            <div className="size-12 rounded-2xl overflow-hidden border-2 border-white/20 p-1 bg-white/5 mt-2 animate-[spin_4s_linear_infinite]">
              <img alt="Audio source" className="w-full h-full object-cover rounded-xl" src={reel.audioSource} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReelItem;
