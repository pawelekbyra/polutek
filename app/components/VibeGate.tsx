"use client";

import React, { useState, useEffect } from 'react';
import PasswordProtect from './PasswordProtect';

export default function VibeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isUnlocked = localStorage.getItem('polutek_vibe_unlocked') === 'true';
    const hostname = window.location.hostname;
    const isVibeSubdomain = hostname.startsWith('vibecoding.');

    // Auto-unlock for specific conditions
    if (isUnlocked || isVibeSubdomain) {
      setUnlocked(true);
    } else {
      // For testing purposes or local dev, you might want to auto-unlock
      // if (hostname === 'localhost') setUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('polutek_vibe_unlocked', 'true');
    setUnlocked(true);
  };

  if (isLoading) return null;

  // Always show content to Search Engines even if locked for users (SEO purposes)
  // Note: True SSR/Bot detection usually happens on server,
  // but since this is a client-side gate, bots might still see the content
  // depending on how they execute JS.
  if (unlocked) {
    return <>{children}</>;
  }

  return <PasswordProtect onUnlock={handleUnlock} />;
}
