import React, { memo, useEffect } from 'react';
import Image from 'next/image';
import { Heart, MessageSquare, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Ably from 'ably';
import { ably } from '@/lib/ably-client';
import { useToast } from '@/context/ToastContext';
import { useTranslation } from '@/context/LanguageContext';
import { useStore } from '@/store/useStore';
import { formatCount } from '@/lib/utils';
import { shallow } from 'zustand/shallow';
import { useUser } from '@/context/UserContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  initialLikes: number;
  initialIsLiked: boolean;
  slideId: string;
  commentsCount: number;
  authorId: string;
  authorAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  initialLikes,
  initialIsLiked,
  slideId,
  commentsCount,
  authorId,
  authorAvatar,
}) => {
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { isLoggedIn, user: currentUser } = useUser();
  const {
    setActiveModal,
    toggleLike,
    likeChanges,
    commentCountChanges,
    openAuthorProfileModal,
    openTippingModal
  } = useStore(state => ({
    setActiveModal: state.setActiveModal,
    toggleLike: state.toggleLike,
    likeChanges: state.likeChanges,
    commentCountChanges: state.commentCountChanges,
    openAuthorProfileModal: state.openAuthorProfileModal,
    openTippingModal: state.openTippingModal
  }), shallow);

  const likeState = likeChanges[slideId];
  const currentCommentCount = commentCountChanges[slideId] ?? commentsCount;
  const [liveLikes, setLiveLikes] = React.useState(initialLikes);
  const currentLikes = likeState ? likeState.likes : liveLikes;
  const isLiked = likeState ? likeState.isLiked : initialIsLiked;

  // Optimistic update for author avatar if it's the current user
  const displayAvatar = (currentUser && currentUser.id === authorId) ? currentUser.avatar : authorAvatar;

  // Logic to hide the plus icon: if logged in (per user request: "bo tak jakby juz subskrajbuje")
  // or if currentUser is the author.
  const showPlusIcon = !isLoggedIn && (!currentUser || currentUser.id !== authorId);

  useEffect(() => {
    setLiveLikes(initialLikes);
    const channel = ably.channels.get(`likes:${slideId}`);

    const onLikeUpdate = (message: Ably.Message) => {
      setLiveLikes((message.data as { likeCount: number }).likeCount);
    };

    channel.subscribe('update', onLikeUpdate);

    return () => {
      channel.unsubscribe('update', onLikeUpdate);
    };
  }, [initialLikes, slideId]);

  const handleLike = () => {
    if (!isLoggedIn) {
      addToast(t('loginRequired') || 'Musisz się zalogować', 'locked');
      return;
    }
    toggleLike(slideId, initialLikes, initialIsLiked);
    addToast(isLiked ? (t('unlikedToast') || 'Unliked') : (t('likedToast') || 'Liked!'), 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('shareTitle') || 'Check out this video!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast(t('linkCopied') || 'Link copied to clipboard!', 'success');
    }
  };

  const handleOpenAuthorProfile = () => {
    // Trigger Author Profile
    if (authorId) {
      openAuthorProfileModal(authorId);
    }
  };

  // Shared styles
  const buttonClass = "flex flex-col items-center gap-[6px] justify-center cursor-pointer";
  const labelClass = "text-[11px] leading-[1.1] text-center font-bold text-gray-400 group-hover:text-violet-600 transition-colors uppercase tracking-tighter";
  const iconSize = 28;

  // Determine avatar border color
  const avatarBorderColor = 'border-white shadow-xl';

  return (
    <aside
      className="absolute right-2 flex flex-col items-center gap-[20px] z-20 pointer-events-auto bg-white/80 backdrop-blur-xl p-3 rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50"
      style={{
        top: 'calc((var(--app-height) - var(--topbar-height) - var(--bottombar-height)) / 2 + var(--topbar-height))',
        transform: 'translateY(-50%)',
      }}
    >
      {/* Avatar / Author Profile */}
      <div className="relative w-14 h-14 mb-1 group">
        <button
            onClick={handleOpenAuthorProfile}
            className={cn(
                "w-full h-full flex items-center justify-center text-white bg-gray-100 rounded-[1.25rem] overflow-hidden border-2 transition-transform active:scale-90",
                avatarBorderColor
            )}
        >
           {displayAvatar ? (
             <Image src={displayAvatar} alt="Author" width={56} height={56} className="w-full h-full object-cover" />
           ) : (
             <User size={32} className="text-gray-300" strokeWidth={1.5} />
           )}
        </button>
         {showPlusIcon && (
             <div
                className="absolute -right-1 -bottom-1 w-6 h-6 rounded-lg flex items-center justify-center text-white border-2 border-white pointer-events-none bg-violet-600 shadow-sm"
              >
                <Plus size={16} strokeWidth={4} />
              </div>
         )}
      </div>

      {/* Like */}
      <motion.button
        onClick={handleLike}
        className={cn(buttonClass, "group")}
        data-action="toggle-like"
        data-slide-id={slideId}
        whileTap={{ scale: 0.8 }}
      >
        <div className={cn("p-2 rounded-2xl transition-all", isLiked && isLoggedIn ? "bg-violet-50" : "bg-gray-50 group-hover:bg-violet-50")}>
            <Heart
            size={iconSize}
            strokeWidth={2.5}
            className={`transition-colors duration-200 ${(isLiked && isLoggedIn) ? 'fill-violet-600 stroke-violet-600' : 'fill-transparent stroke-gray-400 group-hover:stroke-violet-600'}`}
            />
        </div>
        <span className={cn(labelClass, isLiked && isLoggedIn && "text-violet-600")}>{formatCount(currentLikes)}</span>
      </motion.button>

      {/* Comments */}
      <motion.button
        data-testid="comments-button"
        data-action="open-comments-modal"
        onClick={() => setActiveModal('comments')}
        className={cn(buttonClass, "group")}
        whileTap={{ scale: 0.8 }}
      >
        <div className="p-2 rounded-2xl bg-gray-50 group-hover:bg-violet-50 transition-all">
            <MessageSquare size={iconSize} strokeWidth={2.5} className="stroke-gray-400 group-hover:stroke-violet-600 transition-colors"/>
        </div>
        <span className={labelClass}>{formatCount(currentCommentCount)}</span>
      </motion.button>

      {/* Share */}
      <motion.button onClick={handleShare} data-action="share" className={cn(buttonClass, "group")} whileTap={{ scale: 0.8 }}>
        <div className="p-2 rounded-2xl bg-gray-50 group-hover:bg-violet-50 transition-all">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width={iconSize} height={iconSize} className="stroke-gray-400 group-hover:stroke-violet-600 transition-colors">
                <polyline points="15 14 20 9 15 4"></polyline>
                <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
            </svg>
        </div>
        <span className={labelClass}>{t('shareText') || 'Share'}</span>
      </motion.button>

      {/* Tip Jar (Custom SVG) */}
      <motion.button onClick={() => openTippingModal()} data-action="show-tip-jar" className={cn(buttonClass, "group mt-2")} whileTap={{ scale: 0.8 }}>
        <div className="p-2 rounded-2xl bg-gray-50 group-hover:bg-violet-50 transition-all">
            <svg viewBox="0 0 24 24" className="stroke-gray-400 group-hover:stroke-violet-600 transition-colors" style={{ width: iconSize, height: iconSize }} fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="12" rx="2" ry="2" />
            <path d="M2 10h20" />
            <circle cx="18" cy="13" r="2" />
            </svg>
        </div>
        <span className={labelClass}>Tip</span>
      </motion.button>
    </aside>
  );
};

export default memo(Sidebar);
