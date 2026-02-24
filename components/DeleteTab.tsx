"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { deleteAccount } from '@/lib/actions';

interface DeleteTabProps {
  onClose?: () => void;
}

const DeleteTab: React.FC<DeleteTabProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const DELETE_CONFIRM_TEXT = t('deleteAccountConfirmText');

  const [confirmation, setConfirmation] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { logout } = useUser();

  const handleDeleteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (confirmation.trim() !== DELETE_CONFIRM_TEXT) {
      addToast(t('deleteAccountConfirmError'), 'error');
      return;
    }

    setIsSaving(true);

    const formData = new FormData();
    formData.append('confirm_text', confirmation);

    try {
      const result = await deleteAccount(null, formData);

      if (result.success) {
        addToast(result.message || 'Twoje konto zostało usunięte. Zostałeś wylogowany.', 'success');
        setTimeout(() => {
          logout();
          if (onClose) onClose();
        }, 2000);
      } else {
        throw new Error(result.message || t('deleteAccountError'));
      }
    } catch (error: any) {
      addToast(error.message, 'error');
      setIsSaving(false);
    }
  };

  return (
    <div className="tab-pane active p-6" id="delete-tab">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
        <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-gray-900 tracking-tight">
            <span className="w-2 h-8 bg-red-500 rounded-full"></span>
            {t('deleteAccountTitle')}
        </h3>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8">
          <h4 className="text-red-600 font-black mb-3 text-base flex items-center gap-2 uppercase tracking-wider">
              ⚠️ {t('warningTitle') || 'UWAGA'}
          </h4>
          <p className="text-red-500 font-bold text-sm leading-relaxed">
            {t('deleteAccountWarning')}
          </p>
        </div>

        <form id="deleteForm" onSubmit={handleDeleteSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 leading-relaxed">
                {t('deleteAccountPrompt')} <strong className="text-gray-900">{DELETE_CONFIRM_TEXT}</strong>
            </label>
            <Input
              type="text"
              placeholder={DELETE_CONFIRM_TEXT}
              id="deleteConfirmation"
              name="confirm_text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all shadow-sm"
            />
            <p className="text-xs text-gray-400 font-medium mt-2 ml-1 leading-relaxed">
              {t('deleteAccountInfo')}
            </p>
          </div>

          <div className="pt-4">
              <Button
                type="submit"
                variant="destructive"
                className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-200 active:scale-[0.98] transition-all disabled:opacity-50"
                disabled={confirmation !== DELETE_CONFIRM_TEXT || isSaving}
              >
                {isSaving ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
                {isSaving ? t('deleting') : t('deleteAccountButton')}
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteTab;
