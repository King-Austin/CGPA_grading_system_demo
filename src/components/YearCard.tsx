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
    <Card className="overflow-hidden shadow-xl border-primary/20 bg-gradient-to-br from-background to-accent/5">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-primary/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/15">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            {getYearOrdinal(year)} Year
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Academic Sessions</div>
              <Badge variant="outline" className="font-semibold">
                <Calendar className="h-3 w-3 mr-1" />
                2 Semesters
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Total Courses</div>
              <Badge variant="outline" className="font-semibold">
                {totalCourses}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Completed</div>
              <Badge variant="outline" className="font-semibold text-success">
                {completedCourses}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
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