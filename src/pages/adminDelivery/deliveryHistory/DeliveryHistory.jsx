import { useState, useEffect } from 'react'
import './DeliveryHistory.scss'

const DeliveryHistory = () => {
    const [loading, setLoading] = useState(true)
    const [deliveries, setDeliveries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [dateRange, setDateRange] = useState('30days')
    const [sortBy, setSortBy] = useState('date')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [selectedDelivery, setSelectedDelivery] = useState(null)

    useEffect(() => {
        const fetchDeliveryHistory = async () => {
            setLoading(true)
            setTimeout(() => {
                const mockDeliveries = [
                    {
                        id: 'DEL045',
                        orderId: 'ORD-2024-045',
                        status: 'delivered',
                        customer: {
                            name: 'Alice Thompson',
                            phone: '+1 (555) 123-4567',
                            rating: 4.9,
                            feedback: 'Fast delivery, items in perfect condition!'
                        },
                        warehouse: {
                            name: 'Electronics Hub',
                            address: '123 Tech Boulevard, Industrial Zone'
                        },
                        delivery: {
                            address: '789 Elm Street, Apartment 3A, Downtown',
                            distance: '3.2 miles'
                        },
                        order: {
                            total: 299.99,
                            items: [
                                { name: 'Wireless Gaming Headset', quantity: 1, sku: 'WGH-001' },
                                { name: 'Gaming Mouse Pad XL', quantity: 1, sku: 'GMP-XL-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-24T09:00:00Z',
                            pickup: '2024-01-24T09:30:00Z',
                            delivered: '2024-01-24T10:15:00Z'
                        },
                        earnings: 15.50,
                        customerRating: 5
                    },
                    {
                        id: 'DEL044',
                        orderId: 'ORD-2024-044',
                        status: 'delivered',
                        customer: {
                            name: 'Robert Chen',
                            phone: '+1 (555) 234-5678',
                            rating: 4.3,
                            feedback: 'Good service, delivered on time.'
                        },
                        warehouse: {
                            name: 'Fashion Central Warehouse',
                            address: '456 Style Avenue, Distribution Center'
                        },
                        delivery: {
                            address: '321 Oak Road, Suite 101, Westside',
                            distance: '2.8 miles'
                        },
                        order: {
                            total: 156.75,
                            items: [
                                { name: 'Men\'s Casual Shirt - Blue L', quantity: 2, sku: 'MCS-BL-L' },
                                { name: 'Leather Belt - Brown', quantity: 1, sku: 'LB-BR-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-24T11:15:00Z',
                            pickup: '2024-01-24T11:45:00Z',
                            delivered: '2024-01-24T12:30:00Z'
                        },
                        earnings: 12.25,
                        customerRating: 4
                    },
                    {
                        id: 'DEL043',
                        orderId: 'ORD-2024-043',
                        status: 'delivered',
                        customer: {
                            name: 'Maria Rodriguez',
                            phone: '+1 (555) 345-6789',
                            rating: 4.7,
                            feedback: 'Package arrived safely, thank you!'
                        },
                        warehouse: {
                            name: 'Home & Garden Depot',
                            address: '789 Garden Way, Supply District'
                        },
                        delivery: {
                            address: '654 Pine Avenue, House 12, Northside',
                            distance: '4.1 miles'
                        },
                        order: {
                            total: 89.50,
                            items: [
                                { name: 'Plant Pot Set (3pc)', quantity: 1, sku: 'PPS-3PC-001' },
                                { name: 'Garden Tools Kit', quantity: 1, sku: 'GTK-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-23T14:00:00Z',
                            pickup: '2024-01-23T14:25:00Z',
                            delivered: '2024-01-23T15:10:00Z'
                        },
                        earnings: 11.75,
                        customerRating: 5
                    },
                    {
                        id: 'DEL042',
                        orderId: 'ORD-2024-042',
                        status: 'delivered',
                        customer: {
                            name: 'James Wilson',
                            phone: '+1 (555) 456-7890',
                            rating: 4.1,
                            feedback: 'Delivery was a bit late but items were fine.'
                        },
                        warehouse: {
                            name: 'Sports Equipment Center',
                            address: '234 Athletic Drive, Sports Complex'
                        },
                        delivery: {
                            address: '987 Maple Street, Unit 5B, Eastside',
                            distance: '1.9 miles'
                        },
                        order: {
                            total: 234.99,
                            items: [
                                { name: 'Running Shoes - Size 10', quantity: 1, sku: 'RS-10-001' },
                                { name: 'Athletic Shorts - Medium', quantity: 2, sku: 'AS-M-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-23T16:30:00Z',
                            pickup: '2024-01-23T17:00:00Z',
                            delivered: '2024-01-23T18:15:00Z'
                        },
                        earnings: 14.50,
                        customerRating: 3
                    },
                    {
                        id: 'DEL041',
                        orderId: 'ORD-2024-041',
                        status: 'cancelled',
                        customer: {
                            name: 'Lisa Garcia',
                            phone: '+1 (555) 567-8901',
                            rating: 4.5,
                            feedback: 'Customer cancelled after pickup - not driver fault'
                        },
                        warehouse: {
                            name: 'Book & Media Warehouse',
                            address: '567 Knowledge Lane, Education District'
                        },
                        delivery: {
                            address: '135 Cedar Boulevard, Floor 3, Central',
                            distance: '2.7 miles'
                        },
                        order: {
                            total: 45.99,
                            items: [
                                { name: 'Programming Books Set', quantity: 1, sku: 'PBS-001' },
                                { name: 'Notebook Pack', quantity: 2, sku: 'NP-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-22T10:00:00Z',
                            pickup: '2024-01-22T10:30:00Z',
                            delivered: null
                        },
                        earnings: 8.00,
                        customerRating: null
                    },
                    {
                        id: 'DEL040',
                        orderId: 'ORD-2024-040',
                        status: 'delivered',
                        customer: {
                            name: 'David Brown',
                            phone: '+1 (555) 678-9012',
                            rating: 4.6,
                            feedback: 'Professional driver, careful with packages.'
                        },
                        warehouse: {
                            name: 'Tech Accessories Hub',
                            address: '890 Circuit Road, Tech Park'
                        },
                        delivery: {
                            address: '246 Birch Lane, Apartment 7C, Southside',
                            distance: '3.5 miles'
                        },
                        order: {
                            total: 178.25,
                            items: [
                                { name: 'Laptop Stand Adjustable', quantity: 1, sku: 'LSA-001' },
                                { name: 'USB Hub 7-Port', quantity: 1, sku: 'UH7P-001' },
                                { name: 'Wireless Charger Pad', quantity: 1, sku: 'WCP-001' }
                            ]
                        },
                        times: {
                            assigned: '2024-01-22T13:15:00Z',
                            pickup: '2024-01-22T13:45:00Z',
                            delivered: '2024-01-22T14:30:00Z'
                        },
                        earnings: 13.25,
                        customerRating: 5
                    }
                ]
                setDeliveries(mockDeliveries)
                setLoading(false)
            }, 1000)
        }

        fetchDeliveryHistory()
    }, [dateRange])

    const filteredDeliveries = deliveries.filter(delivery => {
        const matchesSearch = delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            delivery.id.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.times.delivered || b.times.assigned) - new Date(a.times.delivered || a.times.assigned)
            case 'earnings':
                return b.earnings - a.earnings
            case 'rating':
                return (b.customerRating || 0) - (a.customerRating || 0)
            case 'distance':
                return parseFloat(b.delivery.distance) - parseFloat(a.delivery.distance)
            default:
                return 0
        }
    })

    // Pagination
    const totalDeliveries = sortedDeliveries.length
    const totalPages = Math.ceil(totalDeliveries / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedDeliveries = sortedDeliveries.slice(startIndex, startIndex + itemsPerPage)

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return '#10b981'
            case 'cancelled': return '#ef4444'
            case 'returned': return '#f59e0b'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'delivered': return 'Delivered'
            case 'cancelled': return 'Cancelled'
            case 'returned': return 'Returned'
            default: return status
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const calculateDeliveryTime = (pickup, delivered) => {
        if (!pickup || !delivered) return 'N/A'
        const pickupTime = new Date(pickup)
        const deliveredTime = new Date(delivered)
        const diffMinutes = Math.round((deliveredTime - pickupTime) / (1000 * 60))
        return `${diffMinutes} min`
    }

    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`star ${i <= rating ? 'filled' : 'empty'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            )
        }
        return stars
    }

    const exportToCSV = () => {
        const csvData = [
            ['Delivery ID', 'Order ID', 'Customer', 'Status', 'Date', 'Earnings', 'Rating'],
            ...sortedDeliveries.map(delivery => [
                delivery.id,
                delivery.orderId,
                delivery.customer.name,
                delivery.status,
                formatDate(delivery.times.delivered || delivery.times.assigned),
                delivery.earnings,
                delivery.customerRating || 'N/A'
            ])
        ]
        
        const csvContent = csvData.map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', `delivery-history-${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    if (loading) {
        return (
            <div className="delivery-history">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading delivery history...</p>
                </div>
            </div>
        )
    }

    const completedDeliveries = deliveries.filter(d => d.status === 'delivered').length
    const totalEarnings = deliveries.reduce((sum, d) => sum + d.earnings, 0)
    const averageRating = deliveries.filter(d => d.customerRating).reduce((sum, d, _, arr) => sum + d.customerRating / arr.length, 0)

    return (
        <div className="delivery-history">
            <div className="page-header">
                <div className="header-content">
                    <h1>Delivery History</h1>
                    <p>Track your completed deliveries and performance</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{completedDeliveries}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{formatCurrency(totalEarnings)}</span>
                        <span className="stat-label">Total Earnings</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{averageRating.toFixed(1)}</span>
                        <span className="stat-label">Avg Rating</span>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="controls-left">
                    <div className="search-box">
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by customer, order ID, or delivery ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="returned">Returned</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="90days">Last 90 Days</option>
                            <option value="1year">Last Year</option>
                        </select>
                    </div>
                </div>
                <div className="controls-right">
                    <div className="sort-group">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Date</option>
                            <option value="earnings">Earnings</option>
                            <option value="rating">Rating</option>
                            <option value="distance">Distance</option>
                        </select>
                    </div>
                    <button className="export-btn" onClick={exportToCSV}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="history-list">
                {paginatedDeliveries.length > 0 ? (
                    paginatedDeliveries.map((delivery) => (
                        <div key={delivery.id} className="history-card">
                            <div className="card-header">
                                <div className="delivery-info">
                                    <div className="delivery-ids">
                                        <span className="delivery-id">#{delivery.id}</span>
                                        <span className="order-id">Order: {delivery.orderId}</span>
                                    </div>
                                    <div className="delivery-date">
                                        <span className="date">{formatDate(delivery.times.delivered || delivery.times.assigned)}</span>
                                        {delivery.times.delivered && (
                                            <span className="time">{formatTime(delivery.times.delivered)}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="status-section">
                                    <span 
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(delivery.status) }}
                                    >
                                        {getStatusLabel(delivery.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="delivery-details">
                                    <div className="customer-section">
                                        <h4>Customer Information</h4>
                                        <div className="customer-info">
                                            <div className="customer-name">{delivery.customer.name}</div>
                                            <div className="delivery-address">{delivery.delivery.address}</div>
                                            <div className="delivery-meta">
                                                <span>Distance: {delivery.delivery.distance}</span>
                                                <span>Delivery Time: {calculateDeliveryTime(delivery.times.pickup, delivery.times.delivered)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-section">
                                        <h4>Order Details</h4>
                                        <div className="order-items">
                                            {delivery.order.items.map((item, index) => (
                                                <div key={index} className="order-item">
                                                    <span className="item-quantity">{item.quantity}x</span>
                                                    <span className="item-name">{item.name}</span>
                                                    <span className="item-sku">SKU: {item.sku}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="order-total">
                                            <span>Order Value: {formatCurrency(delivery.order.total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="performance-section">
                                    <div className="earnings-info">
                                        <h4>Your Earnings</h4>
                                        <div className="earnings-amount">{formatCurrency(delivery.earnings)}</div>
                                    </div>
                                    
                                    {delivery.customerRating && (
                                        <div className="rating-info">
                                            <h4>Customer Rating</h4>
                                            <div className="rating-display">
                                                <div className="stars">
                                                    {renderStars(delivery.customerRating)}
                                                </div>
                                                <span className="rating-number">({delivery.customerRating}/5)</span>
                                            </div>
                                            {delivery.customer.feedback && (
                                                <div className="customer-feedback">
                                                    <p>"{delivery.customer.feedback}"</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card-actions">
                                <button 
                                    className="action-btn view-details"
                                    onClick={() => setSelectedDelivery(delivery)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3>No Deliveries Found</h3>
                        <p>No deliveries match your current search and filter criteria.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    <div className="pagination-info">
                        <span>Page {currentPage} of {totalPages}</span>
                        <span className="total-items">({totalDeliveries} total deliveries)</span>
                    </div>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Delivery Details Modal */}
            {selectedDelivery && (
                <div className="modal-overlay" onClick={() => setSelectedDelivery(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Delivery Details - #{selectedDelivery.id}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedDelivery(null)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Timeline</h3>
                                <div className="timeline">
                                    <div className="timeline-item">
                                        <span className="timeline-label">Assigned:</span>
                                        <span className="timeline-time">{formatDate(selectedDelivery.times.assigned)} at {formatTime(selectedDelivery.times.assigned)}</span>
                                    </div>
                                    {selectedDelivery.times.pickup && (
                                        <div className="timeline-item">
                                            <span className="timeline-label">Picked Up:</span>
                                            <span className="timeline-time">{formatDate(selectedDelivery.times.pickup)} at {formatTime(selectedDelivery.times.pickup)}</span>
                                        </div>
                                    )}
                                    {selectedDelivery.times.delivered && (
                                        <div className="timeline-item">
                                            <span className="timeline-label">Delivered:</span>
                                            <span className="timeline-time">{formatDate(selectedDelivery.times.delivered)} at {formatTime(selectedDelivery.times.delivered)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-section">
                                <h3>Locations</h3>
                                <div className="locations">
                                    <div className="location">
                                        <strong>Pickup:</strong> {selectedDelivery.warehouse.name}<br />
                                        {selectedDelivery.warehouse.address}
                                    </div>
                                    <div className="location">
                                        <strong>Delivery:</strong> {selectedDelivery.customer.name}<br />
                                        {selectedDelivery.delivery.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setSelectedDelivery(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeliveryHistory