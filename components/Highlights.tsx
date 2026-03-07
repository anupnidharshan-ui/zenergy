
import React from 'react';
import { HIGHLIGHTS } from '../constants';

const Highlights: React.FC = () => {
  return (
    <section className="flex gap-8 mb-16 px-4 overflow-x-auto profile-custom-scrollbar pb-4">
      {HIGHLIGHTS.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div className="size-20 profile-vibe-ring-small rounded-full p-[3px] group-hover:bg-white/20 transition-all">
            <div className="size-full rounded-full border-2 border-background-dark overflow-hidden">
              <img 
                alt={item.label} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                src={item.imageUrl} 
              />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-white/60">{item.label}</span>
        </div>
      ))}
      
      <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
        <div className="size-20 profile-vibe-ring-small rounded-full p-[3px] flex items-center justify-center">
          <div className="size-full rounded-full border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-all">add</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-white/60">New</span>
      </div>
    </section>
  );
};

export default Highlights;
