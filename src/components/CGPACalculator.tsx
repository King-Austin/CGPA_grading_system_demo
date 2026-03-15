import React, { useEffect, useRef } from 'react';
import { calculateGPA, formatGPA, getGPAClass, getGPAColor, CourseWithGrade } from '@/utils/gradeUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, BookCheck, Award } from 'lucide-react';
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

  const getGradient = (gpa: number) => {
    if (gpa >= 4.5) return 'from-emerald-500 to-green-500';
    if (gpa >= 3.5) return 'from-blue-500 to-indigo-500';
    if (gpa >= 2.5) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const DIST_ORDER = ['A','B','C','D','E','F'];
  const DIST_COLORS: Record<string,string> = { A:'bg-emerald-500',B:'bg-green-400',C:'bg-amber-400',D:'bg-orange-400',E:'bg-orange-500',F:'bg-red-500' };
  const totalGraded = Object.values(gradeDistribution).reduce((a,b) => a+b, 0);

  return (
    <Card className="overflow-hidden border-none shadow-none bg-muted/20">
      <CardContent className="p-2 space-y-2">
        {/* Row 1: CGPA Big Info */}
        <div className={`flex items-center justify-between p-2 rounded-md bg-gradient-to-r ${getGradient(cgpa)} text-white`}>
          <div className="flex items-center gap-2">
             <div className="p-1.5 rounded-full bg-white/20">
               {getClassIcon(gpaClass.class)}
             </div>
             <div>
               <div className="text-[10px] font-bold opacity-80 leading-none mb-0.5 uppercase tracking-tighter">Your CGPA</div>
               <div className="text-xs font-medium leading-none opacity-90">{gpaClass.class}</div>
             </div>
          </div>
          <div className="text-3xl font-black tabular-nums tracking-tighter">
            {formatGPA(animatedCgpa)}
          </div>
        </div>

        {/* Row 2: Progress & Distribution (Side by Side) */}
        <div className="grid grid-cols-2 gap-2">
           <div className="bg-background/60 p-1.5 rounded border border-border/40">
              <div className="flex justify-between items-center text-[9px] mb-1 font-bold text-muted-foreground uppercase">
                <span>Progress</span>
                <span>{Math.round(animatedProgress)}%</span>
              </div>
              <Progress value={animatedProgress} className="h-1" />
           </div>
           <div className="bg-background/60 p-1.5 rounded border border-border/40 flex flex-col justify-center">
              <div className="flex h-1.5 rounded-full overflow-hidden gap-[0.5px] items-center">
                {totalGraded > 0 ? (
                  DIST_ORDER.filter(g => gradeDistribution[g]).map(g => (
                    <div 
                      key={g} 
                      className={`${DIST_COLORS[g]} h-full`} 
                      style={{ width: `${(gradeDistribution[g] / totalGraded) * 100}%` }}
                    />
                  ))
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
              <div className="flex justify-between items-center text-[9px] mt-1 font-bold text-muted-foreground uppercase">
                <span>Distribution</span>
                <span>{totalGraded} Graded</span>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;