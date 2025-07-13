import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PaymentsManagement.scss'

const PaymentsManagement = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)
    const [paymentMethods, setPaymentMethods] = useState([])
    const [cashTransactions, setCashTransactions] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [showAddCashPayment, setShowAddCashPayment] = useState(false)
    const [newPaymentAmount, setNewPaymentAmount] = useState('')
    const [newPaymentDescription, setNewPaymentDescription] = useState('')
    const [newPaymentOrderId, setNewPaymentOrderId] = useState('')

    // Mock data for payment methods
    useEffect(() => {
        const fetchPaymentData = async () => {
            setLoading(true)
            setTimeout(() => {
                // Payment methods configuration
                const mockPaymentMethods = [
                    {
                        id: 'cash',
                        name: 'Cash Payment',
                        description: 'Accept cash payments on delivery',
                        icon: '💵',
                        status: 'active',
                        transactionsCount: 156,
                        totalAmount: 45670.50,
                        isAvailable: true,
                        configuration: {
                            enabled: true,
                            allowPartialPayments: true,
                            requireSignature: true
                        }
                    },
                    {
                        id: 'credit',
                        name: 'Credit Cards',
                        description: 'Accept Visa credit and debit cards',
                        icon: '💳',
                        status: 'coming_soon',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-03-15'
                    },
                    {
                        id: 'sham',
                        name: 'PaySham',
                        description: 'Accept payments through Pay Sham',
                        icon: '💵',
                        status: 'active',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-03-15'
                    },
                    {
                        id: 'paypal',
                        name: 'PayPal',
                        description: 'Accept payments through PayPal',
                        icon: '🅿️',
                        status: 'coming_soon',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-04-01'
                    },
                    {
                        id: 'apple_pay',
                        name: 'Apple Pay',
                        description: 'Accept payments through Apple Pay',
                        icon: '🍎',
                        status: 'coming_soon',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-04-15'
                    },
                    {
                        id: 'google_pay',
                        name: 'Google Pay',
                        description: 'Accept payments through Google Pay',
                        icon: '🔍',
                        status: 'coming_soon',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-04-15'
                    },
                    {
                        id: 'bank',
                        name: 'Bank Transfer',
                        description: 'Accept payments through Bank Transfer',
                        icon: '💵',
                        status: 'coming_soon',
                        transactionsCount: 0,
                        totalAmount: 0,
                        isAvailable: false,
                        estimatedLaunch: '2026-04-15'
                    }
                ]

                // Mock cash transactions
                const mockCashTransactions = [
                    {
                        id: 'TXN001',
                        orderId: 'ORD-2024-001',
                        amount: 125.50,
                        customerName: 'John Smith',
                        driverName: 'Mike Johnson',
                        status: 'completed',
                        paymentDate: '2024-01-25T14:30:00Z',
                        notes: 'Payment received on delivery',
                        address: '123 Main St, City'
                    },
                    {
                        id: 'TXN002',
                        orderId: 'ORD-2024-002',
                        amount: 89.99,
                        customerName: 'Sarah Wilson',
                        driverName: 'Tom Brown',
                        status: 'completed',
                        paymentDate: '2024-01-25T12:15:00Z',
                        notes: 'Exact amount provided',
                        address: '456 Oak Ave, City'
                    },
                    {
                        id: 'TXN003',
                        orderId: 'ORD-2024-003',
                        amount: 234.75,
                        customerName: 'Robert Davis',
                        driverName: 'Alex Wilson',
                        status: 'pending',
                        paymentDate: '2024-01-25T16:45:00Z',
                        notes: 'Awaiting delivery confirmation',
                        address: '789 Pine St, City'
                    },
                    {
                        id: 'TXN004',
                        orderId: 'ORD-2024-004',
                        amount: 67.25,
                        customerName: 'Emily Johnson',
                        driverName: 'Chris Lee',
                        status: 'completed',
                        paymentDate: '2024-01-24T18:20:00Z',
                        notes: 'Customer gave tip',
                        address: '321 Elm St, City'
                    },
                    {
                        id: 'TXN005',
                        orderId: 'ORD-2024-005',
                        amount: 156.80,
                        customerName: 'David Miller',
                        driverName: 'Sam Taylor',
                        status: 'failed',
                        paymentDate: '2024-01-24T15:10:00Z',
                        notes: 'Customer not available',
                        address: '654 Maple Ave, City'
                    }
                ]

                setPaymentMethods(mockPaymentMethods)
                setCashTransactions(mockCashTransactions)
                setLoading(false)
            }, 1000)
        }

        fetchPaymentData()
    }, [])

    // Filter cash transactions
    const filteredTransactions = cashTransactions.filter(transaction => {
        const matchesSearch = transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.driverName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Pagination for transactions
    const totalTransactions = filteredTransactions.length
    const totalPages = Math.ceil(totalTransactions / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

    const handleTogglePaymentMethod = (methodId) => {
        if (methodId === 'cash') {
            setPaymentMethods(methods =>
                methods.map(method =>
                    method.id === methodId
                        ? {
                            ...method,
                            configuration: {
                                ...method.configuration,
                                enabled: !method.configuration.enabled
                            }
                        }
                        : method
                )
            )
        }
    }

    const handleAddCashPayment = () => {
        if (newPaymentAmount.trim() && newPaymentOrderId.trim()) {
            const newTransaction = {
                id: `TXN${String(Date.now()).slice(-3)}`,
                orderId: newPaymentOrderId,
                amount: parseFloat(newPaymentAmount),
                customerName: 'Manual Entry',
                driverName: 'Admin',
                status: 'completed',
                paymentDate: new Date().toISOString(),
                notes: newPaymentDescription || 'Manual cash payment entry',
                address: 'Manual Entry'
            }

            setCashTransactions([newTransaction, ...cashTransactions])
            setNewPaymentAmount('')
            setNewPaymentDescription('')
            setNewPaymentOrderId('')
            setShowAddCashPayment(false)
        }
    }

    const getStatusBadge = (status) => {
        const statusClasses = {
            completed: 'status-badge--success',
            pending: 'status-badge--warning',
            failed: 'status-badge--error',
            active: 'status-badge--success',
            coming_soon: 'status-badge--info'
        }

        const statusLabels = {
            coming_soon: 'Coming Soon'
        }

        return (
            <span className={`status-badge ${statusClasses[status]}`}>
                {statusLabels[status] || status}
            </span>
        )
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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="payments-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading payment information...</p>
                </div>
            </div>
        )
    }

    const cashMethod = paymentMethods.find(method => method.id === 'cash')
    const activeTransactions = cashTransactions.filter(t => t.status === 'completed').length
    const totalRevenue = cashTransactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0)

    return (
        <div className="payments-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Payment Management</h1>
                    <p>Manage payment methods and monitor transactions</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{paymentMethods.filter(m => m.status === 'active').length}</span>
                        <span className="stat-label">Active Methods</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{activeTransactions}</span>
                        <span className="stat-label">Completed Payments</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{formatCurrency(totalRevenue)}</span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'methods' ? 'active' : ''}`}
                        onClick={() => setActiveTab('methods')}
                    >
                        Payment Methods
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Detail Transactions
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="overview-grid">
                                <div className="overview-card">
                                    <div className="card-header">
                                        <h3>Payment Methods Status</h3>
                                    </div>
                                    <div className="methods-summary">
                                        <div className="method-summary-item active">
                                            <span className="method-icon">💵</span>
                                            <div className="method-info">
                                                <span className="method-name">Cash Payments</span>
                                                <span className="method-status">Active & Available</span>
                                            </div>
                                            <span className="method-count">{cashMethod?.transactionsCount || 0} transactions</span>
                                        </div>
                                        <div className="method-summary-item coming-soon">
                                            <span className="method-icon">💳</span>
                                            <div className="method-info">
                                                <span className="method-name">Credit Cards</span>
                                                <span className="method-status">Coming March 2026</span>
                                            </div>
                                            <span className="method-count">Visa, Mastercard</span>
                                        </div>
                                        <div className="method-summary-item coming-soon">
                                            <span className="method-icon">📱</span>
                                            <div className="method-info">
                                                <span className="method-name">PaySham</span>
                                                <span className="method-status">Coming April 2026</span>
                                            </div>
                                        </div>
                                        <div className="method-summary-item coming-soon">
                                            <span className="method-icon">📱</span>
                                            <div className="method-info">
                                                <span className="method-name">Digital Wallet</span>
                                                <span className="method-status">Coming April 2026</span>
                                            </div>
                                            {/* <span className="method-count">PayPal, Apple Pay, Google Pay</span> */}
                                        </div>
                                        <div className="method-summary-item coming-soon">
                                            <span className="method-icon">📱</span>
                                            <div className="method-info">
                                                <span className="method-name">Bank Transfer</span>
                                                <span className="method-status">Coming April 2026</span>
                                            </div>
                                            {/* <span className="method-count">PayPal, Apple Pay, Google Pay</span> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="overview-card">
                                    <div className="card-header">
                                        <h3>Recent Cash Transactions</h3>
                                    </div>
                                    <div className="recent-transactions">
                                        {cashTransactions.slice(0, 5).map((transaction) => (
                                            <div key={transaction.id} className="transaction-item">
                                                <div className="transaction-info">
                                                    <span className="transaction-order">{transaction.orderId}</span>
                                                    <span className="transaction-customer">{transaction.customerName}</span>
                                                </div>
                                                <div className="transaction-details">
                                                    <span className="transaction-amount">{formatCurrency(transaction.amount)}</span>
                                                    {getStatusBadge(transaction.status)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'methods' && (
                        <div className="tab-content">
                            <div className="payment-methods-grid">
                                {paymentMethods.map((method) => (
                                    <div key={method.id} className={`payment-method-card ${method.isAvailable ? 'available' : 'coming-soon'}`}>
                                        <div className="method-header">
                                            <div className="method-icon-large">{method.icon}</div>
                                            <div className="method-info">
                                                <h3>{method.name}</h3>
                                                <p>{method.description}</p>
                                            </div>
                                            {getStatusBadge(method.status)}
                                        </div>

                                        {method.isAvailable ? (
                                            <div className="method-stats">
                                                <div className="stat">
                                                    <span className="stat-value">{method.transactionsCount}</span>
                                                    <span className="stat-label">Transactions</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-value">{formatCurrency(method.totalAmount)}</span>
                                                    <span className="stat-label">Total Amount</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="method-coming-soon">
                                                <div className="coming-soon-info">
                                                    <span className="label">Estimated Launch:</span>
                                                    <span className="date">{new Date(method.estimatedLaunch).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="method-actions">
                                            {method.isAvailable ? (
                                                <button
                                                    className={`action-btn ${method.configuration?.enabled ? 'action-btn--deactivate' : 'action-btn--activate'}`}
                                                    onClick={() => handleTogglePaymentMethod(method.id)}
                                                >
                                                    {method.configuration?.enabled ? 'Disable' : 'Enable'}
                                                </button>
                                            ) : (
                                                <button className="action-btn action-btn--notify" disabled>
                                                    Enable
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'transactions' && (
                        <div className="tab-content">
                            <div className="transactions-controls">
                                <div className="controls-left">
                                    <div className="search-box">
                                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search transactions..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <select
                                        className="status-filter"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                </div>
                                {/* <div className="controls-right">
                                    <button
                                        className="add-btn add-btn--primary"
                                        onClick={() => setShowAddCashPayment(true)}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Cash Payment
                                    </button>
                                </div> */}
                            </div>

                            <div className="transactions-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Driver</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedTransactions.map((transaction) => (
                                            <tr key={transaction.id}>
                                                <td className="transaction-id">{transaction.id}</td>
                                                <td className="order-id">{transaction.orderId}</td>
                                                <td className="customer-name">{transaction.customerName}</td>
                                                <td className="driver-name">{transaction.driverName}</td>
                                                <td className="amount">{formatCurrency(transaction.amount)}</td>
                                                <td className="status">{getStatusBadge(transaction.status)}</td>
                                                <td className="date">{formatDate(transaction.paymentDate)}</td>
                                                <td className="notes">{transaction.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

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
                        </div>
                    )}
                </div>
            </div>

            {/* Add Cash Payment Modal */}
            {showAddCashPayment && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add Cash Payment</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddCashPayment(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Order ID</label>
                                <input
                                    type="text"
                                    value={newPaymentOrderId}
                                    onChange={(e) => setNewPaymentOrderId(e.target.value)}
                                    placeholder="Enter order ID"
                                />
                            </div>
                            <div className="form-group">
                                <label>Amount ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newPaymentAmount}
                                    onChange={(e) => setNewPaymentAmount(e.target.value)}
                                    placeholder="Enter payment amount"
                                />
                            </div>
                            <div className="form-group">
                                <label>Notes (Optional)</label>
                                <textarea
                                    value={newPaymentDescription}
                                    onChange={(e) => setNewPaymentDescription(e.target.value)}
                                    placeholder="Enter payment notes"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddCashPayment(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddCashPayment}
                            >
                                Add Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentsManagement