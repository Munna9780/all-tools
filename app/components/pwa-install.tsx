'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, WifiOff } from 'lucide-react';

export function PWAInstall() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
      return;
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setIsInstallable(true);
    });

    // Listen for online/offline status
    window.addEventListener('online', () => setIsOffline(false));
    window.addEventListener('offline', () => setIsOffline(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  const handleInstall = async () => {
    if (!window.deferredPrompt) return;
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  if (!isInstallable && !isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      {isInstallable && (
        <Button
          onClick={handleInstall}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Install App
        </Button>
      )}
      
      {isOffline && (
        <Alert variant="destructive" className="w-[300px]">
          <WifiOff className="h-4 w-4" />
          <AlertTitle>You're offline</AlertTitle>
          <AlertDescription>
            Some features may be limited. Check your internet connection.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 