
import React from 'react';
import { VibeType } from '../types';
import { VIBES } from '../constants';

interface VibeSelectorProps {
  onSelect: (vibe: VibeType) => void;
  isLoading: boolean;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({ onSelect, isLoading }) => {
  const vibeKeys = Object.keys(VIBES) as VibeType[];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zenergy-background p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] animate-pulse-slow"></div>
      
      <div className="relative z-10 max-w-5xl w-full text-center">
        <div className="mb-12 animate-float">
          <div className="inline-flex items-center justify-center size-16 bg-zenergy-accent rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.4)] mb-6">
            <span className="material-symbols-outlined text-black text-4xl font-bold">bolt</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Welcome to <span className="text-zenergy-accent">ZENERGY</span>
          </h1>
          <p className="text-white/60 text-lg">Choose your current vibe to personalize your universe.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="size-12 border-4 border-zenergy-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white/40 font-medium animate-pulse">Syncing frequencies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {vibeKeys.map((key) => {
              const config = VIBES[key];
              return (
                <button
                  key={key}
                  onClick={() => onSelect(key)}
                  className={`group relative p-8 glass-morphism rounded-3xl transition-all duration-500 hover:scale-105 hover:bg-white/10 text-left overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className={`size-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${config.accentClass} bg-white/5`}>
                      <span className="material-symbols-outlined text-3xl">{config.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{config.label}</h3>
                    <p className="text-white/40 text-sm group-hover:text-white/60 transition-colors">{config.description}</p>
                  </div>
                  <div className={`absolute bottom-[-10px] right-[-10px] size-24 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} style={{ backgroundColor: config.color }}></div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VibeSelector;
