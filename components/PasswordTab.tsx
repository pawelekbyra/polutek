"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { changePassword } from '@/lib/actions';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

const PasswordTab: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = newPassword === confirmPassword;
  const isValidLength = newPassword.length >= 6;
  const isFormValid = passwordsMatch && isValidLength && newPassword.length > 0;

  useEffect(() => {
      if (confirmPassword && !passwordsMatch) {
          setError(t('passwordsDoNotMatch') || 'Passwords do not match');
      } else if (newPassword && !isValidLength) {
          setError(t('passwordMinLength') || 'Password must be at least 6 characters');
      } else {
          setError(null);
      }
  }, [newPassword, confirmPassword, passwordsMatch, isValidLength, t]);

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;

    setIsSaving(true);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await changePassword(null, formData);

      if (result.success) {
        addToast(result.message || t('passwordChangeSuccess'), 'success');
        (event.target as HTMLFormElement).reset();
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(result.message || t('passwordChangeError'));
      }
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="tab-pane active p-6" id="password-tab">
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
        <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-gray-900 tracking-tight">
            <span className="w-2 h-8 bg-violet-600 rounded-full"></span>
            {t('changePasswordTitle')}
        </h3>
        <form id="passwordForm" onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('currentPasswordLabel')}</label>
            <Input
                type="password"
                name="currentPassword"
                placeholder={t('currentPasswordPlaceholder')}
                required
                autoComplete="current-password"
                className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('newPasswordLabel')}</label>
            <Input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('newPasswordPlaceholder')}
                required
                autoComplete="new-password"
                className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('confirmPasswordLabel')}</label>
            <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirmPasswordPlaceholder')}
                required
                autoComplete="new-password"
                className={cn(
                    "h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 transition-all focus:ring-4 focus:ring-violet-600/5",
                    confirmPassword && !passwordsMatch ? 'border-red-500 focus:border-red-600' : 'focus:border-violet-600'
                )}
            />
            {error && (
                <p className="text-xs text-red-500 font-bold mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
            {!error && (
                <p className="text-xs text-gray-400 font-bold mt-2 ml-1">
                  {t('passwordMinLength')}
                </p>
            )}
          </div>

          <div className="pt-4">
            <Button
                type="submit"
                className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-violet-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving || !isFormValid}
            >
                {isSaving ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
                {isSaving ? t('changingPassword') : t('changePasswordButton')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordTab;
