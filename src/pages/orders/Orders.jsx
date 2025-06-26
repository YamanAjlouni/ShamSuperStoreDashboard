import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search, Filter, Eye, Check, X, Calendar,
    CheckSquare, Square, ChevronDown, MapPin,
    DollarSign, Package, Clock, CheckCircle,
    XCircle, AlertCircle, PlayCircle
} from 'lucide-react'
import './Orders.scss'

const Orders = () => {
    const navigate = useNavigate()
    const [selectedOrders, setSelectedOrders] = useState([])
    const [filters, setFilters] = useState({
        status: '',
        product: '',
        dateFrom: '',
        dateTo: '',
        search: ''
    })
    const [showActionModal, setShowActionModal] = useState(false)
    const [actionType, setActionType] = useState('')
    const [orderToAction, setOrderToAction] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Mock data for orders
    const mockOrders = [
        {
            id: 1,
            orderNumber: 'ORD-001',
            status: 'pending',
            purchased: [
                { name: 'Wireless Headphones', quantity: 2, price: 99.99 },
                { name: 'Phone Case', quantity: 1, price: 24.99 }
            ],
            billingAddress: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'USA'
            },
            shippingAddress: {
                street: '456 Oak Ave',
                city: 'Brooklyn',
                state: 'NY',
                zip: '11201',
                country: 'USA'
            },
            grossSales: 224.97,
            adminFee: 11.25,
            date: '2025-06-20',
            store: 'TechStore Pro'
        },
        {
            id: 2,
            orderNumber: 'ORD-002',
            status: 'completed',
            purchased: [
                { name: 'Organic T-Shirt', quantity: 3, price: 29.99 }
            ],
            billingAddress: {
                street: '789 Pine St',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210',
                country: 'USA'
            },
            shippingAddress: {
                street: '789 Pine St',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210',
                country: 'USA'
            },
            grossSales: 89.97,
            adminFee: 4.50,
            date: '2025-06-19',
            store: 'EcoWear'
        },
        {
            id: 3,
            orderNumber: 'ORD-003',
            status: 'processing',
            purchased: [
                { name: 'Smart Watch', quantity: 1, price: 299.99 },
                { name: 'Watch Band', quantity: 2, price: 19.99 }
            ],
            billingAddress: {
                street: '321 Elm St',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                country: 'USA'
            },
            shippingAddress: {
                street: '321 Elm St',
                city: 'Chicago',
                state: 'IL',
                zip: '60601',
                country: 'USA'
            },
            grossSales: 339.97,
            adminFee: 17.00,
            date: '2025-06-21',
            store: 'GadgetHub'
        },
        {
            id: 4,
            orderNumber: 'ORD-004',
            status: 'rejected',
            purchased: [
                { name: 'Coffee Mug', quantity: 5, price: 15.99 }
            ],
            billingAddress: {
                street: '654 Maple Ave',
                city: 'Seattle',
                state: 'WA',
                zip: '98101',
                country: 'USA'
            },
            shippingAddress: {
                street: '987 Cedar St',
                city: 'Portland',
                state: 'OR',
                zip: '97201',
                country: 'USA'
            },
            grossSales: 79.95,
            adminFee: 0,
            date: '2025-06-18',
            store: 'HomeComfort'
        },
        {
            id: 5,
            orderNumber: 'ORD-005',
            status: 'pending',
            purchased: [
                { name: 'Gaming Keyboard', quantity: 1, price: 149.99 }
            ],
            billingAddress: {
                street: '111 Tech Blvd',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102',
                country: 'USA'
            },
            shippingAddress: {
                street: '111 Tech Blvd',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102',
                country: 'USA'
            },
            grossSales: 149.99,
            adminFee: 7.50,
            date: '2025-06-22',
            store: 'GameGear'
        }
    ]

    const orderStatuses = ['All', 'Pending', 'Completed', 'Rejected', 'Processing']
    const products = ['All Products', 'Wireless Headphones', 'Organic T-Shirt', 'Smart Watch', 'Coffee Mug', 'Gaming Keyboard']

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'status--pending', icon: <Clock size={12} />, text: 'Pending' },
            completed: { class: 'status--completed', icon: <CheckCircle size={12} />, text: 'Completed' },
            processing: { class: 'status--processing', icon: <PlayCircle size={12} />, text: 'Processing' },
            rejected: { class: 'status--rejected', icon: <XCircle size={12} />, text: 'Rejected' }
        }

        const config = statusConfig[status] || statusConfig.pending
        return (
            <span className={`status-badge ${config.class}`}>
                {config.icon}
                {config.text}
            </span>
        )
    }

    const formatAddress = (address) => {
        return `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    }

    const formatPurchased = (items) => {
        if (items.length === 1) {
            return `${items[0].quantity}x ${items[0].name}`
        }
        return `${items.length} items (${items.reduce((total, item) => total + item.quantity, 0)} qty)`
    }

    const handleSelectAll = () => {
        if (selectedOrders.length === mockOrders.length) {
            setSelectedOrders([])
        } else {
            setSelectedOrders(mockOrders.map(o => o.id))
        }
    }

    const handleSelectOrder = (orderId) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        )
    }

    const handleAction = (order, action) => {
        setOrderToAction(order)
        setActionType(action)
        setShowActionModal(true)
    }

    const confirmAction = () => {
        console.log(`${actionType} order:`, orderToAction)
        setShowActionModal(false)
        setOrderToAction(null)
        setActionType('')
    }

    const getActionButtons = (order) => {
        const buttons = []

        // View button for all statuses
        buttons.push(
            <button
                key="view"
                className="action-btn view-btn"
                onClick={() => navigate(`/seller/orders/view/${order.id}`)}
                title="View Details"
            >
                <Eye size={16} />
            </button>
        )

        // Additional actions based on status
        if (order.status === 'pending') {
            buttons.push(
                <button
                    key="accept"
                    className="action-btn accept-btn"
                    onClick={() => handleAction(order, 'accept')}
                    title="Accept Order"
                >
                    <Check size={16} />
                </button>
            )
            buttons.push(
                <button
                    key="reject"
                    className="action-btn reject-btn"
                    onClick={() => handleAction(order, 'reject')}
                    title="Reject Order"
                >
                    <X size={16} />
                </button>
            )
        }

        return buttons
    }

    const filteredOrders = mockOrders.filter(order => {
        const statusFilter = filters.status === '' ||
            filters.status === 'All' ||
            order.status === filters.status.toLowerCase()

        const productFilter = filters.product === '' ||
            filters.product === 'All Products' ||
            order.purchased.some(item => item.name === filters.product)

        const searchFilter = filters.search === '' ||
            order.orderNumber.toLowerCase().includes(filters.search.toLowerCase())

        const dateFromFilter = filters.dateFrom === '' || new Date(order.date) >= new Date(filters.dateFrom)
        const dateToFilter = filters.dateTo === '' || new Date(order.date) <= new Date(filters.dateTo)

        return statusFilter && productFilter && searchFilter && dateFromFilter && dateToFilter
    })

    const totalOrders = filteredOrders.length
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalOrders)
    const currentOrders = filteredOrders.slice(startIndex, endIndex)

    return (
        <div className="orders-page">
            {/* Header */}
            <div className="orders-header">
                <h1>Orders</h1>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-value">{mockOrders.filter(o => o.status === 'pending').length}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{mockOrders.filter(o => o.status === 'processing').length}</span>
                        <span className="stat-label">Processing</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{mockOrders.filter(o => o.status === 'completed').length}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="orders-filters">
                <div className="filters-left">
                    <span className="orders-count">
                        Showing {startIndex + 1}-{endIndex} of {totalOrders} orders
                    </span>
                </div>

                <div className="filters-center">
                    <div className="filter-group">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="filter-select"
                        >
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="filter-select"
                        >
                            {orderStatuses.map(status => (
                                <option key={status} value={status === 'All' ? '' : status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.product}
                            onChange={(e) => setFilters(prev => ({ ...prev, product: e.target.value }))}
                            className="filter-select"
                        >
                            {products.map(product => (
                                <option key={product} value={product === 'All Products' ? '' : product}>
                                    {product}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="date-range-filter">
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                            className="date-input"
                            placeholder="From"
                        />
                        <span className="date-separator">to</span>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                            className="date-input"
                            placeholder="To"
                        />
                    </div>
                </div>

                <div className="filters-right">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by order number..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th className="select-column">
                                <button onClick={handleSelectAll} className="select-all-btn">
                                    {selectedOrders.length === mockOrders.length ?
                                        <CheckSquare size={18} /> :
                                        <Square size={18} />
                                    }
                                </button>
                            </th>
                            <th>Order</th>
                            <th>Purchased</th>
                            <th>Billing Address</th>
                            <th>Shipping Address</th>
                            <th>Gross Sales</th>
                            <th>Admin Fee</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id} className="order-row">
                                <td className="select-column">
                                    <button
                                        onClick={() => handleSelectOrder(order.id)}
                                        className="select-btn"
                                    >
                                        {selectedOrders.includes(order.id) ?
                                            <CheckSquare size={18} /> :
                                            <Square size={18} />
                                        }
                                    </button>
                                </td>
                                <td className="order-column">
                                    <div className="order-info">
                                        <span className="order-number">{order.orderNumber}</span>
                                        {getStatusBadge(order.status)}
                                    </div>
                                </td>
                                <td className="purchased-column">
                                    <div className="purchased-info">
                                        <span className="items-summary">{formatPurchased(order.purchased)}</span>
                                        <span className="store-name">{order.store}</span>
                                    </div>
                                </td>
                                <td className="address-column">
                                    <div className="address">
                                        <MapPin size={12} />
                                        {formatAddress(order.billingAddress)}
                                    </div>
                                </td>
                                <td className="address-column">
                                    <div className="address">
                                        <Package size={12} />
                                        {formatAddress(order.shippingAddress)}
                                    </div>
                                </td>
                                <td className="price-column">
                                    <span className="price">${order.grossSales.toFixed(2)}</span>
                                </td>
                                <td className="price-column">
                                    <span className="fee">${order.adminFee.toFixed(2)}</span>
                                </td>
                                <td className="date-column">
                                    <div className="date-info">
                                        <Calendar size={12} />
                                        {new Date(order.date).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="actions-column">
                                    <div className="actions">
                                        {getActionButtons(order)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <div className="pagination-info">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="items-per-page"
                    >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>

                <div className="pagination-controls">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {Math.ceil(totalOrders / itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalOrders / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(totalOrders / itemsPerPage)}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Action Modal */}
            {showActionModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm {actionType === 'accept' ? 'Accept' : 'Reject'} Order</h3>
                        <p>
                            Are you sure you want to {actionType} order "{orderToAction?.orderNumber}"?
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
                                className={`${actionType}-btn`}
                                onClick={confirmAction}
                            >
                                {actionType === 'accept' ? 'Accept' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Orders