
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";

const ProfileSettings: React.FC = () => {

  const [profile, setProfile] = useState<UserProfile | null>(null);
const [loading, setLoading] = useState(true);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setProfile((prev) =>
    prev ? { ...prev, [name]: value } : prev
  );
};

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      setLoading(false);   
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setProfile({
          id: snap.id,
          ...(snap.data() as Omit<UserProfile, "id">),
        });
      } else {
      const newUser: UserProfile = {
  id: user.uid,
  displayName: user.displayName || "",
  username: "",
  website: "",
  bio: "",
  avatarUrl: user.photoURL || "",
};

        await setDoc(userRef, newUser);
        setProfile(newUser);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);   
  });

  return () => unsubscribe();
}, []);

const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  try {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile photo");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/djyapgbgy/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.secure_url) {
      console.error("Upload failed:", data);
      return;
    }

    const imageUrl = data.secure_url;

    // Save URL in Firestore
   await updateDoc(doc(db, "users", user.uid), {
  avatarUrl: imageUrl,
});

    // Instantly update UI
    setProfile(prev =>
  prev ? { ...prev, avatarUrl: imageUrl } : prev
);
    alert("Profile photo updated!");
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

if (loading || !profile) {
  return <div className="p-10">Loading...</div>;
}

  return (
    <div className="flex-1 p-10 max-w-3xl overflow-y-auto custom-scrollbar">
      <section>
        <div className="flex items-center gap-8 mb-12">
          <div className="relative group">
            <div className="size-32 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl">
              <img 
                alt="Profile avatar" 
                className="w-full h-full object-cover" 
                src={profile.avatarUrl} 
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold">{profile.displayName}</h3>
            <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-bold text-sm transition-all flex items-center gap-2">
              <label className="cursor-pointer">
  <input
    type="file"
    accept="image/*"
    onChange={handlePhotoChange}
    hidden
  />
  <div className=" hover:bg-gray-700">
    Change Photo
  </div>
</label>
            </button>
          </div>
        </div>

<form
  className="space-y-8"
 onSubmit={async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user || !profile) return;

  try {
    const userRef = doc(db, "users", user.uid);

    //  Update Firestore
    await updateDoc(userRef, {
      displayName: profile.displayName,
      username: profile.username,
      website: profile.website,
      bio: profile.bio,
    });

    // Update Firebase Auth name
    await updateProfile(user, {
      displayName: profile.displayName,
    });

    alert("Profile updated successfully ");
  } catch (error) {
    console.error(error);
  }
}}
>          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Display Name</label>
              <input 
                name="displayName"
                value={profile.displayName}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl settings-input-glass text-white font-medium" 
                placeholder="Your name" 
                type="text" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                <input 
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3.5 rounded-2xl settings-input-glass text-white font-medium" 
                  placeholder="username" 
                  type="text" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Website</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-xl">link</span>
              <input 
                name="website"
                value={profile.website}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl settings-input-glass text-white font-medium" 
                placeholder="https://yourwebsite.com" 
                type="url" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Bio</label>
            <textarea 
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl settings-input-glass text-white font-medium resize-none" 
              placeholder="Tell the world about your vibe..." 
              rows={4}
            />
            <div className="flex justify-end">
              <span className="text-[10px] text-white/30 font-bold uppercase">
                {profile.bio?.length || 0} / 150
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/40">
              <span className="material-symbols-outlined text-sm">info</span>
              <span className="text-xs">Changes are visible immediately on your profile.</span>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                type="button"
                onClick={async () => {
  const user = auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (snap.exists()) {
    setProfile(snap.data() as UserProfile);
  }
}}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl font-bold text-sm text-white/60 hover:text-white transition-all"
              >
                Discard
              </button>
              <button 
                type="submit"
                className="flex-1 sm:flex-none px-10 py-3.5 rounded-2xl bg-primary text-background-dark font-bold text-sm settings-neon-glow-btn"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileSettings;
