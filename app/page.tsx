"use client";

import React, { useState } from 'react';
import PasswordProtect from './components/PasswordProtect';
import ElixirArticle from './ElixirArticle';
import StypulkowskaArticle from './StypulkowskaArticle';

export default function Home() {
  const [unlockedArticle, setUnlockedArticle] = useState<string | null>(null);

  if (unlockedArticle === 'elixir') {
    return <ElixirArticle />;
  }

  if (unlockedArticle === 'stypulkowska') {
    return <StypulkowskaArticle />;
  }

  return <PasswordProtect onUnlock={setUnlockedArticle} />;
}
