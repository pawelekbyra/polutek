"use client";

import React from 'react';
import Image from 'next/image';
import { Comment } from '@/lib/types';
import { useTranslation } from '@/context/LanguageContext';
import { Heart, MessageSquare } from 'lucide-react'; // Assuming lucide-react is used for icons

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start space-x-3">
      <Image
        src={comment.user.avatar || '/default-avatar.png'}
        alt={t('userAvatar', { user: comment.user.name })}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <p className="font-semibold text-sm">{comment.user.name}</p>
        <p className="text-white">{comment.content}</p>
        <div className="flex items-center space-x-4 mt-1 text-xs text-zinc-400">
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
          <button className="hover:text-white">{t('reply')}</button>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <button className="text-zinc-400 hover:text-red-500">
          <Heart size={20} />
        </button>
        <span className="text-xs">{comment.upvotes.length}</span>
      </div>
    </div>
  );
};

export default CommentItem;
