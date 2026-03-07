import React from 'react';
import { Send, ChevronDown } from 'lucide-react';

export type MessagePermission = 'everyone' | 'followers' | 'no_one';

interface MessagingPermissionsSectionProps {
  messagePermission: MessagePermission;
  onChange: (permission: MessagePermission) => void;
}

export const MessagingPermissionsSection: React.FC<MessagingPermissionsSectionProps> = ({
  messagePermission,
  onChange,
}) => {
  const options: { value: MessagePermission; label: string }[] = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'followers', label: 'Followers' },
    { value: 'no_one', label: 'No one' },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Messaging Permissions
      </h3>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
          <Send size={18} />
        </div>
        <select
          value={messagePermission}
          onChange={(e) => onChange(e.target.value as MessagePermission)}
          className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-900/50 py-4 pl-12 pr-12 text-sm text-white focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-zinc-900 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <ChevronDown size={18} />
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        Choose who is allowed to send you direct messages.
      </p>
    </section>
  );
};
