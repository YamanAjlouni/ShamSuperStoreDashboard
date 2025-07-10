import { useState } from 'react';
import './AdminOrderDetails.scss';

const AdminOrderDetails = ({ order, onBack }) => {
    const [selectedDriver, setSelectedDriver] = useState('');
    const [orderStatus, setOrderStatus] = useState(order?.status || 'pending');

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

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}>★</span>
        ));
    };

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
                </div>
            </div>

            <div className="order-details-content">
                {/* Order Summary */}
                <div className="details-section order-summary">
                    <h3>Order Summary</h3>
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
                    <h3>Delivery Route</h3>
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
                        <h3>Customer Information</h3>
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
                        <h3>Seller Information</h3>
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
                    <h3>Order Items</h3>
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
                    <h3>Driver Assignment</h3>
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
                    <h3>Order Actions</h3>
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
        </div>
    );
};

export default AdminOrderDetails;