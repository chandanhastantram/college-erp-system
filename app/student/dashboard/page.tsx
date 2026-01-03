'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calendar, TrendingUp, DollarSign, Award, Clock } from 'lucide-react';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { Student } from '@/types';
import { mockAttendanceSummary, calculateCurrentGPA } from '@/lib/data/mockData';
import styles from './page.module.css';

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) return null;

  const overallAttendance = Math.round(
    mockAttendanceSummary.reduce((sum, course) => sum + course.percentage, 0) / mockAttendanceSummary.length
  );

  const currentGPA = calculateCurrentGPA(student.id, student.semester);

  const stats = [
    { icon: <BookOpen />, label: 'Current Semester', value: student.semester, color: '#6366f1' },
    { icon: <Calendar />, label: 'Attendance', value: `${overallAttendance}%`, color: '#14b8a6' },
    { icon: <Award />, label: 'CGPA', value: student.cgpa?.toFixed(2) || '8.5', color: '#ec4899' },
    { icon: <TrendingUp />, label: 'Current GPA', value: currentGPA.toFixed(2), color: '#f59e0b' },
  ];

  const upcomingClasses = [
    { time: '09:00 AM', subject: 'Machine Learning', room: 'Room 301', type: 'Lecture' },
    { time: '11:00 AM', subject: 'Web Development', room: 'Lab 101', type: 'Lab' },
    { time: '02:00 PM', subject: 'Database Management', room: 'Room 302', type: 'Lecture' },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar role="student" />
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <div>
              <h1>Welcome back, {student.firstName}! 👋</h1>
              <p>Here's what's happening with your academics today</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card hover glow={index === 0}>
                  <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className={styles.statLabel}>{stat.label}</div>
                      <div className={styles.statValue}>{stat.value}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className={styles.grid}>
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <div className={styles.cardTitle}>
                  <Clock size={24} />
                  <h3>Today's Schedule</h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className={styles.scheduleList}>
                  {upcomingClasses.map((classItem, index) => (
                    <motion.div
                      key={index}
                      className={styles.scheduleItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className={styles.scheduleTime}>{classItem.time}</div>
                      <div className={styles.scheduleDetails}>
                        <div className={styles.scheduleSubject}>{classItem.subject}</div>
                        <div className={styles.scheduleInfo}>
                          {classItem.room} • {classItem.type}
                        </div>
                      </div>
                      <div className={`${styles.badge} ${styles[classItem.type.toLowerCase()]}`}>
                        {classItem.type}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <h3>Quick Actions</h3>
              </CardHeader>
              <CardBody>
                <div className={styles.quickActions}>
                  <motion.a
                    href="/student/attendance"
                    className={styles.quickAction}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar size={24} />
                    <span>View Attendance</span>
                  </motion.a>
                  <motion.a
                    href="/student/grades"
                    className={styles.quickAction}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award size={24} />
                    <span>Check Grades</span>
                  </motion.a>
                  <motion.a
                    href="/student/fees"
                    className={styles.quickAction}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <DollarSign size={24} />
                    <span>Pay Fees</span>
                  </motion.a>
                  <motion.a
                    href="/student/profile"
                    className={styles.quickAction}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookOpen size={24} />
                    <span>Update Profile</span>
                  </motion.a>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Attendance Overview */}
          <Card>
            <CardHeader>
              <h3>Attendance Overview</h3>
            </CardHeader>
            <CardBody>
              <div className={styles.attendanceGrid}>
                {mockAttendanceSummary.map((course, index) => (
                  <motion.div
                    key={index}
                    className={styles.attendanceCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className={styles.courseName}>{course.courseName}</div>
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.percentage}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        style={{
                          background: course.percentage >= 85 ? 'var(--gradient-success)' :
                                     course.percentage >= 75 ? 'var(--gradient-primary)' :
                                     'var(--gradient-secondary)'
                        }}
                      />
                    </div>
                    <div className={styles.attendanceStats}>
                      <span>{course.attendedClasses}/{course.totalClasses} classes</span>
                      <span className={styles.percentage}>{course.percentage}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
