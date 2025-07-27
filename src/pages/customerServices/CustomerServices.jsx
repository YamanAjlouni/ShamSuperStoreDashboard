import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CustomerServiceNavbar from '../../components/customerService/customerServiceNavbar/CustomerServiceNavbar'
import OrderDetails from './orderDetails/OrderDetails'
import './CustomerServices.scss'

const CustomerServices = () => {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [ticketFilter, setTicketFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(10)

    // Sample orders data
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            orderNumber: '12345',
            seller: {
                id: 'S001',
                name: 'Fresh Market Co.',
                phone: '+1-555-0123',
                email: 'contact@freshmarket.com',
                address: '324 Main St, Damascus',
                businessType: 'Grocery Store'
            },
            customer: {
                id: 'C001',
                name: 'John Doe',
                phone: '+1-555-0456',
                email: 'john.doe@email.com',
                address: '123 Main St, New York, NY 10001'
            },
            items: [
                { name: 'Organic Apples', quantity: 2, price: 4.99 },
                { name: 'Fresh Bread', quantity: 1, price: 3.50 }
            ],
            totalAmount: 8.49,
            status: 'delivered',
            orderDate: '2024-01-15',
            deliveryDate: '2024-01-16',
            ticket: {
                id: 'T-001',
                createdBy: 'customer',
                reason: 'Product quality issue',
                status: 'open',
                description: 'Apples were not fresh as expected',
                priority: 'medium',
                createdAt: '2024-01-16',
                messages: [
                    {
                        id: 1,
                        sender: 'Customer',
                        message: 'The apples I received were not fresh',
                        timestamp: new Date().toLocaleString(),
                        type: 'inbound'
                    }
                ]
            }
        },
        {
            id: 'ORD-002',
            orderNumber: '12346',
            seller: {
                id: 'S002',
                name: 'Tech Solutions Ltd.',
                phone: '+1-555-0789',
                email: 'support@techsolutions.com',
                address: '456 Tech St, Silicon Valley',
                businessType: 'Electronics'
            },
            customer: {
                id: 'C002',
                name: 'Jane Smith',
                phone: '+1-555-0321',
                email: 'jane.smith@email.com',
                address: '456 Oak Ave, Los Angeles, CA 90210'
            },
            items: [
                { name: 'Wireless Headphones', quantity: 1, price: 79.99 },
                { name: 'Phone Case', quantity: 2, price: 15.99 }
            ],
            totalAmount: 95.98,
            status: 'processing',
            orderDate: '2024-01-20',
            deliveryDate: null,
            ticket: null
        },
        {
            id: 'ORD-003',
            orderNumber: '12347',
            seller: {
                id: 'S003',
                name: 'Fashion Hub',
                phone: '+1-555-0147',
                email: 'orders@fashionhub.com',
                address: '789 Fashion Ave, New York',
                businessType: 'Clothing'
            },
            customer: {
                id: 'C003',
                name: 'Mike Johnson',
                phone: '+1-555-0258',
                email: 'mike.j@email.com',
                address: '789 Pine St, Chicago, IL 60601'
            },
            items: [
                { name: 'Cotton T-Shirt', quantity: 3, price: 24.99 },
                { name: 'Jeans', quantity: 1, price: 49.99 }
            ],
            totalAmount: 74.98,
            status: 'cancelled',
            orderDate: '2024-01-18',
            deliveryDate: null,
            ticket: {
                id: 'T-003',
                createdBy: 'seller',
                reason: 'Out of stock',
                status: 'resolved',
                description: 'Item unavailable, refund processed',
                priority: 'high',
                createdAt: '2024-01-18',
                resolvedAt: '2024-01-19',
                messages: [
                    {
                        id: 1,
                        sender: 'Seller',
                        message: 'Item is out of stock, processing refund',
                        timestamp: new Date().toLocaleString(),
                        type: 'system'
                    }
                ]
            }
        },
        {
            id: 'ORD-004',
            orderNumber: '12348',
            seller: {
                id: 'S001',
                name: 'Fresh Market Co.',
                phone: '+1-555-0123',
                email: 'contact@freshmarket.com',
                address: '324 Main St, Damascus',
                businessType: 'Grocery Store'
            },
            customer: {
                id: 'C004',
                name: 'Sarah Wilson',
                phone: '+1-555-0369',
                email: 'sarah.w@email.com',
                address: '321 Elm St, Miami, FL 33101'
            },
            items: [
                { name: 'Organic Vegetables', quantity: 1, price: 12.99 },
                { name: 'Greek Yogurt', quantity: 4, price: 5.99 }
            ],
            totalAmount: 18.98,
            status: 'done',
            orderDate: '2024-01-22',
            deliveryDate: '2024-01-23',
            ticket: null
        },
        {
            id: 'ORD-005',
            orderNumber: '12349',
            seller: {
                id: 'S004',
                name: 'Book Store Plus',
                phone: '+1-555-0444',
                email: 'info@bookstoreplus.com',
                address: '111 Book Lane, Boston',
                businessType: 'Books & Media'
            },
            customer: {
                id: 'C005',
                name: 'David Brown',
                phone: '+1-555-0555',
                email: 'david.brown@email.com',
                address: '555 Reader St, Boston, MA 02101'
            },
            items: [
                { name: 'Programming Book', quantity: 2, price: 45.99 },
                { name: 'Notebook', quantity: 3, price: 8.99 }
            ],
            totalAmount: 118.95,
            status: 'delivered',
            orderDate: '2024-01-25',
            deliveryDate: '2024-01-26',
            ticket: {
                id: 'T-005',
                createdBy: 'customer',
                reason: 'Damaged item',
                status: 'open',
                description: 'One of the books arrived with torn pages',
                priority: 'low',
                createdAt: '2024-01-26',
                messages: [
                    {
                        id: 1,
                        sender: 'Customer',
                        message: 'The programming book has several torn pages',
                        timestamp: new Date().toLocaleString(),
                        type: 'inbound'
                    }
                ]
            }
        },
        // Add more sample orders for pagination demo
        ...Array.from({ length: 15 }, (_, i) => ({
            id: `ORD-${String(i + 6).padStart(3, '0')}`,
            orderNumber: `1235${i + 0}`,
            seller: {
                id: `S00${(i % 4) + 1}`,
                name: ['Fresh Market Co.', 'Tech Solutions Ltd.', 'Fashion Hub', 'Book Store Plus'][i % 4],
                phone: `+1-555-0${String(i + 100).slice(-3)}`,
                email: `seller${i}@example.com`,
                address: `${i + 100} Sample St, City`,
                businessType: ['Grocery Store', 'Electronics', 'Clothing', 'Books & Media'][i % 4]
            },
            customer: {
                id: `C00${i + 6}`,
                name: `Customer ${i + 6}`,
                phone: `+1-555-0${String(i + 600).slice(-3)}`,
                email: `customer${i + 6}@email.com`,
                address: `${i + 600} Customer Ave, State ${i + 10001}`
            },
            items: [
                { name: `Product ${i + 1}`, quantity: Math.ceil(Math.random() * 3), price: (Math.random() * 50 + 10).toFixed(2) }
            ],
            totalAmount: (Math.random() * 200 + 20).toFixed(2),
            status: ['processing', 'delivered', 'cancelled', 'done'][i % 4],
            orderDate: `2024-01-${String(i + 10).padStart(2, '0')}`,
            deliveryDate: i % 3 === 0 ? `2024-01-${String(i + 11).padStart(2, '0')}` : null,
            ticket: i % 3 === 0 ? {
                id: `T-${String(i + 6).padStart(3, '0')}`,
                createdBy: ['customer', 'seller', 'customerService'][i % 3],
                reason: ['Product quality issue', 'Delivery problem', 'Refund request'][i % 3],
                status: ['open', 'resolved', 'closed'][i % 3],
                description: `Sample ticket description ${i + 1}`,
                priority: ['low', 'medium', 'high'][i % 3],
                createdAt: `2024-01-${String(i + 10).padStart(2, '0')}`,
                messages: []
            } : null
        }))
    ])

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

    const getTicketBadge = (ticket) => {
        if (!ticket) {
            return <span className="ticket-badge no-ticket">No Ticket</span>
        }

        const ticketConfig = {
            open: { class: 'ticket-open', text: 'Open Ticket' },
            resolved: { class: 'ticket-resolved', text: 'Resolved' },
            closed: { class: 'ticket-closed', text: 'Closed' }
        }
        const config = ticketConfig[ticket.status] || { class: 'ticket-unknown', text: ticket.status }
        return <span className={`ticket-badge ${config.class}`}>{config.text}</span>
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter

        let matchesTicket = true
        switch (ticketFilter) {
            case 'with-ticket':
                matchesTicket = order.ticket !== null
                break
            case 'no-ticket':
                matchesTicket = order.ticket === null
                break
            case 'open-ticket':
                matchesTicket = order.ticket && order.ticket.status === 'open'
                break
            case 'resolved-ticket':
                matchesTicket = order.ticket && order.ticket.status === 'resolved'
                break
            case 'closed-ticket':
                matchesTicket = order.ticket && order.ticket.status === 'closed'
                break
            default:
                matchesTicket = true
        }

        return matchesSearch && matchesStatus && matchesTicket
    })

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
    }

    const handleBackToList = () => {
        setSelectedOrder(null)
    }

    const handleUpdateOrder = (updatedOrder) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        )
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleFiltersChange = () => {
        setCurrentPage(1) // Reset to first page when filters change
    }

    if (selectedOrder) {
        return (
            <div className="customer-services-layout">
                <CustomerServiceNavbar />
                <div className="customer-services-content">
                    <main className="main-content">
                        <OrderDetails
                            order={selectedOrder}
                            onBack={handleBackToList}
                            onUpdateOrder={handleUpdateOrder}
                        />
                    </main>
                </div>
            </div>
        )
    }

    const renderPagination = () => {
        if (totalPages <= 1) return null

        const pages = []
        const maxVisiblePages = 5
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        // Previous button
        if (currentPage > 1) {
            pages.push(
                <button
                    key="prev"
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )
        }

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    className="pagination-btn"
                    onClick={() => handlePageChange(1)}
                >
                    1
                </button>
            )
            if (startPage > 2) {
                pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>)
            }
        }

        // Visible pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            )
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>)
            }
            pages.push(
                <button
                    key={totalPages}
                    className="pagination-btn"
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            )
        }

        // Next button
        if (currentPage < totalPages) {
            pages.push(
                <button
                    key="next"
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )
        }

        return pages
    }

    return (
        <div className="customer-services-layout">
            <CustomerServiceNavbar />

            <div className="customer-services-content">
                <main className="main-content">
                    <div className="dashboard-header">
                        <div className="header-title">
                            <h1>Customer Service Dashboard</h1>
                            <p>Manage orders and support tickets</p>
                        </div>

                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">{orders.length}</div>
                                    <div className="stat-label">Total Orders</div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">{orders.filter(o => o.ticket && o.ticket.status === 'open').length}</div>
                                    <div className="stat-label">Open Tickets</div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">{orders.filter(o => o.status === 'delivered' || o.status === 'done').length}</div>
                                    <div className="stat-label">Completed</div>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="stat-content">
                                    <div className="stat-number">{orders.filter(o => o.ticket).length}</div>
                                    <div className="stat-label">Total Tickets</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="orders-section">
                        <div className="section-header">
                            <h2>Orders Management</h2>

                            <div className="filters">
                                <div className="search-box">
                                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search orders, sellers, customers..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value)
                                            handleFiltersChange()
                                        }}
                                    />
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value)
                                        handleFiltersChange()
                                    }}
                                    className="status-filter"
                                >
                                    <option value="all">All Status</option>
                                    <option value="processing">Processing</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="done">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>

                                <select
                                    value={ticketFilter}
                                    onChange={(e) => {
                                        setTicketFilter(e.target.value)
                                        handleFiltersChange()
                                    }}
                                    className="ticket-filter"
                                >
                                    <option value="all">All Tickets</option>
                                    <option value="with-ticket">With Ticket</option>
                                    <option value="no-ticket">No Ticket</option>
                                    <option value="open-ticket">Open Tickets</option>
                                    <option value="resolved-ticket">Resolved Tickets</option>
                                    <option value="closed-ticket">Closed Tickets</option>
                                </select>
                            </div>
                        </div>

                        <div className="table-container">
                            <div className="orders-table">
                                <div className="table-header">
                                    <div className="header-cell">Order</div>
                                    <div className="header-cell">Seller</div>
                                    <div className="header-cell">Customer</div>
                                    <div className="header-cell">Amount</div>
                                    <div className="header-cell">Status</div>
                                    <div className="header-cell">Ticket</div>
                                    <div className="header-cell">Actions</div>
                                </div>

                                <div className="table-body">
                                    {currentOrders.map((order) => (
                                        <div key={order.id} className="table-row">
                                            <div className="table-cell">
                                                <div className="order-info">
                                                    <div className="order-number">#{order.orderNumber}</div>
                                                    <div className="order-date">{order.orderDate}</div>
                                                </div>
                                            </div>

                                            <div className="table-cell">
                                                <div className="seller-info">
                                                    <div className="seller-name">{order.seller.name}</div>
                                                    <div className="seller-type">{order.seller.businessType}</div>
                                                </div>
                                            </div>

                                            <div className="table-cell">
                                                <div className="customer-info">
                                                    <div className="customer-name">{order.customer.name}</div>
                                                    <div className="customer-phone">{order.customer.phone}</div>
                                                </div>
                                            </div>

                                            <div className="table-cell">
                                                <div className="amount">${order.totalAmount}</div>
                                            </div>

                                            <div className="table-cell">
                                                {getStatusBadge(order.status)}
                                            </div>

                                            <div className="table-cell">
                                                {getTicketBadge(order.ticket)}
                                            </div>

                                            <div className="table-cell">
                                                <button
                                                    className="view-details-btn"
                                                    onClick={() => handleViewDetails(order)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <div className="pagination-info">
                                    Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                                </div>
                                <div className="pagination">
                                    {renderPagination()}
                                </div>
                            </div>
                        )}

                        {filteredOrders.length === 0 && (
                            <div className="no-results">
                                <div className="no-results-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3>No orders found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CustomerServices