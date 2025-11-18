"use client";

import React, { useState } from 'react';
import { useCommentSection } from '../../hooks/useCommentSection';
import { useTranslation } from '@/context/LanguageContext';
import { Send } from 'lucide-react';

const CommentForm = () => {
  const { createComment, submittingComment } = useCommentSection();
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !submittingComment) {
      createComment({ content: text, mentions: [] });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('addCommentPlaceholder')}
        className="flex-1 bg-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
        rows={1}
      />
      <button
        type="submit"
        disabled={!text.trim() || submittingComment}
        className="p-2 rounded-full bg-pink-500 text-white disabled:bg-zinc-600"
        aria-label={t('sendButton')}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default CommentForm;
