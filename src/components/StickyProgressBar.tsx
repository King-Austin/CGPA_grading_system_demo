import React from 'react';
import { formatGPA, calculateGPA, getGPAClass, CourseWithGrade } from '@/utils/gradeUtils';
import { Badge } from '@/components/ui/badge';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { GraduationCap } from 'lucide-react';

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

  const getGradient = (val: number) => {
    if (val >= 4.5) return 'from-emerald-500 to-green-500';
    if (val >= 3.5) return 'from-blue-500 to-indigo-500';
    if (val >= 2.5) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const getTextColor = (val: number) => {
    if (val >= 4.5) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 3.5) return 'text-blue-600 dark:text-blue-400';
    if (val >= 2.5) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ${visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
    >
      <div className="backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-lg px-2 py-1.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Mini Brand & Class */}
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={`p-1 rounded bg-gradient-to-br ${getGradient(cgpa)} text-white shadow-sm`}>
              <GraduationCap className="h-3 w-3" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none truncate">CGPA Tracker</span>
              <span className={`text-[10px] font-medium leading-none truncate ${getTextColor(cgpa)}`}>{gpaClass.class}</span>
            </div>
          </div>

          {/* Center: Progress & Label */}
          <div className="flex-1 flex flex-col gap-0.5 max-w-[120px]">
            <div className="flex justify-between items-center text-[8px] font-bold text-muted-foreground uppercase leading-none">
              <span>{Math.round(animatedPct)}%</span>
              <span>{completedCredits}/{totalCredits} CU</span>
            </div>
            <div className="w-full h-1 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${getGradient(cgpa)}`}
                style={{ width: `${animatedPct}%` }}
              />
            </div>
          </div>

          {/* Right: The Metric */}
          <div className="flex items-center gap-1 bg-muted/30 px-2 py-0.5 rounded-lg border border-border/50">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">CGPA</span>
            <span className={`text-xl font-black tabular-nums tracking-tighter ${getTextColor(cgpa)}`}>
              {formatGPA(animatedCgpa)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyProgressBar;
