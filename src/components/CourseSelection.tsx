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

  const availableCourses = ALL_COURSES.filter(
    c => c.year === year && c.semester === semester && !semesterCourses.some(sc => sc.code === c.code)
  );
  const otherCourses = ALL_COURSES.filter(
    c => (c.year !== year || c.semester !== semester) && !semesterCourses.some(sc => sc.code === c.code)
  );

  const handleAdd = () => {
    if (!selectedCourseCode) return;
    const course = ALL_COURSES.find(c => c.code === selectedCourseCode);
    if (course) { onAddCourse(course); setSelectedCourseCode(''); }
  };

  if (availableCourses.length === 0 && otherCourses.length === 0) {
    return <p className="text-center text-[10px] text-muted-foreground py-1">All courses added ✓</p>;
  }

  return (
    // Flat inline row — no card, no header, just select + button
    <div className="flex items-center gap-1.5 pt-1 border-t border-border/30">
      <Select value={selectedCourseCode} onValueChange={setSelectedCourseCode}>
        <SelectTrigger className="flex-1 h-7 text-[11px] px-2 border-border/50">
          <SelectValue placeholder="+ add course…" />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {availableCourses.length > 0 && (
            <>
              <div className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground border-b">
                Year {year} · Sem {semester}
              </div>
              {availableCourses.map(c => (
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
          {otherCourses.length > 0 && (
            <>
              <div className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground border-b border-t">
                Other
              </div>
              {otherCourses.map(c => (
                <SelectItem key={c.code} value={c.code} className="py-1">
                  <span className="text-[11px]">
                    <span className="font-semibold">{c.code}</span>
                    <span className="text-muted-foreground ml-1 text-[10px]">Y{c.year}S{c.semester}</span>
                    <span className="text-muted-foreground ml-1">{c.title}</span>
                  </span>
                </SelectItem>
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