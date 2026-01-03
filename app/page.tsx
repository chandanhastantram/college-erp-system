'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, BookOpen, Users, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const features = [
    { icon: <BookOpen />, title: 'Student Portal', description: 'Track attendance, view grades, manage fees' },
    { icon: <Users />, title: 'Faculty Dashboard', description: 'Mark attendance, enter grades, manage students' },
    { icon: <BarChart3 />, title: 'Admin Panel', description: 'Analytics, user management, reports' },
  ];

  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <GraduationCap size={80} className={styles.logo} />
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          College ERP System
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Modern, Interactive & Intelligent Education Management
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight />}
            onClick={() => router.push('/login')}
            className={styles.ctaButton}
          >
            Get Started
          </Button>
        </motion.div>

        <motion.div
          className={styles.features}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated background elements */}
        <div className={styles.bgShapes}>
          <motion.div
            className={styles.shape1}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className={styles.shape2}
            animate={{
              y: [0, 40, 0],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
