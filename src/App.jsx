import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/login/Login'
import AppRoutes from './routes/AppRoutes'
import './App.scss'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  
  // Sidebar state management
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Check if device is mobile and handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      
      // Auto-collapse sidebar on tablet screens
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setIsSidebarCollapsed(true)
      }
      
      // Reset states on mobile
      if (mobile) {
        setIsSidebarCollapsed(false)
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle sidebar toggle from navbar
  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  // Close mobile sidebar when clicking on main content
  const handleCloseMobileSidebar = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }

  // Show only login page if on login route
  if (isLoginPage) {
    return <Login />
  }

  return (
    <div className="app-layout">
      <Navbar 
        onToggleSidebar={handleToggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      
      <div className="app-content">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          isMobile={isMobile}
          isOpen={isSidebarOpen}
        />
        
        <main 
          className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
          onClick={handleCloseMobileSidebar}
        >
          <AppRoutes />
        </main>
      </div>

      {/* Mobile overlay for sidebar */}
      {isMobile && isSidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={handleCloseMobileSidebar}
        />
      )}
    </div>
  )
}

export default App