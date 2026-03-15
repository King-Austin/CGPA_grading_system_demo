import React, { useState } from 'react';
import { Course } from '@/data/courses';
import Semester from './Semester';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, ChevronDown } from 'lucide-react';

interface YearCardProps {
  year: number;
  semester1Courses: (Course & { grade?: string })[];
  semester2Courses: (Course & { grade?: string })[];
  onGradeChange: (courseCode: string, grade: string) => void;
  onAddCourse: (year: number, semester: number, course: Course) => void;
  onRemoveCourse: (courseCode: string) => void;
}

const YearCard: React.FC<YearCardProps> = ({
  year,
  semester1Courses,
  semester2Courses,
  onGradeChange,
  onAddCourse,
  onRemoveCourse,
}) => {
  const [isOpen, setIsOpen] = useState(year === 1);

  const getYearOrdinal = (yr: number) => {
    const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th'];
    return ordinals[yr] || `${yr}th`;
  };

  const totalCourses = semester1Courses.length + semester2Courses.length;
  const completedCourses =
    semester1Courses.filter(c => c.grade).length +
    semester2Courses.filter(c => c.grade).length;

  const allDone = totalCourses > 0 && completedCourses === totalCourses;

  return (
    <Card
      className="overflow-hidden border-border bg-background w-full animate-stagger-fade-up shadow-none hover:border-primary/30 transition-colors"
      style={{ animationDelay: `${(year - 1) * 60}ms` }}
    >
      {/* Ultra-narrow Header */}
      <div
        className="flex items-center justify-between gap-2 px-2 py-1.5 cursor-pointer select-none bg-muted/20 border-b border-border/50"
        onClick={() => setIsOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-muted/60">
            <GraduationCap className="h-3 w-3 text-muted-foreground" />
          </div>
          <span className="text-xs font-bold text-card-foreground">
            {getYearOrdinal(year)} Year
          </span>
          {allDone && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
            {completedCourses}/{totalCourses} courses
          </span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-300 text-muted-foreground/60 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Progress bar line (thinner) */}
      {totalCourses > 0 && !isOpen && (
        <div className="h-[2px] w-full bg-muted/30">
          <div
            className="h-full bg-emerald-500/60 transition-all duration-500"
            style={{ width: `${(completedCourses / totalCourses) * 100}%` }}
          />
        </div>
      )}

      {/* Collapsible content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <CardContent className="p-1.5 space-y-1.5">
          <Semester
            year={year}
            semesterNum={1}
            courses={semester1Courses}
            onGradeChange={onGradeChange}
            onAddCourse={onAddCourse}
            onRemoveCourse={onRemoveCourse}
          />
          <Semester
            year={year}
            semesterNum={2}
            courses={semester2Courses}
            onGradeChange={onGradeChange}
            onAddCourse={onAddCourse}
            onRemoveCourse={onRemoveCourse}
          />
        </CardContent>
      </div>
    </Card>
  );
};

export default YearCard;