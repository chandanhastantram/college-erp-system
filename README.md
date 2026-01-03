# College ERP System

A modern, interactive College ERP (Enterprise Resource Planning) system built with Next.js 14, featuring separate portals for Students, Faculty, and Administrators. The application showcases beautiful animations, glassmorphism effects, and comprehensive data visualizations.

## 🌟 Features

### Student Portal

- **Dashboard**: Overview with stats, today's schedule, and quick actions
- **Profile**: Personal and academic information management
- **Attendance**: Track attendance with pie charts and course-wise breakdown
- **Grades**: View grades with animated bar and radar charts, GPA calculations
- **Fees**: Fee structure, payment history, and online payment interface

### Faculty Portal

- **Dashboard**: Course management and student statistics
- **Course List**: View all assigned courses with details

### Admin Portal

- **Dashboard**: Institutional analytics with interactive charts
- **Attendance Trends**: Line chart visualization
- **Department Analytics**: Bar chart for student distribution

## 🎨 Design Highlights

- ✨ **Glassmorphism Effects**: Modern translucent cards with backdrop blur
- 🎭 **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- 📊 **Interactive Charts**: Recharts integration for data visualization
- 🎨 **Custom Color Palette**: Professional teal and coral gradient scheme
- 📱 **Responsive Design**: Mobile-first approach with collapsible navigation
- 🌙 **Dark Theme**: Sophisticated slate-based dark mode

## 🚀 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter + Poppins)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/chandanhastantram/college-erp-system.git

# Navigate to project directory
cd college-erp-system

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

| Role    | Email               | Password   |
| ------- | ------------------- | ---------- |
| Student | student@college.edu | student123 |
| Faculty | faculty@college.edu | faculty123 |
| Admin   | admin@college.edu   | admin123   |

## 📸 Screenshots

### Landing Page

Modern landing page with animated hero section and feature cards.

### Student Dashboard

Comprehensive dashboard with stats cards, today's schedule, and attendance overview.

### Grades with Charts

Interactive bar and radar charts for performance visualization.

### Attendance Tracking

Pie chart distribution and course-wise attendance progress.

## 🏗️ Project Structure

```
college-erp/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and design tokens
│   ├── login/             # Authentication pages
│   ├── student/           # Student portal pages
│   ├── faculty/           # Faculty portal pages
│   └── admin/             # Admin portal pages
├── components/
│   ├── ui/                # Reusable UI components
│   └── Layout/            # Layout components (Sidebar)
├── context/               # React Context (Authentication)
├── lib/                   # Utilities and mock data
└── types/                 # TypeScript type definitions
```

## 🎯 Key Features

- **Role-Based Authentication**: Separate portals for different user types
- **Real-time Animations**: Smooth page transitions and hover effects
- **Data Visualization**: Multiple chart types (bar, radar, pie, line)
- **Responsive Sidebar**: Collapsible navigation for mobile devices
- **Mock Data System**: Complete data structure for demonstration

## 🔮 Future Enhancements

- Backend API integration
- Real-time notifications
- Advanced user management
- PDF report generation
- Calendar integration
- Email notifications
- Database integration (MongoDB/PostgreSQL)

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Developer

Created by **Chandan** - [GitHub Profile](https://github.com/chandanhastantram)

---

⭐ If you found this project helpful, please give it a star!
