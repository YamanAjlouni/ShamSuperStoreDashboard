import { useState } from 'react'
import './OrderDetails.scss'

const OrderDetails = ({ order, onBack, onUpdateOrder }) => {
    const [currentOrder, setCurrentOrder] = useState(order)
    const [showTicketForm, setShowTicketForm] = useState(false)
    const [showContactModal, setShowContactModal] = useState(false)
    const [ticketForm, setTicketForm] = useState({
        reason: '',
        description: '',
        priority: 'medium'
    })
    const [contactMessage, setContactMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getStatusBadge = (status) => {
        const statusConfig = {
            delivered: { class: 'status-delivered', text: 'Delivered' },
            processing: { class: 'status-processing', text: 'Processing' },
            cancelled: { class: 'status-cancelled', text: 'Cancelled' },
            done: { class: 'status-done', text: 'Completed' }
        }
        const config = statusConfig[status] || { class: 'status-unknown', text: status }
        return <span className={`status-badge ${config.class}`}>{config.text}</span>
    }

    const getTicketStatusBadge = (status) => {
        const ticketConfig = {
            open: { class: 'ticket-open', text: 'Open' },
            resolved: { class: 'ticket-resolved', text: 'Resolved' },
            closed: { class: 'ticket-closed', text: 'Closed' }
        }
        const config = ticketConfig[status] || { class: 'ticket-unknown', text: status }
        return <span className={`ticket-status-badge ${config.class}`}>{config.text}</span>
    }

    const getPaymentStatusBadge = (status) => {
        const paymentConfig = {
            paid: { class: 'payment-paid', text: 'Paid' },
            pending: { class: 'payment-pending', text: 'Pending' },
            failed: { class: 'payment-failed', text: 'Failed' },
            refunded: { class: 'payment-refunded', text: 'Refunded' }
        }
        const config = paymentConfig[status] || { class: 'payment-unknown', text: status }
        return <span className={`payment-status-badge ${config.class}`}>{config.text}</span>
    }

    const handleCreateTicket = async (e) => {
        e.preventDefault()
        if (!ticketForm.reason || !ticketForm.description) {
            alert('Please fill in all required fields')
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            const newTicket = {
                id: `T-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                createdBy: 'customerService',
                reason: ticketForm.reason,
                description: ticketForm.description,
                priority: ticketForm.priority,
                status: 'open',
                createdAt: new Date().toISOString().split('T')[0],
                messages: [
                    {
                        id: 1,
                        sender: 'Customer Service',
                        message: `Ticket created: ${ticketForm.description}`,
                        timestamp: new Date().toLocaleString(),
                        type: 'system'
                    }
                ]
            }

            const updatedOrder = {
                ...currentOrder,
                ticket: newTicket
            }

            setCurrentOrder(updatedOrder)
            if (onUpdateOrder) onUpdateOrder(updatedOrder)
            setShowTicketForm(false)
            setTicketForm({ reason: '', description: '', priority: 'medium' })
            setIsLoading(false)

            alert('Support ticket created successfully!')
        }, 1000)
    }

    const handleResolveTicket = async () => {
        if (!currentOrder.ticket) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            const updatedTicket = {
                ...currentOrder.ticket,
                status: 'resolved',
                resolvedAt: new Date().toISOString().split('T')[0],
                resolvedBy: 'Customer Service Agent',
                messages: [
                    ...(currentOrder.ticket.messages || []),
                    {
                        id: Date.now(),
                        sender: 'Customer Service',
                        message: 'Ticket has been marked as resolved.',
                        timestamp: new Date().toLocaleString(),
                        type: 'system'
                    }
                ]
            }

            const updatedOrder = {
                ...currentOrder,
                ticket: updatedTicket
            }

            setCurrentOrder(updatedOrder)
            if (onUpdateOrder) onUpdateOrder(updatedOrder)
            setIsLoading(false)

            alert('Ticket marked as resolved!')
        }, 500)
    }

    const handleContactCustomer = async (e) => {
        e.preventDefault()
        if (!contactMessage.trim()) {
            alert('Please enter a message')
            return
        }

        setIsLoading(true)

        // Simulate sending message
        setTimeout(() => {
            const newMessage = {
                id: Date.now(),
                sender: 'Customer Service',
                message: contactMessage,
                timestamp: new Date().toLocaleString(),
                type: 'outbound'
            }

            if (currentOrder.ticket) {
                const updatedTicket = {
                    ...currentOrder.ticket,
                    messages: [
                        ...(currentOrder.ticket.messages || []),
                        newMessage
                    ]
                }

                const updatedOrder = {
                    ...currentOrder,
                    ticket: updatedTicket
                }

                setCurrentOrder(updatedOrder)
                if (onUpdateOrder) onUpdateOrder(updatedOrder)
            }

            setContactMessage('')
            setShowContactModal(false)
            setIsLoading(false)

            alert('Message sent to customer successfully!')
        }, 800)
    }

    const handleReopenTicket = () => {
        if (!currentOrder.ticket) return

        const updatedTicket = {
            ...currentOrder.ticket,
            status: 'open',
            reopenedAt: new Date().toISOString().split('T')[0],
            messages: [
                ...(currentOrder.ticket.messages || []),
                {
                    id: Date.now(),
                    sender: 'Customer Service',
                    message: 'Ticket has been reopened for further investigation.',
                    timestamp: new Date().toLocaleString(),
                    type: 'system'
                }
            ]
        }

        const updatedOrder = {
            ...currentOrder,
            ticket: updatedTicket
        }

        setCurrentOrder(updatedOrder)
        if (onUpdateOrder) onUpdateOrder(updatedOrder)

        alert('Ticket reopened!')
    }

    return (
        <div className="order-details">
            <div className="details-header">
                <button className="back-btn" onClick={onBack}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Orders</span>
                </button>

                <div className="order-title">
                    <h1>Order Details - #{currentOrder.orderNumber}</h1>
                    <div className="order-meta">
                        <span className="order-date">Ordered: {currentOrder.orderDate}</span>
                        {currentOrder.deliveryDate && (
                            <span className="delivery-date">Delivered: {currentOrder.deliveryDate}</span>
                        )}
                        <div className="status-container">
                            {getStatusBadge(currentOrder.status)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="details-content">
                <div className="details-grid">
                    {/* Seller Information */}
                    <div className="details-card">
                        <div className="card-header">
                            <div className="card-icon seller-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3>Seller Information</h3>
                        </div>
                        <div className="card-content">
                            <div className="info-row">
                                <span className="label">Business Name:</span>
                                <span className="value">{currentOrder.seller.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Seller ID:</span>
                                <span className="value">{currentOrder.seller.id}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Phone Number:</span>
                                <span className="value contact-link" onClick={() => window.open(`tel:${currentOrder.seller.phone}`)}>
                                    {currentOrder.seller.phone}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">Email:</span>
                                <span className="value contact-link" onClick={() => window.open(`mailto:${currentOrder.seller.email}`)}>
                                    {currentOrder.seller.email}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">Address:</span>
                                <span className="value">{currentOrder.seller.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="details-card">
                        <div className="card-header">
                            <div className="card-icon customer-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3>Customer Information</h3>
                        </div>
                        <div className="card-content">
                            <div className="info-row">
                                <span className="label">Customer Name:</span>
                                <span className="value">{currentOrder.customer.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Customer ID:</span>
                                <span className="value">{currentOrder.customer.id}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Phone Number:</span>
                                <span className="value contact-link" onClick={() => window.open(`tel:${currentOrder.customer.phone}`)}>
                                    {currentOrder.customer.phone}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">Email Address:</span>
                                <span className="value contact-link" onClick={() => window.open(`mailto:${currentOrder.customer.email}`)}>
                                    {currentOrder.customer.email}
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">Delivery Address:</span>
                                <span className="value">{currentOrder.customer.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="details-card payment-card">
                    <div className="card-header">
                        <div className="card-icon payment-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3>Payment Information</h3>
                    </div>
                    <div className="card-content">
                        <div className="payment-method-info">
                            <div className="info-row">
                                <span className="label">Payment Method:</span>
                                <span className="value payment-method">
                                    <span className="method-type">Cash Payment</span>
                                    <span className="method-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </span>
                                </span>
                            </div>
                            <div className="info-row">
                                <span className="label">Total Amount:</span>
                                <span className="value amount-value">${currentOrder.totalAmount}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Payment Status:</span>
                                <span className="value">{getPaymentStatusBadge(currentOrder.payment?.status || 'pending')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items - Simple Responsive Table */}
                <div className="details-card order-items-card">
                    <div className="card-header">
                        <div className="card-icon items-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3>Order Items</h3>
                    </div>
                    <div className="card-content">
                        <div className="items-table-container">
                            <div className="items-table">
                                <div className="items-header">
                                    <div className="header-cell">Product Name</div>
                                    <div className="header-cell">Quantity</div>
                                    <div className="header-cell">Unit Price</div>
                                    <div className="header-cell">Total</div>
                                </div>
                                <div className="items-body">
                                    {currentOrder.items.map((item, index) => (
                                        <div key={index} className="item-row">
                                            <div className="item-cell" data-label="Product">{item.name}</div>
                                            <div className="item-cell" data-label="Quantity">{item.quantity}</div>
                                            <div className="item-cell" data-label="Unit Price">${item.price}</div>
                                            <div className="item-cell" data-label="Total">${(item.quantity * item.price).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="items-footer">
                                    <div className="total-row">
                                        <span className="total-label">Total Amount:</span>
                                        <span className="total-amount">${currentOrder.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Status & Timeline */}
                <div className="details-card status-card">
                    <div className="card-header">
                        <div className="card-icon status-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3>Order Status</h3>
                    </div>
                    <div className="card-content">
                        <div className="status-info">
                            <div className="current-status">
                                <span className="label">Current Status:</span>
                                {getStatusBadge(currentOrder.status)}
                            </div>

                            <div className="status-timeline">
                                <div className="timeline-item completed">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Order Placed</div>
                                        <div className="timeline-date">{currentOrder.orderDate}</div>
                                    </div>
                                </div>

                                <div className={`timeline-item ${['processing', 'delivered', 'done'].includes(currentOrder.status) ? 'completed' : ''}`}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Processing</div>
                                        <div className="timeline-date">
                                            {['processing', 'delivered', 'done'].includes(currentOrder.status) ? currentOrder.orderDate : 'Pending'}
                                        </div>
                                    </div>
                                </div>

                                <div className={`timeline-item ${['delivered', 'done'].includes(currentOrder.status) ? 'completed' : ''}`}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">Delivered</div>
                                        <div className="timeline-date">
                                            {currentOrder.deliveryDate || 'Pending'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ticket Information */}
                {currentOrder.ticket && (
                    <div className="details-card ticket-card">
                        <div className="card-header">
                            <div className="card-icon ticket-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <h3>Support Ticket</h3>
                            {getTicketStatusBadge(currentOrder.ticket.status)}
                        </div>
                        <div className="card-content">
                            <div className="ticket-info">
                                <div className="info-row">
                                    <span className="label">Ticket ID:</span>
                                    <span className="value">{currentOrder.ticket.id}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Created By:</span>
                                    <span className="value ticket-creator">
                                        {currentOrder.ticket.createdBy === 'customer' ? 'Customer' :
                                            currentOrder.ticket.createdBy === 'seller' ? 'Seller' : 'Customer Service'}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Reason:</span>
                                    <span className="value">{currentOrder.ticket.reason}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Description:</span>
                                    <span className="value">{currentOrder.ticket.description}</span>
                                </div>
                                {currentOrder.ticket.priority && (
                                    <div className="info-row">
                                        <span className="label">Priority:</span>
                                        <span className={`value priority-${currentOrder.ticket.priority}`}>
                                            {currentOrder.ticket.priority.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                {currentOrder.ticket.createdAt && (
                                    <div className="info-row">
                                        <span className="label">Created:</span>
                                        <span className="value">{currentOrder.ticket.createdAt}</span>
                                    </div>
                                )}
                            </div>

                            {/* Ticket Messages */}
                            {currentOrder.ticket.messages && currentOrder.ticket.messages.length > 0 && (
                                <div className="ticket-messages">
                                    <h4>Ticket History</h4>
                                    <div className="messages-list">
                                        {currentOrder.ticket.messages.map((message) => (
                                            <div key={message.id} className={`message-item ${message.type}`}>
                                                <div className="message-header">
                                                    <span className="message-sender">{message.sender}</span>
                                                    <span className="message-time">{message.timestamp}</span>
                                                </div>
                                                <div className="message-content">{message.message}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="ticket-actions">
                                <button
                                    className="ticket-action-btn primary"
                                    onClick={() => setShowContactModal(true)}
                                    disabled={isLoading}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span>Contact Customer</span>
                                </button>

                                {currentOrder.ticket.status === 'open' ? (
                                    <button
                                        className="ticket-action-btn secondary"
                                        onClick={handleResolveTicket}
                                        disabled={isLoading}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{isLoading ? 'Resolving...' : 'Mark as Resolved'}</span>
                                    </button>
                                ) : (
                                    <button
                                        className="ticket-action-btn warning"
                                        onClick={handleReopenTicket}
                                        disabled={isLoading}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span>Reopen Ticket</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {!currentOrder.ticket && (
                    <div className="details-card no-ticket-card">
                        <div className="card-header">
                            <div className="card-icon no-ticket-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3>Support Status</h3>
                        </div>
                        <div className="card-content">
                            <div className="no-ticket-message">
                                <p>No support tickets have been created for this order.</p>
                                <button
                                    className="create-ticket-btn"
                                    onClick={() => setShowTicketForm(true)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Create Support Ticket</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Ticket Modal */}
            {showTicketForm && (
                <div className="modal-overlay" onClick={() => setShowTicketForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create Support Ticket</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowTicketForm(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleCreateTicket} className="modal-body">
                            <div className="form-group">
                                <label htmlFor="reason">Reason *</label>
                                <select
                                    id="reason"
                                    value={ticketForm.reason}
                                    onChange={(e) => setTicketForm({ ...ticketForm, reason: e.target.value })}
                                    required
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Product quality issue">Product quality issue</option>
                                    <option value="Delivery problem">Delivery problem</option>
                                    <option value="Wrong item received">Wrong item received</option>
                                    <option value="Damaged item">Damaged item</option>
                                    <option value="Refund request">Refund request</option>
                                    <option value="Order cancellation">Order cancellation</option>
                                    <option value="Payment issue">Payment issue</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    value={ticketForm.priority}
                                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    value={ticketForm.description}
                                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                                    placeholder="Please provide detailed information about the issue..."
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowTicketForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating...' : 'Create Ticket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Contact Customer Modal */}
            {showContactModal && (
                <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Contact Customer</h3>
                            <button
                                className="modal-close"
                                onClick={() => setShowContactModal(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleContactCustomer} className="modal-body">
                            <div className="customer-info">
                                <p><strong>Customer:</strong> {currentOrder.customer.name}</p>
                                <p><strong>Email:</strong> {currentOrder.customer.email}</p>
                                <p><strong>Phone:</strong> {currentOrder.customer.phone}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactMessage">Message *</label>
                                <textarea
                                    id="contactMessage"
                                    value={contactMessage}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                    placeholder="Type your message to the customer..."
                                    rows="5"
                                    required
                                />
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowContactModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OrderDetails