
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { VIBES } from '../constants';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { deleteDoc } from "firebase/firestore";
import { getAvatar

 } from '@/utils/getAvatar';
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
const vibeConfig = VIBES[post.vibeId] || VIBES["Study"];


  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShareToStory = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }, 800);
  };

 const handleDeletePost = async () => {
  try {
    await deleteDoc(doc(db, "posts", post.id));
    alert("Post deleted");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <article className="glass-morphism rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:border-white/20 relative">
      {/* Shared to Story Notification Toast */}
      {shared && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-zenergy-accent text-black px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,212,255,0.5)] animate-bounce">
          Signal shared to story
        </div>
      )}

      {/* Post Header - Updated to match screenshot */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full p-[1px] bg-gradient-to-tr from-white/20 to-transparent">
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
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="text-[14px] font-bold tracking-tight">{post.username || "User"}</h4>
              <div 
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter bg-white/5 border border-white/10"
                style={{ color: vibeConfig.color, boxShadow: `0 0 5px ${vibeConfig.color}20` }}
              >
                <span className="material-symbols-outlined text-[12px]">{vibeConfig.icon}</span>
                {vibeConfig.label}
              </div>
            </div>
          </div>
        </div>
        
      <div className="relative">
  <button
    onClick={() => {
      console.log("menu clicked");
      setShowMenu(!showMenu);
    }}
    className="text-white/30 hover:text-white transition-colors"
  >
    <span className="material-symbols-outlined">more_horiz</span>
  </button>

  {showMenu && (
    <div className="absolute right-0 top-8 bg-black border border-white/10 rounded-lg p-2 z-50">
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

      {/* Post Media */}
      <div className="relative aspect-square w-full group overflow-hidden bg-black/40">
       <img
  src={post.imageUrl || "/placeholder.jpg"}
  alt="Content"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none"></div>
      </div>

      {/* Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5">
            <button onClick={toggleLike} className="group flex items-center gap-1.5 focus:outline-none">
              <span className={`material-symbols-outlined text-[26px] transition-all duration-300 ${liked ? 'text-red-500 fill-1 scale-110' : 'text-white/90 group-hover:text-red-400'}`}>
                favorite
              </span>
            </button>
            <button className="group text-white/90 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[26px] group-hover:scale-110 transition-transform">chat_bubble</span>
            </button>
            <button 
              onClick={handleShareToStory}
              className={`group transition-all duration-300 ${isSharing ? 'text-zenergy-accent' : 'text-white/90 hover:text-white'}`}
            >
              <span className={`material-symbols-outlined text-[26px] transition-transform ${isSharing ? 'animate-spin' : 'group-hover:scale-110'}`}>
                {isSharing ? 'sync' : 'add_to_photos'}
              </span>
            </button>
            <button className="text-white/90 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[26px] hover:scale-110 transition-transform">send</span>
            </button>
          </div>
          <button className="text-white/90 hover:text-zenergy-accent transition-colors">
            <span className="material-symbols-outlined text-[26px]">bookmark</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-white/95">
            {likeCount.toLocaleString()} likes
          </p>
          <p className="text-[13px] leading-relaxed text-white/80">
            <span className="font-bold mr-2">{post.username || "User"}</span>
            {post.text}
          </p>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {post.hashtags?.map(tag => (
              <span key={tag} className="text-[12px] font-bold text-zenergy-accent hover:underline cursor-pointer">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Comment Preview */}
        {post.comments?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/[0.05]">
            <button className="text-[11px] font-semibold text-white/30 hover:text-white/50 mb-2">
              View all {post.comments.length} comments
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;
