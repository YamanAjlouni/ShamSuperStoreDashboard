import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminNavbar.scss'

const AdminNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [notifications] = useState(12) // Admin notifications count
    const [systemAlerts] = useState({ active: 3, total: 8 }) // System alerts
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef(null)

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Get current page name from location
    const getCurrentPageName = () => {
        const path = location.pathname
        if (path === '/admin' || path === '/admin/') return 'Admin Dashboard'
        if (path.includes('/users/details/')) return 'User Details'
        if (path.includes('/users')) return 'User Management'
        if (path.includes('/sellers/details/')) return 'Seller Details'
        if (path.includes('/pending-sellers')) return 'Pending Seller Applications'
        if (path.includes('/sellers')) return 'Seller Management'
        if (path.includes('/drivers/details/')) return 'Driver Details'
        if (path.includes('/drivers')) return 'Delivery Drivers'
        if (path.includes('/orders/details/')) return 'Order Details'
        if (path.includes('/orders/analytics')) return 'Order Analytics'
        if (path.includes('/orders')) return 'Order Management'
        if (path.includes('/products')) return 'Product Management'
        if (path.includes('/categories')) return 'Category Management'
        if (path.includes('/payments')) return 'Payment Management'
        if (path.includes('/reports')) return 'Financial Reports'
        if (path.includes('/settings')) return 'System Settings'
        if (path.includes('/logs')) return 'System Logs'
        if (path.includes('/notifications')) return 'Notifications'
        if (path.includes('/profile')) return 'Admin Profile'
        return 'Admin Dashboard'
    }

    const handleNotificationsClick = () => {
        navigate('/admin/notifications')
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleSettingsClick = () => {
        navigate('/admin/settings')
        setIsProfileOpen(false)
    }

    const handleLogout = () => {
        console.log('Admin logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    return (
        <nav className="admin-navbar">
            <div className="navbar-left">
                <button
                    className="sidebar-toggle"
                    onClick={onToggleSidebar}
                    title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="navbar-brand">
                    <div className="brand-icon">ADM</div>
                    <span className="brand-text">Admin Panel</span>
                </div>

                <div className="navbar-breadcrumb">
                    <svg className="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="breadcrumb-text">{getCurrentPageName()}</span>
                </div>
            </div>

            <div className="navbar-right">
                <div className="navbar-stats">
                    <div className="stat-item">
                        <span className="stat-value">{systemAlerts.active}</span>
                        <span className="stat-label">/ {systemAlerts.total} Active Alerts</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    {/* Notifications */}
                    <button
                        className="action-btn notifications-btn"
                        onClick={handleNotificationsClick}
                        title="View notifications"
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h5v14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 3a9 9 0 01-9 9m9-9a9 9 0 00-9 9m9-9v18" />
                        </svg>
                        {notifications > 0 && <span className="badge">{notifications}</span>}
                    </button>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Admin Avatar"
                            />
                            <div className="admin-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L12.13 13.67C12.51 14.05 13.13 14.05 13.51 13.67L19.09 8.09L21.74 10.74L23 9.26L21 9Z"/>
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Administrator</span>
                                </div>
                                <button
                                    className="dropdown-item"
                                    onClick={() => navigate('/admin/profile')}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </button>
                                <button
                                    className="dropdown-item"
                                    onClick={handleSettingsClick}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </button>
                                <button
                                    className="dropdown-item dropdown-item--logout"
                                    onClick={handleLogout}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar