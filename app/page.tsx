"use client";

import React, { useState } from 'react';
import PasswordProtect from './components/PasswordProtect';
import ElixirArticle from './ElixirArticle';
import StypulkowskaArticle from './StypulkowskaArticle';
import ChmurkaArticle from './ChmurkaArticle';

export default function Home() {
  const [unlockedArticle, setUnlockedArticle] = useState<string | null>(null);

  if (unlockedArticle === 'elixir') {
    return <ElixirArticle />;
  }

  if (unlockedArticle === 'stypulkowska') {
    return <StypulkowskaArticle />;
  }

  if (unlockedArticle === 'chmurka') {
    return <ChmurkaArticle />;
  }

  return <PasswordProtect onUnlock={setUnlockedArticle} />;
}
