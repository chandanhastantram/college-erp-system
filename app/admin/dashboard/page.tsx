'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { mockStudents, mockFaculty, mockCourses } from '@/lib/data/mockData';
import styles from '../../student/dashboard/page.module.css';

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { icon: <Users />, label: 'Total Students', value: mockStudents.length, color: '#6366f1' },
    { icon: <Users />, label: 'Total Faculty', value: mockFaculty.length, color: '#14b8a6' },
    { icon: <BookOpen />, label: 'Total Courses', value: mockCourses.length, color: '#ec4899' },
    { icon: <DollarSign />, label: 'Fee Collection', value: '₹11.6L', color: '#f59e0b' },
  ];

  const attendanceData = [
    { month: 'Jan', rate: 82 },
    { month: 'Feb', rate: 85 },
    { month: 'Mar', rate: 88 },
    { month: 'Apr', rate: 84 },
    { month: 'May', rate: 87 },
  ];

  const departmentData = [
    { name: 'CS', students: 120 },
    { name: 'EC', students: 95 },
    { name: 'ME', students: 110 },
    { name: 'CE', students: 85 },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar role="admin" />
      
      <main className={styles.main}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header}>
            <h1>Admin Dashboard 📊</h1>
            <p>Monitor and manage your institution</p>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
            <Card>
              <CardHeader>
                <h3>Attendance Trends</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={attendanceData}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Line type="monotone" dataKey="rate" stroke="url(#lineGradient)" strokeWidth={3} dot={{ fill: '#6366f1', r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3>Department-wise Students</h3>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentData}>
                    <defs>
                      <linearGradient id="adminBarGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Bar dataKey="students" fill="url(#adminBarGradient)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
