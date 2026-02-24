"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, Home, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';

interface NavigationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationSidebar({ isOpen, onClose }: NavigationSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      ref={sidebarRef}
    >
      <div className="flex flex-col p-8 border-b border-gray-50 bg-gray-50/30">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Eksploruj</h2>
            <button onClick={onClose} className="p-2 bg-white text-gray-400 hover:text-gray-900 rounded-full shadow-sm transition-all active:scale-90">
                <X size={20} />
            </button>
        </div>
        <p className="text-sm font-bold text-gray-400">Polutek OS Navigation</p>
      </div>

      <nav className="flex flex-col p-6 gap-3">
        <Link
          href="/"
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-violet-50 hover:text-violet-600 font-bold transition-all group"
          onClick={onClose}
        >
          <Home size={22} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
          <span>{t('home') || 'Strona główna'}</span>
        </Link>

        <Link
          href="/tingtong"
          className="flex items-center gap-4 p-4 rounded-2xl hover:bg-violet-50 hover:text-violet-600 font-bold transition-all group"
          onClick={onClose}
        >
          <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">🎵</span>
          <span>TingTong</span>
        </Link>

        <div className="h-px bg-gray-50 my-4 mx-4" />

        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-violet-50 hover:text-violet-600 font-bold transition-all group"
              onClick={onClose}
            >
              <User size={22} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
              <span>{t('profile') || 'Twój Profil'}</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-violet-50 hover:text-violet-600 font-bold transition-all group"
              onClick={onClose}
            >
              <Settings size={22} className="text-gray-400 group-hover:text-violet-600 transition-colors" />
              <span>{t('settings') || 'Ustawienia'}</span>
            </Link>

            <div className="mt-auto pt-8">
                <button
                onClick={() => {
                    logout();
                    onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 text-red-500 font-bold transition-all hover:bg-red-100 active:scale-95"
                >
                <LogOut size={22} />
                <span>{t('logout') || 'Wyloguj'}</span>
                </button>
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-4 p-4 rounded-2xl bg-violet-600 text-white font-bold transition-all hover:bg-violet-700 shadow-lg shadow-violet-200"
            onClick={onClose}
          >
            <User size={22} />
            <span>{t('login') || 'Zaloguj się'}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
