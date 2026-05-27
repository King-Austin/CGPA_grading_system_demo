import React, { useEffect, useRef } from 'react';
import { calculateGPA, formatGPA, getGPAClass, CourseWithGrade } from '@/utils/gradeUtils';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import confetti from 'canvas-confetti';

interface CGPACalculatorProps {
  allSemestersData: Record<string, Record<string, CourseWithGrade & { grade?: string }>>;
}

const CGPACalculator: React.FC<CGPACalculatorProps> = ({ allSemestersData }) => {
  const allCourses: CourseWithGrade[] = Object.values(allSemestersData)
    .flatMap(sem => Object.values(sem))
    .map(c => ({ code: c.code, title: c.title, creditUnit: c.creditUnit, grade: c.grade }));

  const cgpa = calculateGPA(allCourses);
  const animatedCgpa = useAnimatedCounter(cgpa, 650);
  const gpaClass = getGPAClass(cgpa);

  const wasFirstClass = useRef(false);
  useEffect(() => {
    const isFirstClass = cgpa >= 4.5;
    if (isFirstClass && !wasFirstClass.current) {
      const fire = (x: number) => confetti({ particleCount: 60, spread: 50, origin: { x, y: 0.8 }, zIndex: 9999 });
      fire(0.3); setTimeout(() => fire(0.7), 150);
    }
    wasFirstClass.current = isFirstClass;
  }, [cgpa]);

  const totalCredits = allCourses.reduce((s, c) => s + c.creditUnit, 0);
  const completedCredits = allCourses.filter(c => c.grade).reduce((s, c) => s + c.creditUnit, 0);
  const progressPct = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;
  const animatedProgress = useAnimatedCounter(progressPct, 600);

  const gradeDistribution = allCourses.filter(c => c.grade).reduce((acc, c) => {
    const g = c.grade!;
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getClassIcon = (cls: string) => {
    const props = { className: "h-3 w-3" };
    if (cls.includes('First')) return <Trophy {...props} />;
    if (cls.includes('Upper')) return <Award {...props} />;
    if (cls.includes('Lower')) return <Target {...props} />;
    return <BookCheck {...props} />;
  };

  const getSolidColor = (gpa: number) => {
    if (gpa >= 4.5) return 'bg-emerald-600';
    if (gpa >= 3.5) return 'bg-blue-600';
    if (gpa >= 2.5) return 'bg-amber-600';
    return 'bg-red-600';
  };

  const DIST_ORDER = ['A','B','C','D','E','F'];
  const DIST_COLORS: Record<string,string> = { A:'bg-emerald-500',B:'bg-green-400',C:'bg-amber-400',D:'bg-orange-400',E:'bg-orange-500',F:'bg-red-500' };
  const totalGraded = Object.values(gradeDistribution).reduce((a,b) => a+b, 0);

  return (
    <div className="rp-card-raised" style={{ padding: '1.25rem 1.5rem' }}>
      {/* Eyebrow */}
      <p className="rp-eyebrow" style={{ marginBottom: '0.75rem' }}>01 — Cumulative GPA</p>

      {/* Main CGPA row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{
            fontFamily: 'var(--rp-font-serif)',
            fontSize: 'clamp(52px, 10vw, 72px)',
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: 'var(--rp-text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {formatGPA(animatedCgpa)}
          </div>
          <div className="rp-gpa-class-em">
            {gpaClass.class}
          </div>
        </div>

        {/* Progress ring / icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.35rem',
        }}>
          <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 10, color: 'var(--rp-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Credits graded
          </span>
          <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 22, fontWeight: 500, color: 'var(--rp-text-primary)', fontVariantNumeric: 'tabular-nums' }}>
            {completedCredits}<span style={{ fontSize: 13, color: 'var(--rp-text-muted)' }}>/{totalCredits}</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="rp-bar-track">
        <div className="rp-bar-fill" style={{ width: `${animatedProgress}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
        <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 10, color: 'var(--rp-text-ghost)' }}>0</span>
        <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 10, color: 'var(--rp-text-ghost)', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(animatedProgress)}% complete
        </span>
        <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 10, color: 'var(--rp-text-ghost)' }}>5.0</span>
      </div>

      {/* Grade distribution */}
      {totalGraded > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {DIST_ORDER.filter(g => gradeDistribution[g]).map(g => (
            <div key={g} className="rp-card-tinted" style={{ padding: '0.25rem 0.6rem', borderRadius: 'var(--rp-radius-sm)' }}>
              <span style={{ fontFamily: 'var(--rp-font-mono)', fontSize: 10, color: 'var(--rp-accent-green)', fontWeight: 500 }}>
                {g} <span style={{ color: 'var(--rp-text-muted)' }}>{gradeDistribution[g]}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CGPACalculator;