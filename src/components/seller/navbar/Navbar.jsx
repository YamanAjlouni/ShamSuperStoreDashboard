import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.scss'

const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Sample notification data
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'New Order Received',
            message: 'Order #12345 has been placed by John Doe',
            time: '2 minutes ago',
            isRead: false,
            icon: 'shopping-bag'
        },
        {
            id: 2,
            type: 'approval',
            title: 'Product Approved',
            message: 'Your product "Premium Headphones" has been approved by admin',
            time: '1 hour ago',
            isRead: false,
            icon: 'check-circle'
        },
        {
            id: 3,
            type: 'payment',
            title: 'Payment Received',
            message: 'Payment of $299.99 has been processed successfully',
            time: '3 hours ago',
            isRead: true,
            icon: 'credit-card'
        },
        {
            id: 4,
            type: 'order',
            title: 'Order Shipped',
            message: 'Order #12340 has been shipped to customer',
            time: '1 day ago',
            isRead: true,
            icon: 'truck'
        },
        {
            id: 5,
            type: 'rejection',
            title: 'Product Rejected',
            message: 'Your product "Basic Earbuds" needs revision',
            time: '2 days ago',
            isRead: false,
            icon: 'x-circle'
        }
    ])

    const [products] = useState({ current: 7, total: 10 })
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
        if (path === '/') return 'Dashboard'
        if (path.includes('/products')) return 'Products'
        if (path.includes('/coupons')) return 'Coupons'
        if (path.includes('/orders')) return 'Orders'
        if (path.includes('/payments')) return 'Payments'
        if (path.includes('/refund')) return 'Refund'
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
        navigate('/seller/settings')
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
            case 'shopping-bag':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                )
            case 'check-circle':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'credit-card':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                )
            case 'truck':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                )
            case 'x-circle':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            case 'order':
                return 'notification-order'
            case 'approval':
                return 'notification-success'
            case 'payment':
                return 'notification-payment'
            case 'rejection':
                return 'notification-error'
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
                    <div className="brand-icon">SHA</div>
                    <span className="brand-text">My Store</span>
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
                        <span className="stat-value">{products.current}</span>
                        <span className="stat-label">/ {products.total} Products</span>
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
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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