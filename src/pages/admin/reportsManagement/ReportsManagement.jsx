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
                        totalUsers: 5678,
                        totalSellers: 234,
                        totalDrivers: 156,
                        totalOrders: 1234,
                        totalRevenue: 156789.50,
                        averageOrderValue: 127.15,
                        totalReturns: 89,
                        usersGrowth: 15.7,
                        sellersGrowth: 8.2,
                        driversGrowth: 12.4,
                        ordersGrowth: 8.3,
                        revenueGrowth: 12.5,
                        returnsGrowth: -5.3
                    },
                    salesData: [
                        { month: 'Jan', revenue: 12000, orders: 95, users: 450 },
                        { month: 'Feb', revenue: 15000, orders: 118, users: 520 },
                        { month: 'Mar', revenue: 18000, orders: 142, users: 680 },
                        { month: 'Apr', revenue: 22000, orders: 173, users: 750 },
                        { month: 'May', revenue: 19000, orders: 149, users: 690 },
                        { month: 'Jun', revenue: 25000, orders: 196, users: 820 }
                    ],
                    returnsData: [
                        { month: 'Jan', returns: 12, returnRate: 12.6 },
                        { month: 'Feb', returns: 15, returnRate: 12.7 },
                        { month: 'Mar', returns: 18, returnRate: 12.7 },
                        { month: 'Apr', returns: 14, returnRate: 8.1 },
                        { month: 'May', returns: 11, returnRate: 7.4 },
                        { month: 'Jun', returns: 19, returnRate: 9.7 }
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
                    ],
                    usersByReturns: [
                        { name: 'John Smith', email: 'john.smith@email.com', returns: 12, totalOrders: 45, returnRate: 26.7 },
                        { name: 'Sarah Johnson', email: 'sarah.j@email.com', returns: 8, totalOrders: 32, returnRate: 25.0 },
                        { name: 'Mike Chen', email: 'mike.chen@email.com', returns: 7, totalOrders: 29, returnRate: 24.1 },
                        { name: 'Emma Wilson', email: 'emma.w@email.com', returns: 6, totalOrders: 28, returnRate: 21.4 },
                        { name: 'David Brown', email: 'david.brown@email.com', returns: 5, totalOrders: 24, returnRate: 20.8 }
                    ],
                    storesByReturns: [
                        { name: 'TechStore Pro', owner: 'John Doe', returns: 23, totalOrders: 156, returnRate: 14.7 },
                        { name: 'Fashion Hub', owner: 'Jane Smith', returns: 18, totalOrders: 134, returnRate: 13.4 },
                        { name: 'Home Essentials', owner: 'Mike Johnson', returns: 15, totalOrders: 128, returnRate: 11.7 },
                        { name: 'Sports World', owner: 'Chris Wilson', returns: 12, totalOrders: 98, returnRate: 12.2 },
                        { name: 'Book Corner', owner: 'Lisa Brown', returns: 8, totalOrders: 76, returnRate: 10.5 }
                    ],
                    storesByRating: [
                        { name: 'Premium Electronics', owner: 'Alex Turner', rating: 4.9, reviews: 245, totalSales: 1250 },
                        { name: 'Quality Fashion', owner: 'Maria Garcia', rating: 4.8, reviews: 189, totalSales: 890 },
                        { name: 'Home Paradise', owner: 'Robert Davis', rating: 4.7, reviews: 156, totalSales: 670 },
                        { name: 'Sports Elite', owner: 'Jennifer Lee', rating: 4.6, reviews: 134, totalSales: 540 },
                        { name: 'Art & Crafts Co', owner: 'Daniel Miller', rating: 4.5, reviews: 98, totalSales: 420 }
                    ],
                    productsByRating: [
                        { name: 'Wireless Bluetooth Headphones', store: 'TechStore Pro', rating: 4.9, reviews: 456, sales: 1200 },
                        { name: 'Organic Cotton T-Shirt', store: 'Fashion Hub', rating: 4.8, reviews: 234, sales: 890 },
                        { name: 'Smart Fitness Watch', store: 'TechStore Pro', rating: 4.7, reviews: 189, sales: 670 },
                        { name: 'Ceramic Coffee Mug Set', store: 'Home Essentials', rating: 4.6, reviews: 145, sales: 450 },
                        { name: 'Professional Camera Lens', store: 'PhotoGear Pro', rating: 4.5, reviews: 98, sales: 320 }
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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        const stars = []

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="star star--filled" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            )
        }

        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="star star--half" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            )
        }

        return <div className="stars-rating">{stars}</div>
    }

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
                    <div className="stat-icon sellers">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatNumber(overview.totalSellers)}</div>
                        <div className="stat-label">Total Sellers</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.sellersGrowth)}
                            <span style={{ color: getGrowthColor(overview.sellersGrowth) }}>
                                {overview.sellersGrowth > 0 ? '+' : ''}{overview.sellersGrowth}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon drivers">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatNumber(overview.totalDrivers)}</div>
                        <div className="stat-label">Total Drivers</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.driversGrowth)}
                            <span style={{ color: getGrowthColor(overview.driversGrowth) }}>
                                {overview.driversGrowth > 0 ? '+' : ''}{overview.driversGrowth}%
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
                                Per order average
                            </span>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon returns">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{formatNumber(overview.totalReturns)}</div>
                        <div className="stat-label">Total Returns</div>
                        <div className="stat-growth">
                            {getGrowthIcon(overview.returnsGrowth)}
                            <span style={{ color: getGrowthColor(overview.returnsGrowth) }}>
                                {overview.returnsGrowth > 0 ? '+' : ''}{overview.returnsGrowth}%
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

            <div className="returns-section">
                <div className="section-header">
                    <h2>Returns Analytics</h2>
                    <p>Detailed analysis of returns and customer satisfaction</p>
                </div>

                <div className="returns-charts">
                    <div className="chart-card large">
                        <div className="chart-header">
                            <h3>Returns Trend</h3>
                            <button
                                className="export-chart-btn"
                                onClick={() => exportReport('returns-trend')}
                            >
                                Export
                            </button>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={reportsData.returnsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="month" stroke="#6B7280" />
                                    <YAxis yAxisId="left" stroke="#6B7280" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        yAxisId="left"
                                        dataKey="returns"
                                        fill="#EF4444"
                                        name="Total Returns"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="returnRate"
                                        stroke="#F59E0B"
                                        strokeWidth={3}
                                        name="Return Rate (%)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="returns-lists">
                    <div className="list-card">
                        <div className="list-header">
                            <h3>Users by Returns</h3>
                            <span className="list-count">{reportsData.usersByReturns.length} users</span>
                        </div>
                        <div className="list-content">
                            {reportsData.usersByReturns.map((user, index) => (
                                <div key={index} className="list-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-info">
                                        <div className="item-name">{user.name}</div>
                                        <div className="item-email">{user.email}</div>
                                    </div>
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Returns</span>
                                            <span className="stat-value returns">{user.returns}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Orders</span>
                                            <span className="stat-value">{user.totalOrders}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Rate</span>
                                            <span className="stat-value rate">{user.returnRate}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-card">
                        <div className="list-header">
                            <h3>Stores by Returns</h3>
                            <span className="list-count">{reportsData.storesByReturns.length} stores</span>
                        </div>
                        <div className="list-content">
                            {reportsData.storesByReturns.map((store, index) => (
                                <div key={index} className="list-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-info">
                                        <div className="item-name">{store.name}</div>
                                        <div className="item-owner">Owner: {store.owner}</div>
                                    </div>
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Returns</span>
                                            <span className="stat-value returns">{store.returns}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Orders</span>
                                            <span className="stat-value">{store.totalOrders}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Rate</span>
                                            <span className="stat-value rate">{store.returnRate}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-card">
                        <div className="list-header">
                            <h3>Stores by Rating</h3>
                            <span className="list-count">{reportsData.storesByRating.length} stores</span>
                        </div>
                        <div className="list-content">
                            {reportsData.storesByRating.map((store, index) => (
                                <div key={index} className="list-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-info">
                                        <div className="item-name">{store.name}</div>
                                        <div className="item-owner">Owner: {store.owner}</div>
                                    </div>
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Rating</span>
                                            <div className="rating-display">
                                                {renderStars(store.rating)}
                                                <span className="rating-value">{store.rating}</span>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Reviews</span>
                                            <span className="stat-value">{store.reviews}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Sales</span>
                                            <span className="stat-value">{store.totalSales}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-card">
                        <div className="list-header">
                            <h3>Products by Rating</h3>
                            <span className="list-count">{reportsData.productsByRating.length} products</span>
                        </div>
                        <div className="list-content">
                            {reportsData.productsByRating.map((product, index) => (
                                <div key={index} className="list-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-info">
                                        <div className="item-name">{product.name}</div>
                                        <div className="item-store">Store: {product.store}</div>
                                    </div>
                                    <div className="item-stats">
                                        <div className="stat-item">
                                            <span className="stat-label">Rating</span>
                                            <div className="rating-display">
                                                {renderStars(product.rating)}
                                                <span className="rating-value">{product.rating}</span>
                                            </div>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Reviews</span>
                                            <span className="stat-value">{product.reviews}</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-label">Sales</span>
                                            <span className="stat-value">{product.sales}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportsManagement