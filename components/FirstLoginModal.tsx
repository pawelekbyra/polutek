'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ToggleSwitch from './ui/ToggleSwitch';
import { useTranslation } from '@/context/LanguageContext';

type FormData = {
    emailConsent: boolean;
    emailLanguage: 'pl' | 'en';
    firstName: string;
    lastName: string;
    newPassword: string;
    confirmPassword: string;
};

interface StepProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FirstLoginModal = () => {
    const { user, checkUserStatus } = useUser();
    const { addToast } = useToast();
    const { t, setLanguage, lang } = useTranslation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        emailConsent: true,
        emailLanguage: lang,
        firstName: '',
        lastName: '',
        newPassword: '',
        confirmPassword: '',
    });

    const isVisible = user && !user.is_profile_complete;

    const handleNext = () => {
        if (step === 2 && (!formData.firstName || !formData.lastName)) {
            addToast(t('firstNameLastNameRequired'), 'error');
            return;
        }
        setStep(p => p + 1);
    }
    const handlePrev = () => setStep(p => p - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
    };

    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            addToast(t('passwordsDoNotMatch'), 'error');
            return;
        }
        if (formData.newPassword.length < 8) {
            addToast(t('passwordMinLength'), 'error');
            return;
        }

        try {
            const res = await fetch('/api/profile/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, isProfileComplete: true }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.error);

            addToast(t('profileUpdateSuccess'), 'success');
            await checkUserStatus();
        } catch (error: any) {
            addToast(error.message, 'error');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative flex flex-col w-full max-w-md bg-neutral-900 text-white rounded-2xl shadow-lg border border-neutral-700 mx-4"
            >
                <header className="p-4 border-b border-neutral-800">
                    <h2 className="text-lg font-semibold text-center">{t('completeProfileTitle')}</h2>
                </header>
                <main className="p-6">
                    {step === 1 && <Step1 formData={formData} setFormData={setFormData} handleChange={handleChange} />}
                    {step === 2 && <Step2 formData={formData} setFormData={setFormData} handleChange={handleChange} />}
                    {step === 3 && <Step3 formData={formData} setFormData={setFormData} handleChange={handleChange} />}
                </main>
                <footer className="p-4 flex justify-between border-t border-neutral-800">
                    <Button onClick={handlePrev} disabled={step === 1}>
                        {t('prevStep')}
                    </Button>
                    {step < 3 ? (
                        <Button onClick={handleNext}>
                            {t('nextStep')}
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            {t('finish')}
                        </Button>
                    )}
                </footer>
            </motion.div>
        </div>
    );
};

const Step1 = ({ formData, setFormData }: Partial<StepProps>) => {
    const { t, setLanguage, lang } = useTranslation();
    if (!setFormData || !formData) return null;
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
              <label className="form-label text-sm">{t('emailConsent')}</label>
              <ToggleSwitch isActive={formData.emailConsent} onToggle={() => setFormData(p => ({ ...p, emailConsent: !p.emailConsent }))} />
            </div>
            <div className="form-group">
                <label className="form-label text-sm font-medium mb-2 block">{t('emailLanguage')}</label>
                <div className="flex gap-2">
                    <Button type="button" variant={lang === 'pl' ? 'secondary' : 'outline'} onClick={() => setLanguage('pl')} className="flex-1">{t('polish')}</Button>
                    <Button type="button" variant={lang === 'en' ? 'secondary' : 'outline'} onClick={() => setLanguage('en')} className="flex-1">{t('english')}</Button>
                </div>
            </div>
        </div>
    );
};

const Step2 = ({ formData, handleChange }: Partial<StepProps>) => {
    const { t } = useTranslation();
    if (!handleChange || !formData) return null;
    return (
        <div className="space-y-4">
            <Input name="firstName" placeholder={t('firstNamePlaceholder')} value={formData.firstName} onChange={handleChange} />
            <Input name="lastName" placeholder={t('lastNamePlaceholder')} value={formData.lastName} onChange={handleChange} />
        </div>
    );
};

const Step3 = ({ formData, handleChange }: Partial<StepProps>) => {
    const { t } = useTranslation();
    if (!handleChange || !formData) return null;
    return (
        <div className="space-y-4">
            <Input name="newPassword" type="password" placeholder={t('newPasswordPlaceholder')} value={formData.newPassword} onChange={handleChange} />
            <Input name="confirmPassword" type="password" placeholder={t('confirmPasswordPlaceholder')} value={formData.confirmPassword} onChange={handleChange} />
        </div>
    );
};

export default FirstLoginModal;
