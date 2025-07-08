import { useState, useEffect } from 'react'
import './DeliveryReviews.scss'

const DeliveryReviews = () => {
    const [loading, setLoading] = useState(true)
    const [reviewsData, setReviewsData] = useState({})
    const [reviews, setReviews] = useState([])
    const [filterType, setFilterType] = useState('all') // all, customer, seller
    const [filterRating, setFilterRating] = useState('all') // all, 5, 4, 3, 2, 1
    const [timeFilter, setTimeFilter] = useState('all') // all, week, month
    const [filteredReviews, setFilteredReviews] = useState([])

    useEffect(() => {
        const fetchReviewsData = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockData = {
                    summary: {
                        overallRating: 4.8,
                        totalReviews: 147,
                        thisWeekReviews: 12,
                        thisMonthReviews: 43,
                        ratingDistribution: {
                            5: 112, // 76.2%
                            4: 23,  // 15.6%
                            3: 8,   // 5.4%
                            2: 3,   // 2.0%
                            1: 1    // 0.7%
                        },
                        averageByType: {
                            customer: 4.9,
                            seller: 4.7
                        },
                        recentTrend: 'up' // up, down, stable
                    }
                }

                const mockReviews = [
                    {
                        id: 'REV001',
                        type: 'customer',
                        rating: 5,
                        reviewer: {
                            name: 'Sarah Johnson',
                            avatar: 'SJ'
                        },
                        comment: 'Excellent service! John was very professional and delivered my food quickly and still hot. Great communication throughout the delivery process. Highly recommend!',
                        date: '2024-01-25T14:30:00Z',
                        orderId: 'DEL098',
                        orderValue: 24.50,
                        helpful: true,
                        tags: ['Professional', 'Fast Delivery', 'Great Communication']
                    },
                    {
                        id: 'REV002',
                        type: 'seller',
                        rating: 5,
                        reviewer: {
                            name: 'TechMart Store',
                            avatar: 'TM'
                        },
                        comment: 'Driver was punctual and handled our products with care. Easy to work with and professional attitude.',
                        date: '2024-01-25T14:15:00Z',
                        orderId: 'DEL098',
                        orderValue: 24.50,
                        helpful: false,
                        tags: ['Punctual', 'Careful Handling']
                    },
                    {
                        id: 'REV003',
                        type: 'customer',
                        rating: 5,
                        reviewer: {
                            name: 'Michael Thompson',
                            avatar: 'MT'
                        },
                        comment: 'Fast delivery and great communication. The driver even waited while I got my money. Very patient and kind person.',
                        date: '2024-01-24T19:20:00Z',
                        orderId: 'DEL095',
                        orderValue: 42.15,
                        helpful: true,
                        tags: ['Patient', 'Kind', 'Good Communication']
                    },
                    {
                        id: 'REV004',
                        type: 'customer',
                        rating: 4,
                        reviewer: {
                            name: 'David Brown',
                            avatar: 'DB'
                        },
                        comment: 'Good service overall. Delivery was on time and the driver was polite. Food arrived in good condition.',
                        date: '2024-01-24T17:45:00Z',
                        orderId: 'DEL094',
                        orderValue: 31.75,
                        helpful: false,
                        tags: ['On Time', 'Polite']
                    },
                    {
                        id: 'REV005',
                        type: 'seller',
                        rating: 4,
                        reviewer: {
                            name: 'QuickMart',
                            avatar: 'QM'
                        },
                        comment: 'Reliable driver, always shows up on time. Could improve on communication during busy periods.',
                        date: '2024-01-24T16:30:00Z',
                        orderId: 'DEL093',
                        orderValue: 28.60,
                        helpful: false,
                        tags: ['Reliable', 'On Time']
                    },
                    {
                        id: 'REV006',
                        type: 'customer',
                        rating: 5,
                        reviewer: {
                            name: 'Emma Wilson',
                            avatar: 'EW'
                        },
                        comment: 'Amazing driver! Very careful with the food and super friendly. Will definitely request John again if possible! Thank you for the excellent service.',
                        date: '2024-01-23T20:15:00Z',
                        orderId: 'DEL089',
                        orderValue: 18.90,
                        helpful: true,
                        tags: ['Friendly', 'Careful', 'Excellent Service']
                    },
                    {
                        id: 'REV007',
                        type: 'customer',
                        rating: 3,
                        reviewer: {
                            name: 'James Wilson',
                            avatar: 'JW'
                        },
                        comment: 'Delivery was fine but took a bit longer than expected. Driver was nice though and apologized for the delay.',
                        date: '2024-01-23T18:45:00Z',
                        orderId: 'DEL087',
                        orderValue: 35.20,
                        helpful: false,
                        tags: ['Nice', 'Delayed']
                    },
                    {
                        id: 'REV008',
                        type: 'seller',
                        rating: 5,
                        reviewer: {
                            name: 'ElectroWorld',
                            avatar: 'EW'
                        },
                        comment: 'Excellent driver! Always professional and handles our electronic items with great care. Highly recommended.',
                        date: '2024-01-22T15:30:00Z',
                        orderId: 'DEL085',
                        orderValue: 159.99,
                        helpful: true,
                        tags: ['Professional', 'Careful Handling', 'Reliable']
                    },
                    {
                        id: 'REV009',
                        type: 'customer',
                        rating: 5,
                        reviewer: {
                            name: 'Lisa Garcia',
                            avatar: 'LG'
                        },
                        comment: 'Perfect delivery! Driver was courteous, delivery was fast, and everything arrived exactly as expected.',
                        date: '2024-01-22T12:20:00Z',
                        orderId: 'DEL083',
                        orderValue: 27.45,
                        helpful: true,
                        tags: ['Courteous', 'Fast', 'Perfect']
                    },
                    {
                        id: 'REV010',
                        type: 'customer',
                        rating: 2,
                        reviewer: {
                            name: 'Robert Kim',
                            avatar: 'RK'
                        },
                        comment: 'Driver was late and didn\'t communicate well. Food was cold when it arrived. Not satisfied with this delivery.',
                        date: '2024-01-21T19:10:00Z',
                        orderId: 'DEL081',
                        orderValue: 22.30,
                        helpful: false,
                        tags: ['Late', 'Poor Communication']
                    }
                ]

                setReviewsData(mockData)
                setReviews(mockReviews)
                setFilteredReviews(mockReviews)
                setLoading(false)
            }, 1000)
        }

        fetchReviewsData()
    }, [])

    useEffect(() => {
        let filtered = [...reviews]

        // Filter by type
        if (filterType !== 'all') {
            filtered = filtered.filter(review => review.type === filterType)
        }

        // Filter by rating
        if (filterRating !== 'all') {
            filtered = filtered.filter(review => review.rating === parseInt(filterRating))
        }

        // Filter by time
        if (timeFilter !== 'all') {
            const now = new Date()
            const filterDate = new Date()

            if (timeFilter === 'week') {
                filterDate.setDate(now.getDate() - 7)
            } else if (timeFilter === 'month') {
                filterDate.setMonth(now.getMonth() - 1)
            }

            filtered = filtered.filter(review => new Date(review.date) >= filterDate)
        }

        setFilteredReviews(filtered)
    }, [reviews, filterType, filterRating, timeFilter])

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`star ${index < rating ? 'filled' : 'empty'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ))
    }

    const getRatingPercentage = (rating) => {
        return ((reviewsData.summary?.ratingDistribution[rating] || 0) / reviewsData.summary?.totalReviews * 100).toFixed(1)
    }

    const getRatingColor = (rating) => {
        if (rating >= 5) return '#10b981'
        if (rating >= 4) return '#3b82f6'
        if (rating >= 3) return '#f59e0b'
        if (rating >= 2) return '#f97316'
        return '#ef4444'
    }

    if (loading) {
        return (
            <div className="delivery-reviews">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading reviews...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="delivery-reviews">
            {/* Header */}
            <div className="reviews-header">
                <div className="header-content">
                    <div className="page-title">
                        <h1>Reviews & Ratings</h1>
                        <p>See what customers and sellers say about your service</p>
                    </div>
                    <div className="overall-rating">
                        <div className="rating-display">
                            <span className="rating-number">{reviewsData.summary?.overallRating}</span>
                            <div className="rating-stars">
                                {renderStars(Math.round(reviewsData.summary?.overallRating || 0))}
                            </div>
                        </div>
                        <div className="rating-info">
                            <span className="total-reviews">{reviewsData.summary?.totalReviews} total reviews</span>
                            {/* <div className={`trend ${reviewsData.summary?.recentTrend}`}>
                                {reviewsData.summary?.recentTrend === 'up' ? (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                ) : (
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                    </svg>
                                )}
                                <span>Trending {reviewsData.summary?.recentTrend}</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card rating-breakdown">
                    <div className="card-header">
                        <h3>Rating Breakdown</h3>
                        <div className="rating-summary">
                            <span className="avg-rating">{reviewsData.summary?.overallRating}/5</span>
                        </div>
                    </div>
                    <div className="rating-bars">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="rating-bar">
                                <span className="rating-label">{rating}</span>
                                <div className="stars-mini">
                                    {renderStars(rating).slice(0, 1)}
                                </div>
                                <div className="bar-container">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${getRatingPercentage(rating)}%`,
                                            backgroundColor: getRatingColor(rating)
                                        }}
                                    ></div>
                                </div>
                                <span className="rating-count">
                                    {reviewsData.summary?.ratingDistribution[rating] || 0}
                                </span>
                                <span className="rating-percentage">
                                    ({getRatingPercentage(rating)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stat-card performance-stats">
                    <div className="card-header">
                        <h3>Performance Stats</h3>
                    </div>
                    <div className="performance-grid">
                        <div className="performance-item">
                            <div className="performance-value">{reviewsData.summary?.thisWeekReviews}</div>
                            <div className="performance-label">This Week</div>
                        </div>
                        <div className="performance-item">
                            <div className="performance-value">{reviewsData.summary?.thisMonthReviews}</div>
                            <div className="performance-label">This Month</div>
                        </div>
                        <div className="performance-item">
                            <div className="performance-value">{reviewsData.summary?.averageByType.customer}</div>
                            <div className="performance-label">Customer Avg</div>
                        </div>
                        <div className="performance-item">
                            <div className="performance-value">{reviewsData.summary?.averageByType.seller}</div>
                            <div className="performance-label">Seller Avg</div>
                        </div>
                    </div>
                </div>

                <div className="stat-card quick-filters">
                    <div className="card-header">
                        <h3>Filters</h3>
                    </div>
                    <div className="filter-controls">
                        <div className="filter-group">
                            <label>Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">All Reviews</option>
                                <option value="customer">Customer Reviews</option>
                                <option value="seller">Seller Reviews</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Rating</label>
                            <select
                                value={filterRating}
                                onChange={(e) => setFilterRating(e.target.value)}
                            >
                                <option value="all">All Ratings</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Time</label>
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <option value="all">All Time</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="reviews-section">
                <div className="section-header">
                    <h3>Recent Reviews ({filteredReviews.length})</h3>
                    <div className="view-options">
                        <span>Showing {filteredReviews.length} of {reviews.length} reviews</span>
                    </div>
                </div>

                <div className="reviews-list">
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <div className={`reviewer-avatar ${review.type}`}>
                                            {review.reviewer.avatar}
                                        </div>
                                        <div className="reviewer-details">
                                            <div className="reviewer-name">{review.reviewer.name}</div>
                                            <div className="review-type">
                                                {review.type === 'customer' ? 'Customer Review' : 'Seller Review'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-meta">
                                        <div className="review-rating">
                                            <div className="stars">
                                                {renderStars(review.rating)}
                                            </div>
                                            <span className="rating-number">{review.rating}.0</span>
                                        </div>
                                        <div className="review-date">
                                            <span className="date">{formatDate(review.date)}</span>
                                            <span className="time">{formatTime(review.date)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="review-content">
                                    <p className="review-comment">{review.comment}</p>

                                    {review.tags && review.tags.length > 0 && (
                                        <div className="review-tags">
                                            {review.tags.map((tag, index) => (
                                                <span key={index} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="review-footer">
                                        <div className="order-info">
                                            <span className="order-id">Order #{review.orderId}</span>
                                            <span className="order-value">${review.orderValue}</span>
                                        </div>
                                        {review.helpful && (
                                            <div className="helpful-badge">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                                Helpful Review
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-reviews">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <h3>No Reviews Found</h3>
                            <p>No reviews match your current filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeliveryReviews