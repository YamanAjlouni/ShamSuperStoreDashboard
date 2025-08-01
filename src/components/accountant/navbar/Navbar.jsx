import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.scss'

const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()

    // Sample notification data for accountant
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'report',
            title: 'Monthly Report Ready',
            message: 'Sales report for January 2025 has been generated',
            time: '1 hour ago',
            isRead: false,
            icon: 'chart'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Settlement Complete',
            message: 'Settlement batch #PS-2025-001 has been processed',
            time: '3 hours ago',
            isRead: false,
            icon: 'credit-card'
        },
        {
            id: 3,
            type: 'tax',
            title: 'Tax Report Update',
            message: 'Quarterly tax calculations have been updated',
            time: '1 day ago',
            isRead: true,
            icon: 'calculator'
        },
        {
            id: 4,
            type: 'commission',
            title: 'Commission Summary',
            message: 'Weekly commission report is available for review',
            time: '2 days ago',
            isRead: true,
            icon: 'dollar-sign'
        }
    ])

    const [reports] = useState({ pending: 3, completed: 15 })
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationRef = useRef(null)

    // Get unread notifications count
    const unreadCount = notifications.filter(n => !n.isRead).length

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Get current page name from location
    const getCurrentPageName = () => {
        const path = location.pathname
        if (path === '/accountant' || path === '/accountant/') return 'Dashboard'
        if (path.includes('/orders-reports')) return 'Orders & Sales Reports'
        if (path.includes('/payment-reports')) return 'Payment Reports'
        if (path.includes('/tax-information')) return 'Tax Information'
        if (path.includes('/settings')) return 'Settings'
        return 'Dashboard'
    }

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen)
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleSettingsClick = () => {
        navigate('/accountant/settings')
        setIsProfileOpen(false)
    }

    const handleLogout = () => {
        console.log('Logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        )
    }

    const getNotificationIcon = (iconType) => {
        switch (iconType) {
            case 'chart':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                )
            case 'credit-card':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                )
            case 'calculator':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                )
            case 'dollar-sign':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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

    const getNotificationTypeColor = (type) => {
        switch (type) {
            case 'report':
                return 'notification-report'
            case 'payment':
                return 'notification-payment'
            case 'tax':
                return 'notification-tax'
            case 'commission':
                return 'notification-commission'
            default:
                return 'notification-info'
        }
    }

    return (
        <nav className="navbar">
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
                    <div className="brand-icon">ACT</div>
                    <span className="brand-text">Accounting</span>
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
                        <span className="stat-value">{reports.pending}</span>
                        <span className="stat-label">Pending / {reports.completed} Reports</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    {/* Notifications */}
                    <div className="notification-container" ref={notificationRef}>
                        <button
                            className="action-btn notification-btn"
                            onClick={handleNotificationClick}
                            title="View notifications"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                        </button>

                        {isNotificationOpen && (
                            <div className="notification-dropdown">
                                <div className="notification-header">
                                    <div className="notification-title">
                                        <h3>Notifications</h3>
                                        <span className="notification-count">{unreadCount} new</span>
                                    </div>
                                    {unreadCount > 0 && (
                                        <button
                                            className="mark-all-read-btn"
                                            onClick={markAllAsRead}
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                <div className="notification-list">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className={`notification-icon ${getNotificationTypeColor(notification.type)}`}>
                                                {getNotificationIcon(notification.icon)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-text">
                                                    <h4>{notification.title}</h4>
                                                    <p>{notification.message}</p>
                                                </div>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                            {!notification.isRead && <div className="unread-indicator"></div>}
                                        </div>
                                    ))}
                                </div>

                                <div className="notification-footer">
                                    <button className="view-all-btn">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="User Avatar"
                            />
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <button
                                    className="dropdown-item"
                                    onClick={handleSettingsClick}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
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

export default Navbar