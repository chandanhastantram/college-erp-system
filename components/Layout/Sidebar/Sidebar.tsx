'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Calendar,
  GraduationCap,
  CreditCard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.css';

interface SidebarProps {
role: 'student' | 'faculty' | 'admin';
}

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = {
    student: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/student/dashboard' },
      { icon: <User size={20} />, label: 'Profile', href: '/student/profile' },
      { icon: <Calendar size={20} />, label: 'Attendance', href: '/student/attendance' },
      { icon: <GraduationCap size={20} />, label: 'Grades', href: '/student/grades' },
      { icon: <CreditCard size={20} />, label: 'Fees', href: '/student/fees' },
    ],
    faculty: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/faculty/dashboard' },
      { icon: <User size={20} />, label: 'Profile', href: '/faculty/profile' },
      { icon: <Calendar size={20} />, label: 'Attendance', href: '/faculty/attendance' },
      { icon: <GraduationCap size={20} />, label: 'Grades', href: '/faculty/grades' },
      { icon: <Users size={20} />, label: 'Students', href: '/faculty/students' },
    ],
    admin: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
      { icon: <Users size={20} />, label: 'Users', href: '/admin/users' },
      { icon: <BookOpen size={20} />, label: 'Courses', href: '/admin/courses' },
      { icon: <CreditCard size={20} />, label: 'Fees', href: '/admin/fees' },
      { icon: <BarChart3 size={20} />, label: 'Reports', href: '/admin/reports' },
    ],
  };

  const items = menuItems[role];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className={styles.mobileToggle}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            <GraduationCap size={32} />
            {!collapsed && <span>College ERP</span>}
          </div>
        </div>

        <nav className={styles.nav}>
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href}>
                <motion.div
                  className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  whileHover={{ x: 5, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                  {isActive && <div className={styles.activeBorder} />}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          {user && (
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              {!collapsed && (
                <div className={styles.userDetails}>
                  <div className={styles.userName}>{user.firstName} {user.lastName}</div>
                  <div className={styles.userRole}>{role.charAt(0).toUpperCase() + role.slice(1)}</div>
                </div>
              )}
            </div>
          )}
          
          <motion.button
            className={styles.logoutButton}
            onClick={handleLogout}
            whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {collapsed && (
        <div 
          className={styles.overlay}
          onClick={() => setCollapsed(false)}
        />
      )}
    </>
  );
}
