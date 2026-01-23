"use client";

import React from 'react';

export default function TopBar() {
  return (
    <div
      className="
        absolute top-0 left-0 right-0 z-20
        flex items-center justify-between
        h-16 px-4
        bg-gradient-to-b from-black/70 to-transparent
      "
    >
      <div className="text-3xl font-black tracking-widest text-white uppercase select-none">
        Polutek
      </div>
    </div>
  );
}
