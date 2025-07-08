import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DeliveryOrders.scss'

const DeliveryOrders = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [driverAvailable, setDriverAvailable] = useState(true)
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [orderStatus, setOrderStatus] = useState('pending') // pending, accepted, picked_up, delivered
    const [showMap, setShowMap] = useState(false)
    const [pickupPhoto, setPickupPhoto] = useState(null)
    const [deliveryPhoto, setDeliveryPhoto] = useState(null)
    const [reviews, setReviews] = useState({ seller: null, buyer: null })
    const [sidebarSection, setSidebarSection] = useState('summary') // summary, photos, reviews

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockOrders = [
                    {
                        id: 'ORD001',
                        orderNumber: '#12345',
                        pickupLocation: {
                            street: '123 Tech Plaza',
                            full: '123 Tech Plaza, Downtown Business District, City, State 12345',
                            coordinates: { lat: 40.7128, lng: -74.0060 }
                        },
                        deliveryLocation: {
                            street: '456 Oak Avenue',
                            full: '456 Oak Avenue, Residential Area, Suburb, State 54321',
                            coordinates: { lat: 40.7589, lng: -73.9851 }
                        },
                        size: 'medium',
                        price: 24.50,
                        distance: '3.2 miles',
                        estimatedTime: '15 mins',
                        customer: {
                            name: 'Sarah Johnson',
                            phone: '+1 (555) 123-4567',
                            instructions: 'Please ring doorbell, leave at door if no answer'
                        },
                        seller: {
                            name: 'TechMart Store',
                            phone: '+1 (555) 987-6543',
                            address: '123 Tech Plaza, Downtown Business District'
                        },
                        items: [
                            { name: 'Wireless Keyboard', quantity: 1, price: 79.99 },
                            { name: 'Gaming Mouse', quantity: 2, price: 49.99 }
                        ],
                        totalAmount: 179.97,
                        deliveryFee: 5.99,
                        driverEarnings: 8.50
                    },
                    {
                        id: 'ORD002',
                        orderNumber: '#12346',
                        pickupLocation: {
                            street: '789 Mall Drive',
                            full: '789 Mall Drive, Shopping Center, City, State 67890',
                            coordinates: { lat: 40.7831, lng: -73.9712 }
                        },
                        deliveryLocation: {
                            street: '321 Elm Street',
                            full: '321 Elm Street, University District, City, State 09876',
                            coordinates: { lat: 40.7505, lng: -73.9934 }
                        },
                        size: 'small',
                        price: 12.75,
                        distance: '1.8 miles',
                        estimatedTime: '10 mins',
                        customer: {
                            name: 'Mike Chen',
                            phone: '+1 (555) 456-7890',
                            instructions: 'Apartment 3B, use back entrance'
                        },
                        seller: {
                            name: 'QuickMart',
                            phone: '+1 (555) 654-3210',
                            address: '789 Mall Drive, Shopping Center'
                        },
                        items: [
                            { name: 'Phone Charger', quantity: 1, price: 19.99 }
                        ],
                        totalAmount: 19.99,
                        deliveryFee: 3.99,
                        driverEarnings: 5.25
                    },
                    {
                        id: 'ORD003',
                        orderNumber: '#12347',
                        pickupLocation: {
                            street: '555 Electronics Way',
                            full: '555 Electronics Way, Tech District, City, State 11111',
                            coordinates: { lat: 40.7282, lng: -74.0776 }
                        },
                        deliveryLocation: {
                            street: '888 Broadway',
                            full: '888 Broadway, Theater District, City, State 22222',
                            coordinates: { lat: 40.7614, lng: -73.9776 }
                        },
                        size: 'big',
                        price: 45.00,
                        distance: '5.1 miles',
                        estimatedTime: '25 mins',
                        customer: {
                            name: 'Emma Wilson',
                            phone: '+1 (555) 789-0123',
                            instructions: 'Office building, 15th floor, ask for Emma at reception'
                        },
                        seller: {
                            name: 'ElectroWorld',
                            phone: '+1 (555) 321-0987',
                            address: '555 Electronics Way, Tech District'
                        },
                        items: [
                            { name: 'Laptop Stand', quantity: 1, price: 89.99 },
                            { name: 'USB-C Hub', quantity: 1, price: 69.99 },
                            { name: 'Wireless Headphones', quantity: 1, price: 199.99 }
                        ],
                        totalAmount: 359.97,
                        deliveryFee: 8.99,
                        driverEarnings: 12.75
                    }
                ]
                setOrders(mockOrders)
                setLoading(false)
            }, 1000)
        }

        fetchOrders()
    }, [])

    const toggleDriverAvailability = () => {
        setDriverAvailable(!driverAvailable)
    }

    const getSizeColor = (size) => {
        switch (size) {
            case 'small': return '#10b981'
            case 'medium': return '#f59e0b'
            case 'big': return '#ef4444'
            default: return '#6b7280'
        }
    }

    const getSizeIcon = (size) => {
        switch (size) {
            case 'small':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                )
            case 'medium':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                )
            case 'big':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                )
            default:
                return null
        }
    }

    const acceptOrder = (order) => {
        setSelectedOrder(order)
        setOrderStatus('accepted')
        setShowMap(true)
        setSidebarSection('summary')
    }

    const declineOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId))
    }

    const pickupOrder = () => {
        setOrderStatus('picked_up')
        setSidebarSection('photos')
    }

    const deliverOrder = () => {
        setOrderStatus('delivered')
        setSidebarSection('reviews')
    }

    const handlePhotoUpload = (type, event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (type === 'pickup') {
                    setPickupPhoto(e.target.result)
                } else {
                    setDeliveryPhoto(e.target.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const submitReview = (type, rating, comment) => {
        setReviews(prev => ({
            ...prev,
            [type]: { rating, comment, submitted: true }
        }))
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    if (loading) {
        return (
            <div className="delivery-orders">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="delivery-orders">
            {/* Header with Availability Toggle */}
            <div className="orders-header">
                <div className="header-content">
                    <div className="page-title">
                        <h1>Available Orders</h1>
                        <p>Accept orders in your area</p>
                    </div>
                    <div className="availability-control">
                        <label className="availability-label">Driver Status</label>
                        <button
                            className={`availability-btn ${driverAvailable ? 'available' : 'unavailable'}`}
                            onClick={toggleDriverAvailability}
                        >
                            <span className="status-indicator"></span>
                            <span className="status-text">
                                {driverAvailable ? 'Available' : 'Unavailable'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="orders-content">
                {/* Main Orders List */}
                <div className="orders-main">
                    {!selectedOrder ? (
                        <div className="orders-list">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order.id} className="order-card">
                                        <div className="order-header">
                                            <div className="order-info">
                                                <h3 className="order-number">{order.orderNumber}</h3>
                                                <div className="order-meta">
                                                    <div
                                                        className="size-badge"
                                                        style={{ backgroundColor: getSizeColor(order.size) }}
                                                    >
                                                        {getSizeIcon(order.size)}
                                                        <span>{order.size}</span>
                                                    </div>
                                                    <span className="distance">{order.distance}</span>
                                                    <span className="time">{order.estimatedTime}</span>
                                                </div>
                                            </div>
                                            <div className="order-earnings">
                                                <span className="amount">{formatCurrency(order.driverEarnings)}</span>
                                                <span className="label">Earnings</span>
                                            </div>
                                        </div>

                                        <div className="order-locations">
                                            <div className="location pickup">
                                                <div className="location-icon pickup-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div className="location-text">
                                                    <span className="label">Pickup</span>
                                                    <span className="address">{order.pickupLocation.street}</span>
                                                </div>
                                            </div>
                                            <div className="route-line"></div>
                                            <div className="location delivery">
                                                <div className="location-icon delivery-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div className="location-text">
                                                    <span className="label">Delivery</span>
                                                    <span className="address">{order.deliveryLocation.street}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-actions">
                                            <button
                                                className="action-btn decline"
                                                onClick={() => declineOrder(order.id)}
                                                disabled={!driverAvailable}
                                            >
                                                Decline
                                            </button>
                                            <button
                                                className="action-btn accept"
                                                onClick={() => acceptOrder(order)}
                                                disabled={!driverAvailable}
                                            >
                                                Accept Order
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <h3>No Orders Available</h3>
                                    <p>Check back later for new delivery opportunities</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="active-order">
                            {/* Map Section */}
                            {showMap && (
                                <div className="map-container">
                                    <div className="map-placeholder">
                                        <div className="map-info">
                                            <h3>Route Map</h3>
                                            <div className="route-details">
                                                <div className="route-point pickup">
                                                    <span className="point-icon">A</span>
                                                    <span>{selectedOrder.pickupLocation.full}</span>
                                                </div>
                                                <div className="route-point delivery">
                                                    <span className="point-icon">B</span>
                                                    <span>{selectedOrder.deliveryLocation.full}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="map-actions">
                                            <button className="map-btn">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                                Get Directions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order Status Actions */}
                            <div className="order-status-actions">
                                {orderStatus === 'accepted' && (
                                    <button className="status-btn pickup" onClick={pickupOrder}>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mark as Picked Up
                                    </button>
                                )}
                                {orderStatus === 'picked_up' && (
                                    <button className="status-btn deliver" onClick={deliverOrder}>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Mark as Delivered
                                    </button>
                                )}
                                {orderStatus === 'delivered' && (
                                    <button
                                        className="status-btn complete"
                                        onClick={() => {
                                            setSelectedOrder(null)
                                            setOrderStatus('pending')
                                            setShowMap(false)
                                            setPickupPhoto(null)
                                            setDeliveryPhoto(null)
                                            setReviews({ seller: null, buyer: null })
                                        }}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Complete Order
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                {selectedOrder && (
                    <div className="orders-sidebar">
                        <div className="sidebar-header">
                            <div className="sidebar-tabs">
                                <button
                                    className={`tab-btn ${sidebarSection === 'summary' ? 'active' : ''}`}
                                    onClick={() => setSidebarSection('summary')}
                                >
                                    Summary
                                </button>
                                <button
                                    className={`tab-btn ${sidebarSection === 'photos' ? 'active' : ''}`}
                                    onClick={() => setSidebarSection('photos')}
                                >
                                    Photos
                                </button>
                                <button
                                    className={`tab-btn ${sidebarSection === 'reviews' ? 'active' : ''}`}
                                    onClick={() => setSidebarSection('reviews')}
                                >
                                    Reviews
                                </button>
                            </div>
                        </div>

                        <div className="sidebar-content">
                            {sidebarSection === 'summary' && (
                                <div className="summary-section">
                                    <div className="order-details">
                                        <h3>{selectedOrder.orderNumber}</h3>
                                        <div className="detail-group">
                                            <h4>Customer</h4>
                                            <p>{selectedOrder.customer.name}</p>
                                            <p>{selectedOrder.customer.phone}</p>
                                            <p className="instructions">{selectedOrder.customer.instructions}</p>
                                        </div>
                                        <div className="detail-group">
                                            <h4>Seller</h4>
                                            <p>{selectedOrder.seller.name}</p>
                                            <p>{selectedOrder.seller.phone}</p>
                                            <p>{selectedOrder.seller.address}</p>
                                        </div>
                                        <div className="detail-group">
                                            <h4>Items</h4>
                                            {selectedOrder.items.map((item, index) => (
                                                <div key={index} className="item-row">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span>{formatCurrency(item.price)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="detail-group totals">
                                            <div className="total-row">
                                                <span>Subtotal:</span>
                                                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                                            </div>
                                            <div className="total-row">
                                                <span>Delivery Fee:</span>
                                                <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                                            </div>
                                            <div className="total-row earnings">
                                                <span>Your Earnings:</span>
                                                <span>{formatCurrency(selectedOrder.driverEarnings)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {sidebarSection === 'photos' && (
                                <div className="photos-section">
                                    <div className="photo-group">
                                        <h4>Pickup Photo</h4>
                                        <p>Take a photo after picking up from seller</p>
                                        <div className="photo-upload">
                                            {pickupPhoto ? (
                                                <div className="photo-preview">
                                                    <img src={pickupPhoto} alt="Pickup" />
                                                    <button
                                                        className="retake-btn"
                                                        onClick={() => setPickupPhoto(null)}
                                                    >
                                                        Retake
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="upload-btn">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Take Photo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        capture="camera"
                                                        onChange={(e) => handlePhotoUpload('pickup', e)}
                                                        hidden
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    <div className="photo-group">
                                        <h4>Delivery Photo</h4>
                                        <p>Take a photo after delivering to customer</p>
                                        <div className="photo-upload">
                                            {deliveryPhoto ? (
                                                <div className="photo-preview">
                                                    <img src={deliveryPhoto} alt="Delivery" />
                                                    <button
                                                        className="retake-btn"
                                                        onClick={() => setDeliveryPhoto(null)}
                                                    >
                                                        Retake
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="upload-btn">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Take Photo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        capture="camera"
                                                        onChange={(e) => handlePhotoUpload('delivery', e)}
                                                        hidden
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {sidebarSection === 'reviews' && (
                                <div className="reviews-section">
                                    <ReviewForm
                                        title="Rate the Seller"
                                        subtitle={selectedOrder.seller.name}
                                        onSubmit={(rating, comment) => submitReview('seller', rating, comment)}
                                        submitted={reviews.seller?.submitted}
                                    />
                                    <ReviewForm
                                        title="Rate the Customer"
                                        subtitle={selectedOrder.customer.name}
                                        onSubmit={(rating, comment) => submitReview('buyer', rating, comment)}
                                        submitted={reviews.buyer?.submitted}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// Review Form Component
const ReviewForm = ({ title, subtitle, onSubmit, submitted }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [hoveredRating, setHoveredRating] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating > 0) {
            onSubmit(rating, comment)
        }
    }

    if (submitted) {
        return (
            <div className="review-form submitted">
                <h4>{title}</h4>
                <div className="submitted-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Review submitted</span>
                </div>
            </div>
        )
    }

    return (
        <div className="review-form">
            <h4>{title}</h4>
            <p>{subtitle}</p>
            <form onSubmit={handleSubmit}>
                <div className="rating-input">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star ${(hoveredRating || rating) >= star ? 'filled' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredRating(star)}
                                onMouseLeave={() => setHoveredRating(0)}
                            >
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review (optional)"
                    rows={3}
                />
                <button type="submit" className="submit-btn" disabled={rating === 0}>
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default DeliveryOrders