
import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-50 px-6 lg:px-12 py-8 flex items-center justify-between pointer-events-auto">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 text-[#00d4ff] transition-transform duration-500 group-hover:rotate-180">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-black tracking-tighter">ZENERGY</h2>
      </div>

      <nav className="hidden md:flex items-center gap-10">
        <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Features</a>
        <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Community</a>
        <a href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Support</a>
      </nav>
    </header>
  );
};
