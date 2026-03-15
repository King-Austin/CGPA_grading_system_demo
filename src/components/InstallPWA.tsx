import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Smartphone, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsStandalone(true);
    }

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      toast.success('Professional app installed successfully!');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', () => { });
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('Installing Scoring Scribe...');
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      toast.info(
        "To Install: Tap the 'Share' icon and choose 'Add to Home Screen'.",
        { duration: 5000 }
      );
    } else {
      toast.info('Install via your browser menu (Add to home screen).');
    }
  };

  if (isStandalone) return null;

  return (
    <div className="w-full group px-1">
      <Button
        onClick={handleInstallClick}
        variant="default"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm font-bold py-5 rounded-lg transition-all flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-md shadow-inner">
            <Smartphone className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-xs">Install </span>
            <span className="text-[9px] opacity-70 font-normal mt-0.5">Fast, offline-ready academic tool</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 opacity-60 hover:opacity-100 transition-opacity" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[180px] text-[10px] bg-card text-card-foreground border-border">
                Turns this site into a real app on your home screen or desktop.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Download className="h-4 w-4" />
        </div>
      </Button>
    </div>
  );
};

export default InstallPWA;
