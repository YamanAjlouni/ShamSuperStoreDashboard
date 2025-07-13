import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DriversManagement.scss'

const DriversManagement = () => {
    const navigate = useNavigate()
    const [drivers, setDrivers] = useState([])
    const [filteredDrivers, setFilteredDrivers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [driversPerPage, setDriversPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Mock data - replace with actual API call
    const mockDrivers = [
        {
            id: 'DRV001',
            name: 'Michael Johnson',
            email: 'michael.johnson@email.com',
            phone: '+1 (555) 901-0001',
            address: '789 Delivery Ave, New York, NY 10001',
            status: 'online',
            joinDate: '2024-01-15',
            ordersDelivered: 145,
            totalEarnings: 2890.50,
            rating: 4.8,
            vehicleType: 'Motorcycle',
            licenseNumber: 'DL123456789'
        },
        {
            id: 'DRV002',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@email.com',
            phone: '+1 (555) 901-0002',
            address: '456 Route St, Los Angeles, CA 90210',
            status: 'online',
            joinDate: '2024-02-20',
            ordersDelivered: 89,
            totalEarnings: 1780.00,
            rating: 4.6,
            vehicleType: 'Car',
            licenseNumber: 'DL987654321'
        },
        {
            id: 'DRV003',
            name: 'Carlos Rodriguez',
            email: 'carlos.rodriguez@email.com',
            phone: '+1 (555) 901-0003',
            address: '321 Express Lane, Chicago, IL 60601',
            status: 'offline',
            joinDate: '2024-01-30',
            ordersDelivered: 203,
            totalEarnings: 4060.00,
            rating: 4.9,
            vehicleType: 'Bicycle',
            licenseNumber: 'DL456789123'
        },
        {
            id: 'DRV004',
            name: 'Emma Davis',
            email: 'emma.davis@email.com',
            phone: '+1 (555) 901-0004',
            address: '654 Fast Track, Houston, TX 77001',
            status: 'online',
            joinDate: '2024-03-10',
            ordersDelivered: 67,
            totalEarnings: 1340.00,
            rating: 4.4,
            vehicleType: 'Motorcycle',
            licenseNumber: 'DL789123456'
        },
        {
            id: 'DRV005',
            name: 'David Chen',
            email: 'david.chen@email.com',
            phone: '+1 (555) 901-0005',
            address: '987 Quick Road, Phoenix, AZ 85001',
            status: 'suspended',
            joinDate: '2024-02-05',
            ordersDelivered: 12,
            totalEarnings: 240.00,
            rating: 3.8,
            vehicleType: 'Car',
            licenseNumber: 'DL321654987'
        },
        {
            id: 'DRV006',
            name: 'Lisa Thompson',
            email: 'lisa.thompson@email.com',
            phone: '+1 (555) 901-0006',
            address: '159 Speed Blvd, Philadelphia, PA 19101',
            status: 'online',
            joinDate: '2024-04-01',
            ordersDelivered: 156,
            totalEarnings: 3120.00,
            rating: 4.7,
            vehicleType: 'Motorcycle',
            licenseNumber: 'DL654987321'
        },
        {
            id: 'DRV007',
            name: 'James Anderson',
            email: 'james.anderson@email.com',
            phone: '+1 (555) 901-0007',
            address: '753 Rush Street, San Diego, CA 92101',
            status: 'offline',
            joinDate: '2024-03-15',
            ordersDelivered: 98,
            totalEarnings: 1960.00,
            rating: 4.5,
            vehicleType: 'Car',
            licenseNumber: 'DL159753486'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setDrivers(mockDrivers)
            setFilteredDrivers(mockDrivers)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = drivers

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(driver =>
                driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                driver.phone.includes(searchTerm) ||
                driver.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(driver => driver.status === statusFilter)
        }

        setFilteredDrivers(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, drivers])

    // Pagination
    const indexOfLastDriver = currentPage * driversPerPage
    const indexOfFirstDriver = indexOfLastDriver - driversPerPage
    const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver)
    const totalPages = Math.ceil(filteredDrivers.length / driversPerPage)

    const handleViewDriver = (driverId) => {
        navigate(`/admin/drivers/details/${driverId}`)
    }

    const handleContactDriver = (driver) => {
        // Open email client or contact modal
        window.location.href = `mailto:${driver.email}?subject=Regarding your delivery services`
    }

    const handleSuspendDriver = async (driverId) => {
        if (window.confirm('Are you sure you want to suspend this driver?')) {
            // API call to suspend driver
            setDrivers(drivers.map(driver =>
                driver.id === driverId
                    ? { ...driver, status: 'suspended' }
                    : driver
            ))
        }
    }

    const handleUnsuspendDriver = async (driverId) => {
        if (window.confirm('Are you sure you want to remove suspension from this driver?')) {
            // API call to unsuspend driver
            setDrivers(drivers.map(driver =>
                driver.id === driverId
                    ? { ...driver, status: 'offline' }
                    : driver
            ))
        }
    }

    const handleResetPassword = (driverId, driverName) => {
        // Show confirmation before navigating
        if (window.confirm(`Are you sure you want to reset password for ${driverName}?`)) {
            navigate(`/admin/drivers/reset-password/${driverId}`)
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
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="drivers-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading drivers...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="drivers-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Delivery Drivers</h1>
                    <p>Manage and monitor all registered delivery drivers</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{drivers.filter(d => d.status === 'online').length}</span>
                        <span className="stat-label">Online Now</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{drivers.filter(d => d.status === 'offline').length}</span>
                        <span className="stat-label">Offline</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{drivers.filter(d => d.status === 'suspended').length}</span>
                        <span className="stat-label">Suspended</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{drivers.length}</span>
                        <span className="stat-label">Total Drivers</span>
                    </div>
                </div>
            </div>

            <div className="drivers-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search drivers, emails, vehicles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-filter"
                        >
                            <option value="all">All Status</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstDriver + 1}-{Math.min(indexOfLastDriver, filteredDrivers.length)} of {filteredDrivers.length} drivers
                        </span>
                        <select
                            value={driversPerPage}
                            onChange={(e) => setDriversPerPage(Number(e.target.value))}
                            className="per-page-select"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="drivers-table">
                        <thead>
                            <tr>
                                <th>Driver ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Vehicle</th>
                                <th>Orders Delivered</th>
                                <th>Earnings</th>
                                <th>Rating</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDrivers.map((driver) => (
                                <tr key={driver.id}>
                                    <td className="driver-id">{driver.id}</td>
                                    <td className="driver-name">
                                        <div className="name-cell">
                                            <span className="name">{driver.name}</span>
                                            <span className="email">{driver.email}</span>
                                        </div>
                                    </td>
                                    <td className="phone">{driver.phone}</td>
                                    <td className="address">
                                        <div className="address-cell">
                                            {driver.address}
                                        </div>
                                    </td>
                                    <td className="vehicle">{getVehicleBadge(driver.vehicleType)}</td>
                                    <td className="orders-delivered">
                                        <span className="orders-number">{driver.ordersDelivered}</span>
                                    </td>
                                    <td className="earnings">
                                        <span className="amount">${driver.totalEarnings.toLocaleString()}</span>
                                    </td>
                                    <td className="rating">
                                        <div className="rating-display">
                                            <span className="rating-stars">⭐</span>
                                            <span className="rating-value">{driver.rating}</span>
                                        </div>
                                    </td>
                                    <td className="join-date">{formatDate(driver.joinDate)}</td>
                                    <td className="status">{getStatusBadge(driver.status)}</td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewDriver(driver.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="action-btn action-btn--contact"
                                                onClick={() => handleContactDriver(driver)}
                                                title="Contact Driver"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            {driver.status === 'suspended' ? (
                                                <button
                                                    className="action-btn action-btn--unsuspend"
                                                    onClick={() => handleUnsuspendDriver(driver.id)}
                                                    title="Remove Suspension"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className="action-btn action-btn--suspend"
                                                    onClick={() => handleSuspendDriver(driver.id)}
                                                    title="Suspend Driver"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn action-btn--reset"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    handleResetPassword(driver.id, driver.name)
                                                }}
                                                title="Reset Password"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="pagination-info">
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>

                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DriversManagement