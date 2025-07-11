import { useState } from 'react';
import './AdminDeliveryDrivers.scss';

const AdminDeliveryDrivers = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mock drivers data
    const allDrivers = [
        {
            id: 1,
            name: 'Ahmed Al-Mohammad',
            phone: '+963123456789',
            email: 'ahmed.mohammad@delivery.com',
            status: 'online',
            rating: 4.8,
            totalDeliveries: 245,
            completedToday: 8,
            totalEarnings: 2450,
            monthlyEarnings: 680,
            joinDate: '2024-01-15',
            vehicleType: 'Motorcycle',
            vehicleNumber: 'DMG-1234',
            suspended: false,
            lastDelivery: '2 hours ago',
            currentLocation: 'Damascus',
            orderHistory: [
                { id: '#ORD001', customer: 'Fatima Al-Zahra', amount: 45, date: '2024-07-11', status: 'delivered' },
                { id: '#ORD015', customer: 'Omar Hassan', amount: 32, date: '2024-07-11', status: 'delivered' },
                { id: '#ORD027', customer: 'Layla Ahmad', amount: 28, date: '2024-07-10', status: 'delivered' },
                { id: '#ORD033', customer: 'Youssef Ali', amount: 55, date: '2024-07-10', status: 'delivered' },
                { id: '#ORD044', customer: 'Maryam Khaled', amount: 38, date: '2024-07-09', status: 'delivered' }
            ]
        },
        {
            id: 2,
            name: 'Mohammad Al-Rashid',
            phone: '+963123456788',
            email: 'mohammad.rashid@delivery.com',
            status: 'online',
            rating: 4.6,
            totalDeliveries: 189,
            completedToday: 5,
            totalEarnings: 1890,
            monthlyEarnings: 520,
            joinDate: '2024-02-20',
            vehicleType: 'Bicycle',
            vehicleNumber: 'ALP-5678',
            suspended: false,
            lastDelivery: '45 mins ago',
            currentLocation: 'Aleppo',
            orderHistory: [
                { id: '#ORD012', customer: 'Ahmad Mahmoud', amount: 40, date: '2024-07-11', status: 'delivered' },
                { id: '#ORD019', customer: 'Nour Fares', amount: 25, date: '2024-07-11', status: 'delivered' },
                { id: '#ORD028', customer: 'Khaled Omar', amount: 62, date: '2024-07-10', status: 'delivered' }
            ]
        },
        {
            id: 3,
            name: 'Omar Al-Zahra',
            phone: '+963123456787',
            email: 'omar.zahra@delivery.com',
            status: 'offline',
            rating: 4.9,
            totalDeliveries: 320,
            completedToday: 0,
            totalEarnings: 3200,
            monthlyEarnings: 890,
            joinDate: '2023-12-01',
            vehicleType: 'Car',
            vehicleNumber: 'HMS-9012',
            suspended: false,
            lastDelivery: '6 hours ago',
            currentLocation: 'Homs',
            orderHistory: [
                { id: '#ORD008', customer: 'Sarah Ibrahim', amount: 75, date: '2024-07-10', status: 'delivered' },
                { id: '#ORD016', customer: 'Ali Hassan', amount: 42, date: '2024-07-10', status: 'delivered' },
                { id: '#ORD025', customer: 'Dina Khalil', amount: 58, date: '2024-07-09', status: 'delivered' }
            ]
        },
        {
            id: 4,
            name: 'Youssef Al-Hassan',
            phone: '+963123456786',
            email: 'youssef.hassan@delivery.com',
            status: 'online',
            rating: 4.7,
            totalDeliveries: 156,
            completedToday: 3,
            totalEarnings: 1560,
            monthlyEarnings: 420,
            joinDate: '2024-03-10',
            vehicleType: 'Motorcycle',
            vehicleNumber: 'LAT-3456',
            suspended: false,
            lastDelivery: '1 hour ago',
            currentLocation: 'Latakia',
            orderHistory: [
                { id: '#ORD005', customer: 'Rana Saleh', amount: 35, date: '2024-07-11', status: 'delivered' },
                { id: '#ORD021', customer: 'Mahmoud Qasem', amount: 48, date: '2024-07-10', status: 'delivered' }
            ]
        },
        {
            id: 5,
            name: 'Mahmoud Al-Khoury',
            phone: '+963123456785',
            email: 'mahmoud.khoury@delivery.com',
            status: 'suspended',
            rating: 3.8,
            totalDeliveries: 89,
            completedToday: 0,
            totalEarnings: 890,
            monthlyEarnings: 0,
            joinDate: '2024-04-05',
            vehicleType: 'Bicycle',
            vehicleNumber: 'TAR-7890',
            suspended: true,
            lastDelivery: '3 days ago',
            currentLocation: 'Tartus',
            orderHistory: [
                { id: '#ORD003', customer: 'Hassan Ali', amount: 22, date: '2024-07-08', status: 'delivered' },
                { id: '#ORD011', customer: 'Amira Said', amount: 30, date: '2024-07-07', status: 'delivered' }
            ]
        },
        {
            id: 6,
            name: 'Khalil Al-Masri',
            phone: '+963123456784',
            email: 'khalil.masri@delivery.com',
            status: 'offline',
            rating: 4.5,
            totalDeliveries: 134,
            completedToday: 0,
            totalEarnings: 1340,
            monthlyEarnings: 360,
            joinDate: '2024-01-25',
            vehicleType: 'Car',
            vehicleNumber: 'DRA-2468',
            suspended: false,
            lastDelivery: '4 hours ago',
            currentLocation: 'Daraa',
            orderHistory: [
                { id: '#ORD007', customer: 'Zain Nasser', amount: 52, date: '2024-07-10', status: 'delivered' },
                { id: '#ORD018', customer: 'Lina Fouad', amount: 29, date: '2024-07-09', status: 'delivered' }
            ]
        }
    ];

    // Filter drivers based on active filter
    const drivers = allDrivers.filter(driver => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'suspended') return driver.suspended;
        return driver.status === activeFilter;
    });

    const getStatusClass = (status, suspended) => {
        if (suspended) return 'status-suspended';
        switch (status) {
            case 'online': return 'status-online';
            case 'offline': return 'status-offline';
            default: return '';
        }
    };

    const getStatusText = (status, suspended) => {
        if (suspended) return 'Suspended';
        switch (status) {
            case 'online': return 'Online';
            case 'offline': return 'Offline';
            default: return status;
        }
    };

    const handleDriverClick = (driver) => {
        setSelectedDriver(driver);
        setIsModalOpen(true);
    };

    const handleSuspendDriver = (driverId, suspend = true) => {
        // Here you would make an API call to suspend/unsuspend the driver
        console.log(`${suspend ? 'Suspending' : 'Unsuspending'} driver ${driverId}`);
        alert(`Driver ${suspend ? 'suspended' : 'reactivated'} successfully!`);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDriver(null);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}>★</span>
        ));
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const stats = {
        total: allDrivers.length,
        online: allDrivers.filter(d => d.status === 'online' && !d.suspended).length,
        offline: allDrivers.filter(d => d.status === 'offline' && !d.suspended).length,
        suspended: allDrivers.filter(d => d.suspended).length
    };

    return (
        <div className="delivery-drivers">
            <div className="drivers-header">
                <div className="header-top">
                    <h1>Delivery Drivers Management</h1>
                    {/* <button className="add-driver-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Driver
                    </button> */}
                </div>

                <div className="drivers-stats">
                    <div className="stat-card">
                        <h3>{stats.total}</h3>
                        <p>Total Drivers</p>
                    </div>
                    <div className="stat-card online">
                        <h3>{stats.online}</h3>
                        <p>Online Now</p>
                    </div>
                    <div className="stat-card offline">
                        <h3>{stats.offline}</h3>
                        <p>Offline</p>
                    </div>
                    <div className="stat-card suspended">
                        <h3>{stats.suspended}</h3>
                        <p>Suspended</p>
                    </div>
                </div>

                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All Drivers
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'online' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('online')}
                    >
                        Online
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'offline' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('offline')}
                    >
                        Offline
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'suspended' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('suspended')}
                    >
                        Suspended
                    </button>
                </div>
            </div>

            <div className="drivers-grid">
                {drivers.map(driver => (
                    <div
                        key={driver.id}
                        className={`driver-card ${getStatusClass(driver.status, driver.suspended)}`}
                        onClick={() => handleDriverClick(driver)}
                    >
                        <div className="driver-header">
                            <div className="driver-avatar">
                                <div className="avatar-initials">
                                    {getInitials(driver.name)}
                                </div>
                                <div className={`status-indicator ${getStatusClass(driver.status, driver.suspended)}`}></div>
                            </div>
                            <div className="driver-info">
                                <h3>{driver.name}</h3>
                                <p>{driver.phone}</p>
                                <span className={`status-badge ${getStatusClass(driver.status, driver.suspended)}`}>
                                    {getStatusText(driver.status, driver.suspended)}
                                </span>
                            </div>
                        </div>

                        <div className="driver-stats">
                            <div className="stat-row">
                                <div className="stat-item">
                                    <span className="stat-value">{driver.totalDeliveries}</span>
                                    <span className="stat-label">Total Deliveries</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{driver.completedToday}</span>
                                    <span className="stat-label">Today</span>
                                </div>
                            </div>
                            <div className="stat-row">
                                <div className="stat-item">
                                    <span className="stat-value">${driver.totalEarnings}</span>
                                    <span className="stat-label">Total Earned</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">${driver.monthlyEarnings}</span>
                                    <span className="stat-label">This Month</span>
                                </div>
                            </div>
                        </div>

                        <div className="driver-rating">
                            <div className="rating-stars">
                                {renderStars(driver.rating)}
                                <span>{driver.rating}</span>
                            </div>
                            <div className="driver-location">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {driver.currentLocation}
                            </div>
                        </div>

                        <div className="driver-actions">
                            <button
                                className="action-btn view-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDriverClick(driver);
                                }}
                            >
                                View Details
                            </button>
                            <button
                                className={`action-btn ${driver.suspended ? 'activate-btn' : 'suspend-btn'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSuspendDriver(driver.id, !driver.suspended);
                                }}
                            >
                                {driver.suspended ? 'Reactivate' : 'Suspend'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Driver Details Modal - NO IMAGES */}
            {isModalOpen && selectedDriver && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content driver-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="driver-modal-header">
                                <div className="driver-avatar-large">
                                    <div className="avatar-initials-large">
                                        {getInitials(selectedDriver.name)}
                                    </div>
                                    <div className={`status-indicator-large ${getStatusClass(selectedDriver.status, selectedDriver.suspended)}`}></div>
                                </div>
                                <div className="driver-modal-info">
                                    <h2>{selectedDriver.name}</h2>
                                    <p className="driver-email">{selectedDriver.email}</p>
                                    <span className={`status-badge-large ${getStatusClass(selectedDriver.status, selectedDriver.suspended)}`}>
                                        {getStatusText(selectedDriver.status, selectedDriver.suspended)}
                                    </span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="driver-details-grid">
                                {/* Personal Information */}
                                <div className="detail-section">
                                    <h3>
                                        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Personal Information
                                    </h3>
                                    <div className="detail-items">
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                Phone
                                            </div>
                                            <span className="detail-value">{selectedDriver.phone}</span>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Email
                                            </div>
                                            <span className="detail-value">{selectedDriver.email}</span>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Join Date
                                            </div>
                                            <span className="detail-value">{selectedDriver.joinDate}</span>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Current Location
                                            </div>
                                            <span className="detail-value">{selectedDriver.currentLocation}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Information */}
                                <div className="detail-section">
                                    <h3>
                                        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 00-6 0v5a2 2 0 002 2h6.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 01.948-.684h8.67a1 1 0 01.948.684l1.498 4.493a1 1 0 00.948.684H22a2 2 0 002-2v-5a3 3 0 00-3-3V7a3 3 0 00-3-3H6a3 3 0 00-3 3v2a3 3 0 00-3 3z" />
                                        </svg>
                                        Vehicle Information
                                    </h3>
                                    <div className="detail-items">
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                Vehicle Type
                                            </div>
                                            <span className="detail-value">{selectedDriver.vehicleType}</span>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                                Vehicle Number
                                            </div>
                                            <span className="detail-value">{selectedDriver.vehicleNumber}</span>
                                        </div>
                                        <div className="detail-item">
                                            <div className="detail-label">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Last Delivery
                                            </div>
                                            <span className="detail-value">{selectedDriver.lastDelivery}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Stats */}
                                <div className="detail-section full-width performance-section">
                                    <h3>
                                        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Performance & Earnings
                                    </h3>
                                    <div className="performance-stats">
                                        <div className="perf-stat">
                                            <div className="perf-icon">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <div className="perf-value">{selectedDriver.totalDeliveries}</div>
                                            <div className="perf-label">Total Deliveries</div>
                                        </div>
                                        <div className="perf-stat">
                                            <div className="perf-icon">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div className="perf-value">{selectedDriver.completedToday}</div>
                                            <div className="perf-label">Completed Today</div>
                                        </div>
                                        <div className="perf-stat">
                                            <div className="perf-icon">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                            </div>
                                            <div className="perf-value">${selectedDriver.totalEarnings}</div>
                                            <div className="perf-label">Total Earnings</div>
                                        </div>
                                        <div className="perf-stat">
                                            <div className="perf-icon">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="perf-value">${selectedDriver.monthlyEarnings}</div>
                                            <div className="perf-label">Monthly Earnings</div>
                                        </div>
                                        <div className="perf-stat">
                                            <div className="perf-icon">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                </svg>
                                            </div>
                                            <div className="perf-value">{selectedDriver.rating}</div>
                                            <div className="perf-label">Average Rating</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order History */}
                                <div className="detail-section full-width">
                                    <h3>
                                        <svg className="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Recent Order History
                                    </h3>
                                    <div className="order-history">
                                        {selectedDriver.orderHistory.map((order, index) => (
                                            <div key={index} className="order-item">
                                                <div className="order-info">
                                                    <span className="order-id">{order.id}</span>
                                                    <span className="customer-name">{order.customer}</span>
                                                </div>
                                                <div className="order-details-pupup">
                                                    <span className="order-amount">${order.amount}</span>
                                                    <span className="order-date">{order.date}</span>
                                                </div>
                                                <div className="order-status">
                                                    <span className="status-delivered">Delivered</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className={`action-btn primary ${selectedDriver.suspended ? 'activate-btn' : 'suspend-btn'}`}
                                onClick={() => {
                                    handleSuspendDriver(selectedDriver.id, !selectedDriver.suspended);
                                    closeModal();
                                }}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={selectedDriver.suspended ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364L18.364 5.636"} />
                                </svg>
                                {selectedDriver.suspended ? 'Reactivate Driver' : 'Suspend Driver'}
                            </button>
                            <button className="action-btn secondary contact-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Contact Driver
                            </button>
                            <button className="action-btn tertiary close-btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDeliveryDrivers;