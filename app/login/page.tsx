'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GraduationCap, Mail, Lock, UserCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const roles = [
    { value: 'student', label: 'Student', demo: 'student@college.edu' },
    { value: 'faculty', label: 'Faculty', demo: 'faculty@college.edu' },
    { value: 'admin', label: 'Admin', demo: 'admin@college.edu' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      const success = login(email, password);
      
      if (success) {
        // Route based on role
        if (email.includes('student')) {
          router.push('/student/dashboard');
        } else if (email.includes('faculty')) {
          router.push('/faculty/dashboard');
        } else if (email.includes('admin')) {
          router.push('/admin/dashboard');
        }
      } else {
        setError('Invalid email or password');
        setLoading(false);
      }
    }, 1000);
  };

  const fillDemoCredentials = (role: string) => {
    const credentials = {
      student: { email: 'student@college.edu', password: 'student123' },
      faculty: { email: 'faculty@college.edu', password: 'faculty123' },
      admin: { email: 'admin@college.edu', password: 'admin123' },
    };
    
    const creds = credentials[role as keyof typeof credentials];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className={styles.loginPage}>
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <GraduationCap size={50} />
        </motion.div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to access your portal</p>

        {/* Role Selector */}
        <div className={styles.roleSelector}>
          {roles.map((role) => (
            <motion.button
              key={role.value}
              className={`${styles.roleButton} ${selectedRole === role.value ? styles.active : ''}`}
              onClick={() => setSelectedRole(role.value as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserCircle2 size={20} />
              {role.label}
            </motion.button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <Mail className={styles.inputIcon} size={20} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <Lock className={styles.inputIcon} size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {error && (
            <motion.div
              className={styles.error}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className={styles.demo}>
          <p>Demo Credentials:</p>
          <div className={styles.demoButtons}>
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => fillDemoCredentials(role.value)}
                className={styles.demoButton}
              >
                {role.label}
              </button>
            ))}
          </div>
          <p className={styles.demoPassword}>Password: <code>student123</code>, <code>faculty123</code>, <code>admin123</code></p>
        </div>
      </motion.div>

      {/* Background Animation */}
      <div className={styles.bgShapes}>
        <motion.div
          className={styles.shape1}
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className={styles.shape2}
          animate={{ y: [0, 40, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
