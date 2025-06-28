import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './OrdersManagement.scss'

const OrdersManagement = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage, setOrdersPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Mock data - replace with actual API call
    const mockOrders = [
        {
            id: 'ORD12345',
            orderNumber: '#12345',
            productCount: 3,
            sellers: [
                { id: 'SEL001', name: 'Tech Paradise' },
                { id: 'SEL002', name: 'Fashion Hub' }
            ],
            customer: { id: 'USR001', name: 'Alice Johnson' },
            orderDate: '2024-06-25',
            status: 'delivered',
            driver: { id: 'DRV001', name: 'Michael Johnson' },
            orderValue: 299.99,
            shippingAddress: '123 Maple Street, New York, NY 10001',
            trackingNumber: 'TRK123456789'
        },
        {
            id: 'ORD12344',
            orderNumber: '#12344',
            productCount: 2,
            sellers: [
                { id: 'SEL003', name: 'Home Essentials' }
            ],
            customer: { id: 'USR002', name: 'Bob Smith' },
            orderDate: '2024-06-24',
            status: 'processing',
            driver: { id: 'DRV002', name: 'Sarah Wilson' },
            orderValue: 189.50,
            shippingAddress: '456 Oak Avenue, Los Angeles, CA 90210',
            trackingNumber: 'TRK123456788'
        },
        {
            id: 'ORD12343',
            orderNumber: '#12343',
            productCount: 1,
            sellers: [
                { id: 'SEL004', name: 'Beauty Corner' }
            ],
            customer: { id: 'USR003', name: 'Carol Davis' },
            orderDate: '2024-06-24',
            status: 'pending',
            driver: null,
            orderValue: 79.99,
            shippingAddress: '789 Pine Road, Chicago, IL 60601',
            trackingNumber: null
        },
        {
            id: 'ORD12342',
            orderNumber: '#12342',
            productCount: 5,
            sellers: [
                { id: 'SEL001', name: 'Tech Paradise' },
                { id: 'SEL005', name: 'Sports Zone' }
            ],
            customer: { id: 'USR004', name: 'David Wilson' },
            orderDate: '2024-06-23',
            status: 'delivered',
            driver: { id: 'DRV003', name: 'Carlos Rodriguez' },
            orderValue: 445.75,
            shippingAddress: '321 Elm Street, Houston, TX 77001',
            trackingNumber: 'TRK123456787'
        },
        {
            id: 'ORD12341',
            orderNumber: '#12341',
            productCount: 2,
            sellers: [
                { id: 'SEL006', name: 'Book Store' }
            ],
            customer: { id: 'USR005', name: 'Emily Brown' },
            orderDate: '2024-06-23',
            status: 'cancelled',
            driver: null,
            orderValue: 45.99,
            shippingAddress: '654 Cedar Lane, Phoenix, AZ 85001',
            trackingNumber: null
        },
        {
            id: 'ORD12340',
            orderNumber: '#12340',
            productCount: 4,
            sellers: [
                { id: 'SEL002', name: 'Fashion Hub' },
                { id: 'SEL004', name: 'Beauty Corner' }
            ],
            customer: { id: 'USR006', name: 'Frank Miller' },
            orderDate: '2024-06-22',
            status: 'accepted',
            driver: { id: 'DRV004', name: 'Emma Davis' },
            orderValue: 234.50,
            shippingAddress: '987 Birch Drive, Philadelphia, PA 19101',
            trackingNumber: 'TRK123456786'
        },
        {
            id: 'ORD12339',
            orderNumber: '#12339',
            productCount: 1,
            sellers: [
                { id: 'SEL003', name: 'Home Essentials' }
            ],
            customer: { id: 'USR007', name: 'Grace Taylor' },
            orderDate: '2024-06-22',
            status: 'rejected',
            driver: null,
            orderValue: 129.99,
            shippingAddress: '159 Walnut Street, San Antonio, TX 78201',
            trackingNumber: null
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setOrders(mockOrders)
            setFilteredOrders(mockOrders)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = orders

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.sellers.some(seller => seller.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (order.driver && order.driver.name.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter)
        }

        setFilteredOrders(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, orders])

    // Pagination
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

    const handleViewOrder = (orderId) => {
        navigate(`/admin/orders/details/${orderId}`)
    }

    const handleAcceptOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to accept this order?')) {
            // API call to accept order
            setOrders(orders.map(order =>
                order.id === orderId
                    ? { ...order, status: 'accepted' }
                    : order
            ))
        }
    }

    const handleRejectOrder = async (orderId) => {
        const reason = window.prompt('Please provide a reason for rejecting this order:')
        if (reason) {
            // API call to reject order with reason
            setOrders(orders.map(order =>
                order.id === orderId
                    ? { ...order, status: 'rejected' }
                    : order
            ))
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getTotalRevenue = () => {
        return orders.filter(o => o.status === 'delivered').reduce((sum, order) => sum + order.orderValue, 0)
    }

    if (loading) {
        return (
            <div className="orders-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="orders-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Orders Management</h1>
                    <p>Monitor and manage all customer orders across the platform</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{orders.filter(o => o.status === 'pending').length}</span>
                        <span className="stat-label">Pending Orders</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{orders.filter(o => o.status === 'processing').length}</span>
                        <span className="stat-label">Processing</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{orders.filter(o => o.status === 'delivered').length}</span>
                        <span className="stat-label">Delivered</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">${getTotalRevenue().toLocaleString()}</span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="orders-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search orders, customers, sellers..."
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
                            <option value="accepted">Accepted</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                        </span>
                        <select
                            value={ordersPerPage}
                            onChange={(e) => setOrdersPerPage(Number(e.target.value))}
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
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Products</th>
                                <th>Customer</th>
                                <th>Sellers</th>
                                <th>Driver</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Order Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td className="order-id">
                                        <div className="order-info">
                                            <span className="order-number">{order.orderNumber}</span>
                                            <span className="order-tracking">
                                                {order.trackingNumber ? order.trackingNumber : 'No tracking'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="products-count">
                                        <span className="product-count-badge">{order.productCount} items</span>
                                    </td>
                                    <td className="customer">
                                        <div className="customer-info">
                                            <span className="customer-name">{order.customer.name}</span>
                                            <span className="customer-id">ID: {order.customer.id}</span>
                                        </div>
                                    </td>
                                    <td className="sellers">
                                        <div className="sellers-list">
                                            {order.sellers.map((seller, index) => (
                                                <div key={seller.id} className="seller-item">
                                                    <span className="seller-name">{seller.name}</span>
                                                    <span className="seller-id">ID: {seller.id}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="driver">
                                        {order.driver ? (
                                            <div className="driver-info">
                                                <span className="driver-name">{order.driver.name}</span>
                                                <span className="driver-id">ID: {order.driver.id}</span>
                                            </div>
                                        ) : (
                                            <span className="no-driver">Not assigned</span>
                                        )}
                                    </td>
                                    <td className="order-date">{formatDate(order.orderDate)}</td>
                                    <td className="status">{getStatusBadge(order.status)}</td>
                                    <td className="order-value">
                                        <span className="amount">${order.orderValue.toLocaleString()}</span>
                                    </td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewOrder(order.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {order.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="action-btn action-btn--accept"
                                                        onClick={() => handleAcceptOrder(order.id)}
                                                        title="Accept Order"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="action-btn action-btn--reject"
                                                        onClick={() => handleRejectOrder(order.id)}
                                                        title="Reject Order"
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

export default OrdersManagement