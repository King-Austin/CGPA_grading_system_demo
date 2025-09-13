# 📊 Course Score Scribe

A comprehensive **GPA/CGPA tracking application** designed for university students to monitor their academic progress with live calculations, semester management, and detailed grade analytics.

![Course Score Scribe](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?style=flat-square)

## ✨ Features

### 🎯 **Core Functionality**
- **Live GPA/CGPA Calculation** - Real-time grade point average computation
- **Semester Management** - Organize courses by year and semester
- **Grade Tracking** - Support for A-F grading scale with point values
- **Course Management** - Add, remove, and organize courses with credit units
- **Progress Monitoring** - Visual progress bars and completion statistics

### 📱 **User Experience**
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Progressive Web App (PWA)** - Installable on mobile devices
- **Offline Support** - Works without internet connection
- **Data Persistence** - Automatic local storage of all data
- **Dark/Light Theme** - Modern UI with shadcn/ui components

### 📄 **Data Management**
- **PDF Export** - Generate comprehensive academic reports
- **Data Backup** - Export and import grade data
- **Reset Functionality** - Clear all data with confirmation
- **Cross-device Sync** - Share data between devices

### 🎨 **Visual Analytics**
- **Grade Distribution Charts** - Visual representation of grade performance
- **Academic Progress Tracking** - Semester-by-semester progress visualization
- **GPA Classification** - Automatic class determination (First Class, Second Class, etc.)
- **Credit Unit Tracking** - Monitor completed vs. total credit units

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/King-Austin/course-score-scribe.git
   cd course-score-scribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📖 Usage Guide

### Getting Started
1. **Add Courses**: Use the course selection dropdown to add courses to each semester
2. **Enter Grades**: Select grades (A, B, C, D, E, F) for completed courses
3. **Monitor Progress**: View live GPA calculations and progress indicators
4. **Export Data**: Generate PDF reports of your academic performance

### Grade Scale
- **A** = 5.0 points (Excellent)
- **B** = 4.0 points (Very Good)
- **C** = 3.0 points (Good)
- **D** = 2.0 points (Fair)
- **E** = 1.0 points (Pass)
- **F** = 0.0 points (Fail)

### GPA Classification
- **4.50+** = First Class
- **3.50-4.49** = Second Class Upper
- **2.50-3.49** = Second Class Lower
- **1.50-2.49** = Third Class
- **1.00-1.49** = Pass
- **< 1.00** = Fail

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### UI/UX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **Recharts** - Chart library for data visualization

### State Management
- **React Hooks** - Built-in state management
- **Local Storage** - Client-side data persistence
- **TanStack Query** - Data fetching and caching

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📱 Progressive Web App (PWA)

Course Score Scribe is a fully functional PWA with the following capabilities:

### Installation
- **Desktop**: Click "Install" in the address bar (Chrome/Edge)
- **Mobile**: Tap "Add to Home Screen" in mobile browsers

### Offline Features
- **Data Persistence** - All data saved locally
- **Offline Access** - App works without internet
- **Background Sync** - Data synchronization when online

### App Manifest
- Custom app icons and splash screens
- Native app-like experience
- Optimized for mobile devices

## 📄 PDF Export

Generate comprehensive academic reports with:

- **Complete Grade History** - All courses and grades
- **GPA Calculations** - Semester and cumulative GPAs
- **Progress Statistics** - Credit completion and performance metrics
- **Grade Distribution** - Visual breakdown of grades earned
- **Academic Classification** - Final GPA class determination

## 🔧 Configuration

### Environment Variables
Create a `.env` file for custom configuration:

```env
# Development
VITE_APP_TITLE="Course Score Scribe"
VITE_APP_VERSION="1.0.0"

# Optional: Analytics
VITE_ANALYTICS_ID=""
```

### Build Configuration
The app is configured for optimal performance:

- **Code Splitting** - Automatic route-based splitting
- **Asset Optimization** - Image and font optimization
- **CSS Minification** - Tailwind CSS purging
- **Service Worker** - Offline functionality

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect Repository** to Vercel
2. **Deploy Automatically** on git push
3. **SPA Routing** configured via `vercel.json`

### Other Platforms
- **Netlify** - Drag & drop deployment
- **GitHub Pages** - Static hosting
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test on multiple devices/browsers
- Maintain responsive design principles
- Follow ESLint rules

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the comprehensive icon set
- **Vite** for the blazing fast build tool

## 📞 Support

For support, questions, or feature requests:

- **Issues**: [GitHub Issues](https://github.com/King-Austin/course-score-scribe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/King-Austin/course-score-scribe/discussions)
- **Email**: support@nworahsoft.tech

---

**Built with ❤️ by [Nworahsoft](https://nworahsoft.tech)**

*Track your academic journey with confidence and precision.*
