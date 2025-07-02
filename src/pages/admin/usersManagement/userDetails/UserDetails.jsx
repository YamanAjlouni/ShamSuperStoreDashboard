import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './UserDetails.scss'

const UserDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)

    // Mock user data
    const mockUserData = {
        id: id,
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+1 (555) 123-0001',
        address: '123 Maple Street, New York, NY 10001',
        status: 'active',
        joinDate: '2024-01-10',
        lastLoginDate: '2024-06-25',
        accountType: 'premium',
        totalOrders: 15,
        totalSpent: 2450.75,
        averageOrderValue: 163.38,
        lastOrderDate: '2024-06-20',
        favoriteCategories: ['Electronics', 'Books', 'Home & Garden'],
        paymentMethods: [
            { type: 'Credit Card', last4: '1234', isDefault: true },
            { type: 'PayPal', email: 'alice.johnson@email.com', isDefault: false }
        ],
        shippingAddresses: [
            {
                id: 1,
                name: 'Home',
                address: '123 Maple Street, New York, NY 10001',
                isDefault: true
            },
            {
                id: 2,
                name: 'Work',
                address: '456 Business Ave, New York, NY 10002',
                isDefault: false
            }
        ],
        preferences: {
            newsletter: true,
            smsNotifications: false,
            emailNotifications: true,
            language: 'English',
            currency: 'USD'
        }
    }

    const mockOrders = [
        {
            id: 'ORD001',
            orderNumber: '#12345',
            date: '2024-06-20',
            status: 'delivered',
            total: 129.99,
            items: 3,
            seller: 'Tech Paradise',
            shippingAddress: '123 Maple Street, New York, NY 10001',
            trackingNumber: 'TRK123456789'
        },
        {
            id: 'ORD002',
            orderNumber: '#12344',
            date: '2024-06-15',
            status: 'delivered',
            total: 89.50,
            items: 2,
            seller: 'Fashion Hub',
            shippingAddress: '123 Maple Street, New York, NY 10001',
            trackingNumber: 'TRK123456788'
        },
        {
            id: 'ORD003',
            orderNumber: '#12343',
            date: '2024-06-10',
            status: 'processing',
            total: 234.75,
            items: 5,
            seller: 'Home Essentials',
            shippingAddress: '456 Business Ave, New York, NY 10002',
            trackingNumber: 'TRK123456787'
        },
        {
            id: 'ORD004',
            orderNumber: '#12342',
            date: '2024-06-05',
            status: 'cancelled',
            total: 45.99,
            items: 1,
            seller: 'Book Store',
            shippingAddress: '123 Maple Street, New York, NY 10001',
            trackingNumber: null
        },
        {
            id: 'ORD005',
            orderNumber: '#12341',
            date: '2024-05-28',
            status: 'delivered',
            total: 299.99,
            items: 4,
            seller: 'Tech Paradise',
            shippingAddress: '123 Maple Street, New York, NY 10001',
            trackingNumber: 'TRK123456786'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setUser(mockUserData)
            setOrders(mockOrders)
            setLoading(false)
        }, 1000)
    }, [id])

    const handleContactUser = () => {
        window.location.href = `mailto:${user.email}?subject=Regarding your account`
    }

    const handleSuspendUser = () => {
        if (window.confirm('Are you sure you want to suspend this user?')) {
            setUser({ ...user, status: 'suspended' })
        }
    }

    const handleActivateUser = () => {
        if (window.confirm('Are you sure you want to activate this user?')) {
            setUser({ ...user, status: 'active' })
        }
    }

    const handleDeleteUser = () => {
        if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
            navigate('/admin/users')
        }
    }

    const handleResetPassword = () => {
        navigate(`/admin/users/reset-password/${user.id}`)
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'success', label: 'Active' },
            suspended: { class: 'warning', label: 'Suspended' },
            inactive: { class: 'danger', label: 'Inactive' }
        }
        const config = statusConfig[status] || statusConfig.inactive
        return <span className={`status-badge status-badge--${config.class}`}>{config.label}</span>
    }

    const getOrderStatusBadge = (status) => {
        const statusConfig = {
            delivered: { class: 'success', label: 'Delivered' },
            processing: { class: 'warning', label: 'Processing' },
            cancelled: { class: 'danger', label: 'Cancelled' },
            pending: { class: 'info', label: 'Pending' }
        }
        const config = statusConfig[status] || statusConfig.pending
        return <span className={`order-status order-status--${config.class}`}>{config.label}</span>
    }

    const getAccountTypeBadge = (accountType) => {
        const typeConfig = {
            premium: { class: 'premium', label: 'Premium' },
            standard: { class: 'standard', label: 'Standard' }
        }
        const config = typeConfig[accountType] || typeConfig.standard
        return <span className={`account-type account-type--${config.class}`}>{config.label}</span>
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="user-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading user details...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="user-details">
                <div className="error-state">
                    <h2>User Not Found</h2>
                    <p>The user you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/admin/users')}>Back to Users</button>
                </div>
            </div>
        )
    }

    return (
        <div className="user-details">
            {/* Header */}
            <div className="user-header">
                <button className="back-btn" onClick={() => navigate('/admin/users')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Users
                </button>
                <div className="header-content">
                    <div className="user-info">
                        <h1>{user.name}</h1>
                        <p>{user.email}</p>
                        <div className="user-meta">
                            <span className="user-id">ID: {user.id}</span>
                            {getStatusBadge(user.status)}
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn action-btn--contact" onClick={handleContactUser}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact
                        </button>
                        {user.status === 'active' ? (
                            <button className="action-btn action-btn--suspend" onClick={handleSuspendUser}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                </svg>
                                Suspend
                            </button>
                        ) : (
                            <button className="action-btn action-btn--activate" onClick={handleActivateUser}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Activate
                            </button>
                        )}
                        <button className="action-btn action-btn--reset" onClick={handleResetPassword}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            Reset Password
                        </button>
                        <button className="action-btn action-btn--delete" onClick={handleDeleteUser}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="user-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{user.totalOrders}</span>
                        <span className="stat-label">Total Orders</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">${user.totalSpent.toLocaleString()}</span>
                        <span className="stat-label">Total Spent</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">${user.averageOrderValue.toFixed(2)}</span>
                        <span className="stat-label">Avg Order Value</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders ({orders.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        Account Details
                    </button>
                </div>

                <div className="tabs-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="overview-grid">
                                <div className="info-card">
                                    <h3>Personal Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Full Name:</span>
                                            <span className="value">{user.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{user.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Phone:</span>
                                            <span className="value">{user.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Address:</span>
                                            <span className="value">{user.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Account Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Join Date:</span>
                                            <span className="value">{formatDate(user.joinDate)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Last Login:</span>
                                            <span className="value">{formatDate(user.lastLoginDate)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Status:</span>
                                            <span className="value">{getStatusBadge(user.status)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Shopping Behavior</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Last Order:</span>
                                            <span className="value">{formatDate(user.lastOrderDate)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="tab-content">
                            <div className="orders-section">
                                <div className="orders-header">
                                    <h3>Order History</h3>
                                    <div className="orders-summary">
                                        <span>Delivered: {orders.filter(o => o.status === 'delivered').length}</span>
                                        <span>Processing: {orders.filter(o => o.status === 'processing').length}</span>
                                        <span>Cancelled: {orders.filter(o => o.status === 'cancelled').length}</span>
                                    </div>
                                </div>

                                <div className="orders-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order #</th>
                                                <th>Date</th>
                                                <th>Seller</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Tracking</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td className="order-number">{order.orderNumber}</td>
                                                    <td className="order-date">{formatDate(order.date)}</td>
                                                    <td className="seller-name">{order.seller}</td>
                                                    <td className="items-count">{order.items} items</td>
                                                    <td className="order-total">${order.total}</td>
                                                    <td className="order-status">{getOrderStatusBadge(order.status)}</td>
                                                    <td className="tracking">
                                                        {order.trackingNumber ? (
                                                            <span className="tracking-number">{order.trackingNumber}</span>
                                                        ) : (
                                                            <span className="no-tracking">N/A</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Details Tab */}
                    {activeTab === 'preferences' && (
                        <div className="tab-content">
                            <div className="preferences-grid">
                                <div className="info-card">
                                    <h3>Payment Methods</h3>
                                    <div className="payment-methods">
                                        {user.paymentMethods.map((method, index) => (
                                            <div key={index} className={`payment-method ${method.isDefault ? 'default' : ''}`}>
                                                <div className="method-info">
                                                    <span className="method-type">{method.type}</span>
                                                    <span className="method-details">
                                                        {method.last4 ? `**** ${method.last4}` : method.email}
                                                    </span>
                                                </div>
                                                {method.isDefault && <span className="default-badge">Default</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Shipping Addresses</h3>
                                    <div className="shipping-addresses">
                                        {user.shippingAddresses.map(address => (
                                            <div key={address.id} className={`shipping-address ${address.isDefault ? 'default' : ''}`}>
                                                <div className="address-info">
                                                    <span className="address-name">{address.name}</span>
                                                    <span className="address-text">{address.address}</span>
                                                </div>
                                                {address.isDefault && <span className="default-badge">Default</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Preferences</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Newsletter:</span>
                                            <span className="value">
                                                <span className={`preference-status ${user.preferences.newsletter ? 'enabled' : 'disabled'}`}>
                                                    {user.preferences.newsletter ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Email Notifications:</span>
                                            <span className="value">
                                                <span className={`preference-status ${user.preferences.emailNotifications ? 'enabled' : 'disabled'}`}>
                                                    {user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Language:</span>
                                            <span className="value">{user.preferences.language}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Currency:</span>
                                            <span className="value">{user.preferences.currency}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetails