"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ToggleSwitch from './ui/ToggleSwitch';
import { Crown, Pencil, Camera, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { updateUserProfile } from '@/lib/actions';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';
import CropModal from './CropModal';
import UserBadge from './UserBadge';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import StatusMessage from '@/components/ui/StatusMessage';

interface ProfileTabProps {
    onClose: () => void;
}

const initialState = {
  success: false,
  message: '',
  avatarUrl: undefined,
};

const ProfileTab: React.FC<ProfileTabProps> = ({ onClose }) => {
  const { user: profile, checkUserStatus, setUser } = useUser();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const { update } = useSession();

  // State for fields
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailLanguage, setEmailLanguage] = useState('pl');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isCropOpen, setIsCropOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);

  // Status message states
  const [avatarMessage, setAvatarMessage] = useState<{ type: 'success' | 'error', message: string, isVisible: boolean }>({ type: 'success', message: '', isVisible: false });
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', message: string, isVisible: boolean }>({ type: 'success', message: '', isVisible: false });

  // Initialize state from profile when available
  useEffect(() => {
    if (profile) {
      if (profile.emailConsent !== undefined) setEmailConsent(profile.emailConsent);
      if (profile.emailLanguage) setEmailLanguage(profile.emailLanguage);
    }
  }, [profile]);

  // useFormState hook for server action
  const [state, formAction] = useFormState(updateUserProfile, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<string>('');

  // Handle avatar message auto-hide
  useEffect(() => {
    if (avatarMessage.isVisible) {
      const timer = setTimeout(() => {
        setAvatarMessage(prev => ({ ...prev, isVisible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [avatarMessage.isVisible]);

  // Handle form message auto-hide
  useEffect(() => {
    if (formMessage.isVisible) {
      const timer = setTimeout(() => {
        setFormMessage(prev => ({ ...prev, isVisible: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [formMessage.isVisible]);

  // Handle state updates from server action
  useEffect(() => {
    if (state.message && state.message !== lastMessageRef.current) {
      lastMessageRef.current = state.message;

      // Update form message state instead of toast
      setFormMessage({
        type: state.success ? 'success' : 'error',
        message: state.message,
        isVisible: true
      });

      if (state.success) {
        if (state.avatarUrl) {
           setPreviewUrl(state.avatarUrl);
           if (profile) {
               setUser({ ...profile, avatar: state.avatarUrl });
           }
        }

        Promise.all([
          checkUserStatus(),
          update({ image: state.avatarUrl }),
        ]).catch(console.error);

        if (profile?.id) {
            queryClient.invalidateQueries({ queryKey: ['author', profile.id] });
        }
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
        queryClient.invalidateQueries({ queryKey: ['comments'] });
        queryClient.invalidateQueries({ queryKey: ['slides'] });
        if (profile?.id) {
            queryClient.invalidateQueries({ queryKey: ['patron', profile.id] });
        }
      }
    }
  }, [state, checkUserStatus, profile, queryClient, update, setUser]);

  const handleAvatarEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setIsCropOpen(true);
        }
      };
      reader.readAsDataURL(file);
      event.target.value = '';
    }
  };

  const handleCropSave = (croppedBlob: Blob | null) => {
    if (croppedBlob) {
      const file = new File([croppedBlob], 'avatar.png', { type: 'image/png' });
      setCroppedFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      // Trigger avatar success message
      setAvatarMessage({
        type: 'success',
        message: 'Avatar zaktualizowany',
        isVisible: true
      });
    }
    setIsCropOpen(false);
  };

  const handleSubmit = (formData: FormData) => {
    if (croppedFile) {
      formData.set('avatar', croppedFile);
    }
    lastMessageRef.current = '';
    formAction(formData);
  };

  if (!profile) {
    return <div className="p-10 text-center text-gray-400 font-bold tracking-tight">{t('loadingProfile')}</div>;
  }

  const currentAvatar = previewUrl || profile.avatar || DEFAULT_AVATAR_URL;

  return (
    <div className="tab-pane active p-6" id="profile-tab">
      <form action={handleSubmit} id="profileForm" className="space-y-6">

        {/* Avatar Section */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative w-32 h-32 mb-6 group cursor-pointer" onClick={handleAvatarEditClick}>
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center relative border-4 border-white">
                    <Image
                      src={currentAvatar}
                      alt={t('avatarAlt')}
                      width={128}
                      height={128}
                      className={`w-full h-full object-cover unoptimized`}
                      id="userAvatar"
                      unoptimized={!!previewUrl}
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                        <Camera className="text-white w-10 h-10" />
                    </div>
                </div>
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-violet-600 border-4 border-white rounded-2xl text-white flex items-center justify-center hover:bg-violet-700 transition-all shadow-xl active:scale-90"
                  title={t('changeAvatarTitle')}
                >
                   <Camera size={20} strokeWidth={2.5} />
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
                <h3 className="text-2xl font-black text-gray-900 tracking-tight" id="displayName">{profile.displayName}</h3>
                <UserBadge role={profile.role} className="mb-2 scale-110" />
                {(profile as any).bio && <p className="text-[14px] text-gray-500 font-medium max-w-[280px] text-center leading-relaxed">{(profile as any).bio}</p>}
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2" id="userEmail">{profile.email}</p>
            </div>

            {/* Avatar Section Feedback */}
            <StatusMessage
                type={avatarMessage.type}
                message={avatarMessage.message}
                isVisible={avatarMessage.isVisible}
                className="mt-4"
            />
        </div>

        {/* Combined Form Fields */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-black mb-8 flex items-center gap-4 text-gray-900 tracking-tight">
            <span className="w-2 h-8 bg-violet-600 rounded-full"></span>
            {t('accountSettings')}
          </h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('displayName') || 'Twoja Nazwa'}</label>
              <Input
                type="text"
                name="displayName"
                defaultValue={profile.displayName || ''}
                placeholder={t('displayNamePlaceholder') || 'Twoje Imię'}
                className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('bio') || 'O Tobie'}</label>
              <textarea
                name="bio"
                defaultValue={(profile as any).bio || ''}
                placeholder={t('bioPlaceholder') || 'Napisz coś o sobie...'}
                rows={3}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-900 placeholder:text-gray-300 font-bold focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('email')}</label>
              <Input
                type="email"
                name="email"
                defaultValue={profile.email}
                placeholder={t('emailPlaceholder')}
                className="h-14 bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-300 font-bold rounded-2xl px-4 focus:border-violet-600 focus:ring-4 focus:ring-violet-600/5 transition-all"
              />
            </div>

            <div className="pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-0.5">
                        <label className="text-sm font-black text-gray-900 tracking-tight">{t('emailConsent')}</label>
                        <span className="text-xs text-gray-400 font-medium">{t('emailConsentDesc') || 'Otrzymuj powiadomienia na e-mail'}</span>
                    </div>
                    <ToggleSwitch isActive={emailConsent} onToggle={() => setEmailConsent(p => !p)} />
                    <input type="hidden" name="emailConsent" value={emailConsent.toString()} />
                </div>

                {emailConsent && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                         <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{t('emailLanguage')}</label>
                         <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setEmailLanguage('pl')}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                                    emailLanguage === 'pl'
                                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-100"
                                    : "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200"
                                }`}
                            >
                                {t('polish')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEmailLanguage('en')}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                                    emailLanguage === 'en'
                                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-100"
                                    : "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200"
                                }`}
                            >
                                {t('english')}
                            </button>
                            <input type="hidden" name="emailLanguage" value={emailLanguage} />
                         </div>
                    </div>
                )}
            </div>
          </div>

          <div className="mt-6">
            <SaveButton t={t} />
          </div>

          {/* General Settings Feedback */}
          <div className="mt-4">
             <StatusMessage
                 type={formMessage.type}
                 message={formMessage.message}
                 isVisible={formMessage.isVisible}
             />
          </div>
        </div>
      </form>

      {isCropOpen && (
        <CropModal
          isOpen={isCropOpen}
          onClose={() => setIsCropOpen(false)}
          imageSrc={selectedImage}
          onCropComplete={handleCropSave}
        />
      )}
    </div>
  );
};

function SaveButton({ t }: { t: any }) {
  const { pending } = useFormStatus();
  return (
    <Button
        type="submit"
        className="w-full h-16 bg-violet-600 hover:bg-violet-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-violet-200 active:scale-[0.98] transition-all disabled:opacity-50"
        disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
            <Loader2 className="animate-spin h-6 w-6" />
            <span>{t('saving')}</span>
        </div>
      ) : t('saveChanges')}
    </Button>
  );
}

export default ProfileTab;
