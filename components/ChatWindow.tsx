
import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../types';
import { 
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { getGeminiResponse } from '../services/geminiService';

interface ChatWindowProps {
  chat: Chat;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
    const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
useEffect(() => {
  if (!chat?.id) return;

  const q = query(
    collection(db, "chats", chat.id, "messages"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setMessages(msgs);
  });

  return () => unsubscribe();
}, [chat.id]);

  const participant = chat.participants[0];

  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [messages, isTyping]);

 const handleSend = async () => {
  if (!inputText.trim() || !auth.currentUser) return;

  console.log("Sending message...");
  console.log("Chat ID:", chat.id);

  try {
    const text = inputText;
    setInputText("");

    const chatRef = doc(db, "chats", chat.id);

    await setDoc(chatRef, {
      participants: [auth.currentUser.uid, chat.participants[0].id],
      lastMessage: text,
      lastMessageAt: serverTimestamp(),
      lastMessageSender: auth.currentUser.uid
    }, { merge: true });

    console.log("Chat document created");

    await addDoc(
      collection(db, "chats", chat.id, "messages"),
      {
        text,
        senderId: auth.currentUser.uid,
        createdAt: serverTimestamp()
      }
    );

    console.log("Message added");

  } catch (error) {
    console.error("Error sending message:", error);
  }
};

  return (
    <div className="flex-1 flex flex-col h-full bg-black/20 relative">
      <header className="h-20 message-glass-panel border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full overflow-hidden border border-white/10">
            <img src={participant.avatar} alt={participant.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold">{participant.name}</h3>
            <div className="flex items-center gap-1.5">
              <div className={`size-2 rounded-full ${participant.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{participant.status}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white/60 hover:text-white">
            <span className="material-symbols-outlined text-xl">videocam</span>
          </button>
          <button className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white/60 hover:text-white">
            <span className="material-symbols-outlined text-xl">call</span>
          </button>
          <button className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-white/60 hover:text-white">
            <span className="material-symbols-outlined text-xl">info</span>
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto message-custom-scrollbar p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center mb-4">
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Today</span>
        </div>

        {messages.map((msg) => {
         const isUser = msg.senderId === auth.currentUser?.uid;
          return (
            <div key={msg.id} className={`flex gap-4 max-w-[80%] ${isUser ? 'self-end flex-row-reverse' : ''}`}>
              {!isUser && (
                <div className="size-8 rounded-full overflow-hidden shrink-0 mt-auto">
                  <img src={participant.avatar} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`p-4 rounded-2xl ${isUser ? 'message-glass-bubble-sent rounded-br-none' : 'message-glass-bubble-received rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed text-white/90">{msg.text}</p>
                <span className={`text-[9px] text-white/30 block mt-2 ${isUser ? '' : 'text-right'}`}>
{msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-4 max-w-[80%]">
            <div className="size-8 rounded-full overflow-hidden shrink-0 mt-auto">
              <img src={participant.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="message-glass-bubble-received p-4 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <div className="size-1.5 bg-white/20 rounded-full animate-bounce"></div>
                <div className="size-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="size-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="p-8 bg-black/20 shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-2">
          <button className="size-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-all text-white/40 hover:text-white">
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
          <button className="size-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-all text-white/40 hover:text-white">
            <span className="material-symbols-outlined text-2xl">image</span>
          </button>
          <button className="size-10 rounded-xl hover:bg-white/5 flex items-center justify-center transition-all text-white/40 hover:text-white">
            <span className="material-symbols-outlined text-2xl">mood</span>
          </button>
          <input 
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder:text-white/20 px-2"
            placeholder="Send a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-background-dark font-bold">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;
