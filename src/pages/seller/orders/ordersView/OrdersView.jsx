import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft, Check, X, Download, Printer, Mail,
    Calendar, MapPin, Package, DollarSign, User,
    Phone, CreditCard, Truck, Clock, CheckCircle,
    XCircle, AlertCircle, PlayCircle, FileText,
    Edit, MessageSquare, Navigation
} from 'lucide-react'
import './OrdersView.scss'
import MapModal from '../../../../components/mapModal/MapModal'

const OrdersView = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [orderData, setOrderData] = useState(null)
    const [showActionModal, setShowActionModal] = useState(false)
    const [actionType, setActionType] = useState('')
    const [orderNotes, setOrderNotes] = useState('')
    const [newNote, setNewNote] = useState('')
    const [showMapModal, setShowMapModal] = useState(false)

    // Mock order data
    const mockOrderData = {
        id: 1,
        orderNumber: 'ORD-001',
        status: 'processing', // Changed to processing to show the directions button
        items: [
            {
                id: 1,
                name: 'Wireless Bluetooth Headphones',
                sku: 'WBH-001',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&crop=center',
                quantity: 2,
                price: 99.99,
                total: 199.98
            },
            {
                id: 2,
                name: 'Premium Phone Case',
                sku: 'PPC-002',
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=80&h=80&fit=crop&crop=center',
                quantity: 1,
                price: 24.99,
                total: 24.99
            }
        ],
        billingAddress: {
            street: '123 Main Street',
            street2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
        },
        shippingAddress: {
            street: '456 Oak Avenue',
            street2: 'Suite 200',
            city: 'Brooklyn',
            state: 'NY',
            zip: '11201',
            country: 'United States',
            coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        sellerAddress: {
            street: '789 Business Plaza',
            city: 'New York',
            state: 'NY',
            zip: '10002',
            country: 'United States',
            coordinates: { lat: 40.7589, lng: -73.9851 }
        },
        payment: {
            method: 'Credit Card',
            cardLast4: '4242',
            total: 224.97,
            subtotal: 224.97,
            tax: 0,
            shipping: 0,
            discount: 0,
            adminFee: 11.25
        },
        shipping: {
            method: 'Standard Shipping',
            carrier: 'FedEx',
            trackingNumber: 'FX123456789',
            estimatedDelivery: '2025-06-25'
        },
        driver: {
            id: 'DRV001',
            name: 'John Smith',
            phone: '+1 (555) 123-4567',
            vehicleType: 'Van'
        },
        dates: {
            ordered: '2025-06-20T10:30:00Z',
            processed: '2025-06-20T11:15:00Z',
            shipped: null,
            delivered: null
        },
        store: 'TechStore Pro',
        timeline: [
            {
                status: 'ordered',
                date: '2025-06-20T10:30:00Z',
                description: 'Order placed by customer',
                icon: <Package size={16} />
            },
            {
                status: 'processing',
                date: '2025-06-20T11:15:00Z',
                description: 'Order accepted and being prepared',
                icon: <PlayCircle size={16} />
            }
        ],
        notes: [
            {
                id: 1,
                author: 'System',
                content: 'Order automatically created from website',
                date: '2025-06-20T10:30:00Z',
                type: 'system'
            },
            {
                id: 2,
                author: 'Seller',
                content: 'Order accepted and being prepared for pickup',
                date: '2025-06-20T11:15:00Z',
                type: 'seller'
            }
        ]
    }

    useEffect(() => {
        // Simulate loading order data
        setOrderData(mockOrderData)
        setOrderNotes(mockOrderData.notes.map(note => note.content).join('\n'))
    }, [id])

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'status--pending', icon: <Clock size={14} />, text: 'Pending' },
            completed: { class: 'status--completed', icon: <CheckCircle size={14} />, text: 'Completed' },
            processing: { class: 'status--processing', icon: <PlayCircle size={14} />, text: 'Processing' },
            rejected: { class: 'status--rejected', icon: <XCircle size={14} />, text: 'Rejected' }
        }

        const config = statusConfig[status] || statusConfig.pending
        return (
            <span className={`status-badge ${config.class}`}>
                {config.icon}
                {config.text}
            </span>
        )
    }

    const handleAction = (action) => {
        setActionType(action)
        setShowActionModal(true)
    }

    const confirmAction = () => {
        console.log(`${actionType} order:`, orderData.orderNumber)

        // Update order status based on action
        if (actionType === 'accept') {
            setOrderData(prev => ({ ...prev, status: 'processing' }))
        } else if (actionType === 'reject') {
            setOrderData(prev => ({ ...prev, status: 'rejected' }))
        }

        setShowActionModal(false)
        setActionType('')
    }

    const addNote = () => {
        if (newNote.trim()) {
            const note = {
                id: Date.now(),
                author: 'Seller',
                content: newNote,
                date: new Date().toISOString(),
                type: 'seller'
            }

            setOrderData(prev => ({
                ...prev,
                notes: [...prev.notes, note]
            }))

            setNewNote('')
        }
    }

    // Handle opening map modal
    const handleOpenMap = () => {
        setShowMapModal(true)
    }

    // Get pickup location (seller's location)
    const getPickupLocation = () => {
        if (!orderData?.sellerAddress) return null

        return {
            street: orderData.sellerAddress.street,
            full: `${orderData.sellerAddress.street}, ${orderData.sellerAddress.city}, ${orderData.sellerAddress.state} ${orderData.sellerAddress.zip}`,
            coordinates: orderData.sellerAddress.coordinates || { lat: 40.7589, lng: -73.9851 }
        }
    }

    // Get delivery location
    const getDeliveryLocation = () => {
        if (!orderData?.shippingAddress) return null

        return {
            street: orderData.shippingAddress.street,
            full: `${orderData.shippingAddress.street}${orderData.shippingAddress.street2 ? ', ' + orderData.shippingAddress.street2 : ''}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}`,
            coordinates: orderData.shippingAddress.coordinates || { lat: 40.7128, lng: -74.0060 }
        }
    }

    // Simulate driver location (you can get this from GPS)
    const getDriverLocation = () => {
        // This would come from GPS in a real app
        return { lat: 40.7300, lng: -73.9950 }
    }

    const formatAddress = (address) => {
        return (
            <div className="address-format">
                <div className="street">
                    {address.street}
                    {address.street2 && <><br />{address.street2}</>}
                </div>
                <div className="city-state">
                    {address.city}, {address.state} {address.zip}
                </div>
                <div className="country">{address.country}</div>
            </div>
        )
    }

    const getActionButtons = () => {
        const buttons = []

        if (orderData?.status === 'pending') {
            buttons.push(
                <button
                    key="accept"
                    className="action-btn accept-btn"
                    onClick={() => handleAction('accept')}
                >
                    <Check size={16} />
                    Accept Order
                </button>
            )
            buttons.push(
                <button
                    key="reject"
                    className="action-btn reject-btn"
                    onClick={() => handleAction('reject')}
                >
                    <X size={16} />
                    Reject Order
                </button>
            )
        }

        // Add directions button when order is processing and has driver
        if (orderData?.status === 'processing' && orderData?.driver) {
            buttons.push(
                <button
                    key="directions"
                    className="action-btn directions-btn"
                    onClick={handleOpenMap}
                >
                    <Navigation size={16} />
                    Get Directions
                </button>
            )
        }

        // Common actions for all statuses
        buttons.push(
            <button key="print" className="action-btn secondary-btn">
                <Printer size={16} />
                Print
            </button>
        )

        buttons.push(
            <button key="download" className="action-btn secondary-btn">
                <Download size={16} />
                Export
            </button>
        )

        return buttons
    }

    if (!orderData) {
        return (
            <div className="orders-view-page">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <span>Loading order details...</span>
                </div>
            </div>
        )
    }

    const pickupLocation = getPickupLocation()
    const deliveryLocation = getDeliveryLocation()

    return (
        <div className="orders-view-page">
            {/* Header */}
            <div className="order-header">
                <div className="header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/seller/orders')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="order-info">
                        <h1>Order {orderData.orderNumber}</h1>
                        <div className="order-meta">
                            {getStatusBadge(orderData.status)}
                            <span className="order-date">
                                <Calendar size={14} />
                                {new Date(orderData.dates.ordered).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                            <span className="store-name">
                                <Package size={14} />
                                {orderData.store}
                            </span>
                            {orderData.driver && (
                                <span className="driver-info">
                                    <Truck size={14} />
                                    Driver: {orderData.driver.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    {getActionButtons()}
                </div>
            </div>

            <div className="order-content">
                {/* Left Column - Order Details */}
                <div className="order-main">
                    {/* Order Items */}
                    <div className="section order-items">
                        <h3>
                            <Package size={18} />
                            Order Items ({orderData.items.length})
                        </h3>
                        <div className="items-container">
                            {orderData.items.map(item => (
                                <div key={item.id} className="item-row">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="sku">SKU: {item.sku}</p>
                                        <div className="item-meta">
                                            <span className="quantity">Qty: {item.quantity}</span>
                                            <span className="unit-price">${item.price.toFixed(2)} each</span>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        <strong>${item.total.toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="section addresses">
                        <h3>
                            <MapPin size={18} />
                            Delivery Information
                        </h3>
                        <div className="address-grid">
                            <div className="address-card billing">
                                <div className="address-header">
                                    <CreditCard size={16} />
                                    <h4>Billing Address</h4>
                                </div>
                                <div className="address-content">
                                    {formatAddress(orderData.billingAddress)}
                                </div>
                            </div>
                            <div className="address-card shipping">
                                <div className="address-header">
                                    <Truck size={16} />
                                    <h4>Shipping Address</h4>
                                </div>
                                <div className="address-content">
                                    {formatAddress(orderData.shippingAddress)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="section order-timeline">
                        <h3>
                            <Clock size={18} />
                            Order Timeline
                        </h3>
                        <div className="timeline">
                            {orderData.timeline.map((event, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-icon">
                                        {event.icon}
                                    </div>
                                    <div className="timeline-content">
                                        <p className="timeline-description">{event.description}</p>
                                        <span className="timeline-date">
                                            {new Date(event.date).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="order-sidebar">
                    {/* Driver Information */}
                    {orderData.driver && (
                        <div className="section driver-info-section">
                            <h3>
                                <Truck size={18} />
                                Driver Information
                            </h3>
                            <div className="driver-content">
                                <div className="driver-details">
                                    <div className="driver-item">
                                        <span className="label">Name:</span>
                                        <span className="value">{orderData.driver.name}</span>
                                    </div>
                                    <div className="driver-item">
                                        <span className="label">Phone:</span>
                                        <span className="value">{orderData.driver.phone}</span>
                                    </div>
                                    <div className="driver-item">
                                        <span className="label">Vehicle:</span>
                                        <span className="value">{orderData.driver.vehicleType}</span>
                                    </div>
                                    <div className="driver-item">
                                        <span className="label">Driver ID:</span>
                                        <span className="value">{orderData.driver.id}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Summary */}
                    <div className="section payment-summary">
                        <h3>
                            <DollarSign size={18} />
                            Payment Summary
                        </h3>
                        <div className="payment-method">
                            <CreditCard size={16} />
                            <span>{orderData.payment.method}</span>
                            {orderData.payment.cardLast4 && (
                                <span className="card-info">•••• {orderData.payment.cardLast4}</span>
                            )}
                        </div>
                        <div className="payment-breakdown">
                            <div className="line-item">
                                <span>Subtotal</span>
                                <span>${orderData.payment.subtotal.toFixed(2)}</span>
                            </div>
                            {orderData.payment.tax > 0 && (
                                <div className="line-item">
                                    <span>Tax</span>
                                    <span>${orderData.payment.tax.toFixed(2)}</span>
                                </div>
                            )}
                            {orderData.payment.shipping > 0 && (
                                <div className="line-item">
                                    <span>Shipping</span>
                                    <span>${orderData.payment.shipping.toFixed(2)}</span>
                                </div>
                            )}
                            {orderData.payment.discount > 0 && (
                                <div className="line-item discount">
                                    <span>Discount</span>
                                    <span>-${orderData.payment.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="line-item total">
                                <span>Total</span>
                                <span>${orderData.payment.total.toFixed(2)}</span>
                            </div>
                            <div className="line-item admin-fee">
                                <span>Admin Fee</span>
                                <span>${orderData.payment.adminFee.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    {orderData.shipping && (
                        <div className="section shipping-info">
                            <h3>
                                <Truck size={18} />
                                Shipping Details
                            </h3>
                            <div className="shipping-content">
                                <div className="shipping-method">
                                    <Truck size={16} />
                                    <span>{orderData.shipping.method}</span>
                                </div>
                                <div className="shipping-details">
                                    <div className="shipping-item">
                                        <span className="label">Carrier:</span>
                                        <span className="value">{orderData.shipping.carrier}</span>
                                    </div>
                                    {orderData.shipping.trackingNumber && (
                                        <div className="shipping-item">
                                            <span className="label">Tracking:</span>
                                            <span className="value tracking">{orderData.shipping.trackingNumber}</span>
                                        </div>
                                    )}
                                    {orderData.shipping.estimatedDelivery && (
                                        <div className="shipping-item">
                                            <span className="label">Est. Delivery:</span>
                                            <span className="value">{new Date(orderData.shipping.estimatedDelivery).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Notes */}
                    <div className="section order-notes">
                        <h3>
                            <MessageSquare size={18} />
                            Order Notes
                        </h3>
                        <div className="notes-content">
                            {orderData.notes.map(note => (
                                <div key={note.id} className={`note-item ${note.type}`}>
                                    <div className="note-header">
                                        <span className="note-author">{note.author}</span>
                                        <span className="note-date">
                                            {new Date(note.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="note-content">
                                        {note.content}
                                    </div>
                                </div>
                            ))}
                            <div className="add-note">
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Add a note..."
                                    className="note-input"
                                />
                                <button
                                    onClick={addNote}
                                    disabled={!newNote.trim()}
                                    className="add-note-btn"
                                >
                                    Add Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Modal */}
            {showActionModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm {actionType === 'accept' ? 'Accept' : 'Reject'} Order</h3>
                        <p>
                            Are you sure you want to {actionType} order "{orderData.orderNumber}"?
                            {actionType === 'reject' && ' This action cannot be undone.'}
                        </p>
                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowActionModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`confirm-btn ${actionType}-btn`}
                                onClick={confirmAction}
                            >
                                {actionType === 'accept' ? 'Accept' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Modal */}
            <MapModal
                isOpen={showMapModal}
                onClose={() => setShowMapModal(false)}
                pickupLocation={pickupLocation}
                deliveryLocation={deliveryLocation}
                driverLocation={getDriverLocation()}
            />
        </div>
    )
}

export default OrdersView