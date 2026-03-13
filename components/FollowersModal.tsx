import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  username: string;
  name?: string;
  avatarUrl?: string;
}

interface FollowersModalProps {
  profileId: string;
  type: "followers" | "following";
  onClose: () => void;
}

const FollowersModal: React.FC<FollowersModalProps> = ({
  profileId,
  type,
  onClose,
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState<string | null>(null);
  const navigate = useNavigate();



  useEffect(() => {
    const q =
      type === "followers"
        ? query(collection(db, "followers"), where("followingId", "==", profileId))
        : query(collection(db, "followers"), where("followerId", "==", profileId));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const userIds =
        type === "followers"
          ? snapshot.docs.map((doc) => doc.data().followerId)
          : snapshot.docs.map((doc) => doc.data().followingId);

      if (userIds.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      const fetchedUsers: UserData[] = [];

      for (const id of userIds) {
        const userSnap = await getDoc(doc(db, "users", id));
        if (userSnap.exists()) {
          fetchedUsers.push({
            id: userSnap.id,
            ...(userSnap.data() as Omit<UserData, "id">),
          });
        }
      }

      setUsers(fetchedUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profileId, type]);

  const handleFollow = (userId: string) => {
  // later firebase follow request logic comes here

  setRequestSent(userId);

  setTimeout(() => {
    setRequestSent(null);
  }, 2000);
};

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
className="w-[95%] max-w-md max-h-[80vh] profile-mesh-gradient text-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 "        
onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b font-semibold text-center">
          {type === "followers" ? "Followers" : "Following"}
        </div>

<div className="overflow-y-auto max-h-[65vh] px-2 py-2 space-y-1">
            {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No users found
            </div>
          ) : (
users.map((user) => (
  <div
    key={user.id}
    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800/70 transition-all duration-200"
  >
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => {
        navigate(`/profile/${user.id}`);
        onClose();
      }}
    >
      <img
        src={user.avatarUrl || "https://via.placeholder.com/100"}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-medium text-sm">{user.username}</p>
        <p className="text-xs text-gray-500">{user.name}</p>
      </div>
    </div>

    <button
      onClick={(e) => {
        e.stopPropagation();
        handleFollow(user.id);
      }}
      className="text-xs bg-blue-500 px-3 py-1 rounded-lg"
    >
      Follow
    </button>
  </div>
))

          )}
        </div>
        {requestSent && (
  <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-[9999]">
    Request Sent
  </div>
)}
      </div>
    </div>
  );
};

export default FollowersModal;