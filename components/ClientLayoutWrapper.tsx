"use client";

import { useEffect } from "react";
import { Providers } from "@/components/Providers";
import AppLayout from "@/components/AppLayout";
import DesktopDeviceFrame from "@/components/layout/DesktopDeviceFrame";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(() => {
          console.log('Service Worker registered successfully.');
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  return (
    <Providers>
      <div className="hidden md:block">
        <DesktopDeviceFrame>
          <AppLayout>{children}</AppLayout>
        </DesktopDeviceFrame>
      </div>
      <div className="block md:hidden h-full w-full">
         <AppLayout>{children}</AppLayout>
      </div>
    </Providers>
  );
}
