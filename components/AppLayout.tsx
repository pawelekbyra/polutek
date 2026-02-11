"use client";

import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar'; // Zakładam, że masz ten komponent
import Preloader from './Preloader'; // Zakładam, że masz ten komponent

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Dodajemy stan do zarządzania sidebar'em
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">
      <Preloader />

      {/* Przekazujemy wymagane propsy do TopBar */}
      <TopBar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar removed as it was incompatible with TikTok sidebar component */}

        <main
          className="flex-1 overflow-auto z-10 custom-scrollbar relative scroll-snap-y-mandatory w-full"
          data-scroll-container
        >
          {children}
        </main>
      </div>
    </div>
  );
}
