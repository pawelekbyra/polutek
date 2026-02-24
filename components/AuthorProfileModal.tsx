'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronLeft, Instagram, Grid, Heart, Lock, Loader2, Youtube, Facebook } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';
import UserBadge from './UserBadge';
import { fetchAuthorProfile } from '@/lib/queries';
import { AuthorProfile } from '@/types';
import { formatCount, cn } from '@/lib/utils';
import { SafeLock } from './SafeLock';
import { useUser } from '@/context/UserContext';

// Simple TikTok Icon SVG Component
const TiktokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

interface AuthorProfileModalProps {
    authorId: string;
    onClose: () => void;
}

export function AuthorProfileModal({ authorId, onClose }: AuthorProfileModalProps) {
    const { jumpToSlide, openTippingModal, closeAuthorProfileModal } = useStore();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<'videos' | 'liked' | 'private'>('videos');

    const { data: profile, isLoading, isError } = useQuery<AuthorProfile>({
        queryKey: ['author', authorId],
        queryFn: () => fetchAuthorProfile(authorId),
        enabled: !!authorId,
        placeholderData: (previousData) => previousData, // Optimization: keep previous data while fetching
    });

    const { data: patronData } = useQuery({
        queryKey: ['patron', authorId],
        queryFn: async () => {
             // Mock fetch or real endpoint if exists.
             // If no endpoint, we default to false.
             return { isPatron: false };
        },
        enabled: !!user && !!authorId,
        initialData: { isPatron: false }
    });

    const isPatron = !!user;

    // Mock stats generation based on authorId (deterministic for specific user, random otherwise)
    const stats = useMemo(() => {
        if (!profile) return { followers: 0, likes: 0 };
        // Use authorId chars to seed a pseudo-random number
        const seed = authorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return {
            followers: 10 + (seed * 123) % 1000, // Mock "Patrons" count
            likes: 5000 + (seed * 456) % 5000000
        };
    }, [profile, authorId]);

    const handleSlideClick = (slideId: string) => {
        jumpToSlide(slideId);
        onClose();
    };

    const togglePatron = () => {
        if (isPatron) return; // Do nothing if already patron
        onClose();
        openTippingModal({ fromLeft: false }); // Slide from right
    };

    if (!authorId) return null;

    // Requirement: Author Avatar = White border.
    const avatarBorderColor = 'border-white';

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="absolute inset-0 z-[70] bg-white flex flex-col overflow-hidden"
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">

                {/* Top Bar - Remains Black per user requirement for Topbar */}
                <div
                    className="flex items-center justify-between px-1 bg-[#09090b] text-white border-b border-white/5 z-10 relative"
                    style={{
                      height: 'var(--topbar-height)',
                      paddingTop: 'var(--safe-area-top)',
                    }}
                >
                    <div className="flex justify-start w-12">
                        <button onClick={onClose} className="p-2 -ml-2 text-white hover:text-white transition-colors">
                            <ChevronLeft size={28} />
                        </button>
                    </div>
                    <div className="flex justify-center flex-1">
                        <span className="font-bold text-base truncate max-w-[200px] text-white tracking-tight">
                            {profile?.username || '...'}
                        </span>
                    </div>
                    <div className="w-12" />
                </div>
                {isLoading && !profile ? (
                    <div className="flex-1 flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4 text-gray-400">
                        <p className="font-bold">Nie udało się załadować profilu.</p>
                        <button onClick={onClose} className="text-violet-600 font-bold underline">Zamknij</button>
                    </div>
                ) : profile ? (
                    <div className="pb-20">
                        {/* Profile Header */}
                        <div className="flex flex-col items-center pt-8 px-6">
                            {/* Avatar */}
                            <div className="relative mb-4">
                                <Image
                                    src={profile.avatarUrl || DEFAULT_AVATAR_URL}
                                    alt={profile.username}
                                    width={120}
                                    height={120}
                                    className={cn("rounded-[2.5rem] object-cover w-32 h-32 border-4 border-gray-50 shadow-xl", "border-violet-100")}
                                />
                                <div className="absolute -bottom-2 -right-2">
                                     <UserBadge role={profile.role} />
                                </div>
                            </div>

                            {/* Name */}
                            <h1 className={cn("text-2xl font-black mb-1 tracking-tight text-gray-900")}>
                                {profile.username}
                            </h1>

                            {/* Bio (Description) */}
                            {profile.bio ? (
                                <p className="text-[14px] text-center text-gray-500 font-medium whitespace-pre-wrap mb-6 px-4 leading-relaxed max-w-sm">
                                    {profile.bio}
                                </p>
                            ) : (
                                <p className="text-sm text-center text-gray-300 mb-6 italic">Brak opisu</p>
                            )}

                            {/* Stats */}
                            <div className="flex items-center gap-8 mb-8 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                                <div className="flex flex-col items-center">
                                    <span className="font-black text-gray-900 text-lg">{formatCount(profile.slides.length)}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Filmów</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex flex-col items-center">
                                    <span className="font-black text-gray-900 text-lg">{formatCount(stats.followers)}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Patronów</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex flex-col items-center">
                                    <span className="font-black text-gray-900 text-lg">{formatCount(stats.likes)}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Polubień</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 w-full max-w-md mb-8">
                                <button
                                    onClick={togglePatron}
                                    disabled={isPatron}
                                    className={`flex-grow py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 px-6 shadow-lg active:scale-95
                                        ${isPatron
                                            ? 'bg-emerald-500 text-white shadow-emerald-100'
                                            : 'bg-violet-600 text-white shadow-violet-200 hover:bg-violet-700'
                                        }`}
                                >
                                    {isPatron ? (
                                        <>Jesteś Patronem</>
                                    ) : (
                                        <>Zostań Patronem</>
                                    )}
                                </button>
                                <button className="p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 text-gray-600 transition-all flex items-center justify-center min-w-[56px] shadow-sm active:scale-90">
                                    <Instagram size={24} />
                                </button>
                                <button className="p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 text-gray-600 transition-all flex items-center justify-center min-w-[56px] shadow-sm active:scale-90">
                                    <TiktokIcon size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-50 mt-2 sticky top-0 bg-white/80 backdrop-blur-xl z-10" style={{ top: 0 }}>
                            <button
                                onClick={() => setActiveTab('videos')}
                                className={`flex-1 flex justify-center items-center py-4 relative transition-all ${activeTab === 'videos' ? 'text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Grid size={24} strokeWidth={2.5} />
                                {activeTab === 'videos' && (
                                    <motion.div layoutId="activeTabProfile" className="absolute bottom-0 w-8 h-1 bg-violet-600 rounded-full" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('liked')}
                                className={`flex-1 flex justify-center items-center py-4 relative transition-all ${activeTab === 'liked' ? 'text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Heart size={24} strokeWidth={2.5} />
                                {activeTab === 'liked' && (
                                    <motion.div layoutId="activeTabProfile" className="absolute bottom-0 w-8 h-1 bg-violet-600 rounded-full" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('private')}
                                className={`flex-1 flex justify-center items-center py-4 relative transition-all ${activeTab === 'private' ? 'text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <Lock size={24} strokeWidth={2.5} />
                                {activeTab === 'private' && (
                                    <motion.div layoutId="activeTabProfile" className="absolute bottom-0 w-8 h-1 bg-violet-600 rounded-full" />
                                )}
                            </button>
                        </div>

                        {/* Content Grid */}
                        <div className="min-h-[300px]">
                            {activeTab === 'videos' ? (
                                <div className="grid grid-cols-3 gap-[1px]">
                                    {profile.slides && profile.slides.length > 0 ? profile.slides.map(slide => (
                                        <div
                                            key={slide.id}
                                            className="aspect-[3/4] bg-neutral-800 relative cursor-pointer overflow-hidden group"
                                            onClick={() => handleSlideClick(slide.id)}
                                        >
                                            <Image
                                                src={slide.thumbnailUrl || 'https://placehold.co/600x800/222/FFF?text=Video'}
                                                alt={slide.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 33vw, 150px"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                            <div className="absolute bottom-1 left-1 flex items-center gap-1 text-white drop-shadow-md">
                                                <div className="flex items-center gap-1">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                    <span className="text-[10px] font-bold">
                                                        {formatCount(Math.floor(Math.random() * 50000))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="col-span-3 py-20 flex flex-col items-center text-white/40">
                                            <p className="text-sm">Użytkownik nie dodał jeszcze żadnych filmów.</p>
                                        </div>
                                    )}
                                </div>
                            ) : activeTab === 'liked' ? (
                                <div className="flex flex-col items-center justify-center min-h-[300px] text-white/40 space-y-2 py-10">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                        <Heart size={32} />
                                    </div>
                                    <h3 className="font-bold text-white">Polubione filmy tego użytkownika są prywatne</h3>
                                    <p className="text-xs text-center px-8">Filmy polubione przez użytkownika @{profile.username} są widoczne tylko dla niego.</p>
                                </div>
                            ) : (
                                <SafeLock />
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </motion.div>
    );
}
