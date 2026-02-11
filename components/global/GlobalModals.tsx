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
        <LoginForm isOpen={true} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'account' && (
        <AccountPanel isOpen={true} onClose={() => setActiveModal(null)} />
      )}

      {isAuthorProfileModalOpen && activeAuthorId && (
        <AuthorProfileModal
          isOpen={true}
          onClose={closeAuthorProfileModal}
          userId={activeAuthorId}
        />
      )}

      {isPatronProfileModalOpen && activePatronId && (
        <PatronProfileModal
          isOpen={true}
          onClose={closePatronProfileModal}
          userId={activePatronId}
        />
      )}

      {isAdminModalOpen && (
        <AdminModal isOpen={true} onClose={closeAdminModal} />
      )}

      {activeModal === 'info' && (
        <InfoModal isOpen={true} onClose={() => setActiveModal(null)} />
      )}

      <TippingModal />
    </>
  );
};

export default GlobalModals;
