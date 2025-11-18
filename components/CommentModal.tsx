"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommentSection from './comments/CommentSection';
import { useStore } from '@/store/useStore';
import { X } from 'lucide-react';

const CommentModal = () => {
  const { activeModal, setActiveModal } = useStore();
  const isOpen = activeModal === 'comments';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <motion.div
            className="w-full h-[80%] max-w-md bg-zinc-900 rounded-t-2xl"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-white"
              aria-label="Close comments"
            >
              <X size={24} />
            </button>
            <CommentSection />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommentModal;
