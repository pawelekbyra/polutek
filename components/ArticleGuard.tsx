"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, KeyRound, ShieldAlert } from 'lucide-react';
import { sha256 } from '@/lib/utils';
import { ARTICLES } from '@/lib/data';

interface ArticleGuardProps {
  children: React.ReactNode;
  articleId: string;
}

const RedactedLine = ({ width }: { width: string }) => (
  <span
    className="inline-block bg-stone-900 h-4 rounded-sm mx-1 align-middle"
    style={{ width }}
  />
);

export default function ArticleGuard({ children, articleId }: ArticleGuardProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const article = ARTICLES.find(a => a.id === articleId);

  useEffect(() => {
    const unlocked = localStorage.getItem(`unlocked_${articleId}`);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    setIsChecking(false);
  }, [articleId]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article) return;

    const hash = await sha256(password);
    if (article.passwordHash.includes(hash)) {
      localStorage.setItem(`unlocked_${articleId}`, 'true');
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isChecking) return <div className="min-h-screen bg-stone-50" />;

  if (isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-serif flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white border-2 border-stone-900 shadow-[8px_8px_0px_0px_rgba(28,25,23,1)] p-8 md:p-12 relative overflow-hidden">
        {/* Background Texture/Stamps */}
        <div className="absolute top-4 right-4 opacity-10 rotate-12 select-none pointer-events-none">
          <ShieldAlert size={120} className="text-stone-900" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-stone-900 text-stone-50 p-3 rounded-sm">
              <Lock size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-stone-900 leading-none">
                Top Secret / Redacted
              </h1>
              <p className="text-stone-500 font-mono text-xs mt-1 uppercase tracking-widest">
                Classification: Restricted Access
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-stone-800 leading-relaxed">
              Dostęp do tego dokumentu został ograniczony na mocy postanowienia <RedactedLine width="80px" /> o ochronie danych wrażliwych.
              Treść zawiera <RedactedLine width="120px" /> oraz informacje niejawne dotyczące <RedactedLine width="60px" />.
            </p>
            <p className="text-stone-800 leading-relaxed">
              W celu odblokowania akt wprowadź autoryzowany klucz dostępu. <RedactedLine width="150px" /> <RedactedLine width="40px" />
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 mb-2">
                Authentication Key
              </label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className="w-full bg-stone-100 border-b-2 border-stone-300 focus:border-stone-900 py-4 pl-12 pr-4 font-mono text-lg outline-none transition-all placeholder:text-stone-300"
                  placeholder="********"
                  autoFocus
                />
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-700 font-mono text-xs mt-2 font-bold uppercase"
                  >
                    Błąd autoryzacji: Niepoprawny klucz.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-stone-50 font-bold uppercase tracking-[0.2em] py-4 hover:bg-stone-800 transition-colors shadow-lg active:translate-y-0.5"
            >
              Odblokuj Akta
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-stone-200 text-center">
            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-loose">
              Security Protocol v4.2 // SHA-256 Client-Side Auth // Digital Noir Investigative System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
