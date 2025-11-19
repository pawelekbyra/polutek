"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useState } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', username: '', displayName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatronSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/create-patron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        addToast('Account created! Check your email to set your password.', 'success');
        onClose();
        // Here you might trigger the actual payment flow
      } else {
        setFormError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content bg-black/80 backdrop-blur-md text-white rounded-xl max-w-md w-full max-h-[80vh] flex flex-col border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-white/10">
              <h2 id="infoTitle" className="text-lg font-semibold">
                {t('infoModalTitle') || 'Information'}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
                aria-label={t('closeInfoAriaLabel') || 'Close information'}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body flex-1 overflow-y-auto p-6 space-y-4 text-sm text-white/80">
              <p>{t('infoModalBodyP1') || 'Lorem ipsum dolor sit amet...'}</p>
              <p>{t('infoModalBodyP2') || 'Ut in nulla enim...'}</p>
              <div className="tip-cta bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Coffee className="mx-auto text-pink-500 w-10 h-10 mb-2" />
                <p className="text-sm">
                  {t('infoModalBodyTip') || 'Enjoying the app? Leave a tip...'}
                </p>
                {!showForm ? (
                  <button onClick={() => setShowForm(true)} className="mt-3 bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-600">
                    {t('tipText') || 'Become a Patron'}
                  </button>
                ) : (
                  <form onSubmit={handlePatronSubmit} className="mt-4 space-y-3 text-left">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    <input type="text" name="displayName" value={formData.displayName} onChange={handleInputChange} placeholder="Display Name" required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    {formError && <p className="text-red-500 text-xs text-center">{formError}</p>}
                    <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50">
                      {isLoading ? 'Creating Account...' : 'Create Account & Tip'}
                    </button>
                  </form>
                )}
              </div>
              <p>{t('infoModalBodyP3') || 'Donec id elit non mi porta...'}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
