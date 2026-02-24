"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Film, Mail, Loader2 } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useStore } from '@/store/useStore';
import { createUserByAdmin } from '@/lib/admin-actions';
import { cn } from '@/lib/utils';
import UserManagementTable from './UserManagementTable';

export default function AdminModal() {
    const { isAdminModalOpen, closeAdminModal } = useStore();
    const { t } = useTranslation();
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState<'users' | 'slides'>('users');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isAdminModalOpen) return null;

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        try {
            const result = await createUserByAdmin(email);
            if (result.success) {
                addToast(result.message || 'Użytkownik utworzony pomyślnie. Email wysłany.', 'success');
                setEmail('');
            } else {
                addToast(result.message || 'Wystąpił błąd.', 'error');
            }
        } catch (error: any) {
            addToast(error.message || 'Wystąpił błąd.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="absolute inset-0 z-[10300] flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="flex flex-col items-center justify-center p-8 border-b border-gray-50 relative">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-4 shadow-sm">
                        <Users size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Panel Administratora</h2>
                    <p className="text-gray-400 font-medium mt-1">Zarządzaj ekosystemem Polutek OS</p>
                    <button
                        onClick={closeAdminModal}
                        className="absolute right-6 top-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-2 bg-gray-50 mx-8 mt-6 rounded-2xl gap-1">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                            activeTab === 'users'
                                ? "bg-white text-violet-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <Users size={18} />
                        Użytkownicy
                    </button>
                    <button
                        onClick={() => setActiveTab('slides')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                            activeTab === 'slides'
                                ? "bg-white text-violet-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        <Film size={18} />
                        Slajdy
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 pt-6">
                    {activeTab === 'users' && (
                        <div className="space-y-10">
                            <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Dodaj nowego użytkownika</h3>
                                <p className="text-sm text-gray-500 font-medium mb-6">
                                    System wyśle zaproszenie z tymczasowym hasłem na podany adres email.
                                </p>
                                <form onSubmit={handleCreateUser} className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Adres email użytkownika"
                                                className="w-full bg-white border-2 border-gray-100 rounded-2xl pl-12 pr-4 py-4 text-gray-900 font-medium placeholder:text-gray-300 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all shadow-sm"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !email}
                                        className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Przetwarzanie...
                                            </>
                                        ) : (
                                            <>
                                                <span>Utwórz użytkownika</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* User Management List */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-violet-600 rounded-full" />
                                    Baza Użytkowników
                                </h3>
                                <UserManagementTable />
                            </div>
                        </div>
                    )}

                    {activeTab === 'slides' && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 space-y-4">
                            <div className="p-6 bg-gray-50 rounded-full">
                                <Film size={48} strokeWidth={1.5} className="text-gray-300" />
                            </div>
                            <p className="font-bold tracking-tight">Zarządzanie slajdami - wkrótce</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
