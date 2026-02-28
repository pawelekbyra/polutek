import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MenuIcon from '@/components/icons/MenuIcon';
import BellIcon from '@/components/icons/BellIcon';
import { useUser } from '@/context/UserContext';
import { usePathname } from 'next/navigation';
import NotificationPopup from './NotificationPopup';
import { cn } from '@/lib/utils';

export interface TopBarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  className?: string;
}

export default function TopBar({ toggleSidebar, isSidebarOpen, className }: TopBarProps) {
  // Safe useUser call to prevent crashes in layouts where UserProvider is missing
  let userContext = null;
  try {
    userContext = useUser();
  } catch (e) {
    // Fail silently, context is likely missing in this layout
  }

  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    if (pathname === '/') return 'Strona Główna';
    if (pathname === '/admin') return 'Panel Administratora';
    if (pathname === '/admin/users') return 'Użytkownicy';
    if (pathname === '/admin/slides') return 'Slajdy';
    if (pathname === '/setup') return 'Konfiguracja Profilu';
    return 'Strona Główna';
  };

  return (
    <header className={cn("sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-white/10 safe-top", className)}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-foreground hover:bg-white/10 shrink-0"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>

        <h1 className="text-lg font-semibold truncate pr-2">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-white/10"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon className="w-6 h-6" />
          </Button>

          {showNotifications && (
            <NotificationPopup
              isOpen={true}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
