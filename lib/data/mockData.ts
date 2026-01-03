import { Student, Faculty, Admin, Course, AttendanceRecord, Grade, FeePayment, FeeStructure, AttendanceSummary } from '@/types';

// Mock Users
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    email: 'student@college.edu',
    password: 'student123',
    role: 'student',
    firstName: 'Rahul',
    lastName: 'Sharma',
    studentId: 'CS2021001',
    department: 'Computer Science',
    semester: 6,
    year: 3,
    section: 'A',
    contactNumber: '+91 9876543210',
    address: '123 College Road, Mumbai',
    dateOfBirth: new Date('2003-05-15'),
    guardianName: 'Mr. Sharma',
    guardianContact: '+91 9876543211',
    bloodGroup: 'O+',
    cgpa: 8.5,
    avatar: '/avatars/student1.jpg',
    createdAt: new Date('2021-08-01'),
  },
  {
    id: 'student-2',
    email: 'priya@college.edu',
    password: 'student123',
    role: 'student',
    firstName: 'Priya',
    lastName: 'Patel',
    studentId: 'CS2021002',
    department: 'Computer Science',
    semester: 6,
    year: 3,
    section: 'A',
    contactNumber: '+91 9876543212',
    address: '456 Campus Street, Delhi',
    dateOfBirth: new Date('2003-08-22'),
    guardianName: 'Mr. Patel',
    guardianContact: '+91 9876543213',
    bloodGroup: 'A+',
    cgpa: 9.2,
    createdAt: new Date('2021-08-01'),
  },
];

export const mockFaculty: Faculty[] = [
  {
    id: 'faculty-1',
    email: 'faculty@college.edu',
    password: 'faculty123',
    role: 'faculty',
    firstName: 'Dr. Anil',
    lastName: 'Kumar',
    facultyId: 'FAC2020001',
    department: 'Computer Science',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    specialization: 'Artificial Intelligence',
    contactNumber: '+91 9876543220',
    dateOfJoining: new Date('2020-01-15'),
    courses: ['CS601', 'CS602'],
    avatar: '/avatars/faculty1.jpg',
    createdAt: new Date('2020-01-15'),
  },
];

