import { useState } from 'react';
import './AdminOrdersHistory.scss';

const AdminOrdersHistory = ({ onOrderClick }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentView, setCurrentView] = useState('listing');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock completed orders data with pickup and delivery information
    const completedOrders = [
        {
            id: '#ORD007',
            from: 'Damascus',
            to: 'Aleppo',
            status: 'delivered',
            size: 'large',
            customer: {
                name: 'Sarah Al-Mahmoud',
                phone: '+963123456795',
                address: '789 Al-Aziziyah District, Aleppo, Syria',
                rating: 4.8,
                review: 'Excellent service! The driver was very professional and delivered on time. Items arrived in perfect condition.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            },
            seller: {
                name: 'Damascus Tech Store',
                phone: '+963123456794',
                address: '456 Souq Al-Hamidiyah, Damascus, Syria',
                rating: 4.9,
                review: 'Great packaging and quick handover to driver. Very reliable service.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            },
            driver: {
                name: 'Ahmed Al-Khoury',
                phone: '+963123456790',
                rating: 4.8
            },
            items: [
                { name: 'Laptop Computer', quantity: 1, price: 850 },
                { name: 'Laptop Bag', quantity: 1, price: 45 },
                { name: 'Wireless Mouse', quantity: 1, price: 25 }
            ],
            itemsTotal: 920,
            deliveryFee: 35,
            total: 955,
            orderTime: '9:30 AM',
            estimatedDelivery: '2:30 PM',
            actualDelivery: '2:15 PM',
            completedDate: 'March 15, 2024',
            pickup: {
                timestamp: '10:15 AM',
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
                sellerNotes: 'Package securely wrapped and ready for delivery. All items checked and verified.',
                pickupBy: 'Ahmed Al-Khoury'
            },
            delivery: {
                timestamp: '2:15 PM',
                image: 'https://images.unsplash.com/photo-1558618620-fcd25c85cd64?w=400&h=300&fit=crop',
                deliveryNotes: 'Package delivered successfully to customer. Customer satisfied with condition.',
                receivedBy: 'Sarah Al-Mahmoud',
                customerSignature: true
            }
        },
        {
            id: '#ORD008',
            from: 'Aleppo',
            to: 'Homs',
            status: 'delivered',
            size: 'medium',
            customer: {
                name: 'Mohammad Al-Rashid',
                phone: '+963123456796',
                address: '654 Al-Hadra District, Homs, Syria',
                rating: 4.7,
                review: 'Good service overall. Driver was polite and delivery was on time.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            },
            seller: {
                name: 'Aleppo Fashion House',
                phone: '+963123456797',
                address: '321 Baron Street, Aleppo, Syria',
                rating: 4.6,
                review: 'Professional service, items were well packaged.',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            },
            driver: {
                name: 'Omar Al-Zahra',
                phone: '+963123456792',
                rating: 4.9
            },
            items: [
                { name: 'Winter Jacket', quantity: 2, price: 120 },
                { name: 'Leather Shoes', quantity: 1, price: 90 }
            ],
            itemsTotal: 330,
            deliveryFee: 25,
            total: 355,
            orderTime: '11:00 AM',
            estimatedDelivery: '3:00 PM',
            actualDelivery: '2:45 PM',
            completedDate: 'March 14, 2024',
            pickup: {
                timestamp: '11:30 AM',
                image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                sellerNotes: 'Clothing items properly folded and packaged in protective bags.',
                pickupBy: 'Omar Al-Zahra'
            },
            delivery: {
                timestamp: '2:45 PM',
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                deliveryNotes: 'Items delivered in perfect condition. Customer tried on jacket and confirmed fit.',
                receivedBy: 'Mohammad Al-Rashid',
                customerSignature: true
            }
        },
        {
            id: '#ORD009',
            from: 'Homs',
            to: 'Latakia',
            status: 'delivered',
            size: 'small',
            customer: {
                name: 'Layla Al-Hassan',
                phone: '+963123456798',
                address: '159 Al-Ziraa Street, Latakia, Syria',
                rating: 5.0,
                review: 'Perfect service! Very careful handling of jewelry items. Highly recommended.',
                avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face'
            },
            seller: {
                name: 'Homs Jewelry & Accessories',
                phone: '+963123456799',
                address: '987 Al-Dablan Street, Homs, Syria',
                rating: 4.9,
                review: 'Excellent service for valuable items. Very secure packaging.',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
            },
            driver: {
                name: 'Youssef Al-Hassan',
                phone: '+963123456793',
                rating: 4.7
            },
            items: [
                { name: 'Gold Necklace', quantity: 1, price: 280 },
                { name: 'Silver Earrings', quantity: 1, price: 95 }
            ],
            itemsTotal: 375,
            deliveryFee: 20,
            total: 395,
            orderTime: '10:20 AM',
            estimatedDelivery: '1:20 PM',
            actualDelivery: '1:10 PM',
            completedDate: 'March 13, 2024',
            pickup: {
                timestamp: '10:45 AM',
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
                sellerNotes: 'Jewelry items securely packaged in protective boxes with authentication certificates.',
                pickupBy: 'Youssef Al-Hassan'
            },
            delivery: {
                timestamp: '1:10 PM',
                image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop',
                deliveryNotes: 'Jewelry delivered safely. Customer inspected items and confirmed authenticity.',
                receivedBy: 'Layla Al-Hassan',
                customerSignature: true
            }
        },
        {
            id: '#ORD010',
            from: 'Latakia',
            to: 'Damascus',
            status: 'delivered',
            size: 'large',
            customer: {
                name: 'Khaled Al-Mousa',
                phone: '+963123456800',
                address: '123 Al-Umayyad Street, Damascus, Syria',
                rating: 4.5,
                review: 'Good delivery service. Driver helped with assembly which was appreciated.',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            },
            seller: {
                name: 'Latakia Home Furniture',
                phone: '+963123456801',
                address: '753 Port Area, Latakia, Syria',
                rating: 4.8,
                review: 'Professional furniture delivery service. Items well protected.',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
            },
            driver: {
                name: 'Ahmed Al-Khoury',
                phone: '+963123456790',
                rating: 4.8
            },
            items: [
                { name: 'Office Chair', quantity: 1, price: 320 },
                { name: 'Desk Lamp', quantity: 2, price: 75 }
            ],
            itemsTotal: 470,
            deliveryFee: 40,
            total: 510,
            orderTime: '8:45 AM',
            estimatedDelivery: '12:45 PM',
            actualDelivery: '12:30 PM',
            completedDate: 'March 12, 2024',
            pickup: {
                timestamp: '9:20 AM',
                image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
                sellerNotes: 'Furniture items carefully wrapped and secured for transport. Assembly instructions included.',
                pickupBy: 'Ahmed Al-Khoury'
            },
            delivery: {
                timestamp: '12:30 PM',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
                deliveryNotes: 'Furniture delivered and assembled on-site. Customer satisfied with quality and setup.',
                receivedBy: 'Khaled Al-Mousa',
                customerSignature: true
            }
        }
    ];

    // Filter orders based on active filter
    const orders = completedOrders.filter(order => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'today') {
            // For demo purposes, showing recent orders as "today"
            return ['#ORD007', '#ORD008'].includes(order.id);
        }
        if (activeFilter === 'week') {
            return ['#ORD007', '#ORD008', '#ORD009'].includes(order.id);
        }
        return true;
    });

    const getSizeClass = (size) => {
        switch (size) {
            case 'small': return 'size-small';
            case 'medium': return 'size-medium';
            case 'large': return 'size-large';
            default: return '';
        }
    };

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star star-full">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star star-half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star star-empty">☆</span>);
        }

        return stars;
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setCurrentView('details');
    };

    const handleBackToHistory = () => {
        setCurrentView('listing');
        setSelectedOrder(null);
    };

    const renderOrderDetails = () => {
        if (!selectedOrder) return null;

        return (
            <div className="order-history-details">
                <div className="details-header">
                    <div className="header-left">
                        <button className="back-btn" onClick={handleBackToHistory}>
                            ← Back to History
                        </button>
                        <h1>Order Details - {selectedOrder.id}</h1>
                    </div>
                    <div className="header-right">
                        <span className="status-badge status-delivered">Delivered</span>
                        <span className={`size-badge ${getSizeClass(selectedOrder.size)}`}>
                            {selectedOrder.size} Box
                        </span>
                    </div>
                </div>

                <div className="details-content">
                    {/* Order Summary */}
                    <div className="details-section order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-item">
                                <span className="label">Order ID:</span>
                                <span className="value">{selectedOrder.id}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Completed Date:</span>
                                <span className="value">{selectedOrder.completedDate}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Actual Delivery:</span>
                                <span className="value">{selectedOrder.actualDelivery}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Items Total:</span>
                                <span className="value">${selectedOrder.itemsTotal}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Delivery Fee:</span>
                                <span className="value delivery-fee">${selectedOrder.deliveryFee}</span>
                            </div>
                            <div className="summary-item">
                                <span className="label">Total Amount:</span>
                                <span className="value total-amount">${selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Review Section */}
                    <div className="details-section customer-review-section">
                        <h3>👤 Customer Feedback</h3>
                        <div className="review-content">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <img src={selectedOrder.customer.avatar} alt={selectedOrder.customer.name} className="reviewer-avatar" />
                                    <div className="reviewer-details">
                                        <h4>{selectedOrder.customer.name}</h4>
                                        <div className="rating-display">
                                            <div className="stars">
                                                {renderStarRating(selectedOrder.customer.rating)}
                                            </div>
                                            <span className="rating-number">({selectedOrder.customer.rating})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="review-text">
                                <p>"{selectedOrder.customer.review}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Seller Review Section */}
                    <div className="details-section seller-review-section">
                        <h3>🏪 Seller Feedback</h3>
                        <div className="review-content">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <img src={selectedOrder.seller.avatar} alt={selectedOrder.seller.name} className="reviewer-avatar" />
                                    <div className="reviewer-details">
                                        <h4>{selectedOrder.seller.name}</h4>
                                        <div className="rating-display">
                                            <div className="stars">
                                                {renderStarRating(selectedOrder.seller.rating)}
                                            </div>
                                            <span className="rating-number">({selectedOrder.seller.rating})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="review-text">
                                <p>"{selectedOrder.seller.review}"</p>
                            </div>
                        </div>
                    </div>

                    {/* Pickup Section */}
                    <div className="details-section pickup-section">
                        <h3>📦 Pickup Information</h3>
                        <div className="pickup-content">
                            <div className="pickup-details">
                                <div className="pickup-info">
                                    <div className="info-item">
                                        <strong>Picked up by:</strong>
                                        <span>{selectedOrder.pickup.pickupBy}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Pickup Time:</strong>
                                        <span>{selectedOrder.pickup.timestamp}</span>
                                    </div>
                                </div>
                                <div className="pickup-image">
                                    <h4>Pickup Verification Photo</h4>
                                    <img src={selectedOrder.pickup.image} alt="Pickup verification" />
                                    <p className="image-caption">Photo taken by seller at pickup</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Section */}
                    <div className="details-section delivery-section">
                        <h3>🚚 Delivery Information</h3>
                        <div className="delivery-content">
                            <div className="delivery-details">
                                <div className="delivery-info">
                                    <div className="info-item">
                                        <strong>Delivered by:</strong>
                                        <span>{selectedOrder.driver.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Delivery Time:</strong>
                                        <span>{selectedOrder.delivery.timestamp}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Received by:</strong>
                                        <span>{selectedOrder.delivery.receivedBy}</span>
                                    </div>
                                    <div className="info-item">
                                        <strong>Customer Signature:</strong>
                                        <span className="signature-status">
                                            {selectedOrder.delivery.customerSignature ? '✅ Signed' : '❌ Not Signed'}
                                        </span>
                                    </div>
                                </div>
                                <div className="delivery-image">
                                    <h4>Delivery Confirmation Photo</h4>
                                    <img src={selectedOrder.delivery.image} alt="Delivery confirmation" />
                                    <p className="image-caption">Photo taken by driver at delivery</p>
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
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="table-row">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-quantity">{item.quantity}</span>
                                    <span className="item-price">${item.price}</span>
                                    <span className="item-total">${item.price * item.quantity}</span>
                                </div>
                            ))}
                            <div className="table-subtotal">
                                <span className="subtotal-label">Items Subtotal:</span>
                                <span className="subtotal-value">${selectedOrder.itemsTotal}</span>
                            </div>
                            <div className="table-delivery">
                                <span className="delivery-label">Delivery Fee:</span>
                                <span className="delivery-value">${selectedOrder.deliveryFee}</span>
                            </div>
                            <div className="table-footer">
                                <span className="total-label">Total Amount:</span>
                                <span className="total-value">${selectedOrder.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderOrdersListing = () => {
        return (
            <>
                <div className="history-header">
                    <h2>Orders History</h2>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            All History
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'today' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('today')}
                        >
                            Today
                        </button>
                        <button
                            className={`filter-btn ${activeFilter === 'week' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('week')}
                        >
                            This Week
                        </button>
                    </div>
                </div>

                <div className="history-grid">
                    {orders.map(order => (
                        <div
                            key={order.id}
                            className={`history-card ${getSizeClass(order.size)}`}
                            onClick={() => handleOrderClick(order)}
                        >
                            <div className="history-card-header">
                                <span className="order-id">{order.id}</span>
                                <div className="order-badges">
                                    <span className="status status-delivered">Delivered</span>
                                </div>
                            </div>

                            <div className="order-route">
                                <div className="route-point from">
                                    <span className="route-label">From</span>
                                    <span className="route-location">{order.from}</span>
                                </div>
                                <div className="route-arrow">→</div>
                                <div className="route-point to">
                                    <span className="route-label">To</span>
                                    <span className="route-location">{order.to}</span>
                                </div>
                            </div>

                            <div className="delivery-info">
                                <div className="delivery-detail">
                                    <span className="label">Completed:</span>
                                    <span className="value">{order.completedDate}</span>
                                </div>
                                <div className="delivery-detail">
                                    <span className="label">Driver:</span>
                                    <span className="value">{order.driver.name}</span>
                                </div>
                                <div className="delivery-detail">
                                    <span className="label">Delivery Fee:</span>
                                    <span className="value delivery-fee-card">${order.deliveryFee}</span>
                                </div>
                            </div>

                            <div className="history-card-footer">
                                <span className="delivery-time">Delivered at {order.actualDelivery}</span>
                                <span className="order-total">${order.total}</span>
                            </div>

                            <div className="size-indicator">
                                <span className={`size-badge ${getSizeClass(order.size)}`}>
                                    {order.size}
                                </span>
                            </div>

                            <div className="completion-indicator">
                                <span className="completion-badge">✅ Complete</span>
                            </div>

                            <div className="ratings-preview">
                                <div className="rating-item">
                                    <span className="rating-label">Customer:</span>
                                    <div className="rating-stars-small">
                                        {renderStarRating(order.customer.rating).slice(0, 5)}
                                    </div>
                                </div>
                                <div className="rating-item">
                                    <span className="rating-label">Seller:</span>
                                    <div className="rating-stars-small">
                                        {renderStarRating(order.seller.rating).slice(0, 5)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="orders-history">
            {currentView === 'details' ? renderOrderDetails() : renderOrdersListing()}
        </div>
    );
};

export default AdminOrdersHistory;