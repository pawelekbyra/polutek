"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import PasswordProtect from './components/PasswordProtect';
import ElixirArticle from './ElixirArticle';
import StypulkowskaArticle from './StypulkowskaArticle';
import ChmurkaArticle from './ChmurkaArticle';
import NewsFeed from './NewsFeed';

export default function Home() {
  const [unlockedArticle, setUnlockedArticle] = useState<string | null>(null);
  const [isNewsMode, setIsNewsMode] = useState(false);

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
            className="fixed top-6 left-6 z-50 bg-violet-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 hover:bg-violet-700 transition-all font-sans text-sm font-black uppercase tracking-widest active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3]" /> Wróć
          </button>
          {component}
        </>
      );
    }
    return component;
  };

  if (unlockedArticle === 'elixir') {
    return renderArticle(<ElixirArticle />);
  }

  if (unlockedArticle === 'stypulkowska') {
    return renderArticle(<StypulkowskaArticle />);
  }

  if (unlockedArticle === 'chmurka') {
    return renderArticle(<ChmurkaArticle />);
  }

  return <PasswordProtect onUnlock={handleUnlock} />;
}
