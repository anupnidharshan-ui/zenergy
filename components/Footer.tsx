
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] pointer-events-none">
      <div className="mb-4 md:mb-0">© 2024 Zenergy Collective • Secure Entry</div>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          <span>Global Latency: 24ms</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"></span>
          <span>Uptime: 99.9%</span>
        </div>
      </div>
    </footer>
  );
};
