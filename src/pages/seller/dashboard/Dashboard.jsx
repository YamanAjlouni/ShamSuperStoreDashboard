import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { Clock, DollarSign, CreditCard, Package, ShoppingCart, TrendingUp, PieChart as PieChartIcon, Bell, MessageCircle, BarChart3, MessageSquare, AlertCircle, Truck, AlertTriangle, XCircle, Backpack, Box, GitCommitVerticalIcon, MagnetIcon } from 'lucide-react'
import './Dashboard.scss'

const Dashboard = () => {
    // Sample data for charts
    const salesData = [
        { date: 'Jun 1, 25', value: 0 },
        { date: 'Jun 2, 25', value: 0 },
        { date: 'Jun 3, 25', value: 0 },
        { date: 'Jun 4, 25', value: 0 },
        { date: 'Jun 5, 25', value: 0 },
        { date: 'Jun 6, 25', value: 0 },
        { date: 'Jun 7, 25', value: 0 },
        { date: 'Jun 8, 25', value: 0 },
        { date: 'Jun 9, 25', value: 0 },
        { date: 'Jun 10, 25', value: 0 },
        { date: 'Jun 11, 25', value: 0 },
        { date: 'Jun 12, 25', value: 0 },
        { date: 'Jun 13, 25', value: 0 },
        { date: 'Jun 14, 25', value: 0 },
        { date: 'Jun 15, 25', value: 0 },
        { date: 'Jun 16, 25', value: 0 },
        { date: 'Jun 17, 25', value: 0 },
        { date: 'Jun 18, 25', value: 0 },
        { date: 'Jun 19, 25', value: 0 },
        { date: 'Jun 20, 25', value: 0 },
        { date: 'Jun 21, 25', value: 0 },
        { date: 'Jun 22, 25', value: 0 }
    ]

    const analyticsData = [
        { time: '12AM', value: 0 },
        { time: '6PM', value: 0.5 },
        { time: '12AM', value: 1.0 },
        { time: '6PM', value: 0.5 },
        { time: '12AM', value: 1.0 },
        { time: '6PM', value: 0.8 },
        { time: '12AM', value: 0.1 },
        { time: '6PM', value: 0 },
        { time: '12AM', value: 0 },
        { time: '6PM', value: 0 },
        { time: '12AM', value: 0 },
        { time: '6PM', value: 0 },
        { time: '12AM', value: 0 }
    ]

    const pieData = [
        { name: 'No sales yet...!!!', value: 100, color: '#3b82f6' }
    ]

    return (
        <div className="dashboard">
            {/* Header Section */}
            <div className="dashboard-header">
                <div className="welcome-section">
                    <div className="user-avatar">
                        <img src="https://via.placeholder.com/80" alt="User" />
                    </div>
                    <div className="welcome-text">
                        <h1>Welcome to the ShamSuperstore Dashboard</h1>
                        <p className="user-info">seller seller</p>
                        <p className="last-login">
                            <Clock size={16} />
                            Last Login: 11:39 am (June 19, 2025)
                        </p>
                    </div>
                </div>

                <div className="storage-info">
                    <div className="storage-item">
                        <span className="storage-value">0</span>
                        <span className="storage-label">/ ∞</span>
                    </div>
                    <div className="storage-item">
                        <span className="storage-value">0 MB</span>
                        <span className="storage-label">/ ∞</span>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card stat-card--sales">
                    <div className="stat-icon">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>$0.00</h3>
                        <p>gross sales in this month</p>
                    </div>
                </div>

                <div className="stat-card stat-card--fees">
                    <div className="stat-icon">
                        <CreditCard size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>$0.00</h3>
                        <p>admin fees in this month</p>
                    </div>
                </div>

                <div className="stat-card stat-card--items">
                    <div className="stat-icon">
                        <Package size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>0 items</h3>
                        <p>sold in this month</p>
                    </div>
                </div>

                <div className="stat-card stat-card--orders">
                    <div className="stat-icon">
                        <ShoppingCart size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>0 orders</h3>
                        <p>received in this month</p>
                    </div>
                </div>

                <div className="stat-card stat-card--reutrns">
                    <div className="stat-icon">
                        <Box size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>0 returns</h3>
                        <p>received in this month</p>
                    </div>
                </div>

                <div className="stat-card stat-card--review">
                    <div className="stat-icon">
                        <MagnetIcon size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>0 review</h3>
                        <p>received in this month</p>
                    </div>
                </div>
            </div>

            {/* Sales Report Chart */}
            <div className="chart-section">
                <div className="chart-container">
                    <h3>Sales Report by Date</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    fontSize={12}
                                    stroke="#9ca3af"
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    fontSize={12}
                                    stroke="#9ca3af"
                                    domain={[-1, 1]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Analytics Grid */}
            <div className="analytics-grid">
                <div className="analytics-card">
                    <div className="card-header">
                        <BarChart3 size={20} />
                        <h3>Store Analytics</h3>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={analyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    fontSize={12}
                                    stroke="#9ca3af"
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    fontSize={12}
                                    stroke="#9ca3af"
                                    domain={[0, 1]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#f59e0b"
                                    fill="#fef3c7"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-card">
                    <div className="card-header">
                        <PieChartIcon size={20} />
                        <h3>Sales by Product</h3>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={80}
                                    paddingAngle={0}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legend">
                            <div className="legend-item">
                                <span className="legend-color" style={{ backgroundColor: '#3b82f6' }}></span>
                                <span className="legend-text">No sales yet...!!!</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="analytics-card">
                    <div className="card-header">
                        <Bell size={20} />
                        <h3>Notifications</h3>
                    </div>
                    <div className="empty-state">
                        <p>There is no notification yet!!</p>
                    </div>
                </div>

                <div className="analytics-card">
                    <div className="card-header">
                        <MessageCircle size={20} />
                        <h3>Inquiries</h3>
                    </div>
                    <div className="empty-state">
                        <p>There is no inquiry yet!!</p>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="bottom-stats">
                <div className="stats-card">
                    <div className="card-header">
                        <BarChart3 size={20} />
                        <h3>Store Stats</h3>
                    </div>
                    <div className="stats-list">
                        <div className="stats-item">
                            <AlertCircle className="stats-icon stats-icon--warning" size={20} />
                            <span className="stats-count">0</span>
                            <span className="stats-label">orders - processing</span>
                        </div>
                        <div className="stats-item">
                            <Truck className="stats-icon stats-icon--danger" size={20} />
                            <span className="stats-count">0</span>
                            <span className="stats-label">products - awaiting fulfillment</span>
                        </div>
                        <div className="stats-item">
                            <AlertTriangle className="stats-icon stats-icon--warning" size={20} />
                            <span className="stats-count">0</span>
                            <span className="stats-label">products - low in stock</span>
                        </div>
                        <div className="stats-item">
                            <XCircle className="stats-icon stats-icon--danger" size={20} />
                            <span className="stats-count">0</span>
                            <span className="stats-label">products - out of stock</span>
                        </div>
                    </div>
                </div>

                <div className="stats-card">
                    <div className="card-header">
                        <MessageSquare size={20} />
                        <h3>Latest Topics</h3>
                    </div>
                    <div className="empty-state">
                        <p>There is no topic yet!!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard