"use client";

import React from 'react';
import CommentItem from './CommentItem';
import { useCommentSection } from '../../hooks/useCommentSection';
import CommentForm from './CommentForm';
import { useTranslation } from '@/context/LanguageContext';

const CommentSection = () => {
  const { comments, loading, hasMore, loadMore } = useCommentSection();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white">
      <header className="p-4 border-b border-zinc-700 text-center sticky top-0 bg-zinc-900 z-10">
        <h2 className="font-semibold">{t('commentsTitle', { count: comments.length.toString() })}</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 && !loading && (
          <p className="text-center text-zinc-400">{t('noCommentsYet')}</p>
        )}
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        {hasMore && (
          <button onClick={loadMore} disabled={loading} className="w-full text-center py-2 text-zinc-400 hover:text-white">
            {loading ? t('loading') : 'Load More'}
          </button>
        )}
      </div>

      <div className="p-4 border-t border-zinc-700 sticky bottom-0 bg-zinc-900">
        <CommentForm />
      </div>
    </div>
  );
};

export default CommentSection;
