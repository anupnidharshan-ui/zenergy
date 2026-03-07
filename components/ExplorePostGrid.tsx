
import React from 'react';
import { Postexplorer } from '../types';

interface PostGridProps {
  posts: Postexplorer[];
  onSelectPost: (post: Postexplorer) => void;
}

export const ExplorePostGrid: React.FC<PostGridProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-6 max-w-6xl mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onSelectPost(post)}
          className={`relative group cursor-pointer overflow-hidden rounded-[32px] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] ${
            post.isTall ? 'row-span-2' : ''
          }`}
        >
          {post.videoUrl ? (
  <video
    src={post.videoUrl}
    muted
    preload="metadata"
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
) : (
  <img
    src={post.imageUrl}
    alt={post.caption}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
)}
          
          {post.videoUrl && (
            <div className="absolute top-6 right-6">
              <span className="material-symbols-outlined text-white drop-shadow-lg text-3xl font-light">play_circle</span>
            </div>
          )}

          {post.id === '4' && (
             <div className="absolute top-6 right-6">
                <span className="material-symbols-outlined text-white/70 text-xl">filter_none</span>
             </div>
          )}

          <div className="absolute inset-0 explorer-glass-overlay opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="material-symbols-outlined fill-1 text-primary">favorite</span>
              <span>{(post.likes?.length || 0)}k</span>
            </div>
            <div className="flex items-center gap-2 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              <span className="material-symbols-outlined fill-1">mode_comment</span>
              <span>{post.commentsCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ExplorePostGrid;