import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { FileDown, ArrowRight } from 'lucide-react';
import { exportGPAReportAsPDF, ExportData } from '@/utils/dataExport';
import { calculateGPA } from '@/utils/gradeUtils';

interface DataExportImportProps {
  semestersData: Record<string, Record<string, any>>;
  totalCourses: number;
  totalCompletedCourses: number;
  variant?: 'minimal' | 'cta';
}

const DataExportImport: React.FC<DataExportImportProps> = ({
  semestersData,
  totalCourses,
  totalCompletedCourses,
  variant = 'minimal',
}) => {
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

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

  const handleConfirmExport = async () => {
    if (!studentName.trim()) return;
    setIsExporting(true);
    try {
      await exportGPAReportAsPDF(exportData, studentName.trim());
      setStudentName('');
      setShowNameDialog(false);
    } catch (error) {
       console.error('PDF export failed:', error);
    } finally { setIsExporting(false); }
  };

  if (variant === 'cta') {
    return (
      <>
        <Button
          onClick={() => setShowNameDialog(true)}
          disabled={isExporting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <div className="bg-white/20 p-1.5 rounded-lg">
            <FileDown className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm">Download Academic Report</span>
            <span className="text-[10px] opacity-80 font-normal">Generate PDF for {totalCompletedCourses}/{totalCourses} courses</span>
          </div>
          <ArrowRight className="h-4 w-4 ml-auto opacity-50" />
        </Button>

        {/* Dialog reuse */}
        <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
          <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg">Generate PDF Report</DialogTitle>
              <DialogDescription className="text-sm">
                Enter your full name as you want it to appear on the official report.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Full Name (e.g. King Austin)"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmExport()}
                autoFocus
                className="h-12 text-base border-2 focus-visible:ring-emerald-500"
              />
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="ghost" className="h-12" onClick={() => setShowNameDialog(false)}>
                Cancel
              </Button>
              <Button
                className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                onClick={handleConfirmExport}
                disabled={!studentName.trim() || isExporting}
              >
                {isExporting ? 'Generating...' : 'Download Now'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNameDialog(true)}
        disabled={isExporting}
        className="h-7 px-2 text-[10px] font-bold text-primary hover:bg-primary/10 whitespace-nowrap"
      >
        <FileDown className="h-3 w-3 mr-1" />
        {isExporting ? 'Exporting...' : 'PDF'}
      </Button>

      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md rounded-lg p-4">
          <DialogHeader>
            <DialogTitle className="text-sm">Export Report</DialogTitle>
            <DialogDescription className="text-xs">
              Enter your name for the PDF report.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Input
              placeholder="Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmExport()}
              autoFocus
              className="h-8 text-sm"
            />
          </div>
          <DialogFooter className="flex-row gap-2 justify-end">
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => setShowNameDialog(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="text-xs h-8 px-4"
              onClick={handleConfirmExport}
              disabled={!studentName.trim() || isExporting}
            >
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DataExportImport;
