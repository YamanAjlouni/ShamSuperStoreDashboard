import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ReviewDetails.scss'

const ReviewDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState(null)
    const [loading, setLoading] = useState(true)

    // Mock review data with complete details
    const mockReviewData = {
        id: id,
        type: 'product',
        rating: 5,
        comment: 'Excellent product! Exceeded my expectations. The build quality is fantastic and it arrived much faster than expected. The packaging was also very professional and secure. I would definitely recommend this product to anyone looking for quality and reliability. The seller was also very responsive to my questions before purchase.',
        reviewDate: '2024-06-25T14:30:00',
        status: 'pending',

        // Reviewer Information
        reviewer: {
            id: 'USR001',
            name: 'Alice Johnson',
            email: 'alice.johnson@email.com',
            phone: '+1 (555) 123-0001',
            joinDate: '2023-03-15',
            totalReviews: 12,
            averageRating: 4.3,
            isVerified: true
        },

        // Target Information (what's being reviewed)
        target: {
            id: 'PRD001',
            name: 'Gaming Laptop Pro',
            type: 'product',
            sku: 'TP-LAP-001',
            category: 'Electronics > Computers > Laptops',
            price: 1199.99,
            seller: {
                id: 'SEL001',
                name: 'Tech Paradise',
                email: 'contact@techparadise.com',
                phone: '+1 (555) 123-4567',
                address: '456 Business Ave, New York, NY 10002',
                rating: 4.8,
                totalReviews: 245
            }
        },

        // Associated Order
        order: {
            id: 'ORD12345',
            orderNumber: '#12345',
            orderDate: '2024-06-20T09:15:00',
            deliveryDate: '2024-06-25T15:45:00',
            orderValue: 1359.97,
            status: 'delivered'
        },

        // Review Images (if any)
        images: [
            {
                id: 'IMG001',
                url: '/placeholder-review-image-1.jpg',
                caption: 'Product in packaging'
            },
            {
                id: 'IMG002',
                url: '/placeholder-review-image-2.jpg',
                caption: 'Product setup and running'
            }
        ],

        // Admin Actions History
        adminActions: [
            {
                action: 'submitted',
                timestamp: '2024-06-25T14:30:00',
                description: 'Review submitted by customer',
                admin: null
            }
        ],

        // Seller Response (if any)
        sellerResponse: null,

        // Additional metadata
        metadata: {
            isVerifiedPurchase: true,
            helpfulVotes: 0,
            unhelpfulVotes: 0,
            reportCount: 0,
            lastModified: '2024-06-25T14:30:00'
        }
    }

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setReview(mockReviewData)
            setLoading(false)
        }, 1000)
    }, [id])

    const handleApproveReview = () => {
        if (window.confirm('Are you sure you want to approve this review?')) {
            const newAction = {
                action: 'approved',
                timestamp: new Date().toISOString(),
                description: 'Review approved by admin',
                admin: 'Current Admin' // Would be actual admin name
            }
            setReview({
                ...review,
                status: 'approved',
                adminActions: [...review.adminActions, newAction]
            })
        }
    }

    const handleRejectReview = () => {
        const reason = window.prompt('Please provide a reason for rejecting this review:')
        if (reason) {
            const newAction = {
                action: 'rejected',
                timestamp: new Date().toISOString(),
                description: `Review rejected by admin. Reason: ${reason}`,
                admin: 'Current Admin' // Would be actual admin name
            }
            setReview({
                ...review,
                status: 'rejected',
                rejectionReason: reason,
                adminActions: [...review.adminActions, newAction]
            })
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'warning', label: 'Pending', icon: '⏳' },
            approved: { class: 'success', label: 'Approved', icon: '✅' },
            rejected: { class: 'danger', label: 'Rejected', icon: '❌' }
        }
        const config = statusConfig[status] || statusConfig.pending
        return (
            <span className={`status-badge status-badge--${config.class}`}>
                <span className="status-icon">{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getTypeBadge = (type) => {
        const typeConfig = {
            product: { class: 'product', label: 'Product Review', icon: '📦' },
            seller: { class: 'seller', label: 'Seller Review', icon: '🏪' },
            driver: { class: 'driver', label: 'Driver Review', icon: '🚛' }
        }
        const config = typeConfig[type] || typeConfig.product
        return (
            <span className={`type-badge type-badge--${config.class}`}>
                <span className="type-icon">{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getRatingStars = (rating, size = 'md') => {
        return (
            <div className={`rating-stars rating-stars--${size}`}>
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        className={`star ${index < rating ? 'star--filled' : 'star--empty'}`}
                    >
                        ★
                    </span>
                ))}
                <span className="rating-number">({rating})</span>
            </div>
        )
    }

    const formatDateTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="review-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading review details...</p>
                </div>
            </div>
        )
    }

    if (!review) {
        return (
            <div className="review-details">
                <div className="error-state">
                    <h2>Review Not Found</h2>
                    <p>The review you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/admin/reviews')}>Back to Reviews</button>
                </div>
            </div>
        )
    }

    return (
        <div className="review-details">
            {/* Header */}
            <div className="review-header">
                <button className="back-btn" onClick={() => navigate('/admin/reviews')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Reviews
                </button>
                <div className="header-content">
                    <div className="review-info">
                        <h1>Review #{review.id}</h1>
                        <p>Submitted on {formatDateTime(review.reviewDate)}</p>
                        <div className="review-meta">
                            {getTypeBadge(review.type)}
                            {getStatusBadge(review.status)}
                            {review.metadata.isVerifiedPurchase && (
                                <span className="verified-badge">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Verified Purchase
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="header-actions">
                        {review.status === 'pending' && (
                            <>
                                <button className="action-btn action-btn--approve" onClick={handleApproveReview}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Approve Review
                                </button>
                                <button className="action-btn action-btn--reject" onClick={handleRejectReview}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject Review
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Rating & Comment */}
            <div className="review-content-section">
                <div className="review-main-content">
                    <div className="rating-section">
                        <h3>Customer Rating</h3>
                        {getRatingStars(review.rating, 'lg')}
                    </div>
                    <div className="comment-section">
                        <h3>Review Comment</h3>
                        <div className="comment-text">
                            {review.comment}
                        </div>
                    </div>
                    {review.images && review.images.length > 0 && (
                        <div className="images-section">
                            <h3>Review Images</h3>
                            <div className="review-images">
                                {review.images.map(image => (
                                    <div key={image.id} className="review-image">
                                        <div className="image-placeholder">
                                            <span>📷</span>
                                            <p>Image: {image.caption}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviewer & Target Information */}
            <div className="info-sections">
                <div className="info-section">
                    <h2>Reviewer Information</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Customer Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Name:</span>
                                    <span className="value">
                                        {review.reviewer.name}
                                        {review.reviewer.isVerified && (
                                            <span className="verified-icon" title="Verified Customer">✓</span>
                                        )}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Email:</span>
                                    <span className="value">{review.reviewer.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Customer ID:</span>
                                    <span className="value">{review.reviewer.id}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Member Since:</span>
                                    <span className="value">{formatDate(review.reviewer.joinDate)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Total Reviews:</span>
                                    <span className="value">{review.reviewer.totalReviews}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Avg Rating Given:</span>
                                    <span className="value">{review.reviewer.averageRating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <h2>Review Target</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>{review.type === 'product' ? 'Product' : review.type === 'seller' ? 'Seller' : 'Driver'} Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Name:</span>
                                    <span className="value">{review.target.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">ID:</span>
                                    <span className="value">{review.target.id}</span>
                                </div>
                                {review.target.sku && (
                                    <div className="info-item">
                                        <span className="label">SKU:</span>
                                        <span className="value">{review.target.sku}</span>
                                    </div>
                                )}
                                {review.target.category && (
                                    <div className="info-item">
                                        <span className="label">Category:</span>
                                        <span className="value">{review.target.category}</span>
                                    </div>
                                )}
                                {review.target.price && (
                                    <div className="info-item">
                                        <span className="label">Price:</span>
                                        <span className="value">${review.target.price.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {review.target.seller && (
                            <div className="info-card">
                                <h3>Seller Information</h3>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="label">Name:</span>
                                        <span className="value">{review.target.seller.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Email:</span>
                                        <span className="value">{review.target.seller.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Rating:</span>
                                        <span className="value">{review.target.seller.rating} ⭐</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Total Reviews:</span>
                                        <span className="value">{review.target.seller.totalReviews}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="info-section">
                    <h2>Associated Order</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Order Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Order Number:</span>
                                    <span className="value">{review.order.orderNumber}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Order Date:</span>
                                    <span className="value">{formatDateTime(review.order.orderDate)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Delivery Date:</span>
                                    <span className="value">{formatDateTime(review.order.deliveryDate)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Order Value:</span>
                                    <span className="value">${review.order.orderValue.toFixed(2)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Status:</span>
                                    <span className="value">{review.order.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Actions Timeline */}
                <div className="info-section">
                    <h2>Review Timeline</h2>
                    <div className="timeline">
                        {review.adminActions.map((action, index) => (
                            <div key={index} className={`timeline-item ${action.action}`}>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>{action.description}</h4>
                                    {action.admin && <p>by {action.admin}</p>}
                                    <span className="timestamp">{formatDateTime(action.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Metadata */}
                <div className="info-section">
                    <h2>Review Metadata</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Additional Information</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Verified Purchase:</span>
                                    <span className="value">{review.metadata.isVerifiedPurchase ? 'Yes' : 'No'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Helpful Votes:</span>
                                    <span className="value">{review.metadata.helpfulVotes}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Report Count:</span>
                                    <span className="value">{review.metadata.reportCount}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Last Modified:</span>
                                    <span className="value">{formatDateTime(review.metadata.lastModified)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewDetails