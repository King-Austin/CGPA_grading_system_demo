import React, { useState } from 'react';
import { Course, ALL_COURSES } from '@/data/courses';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

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

  const currentCourses = ALL_COURSES.filter(
    c => c.year === year && c.semester === semester && !semesterCourses.some(sc => sc.code === c.code)
  );

  // Get carryovers: same semester, previous years, not already added
  // Exception: No carryovers for Year 4 Semester 2 (SIWES)
  const carryoverCourses = (year === 4 && semester === 2) 
    ? [] 
    : ALL_COURSES.filter(
        c => c.year < year && c.semester === semester && !semesterCourses.some(sc => sc.code === c.code)
      );

  // Group carryovers by year
  const carryoverByYear = carryoverCourses.reduce((acc, curr) => {
    if (!acc[curr.year]) acc[curr.year] = [];
    acc[curr.year].push(curr);
    return acc;
  }, {} as Record<number, Course[]>);

  const carryoverYears = Object.keys(carryoverByYear).map(Number).sort((a, b) => b - a); // Newest first

  const handleAdd = () => {
    if (!selectedCourseCode) return;
    const course = ALL_COURSES.find(c => c.code === selectedCourseCode);
    if (course) {
      onAddCourse(course);
      setSelectedCourseCode('');
    }
  };

  if (currentCourses.length === 0 && carryoverCourses.length === 0) {
    return <p className="text-center text-[10px] text-muted-foreground py-1">No more eligible courses ✓</p>;
  }

  return (
    <div className="flex items-center gap-1.5 pt-1 border-t border-border/30">
      <Select value={selectedCourseCode} onValueChange={setSelectedCourseCode}>
        <SelectTrigger className="flex-1 h-7 text-[11px] px-2 border-border/50">
          <SelectValue placeholder="+ add course…" />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {currentCourses.length > 0 && (
            <>
              <div className="px-2 py-0.5 text-[10px] font-bold text-primary border-b bg-primary/5">
                Current Level (Year {year} · Sem {semester})
              </div>
              {currentCourses.map(c => (
                <SelectItem key={c.code} value={c.code} className="py-1">
                  <span className="text-[11px]">
                    <span className="font-semibold">{c.code}</span>
                    <span className="text-muted-foreground ml-1">{c.title}</span>
                    <span className="text-muted-foreground ml-1">· {c.creditUnit}CU</span>
                  </span>
                </SelectItem>
              ))}
            </>
          )}

          {carryoverYears.length > 0 && (
            <>
              {carryoverYears.map(carryYear => (
                <React.Fragment key={carryYear}>
                  <div className="px-2 py-0.5 text-[10px] font-bold text-amber-600 border-b border-t mt-1 bg-amber-50/50">
                    Carryover (Year {carryYear} · Sem {semester})
                  </div>
                  {carryoverByYear[carryYear].map(c => (
                    <SelectItem key={c.code} value={c.code} className="py-1">
                      <span className="text-[11px]">
                        <span className="font-semibold text-amber-700">{c.code}</span>
                        <span className="text-muted-foreground ml-1">{c.title}</span>
                        <span className="text-muted-foreground ml-1">· {c.creditUnit}CU</span>
                      </span>
                    </SelectItem>
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
        </SelectContent>
      </Select>

      <button
        onClick={handleAdd}
        disabled={!selectedCourseCode}
        className="h-7 px-2 rounded text-[11px] font-medium bg-primary text-white flex items-center gap-0.5
          disabled:opacity-40 hover:bg-primary/90 transition-colors flex-shrink-0"
      >
        <Plus className="h-3 w-3" />
        Add
      </button>
    </div>
  );
};

export default CourseSelection;