import React from 'react';
import { Course } from '@/data/courses';
import { calculateGPA, formatGPA, getGPAClass, getGPAColor, CourseWithGrade } from '@/utils/gradeUtils';
import CourseRow from './CourseRow';
import CourseSelection from './CourseSelection';

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
  const coursesWithGrades: CourseWithGrade[] = courses.map(c => ({
    code: c.code, title: c.title, creditUnit: c.creditUnit, grade: c.grade,
  }));

  const semesterGPA = calculateGPA(coursesWithGrades);
  const gpaClass = getGPAClass(semesterGPA);
  const totalCredits = courses.reduce((s, c) => s + c.creditUnit, 0);
  const completedCredits = courses.filter(c => c.grade).reduce((s, c) => s + c.creditUnit, 0);

  return (
    <div className="rounded-md border border-border/40 bg-card/30 overflow-hidden w-full transition-colors hover:border-border/80">
      {/* Tiny Header */}
      <div className="flex items-center justify-between gap-2 px-2 py-1 bg-muted/10 border-b border-border/30">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
             Sem {semesterNum}
          </span>
          {semesterGPA > 0 && (
            <span className="text-[9px] font-medium text-muted-foreground/70 uppercase">
              {gpaClass.class.split(' ')[0]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground tabular-nums opacity-60">
            {completedCredits}/{totalCredits}CU
          </span>
          <span className={`text-[11px] font-black tabular-nums ${getGPAColor(semesterGPA)}`}>
            {formatGPA(semesterGPA)}
          </span>
        </div>
      </div>

      <div className="px-1 py-1">
        {courses.length === 0 ? (
          <p className="text-center text-[9px] text-muted-foreground/60 py-1">Semester Empty</p>
        ) : (
          <div className="space-y-[0.5px]">
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

        <div className="mt-1">
          <CourseSelection
            year={year}
            semester={semesterNum}
            onAddCourse={(course) => onAddCourse(year, semesterNum, course)}
            semesterCourses={courses}
          />
        </div>
      </div>
    </div>
  );
};

export default Semester;