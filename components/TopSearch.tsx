
import React, { useState, useEffect } from 'react';
import { getVibeSuggestions } from '../services/geminiService';

interface TopSearchProps {
  onSearch: (q: string) => void;
}

export const TopSearch: React.FC<TopSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length > 2) {
        const results = await getVibeSuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(query);
      setIsTyping(false);
    }
  };

  return (
    <div className="sticky top-0 z-40 pb-8 pt-6">
      <div className="max-w-4xl mx-auto relative">
        <div className={`explorer-glass-search flex items-center px-6 py-3 rounded-2xl gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all ${isTyping ? 'ring-2 ring-primary/40' : ''}`}>
          <span className="material-symbols-outlined text-white/40">search</span>
          <input
            className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder-white/30 focus:ring-0"
            placeholder="Search vibes, creators, or tracks..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setTimeout(() => setIsTyping(false), 200)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-primary px-2 py-0.5 border border-primary/30 rounded bg-primary/5">⌘ K</span>
          </div>
        </div>

        {isTyping && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 glass-search rounded-2xl border border-white/10 shadow-2xl z-50">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 px-2">Related Vibes</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(s);
                    onSearch(s);
                    setIsTyping(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors text-xs font-medium border border-white/5 hover:border-primary/30"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
