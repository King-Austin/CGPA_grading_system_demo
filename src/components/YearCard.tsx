import React, { useState } from 'react';
import { Course } from '@/data/courses';
import Semester from './Semester';
import { ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(year === 1);

  const getYearOrdinal = (yr: number) => {
    const ordinals = ['', '1st', '2nd', '3rd', '4th', '5th'];
    return ordinals[yr] || `${yr}th`;
  };

  const totalCourses = semester1Courses.length + semester2Courses.length;
  const completedCourses =
    semester1Courses.filter(c => c.grade).length +
    semester2Courses.filter(c => c.grade).length;

  const allDone = totalCourses > 0 && completedCourses === totalCourses;

  const pct = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;

  return (
    <div
      className="rp-card-surface rp-fade-up"
      style={{ animationDelay: `${(year - 1) * 60}ms`, width: '100%' }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 1rem',
          cursor: 'pointer',
          userSelect: 'none',
          borderBottom: isOpen ? '0.5px solid var(--rp-border-default)' : 'none',
        }}
        onClick={() => setIsOpen(o => !o)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--rp-font-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--rp-text-muted)',
          }}>
            {String(year).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: 'var(--rp-font-serif)',
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--rp-text-primary)',
          }}>
            {getYearOrdinal(year)} Year
          </span>
          {allDone && (
            <span className="rp-done-badge">✓ done</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--rp-font-mono)',
            fontSize: 11,
            color: 'var(--rp-text-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {completedCourses}/{totalCourses}
          </span>
          <ChevronDown style={{
            width: 12,
            height: 12,
            color: 'var(--rp-text-ghost)',
            transition: 'transform 0.25s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }} />
        </div>
      </div>

      {/* Slim progress bar (always visible) */}
      {totalCourses > 0 && (
        <div className="rp-bar-track" style={{ borderRadius: 0 }}>
          <div
            className="rp-bar-fill"
            style={{ width: `${pct}%`, borderRadius: 0 }}
          />
        </div>
      )}

      {/* Collapsible content */}
      <div
        style={{
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
          maxHeight: isOpen ? 2500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div style={{ padding: '0.75rem' }}>
          <Semester
            year={year}
            semesterNum={1}
            courses={semester1Courses}
            onGradeChange={onGradeChange}
            onAddCourse={onAddCourse}
            onRemoveCourse={onRemoveCourse}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <Semester
              year={year}
              semesterNum={2}
              courses={semester2Courses}
              onGradeChange={onGradeChange}
              onAddCourse={onAddCourse}
              onRemoveCourse={onRemoveCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearCard;