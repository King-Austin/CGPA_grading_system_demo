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
    <Card className="overflow-hidden shadow-md border-border/50">
      <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border/50 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <CardTitle className="text-base sm:text-lg font-semibold text-card-foreground flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </div>
            {getSemesterOrdinal(semesterNum)} Semester
          </CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Credits</div>
              <Badge variant="outline" className="text-xs sm:text-sm font-semibold">
                {completedCredits}/{totalCredits}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">GPA</div>
              <div className={`text-sm sm:text-lg font-bold ${getGPAColor(semesterGPA)}`}>
                {formatGPA(semesterGPA)}
              </div>
            </div>
          </div>
        </div>
        
        {semesterGPA > 0 && (
          <div className="mt-2 sm:mt-3 flex items-center gap-2">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {gpaClass.class} - {gpaClass.description}
            </span>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {courses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No courses added yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Add courses from the selection below to start tracking your grades.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
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

        <div className="mt-6">
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