
import React, { useState, useEffect } from 'react';
// Fixed: Contact should be imported from '../types' instead of '../constants'
import { Contact } from '../types';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  doc 
} from "firebase/firestore";
import { db, auth } from "../firebase";

interface NewMessageModalProps {
  onClose: () => void;
  onStartChat: (contact: Contact) => void;
}

const NewMessageModal: React.FC<NewMessageModalProps> = ({ onClose, onStartChat }) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
const [users, setUsers] = useState<Contact[]>([]);

  const toggleContact = (contact: Contact) => {
    if (selectedContacts.find(c => c.id === contact.id)) {
      setSelectedContacts(selectedContacts.filter(c => c.id !== contact.id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

useEffect(() => {
  const fetchFollowingUsers = async () => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "followers"),
      where("followerId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    const usersData: Contact[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const followingId = data.followingId;

      const userSnap = await getDoc(doc(db, "users", followingId));

      if (userSnap.exists()) {
        const userData = userSnap.data() as any;

        usersData.push({
          id: followingId,
          name: userData.name ?? "Unknown",
          handle: userData.username ? `@${userData.username}` : "",
          avatar: userData.photoURL ?? "/default-avatar.png",
          status: "online"
        });
      }
    }

    setUsers(usersData);
  };

  fetchFollowingUsers();
}, []);

const filtered = users.filter(c =>
  c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  c.handle.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background-dark/40 backdrop-blur-sm">
      <div className="w-full max-w-lg message-glass-modal rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <h3 className="text-xl font-bold">New Message</h3>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-primary focus:ring-0 focus:bg-white/10 transition-all outline-none" 
              placeholder="Search users by name or @handle" 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedContacts.map(c => (
              <div key={c.id} className="bg-primary/10 border border-primary/30 rounded-full px-3 py-1.5 flex items-center gap-2">
                <img alt="" className="size-5 rounded-full object-cover" src={c.avatar} />
                <span className="text-xs font-bold text-primary">{c.name}</span>
                <button 
                  onClick={() => toggleContact(c)}
                  className="material-symbols-outlined text-[14px] text-primary/60 hover:text-primary"
                >
                  close
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Suggested for group chat</label>
            <div className="max-h-64 overflow-y-auto message-custom-scrollbar space-y-1 pr-2">
              {filtered.map(c => {
                const isSelected = selectedContacts.find(sc => sc.id === c.id);
                return (
                  <div 
                    key={c.id}
                    onClick={() => toggleContact(c)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${
                      isSelected ? 'bg-primary/5 border-primary/20' : 'hover:bg-white/5 border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-11 rounded-xl overflow-hidden border ${isSelected ? 'border-primary/40' : 'border-white/10'}`}>
                        <img alt={c.name} className="w-full h-full object-cover" src={c.avatar} />
                      </div>
                      <div>
                        <h5 className={`text-sm font-bold ${isSelected ? 'text-primary' : ''}`}>{c.name}</h5>
                        <p className={`text-[10px] ${isSelected ? 'text-primary/60' : 'text-white/30'}`}>{c.handle}</p>
                      </div>
                    </div>
                    <div className={`size-5 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-primary border-primary' : 'border-white/20'}`}>
                      {isSelected && <span className="material-symbols-outlined text-[14px] text-background-dark font-bold">check</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <button 
            disabled={selectedContacts.length === 0}
            onClick={() => selectedContacts.length > 0 && onStartChat(selectedContacts[0])}
            className="w-full py-4 rounded-2xl bg-primary text-background-dark font-bold hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Chat {selectedContacts.length > 0 && `(${selectedContacts.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMessageModal;

