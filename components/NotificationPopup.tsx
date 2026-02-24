import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Mail, User, Tag, ChevronDown, Loader2, Heart, MessageSquare, UserPlus, Info, Trash, Rocket } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type NotificationType = 'like' | 'comment' | 'follow' | 'message' | 'system' | 'welcome';

interface Notification {
  id: string;
  type: NotificationType;
  preview: string;
  time: string;
  full: string;
  unread: boolean;
  expanded?: boolean;
  user: {
    displayName: string;
    avatar: string;
    role?: string;
  } | null;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  like: <Heart size={20} className="text-red-500 fill-current" />,
  comment: <MessageSquare size={20} className="text-violet-600" />,
  follow: <UserPlus size={20} className="text-violet-600" />,
  message: <Mail size={20} className="text-violet-600" />,
  system: <Info size={20} className="text-blue-500" />,
  welcome: <Rocket size={20} className="text-orange-500" />,
};

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ notification, onMarkAsRead, onDelete }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);

    if (newIsExpanded && notification.unread) {
      onMarkAsRead(notification.id);
    }
  };

  const getFullText = () => {
      if (notification.full && !notification.full.includes(' ')) {
          return t(notification.full, { name: notification.user?.displayName || 'System' });
      }
      return notification.full || notification.preview;
  }

  // Determine avatar border color based on role (similar to CommentsModal)
  const isPatron = notification.user?.role === 'patron';
  const isAuthor = notification.user?.role === 'author';

  let avatarBorderClass = 'border-white/80'; // Default
  if (isPatron) avatarBorderClass = 'border-yellow-500';
  else if (isAuthor) avatarBorderClass = 'border-purple-600';

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`rounded-2xl cursor-pointer transition-all hover:bg-gray-50 mb-2 border border-transparent ${isExpanded ? 'bg-gray-50 border-gray-100 shadow-sm' : ''}`}
    >
      <div className="flex items-start gap-4 p-4">
        <div onClick={handleToggle} className="flex-shrink-0">
            {notification.type === 'system' || notification.type === 'welcome' ? (
            <div className="w-12 h-12 rounded-2xl mt-1 bg-violet-100 flex items-center justify-center text-violet-600 shadow-sm">
                {iconMap[notification.type] || iconMap['system']}
            </div>
            ) : (
            <Image
                src={notification.user?.avatar || '/default-avatar.png'}
                alt={t('userAvatar', { user: notification.user?.displayName || 'User' })}
                width={48}
                height={48}
                className={cn("w-12 h-12 rounded-2xl mt-1 object-cover border-2 shadow-sm", avatarBorderClass)}
            />
            )}
        </div>

        <div className="flex-1 flex flex-col" onClick={handleToggle}>
          <p className="text-[14px] leading-snug text-gray-900 font-medium">
            {notification.type !== 'system' && notification.type !== 'welcome' && <span className="font-black">{notification.user?.displayName}</span>} {notification.preview}
          </p>
          <span className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{notification.time}</span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          {notification.unread && <div className="w-2.5 h-2.5 bg-violet-600 rounded-full shadow-[0_0_8px_rgba(124,58,237,0.5)]" />}

          <div onClick={handleToggle} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
             <ChevronDown size={16} className={cn("text-gray-400 transition-transform duration-300", isExpanded && "rotate-180 text-gray-900")} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
                <div className="bg-white rounded-xl p-3 border border-gray-100 text-[13px] text-gray-600 font-medium leading-relaxed shadow-inner">
                   {getFullText()}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

// Sub-component for delete confirmation (Kept in code but unused in rendering loop)
const DeleteButton = ({ onDelete, t }: { onDelete: (e: any) => void, t: any }) => {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (confirming) {
      const timer = setTimeout(() => setConfirming(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [confirming]);

  if (confirming) {
     return (
        <motion.button
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500 hover:text-white transition-colors whitespace-nowrap"
            onClick={onDelete}
        >
            {t('confirm') || 'Potwierdź?'}
        </motion.button>
     );
  }

  return (
      <button
        onClick={(e) => { e.stopPropagation(); setConfirming(true); }}
        className="p-1 hover:text-red-500 text-white/40 transition-colors"
      >
        <Trash size={16} />
      </button>
  );
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useTranslation();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await fetch('/api/notifications');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: isOpen,
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
        await fetch('/api/notifications/mark-as-read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationId: id }),
        });
    },
    onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ['notifications'] });
        const previousData = queryClient.getQueryData(['notifications']);
        queryClient.setQueryData(['notifications'], (old: any) => {
            if (!old) return old;
            return {
                ...old,
                notifications: old.notifications.map((n: any) =>
                    n.id === id ? { ...n, unread: false } : n
                ),
                unreadCount: Math.max(0, (old.unreadCount || 0) - 1)
            };
        });
        return { previousData };
    },
    onError: (err, newTodo, context) => {
        queryClient.setQueryData(['notifications'], context?.previousData);
    },
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
        await fetch(`/api/notifications/${id}`, {
            method: 'DELETE',
        });
    },
    onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ['notifications'] });
        const previousData = queryClient.getQueryData(['notifications']);
        queryClient.setQueryData(['notifications'], (old: any) => {
            if (!old) return old;
            const notification = old.notifications.find((n: any) => n.id === id);
            const wasUnread = notification && !notification.read;
            return {
                ...old,
                notifications: old.notifications.filter((n: any) => n.id !== id),
                unreadCount: wasUnread ? Math.max(0, (old.unreadCount || 0) - 1) : old.unreadCount
            };
        });
        return { previousData };
    },
    onError: (err, id, context) => {
        queryClient.setQueryData(['notifications'], context?.previousData);
    },
    onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const notifications: Notification[] = data?.success ? data.notifications.map((n: any) => {
        const previewText = n.text || t(n.previewKey) || '';
        return {
            id: n.id,
            type: (n.type as NotificationType) || 'system',
            preview: previewText,
            time: formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: lang === 'pl' ? pl : undefined }),
            full: n.text || n.fullKey,
            unread: !n.read,
            user: n.fromUser ? {
                displayName: n.fromUser.displayName || 'User',
                avatar: n.fromUser.avatar || '/icons/icon-192x192.png',
                role: n.fromUser.role // Ensure role is passed if available in API response
            } : { displayName: 'System', avatar: '/icons/icon-192x192.png' },
        };
  }) : [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex-grow flex items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-white/40" />
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10 text-red-400 p-4">
          <p>{t('notificationsError')}</p>
        </div>
      );
    }
    if (notifications.length === 0) {
      return (
        <div className="p-4 text-center text-white/50 text-sm">
            Brak nowych powiadomień
        </div>
      );
    }
    return (
      <ul className="flex-grow p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {notifications.map((notif) => (
            <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={(id) => markReadMutation.mutate(id)}
                onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </AnimatePresence>
      </ul>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-[80] flex items-start justify-center bg-gray-900/40 backdrop-blur-sm pt-4 md:pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[400px] max-w-[calc(100vw-24px)] bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex justify-between items-center p-6 border-b border-gray-50 bg-gray-50/30">
              <h3 className="font-black text-lg tracking-tight text-gray-900">{t('notificationsTitle') || 'Powiadomienia'}</h3>
              <button onClick={onClose} className="p-2 bg-white text-gray-400 hover:text-gray-900 rounded-full shadow-sm transition-all active:scale-90">
                <X size={20} />
              </button>
            </div>
            <div className="p-2 bg-white">
                {renderContent()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup;
