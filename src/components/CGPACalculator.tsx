import React from 'react';
import { calculateGPA, formatGPA, getGPAClass, getGPAColor, CourseWithGrade } from '@/utils/gradeUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, BookCheck, Award } from 'lucide-react';

interface CGPACalculatorProps {
  allSemestersData: Record<string, Record<string, CourseWithGrade & { grade?: string }>>;
}

const CGPACalculator: React.FC<CGPACalculatorProps> = ({ allSemestersData }) => {
  // Flatten all courses from all semesters
  const allCourses: CourseWithGrade[] = Object.values(allSemestersData)
    .flatMap(semester => Object.values(semester))
    .map(course => ({
      code: course.code,
      title: course.title,
      creditUnit: course.creditUnit,
      grade: course.grade,
    }));

  const cgpa = calculateGPA(allCourses);
  const gpaClass = getGPAClass(cgpa);
  
  const totalCredits = allCourses.reduce((sum, course) => sum + course.creditUnit, 0);
  const completedCredits = allCourses.filter(course => course.grade).reduce((sum, course) => sum + course.creditUnit, 0);
  const progressPercentage = totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;

  // Calculate grade distribution
  const gradeDistribution = allCourses
    .filter(course => course.grade)
    .reduce((acc, course) => {
      const grade = course.grade!;
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const getClassIcon = (className: string) => {
    if (className.includes('First')) return <Trophy className="h-5 w-5" />;
    if (className.includes('Second Class Upper')) return <Award className="h-5 w-5" />;
    if (className.includes('Second Class Lower')) return <Target className="h-5 w-5" />;
    return <BookCheck className="h-5 w-5" />;
  };

  const getClassGradient = (gpa: number) => {
    if (gpa >= 4.5) return 'bg-gradient-to-r from-success to-success-light';
    if (gpa >= 3.5) return 'bg-gradient-to-r from-primary to-primary-light';
    if (gpa >= 2.5) return 'bg-gradient-to-r from-warning to-warning-light';
    return 'bg-gradient-to-r from-destructive to-destructive';
  };

  return (
    <Card className="overflow-hidden shadow-xl border-2 border-primary/20">
      <CardHeader className={`text-white ${getClassGradient(cgpa)}`}>
        <CardTitle className="text-lg sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
          {getClassIcon(gpaClass.class)}
          Cumulative Grade Point Average (CGPA)
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* CGPA Display */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <div className={`text-5xl sm:text-5xl lg:text-6xl font-bold ${getGPAColor(cgpa)} mb-2`}>
                {formatGPA(cgpa)}
              </div>
              <Badge 
                variant="outline" 
                className={`text-sm sm:text-lg px-3 sm:px-4 py-2 sm:py-2 ${
                  cgpa >= 4.5 ? 'border-success text-success' :
                  cgpa >= 3.5 ? 'border-primary text-primary' :
                  cgpa >= 2.5 ? 'border-warning text-warning' :
                  'border-destructive text-destructive'
                }`}
              >
                {gpaClass.class}
              </Badge>
              <p className="text-sm sm:text-sm text-muted-foreground mt-2">{gpaClass.description}</p>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm sm:text-sm">
                <span className="text-muted-foreground">Academic Progress</span>
                <span className="font-medium">{completedCredits}/{totalCredits} Credits</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {Math.round(progressPercentage)}% completed
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-card-foreground text-base sm:text-base mb-3 sm:mb-3">Academic Statistics</h3>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-muted/50 rounded-lg p-3 sm:p-3 text-center">
                <div className="text-lg sm:text-lg font-bold text-card-foreground">{allCourses.length}</div>
                <div className="text-xs text-muted-foreground">Total Courses</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 sm:p-3 text-center">
                <div className="text-lg sm:text-lg font-bold text-card-foreground">
                  {allCourses.filter(c => c.grade).length}
                </div>
                <div className="text-xs text-muted-foreground">Graded Courses</div>
              </div>
            </div>

            {/* Grade Distribution */}
            {Object.keys(gradeDistribution).length > 0 && (
              <div>
                <h4 className="text-sm sm:text-sm font-medium text-muted-foreground mb-2">Grade Distribution</h4>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(gradeDistribution).map(([grade, count]) => (
                    <Badge key={grade} variant="outline" className="text-xs">
                      {grade}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {cgpa === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <BookCheck className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Start adding grades to see your CGPA calculation.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;