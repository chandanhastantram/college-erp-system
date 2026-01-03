'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calendar, Users, TrendingUp } from 'lucide-react';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { Faculty } from '@/types';
import { mockCourses, mockStudents } from '@/lib/data/mockData';
import styles from '../../student/dashboard/page.module.css';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const faculty = user as Faculty;

  if (!faculty) return null;

  const facultyCourses = mockCourses.filter(c => c.facultyId === faculty.id);
  const stats = [
    { icon: <BookOpen />, label: 'Courses Teaching', value: facultyCourses.length, color: '#6366f1' },
    { icon: <Users />, label: 'Total Students', value: mockStudents.length, color: '#14b8a6' },
    { icon: <Calendar />, label: 'Classes Today', value: '3', color: '#ec4899' },
    { icon: <TrendingUp />, label: 'Avg. Attendance', value: '85%', color: '#f59e0b' },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar role="faculty" />
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <h1>Welcome, {faculty.firstName}! 👨‍🏫</h1>
            <p>Manage your classes and student progress</p>
          </div>

          <div className={styles.statsGrid}>            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover>
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

          <Card>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>My Courses</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {facultyCourses.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{course.name}</h4>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                          {course.code} • Semester {course.semester} • {course.credits} credits
                        </p>
                      </div>
                      <span className="badge badge-info">Active</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
