'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import{PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { Student } from '@/types';
import { mockAttendanceSummary, mockAttendanceRecords } from '@/lib/data/mockData';
import styles from '../dashboard/page.module.css';

export default function StudentAttendance() {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) return null;

  const overallAttendance = Math.round(
    mockAttendanceSummary.reduce((sum, course) => sum + course.percentage, 0) / mockAttendanceSummary.length
  );

  const totalClasses = mockAttendanceSummary.reduce((sum, course) => sum + course.totalClasses, 0);
  const attendedClasses = mockAttendanceSummary.reduce((sum, course) => sum + course.attendedClasses, 0);
  const absentClasses = totalClasses - attendedClasses;

  // Pie chart data
  const pieData = [
    { name: 'Present', value: attendedClasses, color: '#10b981' },
    { name: 'Absent', value: absentClasses, color: '#ef4444' },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar role="student" />
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <h1>Attendance Tracking 📅</h1>
            <p>Monitor your class attendance and stay on track</p>
          </div>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <Card glow>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#6366f120', color: '#6366f1' }}>
                  <TrendingUp />
                </div>
                <div>
                  <div className={styles.statLabel}>Overall Attendance</div>
                  <div className={styles.statValue}>{overallAttendance}%</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#10b98120', color: '#10b981' }}>
                  <CheckCircle />
                </div>
                <div>
                  <div className={styles.statLabel}>Classes Attended</div>
                  <div className={styles.statValue}>{attendedClasses}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#ef444420', color: '#ef4444' }}>
                  <XCircle />
                </div>
                <div>
                  <div className={styles.statLabel}>Classes Missed</div>
                  <div className={styles.statValue}>{absentClasses}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#14b8a620', color: '#14b8a6' }}>
                  <Calendar />
                </div>
                <div>
                  <div className={styles.statLabel}>Total Classes</div>
                  <div className={styles.statValue}>{totalClasses}</div>
                </div>
              </div>
            </Card>
          </div>

          <div className={styles.grid}>
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <h3>Attendance Distribution</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Subject-wise Attendance */}
            <Card>
              <CardHeader>
                <h3>Course-wise Summary</h3>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mockAttendanceSummary.map((course, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                          {course.courseName}
                        </span>
                        <span style={{ fontWeight: '700', color: course.percentage >= 85 ? '#10b981' : course.percentage >= 75 ? '#6366f1' : '#ef4444' }}>
                          {course.percentage}%
                        </span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                        {course.attendedClasses}/{course.totalClasses} classes attended
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${course.percentage}%`,
                            background: course.percentage >= 85 ? 'var(--gradient-success)' : course.percentage >= 75 ? 'var(--gradient-primary)' : 'var(--gradient-secondary)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
