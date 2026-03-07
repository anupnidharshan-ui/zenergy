
import React, { useState, useMemo, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar  from '../components/Sidebar';
import { TopSearch } from '../components/TopSearch';
import  ExplorePostGrid  from '../components/ExplorePostGrid';
import { PostModal } from '../components/PostModal';
import { Postexplorer } from '@/types';
import { getAvatar } from "../utils/getAvatar";


const Explorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Postexplorer | null>(null);
  const [userResults, setUserResults] = useState<any[]>([]);
  const [posts, setPosts] = useState<Postexplorer[]>([]);
const [currentUserId, setCurrentUserId] = useState<string | null>(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUserId(user.uid);
    }
  });

  return () => unsubscribe();
}, []);

const navigate = useNavigate();

const searchUsers = async (text: string) => {
  if (!text.trim()) {
    setUserResults([]);
    return;
  }

  const snapshot = await getDocs(collection(db, "users"));
  const formattedText = text.toLowerCase().replace(/\s+/g, "");

  const users = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((user: any) => {
      const formattedUsername = user.username
        ?.toLowerCase()
        .replace(/\s+/g, "");

      return (
        user.id !== currentUserId &&   //  hide yourself
        formattedUsername?.includes(formattedText)
      );
    });

  setUserResults(users);   //  THIS WAS MISSING
};


const filteredPosts = useMemo(() => {
  if (!searchQuery) return posts;

  const q = searchQuery.toLowerCase();

  return posts.filter(post =>
    post.caption?.toLowerCase().includes(q) ||
    post.tags?.some(t => t.toLowerCase().includes(q))
  );
}, [searchQuery, posts]);

  const fetchPosts = async () => {
  const snapshot = await getDocs(collection(db, "posts"));

  const postData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Postexplorer[];

  setPosts(postData);
};

useEffect(() => {
  fetchPosts();
}, []);


  return (
<div className="explorer-mesh-gradient flex max-w-[1600px] mx-auto h-screen overflow-y-auto relative overflow-x-hidden explore-custom-scrollbar">      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Feed Content */}
      <main className={`ml-64 flex-1 px-4 md:px-12 py-6 relative transition-all duration-500 ${selectedPost ? 'blur-sm brightness-50 pointer-events-none' : ''}`}>
        <TopSearch
  onSearch={(value) => {
    setSearchQuery(value);
    searchUsers(value);
  }}
/>

{userResults.length > 0 && (
  <div className="mb-8 space-y-3">
    <h2 className="text-white font-bold text-lg">Users</h2>

    {userResults.map((user) => (
      <div
        key={user.id}
        onClick={() => navigate(`/profile/${user.id}`)}
        className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition"
      >

<img
  src={getAvatar(user.avatarUrl || user.photoURL, user.username)}
  alt={user.username}
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src =
      `https://ui-avatars.com/api/?name=${user.username}`;
  }}
  className="w-10 h-10 rounded-full object-cover"
/>

        <div>
          <p className="text-white font-semibold">
            {user.displayName}
          </p>
          <p className="text-white/40 text-sm">
            @{user.username}
          </p>
        </div>
      </div>
    ))}
  </div>
)}

        {filteredPosts.length > 0 ? (
          <ExplorePostGrid posts={filteredPosts} onSelectPost={setSelectedPost} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/40">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p className="text-xl font-medium">No vibes found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 size-[500px] bg-neon-purple/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 size-[600px] bg-neon-cyan/5 blur-[150px] rounded-full"></div>
        </div>
      </main>

      {/* Post Detail Overlay */}
      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
};

export default Explorer;
