
import React from 'react';
import { Post } from '../types';

interface PostGridProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, onPostClick }) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pb-20">
      {posts.map((post) => (
<div
  key={post.id}
  onClick={() => onPostClick(post)}
  className="relative w-full aspect-square overflow-hidden rounded-2xl group cursor-pointer"
>
           {post.imageUrl ? (
 <img
  src={post.imageUrl}
  alt="Post"
  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
) : (
  <div className="w-full h-full flex items-center justify-center text-white/30">
    No Image
  </div>
)}
          <div className="absolute inset-0 profile-post-overlay opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined fill text-primary">favorite</span>
<span className="text-sm md:text-base">
  {post.likes?.length || 0}
</span>            </div>
            <div className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined fill text-white">chat_bubble</span>
              <span className="text-sm md:text-base">
  {post.comments?.length || 0}
</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
