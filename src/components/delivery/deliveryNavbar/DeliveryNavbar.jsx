import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './DeliveryNavbar.scss'

const DeliveryNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [notifications] = useState(8) // Driver notifications count
    const [deliveryStats] = useState({ active: 2, completed: 15 }) // Delivery stats
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

    // Mock notification data
    const [notificationsList] = useState([
        {
            id: 1,
            type: 'new_order',
            title: 'New Delivery Order',
            message: 'You have a new delivery request from TechMart Store',
            time: '2 min ago',
            isRead: false,
            icon: 'package'
        },
        {
            id: 2,
            type: 'review',
            title: 'New Customer Review',
            message: 'Sarah Johnson left you a 5-star review',
            time: '15 min ago',
            isRead: false,
            icon: 'star'
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Received',
            message: 'Your earnings of $45.50 have been processed',
            time: '1 hour ago',
            isRead: true,
            icon: 'money'
        },
        {
            id: 4,
            type: 'alert',
            title: 'Route Updated',
            message: 'Traffic alert: Alternative route suggested for your delivery',
            time: '2 hours ago',
            isRead: false,
            icon: 'alert'
        },
        {
            id: 5,
            type: 'system',
            title: 'System Maintenance',
            message: 'Scheduled maintenance tonight from 2:00 AM - 4:00 AM',
            time: '3 hours ago',
            isRead: true,
            icon: 'system'
        },
        {
            id: 6,
            type: 'new_order',
            title: 'Order Cancelled',
            message: 'Order #12345 has been cancelled by the customer',
            time: '4 hours ago',
            isRead: false,
            icon: 'package'
        },
        {
            id: 7,
            type: 'payment',
            title: 'Weekly Earnings',
            message: 'Your weekly earnings report is ready: $285.75',
            time: '1 day ago',
            isRead: true,
            icon: 'money'
        },
        {
            id: 8,
            type: 'review',
            title: 'New Review Received',
            message: 'Mike Chen from TechMart Store rated your service',
            time: '2 days ago',
            isRead: false,
            icon: 'star'
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
        if (path === '/delivery' || path === '/delivery/') return 'Delivery Dashboard'
        if (path.includes('/active-deliveries')) return 'Active Deliveries'
        if (path.includes('/delivery-history')) return 'Delivery History'
        if (path.includes('/routes')) return 'Delivery Routes'
        if (path.includes('/delivery/')) return 'Delivery Details'
        if (path.includes('/earnings')) return 'Earnings'
        if (path.includes('/reports')) return 'Performance Reports'
        if (path.includes('/schedule')) return 'Schedule'
        if (path.includes('/availability')) return 'Availability'
        if (path.includes('/vehicle')) return 'Vehicle Information'
        if (path.includes('/support')) return 'Support Center'
        if (path.includes('/settings')) return 'Driver Settings'
        if (path.includes('/profile')) return 'Driver Profile'
        if (path.includes('/notifications')) return 'Notifications'
        return 'Delivery Dashboard'
    }

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
        setIsProfileOpen(false) // Close profile if open
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
        setIsNotificationsOpen(false) // Close notifications if open
    }

    const handleSettingsClick = () => {
        navigate('/delivery/settings')
        setIsProfileOpen(false)
    }

    const handleLogout = () => {
        console.log('Driver logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    const handleNotificationClick = (notificationId) => {
        console.log('Notification clicked:', notificationId)
        // Here you would handle marking as read and navigation
        setIsNotificationsOpen(false)
    }

    const handleMarkAllAsRead = () => {
        console.log('Mark all notifications as read')
        // Here you would update all notifications to read status
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_order':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                )
            case 'review':
                return (
                    <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                )
            case 'payment':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                )
            case 'alert':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                )
            case 'system':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                )
            default:
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM6 7v10H4V7h2zM20 3H8v14h12V3z" />
                    </svg>
                )
        }
    }

    const getNotificationTypeColor = (type) => {
        switch (type) {
            case 'new_order': return 'blue'
            case 'review': return 'yellow'
            case 'payment': return 'green'
            case 'alert': return 'orange'
            case 'system': return 'gray'
            default: return 'blue'
        }
    }

    const unreadCount = notificationsList.filter(n => !n.isRead).length

    return (
        <nav className="delivery-navbar">
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
                    <div className="brand-icon">DEL</div>
                    <span className="brand-text">Driver Portal</span>
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
                        <span className="stat-value">{deliveryStats.active}</span>
                        <span className="stat-label">Active</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    {/* Notifications */}
                    <div className="notifications-container" ref={notificationsRef}>
                        <button
                            className="action-btn notifications-btn"
                            onClick={handleNotificationsClick}
                            title="View notifications"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM6 7v10H4V7h2zM20 3H8v14h12V3z" />
                            </svg>
                            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                        </button>

                        {isNotificationsOpen && (
                            <div className="notifications-dropdown">
                                <div className="dropdown-header">
                                    <div className="header-title">
                                        <h3>Notifications</h3>
                                        <span className="notification-count">{unreadCount} new</span>
                                    </div>
                                    <button
                                        className="mark-all-read"
                                        onClick={handleMarkAllAsRead}
                                    >
                                        Mark all read
                                    </button>
                                </div>

                                <div className="notifications-list">
                                    {notificationsList.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                                            onClick={() => handleNotificationClick(notification.id)}
                                        >
                                            <div className={`notification-icon ${getNotificationTypeColor(notification.type)}`}>
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="notification-content">
                                                <div className="notification-header">
                                                    <h4>{notification.title}</h4>
                                                    <span className="notification-time">{notification.time}</span>
                                                </div>
                                                <p>{notification.message}</p>
                                            </div>
                                            {!notification.isRead && <div className="unread-indicator"></div>}
                                        </div>
                                    ))}
                                </div>

                                {/* <div className="dropdown-footer">
                                    <button
                                        className="view-all-btn"
                                        onClick={() => {
                                            navigate('/delivery/notifications')
                                            setIsNotificationsOpen(false)
                                        }}
                                    >
                                        View All Notifications
                                    </button>
                                </div> */}
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="user-profile" ref={profileRef}>
                        <button className="user-avatar" onClick={handleProfileClick}>
                            <img
                                src="https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Driver Avatar"
                            />
                            <div className="driver-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Delivery Driver</span>
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
                                    className="dropdown-item"
                                    onClick={() => {
                                        navigate('/delivery/profile')
                                        setIsProfileOpen(false)
                                    }}
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

export default DeliveryNavbar