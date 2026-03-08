
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import NewMessageModal from '../components/NewMessageModel';
import { Chat, Contact } from '../types';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth, } from "../firebase";
import { doc, getDocs, getDoc } from "firebase/firestore";


const Messenger: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState('messages');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  const activeChat = chats.find(c => c.id === activeChatId);

  const getChatId = (uid1: string, uid2: string) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

const handleStartChat = (contact: Contact) => {
  if (!auth.currentUser) return;

  const chatId = getChatId(auth.currentUser.uid, contact.id);

  const existing = chats.find(c => c.id === chatId);

  if (existing) {
    setActiveChatId(existing.id);
  } else {
    const newChat: Chat = {
      id: chatId,
      participants: [contact],
      messages: [],
      unreadCount: 0,
      type: "primary"
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(chatId);
  }

  setIsModalOpen(false);
};

useEffect(() => {
  if (!auth.currentUser) return;

  const q = query(
    collection(db, "chats"),
    where("participants", "array-contains", auth.currentUser.uid)
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const chatsData: Chat[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      const otherUserId = data.participants.find(
        (uid: string) => uid !== auth.currentUser?.uid
      );

      if (!otherUserId) continue;

      const userSnap = await getDoc(doc(db, "users", otherUserId));
      if (!userSnap.exists()) continue;

      const userData = userSnap.data() as any;

      chatsData.push({
        id: docSnap.id,
        participants: [{
          id: otherUserId,
          name: userData.username ?? "Unknown",
          handle: userData.username ? `@${userData.username}` : "",
          avatar: userData.avatarUrl ?? "/default-avatar.png",
          status: "online"
        }],
        messages: [],
        unreadCount: 0,
        type:"primary",
        lastMessage: data.lastMessage || "",
        lastMessageAt: data.lastMessageAt || null
      });
    }

    setChats(chatsData);

    // auto-select first chat if none selected
    if (!activeChatId && chatsData.length > 0) {
      setActiveChatId(chatsData[0].id);
    }
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="flex h-screen w-full  relative overflow-hidden">
      <Sidebar 
        activeItem={activeSidebarItem} 
        onItemClick={setActiveSidebarItem} 
      />

      <main className="flex-1 flex overflow-hidden md:ml-64">
        {activeSidebarItem === 'messages' ? (
          <>
            <ChatList 
              chats={chats} 
              activeChatId={activeChatId} 
              onChatSelect={setActiveChatId}
              onNewChat={() => setIsModalOpen(true)}
            />
            {activeChat ? (
              <ChatWindow 
                chat={activeChat} 
               
              />
            ) : (
              <div className=" message-mesh-gradient flex-1 flex items-center justify-center bg-black/20">
                <p className="text-white/20 font-bold uppercase tracking-widest">Select a chat to start</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-white/10 mb-4">construction</span>
              <h2 className="text-xl font-bold text-white/40 uppercase tracking-widest">
                {activeSidebarItem} feature coming soon
              </h2>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <NewMessageModal 
          onClose={() => setIsModalOpen(false)} 
          onStartChat={handleStartChat}
        />
      )}

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[500px] bg-neon-purple/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 size-[600px] bg-neon-cyan/5 blur-[150px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Messenger;
