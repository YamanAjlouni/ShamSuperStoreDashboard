import { useState } from 'react'
import './AccountantOrdersReports.scss'

const AccountantOrdersReports = () => {
    // Sample orders data - in real app this would come from API
    const [ordersData] = useState([
        { id: 1, orderNumber: 'ORD-2025-001', storeNumber: 'STR-001', storeName: 'Electronics Hub', date: '2025-01-15', amount: 299.99, paymentMethod: 'ShamPay', status: 'Completed', commission: 44.99 },
        { id: 2, orderNumber: 'ORD-2025-002', storeNumber: 'STR-003', storeName: 'Fashion Store', date: '2025-01-15', amount: 150.00, paymentMethod: 'Cash', status: 'Completed', commission: 22.50 },
        { id: 3, orderNumber: 'ORD-2025-003', storeNumber: 'STR-002', storeName: 'Home & Garden', date: '2025-01-14', amount: 75.50, paymentMethod: 'ShamPay', status: 'Completed', commission: 11.33 },
        { id: 4, orderNumber: 'ORD-2025-004', storeNumber: 'STR-001', storeName: 'Electronics Hub', date: '2025-01-14', amount: 425.00, paymentMethod: 'Cash', status: 'Completed', commission: 63.75 },
        { id: 5, orderNumber: 'ORD-2025-005', storeNumber: 'STR-004', storeName: 'Sports Corner', date: '2025-01-13', amount: 89.99, paymentMethod: 'ShamPay', status: 'Completed', commission: 13.50 },
        { id: 6, orderNumber: 'ORD-2025-006', storeNumber: 'STR-002', storeName: 'Home & Garden', date: '2025-01-13', amount: 220.00, paymentMethod: 'ShamPay', status: 'Pending', commission: 33.00 },
        { id: 7, orderNumber: 'ORD-2025-007', storeNumber: 'STR-003', storeName: 'Fashion Store', date: '2025-01-12', amount: 175.50, paymentMethod: 'Cash', status: 'Completed', commission: 26.33 },
        { id: 8, orderNumber: 'ORD-2025-008', storeNumber: 'STR-001', storeName: 'Electronics Hub', date: '2025-01-12', amount: 350.00, paymentMethod: 'ShamPay', status: 'Completed', commission: 52.50 },
        { id: 9, orderNumber: 'ORD-2025-009', storeNumber: 'STR-004', storeName: 'Sports Corner', date: '2025-01-11', amount: 125.75, paymentMethod: 'Cash', status: 'Completed', commission: 18.86 },
        { id: 10, orderNumber: 'ORD-2025-010', storeNumber: 'STR-002', storeName: 'Home & Garden', date: '2025-01-11', amount: 95.00, paymentMethod: 'ShamPay', status: 'Completed', commission: 14.25 },
        // Additional sample data for different months and weeks
        { id: 11, orderNumber: 'ORD-2024-011', storeNumber: 'STR-001', storeName: 'Electronics Hub', date: '2024-12-28', amount: 199.99, paymentMethod: 'ShamPay', status: 'Completed', commission: 29.99 },
        { id: 12, orderNumber: 'ORD-2024-012', storeNumber: 'STR-003', storeName: 'Fashion Store', date: '2024-12-25', amount: 89.50, paymentMethod: 'Cash', status: 'Completed', commission: 13.43 },
        { id: 13, orderNumber: 'ORD-2025-013', storeNumber: 'STR-002', storeName: 'Home & Garden', date: '2025-02-01', amount: 145.00, paymentMethod: 'ShamPay', status: 'Completed', commission: 21.75 },
        { id: 14, orderNumber: 'ORD-2025-014', storeNumber: 'STR-004', storeName: 'Sports Corner', date: '2025-02-03', amount: 267.80, paymentMethod: 'Cash', status: 'Pending', commission: 40.17 }
    ])

    const [filters, setFilters] = useState({
        dateRange: 'all',
        paymentMethod: 'all',
        status: 'all',
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

    // Filter orders based on current filters
    const filteredOrders = ordersData.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            order.storeNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
            order.storeName.toLowerCase().includes(filters.search.toLowerCase())

        const matchesPaymentMethod = filters.paymentMethod === 'all' || order.paymentMethod === filters.paymentMethod
        const matchesStatus = filters.status === 'all' || order.status === filters.status

        // Date/time period filtering
        let matchesTimePeriod = true
        if (filters.timePeriod !== 'all') {
            const currentDate = new Date()
            const orderDate = new Date(order.date)

            switch (filters.timePeriod) {
                case 'this-week':
                    const currentWeek = getWeekNumber(currentDate)
                    const orderWeek = getWeekNumber(orderDate)
                    matchesTimePeriod = currentWeek === orderWeek
                    break
                case 'this-month':
                    const currentMonth = getMonth(currentDate)
                    const orderMonth = getMonth(orderDate)
                    matchesTimePeriod = currentMonth === orderMonth
                    break
                case 'this-year':
                    const currentYear = getYear(currentDate)
                    const orderYear = getYear(orderDate)
                    matchesTimePeriod = currentYear === orderYear
                    break
                case 'last-month':
                    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                    const lastMonthStr = getMonth(lastMonth)
                    const orderMonthStr = getMonth(orderDate)
                    matchesTimePeriod = lastMonthStr === orderMonthStr
                    break
                case 'last-year':
                    const lastYear = (currentDate.getFullYear() - 1).toString()
                    const orderYearStr = getYear(orderDate)
                    matchesTimePeriod = lastYear === orderYearStr
                    break
                default:
                    matchesTimePeriod = true
            }
        }

        return matchesSearch && matchesPaymentMethod && matchesStatus && matchesTimePeriod
    })

    // Calculate summary statistics
    const summaryStats = {
        totalOrders: filteredOrders.length,
        totalRevenue: filteredOrders.reduce((sum, order) => sum + order.amount, 0),
        totalCommissions: filteredOrders.reduce((sum, order) => sum + order.commission, 0),
        completedOrders: filteredOrders.filter(order => order.status === 'Completed').length,
        pendingOrders: filteredOrders.filter(order => order.status === 'Pending').length
    }

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }))
        setCurrentPage(1) // Reset to first page when filtering
    }

    const handleExportReport = () => {
        // In real app, this would generate and download a report
        alert('Report export functionality would be implemented here')
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
        <div className="accountant-orders-reports">
            <div className="page-header">
                <div className="header-content">
                    <h1>Orders & Sales Reports</h1>
                    <p>View order data and generate sales reports (read-only access)</p>
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
                <div className="stat-card">
                    <div className="stat-icon orders">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Total Orders ({getTimePeriodLabel()})</h3>
                        <p className="stat-value">{summaryStats.totalOrders.toLocaleString()}</p>
                        <span className="stat-detail">
                            {summaryStats.completedOrders} completed, {summaryStats.pendingOrders} pending
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">{formatCurrency(summaryStats.totalRevenue)}</p>
                        <span className="stat-detail">Across all payment methods</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon commissions">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>Site Commissions</h3>
                        <p className="stat-value">{formatCurrency(summaryStats.totalCommissions)}</p>
                        <span className="stat-detail">Taxable income</span>
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
                                placeholder="Search orders, store numbers..."
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
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Content */}
            <div className="orders-content">
                {/* Orders Table */}
                <div className="orders-table-container">
                    <div className="table-header">
                        <span>Order #</span>
                        <span>Store #</span>
                        <span>Store Name</span>
                        <span>Date</span>
                        <span>Amount</span>
                        <span>Payment Method</span>
                        <span>Status</span>
                        <span>Commission</span>
                    </div>

                    {paginatedOrders.map((order) => (
                        <div key={order.id} className="table-row">
                            <span className="order-number">{order.orderNumber}</span>
                            <span className="store-number">{order.storeNumber}</span>
                            <span className="store-name">{order.storeName}</span>
                            <span className="order-date">{order.date}</span>
                            <span className="order-amount">{formatCurrency(order.amount)}</span>
                            <span className={`payment-method ${order.paymentMethod.toLowerCase()}`}>
                                {order.paymentMethod}
                            </span>
                            <span className={`status ${order.status.toLowerCase()}`}>
                                {order.status}
                            </span>
                            <span className="commission">{formatCurrency(order.commission)}</span>
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
                            Page {currentPage} of {totalPages} ({filteredOrders.length} total orders)
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

export default AccountantOrdersReports