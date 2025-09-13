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
    <Card className="overflow-hidden shadow-lg border-primary/20 bg-gradient-to-br from-background to-accent/5 max-w-6xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl font-bold text-card-foreground flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/15">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            {getYearOrdinal(year)} Year
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Sessions</div>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                2 Sem
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Courses</div>
              <Badge variant="outline" className="text-xs">
                {totalCourses}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Done</div>
              <Badge variant="outline" className="text-xs text-success">
                {completedCourses}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
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