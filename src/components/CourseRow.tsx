import React, { useState } from 'react';
import { Course } from '@/data/courses';
import { GRADE_SCALE } from '@/utils/gradeUtils';
import { Trash2 } from 'lucide-react';

interface CourseRowProps {
  course: Course;
  grade?: string;
  onGradeChange: (courseCode: string, grade: string) => void;
  onRemoveCourse: (courseCode: string) => void;
}

const GRADE_COLORS: Record<string, { bg: string; text: string; border: string; stripe: string }> = {
  A: { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-500', stripe: 'border-l-emerald-500' },
  B: { bg: 'bg-green-400',   text: 'text-white', border: 'border-green-400',   stripe: 'border-l-green-400' },
  C: { bg: 'bg-amber-400',   text: 'text-white', border: 'border-amber-400',   stripe: 'border-l-amber-400' },
  D: { bg: 'bg-orange-400',  text: 'text-white', border: 'border-orange-400',  stripe: 'border-l-orange-400' },
  E: { bg: 'bg-orange-500',  text: 'text-white', border: 'border-orange-500',  stripe: 'border-l-orange-500' },
  F: { bg: 'bg-red-500',     text: 'text-white', border: 'border-red-500',     stripe: 'border-l-red-500' },
};

const INACTIVE_HOVER: Record<string, string> = {
  A: 'hover:bg-emerald-50 hover:border-emerald-400 hover:text-emerald-600',
  B: 'hover:bg-green-50 hover:border-green-400 hover:text-green-600',
  C: 'hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600',
  D: 'hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600',
  E: 'hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600',
  F: 'hover:bg-red-50 hover:border-red-400 hover:text-red-600',
};

const CAT_DOT: Record<string, string> = {
  faculty: 'bg-blue-400',
  gss: 'bg-emerald-400',
  elective: 'bg-amber-400',
};

const CourseRow: React.FC<CourseRowProps> = ({ course, grade, onGradeChange, onRemoveCourse }) => {
  const [bounceKey, setBounceKey] = useState(0);

  const handleGradeClick = (letter: string) => {
    onGradeChange(course.code, letter);
    setBounceKey(k => k + 1);
  };

  const stripeColor = grade ? GRADE_COLORS[grade]?.stripe : 'border-l-transparent';

  return (
    // Single-line layout: everything on one row
    <div
      className={`flex flex-col gap-1 p-1 rounded-md border-l-[3px] border border-border/50
        bg-card hover:bg-accent/10 transition-colors duration-150 animate-slide-in-up ${stripeColor}`}
    >
      {/* Line 1: Actions & Meta */}
      <div className="flex items-center gap-1.5 min-w-0">
        <button
          onClick={() => onRemoveCourse(course.code)}
          className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded
            bg-red-50 text-red-500 border border-red-100 dark:bg-red-950/30 dark:border-red-900/50"
          title="Remove course"
        >
          <Trash2 className="h-3 w-3" />
        </button>

        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${CAT_DOT[course.category ?? ''] ?? 'bg-muted-foreground/30'}`} />

        <span className="font-bold text-[10px] sm:text-[11px] text-card-foreground flex-shrink-0 tabular-nums">
          {course.code}
        </span>

        <span className="text-[10px] text-muted-foreground truncate flex-1 min-w-0">
          {course.title}
        </span>

        <span className="text-[10px] text-muted-foreground/60 flex-shrink-0 tabular-nums font-medium">
          {course.creditUnit}CU
        </span>
      </div>

      {/* Line 2: Grade Pills — horizontal scroll allowed if necessary, but compact */}
      <div className="flex items-center gap-[2px] overflow-x-auto no-scrollbar pb-0.5">
        {GRADE_SCALE.map((g) => {
          const isActive = grade === g.letter;
          const colors = GRADE_COLORS[g.letter];
          return (
            <button
              {...(isActive ? { key: `${g.letter}-${bounceKey}` } : { key: g.letter })}
              onClick={() => handleGradeClick(g.letter)}
              title={`${g.letter} — ${g.description} (${g.points} pts)`}
              className={`
                h-6 min-w-[32px] flex-1 rounded text-[10px] font-bold border transition-all duration-150
                ${isActive
                  ? `${colors.bg} ${colors.text} ${colors.border} animate-pop-bounce`
                  : `bg-background text-muted-foreground/60 border-border/50 ${INACTIVE_HOVER[g.letter]}`
                }
              `}
            >
              {g.letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CourseRow;