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

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      console.log('PWA is ready to be installed via button');
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('Installing Scoring Scribe...');
        setDeferredPrompt(null);
      }
    } else {
      // Fallback for iOS or browsers that don't support beforeinstallprompt
      toast.info('To install: Tap the browser menu/share button and select "Add to Home Screen".');
    }
  };

  if (isStandalone) return null;

  return (
    <div className="w-full group">
      <Button
        onClick={handleInstallClick}
        className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 font-bold py-6 rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <div className="bg-primary/20 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
          <Smartphone className="h-5 w-5" />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm">Install App</span>
          <span className="text-[10px] opacity-80 font-normal">Fast offline access from home screen</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
           <TooltipProvider>
             <Tooltip>
               <TooltipTrigger asChild>
                 <Info className="h-4 w-4 opacity-40 hover:opacity-100 transition-opacity" />
               </TooltipTrigger>
               <TooltipContent className="max-w-[200px] text-[10px]">
                 Installing turns this site into an app that works without internet.
               </TooltipContent>
             </Tooltip>
           </TooltipProvider>
           <Download className="h-4 w-4 opacity-50" />
        </div>
      </Button>
    </div>
  );
};

export default InstallPWA;
