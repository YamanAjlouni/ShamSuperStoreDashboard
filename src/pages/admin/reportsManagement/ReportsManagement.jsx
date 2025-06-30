import { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './ReportsManagement.scss'

const ReportsManagement = () => {
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [dateRange, setDateRange] = useState('30days')
    const [selectedReport, setSelectedReport] = useState(null)
    const [reportsData, setReportsData] = useState({})

    useEffect(() => {
        const fetchReportsData = async () => {
            setLoading(true)
            setTimeout(() => {
                const mockData = {
                    overview: {
                        totalRevenue: 156789.50,
                        totalOrders: 1234,
                        totalUsers: 5678,
                        averageOrderValue: 127.15,
                        revenueGrowth: 12.5,
                        ordersGrowth: 8.3,
                        usersGrowth: 15.7,
                        conversionRate: 3.2
                    },
                    salesData: [
                        { month: 'Jan', revenue: 12000, orders: 95, users: 450 },
                        { month: 'Feb', revenue: 15000, orders: 118, users: 520 },
                        { month: 'Mar', revenue: 18000, orders: 142, users: 680 },
                        { month: 'Apr', revenue: 22000, orders: 173, users: 750 },
                        { month: 'May', revenue: 19000, orders: 149, users: 690 },
                        { month: 'Jun', revenue: 25000, orders: 196, users: 820 }
                    ],
                    categoryData: [
                        { name: 'Electronics', value: 35, color: '#4267B2' },
                        { name: 'Clothing', value: 25, color: '#CE802D' },
                        { name: 'Home & Garden', value: 20, color: '#F2BD00' },
                        { name: 'Sports', value: 12, color: '#39465D' },
                        { name: 'Others', value: 8, color: '#9CA3AF' }
                    ],
                    topProducts: [
                        { name: 'iPhone 15 Pro', sales: 156, revenue: 156000, growth: 15.2 },
                        { name: 'MacBook Pro M3', sales: 89, revenue: 178000, growth: 8.7 },
                        { name: 'AirPods Pro', sales: 234, revenue: 58500, growth: 22.1 },
                        { name: 'Samsung Galaxy', sales: 112, revenue: 89600, growth: -3.2 },
                        { name: 'Dell Laptop', sales: 67, revenue: 67000, growth: 12.8 }
                    ],
                    userAnalytics: [
                        { date: '2024-01-01', newUsers: 45, returningUsers: 123, activeUsers: 168 },
                        { date: '2024-01-02', newUsers: 52, returningUsers: 134, activeUsers: 186 },
                        { date: '2024-01-03', newUsers: 38, returningUsers: 145, activeUsers: 183 },
                        { date: '2024-01-04', newUsers: 67, returningUsers: 156, activeUsers: 223 },
                        { date: '2024-01-05', newUsers: 44, returningUsers: 167, activeUsers: 211 },
                        { date: '2024-01-06', newUsers: 59, returningUsers: 178, activeUsers: 237 },
                        { date: '2024-01-07', newUsers: 71, returningUsers: 189, activeUsers: 260 }
                    ],
                    orderAnalytics: [
                        { status: 'Completed', count: 856, percentage: 69.4 },
                        { status: 'Pending', count: 234, percentage: 19.0 },
                        { status: 'Processing', count: 89, percentage: 7.2 },
                        { status: 'Cancelled', count: 55, percentage: 4.4 }
                    ],
                    revenueBySource: [
                        { source: 'Website', amount: 89450, percentage: 57.1 },
                        { source: 'Mobile App', amount: 45230, percentage: 28.8 },
                        { source: 'Social Media', amount: 15670, percentage: 10.0 },
                        { source: 'Direct', amount: 6439, percentage: 4.1 }
                    ]
                }
                setReportsData(mockData)
                setLoading(false)
            }, 1000)
        }

        fetchReportsData()
    }, [dateRange])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num)
    }

    const getGrowthColor = (growth) => {
        return growth >= 0 ? '#10B981' : '#EF4444'
    }

    const getGrowthIcon = (growth) => (
        <svg
            className={`growth-icon ${growth >= 0 ? 'positive' : 'negative'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            {growth >= 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            )}
        </svg>
    )

    const exportReport = (reportType) => {
        // Simulate export functionality
        console.log(`Exporting ${reportType} report...`)
        // In a real app, this would trigger a download
    }

    if (loading) {
        return (
            <div className="reports-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading reports...</p>
                </div>
            </div>
        )
    }

    const { overview } = reportsData

    return (
        <div className="reports-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Financial Reports</h1>
                    <p>Comprehensive analytics and reporting dashboard</p>
                </div>
                <div className="header-controls">
                    <select
                        className="date-range-select"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="90days">Last 90 Days</option>
                        <option value="1year">Last Year</option>
                    </select>
                    <button
                        className="export-btn"
                        onClick={() => exportReport('overview')}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Report
                    </button>
                </div>
            </div>

            <div className="overview-stats">
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatCurrency(overview.totalRevenue)}</div>
                        <div className="stat-label">Total Revenue</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.revenueGrowth)}
                            <span style={{ color: getGrowthColor(overview.revenueGrowth) }}>
                                {overview.revenueGrowth > 0 ? '+' : ''}{overview.revenueGrowth}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orders">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatNumber(overview.totalOrders)}</div>
                        <div className="stat-label">Total Orders</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.ordersGrowth)}
                            <span style={{ color: getGrowthColor(overview.ordersGrowth) }}>
                                {overview.ordersGrowth > 0 ? '+' : ''}{overview.ordersGrowth}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon users">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatNumber(overview.totalUsers)}</div>
                        <div className="stat-label">Total Users</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.usersGrowth)}
                            <span style={{ color: getGrowthColor(overview.usersGrowth) }}>
                                {overview.usersGrowth > 0 ? '+' : ''}{overview.usersGrowth}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon aov">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatCurrency(overview.averageOrderValue)}</div>
                        <div className="stat-label">Average Order Value</div>
                        <div className="stat-growth">
                            <span className="stat-metric">
                                {overview.conversionRate}% conversion rate
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Sales Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Product Analytics
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        User Analytics
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Order Reports
                    </button>
                </div>

                <div className="tabs-content">
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="charts-grid">
                                <div className="chart-card large">
                                    <div className="chart-header">
                                        <h3>Revenue Trend</h3>
                                        <button
                                            className="export-chart-btn"
                                            onClick={() => exportReport('revenue-trend')}
                                        >
                                            Export
                                        </button>
                                    </div>
                                    <div className="chart-container">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <AreaChart data={reportsData.salesData}>
                                                <defs>
                                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#4267B2" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#4267B2" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                                <XAxis dataKey="month" stroke="#6B7280" />
                                                <YAxis stroke="#6B7280" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#FFFFFF',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px',
                                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#4267B2"
                                                    fillOpacity={1}
                                                    fill="url(#revenueGradient)"
                                                    strokeWidth={3}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Revenue by Source</h3>
                                    </div>
                                    <div className="chart-container">
                                        <div className="revenue-sources">
                                            {reportsData.revenueBySource.map((source, index) => (
                                                <div key={index} className="source-item">
                                                    <div className="source-info">
                                                        <span className="source-name">{source.source}</span>
                                                        <span className="source-amount">{formatCurrency(source.amount)}</span>
                                                    </div>
                                                    <div className="source-bar">
                                                        <div
                                                            className="source-fill"
                                                            style={{
                                                                width: `${source.percentage}%`,
                                                                backgroundColor: index === 0 ? '#4267B2' :
                                                                    index === 1 ? '#CE802D' :
                                                                        index === 2 ? '#F2BD00' : '#9CA3AF'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="source-percentage">{source.percentage}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="tab-content">
                            <div className="charts-grid">
                                <div className="chart-card large">
                                    <div className="chart-header">
                                        <h3>Sales by Category</h3>
                                    </div>
                                    <div className="chart-container">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={reportsData.categoryData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    dataKey="value"
                                                    label={({ name, value }) => `${name}: ${value}%`}
                                                >
                                                    {reportsData.categoryData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Top Products</h3>
                                    </div>
                                    <div className="chart-container">
                                        <div className="top-products-list">
                                            {reportsData.topProducts.map((product, index) => (
                                                <div key={index} className="product-item">
                                                    <div className="product-rank">#{index + 1}</div>
                                                    <div className="product-info">
                                                        <span className="product-name">{product.name}</span>
                                                        <div className="product-stats">
                                                            <span className="product-sales">{product.sales} sales</span>
                                                            <span className="product-revenue">{formatCurrency(product.revenue)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="product-growth">
                                                        {getGrowthIcon(product.growth)}
                                                        <span style={{ color: getGrowthColor(product.growth) }}>
                                                            {product.growth > 0 ? '+' : ''}{product.growth}%
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="tab-content">
                            <div className="charts-grid">
                                <div className="chart-card large">
                                    <div className="chart-header">
                                        <h3>User Activity</h3>
                                    </div>
                                    <div className="chart-container">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <LineChart data={reportsData.userAnalytics}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                                <XAxis
                                                    dataKey="date"
                                                    stroke="#6B7280"
                                                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                                                />
                                                <YAxis stroke="#6B7280" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#FFFFFF',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Legend />
                                                <Line
                                                    type="monotone"
                                                    dataKey="newUsers"
                                                    stroke="#4267B2"
                                                    strokeWidth={3}
                                                    name="New Users"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="returningUsers"
                                                    stroke="#CE802D"
                                                    strokeWidth={3}
                                                    name="Returning Users"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="activeUsers"
                                                    stroke="#F2BD00"
                                                    strokeWidth={3}
                                                    name="Active Users"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="tab-content">
                            <div className="charts-grid">
                                <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Order Status Distribution</h3>
                                    </div>
                                    <div className="chart-container">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={reportsData.orderAnalytics}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                                <XAxis dataKey="status" stroke="#6B7280" />
                                                <YAxis stroke="#6B7280" />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#FFFFFF',
                                                        border: '1px solid #E5E7EB',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <Bar
                                                    dataKey="count"
                                                    fill="#4267B2"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="chart-card">
                                    <div className="chart-header">
                                        <h3>Order Analytics Summary</h3>
                                    </div>
                                    <div className="chart-container">
                                        <div className="order-summary">
                                            {reportsData.orderAnalytics.map((item, index) => (
                                                <div key={index} className="summary-item">
                                                    <div className="summary-icon" style={{
                                                        backgroundColor: index === 0 ? '#10B981' :
                                                            index === 1 ? '#F59E0B' :
                                                                index === 2 ? '#3B82F6' : '#EF4444'
                                                    }}>
                                                        {index === 0 ? '✓' : index === 1 ? '⏳' : index === 2 ? '⚡' : '✕'}
                                                    </div>
                                                    <div className="summary-content">
                                                        <span className="summary-count">{formatNumber(item.count)}</span>
                                                        <span className="summary-label">{item.status}</span>
                                                        <span className="summary-percentage">{item.percentage}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReportsManagement