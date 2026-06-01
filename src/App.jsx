import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { MyListProvider } from './contexts/MyListContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Series from './pages/Series'
import MyList from './pages/MyList'
import Profile from './pages/Profile'
import Upgrade from './pages/Upgrade'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <MyListProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MyListProvider>
    </AuthProvider>
  )
}

export default App