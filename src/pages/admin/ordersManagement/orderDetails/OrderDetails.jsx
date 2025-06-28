import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './OrderDetails.scss'

const OrderDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    // Mock order data with complete details
    const mockOrderData = {
        id: id,
        orderNumber: '#12345',
        status: 'delivered',
        orderDate: '2024-06-25T10:30:00',
        deliveryDate: '2024-06-25T15:45:00',

        // Customer Information
        customer: {
            id: 'USR001',
            name: 'Alice Johnson',
            email: 'alice.johnson@email.com',
            phone: '+1 (555) 123-0001',
            address: '123 Maple Street, New York, NY 10001'
        },

        // Driver Information
        driver: {
            id: 'DRV001',
            name: 'Michael Johnson',
            email: 'michael.johnson@email.com',
            phone: '+1 (555) 901-0001',
            vehicleType: 'Motorcycle',
            earnings: 25.99
        },

        // Products and Sellers
        orderItems: [
            {
                id: 'ITEM001',
                productId: 'PRD001',
                productName: 'Gaming Laptop Pro',
                productSku: 'TP-LAP-001',
                productDescription: 'High-performance gaming laptop with RTX 4060',
                quantity: 1,
                price: 1199.99,
                total: 1199.99,
                seller: {
                    id: 'SEL001',
                    name: 'Tech Paradise',
                    email: 'contact@techparadise.com',
                    phone: '+1 (555) 123-4567',
                    address: '456 Business Ave, New York, NY 10002'
                }
            },
            {
                id: 'ITEM002',
                productId: 'PRD002',
                productName: 'Wireless Gaming Mouse',
                productSku: 'TP-MOU-002',
                productDescription: 'High-precision wireless gaming mouse with RGB',
                quantity: 2,
                price: 79.99,
                total: 159.98,
                seller: {
                    id: 'SEL001',
                    name: 'Tech Paradise',
                    email: 'contact@techparadise.com',
                    phone: '+1 (555) 123-4567',
                    address: '456 Business Ave, New York, NY 10002'
                }
            },
            {
                id: 'ITEM003',
                productId: 'PRD003',
                productName: 'Summer Dress',
                productSku: 'FH-DRS-001',
                productDescription: 'Elegant summer dress in blue',
                quantity: 1,
                price: 89.99,
                total: 89.99,
                seller: {
                    id: 'SEL002',
                    name: 'Fashion Hub',
                    email: 'orders@fashionhub.com',
                    phone: '+1 (555) 234-5678',
                    address: '789 Fashion Ave, Los Angeles, CA 90210'
                }
            }
        ],

        // Financial Details
        pricing: {
            subtotal: 1449.96,
            tax: 116.00,
            shippingFee: 15.99,
            discount: 20.00,
            total: 1561.95
        },

        // Shipping Information
        shipping: {
            address: '123 Maple Street, New York, NY 10001',
            method: 'Express Delivery',
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2024-06-25',
            actualDelivery: '2024-06-25T15:45:00'
        },

        // Payment Information
        payment: {
            method: 'Credit Card',
            cardLast4: '1234',
            transactionId: 'TXN987654321',
            paymentDate: '2024-06-25T10:30:00',
            status: 'completed'
        },

        // Order Timeline
        timeline: [
            {
                status: 'placed',
                timestamp: '2024-06-25T10:30:00',
                description: 'Order placed by customer',
                actor: 'Customer'
            },
            {
                status: 'accepted',
                timestamp: '2024-06-25T10:45:00',
                description: 'Order accepted by admin',
                actor: 'Admin'
            },
            {
                status: 'processing',
                timestamp: '2024-06-25T11:00:00',
                description: 'Order being prepared by sellers',
                actor: 'Sellers'
            },
            {
                status: 'shipped',
                timestamp: '2024-06-25T13:30:00',
                description: 'Order picked up by driver',
                actor: 'Driver'
            },
            {
                status: 'delivered',
                timestamp: '2024-06-25T15:45:00',
                description: 'Order delivered to customer',
                actor: 'Driver'
            }
        ]
    }

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setOrder(mockOrderData)
            setLoading(false)
        }, 1000)
    }, [id])

    const handleAcceptOrder = () => {
        if (window.confirm('Are you sure you want to accept this order?')) {
            setOrder({ ...order, status: 'accepted' })
        }
    }

    const handleRejectOrder = () => {
        const reason = window.prompt('Please provide a reason for rejecting this order:')
        if (reason) {
            setOrder({ ...order, status: 'rejected' })
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'warning', label: 'Pending', icon: '⏳' },
            accepted: { class: 'info', label: 'Accepted', icon: '✅' },
            processing: { class: 'processing', label: 'Processing', icon: '🔄' },
            delivered: { class: 'success', label: 'Delivered', icon: '📦' },
            cancelled: { class: 'danger', label: 'Cancelled', icon: '❌' },
            rejected: { class: 'danger', label: 'Rejected', icon: '🚫' }
        }
        const config = statusConfig[status] || statusConfig.pending
        return (
            <span className={`status-badge status-badge--${config.class}`}>
                <span className="status-icon">{config.icon}</span>
                {config.label}
            </span>
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

    // Group items by seller
    const getSellerGroups = () => {
        if (!order) return {}

        return order.orderItems.reduce((groups, item) => {
            const sellerId = item.seller.id
            if (!groups[sellerId]) {
                groups[sellerId] = {
                    seller: item.seller,
                    items: []
                }
            }
            groups[sellerId].items.push(item)
            return groups
        }, {})
    }

    if (loading) {
        return (
            <div className="order-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading order details...</p>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="order-details">
                <div className="error-state">
                    <h2>Order Not Found</h2>
                    <p>The order you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/admin/orders')}>Back to Orders</button>
                </div>
            </div>
        )
    }

    const sellerGroups = getSellerGroups()

    return (
        <div className="order-details">
            {/* Header */}
            <div className="order-header">
                <button className="back-btn" onClick={() => navigate('/admin/orders')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Orders
                </button>
                <div className="header-content">
                    <div className="order-info">
                        <h1>Order {order.orderNumber}</h1>
                        <p>Placed on {formatDateTime(order.orderDate)}</p>
                        <div className="order-meta">
                            <span className="order-id">ID: {order.id}</span>
                            {getStatusBadge(order.status)}
                        </div>
                    </div>
                    <div className="header-actions">
                        {order.status === 'pending' && (
                            <>
                                <button className="action-btn action-btn--accept" onClick={handleAcceptOrder}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Accept Order
                                </button>
                                <button className="action-btn action-btn--reject" onClick={handleRejectOrder}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject Order
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Summary Cards */}
            <div className="order-summary">
                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Customer</h3>
                        <p className="primary">{order.customer.name}</p>
                        <p className="secondary">ID: {order.customer.id}</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Products</h3>
                        <p className="primary">{order.orderItems.length} items</p>
                        <p className="secondary">{Object.keys(sellerGroups).length} sellers</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Total Value</h3>
                        <p className="primary">${order.pricing.total.toFixed(2)}</p>
                        <p className="secondary">{order.payment.status}</p>
                    </div>
                </div>

                {order.driver && (
                    <div className="summary-card">
                        <div className="card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>Driver</h3>
                            <p className="primary">{order.driver.name}</p>
                            <p className="secondary">ID: {order.driver.id}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="order-content">
                {/* Customer & Shipping Information */}
                <div className="content-section">
                    <h2>Customer & Shipping Information</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Customer Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Name:</span>
                                    <span className="value">{order.customer.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Email:</span>
                                    <span className="value">{order.customer.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Phone:</span>
                                    <span className="value">{order.customer.phone}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Customer ID:</span>
                                    <span className="value">{order.customer.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Shipping Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Address:</span>
                                    <span className="value">{order.shipping.address}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Method:</span>
                                    <span className="value">{order.shipping.method}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Tracking:</span>
                                    <span className="value">{order.shipping.trackingNumber}</span>
                                </div>
                                {order.shipping.actualDelivery && (
                                    <div className="info-item">
                                        <span className="label">Delivered:</span>
                                        <span className="value">{formatDateTime(order.shipping.actualDelivery)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products by Seller */}
                <div className="content-section">
                    <h2>Order Items by Seller</h2>
                    {Object.values(sellerGroups).map(group => (
                        <div key={group.seller.id} className="seller-section">
                            <div className="seller-header">
                                <h3>{group.seller.name}</h3>
                                <div className="seller-details">
                                    <span>ID: {group.seller.id}</span>
                                    <span>{group.seller.email}</span>
                                    <span>{group.seller.phone}</span>
                                </div>
                            </div>
                            <div className="products-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>SKU</th>
                                            <th>Description</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.items.map(item => (
                                            <tr key={item.id}>
                                                <td className="product-name">{item.productName}</td>
                                                <td className="product-sku">{item.productSku}</td>
                                                <td className="product-description">{item.productDescription}</td>
                                                <td className="quantity">{item.quantity}</td>
                                                <td className="price">${item.price.toFixed(2)}</td>
                                                <td className="total">${item.total.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Driver Information */}
                {order.driver && (
                    <div className="content-section">
                        <h2>Driver Information</h2>
                        <div className="info-grid">
                            <div className="info-card">
                                <h3>Driver Details</h3>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="label">Name:</span>
                                        <span className="value">{order.driver.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Email:</span>
                                        <span className="value">{order.driver.email}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Phone:</span>
                                        <span className="value">{order.driver.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Driver ID:</span>
                                        <span className="value">{order.driver.id}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Vehicle:</span>
                                        <span className="value">{order.driver.vehicleType}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Earnings:</span>
                                        <span className="value earnings">${order.driver.earnings.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment & Pricing */}
                <div className="content-section">
                    <h2>Payment & Pricing Details</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Payment Information</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Method:</span>
                                    <span className="value">{order.payment.method}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Card:</span>
                                    <span className="value">**** **** **** {order.payment.cardLast4}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Transaction ID:</span>
                                    <span className="value">{order.payment.transactionId}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Status:</span>
                                    <span className="value">{order.payment.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Order Summary</h3>
                            <div className="pricing-breakdown">
                                <div className="pricing-item">
                                    <span>Subtotal:</span>
                                    <span>${order.pricing.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="pricing-item">
                                    <span>Tax:</span>
                                    <span>${order.pricing.tax.toFixed(2)}</span>
                                </div>
                                <div className="pricing-item">
                                    <span>Shipping:</span>
                                    <span>${order.pricing.shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="pricing-item discount">
                                    <span>Discount:</span>
                                    <span>-${order.pricing.discount.toFixed(2)}</span>
                                </div>
                                <div className="pricing-item total">
                                    <span>Total:</span>
                                    <span>${order.pricing.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="content-section">
                    <h2>Order Timeline</h2>
                    <div className="timeline">
                        {order.timeline.map((event, index) => (
                            <div key={index} className={`timeline-item ${event.status}`}>
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>{event.description}</h4>
                                    <p>by {event.actor}</p>
                                    <span className="timestamp">{formatDateTime(event.timestamp)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails