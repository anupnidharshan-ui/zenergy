import React from 'react';
import { Globe, Lock, CheckCircle2 } from 'lucide-react';

export type AccountType = 'public' | 'private';

interface AccountTypeSectionProps {
  accountType: AccountType;
  onChange: (type: AccountType) => void;
}

export const AccountTypeSection: React.FC<AccountTypeSectionProps> = ({ accountType, onChange }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Account Type
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => onChange('public')}
          className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
            accountType === 'public'
              ? 'border-cyan-500/50 bg-cyan-500/5 ring-1 ring-cyan-500/50'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className={`rounded-lg p-2 ${accountType === 'public' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <Globe size={20} />
          </div>
          <div className="flex-1 pr-8">
            <h4 className={`text-sm font-medium ${accountType === 'public' ? 'text-white' : 'text-zinc-300'}`}>
              Public
            </h4>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              Anyone can see your profile and posts.
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              accountType === 'public' ? 'border-cyan-500 bg-cyan-500' : 'border-zinc-700'
            }`}>
              {accountType === 'public' && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
        </button>

        <button
          onClick={() => onChange('private')}
          className={`relative flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
            accountType === 'private'
              ? 'border-cyan-500/50 bg-cyan-500/5 ring-1 ring-cyan-500/50'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className={`rounded-lg p-2 ${accountType === 'private' ? 'text-cyan-400' : 'text-zinc-500'}`}>
            <Lock size={20} />
          </div>
          <div className="flex-1 pr-8">
            <h4 className={`text-sm font-medium ${accountType === 'private' ? 'text-white' : 'text-zinc-300'}`}>
              Private
            </h4>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              Only followers can see your content.
            </p>
          </div>
          <div className="absolute right-4 top-4">
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              accountType === 'private' ? 'border-cyan-500 bg-cyan-500' : 'border-zinc-700'
            }`}>
              {accountType === 'private' && <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};
