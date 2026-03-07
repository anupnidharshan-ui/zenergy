
import React, { useState } from 'react';
import { Chat, TabType, TabTypeMessage } from '../types';

interface ChatListProps {
  chats: Chat[];
  activeChatId?: string;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, activeChatId, onChatSelect, onNewChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
const filteredChats = chats.filter((chat) =>
  chat.participants[0]?.name
    ?.toLowerCase()
    .includes(searchQuery.toLowerCase())
);

  return (
    <div className="w-full lg:w-96 message-glass-panel flex flex-col h-full shrink-0 border-r border-white/5">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Messages</h2>
          <button 
            onClick={onNewChat}
            className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-xl">edit_square</span>
          </button>
        </div>

        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xl">search</span>
          <input 
            type="text"
            className="w-full bg-white/5 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/50 placeholder:text-white/20"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pb-6">
        {filteredChats.map((chat) => {
const participant = chat.participants[0];
const lastMsg = chat.lastMessage;
          const isActive = activeChatId === chat.id;

          return (
            <div 
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer mb-1 transition-all ${
                isActive ? 'bg-white/5 border border-white/5' : 'hover:bg-white/5'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`size-12 rounded-full overflow-hidden border-2 ${isActive ? 'border-primary/30' : 'border-transparent'}`}>
<img
  src={participant?.avatar}
  alt={participant?.name}
  className="w-full h-full object-cover"
/>
                </div>
{participant?.status === 'online' && (
                      <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-white/90'}`}>{participant.name}</h4>
                  <span className="text-[10px] text-white/30">{participant.lastSeen || '2m'}</span>
                </div>
                <p className={`text-xs truncate ${isActive ? 'text-white/60 font-medium' : 'text-white/40'}`}>
              {lastMsg || 'No messages yet'}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="size-2 bg-primary rounded-full unread-dot shrink-0"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
