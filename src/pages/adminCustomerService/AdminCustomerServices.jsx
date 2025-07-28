import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AdminCustomerServiceNavbar from '../../components/adminCustomerService/adminCustomerServiceNavbar/AdminCustomerServiceNavbar'
import AdminCustomerServiceSidebar from '../../components/adminCustomerService/adminCustomerServiceSidebar/AdminCustomerServiceSidebar'
import AdminOrderDetails from './adminOrderDetails/AdminOrderDetails'
import CustomerServiceUsers from './customerServiceUsers/CustomerServiceUsers'
import './AdminCustomerServices.scss'

const AdminCustomerServices = () => {
    const location = useLocation()
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [ticketFilter, setTicketFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(10)
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false)
    const [newTicketForm, setNewTicketForm] = useState({
        orderNumber: '',
        reason: '',
        description: '',
        priority: 'medium',
        createdBy: 'customerService'
    })

    // Sidebar state management
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            // Changed breakpoint: treat tablets as mobile for sidebar behavior
            const mobile = window.innerWidth <= 1024 // Changed from 768 to 1024
            setIsMobile(mobile)

            // Only auto-collapse on true desktop screens
            if (window.innerWidth > 1024) {
                // Reset mobile states when on desktop
                setIsSidebarOpen(false)
            } else {
                // Reset desktop states when on mobile/tablet
                setIsSidebarCollapsed(false)
                setIsSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Add/remove body class when sidebar is open on mobile/tablet
    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            document.body.classList.add('sidebar-open')
        } else {
            document.body.classList.remove('sidebar-open')
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('sidebar-open')
        }
    }, [isMobile, isSidebarOpen])

    // Handle sidebar toggle from navbar
    const handleToggleSidebar = () => {
        if (isMobile) {
            // Mobile/Tablet behavior: toggle overlay sidebar
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            // Desktop behavior: toggle collapse/expand
            setIsSidebarCollapsed(!isSidebarCollapsed)
        }
    }

    // Close mobile sidebar
    const handleCloseMobileSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    // Close mobile sidebar when clicking on main content
    const handleMainContentClick = () => {
        if (isMobile && isSidebarOpen) {
            setIsSidebarOpen(false)
        }
    }

    // Sample orders data - now with delivery drivers
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
            deliveryDriver: {
                id: 'D001',
                name: 'Mike Rodriguez',
                phone: '+1-555-0789',
                vehicleType: 'Motorcycle'
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
            deliveryDriver: {
                id: 'D002',
                name: 'Sarah Chen',
                phone: '+1-555-0234',
                vehicleType: 'Van'
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
            deliveryDriver: {
                id: 'D003',
                name: 'Alex Thompson',
                phone: '+1-555-0567',
                vehicleType: 'Car'
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
        // Add more sample orders with tickets
        ...Array.from({ length: 8 }, (_, i) => ({
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
            deliveryDriver: {
                id: `D00${i + 4}`,
                name: ['John Smith', 'Emma Wilson', 'Carlos Garcia', 'Lisa Martinez'][i % 4],
                phone: `+1-555-0${String(i + 700).slice(-3)}`,
                vehicleType: ['Motorcycle', 'Car', 'Van', 'Bicycle'][i % 4]
            },
            items: [
                { name: `Product ${i + 1}`, quantity: Math.ceil(Math.random() * 3), price: (Math.random() * 50 + 10).toFixed(2) }
            ],
            totalAmount: (Math.random() * 200 + 20).toFixed(2),
            status: ['processing', 'delivered', 'cancelled', 'done'][i % 4],
            orderDate: `2024-01-${String(i + 10).padStart(2, '0')}`,
            deliveryDate: i % 3 === 0 ? `2024-01-${String(i + 11).padStart(2, '0')}` : null,
            ticket: {
                id: `T-${String(i + 6).padStart(3, '0')}`,
                createdBy: ['customer', 'seller', 'customerService'][i % 3],
                reason: ['Product quality issue', 'Delivery problem', 'Refund request', 'Wrong item', 'Late delivery'][i % 5],
                status: ['open', 'resolved', 'closed'][i % 3],
                description: `Sample ticket description ${i + 1}`,
                priority: ['low', 'medium', 'high'][i % 3],
                createdAt: `2024-01-${String(i + 10).padStart(2, '0')}`,
                messages: []
            }
        }))
    ])

    // Filter orders to only show those with tickets
    const ordersWithTickets = orders.filter(order => order.ticket !== null)

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

    const filteredOrders = ordersWithTickets.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.deliveryDriver.name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter

        let matchesTicket = true
        switch (ticketFilter) {
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

    const handleCreateTicket = () => {
        setShowCreateTicketModal(true)
    }

    const handleCloseModal = () => {
        setShowCreateTicketModal(false)
        setNewTicketForm({
            orderNumber: '',
            reason: '',
            description: '',
            priority: 'medium',
            createdBy: 'customerService'
        })
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setNewTicketForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmitTicket = (e) => {
        e.preventDefault()

        // Find the order by order number
        const targetOrder = orders.find(order => order.orderNumber === newTicketForm.orderNumber)

        if (!targetOrder) {
            alert('Order not found!')
            return
        }

        if (targetOrder.ticket) {
            alert('This order already has a ticket!')
            return
        }

        // Create new ticket
        const newTicket = {
            id: `T-${String(orders.length + 1).padStart(3, '0')}`,
            createdBy: newTicketForm.createdBy,
            reason: newTicketForm.reason,
            status: 'open',
            description: newTicketForm.description,
            priority: newTicketForm.priority,
            createdAt: new Date().toISOString().split('T')[0],
            messages: []
        }

        // Update the order with the new ticket
        const updatedOrder = {
            ...targetOrder,
            ticket: newTicket
        }

        handleUpdateOrder(updatedOrder)
        handleCloseModal()
        alert('Ticket created successfully!')
    }

    // Check if we're viewing order details
    if (selectedOrder) {
        return (
            <div className="admin-cs-layout">
                <AdminCustomerServiceNavbar
                    onToggleSidebar={handleToggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <div className="admin-cs-content">
                    <AdminCustomerServiceSidebar
                        isCollapsed={isSidebarCollapsed}
                        isMobile={isMobile}
                        isOpen={isSidebarOpen}
                        onClose={handleCloseMobileSidebar}
                    />

                    <main
                        className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                        onClick={handleMainContentClick}
                    >
                        <AdminOrderDetails
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

    // Main dashboard component
    const Dashboard = () => (
        <main
            className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
            onClick={handleMainContentClick}
        >
            <div className='dashboard-main-page'>
                <div className="dashboard-header">
                    <div className="header-title">
                        <h1>Admin Customer Service Dashboard</h1>
                        <p>Manage orders with support tickets</p>
                    </div>

                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{ordersWithTickets.length}</div>
                                <div className="stat-label">Orders with Tickets</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{ordersWithTickets.filter(o => o.ticket && o.ticket.status === 'open').length}</div>
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
                                <div className="stat-number">{ordersWithTickets.filter(o => o.ticket && o.ticket.status === 'resolved').length}</div>
                                <div className="stat-label">Resolved</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="stat-content">
                                <div className="stat-number">{ordersWithTickets.filter(o => o.ticket && o.ticket.status === 'closed').length}</div>
                                <div className="stat-label">Closed Tickets</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="orders-section">
                    <div className="section-header">
                        <h2>Orders with Tickets</h2>

                        <div className="header-actions">
                            <button className="create-ticket-btn" onClick={handleCreateTicket}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create New Ticket
                            </button>

                            <div className="filters">
                                <div className="search-box">
                                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search orders, sellers, customers, drivers..."
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
                                    <option value="open-ticket">Open Tickets</option>
                                    <option value="resolved-ticket">Resolved Tickets</option>
                                    <option value="closed-ticket">Closed Tickets</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="table-container">
                        <div className="orders-table">
                            <div className="table-header">
                                <div className="header-cell">Order</div>
                                <div className="header-cell">Seller</div>
                                <div className="header-cell">Customer</div>
                                <div className="header-cell">Driver</div>
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
                                            <div className="driver-info">
                                                <div className="driver-name">{order.deliveryDriver.name}</div>
                                                <div className="driver-vehicle">{order.deliveryDriver.vehicleType}</div>
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
            </div>

            {/* Create Ticket Modal */}
            {showCreateTicketModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Create New Ticket</h3>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmitTicket} className="ticket-form">
                            <div className="form-group">
                                <label htmlFor="orderNumber">Order Number</label>
                                <input
                                    type="text"
                                    id="orderNumber"
                                    name="orderNumber"
                                    value={newTicketForm.orderNumber}
                                    onChange={handleFormChange}
                                    placeholder="Enter order number (e.g., 12345)"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reason">Reason</label>
                                <select
                                    id="reason"
                                    name="reason"
                                    value={newTicketForm.reason}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Product quality issue">Product quality issue</option>
                                    <option value="Delivery problem">Delivery problem</option>
                                    <option value="Wrong item">Wrong item</option>
                                    <option value="Damaged item">Damaged item</option>
                                    <option value="Late delivery">Late delivery</option>
                                    <option value="Refund request">Refund request</option>
                                    <option value="Customer complaint">Customer complaint</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={newTicketForm.priority}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={newTicketForm.description}
                                    onChange={handleFormChange}
                                    placeholder="Describe the issue in detail..."
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Create Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    )

    return (
        <div className="admin-cs-layout">
            <AdminCustomerServiceNavbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="admin-cs-content">
                <AdminCustomerServiceSidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={
                        <main
                            className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                            onClick={handleMainContentClick}
                        >
                            <CustomerServiceUsers />
                        </main>
                    } />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminCustomerServices