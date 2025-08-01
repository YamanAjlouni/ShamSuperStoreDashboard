import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './DeliverySidebar.scss'

const DeliverySidebar = ({ isCollapsed, isMobile, isOpen, onClose }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        {
            path: '/delivery',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: 'Dashboard',
            active: location.pathname === '/delivery' || location.pathname === '/delivery/'
        },
        {
            path: '/delivery/orders',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            ),
            label: 'Available Orders',
            active: location.pathname.includes('/orders')
        },
        {
            path: '/delivery/active-deliveries',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            label: 'Active Deliveries',
            active: location.pathname.includes('/active-deliveries')
        },
        {
            path: '/delivery/delivery-history',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: 'Delivery History',
            active: location.pathname.includes('/delivery-history')
        },
        {
            path: '/delivery/earnings',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            label: 'Earnings',
            active: location.pathname.includes('/earnings')
        },
        {
            path: '/delivery/reviews',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            label: 'Reviews',
            active: location.pathname.includes('/reviews')
        },
        {
            path: '/delivery/settings',
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

export default DeliverySidebar