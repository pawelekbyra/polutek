"use client";

import React, { useState } from 'react';
import TopBar from './TopBar';
import NavigationSidebar from './NavigationSidebar';
import Preloader from './Preloader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground overflow-hidden">
      <Preloader />

      <TopBar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <NavigationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

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
