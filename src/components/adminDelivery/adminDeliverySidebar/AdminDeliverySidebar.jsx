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
            path: '/adminDelivery/orders',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
            ),
            label: 'Orders',
            active: location.pathname === '/adminDelivery/orders'
        },
        {
            path: '/adminDelivery/orders-history',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            label: 'Orders History',
            active: location.pathname.includes('/orders-history')
        },
        {
            path: '/adminDelivery/drivers',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            label: 'Delivery Drivers',
            active: location.pathname === '/adminDelivery/drivers'
        },
        {
            path: '/adminDelivery/pending-drivers',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Pending Drivers',
            active: location.pathname.includes('/pending-drivers')
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
        console.log('Admin delivery logout clicked')
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
                            <div className="brand-icon">ADM</div>
                            <span className="brand-text">Admin Delivery</span>
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