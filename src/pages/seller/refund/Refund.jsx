import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search, Filter, Eye, Check, X, Calendar,
    CheckSquare, Square, ChevronDown, DollarSign,
    Package, Clock, CheckCircle, XCircle, AlertCircle,
    RefreshCw, CreditCard, User, MessageSquare,
    ArrowUpDown, Download, Printer
} from 'lucide-react'
import './Refund.scss'

const Refund = () => {
    const navigate = useNavigate()
    const [selectedRefunds, setSelectedRefunds] = useState([])
    const [filters, setFilters] = useState({
        status: '',
        reason: '',
        dateFrom: '',
        dateTo: '',
        search: ''
    })
    const [showActionModal, setShowActionModal] = useState(false)
    const [actionType, setActionType] = useState('')
    const [refundToAction, setRefundToAction] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Mock data for refunds
    const mockRefunds = [
        {
            id: 1,
            refundNumber: 'REF-001',
            orderNumber: 'ORD-001',
            status: 'pending',
            reason: 'damaged_product',
            customReason: 'Product arrived with scratches on the screen',
            customerName: 'John Smith',
            customerEmail: 'john.smith@email.com',
            refundAmount: 199.98,
            originalAmount: 224.97,
            requestDate: '2025-06-23',
            processedDate: null,
            method: 'original_payment',
            items: [
                { name: 'Wireless Headphones', quantity: 2, price: 99.99, refunding: 2 }
            ]
        },
        {
            id: 2,
            refundNumber: 'REF-002',
            orderNumber: 'ORD-002',
            status: 'approved',
            reason: 'not_as_described',
            customReason: 'Size was different than advertised',
            customerName: 'Jane Doe',
            customerEmail: 'jane.doe@email.com',
            refundAmount: 89.97,
            originalAmount: 89.97,
            requestDate: '2025-06-22',
            processedDate: '2025-06-23',
            method: 'original_payment',
            items: [
                { name: 'Organic T-Shirt', quantity: 3, price: 29.99, refunding: 3 }
            ]
        },
        {
            id: 3,
            refundNumber: 'REF-003',
            orderNumber: 'ORD-003',
            status: 'rejected',
            reason: 'changed_mind',
            customReason: 'No longer needed',
            customerName: 'Mike Johnson',
            customerEmail: 'mike.johnson@email.com',
            refundAmount: 299.99,
            originalAmount: 339.97,
            requestDate: '2025-06-21',
            processedDate: '2025-06-23',
            method: 'original_payment',
            items: [
                { name: 'Smart Watch', quantity: 1, price: 299.99, refunding: 1 }
            ]
        },
        {
            id: 4,
            refundNumber: 'REF-004',
            orderNumber: 'ORD-005',
            status: 'processing',
            reason: 'defective',
            customReason: 'Keys are not responding properly',
            customerName: 'Sarah Wilson',
            customerEmail: 'sarah.wilson@email.com',
            refundAmount: 149.99,
            originalAmount: 149.99,
            requestDate: '2025-06-24',
            processedDate: null,
            method: 'store_credit',
            items: [
                { name: 'Gaming Keyboard', quantity: 1, price: 149.99, refunding: 1 }
            ]
        }
    ]

    const refundStatuses = ['All', 'Pending', 'Approved', 'Rejected', 'Processing']
    const refundReasons = [
        'All Reasons', 'Damaged Product', 'Not as Described',
        'Defective', 'Changed Mind', 'Wrong Item', 'Other'
    ]

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { class: 'status--pending', icon: <Clock size={12} />, text: 'Pending' },
            approved: { class: 'status--approved', icon: <CheckCircle size={12} />, text: 'Approved' },
            rejected: { class: 'status--rejected', icon: <XCircle size={12} />, text: 'Rejected' },
            processing: { class: 'status--processing', icon: <RefreshCw size={12} />, text: 'Processing' }
        }

        const config = statusConfig[status] || statusConfig.pending
        return (
            <span className={`status-badge ${config.class}`}>
                {config.icon}
                {config.text}
            </span>
        )
    }

    const getReasonBadge = (reason) => {
        const reasonConfig = {
            damaged_product: { class: 'reason--damaged', text: 'Damaged' },
            not_as_described: { class: 'reason--description', text: 'Not as Described' },
            defective: { class: 'reason--defective', text: 'Defective' },
            changed_mind: { class: 'reason--changed', text: 'Changed Mind' },
            wrong_item: { class: 'reason--wrong', text: 'Wrong Item' },
            other: { class: 'reason--other', text: 'Other' }
        }

        const config = reasonConfig[reason] || reasonConfig.other
        return (
            <span className={`reason-badge ${config.class}`}>
                {config.text}
            </span>
        )
    }

    const formatCustomerInfo = (refund) => {
        return (
            <div className="customer-info">
                <div className="customer-name">{refund.customerName}</div>
                <div className="customer-email">{refund.customerEmail}</div>
            </div>
        )
    }

    const formatItems = (items) => {
        if (items.length === 1) {
            return `${items[0].refunding}x ${items[0].name}`
        }
        return `${items.length} items (${items.reduce((total, item) => total + item.refunding, 0)} qty)`
    }

    const handleSelectAll = () => {
        if (selectedRefunds.length === mockRefunds.length) {
            setSelectedRefunds([])
        } else {
            setSelectedRefunds(mockRefunds.map(r => r.id))
        }
    }

    const handleSelectRefund = (refundId) => {
        setSelectedRefunds(prev =>
            prev.includes(refundId)
                ? prev.filter(id => id !== refundId)
                : [...prev, refundId]
        )
    }

    const handleAction = (refund, action) => {
        setRefundToAction(refund)
        setActionType(action)
        setShowActionModal(true)
    }

    const confirmAction = () => {
        console.log(`${actionType} refund:`, refundToAction)
        setShowActionModal(false)
        setRefundToAction(null)
        setActionType('')
    }

    const getActionButtons = (refund) => {
        const buttons = []

        // View button for all statuses
        buttons.push(
            <button
                key="view"
                className="action-btn view-btn"
                onClick={() => navigate(`/seller/orders/view/${refund.orderNumber.split('-')[1]}`)}
                title="View Order"
            >
                <Eye size={16} />
            </button>
        )

        // Additional actions based on status
        if (refund.status === 'pending') {
            buttons.push(
                <button
                    key="approve"
                    className="action-btn approve-btn"
                    onClick={() => handleAction(refund, 'approve')}
                    title="Approve Refund"
                >
                    <Check size={16} />
                </button>
            )
            buttons.push(
                <button
                    key="reject"
                    className="action-btn reject-btn"
                    onClick={() => handleAction(refund, 'reject')}
                    title="Reject Refund"
                >
                    <X size={16} />
                </button>
            )
        }

        return buttons
    }

    const filteredRefunds = mockRefunds.filter(refund => {
        const statusFilter = filters.status === '' ||
            filters.status === 'All' ||
            refund.status === filters.status.toLowerCase()

        const reasonFilter = filters.reason === '' ||
            filters.reason === 'All Reasons' ||
            refund.reason === filters.reason.toLowerCase().replace(' ', '_')

        const searchFilter = filters.search === '' ||
            refund.refundNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            refund.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            refund.customerName.toLowerCase().includes(filters.search.toLowerCase())

        const dateFromFilter = filters.dateFrom === '' || new Date(refund.requestDate) >= new Date(filters.dateFrom)
        const dateToFilter = filters.dateTo === '' || new Date(refund.requestDate) <= new Date(filters.dateTo)

        return statusFilter && reasonFilter && searchFilter && dateFromFilter && dateToFilter
    })

    const totalRefunds = filteredRefunds.length
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalRefunds)
    const currentRefunds = filteredRefunds.slice(startIndex, endIndex)

    return (
        <div className="refund-page">
            {/* Header */}
            <div className="refund-header">
                <h1>Refund Management</h1>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-value">{mockRefunds.filter(r => r.status === 'pending').length}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{mockRefunds.filter(r => r.status === 'processing').length}</span>
                        <span className="stat-label">Processing</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{mockRefunds.filter(r => r.status === 'approved').length}</span>
                        <span className="stat-label">Approved</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            ${mockRefunds.filter(r => r.status === 'approved').reduce((total, r) => total + r.refundAmount, 0).toFixed(0)}
                        </span>
                        <span className="stat-label">Total Refunded</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="refund-filters">
                <div className="filters-left">
                    <span className="refunds-count">
                        Showing {startIndex + 1}-{endIndex} of {totalRefunds} refunds
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
                            {refundStatuses.map(status => (
                                <option key={status} value={status === 'All' ? '' : status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.reason}
                            onChange={(e) => setFilters(prev => ({ ...prev, reason: e.target.value }))}
                            className="filter-select"
                        >
                            {refundReasons.map(reason => (
                                <option key={reason} value={reason === 'All Reasons' ? '' : reason}>
                                    {reason}
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
                            placeholder="Search refunds, orders, customers..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Refunds Table */}
            <div className="refund-table-container">
                <table className="refund-table">
                    <thead>
                        <tr>
                            <th className="select-column">
                                <button onClick={handleSelectAll} className="select-all-btn">
                                    {selectedRefunds.length === mockRefunds.length ?
                                        <CheckSquare size={18} /> :
                                        <Square size={18} />
                                    }
                                </button>
                            </th>
                            <th>Refund</th>
                            <th>Order</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Reason</th>
                            <th>Amount</th>
                            <th>Request Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRefunds.map(refund => (
                            <tr key={refund.id} className="refund-row">
                                <td className="select-column">
                                    <button
                                        onClick={() => handleSelectRefund(refund.id)}
                                        className="select-btn"
                                    >
                                        {selectedRefunds.includes(refund.id) ?
                                            <CheckSquare size={18} /> :
                                            <Square size={18} />
                                        }
                                    </button>
                                </td>
                                <td className="refund-column">
                                    <div className="refund-info">
                                        <span className="refund-number">{refund.refundNumber}</span>
                                        {getStatusBadge(refund.status)}
                                    </div>
                                </td>
                                <td className="order-column">
                                    <span className="order-number">{refund.orderNumber}</span>
                                </td>
                                <td className="customer-column">
                                    {formatCustomerInfo(refund)}
                                </td>
                                <td className="items-column">
                                    <span className="items-summary">{formatItems(refund.items)}</span>
                                </td>
                                <td className="reason-column">
                                    <div className="reason-info">
                                        {getReasonBadge(refund.reason)}
                                        {refund.customReason && (
                                            <div className="custom-reason">{refund.customReason}</div>
                                        )}
                                    </div>
                                </td>
                                <td className="amount-column">
                                    <div className="amount-info">
                                        <span className="refund-amount">${refund.refundAmount.toFixed(2)}</span>
                                        <span className="original-amount">of ${refund.originalAmount.toFixed(2)}</span>
                                    </div>
                                </td>
                                <td className="date-column">
                                    <div className="date-info">
                                        <Calendar size={12} />
                                        {new Date(refund.requestDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="actions-column">
                                    <div className="actions">
                                        {getActionButtons(refund)}
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
                        Page {currentPage} of {Math.ceil(totalRefunds / itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalRefunds / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(totalRefunds / itemsPerPage)}
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
                        <h3>Confirm {actionType === 'approve' ? 'Approve' : 'Reject'} Refund</h3>
                        <p>
                            Are you sure you want to {actionType} refund "{refundToAction?.refundNumber}"?
                            {actionType === 'approve' && ` Amount: $${refundToAction?.refundAmount.toFixed(2)}`}
                            {actionType === 'reject' && ' This action will permanently reject this refund request.'}
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
                                {actionType === 'approve' ? 'Approve' : 'Reject'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Refund