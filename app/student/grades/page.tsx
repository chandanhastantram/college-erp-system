'use client';

import { motion } from 'framer-motion';
import { Award, TrendingUp, BookOpen } from 'lucide-react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { Student } from '@/types';
import { mockGrades, calculateCurrentGPA } from '@/lib/data/mockData';
import styles from '../dashboard/page.module.css';

export default function StudentGrades() {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) return null;

  const currentSemesterGrades = mockGrades.filter(g => g.studentId === student.id && g.semester === 6);
  const previousSemesterGrades = mockGrades.filter(g => g.studentId === student.id && g.semester === 5);

  const currentGPA = calculateCurrentGPA(student.id, 6);
  const previousGPA = calculateCurrentGPA(student.id, 5);

  // Data for bar chart
  const barData = currentSemesterGrades.map(grade => ({
    subject: grade.courseName.split(' ').slice(0, 2).join(' '),
    obtained: grade.obtainedMarks,
    total: grade.maxMarks,
  }));

  // Data for radar chart
  const radarData = currentSemesterGrades.map(grade => ({
    subject: grade.courseName.split(' ')[0],
    score: (grade.obtainedMarks / grade.maxMarks) * 100,
  }));

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
            <h1>Academic Performance 📊</h1>
            <p>Track your grades and academic progress</p>
          </div>

          {/* GPA Cards */}
          <div className={styles.statsGrid}>
            <Card glow>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#6366f120', color: '#6366f1' }}>
                  <Award />
                </div>
                <div>
                  <div className={styles.statLabel}>CGPA</div>
                  <div className={styles.statValue}>{student.cgpa?.toFixed(2)}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#ec489920', color: '#ec4899' }}>
                  <TrendingUp />
                </div>
                <div>
                  <div className={styles.statLabel}>Current GPA (Sem 6)</div>
                  <div className={styles.statValue}>{currentGPA.toFixed(2)}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#14b8a620', color: '#14b8a6' }}>
                  <BookOpen />
                </div>
                <div>
                  <div className={styles.statLabel}>Previous GPA (Sem 5)</div>
                  <div className={styles.statValue}>{previousGPA.toFixed(2)}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                  <TrendingUp />
                </div>
                <div>
                  <div className={styles.statLabel}>Improvement</div>
                  <div className={styles.statValue}>{((currentGPA - previousGPA) >= 0 ? '+' : '')}{(currentGPA - previousGPA).toFixed(2)}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className={styles.grid}>
            <Card>
              <CardHeader>
                <h3>Subject-wise Marks</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="subject" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="obtained" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3>Performance Radar</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" />
                    <PolarRadiusAxis stroke="#a1a1aa" />
                    <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <h3>Current Semester Grades (Semester 6)</h3>
            </CardHeader>
            <CardBody>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Course</th>
                      <th style={{ padding: '1rem', textAlign: 'center', color: '#a1a1aa' }}>Exam Type</th>
                      <th style={{ padding: '1rem', textAlign: 'center', color: '#a1a1aa' }}>Marks</th>
                      <th style={{ padding: '1rem', textAlign: 'center', color: '#a1a1aa' }}>Grade</th>
                      <th style={{ padding: '1rem', textAlign: 'center', color: '#a1a1aa' }}>GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSemesterGrades.map((grade, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <td style={{ padding: '1rem', color: '#fff' }}>{grade.courseName}</td>
                        <td style={{ padding: '1rem', textAlign: 'center', color: '#a1a1aa', textTransform: 'capitalize' }}>
                          {grade.examType}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center', color: '#fff' }}>
                          {grade.obtainedMarks}/{grade.maxMarks}
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem',
                            background: 'rgba(99, 102, 241, 0.2)',
                            color: '#818cf8',
                            borderRadius: '1rem',
                            fontWeight: '600'
                          }}>
                            {grade.grade}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center', color: '#fff', fontWeight: '600' }}>
                          {grade.gpa.toFixed(1)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
