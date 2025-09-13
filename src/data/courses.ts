// Course data extracted from the academic records provided
export interface Course {
  code: string;
  title: string;
  creditUnit: number;
  year: number;
  semester: number;
  category?: 'core' | 'elective' | 'faculty' | 'gss';
}

export const ALL_COURSES: Course[] = [
  // First Year - First Semester
  { code: 'GSS 101', title: 'Use of English I', creditUnit: 1, year: 1, semester: 1, category: 'gss' },
  { code: 'GSS 105', title: 'Humanities', creditUnit: 2, year: 1, semester: 1, category: 'gss' },
  { code: 'GSS 107', title: 'Nigerian Peoples and Culture', creditUnit: 2, year: 1, semester: 1, category: 'gss' },
  { code: 'GSS 109', title: 'Basic Igbo Studies I', creditUnit: 1, year: 1, semester: 1, category: 'gss' },

  { code: 'MAT 101', title: 'Elementary Mathematics I', creditUnit: 3, year: 1, semester: 1, category: 'core' },
  { code: 'PHY 101', title: 'General Physics I', creditUnit: 3, year: 1, semester: 1, category: 'core' },
  { code: 'PHY 107', title: 'General Physics Laboratory I', creditUnit: 1, year: 1, semester: 1, category: 'core' },
  { code: 'ICH 101', title: 'Basic Organic Chemistry', creditUnit: 2, year: 1, semester: 1, category: 'core' },
  { code: 'ICH 111', title: 'General Basic Inorganic Chemistry', creditUnit: 2, year: 1, semester: 1, category: 'core' },
  { code: 'BUS 101', title: 'Introduction to Business', creditUnit: 2, year: 1, semester: 1, category: 'faculty' },
  { code: 'FEG 101', title: 'Engineering Mathematics I', creditUnit: 3, year: 1, semester: 1, category: 'core' },

  // First Year - Second Semester
  { code: 'GSS 102', title: 'Use of English II', creditUnit: 1, year: 1, semester: 2, category: 'gss' },
  { code: 'GSS 106', title: 'Social Science', creditUnit: 2, year: 1, semester: 2, category: 'gss' },
  { code: 'GSS 110', title: 'Basic Igbo Studies II', creditUnit: 1, year: 1, semester: 2, category: 'gss' },
  { code: 'MAT 102', title: 'Elementary Mathematics II', creditUnit: 3, year: 1, semester: 2, category: 'core' },
  { code: 'PHY 102', title: 'General Physics II', creditUnit: 3, year: 1, semester: 2, category: 'core' },
  { code: 'PHY 108', title: 'General Physics Laboratory II', creditUnit: 1, year: 1, semester: 2, category: 'core' },
  { code: 'ICH 102', title: 'Basic General Physical Chemistry', creditUnit: 2, year: 1, semester: 2, category: 'core' },
  { code: 'ICH 112', title: 'Basic Practical Chemistry', creditUnit: 2, year: 1, semester: 2, category: 'core' },
  { code: 'FEG 102', title: 'Engineering Mathematics II', creditUnit: 3, year: 1, semester: 2, category: 'core' },
  { code: 'FEG 103', title: 'Circuit Theory I', creditUnit: 2, year: 1, semester: 2, category: 'core' },


  // Second Year - First Semester
  { code: 'MAT 201', title: 'Linear Algebra', creditUnit: 3, year: 2, semester: 1, category: 'core' },
  { code: 'CSE 201', title: 'Computer Programming I', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'ICH 221', title: 'General Physical Chemistry', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 281', title: 'Workshop Practice', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 201', title: 'Applied Electricity I', creditUnit: 3, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 211', title: 'Applied Mechanics', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 213', title: 'Engineering Drawing I', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 221', title: 'Fluid Mechanics', creditUnit: 2, year: 2, semester: 1, category: 'core' },
  { code: 'FEG 250', title: 'Material Science', creditUnit: 3, year: 2, semester: 1, category: 'core' },
  

  // Second Year - Second Semester
  { code: 'MAT 202', title: 'Elementary Differential Equations', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'CSE 202', title: 'Computer Programming II', creditUnit: 2, year: 2, semester: 2, category: 'core' },
  { code: 'BUS 204', title: 'Principles Management', creditUnit: 2, year: 2, semester: 2, category: 'elective' },
  { code: 'FEG 202', title: 'Applied Electricity II', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 212', title: 'Applied Mechanics II (Dynamics)', creditUnit: 2, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 214', title: 'Engineering Drawing II', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 215', title: 'Strength of Materials II', creditUnit: 3, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 242', title: 'Thermodynamics', creditUnit: 2, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 280', title: 'Engineers in Society', creditUnit: 2, year: 2, semester: 2, category: 'core' },
  { code: 'FEG 282', title: 'Workshop Practice II', creditUnit: 2, year: 2, semester: 2, category: 'core' },


  // Third Year - First Semester
  { code: 'FEG 303', title: 'Engineering Mathematics 3', creditUnit: 3, year: 3, semester: 1, category: 'faculty' },
  { code: 'ELE 343', title: 'Electro-Mechanical Devices and Machine', creditUnit: 2, year: 3, semester: 1, category: 'core' },
  { code: 'ELE 311', title: 'Circuit Theory 1', creditUnit: 2, year: 3, semester: 1, category: 'core' },
  { code: 'ECE 323', title: 'Electronic Devices and Circuits', creditUnit: 2, year: 3, semester: 1, category: 'core' },
  { code: 'ELE 353', title: 'Power Systems', creditUnit: 3, year: 3, semester: 1, category: 'core' },
  { code: 'ELE 341', title: 'Electromagnetic Fields and Waves', creditUnit: 3, year: 3, semester: 1, category: 'core' },
  { code: 'ECE 331', title: 'Signals and Systems', creditUnit: 2, year: 3, semester: 1, category: 'core' },
  { code: 'ECE 321', title: 'Telecommunications 1', creditUnit: 2, year: 3, semester: 1, category: 'core' },
  { code: 'ECE 333', title: 'Digital System Design 1', creditUnit: 2, year: 3, semester: 1, category: 'core' },

  // Third Year - Second Semester
  { code: 'FEG 372', title: 'Instrumentation and Measurement', creditUnit: 2, year: 3, semester: 2, category: 'faculty' },
  { code: 'ELE 344', title: 'Electro-Mechanical Devices and Machine 2', creditUnit: 2, year: 3, semester: 2, category: 'core' },
  { code: 'ELE 312', title: 'Circuit Theory 2', creditUnit: 3, year: 3, semester: 2, category: 'core' },
  { code: 'ECE 326', title: 'Physical Electronics', creditUnit: 2, year: 3, semester: 2, category: 'core' },
  { code: 'ECE 328', title: 'Electronic Devices and Circuits 2', creditUnit: 3, year: 3, semester: 2, category: 'core' },
  { code: 'ELE 382', title: 'Feedback and Control Systems', creditUnit: 2, year: 3, semester: 2, category: 'core' },
  { code: 'ELE 342', title: 'Electrodynamics', creditUnit: 2, year: 3, semester: 2, category: 'core' },
  { code: 'ECE 322', title: 'Telecommunications 2', creditUnit: 2, year: 3, semester: 2, category: 'core' },
  { code: 'ECE 334', title: 'Digital System Design 2', creditUnit: 2, year: 3, semester: 2, category: 'core' },



  // Fourth Year Courses (from mobile screenshot)
  { code: 'ECE 405', title: 'Microprocessors & Microcomputers', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'ECE 421', title: 'Assembly Language Programming', creditUnit: 2, year: 4, semester: 1, category: 'core' },
  { code: 'ECE 427', title: 'Advanced Circuit Techniques', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'ECE 431', title: 'Fundamentals of Digital Communication', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'ELE 403', title: 'Circuit Theory II', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'ELE 473', title: 'Instrumentation and Measurement', creditUnit: 3, year: 4, semester: 1, category: 'core' },
  { code: 'CVE 421', title: 'Engineering Contracts and Specifications', creditUnit: 2, year: 4, semester: 1, category: 'elective' },
  { code: 'FEG 404', title: 'Engineering Mathematics IV', creditUnit: 3, year: 4, semester: 1, category: 'faculty' },
];

export const getCoursesByYearAndSemester = (year: number, semester: number): Course[] => {
  return ALL_COURSES.filter(course => course.year === year && course.semester === semester);
};

export const getCourseByCode = (code: string): Course | undefined => {
  return ALL_COURSES.find(course => course.code === code);
};