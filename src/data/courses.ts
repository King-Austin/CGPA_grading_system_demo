// Electronics and Computer Engineering Department Course Data
export interface Course {
  code: string;
  title: string;
  creditUnit: number;
  year: number;
  semester: number;
  category?: 'core' | 'elective' | 'faculty' | 'gss';
}

export const ALL_COURSES: Course[] = [
  // YEAR ONE (100 LEVEL) - First Semester
  { code: 'MAT101', title: 'General Mathematics', creditUnit: 3, year: 1, semester: 1, category: 'faculty' },
  { code: 'PHY101', title: 'General Physics', creditUnit: 3, year: 1, semester: 1, category: 'faculty' },
  { code: 'ICH111', title: 'Inorganic Chemistry', creditUnit: 2, year: 1, semester: 1, category: 'faculty' },
  { code: 'ICH101', title: 'Organic Chemistry', creditUnit: 2, year: 1, semester: 1, category: 'faculty' },
  { code: 'FEG101', title: 'Engineering Mathematics', creditUnit: 3, year: 1, semester: 1, category: 'faculty' },
  { code: 'PHY107', title: 'Practical Physics', creditUnit: 1, year: 1, semester: 1, category: 'faculty' },
  { code: 'BUS101', title: 'Introduction To Business', creditUnit: 2, year: 1, semester: 1, category: 'faculty' },
  { code: 'GST101', title: 'English', creditUnit: 1, year: 1, semester: 1, category: 'gss' },
  { code: 'GST109', title: 'Igbo', creditUnit: 1, year: 1, semester: 1, category: 'gss' },
  { code: 'GST107', title: 'Nigeria People And Culture', creditUnit: 2, year: 1, semester: 1, category: 'gss' },
  { code: 'GST105', title: 'Humanity', creditUnit: 2, year: 1, semester: 1, category: 'gss' },

  // YEAR ONE (100 LEVEL) - Second Semester
  { code: 'MAT102', title: 'General Mathematics 2', creditUnit: 3, year: 1, semester: 2, category: 'faculty' },
  { code: 'PHY102', title: 'General Physics 2', creditUnit: 3, year: 1, semester: 2, category: 'faculty' },
  { code: 'ICH102', title: 'Physical Chemistry', creditUnit: 2, year: 1, semester: 2, category: 'faculty' },
  { code: 'ICH112', title: 'Practical Chemistry', creditUnit: 2, year: 1, semester: 2, category: 'faculty' },
  { code: 'PHY108', title: 'Practical Physics', creditUnit: 1, year: 1, semester: 2, category: 'faculty' },
  { code: 'FEG102', title: 'Engineering Mathematics 2', creditUnit: 3, year: 1, semester: 2, category: 'faculty' },
  { code: 'FEG103', title: 'Circuit Theory 1', creditUnit: 2, year: 1, semester: 2, category: 'faculty' },
  { code: 'GST102', title: 'English', creditUnit: 1, year: 1, semester: 2, category: 'gss' },
  { code: 'GST110', title: 'Igbo', creditUnit: 1, year: 1, semester: 2, category: 'gss' },
  { code: 'GST106', title: 'Social Science', creditUnit: 2, year: 1, semester: 2, category: 'gss' },

  // YEAR TWO (200 LEVEL) - First Semester
  { code: 'FEG201', title: 'Basic Electricity 1', creditUnit: 3, year: 2, semester: 1, category: 'faculty' },
  { code: 'FEG211', title: 'Applied Mechanics', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'FEG250', title: 'Principles Of Material', creditUnit: 3, year: 2, semester: 1, category: 'faculty' },
  { code: 'FEG221', title: 'Fluid Mechanics', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'FEG213', title: 'Engineering Drawing', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'ICH221', title: 'Applied Chemistry', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'CSC201', title: 'Computer Programming 1', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'MAT201', title: 'Linear Algebra', creditUnit: 3, year: 2, semester: 1, category: 'faculty' },
  { code: 'FEG281', title: 'Workshop Practice', creditUnit: 2, year: 2, semester: 1, category: 'faculty' },
  { code: 'CDS200', title: 'Carrier Development Skill', creditUnit: 0, year: 2, semester: 1, category: 'faculty' },


  // YEAR TWO (200 LEVEL) - Second Semester
  { code: 'MAT202', title: 'Elementary Mathematics', creditUnit: 3, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG202', title: 'Basic Electricity 2', creditUnit: 3, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG212', title: 'Applied Mechanics 2', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG242', title: 'Thermodynamics', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG282', title: 'Workshop Practice 2', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG215', title: 'Strength Of Material', creditUnit: 3, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG214', title: 'Engineering Drawing 2', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'BUS204', title: 'Principles Of Management', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'FEG280', title: 'Engineers In Society', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },
  { code: 'CSC202', title: 'Computer Programming 2', creditUnit: 2, year: 2, semester: 2, category: 'faculty' },


  // YEAR THREE (300 LEVEL) - First Semester
  { code: 'GST301', title: 'Entrepreneurship', creditUnit: 1, year: 3, semester: 1, category: 'gss' },
  { code: 'ECE333', title: 'Digital System 1', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'ECE331', title: 'Signals And Systems', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'ECE323', title: 'Electronic Devices And Circuits', creditUnit: 3, year: 3, semester: 1, category: 'faculty' },
  { code: 'ECE321', title: 'Principles Of Telecommunications 1', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'ELE353', title: 'Power System', creditUnit: 3, year: 3, semester: 1, category: 'faculty' },
  { code: 'ELE343', title: 'Electromechanical Device And Machine', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'ELE341', title: 'Electromagnetic Field And Wave', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'ELE311', title: 'Circuit Theory 1', creditUnit: 2, year: 3, semester: 1, category: 'faculty' },
  { code: 'FEG303', title: 'Engineering Mathematics 3', creditUnit: 3, year: 3, semester: 1, category: 'faculty' },

  // YEAR THREE (300 LEVEL) - Second Semester
  { code: 'ELE312', title: 'Circuit Theory 3', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ELE372', title: 'Instrumentation And Measurement', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ELE382', title: 'Feedback And Control System', creditUnit: 3, year: 3, semester: 2, category: 'faculty' },
  { code: 'ELE344', title: 'Electromechanical Device And Machine 2', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ELE342', title: 'Electrodynamics', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ECE328', title: 'Electronics Device And Circuit 2', creditUnit: 3, year: 3, semester: 2, category: 'faculty' },
  { code: 'ECE334', title: 'Digital System Design 2', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ECE322', title: 'Principles Of Telecommunications 2', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ECE326', title: 'Physical Electronics', creditUnit: 3, year: 3, semester: 2, category: 'faculty' },

  // YEAR FOUR (400 LEVEL) - First Semester
  { code: 'ECE427', title: 'Advanced Circuit Technique', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
  { code: 'ECE431', title: 'Fundamental Of Digital Communication', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
  { code: 'ELE403', title: 'Circuit Theory IV', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
  { code: 'ELE473', title: 'Instrumentation And Measurements', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
  { code: 'ECE421', title: 'Assembly Language Programming', creditUnit: 2, year: 4, semester: 1, category: 'faculty' },
  { code: 'ECE405', title: 'Microprocessors And Microcomputers', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
  { code: 'CVE421', title: 'Engineering Contract And Specification', creditUnit: 2, year: 4, semester: 1, category: 'faculty' },
  { code: 'FEG404', title: 'Engineering Mathematics IV', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },

  // YEAR FOUR (400 LEVEL) - Second Semester
  { code: 'FEG400', title: 'Industrial Training (SIWES)', creditUnit: 6, year: 4, semester: 2, category: 'faculty' },

  // YEAR FIVE (500 LEVEL) - First Semester
  { code: 'ECE505', title: 'Computer Aided Design', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE537', title: 'Digital Signal Processing', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE517', title: 'Real Time Computing And Control', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE527', title: 'Solid State Electronics', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE539', title: 'Computer Architecture And Organisation', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE541', title: 'AI And Robotics', creditUnit: 3, year: 5, semester: 1, category: 'faculty' },
  { code: 'ECE500-SEM', title: 'Seminar', creditUnit: 2, year: 5, semester: 1, category: 'faculty' },
];

export const getCoursesByYearAndSemester = (year: number, semester: number): Course[] => {
  return ALL_COURSES.filter(course => course.year === year && course.semester === semester);
};

export const getCourseByCode = (code: string): Course | undefined => {
  return ALL_COURSES.find(course => course.code === code);
};