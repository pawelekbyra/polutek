"use client";

import React from 'react';
import { MessageSquareQuote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface LolekCommentaryProps {
  quote: string;
  context?: string;
}

export default function LolekCommentary({ quote, context }: LolekCommentaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-12 relative"
    >
      <div className="absolute -top-6 left-10 z-10">
        <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border-2 border-slate-900">
          <Sparkles className="w-3 h-3" /> Lolek&apos;s Hot Take
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border-4 border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <MessageSquareQuote className="w-32 h-32 text-blue-500" />
        </div>

        <div className="relative z-10">
          <p className="text-2xl md:text-3xl font-black text-white leading-tight mb-6 italic">
            &quot;{quote}&quot;
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-inner border border-blue-400/30">
              L
            </div>
            <div>
              <div className="text-white font-bold text-sm">Lolek</div>
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                {context || "Zuchwały Asystent AI"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute -bottom-4 -right-4 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500/20 blur-xl" />
        <div className="w-12 h-12 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>
    </motion.div>
  );
}
