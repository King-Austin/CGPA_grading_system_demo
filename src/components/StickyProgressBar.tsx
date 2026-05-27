import React from 'react';
import { formatGPA, calculateGPA, getGPAClass, CourseWithGrade } from '@/utils/gradeUtils';
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

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        width: '100%',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-6px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'color-mix(in srgb, var(--rp-bg-primary) 92%, transparent)',
        borderBottom: '0.5px solid var(--rp-border-default)',
        padding: '0.5rem 1.25rem',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

          {/* Left: eyebrow + class */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rp-text-muted)' }}>
              CGPA Tracker
            </span>
            <span className="rp-sticky-class-em">
              {gpaClass.class}
            </span>
          </div>

          {/* Center: slim progress bar */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 140 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 9, color: 'var(--rp-text-ghost)', fontVariantNumeric: 'tabular-nums' }}>
                {Math.round(animatedPct)}%
              </span>
              <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 9, color: 'var(--rp-text-ghost)', fontVariantNumeric: 'tabular-nums' }}>
                {completedCredits}/{totalCredits} CU
              </span>
            </div>
            <div className="rp-bar-track">
              <div className="rp-bar-fill" style={{ width: `${animatedPct}%`, transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
          </div>

          {/* Right: CGPA numeral */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 4,
            padding: '0.2rem 0.6rem',
            background: 'var(--rp-accent-green-tint)',
            border: '0.5px solid var(--rp-accent-green-border)',
            borderRadius: 'var(--rp-radius-md)',
          }}>
            <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rp-accent-green)' }}>
              CGPA
            </span>
            <span style={{ fontFamily: 'var(--rp-font-serif)', fontSize: 20, fontWeight: 600, color: 'var(--rp-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
              {formatGPA(animatedCgpa)}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StickyProgressBar;
