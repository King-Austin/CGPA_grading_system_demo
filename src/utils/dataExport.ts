import jsPDF from 'jspdf';
import { GRADE_SCALE } from './gradeUtils';

export interface ExportData {
  semestersData: Record<string, Record<string, any>>;
  totalCourses: number;
  totalCompletedCourses: number;
  cgpa: number;
  exportDate: string;
  version: string;
}

export interface CourseWithGrade {
  code: string;
  title: string;
  creditUnit: number;
  grade?: string;
  category?: string;
}

// Helper function to get grade points
const getGradePoints = (grade?: string): number => {
  if (!grade) return 0;
  const gradeObj = GRADE_SCALE.find(g => g.letter === grade);
  return gradeObj?.points || 0;
};

// Helper function to get year ordinal
const getYearOrdinal = (year: number): string => {
  const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
  return ordinals[year] || `Year ${year}`;
};

// Improved PDF export with student name
export const exportGPAReportAsPDF = async (
  data: ExportData,
  studentName: string = 'Student'
): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Header - Institution
  pdf.setFontSize(14);
  pdf.setTextColor(0, 51, 102); // Dark blue
  pdf.setFont('helvetica', 'bold');
  pdf.text('NNAMDI AZIKIWE UNIVERSITY, AWKA', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 6;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Department of Electronics and Computer Engineering', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;

  // Title
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Academic Grade Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 12;

  // Student Information Box
  pdf.setDrawColor(0, 51, 102);
  pdf.setLineWidth(0.5);
  pdf.rect(margin, yPosition - 2, contentWidth, 18);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Student Name:', margin + 5, yPosition + 3);
  pdf.setFont('helvetica', 'normal');
  pdf.text(studentName, margin + 40, yPosition + 3);
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('Report Date:', margin + 5, yPosition + 9);
  pdf.setFont('helvetica', 'normal');
  pdf.text(new Date(data.exportDate).toLocaleDateString(), margin + 40, yPosition + 9);

  yPosition += 24;

  // CGPA Summary Section
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 51, 102);
  pdf.text('Cumulative Grade Point Average (CGPA)', margin, yPosition);
  yPosition += 8;

  // CGPA Box
  pdf.setDrawColor(0, 51, 102);
  pdf.setFillColor(230, 240, 250);
  pdf.rect(margin, yPosition - 5, contentWidth, 12, 'FD');
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 51, 102);
  pdf.text(`${data.cgpa.toFixed(2)}`, margin + 10, yPosition + 3);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Total Courses: ${data.totalCourses} | Graded: ${data.totalCompletedCourses}`, margin + 80, yPosition + 3);

  yPosition += 20;

  // Course Details by Semester
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 51, 102);
  pdf.text('Academic Record by Semester', margin, yPosition);
  yPosition += 8;

  Object.entries(data.semestersData)
    .sort((a, b) => {
      const [yearA, semA] = a[0].split('-').map(Number);
      const [yearB, semB] = b[0].split('-').map(Number);
      return yearA === yearB ? semA - semB : yearA - yearB;
    })
    .forEach(([semesterKey, courses], index) => {
      const courseEntries = Object.values(courses as Record<string, CourseWithGrade>);
      if (courseEntries.length === 0) return;

      const requiredHeight = courseEntries.length * 7 + 15;
      if (yPosition + requiredHeight > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }

      // Semester Header
      const [year, semester] = semesterKey.split('-');
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(0, 51, 102);
      pdf.rect(margin, yPosition - 3, contentWidth, 6, 'F');
      pdf.text(`${getYearOrdinal(Number(year))} Year - Semester ${semester}`, margin + 5, yPosition + 1);
      yPosition += 8;

      // Table Header
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.setDrawColor(200, 200, 200);

      const colPositions = {
        code: margin + 3,
        title: margin + 25,
        credits: margin + 100,
        grade: margin + 120,
        points: margin + 140,
      };

      pdf.text('Code', colPositions.code, yPosition);
      pdf.text('Course Title', colPositions.title, yPosition);
      pdf.text('Credit', colPositions.credits, yPosition);
      pdf.text('Grade', colPositions.grade, yPosition);
      pdf.text('Points', colPositions.points, yPosition);
      yPosition += 5;

      // Separator line
      pdf.setDrawColor(100, 100, 100);
      pdf.line(margin, yPosition - 1, margin + contentWidth, yPosition - 1);
      yPosition += 2;

      // Course rows
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      courseEntries.forEach((course: CourseWithGrade) => {
        const gradePoints = getGradePoints(course.grade);
        
        pdf.text(course.code, colPositions.code, yPosition);
        
        // Title with text wrapping
        const titleWidth = 75;
        const splitTitle = pdf.splitTextToSize(course.title, titleWidth);
        pdf.text(splitTitle, colPositions.title, yPosition);
        
        pdf.text(course.creditUnit.toString(), colPositions.credits, yPosition);
        pdf.text(course.grade || '-', colPositions.grade, yPosition);
        pdf.text(gradePoints > 0 ? gradePoints.toFixed(2) : '-', colPositions.points, yPosition);
        
        yPosition += 6;
      });

      yPosition += 3;
    });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(100, 100, 100);
  pdf.setFont('helvetica', 'italic');
  
  const footerY = pageHeight - 10;
  pdf.text('Generated by GPA/CGPA Tracker - Department of Electronics and Computer Engineering', pageWidth / 2, footerY, { align: 'center' });
  
  // Page numbers
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
  }

  // Save the PDF with student name
  const fileName = `${studentName.replace(/\s+/g, '_')}_GPA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
