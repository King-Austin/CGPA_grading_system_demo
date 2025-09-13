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
    <Card className="border-primary/20 bg-gradient-to-r from-accent/30 to-accent/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Export Academic Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Export Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Export Your Academic Data</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export as PDF Report
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Generate a comprehensive PDF report of your academic progress and GPA.
          </p>
        </div>

        {/* Data Summary */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-2">Current Academic Summary</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
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
