# Chill - React Streaming Platform

Modern streaming platform built with React, featuring authentication, responsive design, and accessibility compliance.

## 🎯 Overview

This is a React conversion of the Chill streaming platform. The application provides a Netflix-like experience with user authentication, movie browsing, and a responsive interface.

## ✨ Features

### Implemented
- ✅ User Authentication (Login/Register)
- ✅ Form Validation with Real-time Feedback
- ✅ Protected Routes
- ✅ Responsive Design (Mobile & Desktop)
- ✅ Accessibility Compliant (WCAG 2.1 Level AA)
- ✅ Modern React Patterns (Hooks, Context API)
- ✅ Client-side Routing (React Router v6)
- ✅ Session Persistence (localStorage)
- ✅ Loading States & Error Handling
- ✅ Password Visibility Toggle
- ✅ Dropdown Navigation Menu

### Simplified for MVP
- 📝 Simulated Authentication (no backend)
- 📝 Static Movie Data (no API integration)
- 📝 Basic Home Page (4 movie sections)
- 📝 Placeholder Links (series, profile, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd react-chill
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
react-chill/
├── public/              # Static assets
│   ├── logo.png
│   ├── avatar.png
│   ├── google-icon.png
│   ├── bg-auth.jpg
│   ├── bg-auth2.jpg
│   └── images/         # Movie posters
├── src/
│   ├── components/     # Reusable components
│   │   └── Navbar.jsx
│   ├── contexts/       # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Home.jsx
│   ├── styles/         # CSS modules
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Auth.module.css
│   │   ├── Home.module.css
│   │   └── Navbar.module.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **Context API** - State management
- **localStorage** - Session persistence

## 🔐 Authentication

The authentication system is currently simulated for demonstration purposes:

- **Login**: Any non-empty username and password will work
- **Register**: Creates a user object stored in localStorage
- **Session**: Persists across page refreshes
- **Logout**: Clears session and redirects to login

### Test Credentials
You can use any credentials, for example:
- Username: `demo`
- Password: `password123`

## 🎨 Design Features

### Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Skip links for screen readers
- Focus indicators
- Alt text for images

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px
- Touch-friendly interface
- Optimized layouts for all screen sizes

### User Experience
- Real-time form validation
- Loading states during async operations
- Error messages with clear guidance
- Password visibility toggle
- Smooth transitions and animations

## 📝 Known Limitations

1. **No Backend Integration**: Authentication is simulated client-side
2. **Static Content**: Movie data is hardcoded
3. **Limited Pages**: Only Login, Register, and Home are implemented
4. **No Search**: Search functionality not yet implemented
5. **No Video Playback**: Streaming functionality not implemented
6. **Missing Assets**: Some movie posters may be placeholders

## 🔮 Future Enhancements

### Phase 1 - Core Features
- [ ] Backend API integration
- [ ] Real authentication with JWT
- [ ] Database for user data
- [ ] Movie API integration (TMDB, OMDB)

### Phase 2 - Additional Pages
- [ ] Series page
- [ ] My List page
- [ ] Profile page
- [ ] Upgrade/Premium page
- [ ] Series detail page
- [ ] Watch page

### Phase 3 - Advanced Features
- [ ] Search functionality
- [ ] Video player integration
- [ ] Watchlist management
- [ ] User preferences
- [ ] Continue watching tracking
- [ ] Recommendations engine

### Phase 4 - Polish
- [ ] Advanced animations
- [ ] Skeleton loaders
- [ ] Infinite scroll
- [ ] Image lazy loading
- [ ] PWA support
- [ ] Dark/Light theme toggle

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Ensure you're using Node.js v16 or higher:
```bash
node --version
```

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is a demonstration project. For production use, consider:
1. Implementing proper backend authentication
2. Adding comprehensive testing
3. Setting up CI/CD pipeline
4. Implementing proper error tracking
5. Adding analytics

## 📞 Support

For issues or questions about this React conversion, refer to the original project documentation or create an issue in the repository.

---

**Note**: This is a simplified React conversion focused on demonstrating modern React patterns and best practices. For production use, additional features and security measures should be implemented.