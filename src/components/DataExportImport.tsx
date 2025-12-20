import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { exportGPAReportAsPDF, ExportData } from '@/utils/dataExport';
import { calculateGPA } from '@/utils/gradeUtils';

interface DataExportImportProps {
  semestersData: Record<string, Record<string, any>>;
  totalCourses: number;
  totalCompletedCourses: number;
}

const DataExportImport: React.FC<DataExportImportProps> = ({
  semestersData,
  totalCourses,
  totalCompletedCourses,
}) => {
  // Calculate CGPA for export
  const allCourses = Object.values(semestersData).flatMap(semester =>
    Object.values(semester).map(course => ({
      code: course.code,
      title: course.title,
      creditUnit: course.creditUnit,
      grade: course.grade,
    }))
  );
  const cgpa = calculateGPA(allCourses);

  const exportData: ExportData = {
    semestersData,
    totalCourses,
    totalCompletedCourses,
    cgpa,
    exportDate: new Date().toISOString(),
    version: '1.0.0',
  };

  const handleExportPDF = async () => {
    try {
      await exportGPAReportAsPDF(exportData);
    } catch (error) {
      console.error('PDF export failed:', error);
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-accent/30 to-accent/10 w-full">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <CardTitle className="text-sm sm:text-base flex items-center gap-2">
          <Download className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="whitespace-nowrap">Export Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 pt-0">
        {/* Export Options */}
        <div className="space-y-2 sm:space-y-3">
          <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">Export Your Data</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Export PDF
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Generate a comprehensive PDF of your academic progress.
          </p>
        </div>

        {/* Data Summary */}
        <div className="border-t pt-3 sm:pt-4">
          <h4 className="font-medium text-xs sm:text-sm text-muted-foreground mb-2">Summary</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge variant="outline" className="text-xs">
              {totalCourses} Total Courses
            </Badge>
            <Badge variant="outline">
              {totalCompletedCourses} Graded
            </Badge>
            <Badge variant="outline">
              CGPA: {cgpa.toFixed(2)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataExportImport;
