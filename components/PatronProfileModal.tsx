'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';
import UserBadge from './UserBadge';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthorProfile } from '@/lib/queries';

interface PatronProfileModalProps {
    patronId: string;
    onClose: () => void;
}

export function PatronProfileModal({ patronId, onClose }: PatronProfileModalProps) {
    const { data: profile, isLoading, isError } = useQuery({
        queryKey: ['author', patronId],
        queryFn: () => fetchAuthorProfile(patronId),
        enabled: !!patronId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[10100] flex items-center justify-center bg-gray-900/40 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative flex flex-col w-full max-w-sm bg-white text-gray-900 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-gray-100 mx-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                    <header className="relative flex items-center justify-center p-6 border-b border-gray-50 shrink-0">
                        <h2 className="text-xl font-black tracking-tight">Profil Użytkownika</h2>
                        <button onClick={onClose} className="absolute p-2 right-4 top-4 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-full transition-all">
                            <X size={20} />
                        </button>
                    </header>

                    <main className="p-8">
                        {isLoading ? (
                            <PatronProfileSkeleton />
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4 text-red-500 font-bold">
                                <p>Nie udało się załadować profilu.</p>
                            </div>
                        ) : profile ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-32 h-32 mb-6 rounded-[2rem] shadow-xl overflow-hidden border-4 border-gray-50">
                                    <Image
                                      src={profile.avatarUrl || DEFAULT_AVATAR_URL}
                                      alt={profile.username}
                                      fill
                                      className="object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-gray-900 mb-1">{profile.username}</h3>
                                <UserBadge role={profile.role} className="mb-4 scale-110" />
                                {profile.bio ? (
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed mt-2">{profile.bio}</p>
                                ) : (
                                    <p className="text-gray-300 text-sm italic font-medium">Brak opisu.</p>
                                )}
                            </div>
                        ) : null}
                    </main>
                </motion.div>
        </motion.div>
    );
}

const PatronProfileSkeleton = () => (
    <div className="flex flex-col items-center">
        <Skeleton className="w-24 h-24 rounded-full mb-4" />
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-4 w-60" />
    </div>
)
