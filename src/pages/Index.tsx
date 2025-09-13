import React, { useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import Semester from '@/components/Semester';
import CGPACalculator from '@/components/CGPACalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calculator, BookOpen } from 'lucide-react';

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

  // Define academic years and semesters to display
  const academicSemesters = [
    { year: 1, semesterNum: 1 },
    { year: 1, semesterNum: 2 },
    { year: 2, semesterNum: 1 },
    { year: 2, semesterNum: 2 },
    { year: 3, semesterNum: 1 },
    { year: 3, semesterNum: 2 },
    { year: 4, semesterNum: 1 },
    { year: 4, semesterNum: 2 },
  ];

  // Calculate total statistics
  const totalCourses = Object.values(semestersData).reduce(
    (sum, semester) => sum + Object.keys(semester).length, 0
  );
  const totalCompletedCourses = Object.values(semestersData).reduce(
    (sum, semester) => sum + Object.values(semester).filter(course => course.grade).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Card className="mb-8 overflow-hidden shadow-lg border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold text-card-foreground flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                Student GPA/CGPA Tracker
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Total Courses</div>
                  <Badge variant="outline" className="text-lg font-semibold">
                    {totalCourses}
                  </Badge>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <Badge variant="outline" className="text-lg font-semibold text-success">
                    {totalCompletedCourses}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calculator className="h-4 w-4" />
              <span className="text-sm">
                Track your academic progress with live GPA calculations and comprehensive grade management.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* CGPA Calculator */}
        <div className="mb-8">
          <CGPACalculator allSemestersData={semestersData} />
        </div>

        {/* Academic Semesters */}
        <div className="space-y-8">
          {academicSemesters.map(({ year, semesterNum }) => {
            const semesterKey = `${year}-${semesterNum}`;
            const coursesForSemester = Object.values(semestersData[semesterKey] || {});

            return (
              <Semester
                key={semesterKey}
                year={year}
                semesterNum={semesterNum}
                courses={coursesForSemester}
                onGradeChange={(code, grade) => handleGradeChange(year, semesterNum, code, grade)}
                onAddCourse={handleAddCourse}
                onRemoveCourse={(courseCode) => handleRemoveCourse(year, semesterNum, courseCode)}
              />
            );
          })}
        </div>

        {/* Footer */}
        <Card className="mt-12 border-dashed border-2 border-muted">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                Your academic data is automatically saved locally and will persist between sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
