import React from 'react';
import { Info, Loader2 } from 'lucide-react';

interface SaveActionsSectionProps {
  loading: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export const SaveActionsSection: React.FC<SaveActionsSectionProps> = ({
  loading,
  onSave,
  onDiscard,
}) => {
  return (
    <div className="flex flex-col gap-6 pt-6 border-t border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 max-w-md">
        <div className="mt-0.5 text-zinc-500">
          <Info size={16} />
        </div>
        <p className="text-xs text-zinc-500 leading-relaxed">
          Your privacy is our priority. Settings update instantly. Some changes may take a few minutes to reflect across all devices.
        </p>
      </div>
      
      <div className="flex items-center gap-4 justify-end">
        <button
          onClick={onDiscard}
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Discard
        </button>
        <button
          onClick={onSave}
          disabled={loading}
          className="relative flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-semibold text-black bg-cyan-400 rounded-xl hover:bg-cyan-300 active:scale-95 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
};
