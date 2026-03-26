  import React, { useState, useEffect } from 'react';
  import { auth, db } from "../firebase";
  import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    onSnapshot,
    orderBy
  } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { useParams } from "react-router-dom";

  import ProfileHeader from '../components/ProfileHeader';
  import PostGrid from '../components/PostGrid';
  import VibeGenerator from '../components/VibeGenerator';
  import Sidebar from '../components/Sidebar';
  import FollowersModal from '../components/FollowersModal';
  import { Post, TabType, UserProfile } from '../types';
import { PostModal } from '../components/PostModal';

  const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('posts');
    const [showVibeTool, setShowVibeTool] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [userPosts, setUserPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [followRequests, setFollowRequests] = useState<any[]>([]);
  const [showRequests, setShowRequests] = useState(false);
const [showToast, setShowToast] = useState(false);
const [currentUser, setCurrentUser] = useState<any>(null);
const [authReady, setAuthReady] = useState(false);
   
    const { uid } = useParams();

      const imagePosts = userPosts.filter(post => post.imageUrl);
const reelPosts = userPosts.filter(post => post.videoUrl);
const isOwnProfile = currentUser?.uid === profile?.id;
    /* ================= PROFILE LOADING ================= */

 useEffect(() => {
  if (!uid) return;

  const unsubscribeSnap = onSnapshot(
    doc(db, "users", uid),
    (snap) => {
      if (snap.exists()) {
        setProfile({
          id: snap.id,
          ...(snap.data() as Omit<UserProfile, "id">),
        });
      }
    }
  );

  return () => unsubscribeSnap();
}, [uid]);


  /* ================= USER POSTS (REAL DATA) ================= */

  useEffect(() => {

    if (!uid) return;

    if (profile?.accountType === "private" && !isFollowing && !isOwnProfile) {
      return;
    }

    const q = query(
      collection(db, "posts"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUserPosts(postsData);

    });

    return () => unsubscribe();

  }, [uid, profile, isFollowing]);
  /* ================= FOLLOW STATE ================= */

    useEffect(() => {
  if (!currentUser || !profile?.id) return;

  const followId = `${currentUser.uid}_${profile.id}`;
  const followRef = doc(db, "followers", followId);

  const unsubscribe = onSnapshot(followRef, (snap) => {
    if (!snap.exists()) {
      setIsFollowing(false);
      return;
    }

    const data = snap.data();

    if (data.status === "accepted") {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  });

  return () => unsubscribe();
}, [currentUser, profile]);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return () => unsub();
}, []);

    /* ================= FOLLOW COUNTS ================= */

    useEffect(() => {
      if (!profile?.id) return;

      const q = query(
    collection(db, "followers"),
  where("followerId", "==", profile.id),
    where("status", "==", "accepted")
  );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFollowingCount(snapshot.size);
      });

      return () => unsubscribe();
    }, [profile]);

    useEffect(() => {
      if (!profile?.id) return;

      const q = query(
  collection(db, "followers"),
  where("followingId", "==", profile.id),
  where("status", "==", "accepted")
);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setFollowersCount(snapshot.size);
      });

      return () => unsubscribe();
    }, [profile]);

    // follow request 
    useEffect(() => {
  if (!currentUser) return;

  const q = query(
    collection(db, "followers"),
    where("followingId", "==", currentUser.uid),
    where("status", "==", "pending")
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const requests = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const userDoc = await getDoc(doc(db, "users", data.followerId));

        return {
          requestId: docSnap.id,
          followerId: data.followerId,
          user: userDoc.data(),
        };
      })
    );

    setFollowRequests(requests);
  });

  return () => unsubscribe();
}, [currentUser]);

    if (!profile) {
      return (
        <div className="flex items-center justify-center min-h-screen text-white">
          Loading profile...
        </div>
      );
    }


    // Privacy enforcement
  const isPrivate = profile.accountType === "private";
  const isFollower = isFollowing; // already tracked via followers collection

  const shouldHideProfile =
    isPrivate && !isOwnProfile && !isFollower;

    const handleFollowFromModal = async (userId: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const followId = `${currentUser.uid}_${userId}`;
  const followRef = doc(db, "followers", followId);

  const userDoc = await getDoc(doc(db, "users", userId));
  const accountType = userDoc.data()?.accountType;

  if (accountType === "private") {
    await setDoc(followRef, {
      followerId: currentUser.uid,
      followingId: userId,
      status: "pending",
      createdAt: new Date(),
    });
  } else {
    await setDoc(followRef, {
      followerId: currentUser.uid,
      followingId: userId,
      status: "accepted",
      createdAt: new Date(),
    });
  }

 setShowToast(true);
setTimeout(() => setShowToast(false), 2000);
};

    

    return (
  <div className="profile-mesh-gradient min-h-screen flex relative profile-custom-scrollbar overflow-y-auto">
        <Sidebar />

  <main className="flex-1 md:ml-64 px-6 md:px-12 py-10 max-w-[1000px] mx-auto  h-screen">
          <ProfileHeader
            profile={profile}
            followersCount={followersCount}
            followingCount={followingCount}
            postsCount={userPosts.length}
            isOwnProfile={isOwnProfile}
            followRequests={followRequests}
    setShowRequests={setShowRequests}
            onFollowersClick={() => setShowFollowers(true)}
            onFollowingClick={() => setShowFollowing(true)}
            onFollowToggle={async () => {
  const currentUser = auth.currentUser;
  if (!currentUser || !profile?.id) return;

  const followId = `${currentUser.uid}_${profile.id}`;
  const followRef = doc(db, "followers", followId);

  if (isFollowing) {
    await deleteDoc(followRef);
  } else {

    if (profile.accountType === "private") {
      await setDoc(followRef, {
        followerId: currentUser.uid,
        followingId: profile.id,
        status: "pending",
        createdAt: new Date(),
      });
    } else {
      await setDoc(followRef, {
        followerId: currentUser.uid,
        followingId: profile.id,
        status: "accepted",
        createdAt: new Date(),
      });
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }
}}
            onOpenVibeTool={() => setShowVibeTool(true)}
          />

          

          <nav className="border-t border-white/10 flex justify-center gap-6 md:gap-12 mb-8 overflow-x-auto no-scrollbar">
            {(['posts', 'reels'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 py-4 border-t-2 transition-all text-xs font-bold uppercase tracking-[0.15em] ${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-white/40 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {tab === 'posts' ? 'grid_view' :
                  tab === 'reels' ? 'movie' :
                  tab === 'saved' ? 'bookmark' :
                  'assignment_ind'}
                </span>
                {tab}
              </button>
            ))}
          </nav>

 {shouldHideProfile ? (

  <div className="flex flex-col items-center justify-center py-20 text-white/60">
    <span className="material-symbols-outlined text-6xl mb-4">lock</span>
    <h2 className="text-xl font-semibold">This account is private</h2>
    <p className="text-white/40 mt-2">
      Follow this account to see their posts and content.
    </p>
  </div>

) : activeTab === "posts" ? (

  <PostGrid
    posts={imagePosts}
    onPostClick={(post) => setSelectedPost(post)}
  />

) : activeTab === "reels" ? (

  <div className="grid grid-cols-3 gap-1">
    {reelPosts.length === 0 ? (
      <div className="col-span-3 flex justify-center py-20 text-white/30">
        No reels yet
      </div>
    ) : (
      reelPosts.map((post) => (
        <video
          key={post.id}
          src={post.videoUrl}
          className="aspect-square object-cover cursor-pointer"
          muted
          onClick={() => setSelectedPost(post)}
        />
      ))
    )}
  </div>

) : (

  <div className="flex flex-col items-center justify-center py-20 text-white/30">
    No content shared in this section yet.
  </div>

)}

        </main>

        {showVibeTool && (
          <VibeGenerator
            currentBio={profile.bio}
            onClose={() => setShowVibeTool(false)}
            onUpdate={() => {}}
          />
        )}

      {showFollowers && (
  <FollowersModal
    profileId={profile.id}
    type="followers"
    onClose={() => setShowFollowers(false)}
    onFollow={handleFollowFromModal}
  />
)}

       {showFollowing && (
  <FollowersModal
    profileId={profile.id}
    type="following"
    onClose={() => setShowFollowing(false)}
    onFollow={handleFollowFromModal}
  />
)}

        {selectedPost && (
    <PostModal
      post={selectedPost}
      onClose={() => setSelectedPost(null)}
    />
  )}

  {showRequests && (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f0f12] p-6 rounded-xl w-[400px] max-h-[500px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Follow Requests</h2>

        {followRequests.length === 0 && (
          <p className="text-white/50">No pending requests</p>
        )}

        {followRequests.map((req) => {

  const user = req.user || {};

  return (
    <div
      key={req.requestId}
      className="flex items-center justify-between mb-3 p-2 border-b border-white/10"
    >

      <div className="flex items-center gap-3">

        <img
  src={user.avatarUrl || "/default-avatar.png"}
  className="w-10 h-10 rounded-full object-cover"
/>

        <span className="font-medium">
          {user.username || user.displayName || "User"}
        </span>

      </div>

      <div className="flex gap-2">

        <button
          onClick={async () => {
            try {
              await updateDoc(doc(db, "followers", req.requestId), {
                status: "accepted"
              });
            } catch (err) {
              console.error(err);
            }
          }}
          className="px-3 py-1 bg-green-600 rounded"
        >
          Accept
        </button>

        <button
          onClick={async () => {
            try {
              await deleteDoc(doc(db, "followers", req.requestId));
            } catch (err) {
              console.error(err);
            }
          }}
          className="px-3 py-1 bg-red-600 rounded"
        >
          Reject
        </button>

      </div>
    </div>
  );
})}

        <button
          onClick={() => setShowRequests(false)}
          className="mt-4 text-sm text-white/60 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  )}
{showToast && (
    <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[10000]">
    Request Sent
  </div>
)}
      </div>
    );
  };

  export default Profile;