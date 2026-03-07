
import React from 'react';
import { UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';
interface ProfileHeaderProps {
  profile: UserProfile;
  followersCount: number;
  postsCount: number; 
  isOwnProfile: boolean;
  isFollowing: boolean;
  followingCount: number; 
  followRequests: any[];
  setShowRequests: React.Dispatch<React.SetStateAction<boolean>>;
  onFollowToggle: () => void;
  onOpenVibeTool: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  followersCount,
  followingCount,
  postsCount,
  isOwnProfile,
  isFollowing,
  onFollowersClick,
  onFollowingClick,
  followRequests,
  setShowRequests,
  onFollowToggle,
  onOpenVibeTool
}) => {
    const navigate = useNavigate();
   return (
    <header className="flex flex-col md:flex-row gap-12 mb-12 items-center md:items-start text-center md:text-left mt-16 md:mt-0">
      <div className="size-40 profile-vibe-ring-profile rounded-full relative flex-shrink-0">
        <div className="size-full rounded-full border-4 border-background-dark overflow-hidden">
          <img 
            alt={profile.name} 
            className="w-full h-full object-cover" 
  src={profile.avatarUrl || "/default-avatar.png"}
          />
        </div>
      </div>
      
      <div className="flex-1 space-y-6">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <h2 className="text-3xl font-light tracking-tight">{profile.username}</h2>
          
          <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">waves</span>
            {profile.vibe}
          </div>

         {isOwnProfile ? (
  <button 
    onClick={onOpenVibeTool}
    className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-sm font-semibold transition-all border border-white/5"
  >
    Edit Profile
  </button>
) : (
  <button
    onClick={() => {
  console.log("FOLLOW CLICKED");
  onFollowToggle();
}}
    className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
      isFollowing
        ? "bg-white/20 hover:bg-white/30"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
  >
    {isFollowing ? "Following" : "Follow"}
  </button>
)}
          
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all border border-white/5"
              onClick={() => navigate("/settings")}>
            <span className="material-symbols-outlined text-lg">settings</span>
          </button>
        </div>

        <div className="flex justify-center md:justify-start gap-8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-lg">{postsCount}</span>
            <span className="text-white/40 text-sm">Posts</span>
          </div>
          <div
  onClick={onFollowersClick}
className="flex items-baseline gap-1.5 cursor-pointer transition-opacity duration-200 hover:opacity-70">
  <span className="font-bold text-lg">{followersCount}</span> 
  <span className="text-white/40 text-sm">Followers</span>
</div>

         <div
  onClick={onFollowingClick}
className="flex items-baseline gap-1.5 cursor-pointer transition-opacity duration-200 hover:opacity-70">
  <span className="font-bold text-lg">{followingCount}</span> 
  <span className="text-white/40 text-sm">Following</span>
</div>

{isOwnProfile && (
  <button
    onClick={() => setShowRequests(true)}
    className="ml-4 text-sm px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20"
  >
Requests ({followRequests?.length ?? 0})
  </button>
)}

        </div>

        <div className="space-y-1">
          <h3 className="font-bold">{profile.name}</h3>
          <p className="text-white/70 text-sm leading-relaxed max-w-md whitespace-pre-line">
            {profile.bio}
          </p>
          <a href="#" className="text-primary text-sm font-semibold hover:underline flex items-center justify-center md:justify-start gap-1 mt-2">
            <span className="material-symbols-outlined text-sm">link</span>
            {profile.link}
          </a>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
