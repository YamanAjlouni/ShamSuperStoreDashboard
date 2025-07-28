import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminCustomerServiceNavbar.scss'

const AdminCustomerServiceNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

    // Sample notifications data
    const [notificationsList] = useState([
        {
            id: 1,
            type: 'ticket',
            title: 'New Ticket Created',
            message: 'Ticket #T-001 for order #12345',
            time: '2 min ago',
            isRead: false
        },
        {
            id: 2,
            type: 'ticket',
            title: 'Ticket Resolved',
            message: 'Ticket #T-003 has been resolved',
            time: '15 min ago',
            isRead: false
        },
        {
            id: 3,
            type: 'customer',
            title: 'Customer Message',
            message: 'New message from John Doe',
            time: '30 min ago',
            isRead: true
        },
        {
            id: 4,
            type: 'system',
            title: 'System Alert',
            message: 'High priority tickets require attention',
            time: '1 hour ago',
            isRead: false
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
        if (path === '/adminCustomerService' || path === '/adminCustomerService/') return 'Admin CS Dashboard'
        if (path.includes('/users')) return 'Customer Service Users'
        return 'Admin Customer Service'
    }

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
        setIsProfileOpen(false)
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
        setIsNotificationsOpen(false)
    }

    const handleLogout = () => {
        console.log('Admin Customer Service logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'ticket':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                )
            case 'customer':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
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
        <nav className="admin-cs-navbar">
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
                    <div className="brand-icon">ACS</div>
                    <span className="brand-text">Admin Customer Service</span>
                </div>

                <div className="navbar-breadcrumb">
                    <svg className="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="breadcrumb-text">{getCurrentPageName()}</span>
                </div>
            </div>

            <div className="navbar-right">
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
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Admin CS Avatar"
                            />
                            <div className="admin-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Admin Customer Service</span>
                                </div>
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

export default AdminCustomerServiceNavbar