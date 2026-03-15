import React from 'react';
import { formatGPA, getGPAColor, calculateGPA, getGPAClass, CourseWithGrade } from '@/utils/gradeUtils';
import { Badge } from '@/components/ui/badge';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface StickyProgressBarProps {
  allSemestersData: Record<string, Record<string, CourseWithGrade & { grade?: string }>>;
  visible: boolean;
}

const StickyProgressBar: React.FC<StickyProgressBarProps> = ({ allSemestersData, visible }) => {
  const allCourses: CourseWithGrade[] = Object.values(allSemestersData)
    .flatMap(sem => Object.values(sem))
    .map(c => ({ code: c.code, title: c.title, creditUnit: c.creditUnit, grade: c.grade }));

  const cgpa = calculateGPA(allCourses);
  const gpaClass = getGPAClass(cgpa);
  const totalCredits = allCourses.reduce((s, c) => s + c.creditUnit, 0);
  const completedCredits = allCourses.filter(c => c.grade).reduce((s, c) => s + c.creditUnit, 0);
  const pct = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  const animatedPct = useAnimatedCounter(pct, 500);
  const animatedCgpa = useAnimatedCounter(cgpa, 500);

  const barColor =
    cgpa >= 4.5 ? 'bg-emerald-500' :
    cgpa >= 3.5 ? 'bg-blue-500' :
    cgpa >= 2.5 ? 'bg-amber-500' :
    'bg-red-500';

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="backdrop-blur-md bg-white/80 dark:bg-background/80 border-b border-border shadow-sm px-3 py-2">
        <div className="max-w-6xl mx-auto flex items-center gap-3 sm:gap-5">
          {/* CGPA */}
          <div className="flex items-baseline gap-1 flex-shrink-0">
            <span className={`text-xl sm:text-2xl font-bold tabular-nums ${getGPAColor(cgpa)}`}>
              {formatGPA(animatedCgpa)}
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">CGPA</span>
          </div>

          {/* Class Badge */}
          <Badge
            variant="outline"
            className={`hidden sm:flex text-xs flex-shrink-0 ${
              cgpa >= 4.5 ? 'border-emerald-500 text-emerald-600' :
              cgpa >= 3.5 ? 'border-blue-500 text-blue-600' :
              cgpa >= 2.5 ? 'border-amber-500 text-amber-600' :
              'border-red-500 text-red-600'
            }`}
          >
            {gpaClass.class}
          </Badge>

          {/* Progress bar */}
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${animatedPct}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap flex-shrink-0">
              {completedCredits}/{totalCredits} CU
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyProgressBar;
