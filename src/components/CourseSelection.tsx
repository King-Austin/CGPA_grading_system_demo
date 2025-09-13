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
    <Card className="border-primary/20 bg-gradient-to-r from-accent/30 to-accent/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Add Course to Semester
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Select 
            value={selectedCourseCode} 
            onValueChange={setSelectedCourseCode}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a course to add..." />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {availableCourses.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b">
                    Recommended for Year {year}, Semester {semester}
                  </div>
                  {availableCourses.map(course => (
                    <SelectItem 
                      key={course.code} 
                      value={course.code}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex-1">
                          <div className="font-medium">{course.code}</div>
                          <div className="text-xs text-muted-foreground truncate">{course.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getCategoryColor(course.category)}>
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
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-t">
                    Other Available Courses
                  </div>
                  {otherCourses.map(course => (
                    <SelectItem 
                      key={course.code} 
                      value={course.code}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex-1">
                          <div className="font-medium">{course.code}</div>
                          <div className="text-xs text-muted-foreground truncate">{course.title}</div>
                          <div className="text-xs text-muted-foreground">Year {course.year}, Sem {course.semester}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getCategoryColor(course.category)}>
                            {course.category}
                          </Badge>
                          <span className="text-xs font-medium">{course.creditUnit} CU</span>
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
            className="bg-primary hover:bg-primary-dark shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSelection;