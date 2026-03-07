
import React, { useState } from 'react';
import { Post } from '../types';
import { VIBES } from '../constants';
import { getAvatar } from "../utils/getAvatar";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

interface ReelCardProps {
  post: Post;
}

const ReelCard: React.FC<ReelCardProps> = ({ post }) => {

  console.log("REEL POST:", post);   // ADD THIS LINE

  const [muted, setMuted] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
const vibeConfig = VIBES[post.vibeId];

const handleDeletePost = async () => {
  try {
    await deleteDoc(doc(db, "posts", post.id));
    console.log("Post deleted");
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

  return (
    <article className="relative aspect-[9/16] rounded-[2.5rem] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black">
      {/* Video Content */}
   {/* Video / Image Content */}
<div className="absolute inset-0">

  {post.videoUrl ? (
<video
  src={post.videoUrl}
  autoPlay
  loop
  muted={muted}
  playsInline
  controls
  className="w-full h-full object-cover"
/>
) : (
  <img src={post.imageUrl} className="w-full h-full object-cover" />
)}

  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

</div>

      {/* Interactive Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button 
          onClick={() => setMuted(!muted)} 
          className="size-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
        >
          <span className="material-symbols-outlined text-4xl text-white">
            {muted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>

{/* Header Info */}
<div className="absolute top-8 left-8 right-8 flex items-center justify-between">

  {/* Left side */}
  <div className="flex items-center gap-3">

    <div className="size-12 rounded-full p-[2px] bg-white/20 backdrop-blur-md">
      <img
        src={getAvatar(post.avatarUrl, post.username)}
        alt={post.username}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            `https://ui-avatars.com/api/?name=${post.username}`;
        }}
        className="w-full h-full rounded-full object-cover"
      />
    </div>

    <div>
      <h4 className="font-bold text-white shadow-sm">
        {post.username || "User"}
      </h4>

      <div
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter bg-white/10 backdrop-blur-md border border-white/10"
        style={{ color: vibeConfig.color }}
      >
        <span className="material-symbols-outlined text-[12px]">
          {vibeConfig.icon}
        </span>
        {vibeConfig.label}
      </div>
    </div>

  </div>

  {/* Three dots */}
  <div className="relative">
    <button
      onClick={() => setShowMenu(!showMenu)}
      className="text-white text-3xl"
    >
      ⋯
    </button>

    {showMenu && (
      <div className="absolute right-0 mt-2 bg-black/90 rounded-lg p-2">
        <button
          onClick={handleDeletePost}
          className="text-red-500 text-sm px-3 py-1 hover:bg-white/10 rounded"
        >
          Delete Post
        </button>
      </div>
    )}
  </div>

</div>




      {/* Action Sidebar */}
      <div className="absolute right-6 bottom-32 flex flex-col gap-6 items-center">
        <button className="flex flex-col items-center gap-1 group">
          <div className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
            <span className="material-symbols-outlined text-2xl">favorite</span>
          </div>
          <span className="text-[10px] font-bold text-white/80">45k</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
            <span className="material-symbols-outlined text-2xl">mode_comment</span>
          </div>
          <span className="text-[10px] font-bold text-white/80">820</span>
        </button>
        <button className="flex flex-col items-center gap-1 group">
          <div className="size-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/10">
            <span className="material-symbols-outlined text-2xl">share</span>
          </div>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-8 right-16">
        <p className="text-sm font-medium text-white mb-4 line-clamp-2 leading-relaxed">
          {post.text}
        </p>
        <div className="flex items-center gap-2 overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md p-2 rounded-xl">
          <span className="material-symbols-outlined text-sm text-zenergy-accent animate-pulse">music_note</span>
          <p className="text-[10px] font-bold text-white/60 truncate uppercase tracking-widest">
            Original Audio • {post.username}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
        <div className="h-full bg-zenergy-accent w-1/3 shadow-[0_0_10px_#00d4ff]"></div>
      </div>
    </article>
  );
};

export default ReelCard;
