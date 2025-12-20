import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

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

  const handleExportClick = () => {
    setShowNameDialog(true);
  };

  const handleConfirmExport = async () => {
    if (!studentName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    setIsExporting(true);
    try {
      await exportGPAReportAsPDF(exportData, studentName.trim());
      setStudentName('');
      setShowNameDialog(false);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmExport();
    }
  };

  return (
    <>
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
                onClick={handleExportClick}
                disabled={isExporting}
                className="flex items-center gap-1.5 h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Generate a professional PDF report with your academic record and grades.
            </p>
          </div>

          {/* Data Summary */}
          <div className="border-t pt-3 sm:pt-4">
            <h4 className="font-medium text-xs sm:text-sm text-muted-foreground mb-2">Summary</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <Badge variant="outline" className="text-xs">
                {totalCourses} Total Courses
              </Badge>
              <Badge variant="outline" className="text-xs">
                {totalCompletedCourses} Graded
              </Badge>
              <Badge variant="outline" className="text-xs">
                CGPA: {cgpa.toFixed(2)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Name Dialog */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Academic Report</DialogTitle>
            <DialogDescription>
              Please enter your name to include in the PDF report.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                className="h-10"
              />
              <p className="text-xs text-muted-foreground mt-2">
                This will appear on your official academic grade report from the Department of Electronics and Computer Engineering.
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowNameDialog(false);
                setStudentName('');
              }}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmExport}
              disabled={!studentName.trim() || isExporting}
              className="bg-primary hover:bg-primary-dark"
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataExportImport;
