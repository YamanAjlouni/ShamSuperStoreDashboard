import { Link, useLocation, useNavigate } from 'react-router-dom'
import './AdminDeliverySidebar.scss'

const AdminDeliverySidebar = ({ isCollapsed, isMobile, isOpen, onClose }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        {
            path: '/adminDelivery',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: 'Dashboard',
            active: location.pathname === '/adminDelivery' || location.pathname === '/adminDelivery/'
        },
        {
            path: '/adminDelivery/active-deliveries',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            label: 'Active Deliveries',
            active: location.pathname.includes('/active-deliveries')
        },
        {
            path: '/adminDelivery/delivery-history',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Delivery History',
            active: location.pathname.includes('/delivery-history')
        },
        {
            path: '/adminDelivery/routes',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            label: 'Routes',
            active: location.pathname.includes('/routes')
        },
        {
            path: '/adminDelivery/earnings',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            label: 'Earnings',
            active: location.pathname.includes('/earnings')
        },
        {
            path: '/adminDelivery/reports',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            label: 'Reports',
            active: location.pathname.includes('/reports')
        },
        {
            path: '/adminDelivery/schedule',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            label: 'Schedule',
            active: location.pathname.includes('/schedule')
        },
        {
            path: '/adminDelivery/availability',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Availability',
            active: location.pathname.includes('/availability')
        },
        {
            path: '/adminDelivery/vehicle',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            label: 'Vehicle Info',
            active: location.pathname.includes('/vehicle')
        },
        {
            path: '/adminDelivery/support',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            label: 'Support',
            active: location.pathname.includes('/support')
        },
        {
            path: '/adminDelivery/settings',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: 'Settings',
            active: location.pathname.includes('/settings')
        }
    ]

    const handleLogout = () => {
        console.log('Driver logout clicked')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userRole')
        navigate('/login')
        // Close mobile sidebar after logout
        if (isMobile && onClose) {
            onClose()
        }
    }

    const handleLinkClick = () => {
        // Close mobile sidebar when any link is clicked
        if (isMobile && onClose) {
            onClose()
        }
    }

    const handleCloseClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (onClose) {
            onClose()
        }
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div className="delivery-sidebar-overlay" onClick={handleCloseClick}></div>
            )}

            <aside className={`delivery-sidebar ${isCollapsed ? 'delivery-sidebar--collapsed' : ''} ${isMobile ? 'delivery-sidebar--mobile' : ''} ${isMobile && isOpen ? 'delivery-sidebar--open' : ''}`}>
                {/* Mobile Header with Close Button */}
                {isMobile && (
                    <div className="sidebar-header">
                        <div className="brand-section">
                            <div className="brand-icon">DEL</div>
                            <span className="brand-text">Driver Portal</span>
                        </div>
                        <button className="close-btn" onClick={handleCloseClick} type="button">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="sidebar-content">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className={`sidebar-item ${item.active ? 'sidebar-item--active' : ''}`}
                            title={isCollapsed ? item.label : ''}
                            onClick={handleLinkClick}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                        </Link>
                    ))}

                    <button
                        className="sidebar-item sidebar-item--logout"
                        onClick={handleLogout}
                        title={isCollapsed ? 'Logout' : ''}
                        type="button"
                    >
                        <span className="sidebar-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </span>
                        <span className="sidebar-label">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default AdminDeliverySidebar