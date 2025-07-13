import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AdminDeliveryNavbar.scss'

const AdminDeliveryNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [notifications] = useState([
        {
            id: 1,
            type: 'new_order',
            title: 'New Order Received',
            message: 'Order #12345 from John Doe',
            time: '2 min ago',
            unread: true
        },
        {
            id: 2,
            type: 'driver_signup',
            title: 'New Driver Signup',
            message: 'Sarah Johnson applied as delivery driver',
            time: '15 min ago',
            unread: true
        },
        {
            id: 3,
            type: 'order_delivered',
            title: 'Order Delivered',
            message: 'Order #12340 successfully delivered',
            time: '1 hour ago',
            unread: false
        },
        {
            id: 4,
            type: 'driver_approved',
            title: 'Driver Approved',
            message: 'Mike Wilson has been approved as driver',
            time: '2 hours ago',
            unread: false
        },
        {
            id: 5,
            type: 'new_order',
            title: 'New Order Received',
            message: 'Order #12338 from Emma Davis',
            time: '3 hours ago',
            unread: true
        }
    ])

    const [deliveryStats] = useState({ pending: 8, processing: 5, activeDrivers: 12 })
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

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
        if (path === '/adminDelivery' || path === '/adminDelivery/') return 'Admin Dashboard'
        if (path === '/adminDelivery/orders') return 'Orders Management'
        if (path.includes('/orders-history')) return 'Orders History'
        if (path === '/adminDelivery/drivers') return 'Delivery Drivers'
        if (path.includes('/pending-drivers')) return 'Pending Drivers'
        if (path.includes('/reports')) return 'Reports & Analytics'
        if (path.includes('/settings')) return 'Admin Settings'
        return 'Admin Dashboard'
    }

    const handleNotificationsClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen)
    }

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleSettingsClick = () => {
        navigate('/adminDelivery/settings')
        setIsProfileOpen(false)
    }

    const handleLogout = () => {
        console.log('Admin delivery logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_order':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                )
            case 'driver_signup':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                )
            case 'order_delivered':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            case 'driver_approved':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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

    const unreadCount = notifications.filter(n => n.unread).length

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
                    <div className="brand-icon">ADM</div>
                    <span className="brand-text">Admin Delivery</span>
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
                        <span className="stat-value">{deliveryStats.pending}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-divider">|</div>
                    <div className="stat-item">
                        <span className="stat-value">{deliveryStats.processing}</span>
                        <span className="stat-label">Processing</span>
                    </div>
                    <div className="stat-divider">|</div>
                    <div className="stat-item">
                        <span className="stat-value">{deliveryStats.activeDrivers}</span>
                        <span className="stat-label">Drivers</span>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6.5a2.5 2.5 0 010-5H11m0 0V9a2 2 0 012-2m-2 7a2 2 0 01-2-2M9 9a2 2 0 012-2m0 0V5a2 2 0 012-2m-2 2a2 2 0 00-2 2" />
                            </svg>
                            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                        </button>

                        {isNotificationsOpen && (
                            <div className="notifications-dropdown">
                                <div className="dropdown-header">
                                    <h3>Notifications</h3>
                                    <span className="unread-count">{unreadCount} unread</span>
                                </div>
                                <div className="notifications-list">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`notification-item ${notification.unread ? 'unread' : ''}`}
                                        >
                                            <div className="notification-icon">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="notification-content">
                                                <h4>{notification.title}</h4>
                                                <p>{notification.message}</p>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                            {notification.unread && <div className="unread-indicator"></div>}
                                        </div>
                                    ))}
                                </div>
                                {/* <div className="dropdown-footer">
                                    <button
                                        className="view-all-btn"
                                        onClick={() => {
                                            navigate('/adminDelivery/notifications')
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
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Admin Avatar"
                            />
                            <div className="admin-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Admin Delivery</span>
                                    <span className="admin-status online">Online</span>
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
                                        navigate('/adminDelivery/profile')
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

export default AdminDeliveryNavbar