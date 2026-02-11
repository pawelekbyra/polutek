import { StateCreator } from 'zustand';

export type ModalType = 'account' | 'comments' | 'info' | 'login' | 'tipping' | 'author' | 'patron' | 'admin' | 'notifications' | null;

export interface UISlice {
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  isAnyModalOpen: () => boolean;

  activeContentId: string | null;
  setActiveContentId: (contentId: string | null) => void;

  isAuthorProfileModalOpen: boolean;
  activeAuthorId: string | null;
  openAuthorProfileModal: (authorId: string) => void;
  closeAuthorProfileModal: () => void;

  isPatronProfileModalOpen: boolean;
  activePatronId: string | null;
  openPatronProfileModal: (patronId: string) => void;
  closePatronProfileModal: () => void;

  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;

  isTippingModalOpen: boolean;
  tippingModalOptions: { fromLeft?: boolean, contentId?: string };
  openTippingModal: (options?: { fromLeft?: boolean, contentId?: string }) => void;
  closeTippingModal: () => void;
}

export const createUISlice: StateCreator<UISlice> = (set, get) => ({
  activeModal: null,
  activeContentId: null,
  isAuthorProfileModalOpen: false,
  activeAuthorId: null,

  isPatronProfileModalOpen: false,
  activePatronId: null,

  isAdminModalOpen: false,

  isTippingModalOpen: false,
  tippingModalOptions: {},

  setActiveModal: (modal) => set({ activeModal: modal }),
  setActiveContentId: (contentId) => set({ activeContentId: contentId }),
  isAnyModalOpen: () => get().activeModal !== null,

  openAuthorProfileModal: (authorId) => set({ isAuthorProfileModalOpen: true, activeAuthorId: authorId }),
  closeAuthorProfileModal: () => set({ isAuthorProfileModalOpen: false, activeAuthorId: null }),

  openPatronProfileModal: (patronId) => set({ isPatronProfileModalOpen: true, activePatronId: patronId }),
  closePatronProfileModal: () => set({ isPatronProfileModalOpen: false, activePatronId: null }),

  openAdminModal: () => set({ isAdminModalOpen: true }),
  closeAdminModal: () => set({ isAdminModalOpen: false }),

  openTippingModal: (options = {}) => set({ isTippingModalOpen: true, tippingModalOptions: options }),
  closeTippingModal: () => set({ isTippingModalOpen: false, tippingModalOptions: {} }),
});
