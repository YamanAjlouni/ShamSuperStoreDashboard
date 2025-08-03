import { useState } from 'react'
import './AccountantPaymentReports.scss'

const AccountantPaymentReports = () => {
    // Sample payment data - in real app this would come from API
    const [paymentData] = useState([
        { id: 1, orderNumber: 'ORD-2025-001', date: '2025-01-15', totalAmount: 299.99, sellerPayment: 214.99, deliveryPayment: 40.00, commission: 45.00, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-001' },
        { id: 2, orderNumber: 'ORD-2025-002', date: '2025-01-15', totalAmount: 150.00, sellerPayment: 0, deliveryPayment: 0, commission: 22.50, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' },
        { id: 3, orderNumber: 'ORD-2025-003', date: '2025-01-14', totalAmount: 75.50, sellerPayment: 54.11, deliveryPayment: 10.00, commission: 11.39, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-001' },
        { id: 4, orderNumber: 'ORD-2025-004', date: '2025-01-14', totalAmount: 425.00, sellerPayment: 0, deliveryPayment: 0, commission: 63.75, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' },
        { id: 5, orderNumber: 'ORD-2025-005', date: '2025-01-13', totalAmount: 89.99, sellerPayment: 64.49, deliveryPayment: 12.00, commission: 13.50, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-002' },
        { id: 6, orderNumber: 'ORD-2025-006', date: '2025-01-13', totalAmount: 220.00, sellerPayment: 157.60, deliveryPayment: 29.40, commission: 33.00, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-003' },
        { id: 7, orderNumber: 'ORD-2025-007', date: '2025-01-12', totalAmount: 175.50, sellerPayment: 0, deliveryPayment: 0, commission: 26.33, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' },
        { id: 8, orderNumber: 'ORD-2025-008', date: '2025-01-12', totalAmount: 350.00, sellerPayment: 250.50, deliveryPayment: 47.00, commission: 52.50, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-002' },
        { id: 9, orderNumber: 'ORD-2025-009', date: '2025-01-11', totalAmount: 125.75, sellerPayment: 0, deliveryPayment: 0, commission: 18.86, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' },
        { id: 10, orderNumber: 'ORD-2025-010', date: '2025-01-11', totalAmount: 95.00, sellerPayment: 68.05, deliveryPayment: 12.70, commission: 14.25, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-002' },
        // Additional sample data for different months and years
        { id: 11, orderNumber: 'ORD-2024-011', date: '2024-12-28', totalAmount: 199.99, sellerPayment: 143.19, deliveryPayment: 26.80, commission: 29.99, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-004' },
        { id: 12, orderNumber: 'ORD-2024-012', date: '2024-12-25', totalAmount: 89.50, sellerPayment: 0, deliveryPayment: 0, commission: 13.43, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' },
        { id: 13, orderNumber: 'ORD-2025-013', date: '2025-02-01', totalAmount: 145.00, sellerPayment: 103.85, deliveryPayment: 19.40, commission: 21.75, paymentMethod: 'ShamPay', status: 'Completed', batchId: 'BTH-005' },
        { id: 14, orderNumber: 'ORD-2025-014', date: '2025-02-03', totalAmount: 267.80, sellerPayment: 0, deliveryPayment: 0, commission: 40.17, paymentMethod: 'Cash', status: 'Completed', batchId: 'N/A' }
    ])

    const [filters, setFilters] = useState({
        dateRange: 'all',
        paymentMethod: 'all',
        search: '',
        timePeriod: 'all'
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    // Helper function to get week number
    const getWeekNumber = (date) => {
        const d = new Date(date)
        const yearStart = new Date(d.getFullYear(), 0, 1)
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + yearStart.getDay() + 1) / 7)
        return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`
    }

    // Helper function to get month
    const getMonth = (date) => {
        const d = new Date(date)
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`
    }

    // Helper function to get year
    const getYear = (date) => {
        const d = new Date(date)
        return d.getFullYear().toString()
    }

    // Filter payments based on current filters
    const filteredPayments = paymentData.filter(payment => {
        const matchesSearch = payment.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            payment.batchId.toLowerCase().includes(filters.search.toLowerCase())

        const matchesPaymentMethod = filters.paymentMethod === 'all' || payment.paymentMethod === filters.paymentMethod

        // Date/time period filtering
        let matchesTimePeriod = true
        if (filters.timePeriod !== 'all') {
            const currentDate = new Date()
            const paymentDate = new Date(payment.date)

            switch (filters.timePeriod) {
                case 'this-week':
                    const currentWeek = getWeekNumber(currentDate)
                    const paymentWeek = getWeekNumber(paymentDate)
                    matchesTimePeriod = currentWeek === paymentWeek
                    break
                case 'this-month':
                    const currentMonth = getMonth(currentDate)
                    const paymentMonth = getMonth(paymentDate)
                    matchesTimePeriod = currentMonth === paymentMonth
                    break
                case 'this-year':
                    const currentYear = getYear(currentDate)
                    const paymentYear = getYear(paymentDate)
                    matchesTimePeriod = currentYear === paymentYear
                    break
                case 'last-month':
                    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                    const lastMonthStr = getMonth(lastMonth)
                    const paymentMonthStr = getMonth(paymentDate)
                    matchesTimePeriod = lastMonthStr === paymentMonthStr
                    break
                case 'last-year':
                    const lastYear = (currentDate.getFullYear() - 1).toString()
                    const paymentYearStr = getYear(paymentDate)
                    matchesTimePeriod = lastYear === paymentYearStr
                    break
                default:
                    matchesTimePeriod = true
            }
        }

        return matchesSearch && matchesPaymentMethod && matchesTimePeriod
    })

    // Calculate summary statistics based on filtered data
    const summaryStats = {
        totalSellerPayments: filteredPayments.reduce((sum, payment) => sum + payment.sellerPayment, 0),
        totalDeliveryPayments: filteredPayments.reduce((sum, payment) => sum + payment.deliveryPayment, 0),
        totalCommissions: filteredPayments.reduce((sum, payment) => sum + payment.commission, 0),
        totalSiteIncome: filteredPayments.reduce((sum, payment) => sum + payment.commission, 0), // Only commissions count as site income
        shamPayTransactions: filteredPayments.filter(payment => payment.paymentMethod === 'ShamPay').length,
        cashTransactions: filteredPayments.filter(payment => payment.paymentMethod === 'Cash').length
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const getTimePeriodLabel = () => {
        switch (filters.timePeriod) {
            case 'this-week': return 'This Week'
            case 'this-month': return 'This Month'
            case 'this-year': return 'This Year'
            case 'last-month': return 'Last Month'
            case 'last-year': return 'Last Year'
            default: return 'All Time'
        }
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

            <div className="summary-stats">
                <div className="stat-card seller-payments">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Seller Payments ({getTimePeriodLabel()})</h3>
                        <p className="stat-value">{formatCurrency(summaryStats.totalSellerPayments)}</p>
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
                        <p className="stat-value">{formatCurrency(summaryStats.totalDeliveryPayments)}</p>
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
                        <p className="stat-value">{formatCurrency(summaryStats.totalCommissions)}</p>
                        <span className="stat-detail">Our taxable income</span>
                    </div>
                </div>
            </div>

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
                        <p className="income-amount">{formatCurrency(summaryStats.totalSiteIncome)}</p>
                        <span className="income-note">Commission from all payment methods</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Time Period</label>
                        <select
                            value={filters.timePeriod}
                            onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                            <option value="this-year">This Year</option>
                            <option value="last-month">Last Month</option>
                            <option value="last-year">Last Year</option>
                        </select>
                    </div>

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
                </div>
            </div>

            {/* Payments Content */}
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
                            <span className="total-amount">{formatCurrency(payment.totalAmount)}</span>
                            <span className="seller-payment">
                                {payment.sellerPayment > 0 ? formatCurrency(payment.sellerPayment) : 'N/A'}
                            </span>
                            <span className="delivery-payment">
                                {payment.deliveryPayment > 0 ? formatCurrency(payment.deliveryPayment) : 'N/A'}
                            </span>
                            <span className="commission">{formatCurrency(payment.commission)}</span>
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
        </div>
    )
}

export default AccountantPaymentReports