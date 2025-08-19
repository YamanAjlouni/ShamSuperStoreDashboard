import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './WebsiteAdminNavbar.scss'

const WebsiteAdminNavbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [systemAlerts] = useState({ active: 2, total: 5 })
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const profileRef = useRef(null)
    const notificationsRef = useRef(null)

    const [notificationsList] = useState([
        {
            id: 1,
            type: 'content',
            title: 'Content Update Required',
            message: 'Homepage banner needs refresh',
            time: '5 min ago',
            isRead: false
        },
        {
            id: 2,
            type: 'seo',
            title: 'SEO Warning',
            message: 'Missing meta description on 3 pages',
            time: '15 min ago',
            isRead: false
        },
        {
            id: 3,
            type: 'performance',
            title: 'Performance Alert',
            message: 'Site speed decreased to 87%',
            time: '1 hour ago',
            isRead: false
        },
        {
            id: 4,
            type: 'backup',
            title: 'Backup Completed',
            message: 'Daily backup finished successfully',
            time: '2 hours ago',
            isRead: true
        },
        {
            id: 5,
            type: 'security',
            title: 'Security Update',
            message: 'SSL certificate renewed',
            time: '1 day ago',
            isRead: true
        }
    ])

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

    const getCurrentPageName = () => {
        const path = location.pathname
        if (path === '/websiteAdmin' || path === '/websiteAdmin/') return 'Website Dashboard'
        if (path.includes('/pages')) return 'Pages Management'
        if (path.includes('/content')) return 'Content Management'
        if (path.includes('/menus')) return 'Menu Management'
        if (path.includes('/sliders')) return 'Slider Management'
        if (path.includes('/banners')) return 'Banner Management'
        if (path.includes('/intro-section')) return 'Intro Section'
        if (path.includes('/features-products')) return 'Features Products'
        if (path.includes('/highlights')) return 'Highlights Management'
        if (path.includes('/news')) return 'News Management'
        if (path.includes('/seo')) return 'SEO Management'
        if (path.includes('/meta')) return 'Meta Tags'
        if (path.includes('/analytics')) return 'Website Analytics'
        if (path.includes('/marketing')) return 'Marketing Tools'
        if (path.includes('/themes')) return 'Theme Management'
        if (path.includes('/customization')) return 'Website Customization'
        if (path.includes('/media')) return 'Media Library'
        if (path.includes('/general-settings')) return 'General Settings'
        if (path.includes('/contact-info')) return 'Contact Information'
        if (path.includes('/social-media')) return 'Social Media Settings'
        if (path.includes('/maintenance')) return 'Maintenance Mode'
        if (path.includes('/security')) return 'Website Security'
        if (path.includes('/backups')) return 'Website Backups'
        if (path.includes('/performance')) return 'Performance Optimization'
        if (path.includes('/settings')) return 'Website Settings'
        return 'Website Dashboard'
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
        navigate('/websiteAdmin/general-settings')
        setIsProfileOpen(false)
    }

    const handleLogout = () => {
        console.log('Website Admin logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        setIsProfileOpen(false)
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'content':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                )
            case 'seo':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                )
            case 'performance':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                )
            case 'backup':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                )
            case 'security':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
        <nav className="website-admin-navbar">
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
                    <div className="brand-icon">WEB</div>
                    <span className="brand-text">Website Admin</span>
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
                        <span className="stat-label">/ {systemAlerts.total} Website Issues</span>
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
                                    <span className="dropdown-title">Website Notifications</span>
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
                                alt="Website Admin Avatar"
                            />
                            <div className="admin-indicator">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                        </button>

                        {isProfileOpen && (
                            <div className="profile-dropdown">
                                <div className="dropdown-header">
                                    <span className="user-role">Website Administrator</span>
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

export default WebsiteAdminNavbar