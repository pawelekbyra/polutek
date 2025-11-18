'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import { X } from 'lucide-react';
import { Notification } from '@/lib/db';
import Image from 'next/image';
import TimeAgo from 'react-timeago';

const NotificationsPanel = () => {
  const { activeModal, setActiveModal } = useStore(
    (state) => ({
      activeModal: state.activeModal,
      setActiveModal: state.setActiveModal,
    }),
    shallow
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeModal === 'notifications') {
      const fetchNotifications = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/notifications');
          const data = await res.json();
          if (data.success) {
            setNotifications(data.notifications);
          }
        } catch (error) {
          console.error('Failed to fetch notifications', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchNotifications();
    }
  }, [activeModal]);

  const isOpen = activeModal === 'notifications';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 text-white z-50 shadow-lg border-l border-neutral-800"
        >
          <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-4 border-b border-neutral-800">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-neutral-800">
                <X size={20} />
              </button>
            </header>
            <main className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-neutral-400">No notifications yet.</div>
              ) : (
                <ul className="divide-y divide-neutral-800">
                  {notifications.map((notification) => (
                    <li key={notification.id} className={`p-4 flex items-start gap-4 ${!notification.read ? 'bg-neutral-800/50' : ''}`}>
                      <Image src={notification.actor.avatar || '/default-avatar.png'} alt={notification.actor.displayName} width={40} height={40} className="rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-bold">{notification.actor.displayName}</span> {notification.text}
                        </p>
                        <TimeAgo date={notification.createdAt} className="text-xs text-neutral-400" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
