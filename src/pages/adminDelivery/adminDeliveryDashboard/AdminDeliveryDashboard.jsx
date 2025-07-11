import { useState } from 'react';
import './AdminDeliveryDashboard.scss';

const AdminDeliveryDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const allDrivers = [
        { id: 1, name: 'Ahmed Mohamed', phone: '+201234567890', rating: 4.8, totalDeliveries: 145, status: 'available', joinDate: '2024-01-15' },
        { id: 2, name: 'Mohamed Ali', phone: '+201234567891', rating: 4.6, totalDeliveries: 98, status: 'busy', joinDate: '2024-02-20' },
        { id: 3, name: 'Omar Hassan', phone: '+201234567892', rating: 4.9, totalDeliveries: 203, status: 'available', joinDate: '2023-12-01' },
        { id: 4, name: 'Youssef Ibrahim', phone: '+201234567893', rating: 4.7, totalDeliveries: 167, status: 'offline', joinDate: '2024-01-10' },
        { id: 5, name: 'Mahmoud Khaled', phone: '+201234567894', rating: 4.5, totalDeliveries: 89, status: 'available', joinDate: '2024-03-05' }
    ];

    const availableDrivers = allDrivers.filter(driver => driver.status === 'available');

    const pendingOrders = [
        { id: '#ORD001', customer: 'Sarah Ahmed', address: '123 Nasr City, Cairo', items: 5, total: 450, assignedDriver: null, orderTime: '10:30 AM', priority: 'high' },
        { id: '#ORD002', customer: 'Khaled Mohamed', address: '456 Maadi, Cairo', items: 3, total: 280, assignedDriver: 'Ahmed Mohamed', orderTime: '11:15 AM', priority: 'medium' },
        { id: '#ORD003', customer: 'Fatma Hassan', address: '789 Heliopolis, Cairo', items: 7, total: 520, assignedDriver: null, orderTime: '11:45 AM', priority: 'high' },
        { id: '#ORD004', customer: 'Ali Ibrahim', address: '321 Zamalek, Cairo', items: 2, total: 150, assignedDriver: null, orderTime: '12:00 PM', priority: 'low' }
    ];

    const driverReviews = [
        { id: 1, driverName: 'Ahmed Mohamed', customerName: 'Sarah Ahmed', rating: 5, comment: 'Very fast delivery and polite driver!', date: '2024-07-09' },
        { id: 2, driverName: 'Omar Hassan', customerName: 'Mohamed Ali', rating: 4, comment: 'Good service, on time delivery.', date: '2024-07-08' },
        { id: 3, driverName: 'Mohamed Ali', customerName: 'Fatma Hassan', rating: 5, comment: 'Excellent service, very professional.', date: '2024-07-07' },
        { id: 4, driverName: 'Ahmed Mohamed', customerName: 'Khaled Omar', rating: 4, comment: 'Quick delivery, driver was friendly.', date: '2024-07-06' }
    ];

    const customerReviews = [
        { id: 1, customerName: 'Sarah Ahmed', orderNumber: '#ORD001', rating: 5, comment: 'Amazing service and quality products!', date: '2024-07-09' },
        { id: 2, customerName: 'Mohamed Ali', orderNumber: '#ORD002', rating: 4, comment: 'Good experience overall, delivery was on time.', date: '2024-07-08' },
        { id: 3, customerName: 'Fatma Hassan', orderNumber: '#ORD003', rating: 5, comment: 'Love the app and the quick delivery service.', date: '2024-07-07' },
        { id: 4, customerName: 'Ali Ibrahim', orderNumber: '#ORD004', rating: 3, comment: 'Service is okay but could be improved.', date: '2024-07-06' }
    ];

    const stats = {
        totalDrivers: allDrivers.length,
        availableDrivers: availableDrivers.length,
        pendingOrders: pendingOrders.length,
        avgDriverRating: (allDrivers.reduce((sum, driver) => sum + driver.rating, 0) / allDrivers.length).toFixed(1)
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
        ));
    };

    const getStatusClass = (status) => {
        switch(status) {
            case 'available': return 'status-available';
            case 'busy': return 'status-busy';
            case 'offline': return 'status-offline';
            default: return '';
        }
    };

    const getPriorityClass = (priority) => {
        switch(priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    return (
        <div className="admin-delivery-dashboard">
            <div className="dashboard-header">
                <h1>Delivery Management Dashboard</h1>
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>{stats.totalDrivers}</h3>
                        <p>Total Drivers</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.availableDrivers}</h3>
                        <p>Available Now</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.pendingOrders}</h3>
                        <p>Pending Orders</p>
                    </div>
                    <div className="stat-card">
                        <h3>{stats.avgDriverRating}</h3>
                        <p>Avg Rating</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'drivers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('drivers')}
                >
                    All Drivers
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Pending Orders
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        <div className="overview-card">
                            <h3>Available Drivers ({availableDrivers.length})</h3>
                            <div className="drivers-list">
                                {availableDrivers.map(driver => (
                                    <div key={driver.id} className="driver-item">
                                        <div className="driver-info">
                                            <span className="driver-name">{driver.name}</span>
                                            <div className="driver-rating">
                                                {renderStars(Math.floor(driver.rating))}
                                                <span>{driver.rating}</span>
                                            </div>
                                        </div>
                                        <span className={`status ${getStatusClass(driver.status)}`}>
                                            {driver.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overview-card">
                            <h3>Recent Pending Orders</h3>
                            <div className="orders-list">
                                {pendingOrders.slice(0, 3).map(order => (
                                    <div key={order.id} className="order-item">
                                        <div className="order-info">
                                            <span className="order-id">{order.id}</span>
                                            <span className="customer-name">{order.customer}</span>
                                            <span className="order-total">EGP {order.total}</span>
                                        </div>
                                        {/* <span className={`priority ${getPriorityClass(order.priority)}`}>
                                            {order.priority}
                                        </span> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'drivers' && (
                    <div className="drivers-section">
                        <div className="drivers-table">
                            <div className="table-header">
                                <span>Driver</span>
                                <span>Phone</span>
                                <span>Rating</span>
                                <span>Deliveries</span>
                                <span>Status</span>
                                <span>Join Date</span>
                                <span>Actions</span>
                            </div>
                            {allDrivers.map(driver => (
                                <div key={driver.id} className="table-row">
                                    <span className="driver-name">{driver.name}</span>
                                    <span>{driver.phone}</span>
                                    <span className="rating">
                                        {renderStars(Math.floor(driver.rating))}
                                        {driver.rating}
                                    </span>
                                    <span>{driver.totalDeliveries}</span>
                                    <span className={`status ${getStatusClass(driver.status)}`}>
                                        {driver.status}
                                    </span>
                                    <span>{driver.joinDate}</span>
                                    <div className="actions">
                                        <button className="edit-btn">Edit</button>
                                        <button className="view-btn">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-section">
                        <div className="section-header">
                            <h3>Pending Orders</h3>
                            <button className="refresh-btn">Refresh</button>
                        </div>
                        <div className="orders-grid">
                            {pendingOrders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <span className="order-id">{order.id}</span>
                                        {/* <span className={`priority ${getPriorityClass(order.priority)}`}>
                                            {order.priority}
                                        </span> */}
                                    </div>
                                    <div className="order-details-dashboard">
                                        <p><strong>Customer:</strong> {order.customer}</p>
                                        <p><strong>Address:</strong> {order.address}</p>
                                        <p><strong>Items:</strong> {order.items} items</p>
                                        <p><strong>Total:</strong> EGP {order.total}</p>
                                        <p><strong>Order Time:</strong> {order.orderTime}</p>
                                        <p><strong>Assigned Driver:</strong> {order.assignedDriver || 'Not assigned'}</p>
                                    </div>
                                    <div className="order-actions">
                                        <button className="assign-btn">Assign Driver</button>
                                        <button className="view-btn">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="reviews-section">
                        <div className="reviews-grid">
                            <div className="reviews-card">
                                <h3>Driver Reviews</h3>
                                <div className="reviews-list">
                                    {driverReviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <span className="reviewer">{review.customerName}</span>
                                                <div className="rating">
                                                    {renderStars(review.rating)}
                                                    <span>{review.rating}</span>
                                                </div>
                                            </div>
                                            <p><strong>Driver:</strong> {review.driverName}</p>
                                            <p className="review-comment">"{review.comment}"</p>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="reviews-card">
                                <h3>Customer Reviews</h3>
                                <div className="reviews-list">
                                    {customerReviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <span className="reviewer">{review.customerName}</span>
                                                <div className="rating">
                                                    {renderStars(review.rating)}
                                                    <span>{review.rating}</span>
                                                </div>
                                            </div>
                                            <p><strong>Order:</strong> {review.orderNumber}</p>
                                            <p className="review-comment">"{review.comment}"</p>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDeliveryDashboard;