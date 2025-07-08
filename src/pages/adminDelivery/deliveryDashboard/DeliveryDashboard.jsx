import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DeliveryDashboard.scss'

const DeliveryDashboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [driverStatus, setDriverStatus] = useState('online')
    const [dashboardData, setDashboardData] = useState({})

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockData = {
                    driver: {
                        name: 'John Smith',
                        rating: 4.8,
                        totalDeliveries: 1247,
                        joinedDate: '2023-03-15'
                    },
                    todayStats: {
                        deliveries: 12,
                        earnings: 145.80,
                        distance: 89.5,
                        hoursWorked: 7.5
                    },
                    weekStats: {
                        deliveries: 67,
                        earnings: 842.30,
                        distance: 456.2,
                        hoursWorked: 38.5
                    },
                    activeDeliveries: [
                        {
                            id: 'DEL001',
                            customerName: 'Sarah Johnson',
                            address: '123 Oak Street, Downtown',
                            orderTotal: 24.50,
                            pickupTime: '2024-01-25T14:30:00Z',
                            estimatedDelivery: '2024-01-25T15:15:00Z',
                            status: 'picked_up',
                            items: 3
                        },
                        {
                            id: 'DEL002',
                            customerName: 'Mike Chen',
                            address: '456 Pine Avenue, Midtown',
                            orderTotal: 31.75,
                            pickupTime: '2024-01-25T15:00:00Z',
                            estimatedDelivery: '2024-01-25T15:45:00Z',
                            status: 'assigned',
                            items: 5
                        }
                    ],
                    recentDeliveries: [
                        {
                            id: 'DEL098',
                            customerName: 'Emma Wilson',
                            address: '789 Elm Road',
                            orderTotal: 18.90,
                            completedAt: '2024-01-25T13:45:00Z',
                            rating: 5,
                            tip: 3.50
                        },
                        {
                            id: 'DEL097',
                            customerName: 'David Brown',
                            address: '321 Maple Drive',
                            orderTotal: 42.15,
                            completedAt: '2024-01-25T12:30:00Z',
                            rating: 4,
                            tip: 5.00
                        },
                        {
                            id: 'DEL096',
                            customerName: 'Lisa Garcia',
                            address: '654 Cedar Lane',
                            orderTotal: 28.60,
                            completedAt: '2024-01-25T11:15:00Z',
                            rating: 5,
                            tip: 4.25
                        }
                    ],
                    notifications: [
                        {
                            id: 1,
                            type: 'new_delivery',
                            message: 'New delivery request available in your area',
                            time: '5 minutes ago',
                            priority: 'high'
                        },
                        {
                            id: 2,
                            type: 'payment',
                            message: 'Weekly earnings deposited to your account',
                            time: '2 hours ago',
                            priority: 'normal'
                        }
                    ]
                }
                setDashboardData(mockData)
                setLoading(false)
            }, 1000)
        }

        fetchDashboardData()
    }, [])

    const toggleDriverStatus = () => {
        setDriverStatus(prev => prev === 'online' ? 'offline' : 'online')
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return '#3b82f6'
            case 'picked_up': return '#f59e0b'
            case 'delivered': return '#10b981'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'assigned': return 'Assigned'
            case 'picked_up': return 'Picked Up'
            case 'delivered': return 'Delivered'
            default: return status
        }
    }

    if (loading) {
        return (
            <div className="delivery-dashboard">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="delivery-dashboard">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="header-content">
                    <div className="driver-info">
                        <h1>Welcome back, {dashboardData.driver?.name}!</h1>
                        <div className="driver-stats">
                            <span className="rating">
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                {dashboardData.driver?.rating}
                            </span>
                            <span className="total-deliveries">{dashboardData.driver?.totalDeliveries} total deliveries</span>
                        </div>
                    </div>
                    <div className="status-controls">
                        <div className="status-toggle">
                            <label className="toggle-label">Driver Status</label>
                            <button
                                className={`status-btn ${driverStatus}`}
                                onClick={toggleDriverStatus}
                            >
                                <span className="status-indicator"></span>
                                <span className="status-text">{driverStatus === 'online' ? 'Online' : 'Offline'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card today">
                    <div className="stat-header">
                        <h3>Today</h3>
                        <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{dashboardData.todayStats?.deliveries}</span>
                            <span className="label">Deliveries</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{formatCurrency(dashboardData.todayStats?.earnings)}</span>
                                <span className="label">Earnings</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{dashboardData.todayStats?.distance} mi</span>
                                <span className="label">Distance</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card week">
                    <div className="stat-header">
                        <h3>This Week</h3>
                        <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{dashboardData.weekStats?.deliveries}</span>
                            <span className="label">Deliveries</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{formatCurrency(dashboardData.weekStats?.earnings)}</span>
                                <span className="label">Earnings</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{dashboardData.weekStats?.hoursWorked}h</span>
                                <span className="label">Hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card quick-actions">
                    <div className="stat-header">
                        <h3>Quick Actions</h3>
                        <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="quick-actions-content">
                        <button
                            className="action-btn primary"
                            onClick={() => navigate('/delivery/active-deliveries')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            View Active Deliveries
                        </button>
                        <button
                            className="action-btn secondary"
                            onClick={() => navigate('/delivery/routes')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Optimize Routes
                        </button>
                        <button
                            className="action-btn secondary"
                            onClick={() => navigate('/delivery/earnings')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            View Earnings
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">
                {/* Active Deliveries */}
                <div className="content-card active-deliveries">
                    <div className="card-header">
                        <h3>Active Deliveries ({dashboardData.activeDeliveries?.length || 0})</h3>
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/delivery/active-deliveries')}
                        >
                            View All
                        </button>
                    </div>
                    <div className="card-content">
                        {dashboardData.activeDeliveries?.length > 0 ? (
                            dashboardData.activeDeliveries.map((delivery) => (
                                <div key={delivery.id} className="delivery-item">
                                    <div className="delivery-header">
                                        <div className="delivery-id">#{delivery.id}</div>
                                        <div
                                            className="delivery-status"
                                            style={{ backgroundColor: getStatusColor(delivery.status) }}
                                        >
                                            {getStatusLabel(delivery.status)}
                                        </div>
                                    </div>
                                    <div className="delivery-info">
                                        <div className="customer-name">{delivery.customerName}</div>
                                        <div className="delivery-address">{delivery.address}</div>
                                        <div className="delivery-details">
                                            <span className="order-total">{formatCurrency(delivery.orderTotal)}</span>
                                            <span className="items-count">{delivery.items} items</span>
                                            <span className="delivery-time">ETA: {formatTime(delivery.estimatedDelivery)}</span>
                                        </div>
                                    </div>
                                    <div className="delivery-actions">
                                        <button className="action-btn start-delivery">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V3m0 3L9 9l3-3 3 3M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                                            </svg>
                                            {delivery.status === 'assigned' ? 'Start Delivery' : 'Continue'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <p>No active deliveries</p>
                                <span>Check back for new delivery requests</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="content-card recent-activity">
                    <div className="card-header">
                        <h3>Recent Deliveries</h3>
                        <button
                            className="view-all-btn"
                            onClick={() => navigate('/delivery/delivery-history')}
                        >
                            View History
                        </button>
                    </div>
                    <div className="card-content">
                        {dashboardData.recentDeliveries?.map((delivery) => (
                            <div key={delivery.id} className="recent-item">
                                <div className="recent-info">
                                    <div className="customer-name">{delivery.customerName}</div>
                                    <div className="delivery-time">{formatTime(delivery.completedAt)}</div>
                                </div>
                                <div className="recent-details">
                                    <div className="rating">
                                        <svg fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                        {delivery.rating}
                                    </div>
                                    <div className="earnings">
                                        {formatCurrency(delivery.orderTotal)}
                                        {delivery.tip > 0 && (
                                            <span className="tip">+{formatCurrency(delivery.tip)} tip</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notifications */}
                <div className="content-card notifications">
                    <div className="card-header">
                        <h3>Notifications</h3>
                        <button className="view-all-btn">Mark All Read</button>
                    </div>
                    <div className="card-content">
                        {dashboardData.notifications?.map((notification) => (
                            <div key={notification.id} className={`notification-item ${notification.priority}`}>
                                <div className="notification-icon">
                                    {notification.type === 'new_delivery' ? (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    ) : (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    )}
                                </div>
                                <div className="notification-content">
                                    <div className="notification-message">{notification.message}</div>
                                    <div className="notification-time">{notification.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryDashboard