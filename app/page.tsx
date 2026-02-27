"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import ElixirArticle from './ElixirArticle';
import StypulkowskaArticle from './StypulkowskaArticle';
import ChmurkaArticle from './ChmurkaArticle';
import NewsFeed from './NewsFeed';

export default function Home() {
  const [unlockedArticle, setUnlockedArticle] = useState<string | null>(null);
  const [isNewsMode, setIsNewsMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hostname = window.location.hostname;
    const isEliksir = hostname === 'eliksir-wiedzmina.pl' || hostname === 'www.eliksir-wiedzmina.pl';
    const isVibeSubdomain = hostname.startsWith('vibecoding.');

    if (isEliksir) {
      setUnlockedArticle('elixir');
    } else if (isVibeSubdomain) {
      // Vibe subdomain doesn't use this route, it's handled by middleware and VibeGate
    }
    setIsLoading(false);
  }, []);

  const handleUnlock = (id: string) => {
    if (id === 'news') {
      setIsNewsMode(true);
      setUnlockedArticle('news');
    } else {
      setUnlockedArticle(id);
    }
  };

  const handleBackToNews = () => {
    setUnlockedArticle('news');
  };

  if (unlockedArticle === 'news') {
    return <NewsFeed onUnlock={setUnlockedArticle} />;
  }

  const renderArticle = (component: React.ReactNode) => {
    if (isNewsMode) {
      return (
        <>
          <button
            onClick={handleBackToNews}
            className="fixed top-4 left-4 z-50 bg-stone-900 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 hover:bg-stone-800 transition-colors font-sans text-sm font-bold uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" /> Powrót
          </button>
          {component}
        </>
      );
    }
    return component;
  };

  if (unlockedArticle === 'elixir') {
    return renderArticle(<ElixirArticle customHeaderDomain="www.eliksir-wiedzmina.pl" />);
  }

  if (unlockedArticle === 'stypulkowska') {
    return renderArticle(<StypulkowskaArticle />);
  }

  if (unlockedArticle === 'chmurka') {
    return renderArticle(<ChmurkaArticle />);
  }

  if (isLoading) return null;

  return <PasswordProtect onUnlock={handleUnlock} />;
}
