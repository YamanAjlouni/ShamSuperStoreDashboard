import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ActiveDeliveries.scss'

const ActiveDeliveries = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [activeDelivery, setActiveDelivery] = useState(null)
    const [showContactModal, setShowContactModal] = useState(false)
    const [contactType, setContactType] = useState(null) // 'customer' or 'seller'
    const [pickupPhoto, setPickupPhoto] = useState(null)
    const [deliveryPhoto, setDeliveryPhoto] = useState(null)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [reviewTarget, setReviewTarget] = useState(null) // 'seller' or 'customer'
    const [reviews, setReviews] = useState({ seller: null, customer: null })
    const [completionStep, setCompletionStep] = useState('photos') // 'photos' or 'reviews'

    useEffect(() => {
        const fetchActiveDelivery = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                // Simulate having one active delivery (or null if none)
                const mockDelivery = {
                    id: 'DEL001',
                    orderNumber: '#12345',
                    status: 'assigned', // assigned, picked_up, en_route, delivered
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
                    customer: {
                        name: 'Sarah Johnson',
                        phone: '+1 (555) 123-4567',
                        instructions: 'Please ring doorbell, leave at door if no answer. Building has security code: 1234',
                        avatar: 'SJ'
                    },
                    seller: {
                        name: 'TechMart Store',
                        phone: '+1 (555) 987-6543',
                        contact: 'Mike Chen',
                        avatar: 'TM'
                    },
                    orderDetails: {
                        items: [
                            { name: 'Wireless Keyboard', quantity: 1, price: 79.99 },
                            { name: 'Gaming Mouse', quantity: 2, price: 49.99 }
                        ],
                        totalAmount: 179.97,
                        deliveryFee: 5.99,
                        driverEarnings: 8.50
                    },
                    timing: {
                        acceptedAt: '2024-01-25T14:00:00Z',
                        estimatedPickup: '2024-01-25T14:30:00Z',
                        estimatedDelivery: '2024-01-25T15:15:00Z',
                        actualPickup: null,
                        actualDelivery: null
                    },
                    distance: '3.2 miles',
                    estimatedTime: '15 mins',
                    priority: 'normal'
                }
                setActiveDelivery(mockDelivery)
                setLoading(false)
            }, 1000)
        }

        fetchActiveDelivery()
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return '#3b82f6'
            case 'picked_up': return '#f59e0b'
            case 'en_route': return '#8b5cf6'
            case 'delivered': return '#10b981'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'assigned': return 'Ready for Pickup'
            case 'picked_up': return 'Picked Up'
            case 'en_route': return 'En Route to Customer'
            case 'delivered': return 'Delivered'
            default: return status
        }
    }

    const updateDeliveryStatus = (newStatus) => {
        // Check photo requirements
        if (newStatus === 'en_route' && !pickupPhoto) {
            alert('Please take a photo of the order after picking it up from the seller')
            return
        }
        
        if (newStatus === 'delivered' && !deliveryPhoto) {
            alert('Please take a photo after delivering to the customer')
            return
        }

        setActiveDelivery(prev => {
            if (!prev) return null
            
            const updatedDelivery = { ...prev, status: newStatus }
            const now = new Date().toISOString()
            
            if (newStatus === 'picked_up' && !prev.timing.actualPickup) {
                updatedDelivery.timing.actualPickup = now
            } else if (newStatus === 'delivered' && !prev.timing.actualDelivery) {
                updatedDelivery.timing.actualDelivery = now
                // Start the completion flow with reviews
                setCompletionStep('reviews')
            }
            
            return updatedDelivery
        })
    }

    const handleReviewSubmit = (target, rating, comment) => {
        setReviews(prev => ({
            ...prev,
            [target]: { rating, comment, submitted: true }
        }))
        setShowReviewModal(false)
        
        // Check if both reviews are completed
        const updatedReviews = { ...reviews, [target]: { rating, comment, submitted: true } }
        if (updatedReviews.seller?.submitted && updatedReviews.customer?.submitted) {
            // All reviews completed, finish the delivery
            setTimeout(() => {
                setActiveDelivery(null)
                setPickupPhoto(null)
                setDeliveryPhoto(null)
                setReviews({ seller: null, customer: null })
                setCompletionStep('photos')
            }, 1500)
        }
    }

    const completeDelivery = () => {
        // Complete delivery without reviews (optional)
        setActiveDelivery(null)
        setPickupPhoto(null)
        setDeliveryPhoto(null)
        setReviews({ seller: null, customer: null })
        setCompletionStep('photos')
    }

    const handleContactCustomer = () => {
        setContactType('customer')
        setShowContactModal(true)
    }

    const handleContactSeller = () => {
        setContactType('seller')
        setShowContactModal(true)
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatTime = (dateString) => {
        if (!dateString) return '--:--'
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getNextAction = (status) => {
        switch (status) {
            case 'assigned':
                return { label: 'Start Pickup', nextStatus: 'picked_up', color: '#f59e0b', icon: 'pickup' }
            case 'picked_up':
                return { label: 'Head to Customer', nextStatus: 'en_route', color: '#8b5cf6', icon: 'route' }
            case 'en_route':
                return { label: 'Mark as Delivered', nextStatus: 'delivered', color: '#10b981', icon: 'delivered' }
            case 'delivered':
                return { label: 'Completed', nextStatus: 'completed', color: '#6b7280', icon: 'complete' }
            default:
                return { label: 'Update', nextStatus: 'assigned', color: '#6b7280', icon: 'update' }
        }
    }

    const getActionIcon = (iconType) => {
        switch (iconType) {
            case 'pickup':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                )
            case 'route':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                )
            case 'delivered':
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )
            default:
                return (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                )
        }
    }

    if (loading) {
        return (
            <div className="active-deliveries">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading active delivery...</p>
                </div>
            </div>
        )
    }

    if (!activeDelivery) {
        return (
            <div className="active-deliveries">
                <div className="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3>No Active Delivery</h3>
                    <p>You don't have any active deliveries at the moment</p>
                    <button
                        className="cta-btn"
                        onClick={() => navigate('/delivery/orders')}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Find Available Orders
                    </button>
                </div>
            </div>
        )
    }

    const nextAction = getNextAction(activeDelivery.status)

    return (
        <div className="active-deliveries">
            {/* Header */}
            <div className="deliveries-header">
                <div className="header-content">
                    <div className="page-title">
                        <h1>Current Delivery</h1>
                        <p>Complete this delivery before accepting new orders</p>
                    </div>
                    <div className="header-stats">
                        <div className="earnings-display">
                            <span className="earnings-amount">
                                {formatCurrency(activeDelivery.orderDetails.driverEarnings)}
                            </span>
                            <span className="earnings-label">Your Earnings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Delivery Card */}
            <div className="delivery-main">
                <div className="delivery-card single">
                    {/* Status Header */}
                    <div className="delivery-header">
                        <div className="delivery-info">
                            <div className="order-number">{activeDelivery.orderNumber}</div>
                            <div
                                className="status-badge large"
                                style={{ backgroundColor: getStatusColor(activeDelivery.status) }}
                            >
                                {getStatusLabel(activeDelivery.status)}
                            </div>
                        </div>
                        <div className="delivery-timing">
                            <div className="time-item">
                                <span className="time-label">Distance</span>
                                <span className="time-value">{activeDelivery.distance}</span>
                            </div>
                            <div className="time-item">
                                <span className="time-label">Est. Time</span>
                                <span className="time-value">{activeDelivery.estimatedTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="delivery-content">
                        {/* Left Column - Location Info */}
                        <div className="locations-section">
                            <h3>Route Information</h3>
                            
                            {/* Pickup Location */}
                            <div className="location-card pickup">
                                <div className="location-header">
                                    <div className="location-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="location-title">
                                        <h4>Pickup Location</h4>
                                        <p>{activeDelivery.seller.name}</p>
                                    </div>
                                    <button 
                                        className="contact-btn"
                                        onClick={handleContactSeller}
                                        title="Contact Seller"
                                    >
                                        <div className="contact-avatar seller">{activeDelivery.seller.avatar}</div>
                                    </button>
                                </div>
                                <div className="location-details">
                                    <p className="address">{activeDelivery.pickupLocation.full}</p>
                                    <p className="contact-person">Contact: {activeDelivery.seller.contact}</p>
                                    <p className="phone">{activeDelivery.seller.phone}</p>
                                </div>
                                <div className="location-time">
                                    <span>Est. Pickup: {formatTime(activeDelivery.timing.estimatedPickup)}</span>
                                    {activeDelivery.timing.actualPickup && (
                                        <span className="actual">Picked up: {formatTime(activeDelivery.timing.actualPickup)}</span>
                                    )}
                                </div>
                            </div>

                            {/* Route Arrow */}
                            <div className="route-arrow">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>

                            {/* Delivery Location */}
                            <div className="location-card delivery">
                                <div className="location-header">
                                    <div className="location-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="location-title">
                                        <h4>Delivery Location</h4>
                                        <p>{activeDelivery.customer.name}</p>
                                    </div>
                                    <button 
                                        className="contact-btn"
                                        onClick={handleContactCustomer}
                                        title="Contact Customer"
                                    >
                                        <div className="contact-avatar">{activeDelivery.customer.avatar}</div>
                                    </button>
                                </div>
                                <div className="location-details">
                                    <p className="address">{activeDelivery.deliveryLocation.full}</p>
                                    <p className="phone">{activeDelivery.customer.phone}</p>
                                    <div className="instructions">
                                        <strong>Instructions:</strong>
                                        <p>{activeDelivery.customer.instructions}</p>
                                    </div>
                                </div>
                                <div className="location-time">
                                    <span>Est. Delivery: {formatTime(activeDelivery.timing.estimatedDelivery)}</span>
                                    {activeDelivery.timing.actualDelivery && (
                                        <span className="actual">Delivered: {formatTime(activeDelivery.timing.actualDelivery)}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Actions & Info */}
                        <div className="actions-section">
                            {/* Progress Timeline */}
                            <div className="progress-timeline">
                                <h3>Delivery Progress</h3>
                                <div className="timeline">
                                    <div className={`timeline-step ${activeDelivery.timing.acceptedAt ? 'completed' : ''}`}>
                                        <div className="step-dot"></div>
                                        <div className="step-content">
                                            <span className="step-title">Order Assigned</span>
                                            <span className="step-time">{formatTime(activeDelivery.timing.acceptedAt)}</span>
                                        </div>
                                    </div>
                                    <div className={`timeline-step ${activeDelivery.timing.actualPickup ? 'completed' : activeDelivery.status === 'assigned' ? 'active' : ''}`}>
                                        <div className="step-dot"></div>
                                        <div className="step-content">
                                            <span className="step-title">Picked Up</span>
                                            <span className="step-time">
                                                {activeDelivery.timing.actualPickup 
                                                    ? formatTime(activeDelivery.timing.actualPickup)
                                                    : formatTime(activeDelivery.timing.estimatedPickup)
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`timeline-step ${activeDelivery.timing.actualDelivery ? 'completed' : ['picked_up', 'en_route'].includes(activeDelivery.status) ? 'active' : ''}`}>
                                        <div className="step-dot"></div>
                                        <div className="step-content">
                                            <span className="step-title">Delivered</span>
                                            <span className="step-time">
                                                {activeDelivery.timing.actualDelivery 
                                                    ? formatTime(activeDelivery.timing.actualDelivery)
                                                    : formatTime(activeDelivery.timing.estimatedDelivery)
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="order-details">
                                <h3>Order Items</h3>
                                <div className="items-list">
                                    {activeDelivery.orderDetails.items.map((item, index) => (
                                        <div key={index} className="item-row">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span>{formatCurrency(item.price)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    <div className="total-row">
                                        <span>Total Order Value:</span>
                                        <span>{formatCurrency(activeDelivery.orderDetails.totalAmount)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Delivery Fee:</span>
                                        <span>{formatCurrency(activeDelivery.orderDetails.deliveryFee)}</span>
                                    </div>
                                    <div className="total-row earnings">
                                        <span>Your Earnings:</span>
                                        <span>{formatCurrency(activeDelivery.orderDetails.driverEarnings)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Action Button */}
                            <div className="main-action">
                                {activeDelivery.status === 'delivered' && completionStep === 'reviews' ? (
                                    <div className="completion-flow">
                                        <div className="completion-header">
                                            <h3>Leave Reviews</h3>
                                            <p>Rate your experience with the seller and customer</p>
                                        </div>
                                        <div className="review-actions">
                                            <button
                                                className="review-btn seller"
                                                onClick={() => { setReviewTarget('seller'); setShowReviewModal(true) }}
                                                disabled={reviews.seller?.submitted}
                                            >
                                                {reviews.seller?.submitted ? (
                                                    <>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Seller Reviewed
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="contact-avatar seller">{activeDelivery.seller.avatar}</div>
                                                        Rate Seller
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                className="review-btn customer"
                                                onClick={() => { setReviewTarget('customer'); setShowReviewModal(true) }}
                                                disabled={reviews.customer?.submitted}
                                            >
                                                {reviews.customer?.submitted ? (
                                                    <>
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Customer Reviewed
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="contact-avatar">{activeDelivery.customer.avatar}</div>
                                                        Rate Customer
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        {(reviews.seller?.submitted && reviews.customer?.submitted) && (
                                            <div className="completion-message">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>Delivery Completed Successfully!</span>
                                            </div>
                                        )}
                                        <button className="skip-btn" onClick={completeDelivery}>
                                            Skip Reviews & Complete
                                        </button>
                                    </div>
                                ) : activeDelivery.status !== 'delivered' ? (
                                    <button
                                        className="primary-action-btn"
                                        style={{ backgroundColor: nextAction.color }}
                                        onClick={() => updateDeliveryStatus(nextAction.nextStatus)}
                                    >
                                        {getActionIcon(nextAction.icon)}
                                        {nextAction.label}
                                    </button>
                                ) : (
                                    <div className="completion-message">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Delivery Completed!</span>
                                    </div>
                                )}
                            </div>

                            {/* Photo Requirements */}
                            {(activeDelivery.status === 'picked_up' || 
                              (activeDelivery.status === 'assigned' && pickupPhoto)) && (
                                <div className="photo-section">
                                    <h4>Pickup Photo Required</h4>
                                    <p>Take a photo showing the condition of the order</p>
                                    <div className="photo-upload">
                                        {pickupPhoto ? (
                                            <div className="photo-preview">
                                                <img src={pickupPhoto} alt="Pickup verification" />
                                                <button 
                                                    className="retake-btn"
                                                    onClick={() => setPickupPhoto(null)}
                                                >
                                                    Retake Photo
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="upload-btn">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Take Pickup Photo
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
                            )}

                            {(activeDelivery.status === 'en_route' || 
                              (activeDelivery.status === 'delivered' && deliveryPhoto)) && (
                                <div className="photo-section">
                                    <h4>Delivery Photo Required</h4>
                                    <p>Take a photo confirming successful delivery</p>
                                    <div className="photo-upload">
                                        {deliveryPhoto ? (
                                            <div className="photo-preview">
                                                <img src={deliveryPhoto} alt="Delivery confirmation" />
                                                <button 
                                                    className="retake-btn"
                                                    onClick={() => setDeliveryPhoto(null)}
                                                >
                                                    Retake Photo
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="upload-btn">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Take Delivery Photo
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
                            )}

                            {/* Navigation Button */}
                            <button className="nav-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Get Directions
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
                    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                Contact {contactType === 'customer' ? 'Customer' : 'Seller'}
                            </h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowContactModal(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-content">
                            {contactType === 'customer' ? (
                                <div className="contact-info">
                                    <div className="contact-avatar large">{activeDelivery.customer.avatar}</div>
                                    <h4>{activeDelivery.customer.name}</h4>
                                    <p className="contact-phone">{activeDelivery.customer.phone}</p>
                                    <p className="contact-instructions">{activeDelivery.customer.instructions}</p>
                                    <div className="contact-actions">
                                        <a href={`tel:${activeDelivery.customer.phone}`} className="contact-action call">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call Customer
                                        </a>
                                        <a href={`sms:${activeDelivery.customer.phone}`} className="contact-action message">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Send Message
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="contact-info">
                                    <div className="contact-avatar large seller">{activeDelivery.seller.avatar}</div>
                                    <h4>{activeDelivery.seller.name}</h4>
                                    <p className="contact-name">Contact: {activeDelivery.seller.contact}</p>
                                    <p className="contact-phone">{activeDelivery.seller.phone}</p>
                                    <div className="contact-actions">
                                        <a href={`tel:${activeDelivery.seller.phone}`} className="contact-action call">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call Store
                                        </a>
                                        <a href={`sms:${activeDelivery.seller.phone}`} className="contact-action message">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Send Message
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && reviewTarget && (
                <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
                    <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                Rate the {reviewTarget === 'customer' ? 'Customer' : 'Seller'}
                            </h3>
                            <button
                                className="close-btn"
                                onClick={() => setShowReviewModal(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-content">
                            <ReviewForm
                                target={reviewTarget}
                                targetInfo={reviewTarget === 'customer' ? activeDelivery.customer : activeDelivery.seller}
                                onSubmit={(rating, comment) => handleReviewSubmit(reviewTarget, rating, comment)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Review Form Component
const ReviewForm = ({ target, targetInfo, onSubmit }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [hoveredRating, setHoveredRating] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (rating > 0) {
            onSubmit(rating, comment)
        }
    }

    return (
        <div className="review-form">
            <div className="target-info">
                <div className={`contact-avatar large ${target === 'seller' ? 'seller' : ''}`}>
                    {targetInfo.avatar}
                </div>
                <h4>{targetInfo.name}</h4>
                <p>{target === 'seller' ? 'Store Experience' : 'Customer Experience'}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="rating-section">
                    <label>Rating *</label>
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

                <div className="comment-section">
                    <label>Comment (Optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={`Share your experience with the ${target}...`}
                        rows={4}
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => setShowReviewModal(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn" 
                        disabled={rating === 0}
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ActiveDeliveries