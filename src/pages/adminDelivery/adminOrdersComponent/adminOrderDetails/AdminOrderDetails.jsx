import { useState } from 'react';
import './AdminOrderDetails.scss';
import MapModal from '../../../../components/mapModal/MapModal';

const AdminOrderDetails = ({ order, onBack }) => {
    const [selectedDriver, setSelectedDriver] = useState('');
    const [orderStatus, setOrderStatus] = useState(order?.status || 'pending');
    const [showMapModal, setShowMapModal] = useState(false);

    // Mock available drivers
    const availableDrivers = [
        { id: 1, name: 'Ahmed Al-Khoury', phone: '+963123456790', rating: 4.8, status: 'available' },
        { id: 2, name: 'Mohammad Al-Rashid', phone: '+963123456791', rating: 4.6, status: 'available' },
        { id: 3, name: 'Omar Al-Zahra', phone: '+963123456792', rating: 4.9, status: 'available' },
        { id: 4, name: 'Youssef Al-Hassan', phone: '+963123456793', rating: 4.7, status: 'available' }
    ];

    if (!order) {
        return (
            <div className="order-details">
                <div className="error-state">
                    <h2>Order Not Found</h2>
                    <p>The requested order could not be found.</p>
                    <button className="back-btn" onClick={onBack}>
                        ← Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'assigned': return 'status-assigned';
            case 'in_transit': return 'status-transit';
            case 'delivered': return 'status-delivered';
            default: return '';
        }
    };

    const getSizeClass = (size) => {
        switch (size) {
            case 'small': return 'size-small';
            case 'medium': return 'size-medium';
            case 'large': return 'size-large';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'processing': return 'Processing';
            case 'assigned': return 'Assigned';
            case 'in_transit': return 'In Transit';
            case 'delivered': return 'Delivered';
            default: return status;
        }
    };

    const handleAssignDriver = () => {
        if (selectedDriver) {
            // Here you would typically make an API call to assign the driver
            console.log(`Assigning driver ${selectedDriver} to order ${order.id}`);
            setOrderStatus('assigned');
            alert(`Driver assigned successfully to order ${order.id}`);
        } else {
            alert('Please select a driver first');
        }
    };

    const handleStatusUpdate = (newStatus) => {
        setOrderStatus(newStatus);
        // Here you would typically make an API call to update the status
        console.log(`Updating order ${order.id} status to ${newStatus}`);
    };

    // Handle opening map modal
    const handleOpenMap = () => {
        setShowMapModal(true);
    };

    // Get pickup location
    const getPickupLocation = () => {
        if (!order?.from) return null;

        return {
            street: order.from.split(',')[0],
            full: order.from,
            coordinates: order.seller?.coordinates || { lat: 40.7589, lng: -73.9851 }
        };
    };

    // Get delivery location
    const getDeliveryLocation = () => {
        if (!order?.to) return null;

        return {
            street: order.to.split(',')[0],
            full: order.to,
            coordinates: order.customer?.coordinates || { lat: 40.7128, lng: -74.0060 }
        };
    };

    // Simulate driver location (you can get this from GPS)
    const getDriverLocation = () => {
        // This would come from GPS in a real app
        return { lat: 40.7300, lng: -73.9950 };
    };

    // Check if directions button should be shown
    const shouldShowDirections = () => {
        return ['assigned', 'in_transit', 'processing'].includes(orderStatus) &&
            (selectedDriver || order.assignedDriver);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}>★</span>
        ));
    };

    const pickupLocation = getPickupLocation();
    const deliveryLocation = getDeliveryLocation();

    return (
        <div className="order-details">
            <div className="order-details-header">
                <div className="header-left">
                    <button className="back-btn" onClick={onBack}>
                        ← Back to Orders
                    </button>
                    <h1>Order Details - {order.id}</h1>
                </div>
                <div className="header-right">
                    <span className={`status-badge ${getStatusClass(orderStatus)}`}>
                        {getStatusText(orderStatus)}
                    </span>
                    <span className={`size-badge ${getSizeClass(order.size)}`}>
                        {order.size} Box
                    </span>
                    {shouldShowDirections() && (
                        <button className="directions-btn" onClick={handleOpenMap}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Get Directions
                        </button>
                    )}
                </div>
            </div>

            <div className="order-details-content">
                {/* Order Summary */}
                <div className="details-section order-summary">
                    <h3>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Order Summary
                    </h3>
                    <div className="summary-grid">
                        <div className="summary-item">
                            <span className="label">Order ID:</span>
                            <span className="value">{order.id}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Order Time:</span>
                            <span className="value">{order.orderTime}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Estimated Delivery:</span>
                            <span className="value">{order.estimatedDelivery}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">Total Amount:</span>
                            <span className="value total-amount">${order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Route Information */}
                <div className="details-section route-section">
                    <h3>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Delivery Route
                    </h3>
                    <div className="route-display">
                        <div className="route-point pickup">
                            <div className="route-icon">📦</div>
                            <div className="route-info">
                                <h4>Pickup Location</h4>
                                <p>{order.from}</p>
                            </div>
                        </div>
                        <div className="route-line"></div>
                        <div className="route-point delivery">
                            <div className="route-icon">🏠</div>
                            <div className="route-info">
                                <h4>Delivery Location</h4>
                                <p>{order.to}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="details-grid">
                    {/* Customer Information */}
                    <div className="details-section customer-section">
                        <h3>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Customer Information
                        </h3>
                        <div className="info-content">
                            <div className="info-item">
                                <span className="info-icon">👤</span>
                                <div className="info-text">
                                    <strong>Name:</strong>
                                    <span>{order.customer.name}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📞</span>
                                <div className="info-text">
                                    <strong>Phone:</strong>
                                    <span>{order.customer.phone}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📍</span>
                                <div className="info-text">
                                    <strong>Address:</strong>
                                    <span>{order.customer.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information */}
                    <div className="details-section seller-section">
                        <h3>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Seller Information
                        </h3>
                        <div className="info-content">
                            <div className="info-item">
                                <span className="info-icon">🏪</span>
                                <div className="info-text">
                                    <strong>Store Name:</strong>
                                    <span>{order.seller.name}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📞</span>
                                <div className="info-text">
                                    <strong>Phone:</strong>
                                    <span>{order.seller.phone}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">📍</span>
                                <div className="info-text">
                                    <strong>Address:</strong>
                                    <span>{order.seller.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="details-section items-section">
                    <h3>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Order Items
                    </h3>
                    <div className="items-table">
                        <div className="table-header">
                            <span>Item Name</span>
                            <span>Quantity</span>
                            <span>Unit Price</span>
                            <span>Total</span>
                        </div>
                        {order.items.map((item, index) => (
                            <div key={index} className="table-row">
                                <span className="item-name">{item.name}</span>
                                <span className="item-quantity">{item.quantity}</span>
                                <span className="item-price">${item.price}</span>
                                <span className="item-total">${item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="table-footer">
                            <span className="total-label">Total Amount:</span>
                            <span className="total-value">${order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Driver Assignment */}
                <div className="details-section driver-section">
                    <h3>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Driver Assignment
                    </h3>
                    <div className="driver-assignment">
                        <div className="driver-select">
                            <label htmlFor="driver-select">Select Available Driver:</label>
                            <select
                                id="driver-select"
                                value={selectedDriver}
                                onChange={(e) => setSelectedDriver(e.target.value)}
                                className="driver-dropdown"
                            >
                                <option value="">Choose a driver...</option>
                                {availableDrivers.map(driver => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name} - Rating: {driver.rating}⭐ - {driver.phone}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="available-drivers">
                            <h4>Available Drivers:</h4>
                            <div className="drivers-list">
                                {availableDrivers.map(driver => (
                                    <div key={driver.id} className="driver-card">
                                        <div className="driver-info">
                                            <h5>{driver.name}</h5>
                                            <p>{driver.phone}</p>
                                            <div className="driver-rating">
                                                {renderStars(driver.rating)}
                                                <span>{driver.rating}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="select-driver-btn"
                                            onClick={() => setSelectedDriver(driver.id)}
                                        >
                                            Select
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="details-section actions-section">
                    <h3>
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                        Order Actions
                    </h3>
                    <div className="action-buttons">
                        <button
                            className="action-btn assign-btn"
                            onClick={handleAssignDriver}
                            disabled={!selectedDriver}
                        >
                            Assign Selected Driver
                        </button>

                        <div className="status-actions">
                            <span>Update Status:</span>
                            <button
                                className="status-btn processing-btn"
                                onClick={() => handleStatusUpdate('processing')}
                                disabled={orderStatus === 'processing'}
                            >
                                Mark Processing
                            </button>
                            <button
                                className="status-btn transit-btn"
                                onClick={() => handleStatusUpdate('in_transit')}
                                disabled={orderStatus === 'in_transit'}
                            >
                                Mark In Transit
                            </button>
                            <button
                                className="status-btn delivered-btn"
                                onClick={() => handleStatusUpdate('delivered')}
                                disabled={orderStatus === 'delivered'}
                            >
                                Mark Delivered
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Modal */}
            <MapModal
                isOpen={showMapModal}
                onClose={() => setShowMapModal(false)}
                pickupLocation={pickupLocation}
                deliveryLocation={deliveryLocation}
                driverLocation={getDriverLocation()}
            />
        </div>
    );
};

export default AdminOrderDetails;