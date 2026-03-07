import React, { useState } from "react";
import { VibeType } from "../types";
import { VIBES } from "../constants";

interface StorySectionProps {
  currentVibe: VibeType;
  profiles: any[];
}

const StorySection: React.FC<StorySectionProps> = ({ currentVibe, profiles }) => {

  const vibeConfig = VIBES[currentVibe];
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  return (
    <>
      <div className="flex gap-5 overflow-x-auto pb-6 pt-2 px-2">

        {profiles.map((profile) => {
  console.log("PROFILE DATA:", profile);   // 👈 add this
  const creatorVibe = VIBES[profile.currentVibe];
  const avatar = profile.avatarUrl || profile.photoURL;

          return (
            <div
              key={profile.id}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 cursor-pointer group"
              onClick={() => {
  console.log("CLICKED PROFILE:", profile);   // 👈 add this
  setSelectedProfile({
    avatar: profile.avatarUrl || profile.photoURL,
    username: profile.username,
  });
}}
            >
              <div className="relative size-[66px] p-[2.5px] rounded-full transition-transform active:scale-95">

                <div className="size-full rounded-full overflow-hidden bg-black/40 border border-white/10">
                  <img
                 src={avatar}
                    alt={profile.username}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                  <circle
                    cx="33"
                    cy="33"
                    r="30.5"
                    fill="none"
                    stroke={creatorVibe?.color || vibeConfig.color}
                    strokeWidth="2.5"
                    className="opacity-90"
                    style={{
                      filter: `drop-shadow(0 0 3px ${creatorVibe?.color || vibeConfig.color})`,
                    }}
                  />
                </svg>

              </div>

              <span className="text-[10px] font-bold text-white/70">
                {profile.username}
              </span>

            </div>
          );
        })}

      </div>

   {selectedProfile && (
  <div
    className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center h-screen"
    onClick={() => setSelectedProfile(null)}
  >
    <div
      className="flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={selectedProfile.avatar}
        alt={selectedProfile.username}
        className="w-64 h-64 rounded-full object-cover border-4 border-white/20 shadow-2xl"
      />

      <span className="text-white text-lg font-semibold mt-4">
        {selectedProfile.username}
      </span>
    </div>
  </div>
)}

    </>
  );
};

export default StorySection;