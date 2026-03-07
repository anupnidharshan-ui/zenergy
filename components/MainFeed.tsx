
import React from 'react';
import { VibeType } from '../types';
import StorySection from './StorySection';
import PostCard from './PostCard';
import ReelCard from './ReelCard';
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, getDocs, getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";

interface MainFeedProps {
  currentVibe: VibeType;
}

const MainFeed: React.FC<MainFeedProps> = ({ currentVibe }) => {

  const [posts, setPosts] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [profiles, setProfiles] = useState<any[]>([]);

// post 
useEffect(() => {
  const q = query(
    collection(db, "posts"),
    where("vibeId", "==", currentVibe),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const postData = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        username: data.username,
        avatarUrl: data.avatarUrl,
        videoUrl: data.videoUrl,
        imageUrl: data.imageUrl,
        vibeId: data.vibeId,
        text: data.text,
        uid: data.uid,
        createdAt: data.createdAt
      };
    });

    setPosts(postData);
    setLoading(false);
  });

  return () => unsubscribe();
}, [currentVibe]);

  /* ---------------- FOLLOWING USERS ---------------- */

  useEffect(() => {
    const loadFollowing = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const followQuery = query(
        collection(db, "followers"),
        where("followerId", "==", user.uid),
        where("status", "==", "accepted")
      );

      const followSnap = await getDocs(followQuery);

      const usersData: any[] = [];

      for (const followDoc of followSnap.docs) {
        const followingId = followDoc.data().followingId;

        const userDoc = await getDoc(doc(db, "users", followingId));

  if (userDoc.exists()) {
  const data = userDoc.data();

  console.log("USER DOC DATA:", data); // debug

  usersData.push({
    id: userDoc.id,
    username: data.username,
    photoURL: data.photoURL,
    currentVibe: data.vibe || "",
  });
}
      }

      setProfiles(usersData);
    };

    loadFollowing();
  }, []);
 
 /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-white/40">
        Loading energy...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* profiles */}
      <section className="mb-10 px-4">
        <StorySection
          currentVibe={currentVibe}
          profiles={profiles}
        />
      </section>

      {/* FEED */}
      <div className="space-y-12 px-4 pb-20">
    {posts.map((post) =>
  post.videoUrl ? (
    <ReelCard key={post.id} post={post} />
  ) : (
    <PostCard key={post.id} post={post} />
  )
)}

        <div className="flex flex-col items-center justify-center pt-8 opacity-40">
          <div className="size-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-xs uppercase tracking-widest font-bold">Discovering more for you</p>
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
