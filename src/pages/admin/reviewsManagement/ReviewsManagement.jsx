import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ReviewsManagement.scss'

const ReviewsManagement = () => {
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [reviewsPerPage, setReviewsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Mock data - replace with actual API call
    const mockReviews = [
        {
            id: 'REV12345',
            type: 'product',
            rating: 5,
            comment: 'Excellent product! Exceeded my expectations. Fast delivery and great quality.',
            reviewDate: '2024-06-25',
            status: 'pending',
            reviewer: {
                id: 'USR001',
                name: 'Alice Johnson',
                email: 'alice.johnson@email.com',
                avatar: null
            },
            target: {
                id: 'PRD001',
                name: 'Gaming Laptop Pro',
                type: 'product',
                seller: {
                    id: 'SEL001',
                    name: 'Tech Paradise'
                }
            },
            order: {
                id: 'ORD12345',
                orderNumber: '#12345'
            }
        },
        {
            id: 'REV12344',
            type: 'seller',
            rating: 4,
            comment: 'Good seller, quick response to questions. Packaging could be better.',
            reviewDate: '2024-06-24',
            status: 'approved',
            reviewer: {
                id: 'USR002',
                name: 'Bob Smith',
                email: 'bob.smith@email.com',
                avatar: null
            },
            target: {
                id: 'SEL002',
                name: 'Fashion Hub',
                type: 'seller'
            },
            order: {
                id: 'ORD12344',
                orderNumber: '#12344'
            }
        },
        {
            id: 'REV12343',
            type: 'driver',
            rating: 5,
            comment: 'Amazing driver! Very professional and delivered on time despite heavy traffic.',
            reviewDate: '2024-06-24',
            status: 'approved',
            reviewer: {
                id: 'USR003',
                name: 'Carol Davis',
                email: 'carol.davis@email.com',
                avatar: null
            },
            target: {
                id: 'DRV001',
                name: 'Michael Johnson',
                type: 'driver'
            },
            order: {
                id: 'ORD12343',
                orderNumber: '#12343'
            }
        },
        {
            id: 'REV12342',
            type: 'product',
            rating: 2,
            comment: 'Product quality was disappointing. Not as described in the listing.',
            reviewDate: '2024-06-23',
            status: 'pending',
            reviewer: {
                id: 'USR004',
                name: 'David Wilson',
                email: 'david.wilson@email.com',
                avatar: null
            },
            target: {
                id: 'PRD002',
                name: 'Wireless Headphones',
                type: 'product',
                seller: {
                    id: 'SEL003',
                    name: 'Audio World'
                }
            },
            order: {
                id: 'ORD12342',
                orderNumber: '#12342'
            }
        },
        {
            id: 'REV12341',
            type: 'seller',
            rating: 1,
            comment: 'Terrible experience. Seller was unresponsive and product arrived damaged.',
            reviewDate: '2024-06-23',
            status: 'rejected',
            reviewer: {
                id: 'USR005',
                name: 'Emily Brown',
                email: 'emily.brown@email.com',
                avatar: null
            },
            target: {
                id: 'SEL004',
                name: 'Cheap Electronics',
                type: 'seller'
            },
            order: {
                id: 'ORD12341',
                orderNumber: '#12341'
            },
            rejectionReason: 'Contains inappropriate language and false claims'
        },
        {
            id: 'REV12340',
            type: 'driver',
            rating: 3,
            comment: 'Driver was late but apologetic. Delivery was safe.',
            reviewDate: '2024-06-22',
            status: 'approved',
            reviewer: {
                id: 'USR006',
                name: 'Frank Miller',
                email: 'frank.miller@email.com',
                avatar: null
            },
            target: {
                id: 'DRV002',
                name: 'Sarah Wilson',
                type: 'driver'
            },
            order: {
                id: 'ORD12340',
                orderNumber: '#12340'
            }
        },
        {
            id: 'REV12339',
            type: 'product',
            rating: 4,
            comment: 'Good product overall. Works as expected but shipping was slower than promised.',
            reviewDate: '2024-06-22',
            status: 'approved',
            reviewer: {
                id: 'USR007',
                name: 'Grace Taylor',
                email: 'grace.taylor@email.com',
                avatar: null
            },
            target: {
                id: 'PRD003',
                name: 'Smartphone Case',
                type: 'product',
                seller: {
                    id: 'SEL005',
                    name: 'Mobile Accessories'
                }
            },
            order: {
                id: 'ORD12339',
                orderNumber: '#12339'
            }
        },
        {
            id: 'REV12338',
            type: 'seller',
            rating: 5,
            comment: 'Outstanding seller! Fast shipping, great communication, and excellent packaging.',
            reviewDate: '2024-06-21',
            status: 'pending',
            reviewer: {
                id: 'USR008',
                name: 'Henry Davis',
                email: 'henry.davis@email.com',
                avatar: null
            },
            target: {
                id: 'SEL001',
                name: 'Tech Paradise',
                type: 'seller'
            },
            order: {
                id: 'ORD12338',
                orderNumber: '#12338'
            }
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setReviews(mockReviews)
            setFilteredReviews(mockReviews)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = reviews

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(review =>
                review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.reviewer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                review.order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(review => review.status === statusFilter)
        }

        // Type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter(review => review.type === typeFilter)
        }

        setFilteredReviews(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, typeFilter, reviews])

    // Pagination
    const indexOfLastReview = currentPage * reviewsPerPage
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview)
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)

    const handleViewReview = (reviewId) => {
        navigate(`/admin/reviews/details/${reviewId}`)
    }

    const handleApproveReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to approve this review?')) {
            // API call to approve review
            setReviews(reviews.map(review =>
                review.id === reviewId
                    ? { ...review, status: 'approved' }
                    : review
            ))
        }
    }

    const handleRejectReview = async (reviewId) => {
        const reason = window.prompt('Please provide a reason for rejecting this review:')
        if (reason) {
            // API call to reject review with reason
            setReviews(reviews.map(review =>
                review.id === reviewId
                    ? { ...review, status: 'rejected', rejectionReason: reason }
                    : review
            ))
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
            product: { class: 'product', label: 'Product', icon: '📦' },
            seller: { class: 'seller', label: 'Seller', icon: '🏪' },
            driver: { class: 'driver', label: 'Driver', icon: '🚛' }
        }
        const config = typeConfig[type] || typeConfig.product
        return (
            <span className={`type-badge type-badge--${config.class}`}>
                <span className="type-icon">{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getRatingStars = (rating) => {
        return (
            <div className="rating-stars">
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getAverageRating = () => {
        const approvedReviews = reviews.filter(r => r.status === 'approved')
        if (approvedReviews.length === 0) return 0
        const sum = approvedReviews.reduce((acc, review) => acc + review.rating, 0)
        return (sum / approvedReviews.length).toFixed(1)
    }

    if (loading) {
        return (
            <div className="reviews-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading reviews...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="reviews-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Reviews Management</h1>
                    <p>Monitor and manage customer reviews for products, sellers, and drivers</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{reviews.filter(r => r.status === 'pending').length}</span>
                        <span className="stat-label">Pending Reviews</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{reviews.filter(r => r.status === 'approved').length}</span>
                        <span className="stat-label">Approved</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{reviews.filter(r => r.status === 'rejected').length}</span>
                        <span className="stat-label">Rejected</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{getAverageRating()}</span>
                        <span className="stat-label">Avg Rating</span>
                    </div>
                </div>
            </div>

            <div className="reviews-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search reviews, reviewers, products..."
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
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="type-filter"
                        >
                            <option value="all">All Types</option>
                            <option value="product">Product Reviews</option>
                            <option value="seller">Seller Reviews</option>
                            <option value="driver">Driver Reviews</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, filteredReviews.length)} of {filteredReviews.length} reviews
                        </span>
                        <select
                            value={reviewsPerPage}
                            onChange={(e) => setReviewsPerPage(Number(e.target.value))}
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
                    <table className="reviews-table">
                        <thead>
                            <tr>
                                <th>Review ID</th>
                                <th>Type</th>
                                <th>Rating</th>
                                <th>Reviewer</th>
                                <th>Target</th>
                                <th>Comment</th>
                                <th>Order</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReviews.map((review) => (
                                <tr key={review.id}>
                                    <td className="review-id">
                                        <div className="review-info">
                                            <span className="review-number">{review.id}</span>
                                        </div>
                                    </td>
                                    <td className="review-type">
                                        {getTypeBadge(review.type)}
                                    </td>
                                    <td className="rating">
                                        {getRatingStars(review.rating)}
                                    </td>
                                    <td className="reviewer">
                                        <div className="reviewer-info">
                                            <span className="reviewer-name">{review.reviewer.name}</span>
                                            <span className="reviewer-email">{review.reviewer.email}</span>
                                        </div>
                                    </td>
                                    <td className="target">
                                        <div className="target-info">
                                            <span className="target-name">{review.target.name}</span>
                                            {review.target.seller && (
                                                <span className="target-seller">by {review.target.seller.name}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="comment">
                                        <div className="comment-preview">
                                            {review.comment.length > 80 
                                                ? `${review.comment.substring(0, 80)}...` 
                                                : review.comment
                                            }
                                        </div>
                                    </td>
                                    <td className="order">
                                        <span className="order-number">{review.order.orderNumber}</span>
                                    </td>
                                    <td className="review-date">{formatDate(review.reviewDate)}</td>
                                    <td className="status">{getStatusBadge(review.status)}</td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewReview(review.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {review.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="action-btn action-btn--approve"
                                                        onClick={() => handleApproveReview(review.id)}
                                                        title="Approve Review"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="action-btn action-btn--reject"
                                                        onClick={() => handleRejectReview(review.id)}
                                                        title="Reject Review"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
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

export default ReviewsManagement