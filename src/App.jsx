import { useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import Login from './pages/login/Login'
import AppRoutes from './routes/AppRoutes'
import './App.scss'

function App() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <Login />
  }

  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </div>
  )
}

export default App