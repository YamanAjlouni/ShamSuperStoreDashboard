import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminNavbar.scss'

const AdminNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [systemAlerts] = useState({ active: 3, total: 8 })
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

    // Sample notifications data
    const [notificationsList] = useState([
        {
            id: 1,
            type: 'order',
            title: 'New Order Submitted',
            message: 'Order #12345 from John Doe',
            time: '2 min ago',
            isRead: false
        },
        {
            id: 2,
            type: 'seller',
            title: 'New Seller Registration',
            message: 'Fresh Market Co. applied to become a seller',
            time: '5 min ago',
            isRead: false
        },
        {
            id: 3,
            type: 'review',
            title: 'New Review Posted',
            message: '5-star review for Organic Apples',
            time: '15 min ago',
            isRead: false
        },
        {
            id: 4,
            type: 'driver',
            title: 'Driver Application',
            message: 'Michael Smith applied as delivery driver',
            time: '1 hour ago',
            isRead: true
        },
        {
            id: 5,
            type: 'payment',
            title: 'Payment Issue',
            message: 'Failed payment for order #12340',
            time: '2 hours ago',
            isRead: false
        },
        {
            id: 6,
            type: 'system',
            title: 'System Alert',
            message: 'Server maintenance scheduled for tonight',
            time: '3 hours ago',
            isRead: true
        }
    ])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false)
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
        if (path.includes('/accountants')) return 'Accountant Management'
        if (path.includes('/orders/details/')) return 'Order Details'
        if (path.includes('/orders/analytics')) return 'Order Analytics'
        if (path.includes('/orders')) return 'Order Management'
        if (path.includes('/products')) return 'Product Management'
        if (path.includes('/categories')) return 'Category Management'
        if (path.includes('/payments')) return 'Payment Management'
        if (path.includes('/reports')) return 'Financial Reports'
        if (path.includes('/settings')) return 'System Settings'
        if (path.includes('/logs')) return 'System Logs'
        return 'Admin Dashboard'
    }

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
        setIsProfileOpen(false)
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
        setIsNotificationsOpen(false)
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

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'order':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                )
            case 'seller':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                )
            case 'review':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                )
            case 'driver':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29" />
                    </svg>
                )
            case 'payment':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                )
            case 'system':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            default:
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
        }
    }

    const unreadCount = notificationsList.filter(notif => !notif.isRead).length

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
                    <div className="notifications-wrapper" ref={notificationsRef}>
                        <button
                            className="action-btn notifications-btn"
                            onClick={handleNotificationsClick}
                            title="View notifications"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                        </button>

                        {isNotificationsOpen && (
                            <div className="notifications-dropdown">
                                <div className="dropdown-header">
                                    <span className="dropdown-title">Notifications</span>
                                    <span className="notifications-count">{unreadCount} new</span>
                                </div>

                                <div className="notifications-list">
                                    {notificationsList.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${!notification.isRead ? 'notification-item--unread' : ''}`}
                                        >
                                            <div className="notification-icon">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-title">{notification.title}</div>
                                                <div className="notification-message">{notification.message}</div>
                                                <div className="notification-time">{notification.time}</div>
                                            </div>
                                            {!notification.isRead && <div className="notification-dot"></div>}
                                        </div>
                                    ))}
                                </div>

                                {/* <div className="dropdown-footer">
                                    <button className="view-all-btn">View All Notifications</button>
                                </div> */}
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Admin Avatar"
                            />
                            <div className="admin-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L12.13 13.67C12.51 14.05 13.13 14.05 13.51 13.67L19.09 8.09L21.74 10.74L23 9.26L21 9Z" />
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