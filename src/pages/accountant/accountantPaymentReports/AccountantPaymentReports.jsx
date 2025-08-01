import { useState } from 'react'
import './AccountantPaymentReports.scss'

const AccountantPaymentReports = () => {
    // Sample payment data - in real app this would come from API
    const [paymentData] = useState([
        { id: 1, orderNumber: 'ORD-2025-001', date: '2025-01-15', totalAmount: 299.99, sellerPayment: 214.99, deliveryPayment: 40.00, commission: 45.00, paymentMethod: 'ShamPay', status: 'Paid', batchId: 'BTH-001' },
        { id: 2, orderNumber: 'ORD-2025-002', date: '2025-01-15', totalAmount: 150.00, sellerPayment: 0, deliveryPayment: 0, commission: 22.50, paymentMethod: 'Cash', status: 'Commission Only', batchId: 'N/A' },
        { id: 3, orderNumber: 'ORD-2025-003', date: '2025-01-14', totalAmount: 75.50, sellerPayment: 54.11, deliveryPayment: 10.00, commission: 11.39, paymentMethod: 'ShamPay', status: 'Paid', batchId: 'BTH-001' },
        { id: 4, orderNumber: 'ORD-2025-004', date: '2025-01-14', totalAmount: 425.00, sellerPayment: 0, deliveryPayment: 0, commission: 63.75, paymentMethod: 'Cash', status: 'Commission Only', batchId: 'N/A' },
        { id: 5, orderNumber: 'ORD-2025-005', date: '2025-01-13', totalAmount: 89.99, sellerPayment: 64.49, deliveryPayment: 12.00, commission: 13.50, paymentMethod: 'ShamPay', status: 'Paid', batchId: 'BTH-002' },
        { id: 6, orderNumber: 'ORD-2025-006', date: '2025-01-13', totalAmount: 220.00, sellerPayment: 157.60, deliveryPayment: 29.40, commission: 33.00, paymentMethod: 'ShamPay', status: 'Pending', batchId: 'BTH-003' },
        { id: 7, orderNumber: 'ORD-2025-007', date: '2025-01-12', totalAmount: 175.50, sellerPayment: 0, deliveryPayment: 0, commission: 26.33, paymentMethod: 'Cash', status: 'Commission Only', batchId: 'N/A' },
        { id: 8, orderNumber: 'ORD-2025-008', date: '2025-01-12', totalAmount: 350.00, sellerPayment: 250.50, deliveryPayment: 47.00, commission: 52.50, paymentMethod: 'ShamPay', status: 'Paid', batchId: 'BTH-002' },
        { id: 9, orderNumber: 'ORD-2025-009', date: '2025-01-11', totalAmount: 125.75, sellerPayment: 0, deliveryPayment: 0, commission: 18.86, paymentMethod: 'Cash', status: 'Commission Only', batchId: 'N/A' },
        { id: 10, orderNumber: 'ORD-2025-010', date: '2025-01-11', totalAmount: 95.00, sellerPayment: 68.05, deliveryPayment: 12.70, commission: 14.25, paymentMethod: 'ShamPay', status: 'Paid', batchId: 'BTH-002' }
    ])

    // Sample payment batches for tracking
    const [paymentBatches] = useState([
        { id: 'BTH-001', date: '2025-01-15', totalSellerPayments: 269.10, totalDeliveryPayments: 50.00, ordersCount: 2, status: 'Completed' },
        { id: 'BTH-002', date: '2025-01-13', totalSellerPayments: 383.04, totalDeliveryPayments: 71.70, ordersCount: 3, status: 'Completed' },
        { id: 'BTH-003', date: '2025-01-13', totalSellerPayments: 157.60, totalDeliveryPayments: 29.40, ordersCount: 1, status: 'Pending' }
    ])

    const [filters, setFilters] = useState({
        dateRange: 'all',
        paymentMethod: 'all',
        status: 'all',
        search: ''
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [activeTab, setActiveTab] = useState('payments')

    // Filter payments based on current filters
    const filteredPayments = paymentData.filter(payment => {
        const matchesSearch = payment.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            payment.batchId.toLowerCase().includes(filters.search.toLowerCase())

        const matchesPaymentMethod = filters.paymentMethod === 'all' || payment.paymentMethod === filters.paymentMethod
        const matchesStatus = filters.status === 'all' || payment.status === filters.status

        return matchesSearch && matchesPaymentMethod && matchesStatus
    })

    // Calculate summary statistics
    const summaryStats = {
        totalSellerPayments: paymentData.reduce((sum, payment) => sum + payment.sellerPayment, 0),
        totalDeliveryPayments: paymentData.reduce((sum, payment) => sum + payment.deliveryPayment, 0),
        totalCommissions: paymentData.reduce((sum, payment) => sum + payment.commission, 0),
        totalSiteIncome: paymentData.reduce((sum, payment) => sum + payment.commission, 0), // Only commissions count as site income
        shamPayTransactions: paymentData.filter(payment => payment.paymentMethod === 'ShamPay').length,
        cashTransactions: paymentData.filter(payment => payment.paymentMethod === 'Cash').length,
        pendingPayments: paymentData.filter(payment => payment.status === 'Pending').reduce((sum, payment) => sum + payment.sellerPayment + payment.deliveryPayment, 0),
        processedPayments: paymentData.filter(payment => payment.status === 'Paid').reduce((sum, payment) => sum + payment.sellerPayment + payment.deliveryPayment, 0)
    }

    // Pagination
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }))
        setCurrentPage(1)
    }

    const handleExportReport = () => {
        alert('Payment report export functionality would be implemented here')
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="accountant-payment-reports">
            <div className="page-header">
                <div className="header-content">
                    <h1>Payment Reports</h1>
                    <p>Track seller payments, delivery payments, and commission income (read-only access)</p>
                </div>

                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={handlePrint}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                    <button className="btn btn-primary" onClick={handleExportReport}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="summary-stats">
                <div className="stat-card seller-payments">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Seller Payments</h3>
                        <p className="stat-value">${summaryStats.totalSellerPayments.toLocaleString()}</p>
                        <span className="stat-detail">Paid to store owners</span>
                    </div>
                </div>

                <div className="stat-card delivery-payments">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Delivery Payments</h3>
                        <p className="stat-value">${summaryStats.totalDeliveryPayments.toLocaleString()}</p>
                        <span className="stat-detail">Paid to delivery drivers</span>
                    </div>
                </div>

                <div className="stat-card commissions">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Site Commissions</h3>
                        <p className="stat-value">${summaryStats.totalCommissions.toLocaleString()}</p>
                        <span className="stat-detail">Our taxable income</span>
                    </div>
                </div>

                <div className="stat-card pending">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Pending Payments</h3>
                        <p className="stat-value">${summaryStats.pendingPayments.toLocaleString()}</p>
                        <span className="stat-detail">Awaiting processing</span>
                    </div>
                </div>
            </div>

            {/* Payment Method Analysis */}
            <div className="payment-analysis">
                <div className="analysis-header">
                    <h2>Payment Method Impact on Site Income</h2>
                    <p>Understanding how different payment methods affect our taxable income</p>
                </div>

                <div className="analysis-cards">
                    <div className="analysis-card shampay">
                        <div className="analysis-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <div className="analysis-content">
                            <h4>ShamPay Transactions</h4>
                            <div className="analysis-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Count:</span>
                                    <span className="stat-value">{summaryStats.shamPayTransactions}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">We collect:</span>
                                    <span className="stat-value">Full payment</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">We pay:</span>
                                    <span className="stat-value">Sellers + Drivers</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Site income:</span>
                                    <span className="stat-value">Commission only</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="analysis-card cash">
                        <div className="analysis-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div className="analysis-content">
                            <h4>Cash Transactions</h4>
                            <div className="analysis-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Count:</span>
                                    <span className="stat-value">{summaryStats.cashTransactions}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Customer pays:</span>
                                    <span className="stat-value">Direct to seller/driver</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">We pay:</span>
                                    <span className="stat-value">Nothing</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Site income:</span>
                                    <span className="stat-value">Commission only</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="income-summary">
                    <div className="income-card">
                        <h4>Total Site Income (Taxable)</h4>
                        <p className="income-amount">${summaryStats.totalSiteIncome.toLocaleString()}</p>
                        <span className="income-note">Commission from all payment methods</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'payments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        Payment Details
                    </button>
                    <button
                        className={`tab ${activeTab === 'batches' ? 'active' : ''}`}
                        onClick={() => setActiveTab('batches')}
                    >
                        Payment Batches
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Search</label>
                        <div className="search-input">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search order numbers, batch IDs..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Payment Method</label>
                        <select
                            value={filters.paymentMethod}
                            onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
                        >
                            <option value="all">All Methods</option>
                            <option value="ShamPay">ShamPay</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Commission Only">Commission Only</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'payments' ? (
                <div className="payments-content">
                    <div className="payments-table-container">
                        <div className="table-header">
                            <span>Order #</span>
                            <span>Date</span>
                            <span>Total Amount</span>
                            <span>Seller Payment</span>
                            <span>Delivery Payment</span>
                            <span>Commission</span>
                            <span>Payment Method</span>
                            <span>Status</span>
                            <span>Batch ID</span>
                        </div>

                        {paginatedPayments.map((payment) => (
                            <div key={payment.id} className="table-row">
                                <span className="order-number">{payment.orderNumber}</span>
                                <span className="payment-date">{payment.date}</span>
                                <span className="total-amount">${payment.totalAmount.toFixed(2)}</span>
                                <span className="seller-payment">
                                    {payment.sellerPayment > 0 ? `$${payment.sellerPayment.toFixed(2)}` : 'N/A'}
                                </span>
                                <span className="delivery-payment">
                                    {payment.deliveryPayment > 0 ? `$${payment.deliveryPayment.toFixed(2)}` : 'N/A'}
                                </span>
                                <span className="commission">${payment.commission.toFixed(2)}</span>
                                <span className={`payment-method ${payment.paymentMethod.toLowerCase()}`}>
                                    {payment.paymentMethod}
                                </span>
                                <span className={`status ${payment.status.toLowerCase().replace(' ', '-')}`}>
                                    {payment.status}
                                </span>
                                <span className="batch-id">{payment.batchId}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            <div className="pagination-info">
                                Page {currentPage} of {totalPages} ({filteredPayments.length} total payments)
                            </div>

                            <button
                                className="pagination-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="batches-content">
                    <div className="batches-table-container">
                        <div className="table-header">
                            <span>Batch ID</span>
                            <span>Date</span>
                            <span>Orders Count</span>
                            <span>Seller Payments</span>
                            <span>Delivery Payments</span>
                            <span>Total Paid</span>
                            <span>Status</span>
                        </div>

                        {paymentBatches.map((batch) => (
                            <div key={batch.id} className="table-row">
                                <span className="batch-id">{batch.id}</span>
                                <span className="batch-date">{batch.date}</span>
                                <span className="orders-count">{batch.ordersCount}</span>
                                <span className="seller-payments">${batch.totalSellerPayments.toFixed(2)}</span>
                                <span className="delivery-payments">${batch.totalDeliveryPayments.toFixed(2)}</span>
                                <span className="total-paid">${(batch.totalSellerPayments + batch.totalDeliveryPayments).toFixed(2)}</span>
                                <span className={`status ${batch.status.toLowerCase()}`}>
                                    {batch.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Income Explanation */}
            <div className="income-explanation">
                <div className="explanation-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="explanation-content">
                    <h4>Site Income Calculation</h4>
                    <div className="explanation-text">
                        <p><strong>ShamPay Transactions:</strong> Customer pays us → We pay sellers & drivers → Site income = Commission only</p>
                        <p><strong>Cash Transactions:</strong> Customer pays seller/driver directly → We pay nothing → Site income = Commission only</p>
                        <p><strong>Tax Reporting:</strong> Only commission amounts count as taxable income for the site, regardless of payment method.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountantPaymentReports