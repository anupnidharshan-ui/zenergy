
import React, { useState } from 'react';
import { Post } from '../types';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [commentText, setCommentText] = useState('');

  
  if (!post) return null;
  const tags = post.tags || [];
const creator = post.creator || {};

const currentUser = auth.currentUser;

const likes = post.likes || [];
const comments = post.comments || [];

const isLiked = likes.includes(currentUser?.uid || "");

const handleLike = async () => {
  if (!currentUser) return;

  const postRef = doc(db, "posts", post.id);

  if (isLiked) {
    await updateDoc(postRef, {
      likes: arrayRemove(currentUser.uid),
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(currentUser.uid),
    });
  }
};

const handleComment = async () => {
  if (!commentText.trim() || !currentUser) return;

  const postRef = doc(db, "posts", post.id);

  const newComment = {
    id: Date.now().toString(),
    text: commentText,
    user: {
      uid: currentUser.uid,
      name: currentUser.displayName || post.username,
      avatar: currentUser.photoURL || "",
    },
    timestamp: new Date().toLocaleString(),
  };

  await updateDoc(postRef, {
    comments: arrayUnion(newComment),
    commentsCount: (post.commentsCount || 0) + 1,
  });

  setCommentText("");
};


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute top-6 right-8 z-[110]">
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>
      </div>

      <div className="w-full max-w-[1100px] h-full max-h-[85vh] bg-[#0f1218]/80 backdrop-blur-[40px] rounded-[32px] overflow-hidden flex flex-col md:flex-row border border-primary/20 shadow-2xl">
        {/* Left Side: Media */}
        <div className="w-full md:w-[60%] bg-black relative flex items-center justify-center group overflow-hidden">
          {post.videoUrl ? (
  <video
    src={post.videoUrl}
    controls
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover"
  />
) : (
  <img
    src={post.imageUrl}
    alt="Focused Post"
    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
  />
)}
          <div className="absolute bottom-6 left-6 flex gap-3">
           {post.vibeId && (
  <div className="...">
    {post.vibeId}
  </div>
)}
            {post.location && (
              <div className="bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {post.location}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Info & Comments */}
        <div className="w-full md:w-[40%] flex flex-col h-full bg-white/[0.02]">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full border-2 border-primary/40 p-0.5">
                <img
  alt={post.username}
  className="w-full h-full object-cover rounded-full"
  src={post.avatarUrl || "/default-avatar.png"}
/>
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1">
                  {post.username}
                  {post.creator?.isVerified && (
                    <span className="material-symbols-outlined text-[16px] text-primary fill-1">verified</span>
                  )}
                </h4>
                <p className="text-[11px] text-white/40">
                  {post.creator?.isFollowing ? 'Following' : 'Suggested'}
                </p>
              </div>
            </div>
            <button className="material-symbols-outlined text-white/60 hover:text-white">more_horiz</button>
          </div>

          {/* Comments Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Caption */}
            <div className="flex gap-3">
<img
  alt="avatar"
  className="size-8 rounded-full"
  src={post.avatarUrl || "/default-avatar.png"}
/>              <div className="flex-1">
                <p className="text-xs text-white/90 leading-relaxed">
                  <span className="font-bold mr-2">{post.username}</span>
                  {post.text}
                </p>
                <span className="text-[10px] text-white/30 mt-2 block tracking-wider uppercase">{post.date}</span>
              </div>
            </div>

            {/*  Comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group">
                <img alt="avatar" className="size-8 rounded-full" src={comment.user?.avatar || "/default-avatar.png"}
                 />
                <div className="flex-1">
                  <p className="text-xs text-white/90">
                    <span className="font-bold mr-2">{comment.user?.name || "User"}</span>
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] text-white/30">{comment.timestamp}</span>
                    <span className="text-[10px] text-white/30 font-bold cursor-pointer hover:text-white transition-colors">Reply</span>
                  </div>
                </div>
                <button className="material-symbols-outlined text-sm text-white/20 hover:text-primary transition-colors">favorite</button>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <button
  onClick={handleLike}
  className="hover:scale-110 transition-transform active:scale-95"
>
  <span
    className={`material-symbols-outlined text-2xl ${
      isLiked ? "text-red-500 fill-1" : "text-white"
    }`}
  >
    favorite
  </span>
</button>
                <button className="hover:scale-110 transition-transform active:scale-95">
                  <span className="material-symbols-outlined text-2xl">chat_bubble</span>
                </button>
                <button className="hover:scale-110 transition-transform active:scale-95">
                  <span className="material-symbols-outlined text-2xl">send</span>
                </button>
              </div>
              <button className="hover:scale-110 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-2xl">bookmark</span>
              </button>
            </div>
            <div>
<p className="text-sm font-bold">
{likes.length.toLocaleString()} likes
</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{post.date}</p>
            </div>
            <div className="flex items-center gap-3 pt-2 relative">
              <span className="material-symbols-outlined text-white/40">sentiment_satisfied</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder-white/20 text-white"
                placeholder="Add a comment..."
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button 
  onClick={handleComment}
  className={`text-primary text-sm font-bold transition-opacity ${
    commentText ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
>
  Post
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostModal;