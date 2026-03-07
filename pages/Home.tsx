import { useState } from "react";
import { VibeType } from "../types.tsx";

import VibeSelector from "../components/VibeSelector";
import Sidebar from "../components/Sidebar";
import MainFeed from "../components/MainFeed";
import RightSidebar from "../components/RightSidebar";
import CreatePostModal from "../components/CreatePostModal";

export default function Home() {
  const [selectedVibe, setSelectedVibe] = useState<VibeType | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVibeSelect = (vibe: VibeType) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedVibe(vibe);
      setIsLoading(false);
    }, 1500);
  };

  if (!selectedVibe) {
    return (
      <VibeSelector
        onSelect={handleVibeSelect}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className={` home-mesh-gradient min-h-screen relative vibe-gradient-${selectedVibe.toLowerCase()}`} >
      <div className="flex max-w-[1440px] mx-auto h-screen overflow-hidden ">
        
        {/* LEFT SIDEBAR */}
        <div className="min-w-64 flex-shrink-0 ">
          <Sidebar onOpenCreate={() => setCreateModalOpen(true)} />
        </div>

        {/* MAIN FEED */}
        <main className="flex-grow border-x border-white/5 bg-black/20 backdrop-blur-sm min-h-screen pb-10 overflow-y-auto custom-scrollbar">
  <MainFeed currentVibe={selectedVibe} />
</main>

        {/* RIGHT SIDEBAR */}
        <div className="w-[380px] flex-shrink-0 hidden xl:block">
          <div className="sticky top-0  p-8">
            <RightSidebar
              currentVibe={selectedVibe}
              onChangeVibe={() => setSelectedVibe(null)}
            />
          </div>
        </div>
      </div>

      {/* CREATE POST MODAL */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        initialVibe={selectedVibe}
      />

      {/* BACKGROUND DECOR */}
      <div className="fixed inset-0 -z-50 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-gradient-to-br from-white/5 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-gradient-to-tl from-white/5 to-transparent animate-pulse-slow"></div>
      </div>
    </div>
  );
}

