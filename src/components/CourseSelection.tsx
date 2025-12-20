import React, { useState } from 'react';
import { Course, ALL_COURSES } from '@/data/courses';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen } from 'lucide-react';

interface CourseSelectionProps {
  year: number;
  semester: number;
  onAddCourse: (course: Course) => void;
  semesterCourses: Course[];
}

const CourseSelection: React.FC<CourseSelectionProps> = ({
  year,
  semester,
  onAddCourse,
  semesterCourses,
}) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState('');

  // Get courses for the current year/semester that aren't already added
  const availableCourses = ALL_COURSES.filter(
    (course) =>
      course.year === year &&
      course.semester === semester &&
      !semesterCourses.some((sc) => sc.code === course.code)
  );

  // Also include courses from other years that aren't added
  const otherCourses = ALL_COURSES.filter(
    (course) =>
      (course.year !== year || course.semester !== semester) &&
      !semesterCourses.some((sc) => sc.code === course.code)
  );

  const handleAddClick = () => {
    if (selectedCourseCode) {
      const courseToAdd = ALL_COURSES.find(c => c.code === selectedCourseCode);
      if (courseToAdd) {
        onAddCourse(courseToAdd);
        setSelectedCourseCode('');
      }
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'core':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'elective':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'gss':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (availableCourses.length === 0 && otherCourses.length === 0) {
    return (
      <Card className="border-dashed border-2 border-muted">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>All available courses have been added to this semester.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-accent/30 to-accent/10 w-full">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
          <Plus className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="whitespace-nowrap">Add Course</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Select 
            value={selectedCourseCode} 
            onValueChange={setSelectedCourseCode}
          >
            <SelectTrigger className="flex-1 h-10 text-xs sm:text-sm">
              <SelectValue placeholder="Select course..." />
            </SelectTrigger>
            <SelectContent className="max-h-60 sm:max-h-80">
              {availableCourses.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b">
                    Recommended for Year {year}, Semester {semester}
                  </div>
                  {availableCourses.map(course => (
                    <SelectItem 
                      key={course.code} 
                      value={course.code}
                      className="py-2"
                    >
                      <div className="flex items-start justify-between gap-2 w-full min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs sm:text-sm truncate">{course.code}</div>
                          <div className="text-xs text-muted-foreground truncate">{course.title}</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Badge variant="outline" className={`${getCategoryColor(course.category)} text-xs`}>
                            {course.category}
                          </Badge>
                          <span className="text-xs font-medium">{course.creditUnit} CU</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
              
              {otherCourses.length > 0 && (
                <>
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b border-t">
                    Other Courses
                  </div>
                  {otherCourses.map(course => (
                    <SelectItem 
                      key={course.code} 
                      value={course.code}
                      className="py-2"
                    >
                      <div className="flex items-start justify-between gap-2 w-full min-w-0">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs sm:text-sm truncate">{course.code}</div>
                          <div className="text-xs text-muted-foreground truncate">{course.title}</div>
                          <div className="text-xs text-muted-foreground">Yr {course.year}, Sem {course.semester}</div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Badge variant="outline" className={`${getCategoryColor(course.category)} text-xs`}>
                            {course.category}
                          </Badge>
                          <span className="text-xs font-medium whitespace-nowrap">{course.creditUnit}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleAddClick} 
            disabled={!selectedCourseCode}
            className="bg-primary hover:bg-primary-dark shadow-md h-10 px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSelection;