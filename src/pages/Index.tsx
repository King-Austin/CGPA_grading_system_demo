import React, { useState, useEffect, useRef } from 'react';
import { Course } from '@/data/courses';
import YearCard from '@/components/YearCard';
import CGPACalculator from '@/components/CGPACalculator';
import DataExportImport from '@/components/DataExportImport';
import InstallPWA from '@/components/InstallPWA';
import StickyProgressBar from '@/components/StickyProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, RotateCcw, Share2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePrivy } from '@privy-io/react-auth';
import { toast } from 'sonner';
import { saveUserData, loadUserData } from '@/lib/cloudSync';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const LOCAL_STORAGE_KEY = 'gpaTrackerData';
const SAVE_DEBOUNCE_MS = 500;

interface SemesterData {
  [courseCode: string]: Course & { grade?: string };
}

interface AppData {
  [semesterKey: string]: SemesterData;
}

const Index = () => {
  const { login, logout, ready, authenticated, user } = usePrivy();
  const [semestersData, setSemestersData] = useState<AppData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try { return JSON.parse(savedData); } catch { /* ignore */ }
    }
    const initialData: AppData = {};
    for (let year = 1; year <= 5; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        initialData[`${year}-${semester}`] = {};
      }
    }
    return initialData;
  });

  const [stickyVisible, setStickyVisible] = useState(false);
  const [showSyncSignInDialog, setShowSyncSignInDialog] = useState(false);
  const [isStartingSignIn, setIsStartingSignIn] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const cloudSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cgpaCardRef = useRef<HTMLDivElement>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once it becomes visible, it stays visible for the rest of the scroll
        if (!entry.isIntersecting) {
          setStickyVisible(true);
        } else {
          setStickyVisible(false);
        }
      },
      { threshold: 0 }
    );
    if (cgpaCardRef.current) observer.observe(cgpaCardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // When user signs in, check for cloud data and offer to merge
    if (ready && authenticated && user && !autoSyncEnabled) {
      (async () => {
        try {
          const cloud = await loadUserData(user.id);
          if (cloud && JSON.stringify(cloud.data) !== JSON.stringify(semestersData)) {
            setShowMergeDialog(true);
          } else if (cloud) {
            setAutoSyncEnabled(true);
            toast.success('Cloud data loaded and matched local data.');
          } else {
            await saveUserData(user.id, semestersData);
            setAutoSyncEnabled(true);
            toast.success('Local data uploaded to cloud.');
          }
        } catch (err) {
          console.error(err);
          toast.error('Failed to load cloud data on signin.');
        }
      })();
    }
  }, [ready, authenticated, user, autoSyncEnabled]);

  useEffect(() => {
    // Debounce localStorage writes to avoid performance lag
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(semestersData));
    }, SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [semestersData]);

  const handleGradeChange = (year: number, semesterNum: number, courseCode: string, newGrade: string) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      return {
        ...prevData,
        [semesterKey]: {
          ...prevData[semesterKey],
          [courseCode]: { ...prevData[semesterKey][courseCode], grade: newGrade },
        },
      };
    });
  };

  useEffect(() => {
    if (!autoSyncEnabled || !user) return;
    if (cloudSaveTimerRef.current) clearTimeout(cloudSaveTimerRef.current);
    cloudSaveTimerRef.current = setTimeout(() => {
      saveUserData(user.id, semestersData).catch(() => {
        toast.error('Failed to auto-save to cloud.');
      });
    }, SAVE_DEBOUNCE_MS);
    return () => { if (cloudSaveTimerRef.current) clearTimeout(cloudSaveTimerRef.current); };
  }, [semestersData, autoSyncEnabled, user]);

  const handleAddCourse = (year: number, semesterNum: number, courseToAdd: Course) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      if (prevData[semesterKey]?.[courseToAdd.code]) return prevData;
      return {
        ...prevData,
        [semesterKey]: { ...prevData[semesterKey], [courseToAdd.code]: { ...courseToAdd, grade: '' } },
      };
    });
  };

  const handleRemoveCourse = (year: number, semesterNum: number, courseCode: string) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      const { [courseCode]: _, ...rest } = prevData[semesterKey];
      return { ...prevData, [semesterKey]: rest };
    });
  };

  // Cloud save / load handlers
  const saveToCloud = async () => {
    if (!user) return alert('Please sign in to save to cloud');
    try {
      await saveUserData(user.id, semestersData);
      alert('Saved to cloud');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Failed to save to cloud');
    }
  };

  const handleSync = async () => {
    if (!authenticated || !user) {
      setShowSyncSignInDialog(true);
      return;
    }

    try {
      const cloud = await loadUserData(user.id);
      if (!cloud) {
        // no cloud data: upload local
        await saveUserData(user.id, semestersData);
        alert('No cloud data found — uploaded local data to cloud.');
        return;
      }

      // If identical, nothing to do
      if (JSON.stringify(cloud.data) === JSON.stringify(semestersData)) {
        alert('Local and cloud data are already in sync.');
        return;
      }

      const replace = confirm('Cloud data found. OK = Replace local with cloud. Cancel = Upload local to cloud.');
      if (replace) {
        setSemestersData(cloud.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloud.data));
        alert('Local data replaced with cloud data.');
      } else {
        await saveUserData(user.id, semestersData);
        alert('Uploaded local data to cloud.');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      alert('Sync failed');
    }
  };

  const handleConfirmSyncSignIn = async () => {
    try {
      setIsStartingSignIn(true);
      await login();
      setShowSyncSignInDialog(false);
    } catch (error) {
      console.error(error);
      toast.error('Sign-in failed');
    } finally {
      setIsStartingSignIn(false);
    }
  };

  const handleMergeImport = async () => {
    if (!user) return;
    try {
      const cloud = await loadUserData(user.id);
      if (cloud) {
        setSemestersData(cloud.data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloud.data));
        setAutoSyncEnabled(true);
        setShowMergeDialog(false);
        toast.success('Cloud data imported.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to import cloud data.');
    }
  };

  const handleMergeIgnore = async () => {
    if (!user) return;
    try {
      await saveUserData(user.id, semestersData);
      setAutoSyncEnabled(true);
      setShowMergeDialog(false);
      toast.success('Local data saved to cloud.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save local data to cloud.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all data? This cannot be undone.')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      const initialData: AppData = {};
      for (let year = 1; year <= 5; year++) {
        for (let semester = 1; semester <= 2; semester++) {
          initialData[`${year}-${semester}`] = {};
        }
      }
      setSemestersData(initialData);
    }
  };

  const shareMessage = `Hey 👋\n\nI’ve been using this ECE CGPA tracker and it’s really helpful for tracking grades and GPA semester by semester.\n\nTry it here: ${window.location.origin}\n\nYou can also sync your data across devices.`;

  const handleShareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyShareMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      alert('Share message copied.');
    } catch {
      alert('Could not copy automatically. You can copy it manually from the message box.');
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      alert('System share is not supported on this device.');
      return;
    }

    try {
      await navigator.share({
        title: 'ECE CGPA Tracker',
        text: shareMessage,
        url: window.location.origin,
      });
    } catch {
      // user canceled or unsupported payload; no action needed
    }
  };

  const academicYears = [1, 2, 3, 4, 5];

  const totalCourses = Object.values(semestersData).reduce(
    (sum, sem) => sum + Object.keys(sem).length, 0
  );
  const totalCompletedCourses = Object.values(semestersData).reduce(
    (sum, sem) => sum + Object.values(sem).filter(c => c.grade).length, 0
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <StickyProgressBar allSemestersData={semestersData} visible={stickyVisible} />

      <div className="container mx-auto px-2 py-2 max-w-lg lg:max-w-2xl">
        {/* Ultra-tight Header */}
        <header className="flex items-center justify-between gap-2 mb-2 px-1">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/10">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">ECE Department</p>
              <p className="text-[8px] text-muted-foreground -mt-0.5 italic">Built by student for students</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button onClick={handleSync} className="px-3 py-1 rounded bg-primary text-white text-sm">Sync</button>
              {authenticated && user && (
                <button onClick={() => logout()} className="px-3 py-1 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 text-sm">Logout</button>
              )}
            </div>
          </div>
        </header>

        {/* CGPA Calculator */}
        <div className="mb-2" ref={cgpaCardRef}>
          <CGPACalculator allSemestersData={semestersData} />
        </div>

        {/* Academic Years */}
        <div className="space-y-1.5">
          {academicYears.map((year) => {
            const s1 = Object.values(semestersData[`${year}-1`] || {});
            const s2 = Object.values(semestersData[`${year}-2`] || {});
            return (
              <YearCard
                key={year}
                year={year}
                semester1Courses={s1}
                semester2Courses={s2}
                onGradeChange={(code, grade) => {
                  const isInSem1 = s1.some(c => c.code === code);
                  handleGradeChange(year, isInSem1 ? 1 : 2, code, grade);
                }}
                onAddCourse={handleAddCourse}
                onRemoveCourse={(courseCode) => {
                  const isInSem1 = s1.some(c => c.code === courseCode);
                  handleRemoveCourse(year, isInSem1 ? 1 : 2, courseCode);
                }}
              />
            );
          })}
        </div>

        {/* Primary CTA: Install & Download - Moved to bottom */}
        <div className="mt-6 mb-4 space-y-3 animate-slide-in-up">
          <InstallPWA />
          <DataExportImport 
            variant="cta"
            semestersData={semestersData} 
            totalCourses={totalCourses} 
            totalCompletedCourses={totalCompletedCourses} 
          />
        </div>

        {/* Ultra-minimal Footer */}
        <footer className="mt-4 pb-6 px-2 flex flex-col gap-3 border-t pt-2 border-border/50">
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
              Appreciate the work?
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[10px] font-semibold text-primary hover:bg-primary/10"
              onClick={() => setShowShareDialog(true)}
            >
              <Share2 className="h-3 w-3 mr-1" /> Share with colleagues
            </Button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <div />
            <div className="flex items-center gap-4">
              <button onClick={handleResetData} className="text-destructive hover:underline flex items-center gap-1">
                <RotateCcw className="h-2.5 w-2.5" /> Reset
              </button>
              <a
                href="https://nworahebuka.nworahsoft.codes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-90"
              >
                Built by KingAustin
              </a>
            </div>
          </div>
        </footer>
      </div>

      <Dialog open={showSyncSignInDialog} onOpenChange={setShowSyncSignInDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base">Sync your data across devices</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Sign in to securely sync your results to the cloud and access them on any device.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="ghost"
              className="h-10"
              onClick={() => setShowSyncSignInDialog(false)}
              disabled={isStartingSignIn}
            >
              Cancel
            </Button>
            <Button
              className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleConfirmSyncSignIn}
              disabled={isStartingSignIn}
            >
              {isStartingSignIn ? 'Opening sign in...' : 'Continue to Sign in'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base">Share with colleagues</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Use this ready message on WhatsApp or any platform.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-border bg-muted/30 p-3 text-xs whitespace-pre-line leading-relaxed">
            {shareMessage}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="ghost" className="h-10" onClick={handleCopyShareMessage}>
              Copy message
            </Button>
            <Button variant="outline" className="h-10" onClick={handleNativeShare}>
              More apps
            </Button>
            <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleShareOnWhatsApp}>
              Share on WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMergeDialog} onOpenChange={setShowMergeDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base">Cloud data found</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              You have data saved in the cloud from another device. Would you like to import it or keep your current local data?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="ghost" className="h-10" onClick={handleMergeIgnore}>
              Keep local data
            </Button>
            <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleMergeImport}>
              Import cloud data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
