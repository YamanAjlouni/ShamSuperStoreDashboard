import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './DriverDetails.scss'

const DriverDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [driver, setDriver] = useState(null)
    const [deliveries, setDeliveries] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)

    // Mock driver data
    const mockDriverData = {
        id: id,
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 901-0001',
        address: '789 Delivery Ave, New York, NY 10001',
        status: 'online',
        joinDate: '2024-01-15',
        lastActiveDate: '2024-06-25',
        ordersDelivered: 145,
        totalEarnings: 2890.50,
        averageEarningsPerOrder: 19.93,
        rating: 4.8,
        vehicleType: 'Motorcycle',
        licenseNumber: 'DL123456789',
        emergencyContact: {
            name: 'Sarah Johnson',
            phone: '+1 (555) 901-9999',
            relationship: 'Wife'
        },
        bankDetails: {
            accountNumber: '**** **** **** 1234',
            bankName: 'Chase Bank'
        },
        workingHours: {
            start: '08:00',
            end: '20:00',
            daysPerWeek: 6
        },
        documents: {
            license: 'Verified',
            insurance: 'Verified',
            background: 'Verified'
        }
    }

    const mockDeliveries = [
        {
            id: 'DEL001',
            orderId: 'ORD12345',
            deliveryDate: '2024-06-25',
            deliveryTime: '14:30',
            customerName: 'Alice Johnson',
            customerAddress: '123 Maple Street, New York, NY 10001',
            sellerName: 'Tech Paradise',
            sellerAddress: '456 Business Ave, New York, NY 10002',
            orderValue: 129.99,
            driverEarnings: 25.99,
            deliveryDistance: '5.2 km',
            deliveryDuration: '18 mins',
            status: 'completed'
        },
        {
            id: 'DEL002',
            orderId: 'ORD12344',
            deliveryDate: '2024-06-25',
            deliveryTime: '12:15',
            customerName: 'Bob Smith',
            customerAddress: '789 Oak Street, New York, NY 10003',
            sellerName: 'Fashion Hub',
            sellerAddress: '321 Style Blvd, New York, NY 10004',
            orderValue: 89.50,
            driverEarnings: 17.90,
            deliveryDistance: '3.8 km',
            deliveryDuration: '12 mins',
            status: 'completed'
        },
        {
            id: 'DEL003',
            orderId: 'ORD12343',
            deliveryDate: '2024-06-24',
            deliveryTime: '16:45',
            customerName: 'Carol Davis',
            customerAddress: '555 Pine Road, New York, NY 10005',
            sellerName: 'Home Essentials',
            sellerAddress: '888 Garden Ave, New York, NY 10006',
            orderValue: 234.75,
            driverEarnings: 46.95,
            deliveryDistance: '8.1 km',
            deliveryDuration: '25 mins',
            status: 'completed'
        },
        {
            id: 'DEL004',
            orderId: 'ORD12342',
            deliveryDate: '2024-06-24',
            deliveryTime: '10:20',
            customerName: 'David Wilson',
            customerAddress: '222 Cedar Lane, New York, NY 10007',
            sellerName: 'Book Store',
            sellerAddress: '999 Library St, New York, NY 10008',
            orderValue: 45.99,
            driverEarnings: 9.20,
            deliveryDistance: '2.5 km',
            deliveryDuration: '8 mins',
            status: 'completed'
        },
        {
            id: 'DEL005',
            orderId: 'ORD12341',
            deliveryDate: '2024-06-23',
            deliveryTime: '19:10',
            customerName: 'Emily Brown',
            customerAddress: '444 Elm Street, New York, NY 10009',
            sellerName: 'Tech Paradise',
            sellerAddress: '456 Business Ave, New York, NY 10002',
            orderValue: 299.99,
            driverEarnings: 59.99,
            deliveryDistance: '6.7 km',
            deliveryDuration: '22 mins',
            status: 'completed'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setDriver(mockDriverData)
            setDeliveries(mockDeliveries)
            setLoading(false)
        }, 1000)
    }, [id])

    const handleContactDriver = () => {
        window.location.href = `mailto:${driver.email}?subject=Regarding your delivery services`
    }

    const handleSuspendDriver = () => {
        if (window.confirm('Are you sure you want to suspend this driver?')) {
            setDriver({ ...driver, status: 'suspended' })
        }
    }

    const handleUnsuspendDriver = () => {
        if (window.confirm('Are you sure you want to remove suspension from this driver?')) {
            setDriver({ ...driver, status: 'offline' })
        }
    }

    const handleDeleteDriver = () => {
        if (window.confirm('Are you sure you want to permanently delete this driver? This action cannot be undone.')) {
            navigate('/admin/drivers')
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            online: { class: 'success', label: 'Online', icon: '🟢' },
            offline: { class: 'neutral', label: 'Offline', icon: '⚫' },
            suspended: { class: 'warning', label: 'Suspended', icon: '🟡' }
        }
        const config = statusConfig[status] || statusConfig.offline
        return (
            <span className={`status-badge status-badge--${config.class}`}>
                <span className="status-icon">{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getVehicleBadge = (vehicleType) => {
        const vehicleConfig = {
            'Motorcycle': { class: 'motorcycle', emoji: '🏍️' },
            'Car': { class: 'car', emoji: '🚗' },
            'Bicycle': { class: 'bicycle', emoji: '🚲' }
        }
        const config = vehicleConfig[vehicleType] || vehicleConfig.Car
        return (
            <span className={`vehicle-badge vehicle-badge--${config.class}`}>
                <span className="vehicle-emoji">{config.emoji}</span>
                {vehicleType}
            </span>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    if (loading) {
        return (
            <div className="driver-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading driver details...</p>
                </div>
            </div>
        )
    }

    if (!driver) {
        return (
            <div className="driver-details">
                <div className="error-state">
                    <h2>Driver Not Found</h2>
                    <p>The driver you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/admin/drivers')}>Back to Drivers</button>
                </div>
            </div>
        )
    }

    return (
        <div className="driver-details">
            {/* Header */}
            <div className="driver-header">
                <button className="back-btn" onClick={() => navigate('/admin/drivers')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Drivers
                </button>
                <div className="header-content">
                    <div className="driver-info">
                        <h1>{driver.name}</h1>
                        <p>{driver.email}</p>
                        <div className="driver-meta">
                            <span className="driver-id">ID: {driver.id}</span>
                            {getStatusBadge(driver.status)}
                            {getVehicleBadge(driver.vehicleType)}
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn action-btn--contact" onClick={handleContactDriver}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact
                        </button>
                        {driver.status === 'suspended' ? (
                            <button className="action-btn action-btn--unsuspend" onClick={handleUnsuspendDriver}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Remove Suspension
                            </button>
                        ) : (
                            <button className="action-btn action-btn--suspend" onClick={handleSuspendDriver}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                </svg>
                                Suspend
                            </button>
                        )}
                        <button className="action-btn action-btn--delete" onClick={handleDeleteDriver}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="driver-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{driver.ordersDelivered}</span>
                        <span className="stat-label">Orders Delivered</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">${driver.totalEarnings.toLocaleString()}</span>
                        <span className="stat-label">Total Earnings</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">${driver.averageEarningsPerOrder.toFixed(2)}</span>
                        <span className="stat-label">Avg Per Order</span>
                    </div>
                </div>
                {/* <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{driver.rating}/5</span>
                        <span className="stat-label">Driver Rating</span>
                    </div>
                </div> */}
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
                        className={`tab-btn ${activeTab === 'deliveries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('deliveries')}
                    >
                        Deliveries ({deliveries.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        Driver Details
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
                                            <span className="value">{driver.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{driver.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Phone:</span>
                                            <span className="value">{driver.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Address:</span>
                                            <span className="value">{driver.address}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Work Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Join Date:</span>
                                            <span className="value">{formatDate(driver.joinDate)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Last Active:</span>
                                            <span className="value">{formatDate(driver.lastActiveDate)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Working Hours:</span>
                                            <span className="value">{formatTime(driver.workingHours.start)} - {formatTime(driver.workingHours.end)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Days Per Week:</span>
                                            <span className="value">{driver.workingHours.daysPerWeek} days</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Emergency Contact</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Name:</span>
                                            <span className="value">{driver.emergencyContact.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Phone:</span>
                                            <span className="value">{driver.emergencyContact.phone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Relationship:</span>
                                            <span className="value">{driver.emergencyContact.relationship}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Deliveries Tab */}
                    {activeTab === 'deliveries' && (
                        <div className="tab-content">
                            <div className="deliveries-section">
                                <div className="deliveries-header">
                                    <h3>Recent Deliveries</h3>
                                    <div className="deliveries-summary">
                                        <span>Total Earnings: ${deliveries.reduce((sum, d) => sum + d.driverEarnings, 0).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="deliveries-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Date & Time</th>
                                                <th>Customer</th>
                                                <th>Seller</th>
                                                <th>Order Value</th>
                                                <th>Driver Earnings</th>
                                                <th>Distance</th>
                                                <th>Duration</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deliveries.map(delivery => (
                                                <tr key={delivery.id}>
                                                    <td className="order-id">{delivery.orderId}</td>
                                                    <td className="delivery-datetime">
                                                        <div className="datetime-cell">
                                                            <span className="date">{formatDate(delivery.deliveryDate)}</span>
                                                            <span className="time">{delivery.deliveryTime}</span>
                                                        </div>
                                                    </td>
                                                    <td className="customer">
                                                        <div className="customer-info">
                                                            <span className="name">{delivery.customerName}</span>
                                                            <span className="address">{delivery.customerAddress}</span>
                                                        </div>
                                                    </td>
                                                    <td className="seller">
                                                        <div className="seller-info">
                                                            <span className="name">{delivery.sellerName}</span>
                                                            <span className="address">{delivery.sellerAddress}</span>
                                                        </div>
                                                    </td>
                                                    <td className="order-value">${delivery.orderValue}</td>
                                                    <td className="driver-earnings">
                                                        <span className="earnings">${delivery.driverEarnings}</span>
                                                    </td>
                                                    <td className="distance">{delivery.deliveryDistance}</td>
                                                    <td className="duration">{delivery.deliveryDuration}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Driver Details Tab */}
                    {activeTab === 'documents' && (
                        <div className="tab-content">
                            <div className="documents-grid">
                                <div className="info-card">
                                    <h3>Vehicle Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Vehicle Type:</span>
                                            <span className="value">{getVehicleBadge(driver.vehicleType)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">License Number:</span>
                                            <span className="value">{driver.licenseNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Banking Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Bank Name:</span>
                                            <span className="value">{driver.bankDetails.bankName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Account Number:</span>
                                            <span className="value">{driver.bankDetails.accountNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Document Verification</h3>
                                    <div className="documents-list">
                                        <div className="document-item">
                                            <span className="document-name">Driver's License</span>
                                            <span className="document-status verified">{driver.documents.license}</span>
                                        </div>
                                        <div className="document-item">
                                            <span className="document-name">Vehicle Insurance</span>
                                            <span className="document-status verified">{driver.documents.insurance}</span>
                                        </div>
                                        {/* <div className="document-item">
                                            <span className="document-name">Background Check</span>
                                            <span className="document-status verified">{driver.documents.background}</span>
                                        </div> */}
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

export default DriverDetails