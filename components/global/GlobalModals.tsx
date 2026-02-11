"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import CommentsModal from './comments/CommentsModal';
import TippingModal from './tipping/TippingModal';
import LoginForm from '@/components/LoginForm';
import AccountPanel from '@/components/AccountPanel';
import AuthorProfileModal from '@/components/AuthorProfileModal';
import PatronProfileModal from '@/components/PatronProfileModal';
import AdminModal from '@/components/AdminModal';
import InfoModal from '@/components/InfoModal';

const GlobalModals = () => {
  const {
    activeModal,
    setActiveModal,
    activeContentId,
    isAuthorProfileModalOpen,
    closeAuthorProfileModal,
    activeAuthorId,
    isPatronProfileModalOpen,
    closePatronProfileModal,
    activePatronId,
    isAdminModalOpen,
    closeAdminModal,
    isTippingModalOpen,
    closeTippingModal,
    activeSlide
  } = useStore();

  return (
    <>
      <CommentsModal
        isOpen={activeModal === 'comments'}
        onClose={() => setActiveModal(null)}
        contentId={activeContentId || activeSlide?.id || null}
        initialCommentsCount={activeSlide?.initialComments || 0}
      />

      {activeModal === 'login' && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
           <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-sm border border-neutral-700 mx-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-white mb-4 text-center">Zaloguj się</h2>
              <LoginForm onLoginSuccess={() => setActiveModal(null)} />
              <button onClick={() => setActiveModal(null)} className="w-full text-neutral-500 text-sm hover:text-white transition-colors mt-2">Zamknij</button>
           </div>
        </div>
      )}

      {activeModal === 'account' && (
        <AccountPanel onClose={() => setActiveModal(null)} />
      )}

      {isAuthorProfileModalOpen && activeAuthorId && (
        <AuthorProfileModal
          onClose={closeAuthorProfileModal}
          authorId={activeAuthorId}
        />
      )}

      {isPatronProfileModalOpen && activePatronId && (
        <PatronProfileModal
          onClose={closePatronProfileModal}
          patronId={activePatronId}
        />
      )}

      {isAdminModalOpen && (
        <AdminModal />
      )}

      {activeModal === 'info' && (
        <InfoModal isOpen={true} onClose={() => setActiveModal(null)} />
      )}

      <TippingModal />
    </>
  );
};

export default GlobalModals;