export const mockAdmins: Admin[] = [
  {
    id: 'admin-1',
    email: 'admin@college.edu',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    adminId: 'ADM2019001',
    department: 'Administration',
    designation: 'System Administrator',
    permissions: ['all'],
    avatar: '/avatars/admin1.jpg',
    createdAt: new Date('2019-06-01'),
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    code: 'CS601',
    name: 'Machine Learning',
    department: 'Computer Science',
    semester: 6,
    credits: 4,
    facultyId: 'faculty-1',
    facultyName: 'Dr. Anil Kumar',
    schedule: [
      { day: 'Monday', startTime: '09:00', endTime: '10:30', room: 'Room 301' },
      { day: 'Wednesday', startTime: '09:00', endTime: '10:30', room: 'Room 301' },
      { day: 'Friday', startTime: '09:00', endTime: '10:30', room: 'Room 301' },
    ],
  },
  {
    id: 'course-2',
    code: 'CS602',
    name: 'Web Development',
    department: 'Computer Science',
    semester: 6,
    credits: 3,
    facultyId: 'faculty-1',
    facultyName: 'Dr. Anil Kumar',
    schedule: [
      { day: 'Tuesday', startTime: '11:00', endTime: '12:30', room: 'Lab 101' },
      { day: 'Thursday', startTime: '11:00', endTime: '12:30', room: 'Lab 101' },
    ],
  },
  {
    id: 'course-3',
    code: 'CS603',
    name: 'Database Management',
    department: 'Computer Science',
    semester: 6,
    credits: 4,
    facultyId: 'faculty-1',
    facultyName: 'Dr. Anil Kumar',
    schedule: [
      { day: 'Monday', startTime: '14:00', endTime: '15:30', room: 'Room 302' },
      { day: 'Wednesday', startTime: '14:00', endTime: '15:30', room: 'Room 302' },
    ],
  },
  {
    id: 'course-4',
    code: 'CS604',
    name: 'Software Engineering',
    department: 'Computer Science',
    semester: 6,
    credits: 3,
    facultyId: 'faculty-1',
    facultyName: 'Dr. Anil Kumar',
    schedule: [
      { day: 'Tuesday', startTime: '09:00', endTime: '10:30', room: 'Room 303' },
      { day: 'Thursday', startTime: '09:00', endTime: '10:30', room: 'Room 303' },
    ],
  },
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  // Machine Learning (CS601) - 30 records
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `attendance-1-${i}`,
    studentId: 'student-1',
    courseId: 'course-1',
    courseName: 'Machine Learning',
    date: new Date(2024, 0, i + 1),
    status: (i % 5 === 0 ? 'absent' : 'present') as 'present' | 'absent' | 'late',
    markedBy: 'faculty-1',
  })),
  // Web Development (CS602) - 25 records
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `attendance-2-${i}`,
    studentId: 'student-1',
    courseId: 'course-2',
    courseName: 'Web Development',
    date: new Date(2024, 0, i + 1),
    status: (i % 7 === 0 ? 'absent' : 'present') as 'present' | 'absent' | 'late',
    markedBy: 'faculty-1',
  })),
  // Database Management (CS603) - 28 records
  ...Array.from({ length: 28 }, (_, i) => ({
    id: `attendance-3-${i}`,
    studentId: 'student-1',
    courseId: 'course-3',
    courseName: 'Database Management',
    date: new Date(2024, 0, i + 1),
    status: (i % 6 === 0 ? 'absent' : 'present') as 'present' | 'absent' | 'late',
    markedBy: 'faculty-1',
  })),
  // Software Engineering (CS604) - 26 records
  ...Array.from({ length: 26 }, (_, i) => ({
    id: `attendance-4-${i}`,
    studentId: 'student-1',
    courseId: 'course-4',
    courseName: 'Software Engineering',
    date: new Date(2024, 0, i + 1),
    status: (i % 8 === 0 ? 'absent' : 'present') as 'present' | 'absent' | 'late',
    markedBy: 'faculty-1',
  })),
];

// Mock Attendance Summary
export const mockAttendanceSummary: AttendanceSummary[] = [
  {
    courseId: 'course-1',
    courseName: 'Machine Learning',
    totalClasses: 30,
    attendedClasses: 24,
    percentage: 80,
    status: 'good',
  },
  {
    courseId: 'course-2',
    courseName: 'Web Development',
    totalClasses: 25,
    attendedClasses: 22,
    percentage: 88,
    status: 'excellent',
  },
  {
    courseId: 'course-3',
    courseName: 'Database Management',
    totalClasses: 28,
    attendedClasses: 23,
    percentage: 82,
    status: 'good',
  },
  {
    courseId: 'course-4',
    courseName: 'Software Engineering',
    totalClasses: 26,
    attendedClasses: 23,
    percentage: 88.5,
    status: 'excellent',
  },
];

// Mock Grades
export const mockGrades: Grade[] = [
  // Semester 5 grades
  {
    id: 'grade-1',
    studentId: 'student-1',
    courseId: 'course-1',
    courseName: 'Data Structures',
    semester: 5,
    examType: 'final',
    maxMarks: 100,
    obtainedMarks: 85,
    grade: 'A',
    gpa: 9.0,
  },
  {
    id: 'grade-2',
    studentId: 'student-1',
    courseId: 'course-2',
    courseName: 'Operating Systems',
    semester: 5,
    examType: 'final',
    maxMarks: 100,
    obtainedMarks: 78,
    grade: 'B+',
    gpa: 8.0,
  },
  {
    id: 'grade-3',
    studentId: 'student-1',
    courseId: 'course-3',
    courseName: 'Computer Networks',
    semester: 5,
    examType: 'final',
    maxMarks: 100,
    obtainedMarks: 92,
    grade: 'A+',
    gpa: 10.0,
  },
  {
    id: 'grade-4',
    studentId: 'student-1',
    courseId: 'course-4',
    courseName: 'Theory of Computation',
    semester: 5,
    examType: 'final',
    maxMarks: 100,
    obtainedMarks: 88,
    grade: 'A',
    gpa: 9.0,
  },
  // Semester 6 grades (current)
  {
    id: 'grade-5',
    studentId: 'student-1',
    courseId: 'course-1',
    courseName: 'Machine Learning',
    semester: 6,
    examType: 'midterm',
    maxMarks: 50,
    obtainedMarks: 42,
    grade: 'A',
    gpa: 9.0,
  },
  {
    id: 'grade-6',
    studentId: 'student-1',
    courseId: 'course-2',
    courseName: 'Web Development',
    semester: 6,
    examType: 'midterm',
    maxMarks: 50,
    obtainedMarks: 45,
    grade: 'A+',
    gpa: 10.0,
  },
  {
    id: 'grade-7',
    studentId: 'student-1',
    courseId: 'course-3',
    courseName: 'Database Management',
    semester: 6,
    examType: 'midterm',
    maxMarks: 50,
    obtainedMarks: 40,
    grade: 'A',
    gpa: 9.0,
  },
  {
    id: 'grade-8',
    studentId: 'student-1',
    courseId: 'course-4',
    courseName: 'Software Engineering',
    semester: 6,
    examType: 'midterm',
    maxMarks: 50,
    obtainedMarks: 43,
    grade: 'A',
    gpa: 9.0,
  },
];

// Mock Fee Structure
export const mockFeeStructure: FeeStructure[] = [
  {
    id: 'fee-1',
    semester: 6,
    tuitionFee: 50000,
    libraryFee: 2000,
    labFee: 3000,
    examFee: 1500,
    miscellaneous: 1500,
    total: 58000,
  },
];

// Mock Fee Payments
export const mockFeePayments: FeePayment[] = [
  {
    id: 'payment-1',
    studentId: 'student-1',
    semester: 5,
    amount: 58000,
    paymentDate: new Date('2023-08-15'),
    paymentMethod: 'netbanking',
    transactionId: 'TXN12345678',
    status: 'completed',
    receiptNumber: 'RCP2023001',
  },
  {
    id: 'payment-2',
    studentId: 'student-1',
    semester: 6,
    amount: 30000,
    paymentDate: new Date('2024-01-10'),
    paymentMethod: 'upi',
    transactionId: 'TXN87654321',
    status: 'completed',
    receiptNumber: 'RCP2024001',
  },
];

// Helper function to get user by credentials
export function authenticateUser(email: string, password: string): Student | Faculty | Admin | null {
  const allUsers = [...mockStudents, ...mockFaculty, ...mockAdmins];
  const user = allUsers.find(u => u.email === email && u.password === password);
  return user || null;
}

// Helper function to calculate attendance percentage
export function calculateAttendancePercentage(studentId: string): number {
  const studentAttendance = mockAttendanceRecords.filter(r => r.studentId === studentId);
  if (studentAttendance.length === 0) return 0;
  
  const presentCount = studentAttendance.filter(r => r.status === 'present').length;
  return Math.round((presentCount / studentAttendance.length) * 100);
}

// Helper function to calculate current semester GPA
export function calculateCurrentGPA(studentId: string, semester: number): number {
  const semesterGrades = mockGrades.filter(g => g.studentId === studentId && g.semester === semester);
  if (semesterGrades.length === 0) return 0;
  
  const totalGPA = semesterGrades.reduce((sum, grade) => sum + grade.gpa, 0);
  return parseFloat((totalGPA / semesterGrades.length).toFixed(2));
}
