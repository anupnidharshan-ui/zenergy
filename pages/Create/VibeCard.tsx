import React from 'react';
import * as LucideIcons from 'lucide-react';
import {Vibe} from '../../types';

interface VibeCardProps {
  vibe: Vibe;
  isSelected: boolean;
  onClick: () => void;
}

export const VibeCard: React.FC<VibeCardProps> = ({ vibe, isSelected, onClick }) => {
  const Icon = (LucideIcons as any)[vibe.icon];

  return (
    <div
      id={`vibe-${vibe.id}`}
      onClick={onClick}
      className={`
        p-4 rounded-2xl flex flex-col items-center text-center gap-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'bg-cyan-500/5 border border-cyan-400 shadow-[0_0_20px_rgba(0,212,255,0.2),inset_0_0_15px_rgba(0,212,255,0.1)]' 
          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
        }
      `}
    >
      {Icon && (
        <Icon 
          className={`size-6 ${isSelected ? 'text-cyan-400' : 'text-white/60'}`} 
        />
      )}
      <span className={`font-bold text-sm ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
        {vibe.label}
      </span>
      <span className={`text-[10px] uppercase tracking-wider leading-none ${isSelected ? 'text-cyan-400/60' : 'text-white/40'}`}>
        {vibe.sublabel}
      </span>
    </div>
  );
};
