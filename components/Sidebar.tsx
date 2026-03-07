
import { auth } from '@/firebase';
import path from 'path';
import React from 'react';
import { useNavigate } from "react-router-dom";


interface SidebarProps {
  onOpenCreate: () => void;
}
const navItems = [
  { id: 'home', label: 'Home', icon: 'home', active: true, path:'/home' },
  { id: 'explore', label: 'Explore', icon: 'explore', path:'/explorer'},
  { id: 'reels', label: 'Reels', icon: 'movie', path:'/reels' },
  { id: 'messages', label: 'Messages', icon: 'chat_bubble', path:'/messenger' },
  { id: 'create', label: 'Create', icon: 'add_box', isAction: true, path:'/create' },
  { id: 'profile', label: 'Profile', icon: 'account_circle', path: '/profile' },
];



const Sidebar: React.FC<SidebarProps> = ({ onOpenCreate }) => {
  const navigate = useNavigate();

  return (
    
    <aside className="hidden md:flex w-64 profile-glass-sidebar fixed h-screen left-0 top-0 flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
          <div className="size-9 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]">
          <span className="material-symbols-outlined text-black font-bold text-xl">bolt</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tighter">ZENERGY</h1>
      </div>

      <nav className="flex-1 flex flex-col gap-2 ">
        {navItems.map((item) => (
        <button
  key={item.id}
  
 onClick={() => {
  if (item.id === "profile") {
    const currentUser = auth.currentUser;
    if (currentUser) {
navigate(`/profile/${auth.currentUser?.uid}`);
    }
  } else if (item.path) {
    navigate(item.path);
  }
}}
            className="flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group"
>
            <span className={`material-symbols-outlined text-[24px] ${item.active ? 'fill-1' : ''}`}>
              {item.icon === 'movie' ? 'movie' : item.icon}
            </span>
            <span className={`text-[15px] ${item.active ? 'font-bold' : 'font-medium'}`}>
              {item.id === 'reels' ? 'Reels' : item.label}
            </span>
          </button>
        ))}
      </nav>

  

      <div className="mt-auto pt-6 border-t border-white/5">
        <button 
        onClick={()=> navigate("/settings")}
        className="flex items-center gap-4 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.03] transition-all w-full">
          <span className="material-symbols-outlined text-[24px]">settings</span>
          <span className="text-[15px] font-medium">Settings</span>
        </button>
      </div>

      
    </aside>
  );
};

export default Sidebar;
