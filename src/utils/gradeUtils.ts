export interface GradePoint {
  letter: string;
  points: number;
  description: string;
}

export const GRADE_SCALE: GradePoint[] = [
  { letter: 'A', points: 5, description: 'Excellent' },
  { letter: 'B', points: 4, description: 'Very Good' },
  { letter: 'C', points: 3, description: 'Good' },
  { letter: 'D', points: 2, description: 'Fair' },
  { letter: 'E', points: 1, description: 'Pass' },
  { letter: 'F', points: 0, description: 'Fail' },
];

export const GRADE_MAP: Record<string, number> = GRADE_SCALE.reduce((acc, grade) => {
  acc[grade.letter] = grade.points;
  return acc;
}, {} as Record<string, number>);

export const GRADE_LETTERS = GRADE_SCALE.map(grade => grade.letter);

export interface CourseWithGrade {
  code: string;
  title: string;
  creditUnit: number;
  grade?: string;
}

export const calculateGPA = (coursesWithGrades: CourseWithGrade[]): number => {
  let totalGradePoints = 0;
  let totalCreditUnits = 0;

  coursesWithGrades.forEach(course => {
    if (course.grade && GRADE_MAP[course.grade] !== undefined) {
      totalGradePoints += GRADE_MAP[course.grade] * course.creditUnit;
      totalCreditUnits += course.creditUnit;
    }
  });

  return totalCreditUnits > 0 ? totalGradePoints / totalCreditUnits : 0;
};

export const formatGPA = (gpa: number): string => {
  return gpa.toFixed(2);
};

export const getGPAClass = (gpa: number): { class: string; description: string } => {
  if (gpa >= 4.5) return { class: 'First Class', description: 'Excellent' };
  if (gpa >= 3.5) return { class: 'Second Class Upper', description: 'Very Good' };
  if (gpa >= 2.5) return { class: 'Second Class Lower', description: 'Good' };
  if (gpa >= 1.5) return { class: 'Third Class', description: 'Fair' };
  if (gpa >= 1.0) return { class: 'Pass', description: 'Pass' };
  return { class: 'Fail', description: 'Fail' };
};

export const getGPAColor = (gpa: number): string => {
  if (gpa >= 4.5) return 'text-success';
  if (gpa >= 3.5) return 'text-primary';
  if (gpa >= 2.5) return 'text-warning';
  return 'text-destructive';
};