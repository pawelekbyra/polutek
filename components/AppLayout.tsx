"use client";

import React, { useEffect } from 'react';
import TopBar from './TopBar';
import { useStore } from '@/store/useStore';
import { shallow } from 'zustand/shallow';
import TippingModal from './TippingModal';
import { AuthorProfileModal } from './AuthorProfileModal';
import GlobalVideoPlayer from './GlobalVideoPlayer';
import FirstLoginModal from './FirstLoginModal';
import NotificationsPanel from './NotificationsPanel'; // Import the new panel

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { activeModal, setActiveModal } = useStore(
    (state) => ({
      activeModal: state.activeModal,
      setActiveModal: state.setActiveModal,
    }),
    shallow
  );

  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', setAppHeight);
    setAppHeight();

    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  return (
    <div className="flex h-full flex-col relative">
      <TopBar />
      <div className="flex-1 md:bg-gray-100 md:flex md:justify-center">
        <main className="relative w-full h-full bg-white md:max-w-[400px] md:border md:shadow-lg overflow-hidden z-10">
          <GlobalVideoPlayer />
          {children}
        </main>
      </div>
      {/* Render modals based on activeModal state */}
      <TippingModal
        isOpen={activeModal === 'tip'}
        onClose={() => setActiveModal(null)}
      />
      <AuthorProfileModal />
      <FirstLoginModal />
      <NotificationsPanel /> {/* Add the new panel here */}
    </div>
  );
}
