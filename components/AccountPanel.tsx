"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import ProfileTab from './ProfileTab';
import PasswordTab from './PasswordTab';
import DeleteTab from './DeleteTab';
import { useTranslation } from '@/context/LanguageContext';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AccountPanelProps {
  onClose: () => void;
}

type Tab = 'profile' | 'password' | 'delete';

const AccountPanel: React.FC<AccountPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const { t } = useTranslation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user logs out while this panel is open, close it automatically.
    if (!user) {
      onClose();
    }
  }, [user, onClose]);

  const handleTabClick = (tab: Tab) => {
      setActiveTab(tab);
  }

  const handlePublishClick = () => {
      router.push('/admin/slides');
  }

  const canPublish = user?.role === 'admin' || user?.role === 'author';

  return (
    <motion.div
      className="absolute inset-0 bg-gray-900/40 backdrop-blur-md z-[9999]"
      initial={{ opacity: 0, pointerEvents: 'none' }}
      animate={{ opacity: 1, pointerEvents: 'auto' }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      onClick={onClose} // Close on overlay click
    >
      <motion.div
        className="absolute top-0 left-0 h-full w-full max-w-md bg-white flex flex-col shadow-[32px_0_64px_-12px_rgba(0,0,0,0.14)]"
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the panel
      >
        {/* Top Bar - Remains Black per requirement */}
        <div
            className="relative flex-shrink-0 flex items-center justify-center bg-[#09090b] text-white border-b border-white/5 shadow-sm z-10"
            style={{ height: 'var(--topbar-height)', paddingTop: 'var(--safe-area-top)'}}
        >
          <div className="flex flex-col items-center gap-1">
             <h2 className="text-lg font-black tracking-tight">{t('account') || 'Konto'}</h2>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            aria-label={t('closeAccountAriaLabel')}
          >
              <X size={20} />
          </button>
        </div>

        {/* Tabs Header */}
        <div className="flex-shrink-0 flex bg-gray-50 border-b border-gray-100 p-2 gap-1">
          <button
            onClick={() => handleTabClick('profile')}
            aria-label={t('profileTab')}
            className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'profile' ? "bg-white text-violet-600 shadow-sm" : "text-gray-400 hover:text-gray-900"
            )}
          >
            {t('profileTab')}
          </button>
          <button
            onClick={() => handleTabClick('password')}
            aria-label={t('passwordTab')}
            className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'password' ? "bg-white text-violet-600 shadow-sm" : "text-gray-400 hover:text-gray-900"
            )}
          >
            {t('passwordTab')}
          </button>
          <button
            onClick={() => handleTabClick('delete')}
            aria-label={t('deleteTab')}
            className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl transition-all",
                activeTab === 'delete' ? "bg-white text-violet-600 shadow-sm" : "text-gray-400 hover:text-gray-900"
            )}
          >
            {t('deleteTab')}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
            {activeTab === 'profile' && <ProfileTab onClose={onClose} />}
            {activeTab === 'password' && <PasswordTab />}
            {activeTab === 'delete' && <DeleteTab onClose={onClose} />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountPanel;
