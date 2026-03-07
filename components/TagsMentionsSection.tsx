import React from 'react';
import { AtSign, CheckSquare } from 'lucide-react';

interface TagsMentionsSectionProps {
  allowTags: boolean;
  reviewTags: boolean;
  onAllowTagsChange: (allow: boolean) => void;
  onReviewTagsChange: (review: boolean) => void;
}

export const TagsMentionsSection: React.FC<TagsMentionsSectionProps> = ({
  allowTags,
  reviewTags,
  onAllowTagsChange,
  onReviewTagsChange,
}) => {
  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
        Tags & Mentions
      </h3>
      <div className="space-y-3">
        {/* Allow Tags */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
          <div className="flex items-start gap-4">
            <div className="rounded-lg p-2 text-zinc-500">
              <AtSign size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Allow tags</h4>
              <p className="mt-1 text-xs text-zinc-500">
                Allow people to tag you in their posts.
              </p>
            </div>
          </div>
          <button
            onClick={() => onAllowTagsChange(!allowTags)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              allowTags ? 'bg-cyan-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                allowTags ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Review Tags */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700">
          <div className="flex items-start gap-4">
            <div className="rounded-lg p-2 text-zinc-500">
              <CheckSquare size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Review tags manually</h4>
              <p className="mt-1 text-xs text-zinc-500">
                Manually approve tags before they appear on profile.
              </p>
            </div>
          </div>
          <button
            onClick={() => onReviewTagsChange(!reviewTags)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              reviewTags ? 'bg-cyan-500' : 'bg-zinc-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                reviewTags ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
