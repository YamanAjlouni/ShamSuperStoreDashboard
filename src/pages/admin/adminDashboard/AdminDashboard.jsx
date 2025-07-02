import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashboard.scss'

const AdminDashboard = () => {
    // Mock data - replace with real API calls
    const [dashboardStats, setDashboardStats] = useState({
        users: {
            total: 12456,
            active: 8934,
            newThisMonth: 456,
            growth: 12.5
        },
        sellers: {
            total: 1234,
            active: 987,
            pending: 45,
            growth: 8.3
        },
        orders: {
            total: 45678,
            pending: 234,
            completed: 44567,
            cancelled: 877,
            revenue: 2456789.50
        },
        drivers: {
            total: 345,
            active: 278,
            offline: 67,
            delivering: 156
        },
        returns: {
            total: 1234,
            pending: 89,
            processed: 1098,
            rejected: 47,
            growth: -5.2
        },
        reviews: {
            total: 8765,
            average: 4.3,
            newThisWeek: 156,
            growth: 18.7
        }
    })

    const [recentActivity, setRecentActivity] = useState([
        { id: 1, type: 'order', message: 'New order #12345 placed', time: '2 minutes ago', status: 'new' },
        { id: 2, type: 'user', message: 'New user registered: john.doe@email.com', time: '5 minutes ago', status: 'info' },
        { id: 3, type: 'seller', message: 'Seller "Tech Store" pending approval', time: '10 minutes ago', status: 'warning' },
        { id: 4, type: 'driver', message: 'Driver ID #456 went offline', time: '15 minutes ago', status: 'neutral' },
        { id: 5, type: 'payment', message: 'Payment dispute resolved for order #12340', time: '20 minutes ago', status: 'success' }
    ])

    const StatCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'blue', link }) => {
        const cardContent = (
            <div className={`stat-card stat-card--${color} ${link ? 'stat-card--clickable' : ''}`}>
                <div className="stat-card__header">
                    <div className="stat-card__icon">
                        {icon}
                    </div>
                    <div className="stat-card__trend">
                        <span className={`trend ${trend === 'up' ? 'trend--up' : trend === 'down' ? 'trend--down' : 'trend--neutral'}`}>
                            {trend === 'up' && (
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                            )}
                            {trend === 'down' && (
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                                </svg>
                            )}
                            {trendValue}%
                        </span>
                    </div>
                </div>
                <div className="stat-card__content">
                    <h3 className="stat-card__title">{title}</h3>
                    <div className="stat-card__value">{value}</div>
                    <p className="stat-card__subtitle">{subtitle}</p>
                </div>
            </div>
        )

        return link ? <Link to={link} className="stat-card-link">{cardContent}</Link> : cardContent
    }

    const ActivityItem = ({ activity }) => {
        const getActivityIcon = (type) => {
            switch (type) {
                case 'order':
                    return (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    )
                case 'user':
                    return (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    )
                case 'seller':
                    return (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    )
                case 'driver':
                    return (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    )
                case 'payment':
                    return (
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
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

        return (
            <div className={`activity-item activity-item--${activity.status}`}>
                <div className="activity-item__icon">
                    {getActivityIcon(activity.type)}
                </div>
                <div className="activity-item__content">
                    <p className="activity-item__message">{activity.message}</p>
                    <span className="activity-item__time">{activity.time}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Here's what's happening with your platform today.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <StatCard
                    title="Total Users"
                    value={dashboardStats.users.total.toLocaleString()}
                    subtitle={`${dashboardStats.users.active.toLocaleString()} active users`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    }
                    trend="up"
                    trendValue={dashboardStats.users.growth}
                    color="blue"
                    link="/admin/users"
                />

                <StatCard
                    title="Active Sellers"
                    value={dashboardStats.sellers.active.toLocaleString()}
                    subtitle={`${dashboardStats.sellers.pending} pending approval`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
                    trend="up"
                    trendValue={dashboardStats.sellers.growth}
                    color="green"
                    link="/admin/sellers"
                />

                <StatCard
                    title="Total Orders"
                    value={dashboardStats.orders.total.toLocaleString()}
                    subtitle={`$${(dashboardStats.orders.revenue / 1000000).toFixed(1)}M revenue`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    }
                    trend="up"
                    trendValue="15.2"
                    color="purple"
                    link="/admin/orders"
                />

                <StatCard
                    title="Delivery Drivers"
                    value={dashboardStats.drivers.active.toLocaleString()}
                    subtitle={`${dashboardStats.drivers.delivering} currently delivering`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    }
                    trend="neutral"
                    trendValue="2.1"
                    color="orange"
                    link="/admin/drivers"
                />

                <StatCard
                    title="Return Orders"
                    value={dashboardStats.returns.total.toLocaleString()}
                    subtitle={`${dashboardStats.returns.pending} pending review`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    }
                    trend="down"
                    trendValue={Math.abs(dashboardStats.returns.growth)}
                    color="red"
                    link="/admin/returns"
                />

                <StatCard
                    title="Customer Reviews"
                    value={dashboardStats.reviews.total.toLocaleString()}
                    subtitle={`${dashboardStats.reviews.average}★ average rating`}
                    icon={
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    }
                    trend="up"
                    trendValue={dashboardStats.reviews.growth}
                    color="yellow"
                    link="/admin/reviews"
                />
            </div>

            {/* Dashboard Content Grid */}
            <div className="dashboard-content">
                {/* Quick Actions */}
                <div className="dashboard-card">
                    <h2 className="card-title">Quick Actions</h2>
                    <div className="quick-actions">
                        <button className="action-btn action-btn--primary">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New User
                        </button>
                        <button className="action-btn action-btn--secondary">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Approve Sellers
                        </button>
                        <button className="action-btn action-btn--tertiary">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Reports
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Recent Activity</h2>
                        <button className="view-all-btn">View All</button>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="dashboard-card">
                    <h2 className="card-title">System Status</h2>
                    <div className="status-grid">
                        <div className="status-item status-item--operational">
                            <div className="status-indicator"></div>
                            <span>Payment Gateway</span>
                        </div>
                        <div className="status-item status-item--operational">
                            <div className="status-indicator"></div>
                            <span>Order Processing</span>
                        </div>
                        <div className="status-item status-item--warning">
                            <div className="status-indicator"></div>
                            <span>Email Service</span>
                        </div>
                        <div className="status-item status-item--operational">
                            <div className="status-indicator"></div>
                            <span>Database</span>
                        </div>
                    </div>
                </div>

                {/* Top Performing Sellers */}
                <div className="dashboard-card">
                    <h2 className="card-title">Top Performing Sellers</h2>
                    <div className="sellers-list">
                        <div className="seller-item">
                            <div className="seller-info">
                                <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=face" alt="Seller" />
                                <div>
                                    <h4>Tech Paradise</h4>
                                    <span>Electronics</span>
                                </div>
                            </div>
                            <div className="seller-stats">
                                <span className="revenue">$45,230</span>
                                <span className="orders">234 orders</span>
                            </div>
                        </div>
                        <div className="seller-item">
                            <div className="seller-info">
                                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop&crop=face" alt="Seller" />
                                <div>
                                    <h4>Fashion Hub</h4>
                                    <span>Clothing</span>
                                </div>
                            </div>
                            <div className="seller-stats">
                                <span className="revenue">$32,180</span>
                                <span className="orders">189 orders</span>
                            </div>
                        </div>
                        <div className="seller-item">
                            <div className="seller-info">
                                <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=40&h=40&fit=crop&crop=face" alt="Seller" />
                                <div>
                                    <h4>Home Essentials</h4>
                                    <span>Home & Garden</span>
                                </div>
                            </div>
                            <div className="seller-stats">
                                <span className="revenue">$28,450</span>
                                <span className="orders">156 orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard