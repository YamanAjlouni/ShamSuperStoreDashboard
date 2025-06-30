import { useState, useEffect } from 'react'
import './ActiveDeliveries.scss'

const ActiveDeliveries = () => {
    const [loading, setLoading] = useState(true)
    const [deliveries, setDeliveries] = useState([])
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('time')
    const [showMap, setShowMap] = useState(false)

    useEffect(() => {
        const fetchActiveDeliveries = async () => {
            setLoading(true)
            setTimeout(() => {
                const mockDeliveries = [
                    {
                        id: 'DEL001',
                        orderId: 'ORD-2024-001',
                        status: 'assigned',
                        customer: {
                            name: 'Sarah Johnson',
                            phone: '+1 (555) 123-4567',
                            rating: 4.8
                        },
                        warehouse: {
                            name: 'Main Distribution Center',
                            address: '123 Industrial Blvd, Warehouse District',
                            phone: '+1 (555) 987-6543',
                            readyTime: 15
                        },
                        delivery: {
                            address: '456 Oak Avenue, Apt 2B, Midtown',
                            instructions: 'Ring doorbell twice. Leave at door if no answer.',
                            estimatedTime: '15-20 mins',
                            distance: '2.3 miles'
                        },
                        order: {
                            total: 124.50,
                            items: [
                                { name: 'Wireless Bluetooth Headphones', quantity: 1, sku: 'WBH-001' },
                                { name: 'Phone Case - Black', quantity: 2, sku: 'PC-BLK-001' },
                                { name: 'USB-C Charging Cable', quantity: 1, sku: 'USB-C-001' }
                            ],
                            specialInstructions: 'Handle electronics with care'
                        },
                        times: {
                            assigned: '2024-01-25T14:00:00Z',
                            pickup: null,
                            delivered: null,
                            estimatedPickup: '2024-01-25T14:30:00Z',
                            estimatedDelivery: '2024-01-25T15:00:00Z'
                        }
                    },
                    {
                        id: 'DEL002',
                        orderId: 'ORD-2024-002',
                        status: 'picked_up',
                        customer: {
                            name: 'Mike Chen',
                            phone: '+1 (555) 234-5678',
                            rating: 4.2
                        },
                        warehouse: {
                            name: 'Electronics Warehouse',
                            address: '789 Tech Street, Industrial Zone',
                            phone: '+1 (555) 876-5432',
                            readyTime: 0
                        },
                        delivery: {
                            address: '321 Pine Road, Unit 5, Eastside',
                            instructions: 'Call when arriving. Building requires code: 1234',
                            estimatedTime: '10-15 mins',
                            distance: '1.8 miles'
                        },
                        order: {
                            total: 89.99,
                            items: [
                                { name: 'Gaming Mouse', quantity: 1, sku: 'GM-RGB-001' },
                                { name: 'Mechanical Keyboard', quantity: 1, sku: 'MK-001' },
                                { name: 'Mousepad', quantity: 1, sku: 'MP-001' }
                            ],
                            specialInstructions: 'Customer requested signature on delivery'
                        },
                        times: {
                            assigned: '2024-01-25T13:45:00Z',
                            pickup: '2024-01-25T14:15:00Z',
                            delivered: null,
                            estimatedPickup: '2024-01-25T14:15:00Z',
                            estimatedDelivery: '2024-01-25T14:45:00Z'
                        }
                    },
                    {
                        id: 'DEL003',
                        orderId: 'ORD-2024-003',
                        status: 'en_route',
                        customer: {
                            name: 'Emily Rodriguez',
                            phone: '+1 (555) 345-6789',
                            rating: 4.9
                        },
                        warehouse: {
                            name: 'Fashion Hub Warehouse',
                            address: '555 Commerce Ave, Distribution Center',
                            phone: '+1 (555) 765-4321',
                            readyTime: 5
                        },
                        delivery: {
                            address: '987 Maple Lane, Northside',
                            instructions: 'Second floor, apartment B. Doorbell broken, please knock.',
                            estimatedTime: '8-12 mins',
                            distance: '1.2 miles'
                        },
                        order: {
                            total: 156.75,
                            items: [
                                { name: 'Women\'s Running Shoes - Size 8', quantity: 1, sku: 'WRS-08-001' },
                                { name: 'Athletic Wear Set', quantity: 1, sku: 'AWS-M-001' },
                                { name: 'Water Bottle', quantity: 1, sku: 'WB-001' }
                            ],
                            specialInstructions: 'Fragile items, handle with care'
                        },
                        times: {
                            assigned: '2024-01-25T13:30:00Z',
                            pickup: '2024-01-25T13:55:00Z',
                            delivered: null,
                            estimatedPickup: '2024-01-25T13:50:00Z',
                            estimatedDelivery: '2024-01-25T14:20:00Z'
                        }
                    }
                ]
                setDeliveries(mockDeliveries)
                setLoading(false)
            }, 1000)
        }

        fetchActiveDeliveries()
    }, [])

    const filteredDeliveries = deliveries.filter(delivery => {
        if (filter === 'all') return true
        return delivery.status === filter
    })

    const sortedDeliveries = [...filteredDeliveries].sort((a, b) => {
        switch (sortBy) {
            case 'time':
                return new Date(a.times.estimatedDelivery) - new Date(b.times.estimatedDelivery)
            case 'distance':
                return parseFloat(a.delivery.distance) - parseFloat(b.delivery.distance)
            case 'value':
                return b.order.total - a.order.total
            default:
                return 0
        }
    })

    const handleStatusUpdate = (deliveryId, newStatus) => {
        setDeliveries(prevDeliveries =>
            prevDeliveries.map(delivery =>
                delivery.id === deliveryId
                    ? {
                        ...delivery,
                        status: newStatus,
                        times: {
                            ...delivery.times,
                            pickup: newStatus === 'picked_up' ? new Date().toISOString() : delivery.times.pickup,
                            delivered: newStatus === 'delivered' ? new Date().toISOString() : delivery.times.delivered
                        }
                    }
                    : delivery
            )
        )

        if (newStatus === 'delivered') {
            // Remove delivered orders after a delay
            setTimeout(() => {
                setDeliveries(prev => prev.filter(d => d.id !== deliveryId))
            }, 2000)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'assigned': return '#3b82f6'
            case 'en_route': return '#f59e0b'
            case 'picked_up': return '#10b981'
            case 'delivered': return '#6b7280'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'assigned': return 'Assigned'
            case 'en_route': return 'En Route to Pickup'
            case 'picked_up': return 'Picked Up'
            case 'delivered': return 'Delivered'
            default: return status
        }
    }



    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const callCustomer = (phone) => {
        window.location.href = `tel:${phone}`
    }

    const openNavigation = (address) => {
        const encodedAddress = encodeURIComponent(address)
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
    }

    if (loading) {
        return (
            <div className="active-deliveries">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading active deliveries...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="active-deliveries">
            <div className="page-header">
                <div className="header-content">
                    <h1>Active Deliveries</h1>
                    <p>Manage your current delivery assignments</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{deliveries.length}</span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{deliveries.reduce((sum, d) => sum + d.order.items.length, 0)}</span>
                        <span className="stat-label">Items</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">
                            {formatCurrency(deliveries.reduce((sum, d) => sum + d.order.total, 0))}
                        </span>
                        <span className="stat-label">Total Value</span>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="controls-left">
                    <div className="filter-group">
                        <label>Filter by Status:</label>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All Deliveries</option>
                            <option value="assigned">Assigned</option>
                            <option value="en_route">En Route</option>
                            <option value="picked_up">Picked Up</option>
                        </select>
                    </div>
                    <div className="sort-group">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="time">Delivery Time</option>
                            <option value="distance">Distance</option>
                            <option value="value">Order Value</option>
                        </select>
                    </div>
                </div>
                <div className="controls-right">
                    <button 
                        className={`map-toggle ${showMap ? 'active' : ''}`}
                        onClick={() => setShowMap(!showMap)}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        {showMap ? 'Hide Map' : 'Show Map'}
                    </button>
                </div>
            </div>

            {showMap && (
                <div className="map-section">
                    <div className="map-placeholder">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <p>Interactive delivery map would be integrated here</p>
                        <span>Showing routes and delivery locations</span>
                    </div>
                </div>
            )}

            <div className="deliveries-list">
                {sortedDeliveries.length > 0 ? (
                    sortedDeliveries.map((delivery) => (
                        <div key={delivery.id} className="delivery-card">
                            <div className="delivery-header">
                                <div className="delivery-info">
                                    <div className="delivery-id">#{delivery.id}</div>
                                    <div className="order-id">Order: {delivery.orderId}</div>
                                </div>
                                <div className="delivery-status">
                                    <span 
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(delivery.status) }}
                                    >
                                        {getStatusLabel(delivery.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="delivery-content">
                                <div className="delivery-details">
                                    <div className="warehouse-section">
                                        <h4>Pickup Location</h4>
                                        <div className="location-info">
                                            <div className="location-name">{delivery.warehouse.name}</div>
                                            <div className="location-address">{delivery.warehouse.address}</div>
                                            <div className="location-meta">
                                                <span>Ready in: {delivery.warehouse.readyTime} min</span>
                                                <button 
                                                    className="phone-btn"
                                                    onClick={() => callCustomer(delivery.warehouse.phone)}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    Call
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="customer-section">
                                        <h4>Delivery Location</h4>
                                        <div className="customer-info">
                                            <div className="customer-header">
                                                <div className="customer-name">{delivery.customer.name}</div>
                                                <div className="customer-rating">
                                                    <svg fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                                    </svg>
                                                    {delivery.customer.rating}
                                                </div>
                                            </div>
                                            <div className="delivery-address">{delivery.delivery.address}</div>
                                            <div className="delivery-instructions">{delivery.delivery.instructions}</div>
                                            <div className="delivery-meta">
                                                <span>Distance: {delivery.delivery.distance}</span>
                                                <span>ETA: {delivery.delivery.estimatedTime}</span>
                                                <button 
                                                    className="phone-btn"
                                                    onClick={() => callCustomer(delivery.customer.phone)}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    Call
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-summary">
                                    <h4>Order Summary</h4>
                                    <div className="order-items">
                                        {delivery.order.items.map((item, index) => (
                                            <div key={index} className="order-item">
                                                <span className="item-quantity">{item.quantity}x</span>
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-sku">SKU: {item.sku}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {delivery.order.specialInstructions && (
                                        <div className="special-instructions">
                                            <strong>Special Instructions:</strong> {delivery.order.specialInstructions}
                                        </div>
                                    )}
                                    <div className="order-total">
                                        <div className="total-line final">
                                            <span>Order Total:</span>
                                            <span>{formatCurrency(delivery.order.total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="delivery-actions">
                                <button 
                                    className="action-btn navigation"
                                    onClick={() => openNavigation(delivery.status === 'assigned' ? delivery.warehouse.address : delivery.delivery.address)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Navigate
                                </button>

                                {delivery.status === 'assigned' && (
                                    <button 
                                        className="action-btn primary"
                                        onClick={() => handleStatusUpdate(delivery.id, 'en_route')}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Start Delivery
                                    </button>
                                )}

                                {delivery.status === 'en_route' && (
                                    <button 
                                        className="action-btn success"
                                        onClick={() => handleStatusUpdate(delivery.id, 'picked_up')}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Mark as Picked Up
                                    </button>
                                )}

                                {delivery.status === 'picked_up' && (
                                    <button 
                                        className="action-btn complete"
                                        onClick={() => handleStatusUpdate(delivery.id, 'delivered')}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Complete Delivery
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3>No Active Deliveries</h3>
                        <p>You're all caught up! New delivery requests will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActiveDeliveries