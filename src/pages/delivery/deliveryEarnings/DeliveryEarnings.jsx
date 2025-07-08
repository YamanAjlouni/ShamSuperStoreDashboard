import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import './DeliveryEarnings.scss'

const DeliveryEarnings = () => {
    const [loading, setLoading] = useState(true)
    const [timeFilter, setTimeFilter] = useState('week') // week, month, year
    const [chartType, setChartType] = useState('line') // line, bar
    const [earningsData, setEarningsData] = useState({})
    const [chartData, setChartData] = useState([])
    const [recentEarnings, setRecentEarnings] = useState([])

    useEffect(() => {
        const fetchEarningsData = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockData = {
                    summary: {
                        thisWeek: {
                            earnings: 342.75,
                            orders: 23,
                            hours: 28.5,
                            avgPerOrder: 14.90
                        },
                        thisMonth: {
                            earnings: 1456.20,
                            orders: 89,
                            hours: 112.3,
                            avgPerOrder: 16.36
                        },
                        today: {
                            earnings: 67.50,
                            orders: 4,
                            hours: 5.5,
                            avgPerOrder: 16.88
                        },
                        allTime: {
                            earnings: 8234.65,
                            orders: 542,
                            hours: 687.2,
                            avgPerOrder: 15.19
                        }
                    }
                }

                // Generate chart data based on filter
                const generateChartData = (filter) => {
                    if (filter === 'week') {
                        return [
                            { name: 'Mon', earnings: 45.50, orders: 3, hours: 4.2 },
                            { name: 'Tue', earnings: 62.75, orders: 4, hours: 6.1 },
                            { name: 'Wed', earnings: 38.20, orders: 2, hours: 3.5 },
                            { name: 'Thu', earnings: 71.30, orders: 5, hours: 7.2 },
                            { name: 'Fri', earnings: 89.45, orders: 6, hours: 8.5 },
                            { name: 'Sat', earnings: 124.80, orders: 8, hours: 11.2 },
                            { name: 'Sun', earnings: 67.50, orders: 4, hours: 5.5 }
                        ]
                    } else if (filter === 'month') {
                        return [
                            { name: 'Week 1', earnings: 298.45, orders: 18, hours: 24.5 },
                            { name: 'Week 2', earnings: 342.75, orders: 23, hours: 28.5 },
                            { name: 'Week 3', earnings: 387.20, orders: 25, hours: 31.2 },
                            { name: 'Week 4', earnings: 427.80, orders: 23, hours: 28.1 }
                        ]
                    } else {
                        return [
                            { name: 'Jan', earnings: 1234.50, orders: 78, hours: 98.5 },
                            { name: 'Feb', earnings: 1456.20, orders: 89, hours: 112.3 },
                            { name: 'Mar', earnings: 1387.65, orders: 85, hours: 107.8 },
                            { name: 'Apr', earnings: 1598.40, orders: 94, hours: 119.2 },
                            { name: 'May', earnings: 1723.85, orders: 102, hours: 128.7 },
                            { name: 'Jun', earnings: 1665.30, orders: 98, hours: 124.1 }
                        ]
                    }
                }

                const mockRecentEarnings = [
                    {
                        id: 'DEL098',
                        date: '2024-01-25',
                        time: '14:30',
                        customer: 'Sarah Johnson',
                        orderValue: 24.50,
                        driverEarning: 8.50,
                        tip: 3.50,
                        distance: '2.1 miles',
                        duration: '18 mins'
                    },
                    {
                        id: 'DEL097',
                        date: '2024-01-25',
                        time: '13:15',
                        customer: 'Mike Chen',
                        orderValue: 31.75,
                        driverEarning: 9.25,
                        tip: 5.00,
                        distance: '3.4 miles',
                        duration: '25 mins'
                    },
                    {
                        id: 'DEL096',
                        date: '2024-01-25',
                        time: '11:45',
                        customer: 'Emma Wilson',
                        orderValue: 18.90,
                        driverEarning: 6.75,
                        tip: 2.25,
                        distance: '1.8 miles',
                        duration: '15 mins'
                    },
                    {
                        id: 'DEL095',
                        date: '2024-01-24',
                        time: '19:20',
                        customer: 'David Brown',
                        orderValue: 42.15,
                        driverEarning: 12.50,
                        tip: 6.00,
                        distance: '4.2 miles',
                        duration: '32 mins'
                    },
                    {
                        id: 'DEL094',
                        date: '2024-01-24',
                        time: '17:30',
                        customer: 'Lisa Garcia',
                        orderValue: 28.60,
                        driverEarning: 8.90,
                        tip: 4.25,
                        distance: '2.7 miles',
                        duration: '22 mins'
                    }
                ]

                setEarningsData(mockData)
                setChartData(generateChartData(timeFilter))
                setRecentEarnings(mockRecentEarnings)
                setLoading(false)
            }, 1000)
        }

        fetchEarningsData()
    }, [timeFilter])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="chart-tooltip">
                    <p className="tooltip-label">{label}</p>
                    <p className="tooltip-earnings">
                        Earnings: {formatCurrency(payload[0].value)}
                    </p>
                    <p className="tooltip-orders">
                        Orders: {payload[0].payload.orders}
                    </p>
                    {/* <p className="tooltip-hours">
                        Hours: {payload[0].payload.hours}h
                    </p> */}
                </div>
            )
        }
        return null
    }

    if (loading) {
        return (
            <div className="delivery-earnings">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading earnings data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="delivery-earnings">
            {/* Header */}
            <div className="earnings-header">
                <div className="header-content">
                    <div className="page-title">
                        <h1>Earnings Dashboard</h1>
                        <p>Track your delivery earnings and performance</p>
                    </div>
                    <div className="header-filters">
                        <div className="filter-group">
                            <label>Time Period</label>
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Chart Type</label>
                            <div className="chart-toggle">
                                <button
                                    className={`toggle-btn ${chartType === 'line' ? 'active' : ''}`}
                                    onClick={() => setChartType('line')}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
                                    </svg>
                                    Line
                                </button>
                                <button
                                    className={`toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
                                    onClick={() => setChartType('bar')}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Bar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card today">
                    <div className="stat-header">
                        <h3>Today</h3>
                        <div className="stat-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{formatCurrency(earningsData.summary.today.earnings)}</span>
                            <span className="label">Earned</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.today.orders}</span>
                                <span className="label">Orders</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.today.hours}h</span>
                                <span className="label">Hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card week">
                    <div className="stat-header">
                        <h3>This Week</h3>
                        <div className="stat-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7l4-4 4 4m-4-4v18" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{formatCurrency(earningsData.summary.thisWeek.earnings)}</span>
                            <span className="label">Earned</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.thisWeek.orders}</span>
                                <span className="label">Orders</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{formatCurrency(earningsData.summary.thisWeek.avgPerOrder)}</span>
                                <span className="label">Avg/Order</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card month">
                    <div className="stat-header">
                        <h3>This Month</h3>
                        <div className="stat-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{formatCurrency(earningsData.summary.thisMonth.earnings)}</span>
                            <span className="label">Earned</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.thisMonth.orders}</span>
                                <span className="label">Orders</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.thisMonth.hours}h</span>
                                <span className="label">Hours</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stat-card total">
                    <div className="stat-header">
                        <h3>All Time</h3>
                        <div className="stat-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                    </div>
                    <div className="stat-content">
                        <div className="primary-stat">
                            <span className="value">{formatCurrency(earningsData.summary.allTime.earnings)}</span>
                            <span className="label">Total Earned</span>
                        </div>
                        <div className="secondary-stats">
                            <div className="stat-item">
                                <span className="value">{earningsData.summary.allTime.orders}</span>
                                <span className="label">Orders</span>
                            </div>
                            <div className="stat-item">
                                <span className="value">{formatCurrency(earningsData.summary.allTime.avgPerOrder)}</span>
                                <span className="label">Avg/Order</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="earnings-content">
                {/* Chart Section */}
                <div className="chart-section">
                    <div className="chart-header">
                        <h3>Earnings Trend</h3>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <div className="legend-color earnings"></div>
                                <span>Earnings</span>
                            </div>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            {chartType === 'line' ? (
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line
                                        type="monotone"
                                        dataKey="earnings"
                                        stroke="#4267B2"
                                        strokeWidth={3}
                                        dot={{ fill: '#4267B2', strokeWidth: 2, r: 6 }}
                                        activeDot={{ r: 8, stroke: '#4267B2', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            ) : (
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar
                                        dataKey="earnings"
                                        fill="#4267B2"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Earnings */}
                <div className="recent-earnings">
                    <div className="section-header">
                        <h3>Recent Earnings</h3>
                        <button className="view-all-btn">
                            View All History
                        </button>
                    </div>
                    <div className="earnings-list">
                        {recentEarnings.map((earning) => (
                            <div key={earning.id} className="earning-item">
                                <div className="earning-main">
                                    <div className="earning-info">
                                        <div className="order-id">#{earning.id}</div>
                                        <div className="customer-name">{earning.customer}</div>
                                        <div className="order-details">
                                            <span className="distance">{earning.distance}</span>
                                            <span className="duration">{earning.duration}</span>
                                        </div>
                                    </div>
                                    <div className="earning-amount">
                                        <div className="driver-earning">
                                            {formatCurrency(earning.driverEarning)}
                                        </div>
                                        {/* {earning.tip > 0 && (
                                            <div className="tip-amount">
                                                +{formatCurrency(earning.tip)} tip
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                <div className="earning-meta">
                                    <span className="date">{formatDate(earning.date)}</span>
                                    <span className="time">{formatTime(earning.time)}</span>
                                    <span className="order-value">Order: {formatCurrency(earning.orderValue)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryEarnings