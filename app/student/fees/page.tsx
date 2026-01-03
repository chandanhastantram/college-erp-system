'use client';

import { motion } from 'framer-motion';
import { DollarSign, Calendar, CreditCard, Download, CheckCircle, Clock } from 'lucide-react';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import Card, { CardHeader, CardBody } from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { useAuth } from '@/context/AuthContext';
import { Student } from '@/types';
import { mockFeePayments, mockFeeStructure } from '@/lib/data/mockData';
import styles from '../dashboard/page.module.css';

export default function StudentFees() {
  const { user } = useAuth();
  const student = user as Student;

  if (!student) return null;

  const currentFee = mockFeeStructure[0];
  const totalPaid = mockFeePayments.filter(p => p.studentId === student.id).reduce((sum, p) => sum + p.amount, 0);
  const dueAmount = currentFee.total - totalPaid;

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
            <h1>Fee Management 💳</h1>
            <p>View and manage your fee payments</p>
          </div>

          {/* Fee Summary Cards */}
          <div className={styles.statsGrid}>
            <Card glow>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#6366f120', color: '#6366f1' }}>
                  <DollarSign />
                </div>
                <div>
                  <div className={styles.statLabel}>Total Fee</div>
                  <div className={styles.statValue}>₹{currentFee.total.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#10b98120', color: '#10b981' }}>
                  <CheckCircle />
                </div>
                <div>
                  <div className={styles.statLabel}>Paid</div>
                  <div className={styles.statValue}>₹{totalPaid.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#ef444420', color: '#ef4444' }}>
                  <Clock />
                </div>
                <div>
                  <div className={styles.statLabel}>Due</div>
                  <div className={styles.statValue}>₹{dueAmount.toLocaleString()}</div>
                </div>
              </div>
            </Card>

            <Card>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: '#14b8a620', color: '#14b8a6' }}>
                  <Calendar />
                </div>
                <div>
                  <div className={styles.statLabel}>Semester</div>
                  <div className={styles.statValue}>{currentFee.semester}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Fee Structure */}
          <Card>
            <CardHeader>
              <h3>Fee Structure - Semester {currentFee.semester}</h3>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  { label: 'Tuition Fee', amount: currentFee.tuitionFee },
                  { label: 'Library Fee', amount: currentFee.libraryFee },
                  { label: 'Lab Fee', amount: currentFee.labFee },
                  { label: 'Exam Fee', amount: currentFee.examFee },
                  { label: 'Miscellaneous', amount: currentFee.miscellaneous },
                ].map((item, index) => (
                  <div key={index} style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                    <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                      ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div style={{
                  gridColumn: 'span 2',
                  padding: '1rem',
                  background: 'rgba(99, 102, 241, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid var(--color-primary)'
                }}>
                  <span style={{ fontWeight: '700', color: 'var(--color-primary-light)' }}>Total Amount</span>
                  <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--color-primary-light)' }}>
                    ₹{currentFee.total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              {dueAmount > 0 && (
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <Button variant="primary" size="lg" icon={<CreditCard />}>
                    Pay Now - ₹{dueAmount.toLocaleString()}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <h3>Payment History</h3>
            </CardHeader>
            <CardBody>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Semester</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Amount</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Method</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#a1a1aa' }}>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFeePayments.filter(p => p.studentId === student.id).map((payment, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <td style={{ padding: '1rem', color: '#fff' }}>
                          {payment.paymentDate.toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1rem', color: '#a1a1aa' }}>
                          Semester {payment.semester}
                        </td>
                        <td style={{ padding: '1rem', color: '#fff', fontWeight: '600' }}>
                          ₹{payment.amount.toLocaleString()}
                        </td>
                        <td style={{ padding: '1rem', color: '#a1a1aa', textTransform: 'uppercase' }}>
                          {payment.paymentMethod}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span className="badge badge-success">
                            {payment.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <Button variant="ghost" size="sm" icon={<Download size={16} />}>
                            Download
                          </Button>
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
