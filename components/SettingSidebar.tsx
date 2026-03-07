
import React from 'react';

interface SettingSidebarProps {
  currentTab: "profile" | "security";
  onTabChange: (tab: "profile" | "security") => void;
}


const SettingSidebar: React.FC<SettingSidebarProps> = ({ currentTab }) => {
  const navItems = [
    { name: 'Home', icon: 'home' },
    { name: 'Explore', icon: 'explore' },
    { name: 'Reels', icon: 'movie' },
    { name: 'Messages', icon: 'chat_bubble' },
    { name: 'Create', icon: 'add_box' },
  ];

  return (
    <aside className="w-64 settings-glass-sidebar fixed h-screen left-0 top-0 flex flex-col p-6 z-40">
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer">
        <div className="size-9 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)]">
          <span className="material-symbols-outlined text-background-dark font-bold">bolt</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tighter">ZENERGY</h1>
      </div>
      
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center gap-4 p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <a 
          href="#" 
          className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
            currentTab ? 'bg-white/10 text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </a>
      </div>
    </aside>
  );
};

export default SettingSidebar;
