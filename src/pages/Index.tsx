import React, { useState, useEffect, useRef } from 'react';
import { Course } from '@/data/courses';
import YearCard from '@/components/YearCard';
import CGPACalculator from '@/components/CGPACalculator';
import DataExportImport from '@/components/DataExportImport';
import StickyProgressBar from '@/components/StickyProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, RotateCcw, Info } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'gpaTrackerData';

interface SemesterData {
  [courseCode: string]: Course & { grade?: string };
}

interface AppData {
  [semesterKey: string]: SemesterData;
}

const Index = () => {
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
  const cgpaCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-60px 0px 0px 0px' }
    );
    if (cgpaCardRef.current) observer.observe(cgpaCardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(semestersData));
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
              <p className="text-[10px] text-muted-foreground">ECE Department</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-medium text-muted-foreground mr-1">
              {totalCompletedCourses}/{totalCourses} Graded
            </div>
            <DataExportImport semestersData={semestersData} totalCourses={totalCourses} totalCompletedCourses={totalCompletedCourses} />
          </div>
        </header>

        {/* CGPA Calculator */}
        <div className="mb-2" ref={cgpaCardRef}>
          <CGPACalculator allSemestersData={semestersData} />
        </div>

        {/* Primary CTA: Download PDF */}
        <div className="mb-3 animate-slide-in-up" style={{ animationDelay: '150ms' }}>
          <DataExportImport 
            variant="cta"
            semestersData={semestersData} 
            totalCourses={totalCourses} 
            totalCompletedCourses={totalCompletedCourses} 
          />
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

        {/* Ultra-minimal Footer */}
        <footer className="mt-4 pb-4 px-2 flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-border/50">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Local storage only</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleResetData} className="text-destructive hover:underline flex items-center gap-1">
              <RotateCcw className="h-2.5 w-2.5" /> Reset
            </button>
            <span>Built by KingAustin</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
