// Physics Department Course Data
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
  { code: 'MAT101', title: 'General Mathematics', creditUnit: 3, year: 1, semester: 1, category: 'core' },
  { code: 'PHY101', title: 'General Physics', creditUnit: 3, year: 1, semester: 1, category: 'core' },
  { code: 'ICH111', title: 'Inorganic Chemistry', creditUnit: 2, year: 1, semester: 1, category: 'core' },
  { code: 'GST101', title: 'Use of English', creditUnit: 2, year: 1, semester: 1, category: 'gss' },
  { code: 'GST103', title: 'General Studies', creditUnit: 2, year: 1, semester: 1, category: 'gss' },

  // YEAR ONE (100 LEVEL) - Second Semester
  { code: 'MAT102', title: 'General Mathematics II', creditUnit: 3, year: 1, semester: 2, category: 'core' },
  { code: 'PHY102', title: 'General Physics II', creditUnit: 3, year: 1, semester: 2, category: 'core' },
  { code: 'ICH102', title: 'Physical Chemistry', creditUnit: 2, year: 1, semester: 2, category: 'core' },
  { code: 'GST102', title: 'Use of English II', creditUnit: 2, year: 1, semester: 2, category: 'gss' },
  { code: 'GST104', title: 'General Studies', creditUnit: 2, year: 1, semester: 2, category: 'gss' },

  // YEAR TWO (200 LEVEL) - First Semester
  { code: 'MAT201', title: 'Mathematical Methods', creditUnit: 3, year: 2, semester: 1, category: 'core' },
  { code: 'PHY201', title: 'Electricity & Magnetism', creditUnit: 3, year: 2, semester: 1, category: 'core' },
  { code: 'ICH201', title: 'Organic Chemistry I', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'STA201', title: 'Statistics', creditUnit: 2, year: 2, semester: 1, category: 'core' },

  // YEAR TWO (200 LEVEL) - Second Semester
  { code: 'MAT202', title: 'Differential Equations', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'PHY202', title: 'Waves & Optics', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'ICH202', title: 'Organic Chemistry II', creditUnit: 2, year: 2, semester: 2, category: 'core' },
  { code: 'CSC201', title: 'Computer Programming', creditUnit: 2, year: 2, semester: 2, category: 'core' },

  // YEAR THREE (300 LEVEL) - First Semester
  { code: 'MAT301', title: 'Advanced Mathematics I', creditUnit: 3, year: 3, semester: 1, category: 'core' },
  { code: 'PHY301', title: 'Modern Physics', creditUnit: 3, year: 3, semester: 1, category: 'core' },
  { code: 'PHY303', title: 'Electronics I', creditUnit: 3, year: 3, semester: 1, category: 'core' },

  // YEAR THREE (300 LEVEL) - Second Semester
  { code: 'MAT302', title: 'Advanced Mathematics II', creditUnit: 3, year: 3, semester: 2, category: 'core' },
  { code: 'PHY304', title: 'Electronics II', creditUnit: 3, year: 3, semester: 2, category: 'core' },
  { code: 'PHY306', title: 'Solid State Physics', creditUnit: 3, year: 3, semester: 2, category: 'core' },

  // YEAR FOUR (400 LEVEL) - First Semester
  { code: 'PHY401', title: 'Nuclear Physics', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'PHY403', title: 'Computational Methods', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'PHY405', title: 'Research Methods', creditUnit: 2, year: 4, semester: 1, category: 'core' },

  // YEAR FOUR (400 LEVEL) - Second Semester
  { code: 'SIW400', title: 'Industrial Training (SIWES)', creditUnit: 6, year: 4, semester: 2, category: 'core' },

  // YEAR FIVE (500 LEVEL) - First Semester
  { code: 'PHY501', title: 'Advanced Topics', creditUnit: 3, year: 5, semester: 1, category: 'core' },
  { code: 'PHY503', title: 'Seminar', creditUnit: 2, year: 5, semester: 1, category: 'core' },
  { code: 'PHY505', title: 'Elective', creditUnit: 2, year: 5, semester: 1, category: 'elective' },

  // YEAR FIVE (500 LEVEL) - Second Semester
  { code: 'PHY502', title: 'Project', creditUnit: 6, year: 5, semester: 2, category: 'core' },
  { code: 'ENT500', title: 'Entrepreneurship', creditUnit: 2, year: 5, semester: 2, category: 'gss' },
];

export const getCoursesByYearAndSemester = (year: number, semester: number): Course[] => {
  return ALL_COURSES.filter(course => course.year === year && course.semester === semester);
};

export const getCourseByCode = (code: string): Course | undefined => {
  return ALL_COURSES.find(course => course.code === code);
};