import React from 'react';
import { Course } from '@/data/courses';
import { GRADE_SCALE } from '@/utils/gradeUtils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface CourseRowProps {
  course: Course;
  grade?: string;
  onGradeChange: (courseCode: string, grade: string) => void;
  onRemoveCourse: (courseCode: string) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({
  course,
  grade,
  onGradeChange,
  onRemoveCourse,
}) => {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'core':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'elective':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'faculty':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getGradeColor = (gradeValue?: string) => {
    if (!gradeValue) return '';
    const points = GRADE_SCALE.find(g => g.letter === gradeValue)?.points || 0;
    if (points >= 4) return 'text-success';
    if (points >= 3) return 'text-primary';
    if (points >= 2) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-card-border bg-card hover:shadow-md transition-all duration-200">
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2 sm:mb-1">
          <h4 className="font-semibold text-card-foreground text-sm sm:text-base">{course.code}</h4>
          <Badge variant="outline" className={`${getCategoryColor(course.category)} text-xs`}>
            {course.category || 'core'}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground truncate">{course.title}</p>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Credits</div>
          <div className="font-semibold text-card-foreground text-sm">{course.creditUnit}</div>
        </div>
        
        <div className="w-20 sm:w-24">
          <Select value={grade || ''} onValueChange={(value) => onGradeChange(course.code, value)}>
            <SelectTrigger className="h-8 text-xs sm:text-sm">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              {GRADE_SCALE.map((gradeOption) => (
                <SelectItem 
                  key={gradeOption.letter} 
                  value={gradeOption.letter}
                  className="text-center text-sm"
                >
                  <span className={getGradeColor(gradeOption.letter)}>
                    {gradeOption.letter} ({gradeOption.points})
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemoveCourse(course.code)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CourseRow;