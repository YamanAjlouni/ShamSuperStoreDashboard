import { useState } from 'react';
import './AdminRevenueReports.scss';

const AdminRevenueReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Mock revenue data (removed commission details)
    const revenueOverview = {
        totalRevenue: 45680,
        totalDeliveries: 1245,
        averageOrderValue: 36.70,
        growth: 12.5
    };

    const weeklyData = [
        { week: 'Week 1', revenue: 8450, deliveries: 245 },
        { week: 'Week 2', revenue: 9200, deliveries: 267 },
        { week: 'Week 3', revenue: 11800, deliveries: 342 },
        { week: 'Week 4', revenue: 16230, deliveries: 391 }
    ];

    const topDrivers = [
        { id: 1, name: 'Ahmed Al-Mohammad', earnings: 2450, deliveries: 89, city: 'Damascus' },
        { id: 2, name: 'Omar Al-Zahra', earnings: 2180, deliveries: 76, city: 'Aleppo' },
        { id: 3, name: 'Mohammad Al-Rashid', earnings: 1890, deliveries: 67, city: 'Homs' },
        { id: 4, name: 'Youssef Al-Hassan', earnings: 1560, deliveries: 54, city: 'Latakia' },
        { id: 5, name: 'Khalil Al-Masri', earnings: 1340, deliveries: 48, city: 'Daraa' }
    ];

    const cityRevenueData = [
        { city: 'Damascus', revenue: 15420, percentage: 33.8, deliveries: 456 },
        { city: 'Aleppo', revenue: 12360, percentage: 27.1, deliveries: 367 },
        { city: 'Homs', revenue: 8940, percentage: 19.6, deliveries: 234 },
        { city: 'Latakia', revenue: 5680, percentage: 12.4, deliveries: 123 },
        { city: 'Daraa', revenue: 3280, percentage: 7.1, deliveries: 65 }
    ];

    // Changed from transactions to recent deliveries
    const recentDeliveries = [
        { 
            id: '#ORD001', 
            driver: 'Ahmed Al-Mohammad', 
            customer: 'Sarah Al-Mahmoud',
            from: 'Damascus',
            to: 'Aleppo',
            amount: 145, 
            date: '2024-07-11', 
            status: 'delivered' 
        },
        { 
            id: '#ORD002', 
            driver: 'Omar Al-Zahra', 
            customer: 'Mohammad Al-Rashid',
            from: 'Aleppo',
            to: 'Homs',
            amount: 89, 
            date: '2024-07-11', 
            status: 'delivered' 
        },
        { 
            id: '#ORD003', 
            driver: 'Mohammad Al-Rashid', 
            customer: 'Layla Al-Hassan',
            from: 'Homs',
            to: 'Latakia',
            amount: 234, 
            date: '2024-07-10', 
            status: 'in-transit' 
        },
        { 
            id: '#ORD004', 
            driver: 'Youssef Al-Hassan', 
            customer: 'Khaled Al-Mousa',
            from: 'Latakia',
            to: 'Damascus',
            amount: 167, 
            date: '2024-07-10', 
            status: 'delivered' 
        },
        { 
            id: '#ORD005', 
            driver: 'Khalil Al-Masri', 
            customer: 'Fatima Al-Zahra',
            from: 'Daraa',
            to: 'Damascus',
            amount: 198, 
            date: '2024-07-09', 
            status: 'delivered' 
        }
    ];

    const getStatusClass = (status) => {
        switch(status) {
            case 'delivered': return 'status-delivered';
            case 'in-transit': return 'status-transit';
            case 'processing': return 'status-processing';
            default: return '';
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'delivered': return 'Delivered';
            case 'in-transit': return 'In Transit';
            case 'processing': return 'Processing';
            default: return status;
        }
    };

    const handleExportData = () => {
        console.log('Exporting revenue data...');
        alert('Revenue report exported successfully!');
    };

    return (
        <div className="revenue-reports">
            <div className="reports-header">
                <div className="header-top">
                    <h1>Revenue Reports & Analytics</h1>
                    <div className="header-actions">
                        <select 
                            className="period-selector"
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="export-btn" onClick={handleExportData}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Revenue Overview Cards (removed commission card) */}
                <div className="revenue-overview">
                    <div className="overview-card total-revenue">
                        <div className="card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>${revenueOverview.totalRevenue.toLocaleString()}</h3>
                            <p>Total Revenue</p>
                            <div className="growth-indicator positive">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                +{revenueOverview.growth}%
                            </div>
                        </div>
                    </div>

                    <div className="overview-card deliveries">
                        <div className="card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>{revenueOverview.totalDeliveries.toLocaleString()}</h3>
                            <p>Total Deliveries</p>
                            <div className="average">
                                Avg: ${revenueOverview.averageOrderValue}
                            </div>
                        </div>
                    </div>

                    <div className="overview-card daily-average">
                        <div className="card-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div className="card-content">
                            <h3>${(revenueOverview.totalRevenue / 30).toFixed(0)}</h3>
                            <p>Daily Average</p>
                            <div className="percentage">
                                Per day earnings
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="reports-content">
                <div className="reports-grid">
                    {/* Weekly Revenue Chart - Fixed Design */}
                    <div className="report-section chart-section">
                        <h3>📊 Weekly Revenue Trend</h3>
                        <div className="chart-container">
                            <div className="chart-wrapper">
                                {weeklyData.map((week, index) => (
                                    <div key={index} className="chart-bar-container">
                                        <div className="chart-bar-wrapper">
                                            <div 
                                                className="revenue-bar"
                                                style={{ height: `${(week.revenue / 16230) * 200}px` }}
                                                title={`${week.week}: $${week.revenue.toLocaleString()}`}
                                            >
                                                <div className="bar-value">${(week.revenue / 1000).toFixed(1)}K</div>
                                            </div>
                                        </div>
                                        <div className="bar-info">
                                            <div className="week-name">{week.week}</div>
                                            <div className="week-amount">${week.revenue.toLocaleString()}</div>
                                            <div className="week-deliveries">{week.deliveries} orders</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* City Revenue Breakdown */}
                    <div className="report-section city-breakdown">
                        <h3>🏙️ Revenue by City</h3>
                        <div className="city-list">
                            {cityRevenueData.map((city, index) => (
                                <div key={index} className="city-item">
                                    <div className="city-info">
                                        <span className="city-name">{city.city}</span>
                                        <span className="city-deliveries">{city.deliveries} deliveries</span>
                                    </div>
                                    <div className="city-revenue">
                                        <span className="revenue-amount">${city.revenue.toLocaleString()}</span>
                                        <span className="revenue-percentage">{city.percentage}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div 
                                            className="progress-fill"
                                            style={{ width: `${city.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Performing Drivers */}
                    <div className="report-section drivers-section">
                        <h3>🏆 Top Performing Drivers</h3>
                        <div className="drivers-table">
                            <div className="table-header">
                                <span>Driver</span>
                                <span>City</span>
                                <span>Earnings</span>
                                <span>Deliveries</span>
                            </div>
                            {topDrivers.map((driver, index) => (
                                <div key={driver.id} className="table-row">
                                    <div className="driver-info">
                                        <div className="driver-rank">#{index + 1}</div>
                                        <span className="driver-name">{driver.name}</span>
                                    </div>
                                    <span className="driver-city">{driver.city}</span>
                                    <span className="driver-earnings">${driver.earnings}</span>
                                    <span className="driver-deliveries">{driver.deliveries}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Deliveries (changed from transactions) */}
                    <div className="report-section deliveries-section">
                        <h3>🚚 Recent Deliveries</h3>
                        <div className="deliveries-list">
                            {recentDeliveries.map((delivery) => (
                                <div key={delivery.id} className="delivery-item">
                                    <div className="delivery-main-info">
                                        <div className="delivery-header">
                                            <span className="delivery-id">{delivery.id}</span>
                                            <span className={`status ${getStatusClass(delivery.status)}`}>
                                                {getStatusText(delivery.status)}
                                            </span>
                                        </div>
                                        <div className="delivery-route">
                                            <span className="route">{delivery.from} → {delivery.to}</span>
                                        </div>
                                        <div className="delivery-details">
                                            <span className="driver">Driver: {delivery.driver}</span>
                                            <span className="customer">Customer: {delivery.customer}</span>
                                        </div>
                                    </div>
                                    <div className="delivery-amount-info">
                                        <span className="delivery-amount">${delivery.amount}</span>
                                        <span className="delivery-date">{delivery.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revenue Summary Cards */}
                    <div className="report-section summary-cards">
                        <h3>📈 Quick Summary</h3>
                        <div className="summary-grid">
                            <div className="summary-card">
                                <div className="summary-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div className="summary-content">
                                    <h4>Monthly Goal</h4>
                                    <p>85%</p>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="summary-content">
                                    <h4>Active Drivers</h4>
                                    <p>{topDrivers.length}</p>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div className="summary-content">
                                    <h4>Cities Served</h4>
                                    <p>{cityRevenueData.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRevenueReports;