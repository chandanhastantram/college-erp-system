// User Types
export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
}

// Student Types
export interface Student extends User {
  role: 'student';
  studentId: string;
  department: string;
  semester: number;
  year: number;
  section: string;
  contactNumber: string;
  address: string;
  dateOfBirth: Date;
  guardianName: string;
  guardianContact: string;
  bloodGroup?: string;
  cgpa?: number;
}

// Faculty Types
export interface Faculty extends User {
  role: 'faculty';
  facultyId: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  contactNumber: string;
  dateOfJoining: Date;
  courses: string[];
}

// Admin Types
export interface Admin extends User {
  role: 'admin';
  adminId: string;
  department: string;
  designation: string;
  permissions: string[];
}

// Course Types
export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  facultyId: string;
  facultyName: string;
  schedule: CourseSchedule[];
}

export interface CourseSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

// Attendance Types
export interface AttendanceRecord {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
}

export interface AttendanceSummary {
  courseId: string;
  courseName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

// Grade Types
export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  semester: number;
  examType: 'midterm' | 'final' | 'assignment' | 'quiz' | 'project';
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  gpa: number;
  remarks?: string;
}

export interface SemesterGrades {
  semester: number;
  courses: Grade[];
  sgpa: number;
  totalCredits: number;
}

// Fee Types
export interface FeeStructure {
  id: string;
  semester: number;
  tuitionFee: number;
  libraryFee: number;
  labFee: number;
  examFee: number;
  miscellaneous: number;
  total: number;
}

export interface FeePayment {
  id: string;
  studentId: string;
  semester: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'cash' | 'card' | 'upi' | 'netbanking';
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
  receiptNumber: string;
}

export interface FeeStatus {
  semester: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: Date;
  status: 'paid' | 'partial' | 'pending' | 'overdue';
}

// Dashboard Types
export interface DashboardStats {
  totalStudents?: number;
  totalFaculty?: number;
  totalCourses?: number;
  attendanceRate?: number;
  averageGPA?: number;
  feeCollection?: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

// Department Types
export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  totalStudents: number;
  totalFaculty: number;
  established: Date;
}

// Report Types
export interface AttendanceReport {
  studentId: string;
  studentName: string;
  department: string;
  semester: number;
  overallPercentage: number;
  courseWiseAttendance: AttendanceSummary[];
}

export interface AcademicReport {
  studentId: string;
  studentName: string;
  department: string;
  semester: number;
  cgpa: number;
  sgpa: number;
  semesterGrades: SemesterGrades[];
}
