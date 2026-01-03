'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Heart, GraduationCap, Hash } from 'lucide-react';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import { useAuth } from '@/context/AuthContext';
import { Student } from '@/types';
import styles from '../dashboard/page.module.css';

export default function StudentProfile() {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) return null;

  const profileSections = [
    {
      title: 'Personal Information',
      fields: [
        { icon: <User />, label: 'Full Name', value: `${student.firstName} ${student.lastName}` },
        { icon: <Mail />, label: 'Email', value: student.email },
        { icon: <Phone />, label: 'Contact', value: student.contactNumber },
        { icon: <Calendar />, label: 'Date of Birth', value: student.dateOfBirth.toLocaleDateString() },
        { icon: <Heart />, label: 'Blood Group', value: student.bloodGroup || 'N/A' },
        { icon: <MapPin />, label: 'Address', value: student.address },
      ]
    },
    {
      title: 'Academic Information',
      fields: [
        { icon: <Hash />, label: 'Student ID', value: student.studentId },
        { icon: <GraduationCap />, label: 'Department', value: student.department },
        { icon: <Calendar />, label: 'Year', value: `Year ${student.year}` },
        { icon: <GraduationCap />, label: 'Semester', value: `Semester ${student.semester}` },
        { icon: <User />, label: 'Section', value: student.section },
        { icon: <GraduationCap />, label: 'CGPA', value: student.cgpa?.toFixed(2) || 'N/A' },
      ]
    },
    {
      title: 'Guardian Information',
      fields: [
        { icon: <User />, label: 'Guardian Name', value: student.guardianName },
        { icon: <Phone />, label: 'Guardian Contact', value: student.guardianContact },
      ]
    }
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
            <h1>My Profile 👤</h1>
            <p>View and manage your personal information</p>
          </div>

          {/* Profile Header Card */}
          <Card glow>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: '700',
                color: 'white',
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
              }}>
                {student.firstName[0]}{student.lastName[0]}
              </div>
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{student.firstName} {student.lastName}</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                  {student.department} • Year {student.year} • Section {student.section}
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <span className="badge badge-success">Active</span>
                  <span className="badge badge-info">Student ID: {student.studentId}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Information Sections */}
          {profileSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              style={{ marginTop: '1.5rem' }}
            >
              <Card>
                <CardHeader>
                  <h3>{section.title}</h3>
                </CardHeader>
                <CardBody>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{
                          padding: '0.75rem',
                          background: 'rgba(99, 102, 241, 0.1)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--color-primary-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {field.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                            {field.label}
                          </div>
                          <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                            {field.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
