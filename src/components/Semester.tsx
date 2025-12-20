import React from 'react';
import { Course } from '@/data/courses';
import { calculateGPA, formatGPA, getGPAClass, getGPAColor, CourseWithGrade } from '@/utils/gradeUtils';
import CourseRow from './CourseRow';
import CourseSelection from './CourseSelection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, TrendingUp } from 'lucide-react';

interface SemesterProps {
  year: number;
  semesterNum: number;
  courses: (Course & { grade?: string })[];
  onGradeChange: (courseCode: string, grade: string) => void;
  onAddCourse: (year: number, semester: number, course: Course) => void;
  onRemoveCourse: (courseCode: string) => void;
}

const Semester: React.FC<SemesterProps> = ({
  year,
  semesterNum,
  courses,
  onGradeChange,
  onAddCourse,
  onRemoveCourse,
}) => {
  const coursesWithGrades: CourseWithGrade[] = courses.map(course => ({
    code: course.code,
    title: course.title,
    creditUnit: course.creditUnit,
    grade: course.grade,
  }));

  const semesterGPA = calculateGPA(coursesWithGrades);
  const gpaClass = getGPAClass(semesterGPA);
  const totalCredits = courses.reduce((sum, course) => sum + course.creditUnit, 0);
  const completedCredits = courses.filter(course => course.grade).reduce((sum, course) => sum + course.creditUnit, 0);

  const getSemesterOrdinal = (sem: number) => {
    return sem === 1 ? 'First' : 'Second';
  };

  const getYearOrdinal = (yr: number) => {
    const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    return ordinals[yr] || `Year ${yr}`;
  };

  return (
    <Card className="overflow-hidden shadow-md border-border/50 w-full">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border/50 p-3 sm:p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-sm sm:text-lg font-semibold text-card-foreground flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0">
                <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="whitespace-nowrap">{getSemesterOrdinal(semesterNum)} Sem</span>
            </CardTitle>
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge variant="outline" className="text-xs font-semibold whitespace-nowrap">
                {completedCredits}/{totalCredits}
              </Badge>
              <div className={`text-base sm:text-lg font-bold ${getGPAColor(semesterGPA)} whitespace-nowrap`}>
                {formatGPA(semesterGPA)}
              </div>
            </div>
          </div>
          {semesterGPA > 0 && (
            <div className="flex items-start gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                {gpaClass.class}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        {courses.length === 0 ? (
          <div className="text-center py-4 sm:py-6">
            <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 mx-auto text-muted-foreground/50 mb-2 sm:mb-3" />
            <h3 className="text-sm sm:text-base font-medium text-muted-foreground mb-1">
              No courses added
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Add courses below to start.
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {courses.map(course => (
              <CourseRow
                key={course.code}
                course={course}
                grade={course.grade}
                onGradeChange={onGradeChange}
                onRemoveCourse={onRemoveCourse}
              />
            ))}
          </div>
        )}

        <div className="mt-3 sm:mt-4">
          <CourseSelection
            year={year}
            semester={semesterNum}
            onAddCourse={(course) => onAddCourse(year, semesterNum, course)}
            semesterCourses={courses}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Semester;