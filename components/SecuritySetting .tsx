
import React, { useState } from 'react';
import { Session } from '../types';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect } from "react";
 import { deleteDoc, doc } from "firebase/firestore";
 import { 
  EmailAuthProvider, 
  reauthenticateWithCredential, 
  updatePassword 
} from "firebase/auth";

const SecuritySetting: React.FC = () => {
const [sessions, setSessions] = useState<Session[]>([]);
  const [isTwoFactor, setIsTwoFactor] = useState(true);
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const revokeSession = async (id: string) => {
  await deleteDoc(doc(db, "sessions", id));
};

  const getIcon = (type: string) => {
    switch (type) {
      case 'laptop': return 'laptop_mac';
      case 'smartphone': return 'smartphone';
      default: return 'desktop_windows';
    }
  };

  const handleUpdatePassword = async () => {
  try {
    if (!auth.currentUser || !auth.currentUser.email) return;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    await reauthenticateWithCredential(auth.currentUser, credential);

    await updatePassword(auth.currentUser, newPassword);

    alert("Password updated successfully");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    console.error(error);
    alert("Failed to update password");
  }
};

useEffect(() => {
  if (!auth.currentUser) return;

  const q = query(
    collection(db, "sessions"),
    where("userId", "==", auth.currentUser.uid)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const sessionList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Session[];

    setSessions(sessionList);
  });

  return () => unsub();
}, []);

  return (
    <div className="flex-1 p-10 overflow-y-auto custom-scrollbar max-w-4xl">
      <div className="mb-10">
        <p className="text-white/40 text-sm">Manage your account security, passwords, and active sessions.</p>
      </div>

      <div className="space-y-8">
        <section className="settings-glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">key</span>
            <h4 className="font-bold">Change Password</h4>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Current Password</label>
              <input
  className="w-full bg-white/5 border-white/10 rounded-2xl px-4 py-3 focus:ring-primary focus:border-primary transition-all text-sm" 
  type="password"
  placeholder=" Enter current password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">New Password</label>
                <input 
                  className="w-full bg-white/5 border-white/10 rounded-2xl px-4 py-3 focus:ring-primary focus:border-primary transition-all text-sm" 
                  placeholder="Enter new password"
  type="password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}

                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Confirm New Password</label>
                <input 
                  className="w-full bg-white/5 border-white/10 rounded-2xl px-4 py-3 focus:ring-primary focus:border-primary transition-all text-sm" 
                  placeholder="Retype password"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-2">
              <button 
              onClick={handleUpdatePassword}
              className=" bg-primary  text-background-dark font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-all text-sm shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                Update Password
              </button>
            </div>
          </div>
        </section>

        <section className="settings-glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-neon-purple">verified_user</span>
              <div>
                <h4 className="font-bold">Two-Factor Authentication</h4>
                <p className="text-[11px] text-white/40 mt-1">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <div 
              onClick={() => setIsTwoFactor(!isTwoFactor)}
              className="relative inline-flex items-center cursor-pointer group"
            >
              <div className={`w-14 h-7 rounded-full transition-all duration-300 relative ${isTwoFactor ? 'bg-primary shadow-[0_0_15px_rgba(0,212,255,0.3)]' : 'bg-white/10'}`}>
                <div className={`absolute top-1 left-1 bg-white size-5 rounded-full shadow-md transition-transform duration-300 ${isTwoFactor ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
              <span className={`ml-3 text-xs font-bold transition-colors ${isTwoFactor ? 'text-primary' : 'text-white/40'}`}>
                {isTwoFactor ? 'ENABLED' : 'DISABLED'}
              </span>
            </div>
          </div>
        </section>

        <section className="settings-glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">devices</span>
            <h4 className="font-bold">Active Sessions</h4>
          </div>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  session.isActive ? 'bg-white/5 border-white/10' : 'hover:bg-white/5 border-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-xl flex items-center justify-center ${session.isActive ? 'bg-primary/20' : 'bg-white/5'}`}>
                    <span className={`material-symbols-outlined ${session.isActive ? 'text-primary' : 'text-white/40'}`}>
                      {getIcon(session.type)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold">{session.device}</h5>
                      {session.isActive && (
                        <span className="bg-primary/20 text-primary text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                          This Device
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">{session.location} • {session.browser}</p>
                  </div>
                </div>
                {session.isActive ? (
                  <span className="text-[10px] font-bold text-primary tracking-widest">ACTIVE NOW</span>
                ) : (
                  <button 
                    onClick={() => revokeSession(session.id)}
                    className="text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    REVOKE
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/5">
            <button className="w-full text-center py-4 text-sm font-bold text-red-400/80 hover:text-red-400 hover:bg-red-400/5 rounded-2xl border border-dashed border-red-400/20 transition-all uppercase tracking-widest">
              Log out of all sessions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SecuritySetting;
