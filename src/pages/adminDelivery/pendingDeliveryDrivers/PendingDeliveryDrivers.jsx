import { useState } from 'react';
import './PendingDeliveryDrivers.scss';

const PendingDeliveryDrivers = () => {
    const [currentView, setCurrentView] = useState('listing');
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const [pendingDrivers, setPendingDrivers] = useState([
        {
            id: 'PDR001',
            name: 'Omar Al-Khouri',
            phone: '+963123456789',
            email: 'omar.khouri@email.com',
            address: '123 Al-Umayyad Street, Damascus, Syria',
            vehicleType: 'Motorcycle',
            vehiclePlateNumber: 'DMS-1234',
            vehicleModel: 'Yamaha YBR 125',
            vehicleYear: '2022',
            licenseNumber: 'DL-789456123',
            licenseExpiry: '2025-12-15',
            nationalId: '01234567890',
            dateOfBirth: '1990-05-15',
            experience: '3 years',
            applicationDate: '2024-03-10',
            status: 'pending',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            documents: {
                license: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
                nationalId: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop',
                vehicleRegistration: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop'
            },
            emergencyContact: {
                name: 'Fatima Al-Khouri',
                phone: '+963123456790',
                relationship: 'Sister'
            }
        },
        {
            id: 'PDR002',
            name: 'Ahmed Al-Mansouri',
            phone: '+963123456788',
            email: 'ahmed.mansouri@email.com',
            address: '456 Al-Aziziyah District, Aleppo, Syria',
            vehicleType: 'Car',
            vehiclePlateNumber: 'ALP-5678',
            vehicleModel: 'Hyundai Accent',
            vehicleYear: '2021',
            licenseNumber: 'DL-456789123',
            licenseExpiry: '2026-08-20',
            nationalId: '09876543210',
            dateOfBirth: '1988-03-22',
            experience: '5 years',
            applicationDate: '2024-03-12',
            status: 'pending',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            documents: {
                license: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
                nationalId: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop',
                vehicleRegistration: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop'
            },
            emergencyContact: {
                name: 'Mohammad Al-Mansouri',
                phone: '+963123456791',
                relationship: 'Father'
            }
        },
        {
            id: 'PDR003',
            name: 'Layla Al-Zahra',
            phone: '+963123456787',
            email: 'layla.zahra@email.com',
            address: '789 Al-Hadra District, Homs, Syria',
            vehicleType: 'Scooter',
            vehiclePlateNumber: 'HMS-9012',
            vehicleModel: 'Vespa Primavera 150',
            vehicleYear: '2023',
            licenseNumber: 'DL-123789456',
            licenseExpiry: '2027-02-10',
            nationalId: '01357924680',
            dateOfBirth: '1992-11-08',
            experience: '2 years',
            applicationDate: '2024-03-14',
            status: 'pending',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            documents: {
                license: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
                nationalId: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop',
                vehicleRegistration: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop'
            },
            emergencyContact: {
                name: 'Hassan Al-Zahra',
                phone: '+963123456792',
                relationship: 'Husband'
            }
        },
        {
            id: 'PDR004',
            name: 'Youssef Al-Rahman',
            phone: '+963123456786',
            email: 'youssef.rahman@email.com',
            address: '321 Port Area, Latakia, Syria',
            vehicleType: 'Van',
            vehiclePlateNumber: 'LAT-3456',
            vehicleModel: 'Ford Transit',
            vehicleYear: '2020',
            licenseNumber: 'DL-654321987',
            licenseExpiry: '2025-09-30',
            nationalId: '02468135790',
            dateOfBirth: '1985-07-12',
            experience: '7 years',
            applicationDate: '2024-03-08',
            status: 'pending',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            documents: {
                license: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
                nationalId: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop',
                vehicleRegistration: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop'
            },
            emergencyContact: {
                name: 'Amira Al-Rahman',
                phone: '+963123456793',
                relationship: 'Wife'
            }
        }
    ]);

    // Filter drivers based on active filter
    const drivers = pendingDrivers.filter(driver => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'recent') {
            // Show applications from last 7 days
            const applicationDate = new Date(driver.applicationDate);
            const today = new Date();
            const diffTime = Math.abs(today - applicationDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
        }
        if (activeFilter === 'motorcycle') return driver.vehicleType.toLowerCase().includes('motorcycle') || driver.vehicleType.toLowerCase().includes('scooter');
        if (activeFilter === 'car') return driver.vehicleType.toLowerCase().includes('car') || driver.vehicleType.toLowerCase().includes('van');
        return true;
    });

    const handleViewDriver = (driver) => {
        setSelectedDriver(driver);
        setCurrentView('details');
    };

    const handleBackToListing = () => {
        setCurrentView('listing');
        setSelectedDriver(null);
    };

    const handleApproveDriver = (driverId) => {
        setPendingDrivers(prev => prev.filter(driver => driver.id !== driverId));
        // Here you would typically make an API call to approve the driver
        console.log(`Driver ${driverId} approved`);
        if (selectedDriver && selectedDriver.id === driverId) {
            handleBackToListing();
        }
    };

    const handleRejectDriver = (driverId) => {
        setPendingDrivers(prev => prev.filter(driver => driver.id !== driverId));
        // Here you would typically make an API call to reject the driver
        console.log(`Driver ${driverId} rejected`);
        if (selectedDriver && selectedDriver.id === driverId) {
            handleBackToListing();
        }
    };

    const getVehicleIcon = (vehicleType) => {
        const type = vehicleType.toLowerCase();
        if (type.includes('motorcycle') || type.includes('scooter')) {
            return '🏍️';
        } else if (type.includes('car')) {
            return '🚗';
        } else if (type.includes('van')) {
            return '🚐';
        }
        return '🚗';
    };

    const renderDriverDetails = () => {
        if (!selectedDriver) return null;

        return (
            <div className="pending-drivers-details">
                <div className="details-header">
                    <div className="header-left">
                        <button className="back-btn" onClick={handleBackToListing}>
                            ← Back to Pending Drivers
                        </button>
                        <h1>Driver Application - {selectedDriver.id}</h1>
                    </div>
                    <div className="header-actions">
                        <button 
                            className="approve-btn"
                            onClick={() => handleApproveDriver(selectedDriver.id)}
                        >
                            ✅ Approve Driver
                        </button>
                        <button 
                            className="reject-btn"
                            onClick={() => handleRejectDriver(selectedDriver.id)}
                        >
                            ❌ Reject Application
                        </button>
                    </div>
                </div>

                <div className="details-content">
                    {/* Personal Information */}
                    <div className="details-section personal-info">
                        <h3>👤 Personal Information</h3>
                        <div className="info-grid">
                            <div className="driver-profile">
                                <img src={selectedDriver.avatar} alt={selectedDriver.name} className="driver-avatar" />
                                <div className="driver-basic">
                                    <h4>{selectedDriver.name}</h4>
                                    <p className="driver-id">ID: {selectedDriver.id}</p>
                                    <p className="application-date">Applied: {selectedDriver.applicationDate}</p>
                                </div>
                            </div>
                            <div className="personal-details">
                                <div className="detail-item">
                                    <strong>Phone Number:</strong>
                                    <span>{selectedDriver.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Email:</strong>
                                    <span>{selectedDriver.email}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Address:</strong>
                                    <span>{selectedDriver.address}</span>
                                </div>
                                {/* <div className="detail-item">
                                    <strong>National ID:</strong>
                                    <span>{selectedDriver.nationalId}</span>
                                </div> */}
                                <div className="detail-item">
                                    <strong>Date of Birth:</strong>
                                    <span>{selectedDriver.dateOfBirth}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Experience:</strong>
                                    <span>{selectedDriver.experience}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="details-section vehicle-info">
                        <h3>🚗 Vehicle Information</h3>
                        <div className="vehicle-grid">
                            <div className="vehicle-main">
                                <div className="vehicle-header">
                                    <span className="vehicle-icon">{getVehicleIcon(selectedDriver.vehicleType)}</span>
                                    <div>
                                        <h4>{selectedDriver.vehicleModel}</h4>
                                        <p>{selectedDriver.vehicleType} • {selectedDriver.vehicleYear}</p>
                                    </div>
                                </div>
                                <div className="vehicle-details">
                                    <div className="detail-item">
                                        <strong>Plate Number:</strong>
                                        <span className="plate-number">{selectedDriver.vehiclePlateNumber}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Vehicle Type:</strong>
                                        <span>{selectedDriver.vehicleType}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Model:</strong>
                                        <span>{selectedDriver.vehicleModel}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Year:</strong>
                                        <span>{selectedDriver.vehicleYear}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* License Information */}
                    <div className="details-section license-info">
                        <h3>📄 License Information</h3>
                        <div className="license-grid">
                            <div className="license-details">
                                <div className="detail-item">
                                    <strong>License Number:</strong>
                                    <span>{selectedDriver.licenseNumber}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>License Expiry:</strong>
                                    <span className={new Date(selectedDriver.licenseExpiry) < new Date() ? 'expired' : 'valid'}>
                                        {selectedDriver.licenseExpiry}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <strong>License Status:</strong>
                                    <span className={`license-status ${new Date(selectedDriver.licenseExpiry) < new Date() ? 'expired' : 'valid'}`}>
                                        {new Date(selectedDriver.licenseExpiry) < new Date() ? '❌ Expired' : '✅ Valid'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="details-section emergency-contact">
                        <h3>🚨 Emergency Contact</h3>
                        <div className="contact-grid">
                            <div className="detail-item">
                                <strong>Contact Name:</strong>
                                <span>{selectedDriver.emergencyContact.name}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Phone Number:</strong>
                                <span>{selectedDriver.emergencyContact.phone}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Relationship:</strong>
                                <span>{selectedDriver.emergencyContact.relationship}</span>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="details-section documents-section">
                        <h3>📋 Documents</h3>
                        <div className="documents-grid">
                            <div className="document-item">
                                <h4>Driver's License</h4>
                                <img src={selectedDriver.documents.license} alt="Driver's License" />
                            </div>
                            <div className="document-item">
                                <h4>National ID</h4>
                                <img src={selectedDriver.documents.nationalId} alt="National ID" />
                            </div>
                            <div className="document-item">
                                <h4>Vehicle Registration</h4>
                                <img src={selectedDriver.documents.vehicleRegistration} alt="Vehicle Registration" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="details-actions">
                        <button 
                            className="approve-btn-large"
                            onClick={() => handleApproveDriver(selectedDriver.id)}
                        >
                            ✅ Approve Driver Application
                        </button>
                        <button 
                            className="reject-btn-large"
                            onClick={() => handleRejectDriver(selectedDriver.id)}
                        >
                            ❌ Reject Application
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderDriversListing = () => {
        return (
            <>
                <div className="pending-drivers-header">
                    <h2>Pending Delivery Drivers</h2>
                    <div className="header-stats">
                        <div className="stat-card">
                            <span className="stat-number">{pendingDrivers.length}</span>
                            <span className="stat-label">Pending Applications</span>
                        </div>
                    </div>
                </div>

                <div className="filters-section">
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All Applications
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'recent' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('recent')}
                        >
                            Recent (7 days)
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'motorcycle' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('motorcycle')}
                        >
                            Motorcycles
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'car' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('car')}
                        >
                            Cars & Vans
                        </button>
                    </div>
                </div>

                <div className="drivers-table-container">
                    <table className="drivers-table">
                        <thead>
                            <tr>
                                <th>Driver</th>
                                <th>Contact</th>
                                <th>Vehicle</th>
                                <th>License</th>
                                <th>Application Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map(driver => (
                                <tr key={driver.id}>
                                    <td>
                                        <div className="driver-cell">
                                            <img src={driver.avatar} alt={driver.name} className="driver-avatar-small" />
                                            <div className="driver-info">
                                                <span className="driver-name">{driver.name}</span>
                                                <span className="driver-id">{driver.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-cell">
                                            <span className="phone">{driver.phone}</span>
                                            <span className="email">{driver.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="vehicle-cell">
                                            <span className="vehicle-icon">{getVehicleIcon(driver.vehicleType)}</span>
                                            <div className="vehicle-info">
                                                <span className="vehicle-model">{driver.vehicleModel}</span>
                                                <span className="vehicle-plate">{driver.vehiclePlateNumber}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="license-cell">
                                            <span className="license-number">{driver.licenseNumber}</span>
                                            <span className={`license-status ${new Date(driver.licenseExpiry) < new Date() ? 'expired' : 'valid'}`}>
                                                {new Date(driver.licenseExpiry) < new Date() ? 'Expired' : 'Valid'}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="application-date">{driver.applicationDate}</span>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            <button 
                                                className="view-btn"
                                                onClick={() => handleViewDriver(driver)}
                                                title="View Driver Details"
                                            >
                                                👁️ View
                                            </button>
                                            <button 
                                                className="approve-btn-small"
                                                onClick={() => handleApproveDriver(driver.id)}
                                                title="Approve Driver"
                                            >
                                                ✅
                                            </button>
                                            <button 
                                                className="reject-btn-small"
                                                onClick={() => handleRejectDriver(driver.id)}
                                                title="Reject Application"
                                            >
                                                ❌
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {drivers.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">📋</div>
                            <h3>No Pending Applications</h3>
                            <p>No driver applications match the current filter.</p>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="pending-drivers">
            {currentView === 'details' ? renderDriverDetails() : renderDriversListing()}
        </div>
    );
};

export default PendingDeliveryDrivers;