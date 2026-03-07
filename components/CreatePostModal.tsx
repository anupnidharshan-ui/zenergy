
import React, { useState } from 'react';
import { VibeType } from '../types';
import { VIBES } from '../constants';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVibe: VibeType;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, initialVibe }) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeType>(initialVibe);
  const [caption, setCaption] = useState('');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl transition-all duration-500">
      <div className="relative w-full max-w-4xl glass-morphism rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-[600px] border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* Left Side: Media Upload */}
        <div className="w-full md:w-1/2 bg-white/5 border-r border-white/10 flex flex-col items-center justify-center p-12 text-center group cursor-pointer relative">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          <div className="size-24 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center mb-6 group-hover:border-zenergy-accent transition-colors group-hover:scale-110 duration-500">
            <span className="material-symbols-outlined text-5xl text-white/30 group-hover:text-zenergy-accent transition-colors">upload_file</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Initialize Upload</h3>
          <p className="text-white/40 text-sm max-w-[200px]">Drag and drop your visual frequency here</p>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">Phase 02: Details</h2>
            <button onClick={onClose} className="size-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-6 flex-grow">
            {/* Vibe Selection */}
            <div>
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-4">Set Vibe Tone</label>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(VIBES) as VibeType[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVibe(v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedVibe === v 
                      ? 'bg-zenergy-accent text-black border-zenergy-accent shadow-[0_0_15px_rgba(0,212,255,0.4)]' 
                      : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{VIBES[v].icon}</span>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-4">Frequency Signal (Caption)</label>
              <textarea 
                placeholder="What's the signal today?..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-zenergy-accent focus:border-zenergy-accent min-h-[120px] outline-none transition-all placeholder:text-white/20"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="w-full py-4 bg-zenergy-accent text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,212,255,0.3)] mt-6"
            onClick={onClose}
          >
            Deploy Signal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
