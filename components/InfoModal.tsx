"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const { login } = useUser(); // Dodanie hooka useUser
    const { addToast } = useToast(); // Dodanie hooka useToast

    const handleShowTipJar = async () => {
        const bmcButton = document.querySelector('#bmc-wbtn') as HTMLElement;
        if (bmcButton) {
            bmcButton.click();
        }

        // Poniższa logika jest konceptualna i powinna być wywołana przez webhooka płatności.
        // Dla celów demonstracyjnych, udajemy, że płatność się powiodła.
        setTimeout(async () => {
            const mockEmail = 'patron@example.com';
            const mockPassword = 'password123';

            try {
                // Poniżej znajduje się koncepcyjne wywołanie API, które powinno stworzyć konto
                const res = await fetch('/api/create-patron', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: mockEmail, password: mockPassword }),
                });
                const data = await res.json();
                if (data.success) {
                    addToast(`Twoje konto zostało utworzone! Login: ${mockEmail}`, 'success');
                    await login({ email: mockEmail, password: mockPassword });
                    onClose(); // Close modal on success
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Błąd tworzenia konta po wpłacie:', error);
                addToast('Wystąpił błąd podczas tworzenia konta.', 'error');
                onClose(); // Close modal on error
            }
        }, 3000);
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content bg-white text-gray-900 rounded-[2.5rem] max-w-md w-full max-h-[80vh] flex flex-col border border-gray-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-shrink-0 flex items-center justify-between p-8 border-b border-gray-50">
              <h2 id="infoTitle" className="text-2xl font-black tracking-tight">
                {t('infoModalTitle') || 'Informacje'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-full transition-all"
                aria-label={t('closeInfoAriaLabel') || 'Close information'}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body flex-1 overflow-y-auto p-8 space-y-6 text-[15px] font-medium text-gray-500 leading-relaxed">
              <p>{t('infoModalBodyP1') || 'Witaj w ekosystemie Polutek OS.'}</p>
              <p>{t('infoModalBodyP2') || 'To miejsce prywatnych badań i narzędzi nowej generacji.'}</p>
              <div className="tip-cta bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mx-auto mb-4">
                    <Coffee size={32} />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-6">
                  {t('infoModalBodyTip') || 'Podoba Ci się projekt? Postaw kawę!'}
                </p>
                <button onClick={handleShowTipJar} className="w-full bg-violet-600 text-white px-6 py-4 rounded-2xl text-base font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-95">
                  {t('tipText') || 'Wesprzyj projekt'}
                </button>
              </div>
              <p>{t('infoModalBodyP3') || 'Dziękujemy za bycie częścią społeczności.'}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
