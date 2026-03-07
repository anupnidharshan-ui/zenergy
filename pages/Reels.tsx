
import React from 'react';
import Sidebar from '../components/Sidebar';
import ReelItem from '../components/ReelItem';
import RightPanel from '../components/RightPanel';
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { where } from "firebase/firestore";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Reels: React.FC = () => {
  const [reels, setReels] = useState<any[]>([]);

useEffect(() => {
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const reelsData = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((post: any) => post.videoUrl); // only videos

    setReels(reelsData);
  });

  return () => unsubscribe();
}, []);
  return (
    <div className="reels-mesh-gradient flex h-screen w-full relative">
      <Sidebar />
      
      <main className="flex-1 reel-container   ">
        {reels.map((reel) => (
          <ReelItem key={reel.id} reel={reel} />
        ))}
      </main>

      <RightPanel />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[500px] bg-neon-purple/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 size-[600px] bg-neon-cyan/5 blur-[150px] rounded-full animate-pulse [animation-delay:1s]"></div>
      </div>
    </div>
  );
};

export default Reels;
