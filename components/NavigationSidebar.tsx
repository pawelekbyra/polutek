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
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      ref={sidebarRef}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
          <X size={20} />
        </button>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
          onClick={onClose}
        >
          <Home size={20} />
          <span>{t('home') || 'Strona główna'}</span>
        </Link>

        <Link
          href="/tingtong"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
          onClick={onClose}
        >
          <span className="text-xl">🎵</span>
          <span>TingTong</span>
        </Link>

        {user ? (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={onClose}
            >
              <User size={20} />
              <span>{t('profile') || 'Profil'}</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
              onClick={onClose}
            >
              <Settings size={20} />
              <span>{t('settings') || 'Ustawienia'}</span>
            </Link>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-destructive/10 text-destructive transition-colors mt-auto"
            >
              <LogOut size={20} />
              <span>{t('logout') || 'Wyloguj'}</span>
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
            onClick={onClose}
          >
            <User size={20} />
            <span>{t('login') || 'Zaloguj się'}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
