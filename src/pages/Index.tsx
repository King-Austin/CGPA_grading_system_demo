import React, { useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import YearCard from '@/components/YearCard';
import CGPACalculator from '@/components/CGPACalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Calculator, BookOpen, RotateCcw } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'gpaTrackerData';

interface SemesterData {
  [courseCode: string]: Course & { grade?: string };
}

interface AppData {
  [semesterKey: string]: SemesterData;
}

const Index = () => {
  // Initialize with empty data structure for 4 years
  const [semestersData, setSemestersData] = useState<AppData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
    
    // Initialize empty structure for 4 years, 2 semesters each
    const initialData: AppData = {};
    for (let year = 1; year <= 4; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        initialData[`${year}-${semester}`] = {};
      }
    }
    return initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(semestersData));
  }, [semestersData]);

  const handleGradeChange = (year: number, semesterNum: number, courseCode: string, newGrade: string) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      const updatedSemester = {
        ...prevData[semesterKey],
        [courseCode]: {
          ...prevData[semesterKey][courseCode],
          grade: newGrade,
        },
      };
      return {
        ...prevData,
        [semesterKey]: updatedSemester,
      };
    });
  };

  const handleAddCourse = (year: number, semesterNum: number, courseToAdd: Course) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      
      // Check if course already exists in this semester
      if (prevData[semesterKey]?.[courseToAdd.code]) {
        // Could show a toast notification here
        return prevData;
      }

      return {
        ...prevData,
        [semesterKey]: {
          ...prevData[semesterKey],
          [courseToAdd.code]: { ...courseToAdd, grade: '' },
        },
      };
    });
  };

  const handleRemoveCourse = (year: number, semesterNum: number, courseCode: string) => {
    setSemestersData(prevData => {
      const semesterKey = `${year}-${semesterNum}`;
      const { [courseCode]: _, ...restOfSemesterCourses } = prevData[semesterKey];
      return {
        ...prevData,
        [semesterKey]: restOfSemesterCourses,
      };
    });
  };

  const handleResetData = () => {
    // Clear localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Reset state to initial empty structure
    const initialData: AppData = {};
    for (let year = 1; year <= 4; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        initialData[`${year}-${semester}`] = {};
      }
    }
    setSemestersData(initialData);
  };

  // Define academic years to display
  const academicYears = [1, 2, 3, 4];

  // Calculate total statistics
  const totalCourses = Object.values(semestersData).reduce(
    (sum, semester) => sum + Object.keys(semester).length, 0
  );
  const totalCompletedCourses = Object.values(semestersData).reduce(
    (sum, semester) => sum + Object.values(semester).filter(course => course.grade).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-5xl">
        {/* Header */}
        <Card className="mb-4 sm:mb-6 overflow-hidden shadow-lg border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-card-foreground flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <span className="hidden sm:inline">Student GPA/CGPA Tracker</span>
                <span className="sm:hidden">GPA Tracker</span>
              </CardTitle>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-muted-foreground">Total Courses</div>
                  <Badge variant="outline" className="text-sm sm:text-lg font-semibold">
                    {totalCourses}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-muted-foreground">Completed</div>
                  <Badge variant="outline" className="text-sm sm:text-lg font-semibold text-success">
                    {totalCompletedCourses}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetData}
                  className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-6 p-3 sm:p-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">
                Track your academic progress with live GPA calculations and comprehensive grade management.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* CGPA Calculator */}
        <div className="mb-4 sm:mb-6">
          <CGPACalculator allSemestersData={semestersData} />
        </div>

        {/* Academic Years */}
        <div className="space-y-4 sm:space-y-6">
          {academicYears.map((year) => {
            const semester1Key = `${year}-1`;
            const semester2Key = `${year}-2`;
            const semester1Courses = Object.values(semestersData[semester1Key] || {});
            const semester2Courses = Object.values(semestersData[semester2Key] || {});

            return (
              <YearCard
                key={year}
                year={year}
                semester1Courses={semester1Courses}
                semester2Courses={semester2Courses}
                onGradeChange={(code, grade) => {
                  // Determine which semester this course belongs to
                  const isInSem1 = semester1Courses.some(c => c.code === code);
                  const semesterNum = isInSem1 ? 1 : 2;
                  handleGradeChange(year, semesterNum, code, grade);
                }}
                onAddCourse={handleAddCourse}
                onRemoveCourse={(courseCode) => {
                  // Determine which semester this course belongs to
                  const isInSem1 = semester1Courses.some(c => c.code === courseCode);
                  const semesterNum = isInSem1 ? 1 : 2;
                  handleRemoveCourse(year, semesterNum, courseCode);
                }}
              />
            );
          })}
        </div>

        {/* Footer */}
        <Card className="mt-6 sm:mt-8 border-dashed border-2 border-muted">
          <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
            <div className="text-center text-muted-foreground">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs sm:text-sm">
                Your academic data is automatically saved locally and will persist between sessions.
                Proudly built by <a href="https://nworahsoft.tech" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">nworahsoft inc.</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
