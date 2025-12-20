import React from 'react';
import { Course } from '@/data/courses';
import Semester from './Semester';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar } from 'lucide-react';

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
  const getYearOrdinal = (yr: number) => {
    const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
    return ordinals[yr] || `Year ${yr}`;
  };

  const totalCourses = semester1Courses.length + semester2Courses.length;
  const completedCourses = semester1Courses.filter(c => c.grade).length + semester2Courses.filter(c => c.grade).length;

  return (
    <Card className="overflow-hidden shadow-lg border-primary/20 bg-gradient-to-br from-background to-accent/5 w-full">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20 p-3 sm:p-4">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-base sm:text-xl font-bold text-card-foreground flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/15 flex-shrink-0">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            {getYearOrdinal(year)} Year
          </CardTitle>
          <div className="flex items-center gap-3 sm:gap-4">
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              2 Semesters
            </Badge>
            <Badge variant="outline" className="text-xs">
              {totalCourses} Courses
            </Badge>
            <Badge variant="outline" className="text-xs text-success">
              {completedCourses} Done
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default YearCard;