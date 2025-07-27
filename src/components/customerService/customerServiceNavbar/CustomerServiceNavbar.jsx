import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './CustomerServiceNavbar.scss'

const CustomerServiceNavbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [serviceStats] = useState({ activeTickets: 12, totalOrders: 156 })
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

    // Sample notifications data for customer service
    const [notificationsList] = useState([
        {
            id: 1,
            type: 'ticket',
            title: 'New Support Ticket',
            message: 'Customer John Doe created ticket #T-001',
            time: '2 min ago',
            isRead: false
        },
        {
            id: 2,
            type: 'order_issue',
            title: 'Order Issue Reported',
            message: 'Order #12345 has delivery issue',
            time: '5 min ago',
            isRead: false
        },
        {
            id: 3,
            type: 'urgent',
            title: 'Urgent Customer Request',
            message: 'Customer needs immediate assistance',
            time: '15 min ago',
            isRead: false
        },
        {
            id: 4,
            type: 'resolved',
            title: 'Ticket Resolved',
            message: 'Ticket #T-098 has been resolved',
            time: '1 hour ago',
            isRead: true
        },
        {
            id: 5,
            type: 'complaint',
            title: 'New Complaint',
            message: 'Product quality complaint for order #12340',
            time: '2 hours ago',
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

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
        setIsProfileOpen(false)
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
        setIsNotificationsOpen(false)
    }

    const handleLogout = () => {
        console.log('Customer Service logout clicked')
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
            case 'order_issue':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                )
            case 'urgent':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'resolved':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'complaint':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m10 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2" />
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
        <nav className="customer-service-navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <div className="brand-icon">CS</div>
                    <span className="brand-text">Customer Service</span>
                </div>

                <div className="navbar-breadcrumb">
                    <svg className="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="breadcrumb-text">Support Dashboard</span>
                </div>
            </div>

            <div className="navbar-right">
                <div className="navbar-stats">
                    <div className="stat-item">
                        <span className="stat-value">{serviceStats.activeTickets}</span>
                        <span className="stat-label">Active Tickets</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{serviceStats.totalOrders}</span>
                        <span className="stat-label">Total Orders</span>
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
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Customer Service Avatar"
                            />
                            <div className="cs-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.59 10.75C10.21 11.13 10.21 11.75 10.59 12.13L12.13 13.67C12.51 14.05 13.13 14.05 13.51 13.67L19.09 8.09L21.74 10.74L23 9.26L21 9Z" />
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Customer Service</span>
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

export default CustomerServiceNavbar