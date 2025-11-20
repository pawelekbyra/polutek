"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ToggleSwitch from './ui/ToggleSwitch';
import { Crown, ChevronDown } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { updateUserProfile } from '@/lib/actions';

interface ProfileTabProps {
    onClose: () => void;
}

const initialState = {
  success: false,
  message: '',
};

const ProfileTab: React.FC<ProfileTabProps> = ({ onClose }) => {
  const { user: profile, checkUserStatus } = useUser();
  const { t, lang } = useTranslation();
  const { addToast } = useToast();

  // Form State
  const [state, formAction] = useFormState(updateUserProfile, initialState);

  // Local State
  const [emailConsent, setEmailConsent] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize local state from profile
  useEffect(() => {
      if (profile) {
          setEmailConsent(!!profile.emailConsent);
      }
  }, [profile]);

  // Handle Server Action Response
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        addToast(state.message, 'success');
        checkUserStatus();
      } else {
        addToast(state.message, 'error');
      }
    }
  }, [state, addToast, checkUserStatus]);

  const handleAvatarEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  if (!profile) {
    return <div className="p-5 text-center">{t('loadingProfile')}</div>;
  }

  const currentAvatar = previewUrl || profile.avatar;

  return (
    <div className="tab-pane active p-4" id="profile-tab">
      <form action={formAction} id="profileForm">

        {/* --- Avatar Section --- */}
        <div className="avatar-section bg-white/5 border border-white/10 rounded-xl p-5 mb-4 flex flex-col items-center text-center">
            <div className="relative w-20 h-20 mb-3">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/80 shadow-lg bg-gray-800 flex items-center justify-center">
                    {currentAvatar ? (
                        <Image
                          src={currentAvatar}
                          alt={t('avatarAlt')}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          id="userAvatar"
                          unoptimized={!!previewUrl}
                        />
                    ) : (
                        <span className="text-4xl text-gray-500">{profile.displayName?.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <button
                  type="button"
                  onClick={handleAvatarEditClick}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 bg-pink-600 border-2 border-[#2d2d2d] rounded-full text-white text-lg font-bold flex items-center justify-center shadow-md hover:bg-pink-500 transition-colors"
                  id="avatarEditBtn"
                  title={t('changeAvatarTitle')}
                >
                    +
                </button>
                <input
                    type="file"
                    name="avatar"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
            </div>
            <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg font-bold" id="displayName">{profile.displayName}</h3>
                <p className="text-sm text-white/60" id="userEmail">{profile.email}</p>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-md mt-1">
                    <Crown size={14} />
                    <span>{t('patronTier')}</span>
                </div>
            </div>
        </div>

        {/* --- Personal Data Section --- */}
        <div className="form-section bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h3 className="section-title text-lg font-bold mb-5 flex items-center gap-3">
            <span className="w-1 h-5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></span>
            {t('personalData')}
          </h3>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="form-group">
              <label className="form-label text-sm font-medium mb-2 block text-gray-300">{t('displayName') || 'Display Name'}</label>
              <Input
                type="text"
                name="displayName"
                defaultValue={profile.displayName || ''}
                placeholder={t('displayNamePlaceholder') || 'Your Name'}
                className="bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium mb-2 block text-gray-300">{t('email')}</label>
            <Input
              type="email"
              name="email"
              defaultValue={profile.email}
              placeholder={t('emailPlaceholder')}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* --- Settings Section --- */}
        <div className="settings-section bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
          <h3 className="section-title text-lg font-bold mb-5 flex items-center gap-3">
            <span className="w-1 h-5 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></span>
            {t('settings')}
          </h3>

          <div className="flex items-center justify-between mb-6">
            <label className="form-label text-sm text-gray-300">{t('emailConsent')}</label>
            <ToggleSwitch
                isActive={emailConsent}
                onToggle={() => setEmailConsent(p => !p)}
            />
            {/* Hidden input to submit the checkbox state via form */}
            <input type="hidden" name="emailConsent" value={emailConsent ? 'on' : 'off'} />
          </div>

          {/* Conditional Language Selector */}
          {emailConsent && (
              <div className="form-group mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="form-label text-sm font-medium mb-2 block text-gray-300">{t('emailLanguage')}</label>
                  <div className="relative">
                    <select
                        name="emailLanguage"
                        defaultValue={profile.emailLanguage || lang}
                        className="w-full bg-white/10 border border-white/10 rounded-md px-3 py-2 text-white appearance-none focus:outline-none focus:border-pink-500"
                    >
                        <option value="pl" className="bg-zinc-900">Polski</option>
                        <option value="en" className="bg-zinc-900">English</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" size={16} />
                  </div>
              </div>
          )}
        </div>

        <SaveButton t={t} />
      </form>
    </div>
  );
};

// Component for the submit button to handle pending state
function SaveButton({ t }: { t: any }) {
  const { pending } = useFormStatus();
  return (
    <Button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:scale-100"
        disabled={pending}
    >
      {pending ? t('saving') : t('saveChanges')}
    </Button>
  );
}

export default ProfileTab;
