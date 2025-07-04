import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.scss'

const Sidebar = ({ isCollapsed, isMobile, isOpen, onClose }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        {
            path: '/seller',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            label: 'Home',
            active: location.pathname === '/seller' || location.pathname === '/seller/'
        },
        {
            path: '/seller/products',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            label: 'Products',
            active: location.pathname.includes('/products')
        },
        {
            path: '/seller/coupons',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 11-1-4V7a2 2 0 00-2-2H5z" />
                </svg>
            ),
            label: 'Coupons',
            active: location.pathname.includes('/coupons')
        },
        {
            path: '/seller/orders',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                </svg>
            ),
            label: 'Orders',
            active: location.pathname.includes('/orders')
        },
        {
            path: '/seller/payments',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
            label: 'Payments',
            active: location.pathname.includes('/payments')
        },
        {
            path: '/seller/refund',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            ),
            label: 'Refund',
            active: location.pathname.includes('/refund')
        },
        {
            path: '/seller/settings',
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
        console.log('Logout clicked')
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
                <div className="sidebar-overlay" onClick={handleCloseClick}></div>
            )}

            <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${isMobile ? 'sidebar--mobile' : ''} ${isMobile && isOpen ? 'sidebar--open' : ''}`}>
                {/* Mobile Header with Close Button */}
                {isMobile && (
                    <div className="sidebar-header">
                        <div className="brand-section">
                            <div className="brand-icon">SHA</div>
                            <span className="brand-text">My Store</span>
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

export default Sidebar