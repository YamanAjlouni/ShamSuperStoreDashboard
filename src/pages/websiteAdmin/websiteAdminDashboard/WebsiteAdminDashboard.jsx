import './WebsiteAdminDashboard.scss'

const WebsiteAdminDashboard = () => {
    return (
        <div className="website-admin-dashboard">
            <div className="dashboard-header">
                <h1>Website Admin Dashboard</h1>
                <p>Manage your website content, design, and performance from this central hub</p>
            </div>

            <div className="dashboard-content">
                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-icon pages">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Active Pages</h3>
                            <p className="stat-number">24</p>
                            <p className="stat-label">Published</p>
                        </div>
                        <div className="stat-change positive">+2</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon visitors">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Monthly Visitors</h3>
                            <p className="stat-number">12.5K</p>
                            <p className="stat-label">This Month</p>
                        </div>
                        <div className="stat-change positive">+15%</div>
                    </div>

                    {/* <div className="stat-card">
                        <div className="stat-icon performance">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Site Speed</h3>
                            <p className="stat-number">94</p>
                            <p className="stat-label">Performance Score</p>
                        </div>
                        <div className="stat-change positive">+3</div>
                    </div> */}

                    <div className="stat-card">
                        <div className="stat-icon media">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Media Files</h3>
                            <p className="stat-number">342</p>
                            <p className="stat-label">Total Assets</p>
                        </div>
                        <div className="stat-change neutral">+8</div>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="dashboard-grid">
                    {/* Quick Actions */}
                    <div className="dashboard-card quick-actions">
                        <div className="card-header">
                            <h3>Quick Actions</h3>
                            <span className="card-subtitle">Common tasks</span>
                        </div>
                        <div className="actions-grid">
                            {/* <button className="action-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Add New Page</span>
                            </button> */}
                            {/* <button className="action-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Upload Media</span>
                            </button> */}
                            <button className="action-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>Edit Homepage</span>
                            </button>
                            <button className="action-btn">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span>View Analytics</span>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="dashboard-card recent-activity">
                        <div className="card-header">
                            <h3>Recent Activity</h3>
                            <span className="card-subtitle">Latest changes</span>
                        </div>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon content">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="activity-content">
                                    <p><strong>Homepage</strong> content updated</p>
                                    <span className="activity-time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon media">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="activity-content">
                                    <p>New images uploaded to <strong>Gallery</strong></p>
                                    <span className="activity-time">4 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon highlight">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <div className="activity-content">
                                    <p><strong>First Highlight</strong> section modified</p>
                                    <span className="activity-time">6 hours ago</span>
                                </div>
                            </div>
                            <div className="activity-item">
                                <div className="activity-icon news">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div className="activity-content">
                                    <p>New article published in <strong>News</strong></p>
                                    <span className="activity-time">1 day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="dashboard-card system-status">
                        <div className="card-header">
                            <h3>System Status</h3>
                            <span className="status-indicator healthy"></span>
                        </div>
                        <div className="status-grid">
                            <div className="status-item">
                                <div className="status-label">Website</div>
                                <div className="status-value online">Online</div>
                            </div>
                            <div className="status-item">
                                <div className="status-label">SSL Certificate</div>
                                <div className="status-value valid">Valid</div>
                            </div>
                            {/* <div className="status-item">
                                <div className="status-label">Last Backup</div>
                                <div className="status-value recent">2 hours ago</div>
                            </div>
                            <div className="status-item">
                                <div className="status-label">Server Response</div>
                                <div className="status-value good">245ms</div>
                            </div> */}
                        </div>
                    </div>

                    {/* Content Overview */}
                    <div className="dashboard-card content-overview">
                        <div className="card-header">
                            <h3>Content Overview</h3>
                            <span className="card-subtitle">Section summary</span>
                        </div>
                        <div className="content-list">
                            <div className="content-item">
                                <div className="content-info">
                                    <span className="content-name">Intro Section</span>
                                    <span className="content-status active">Active</span>
                                </div>
                                <span className="content-count">3 slides</span>
                            </div>
                            <div className="content-item">
                                <div className="content-info">
                                    <span className="content-name">Features Products</span>
                                    <span className="content-status active">Active</span>
                                </div>
                                <span className="content-count">8 products</span>
                            </div>
                            <div className="content-item">
                                <div className="content-info">
                                    <span className="content-name">Highlights</span>
                                    <span className="content-status active">Active</span>
                                </div>
                                <span className="content-count">3 sections</span>
                            </div>
                            <div className="content-item">
                                <div className="content-info">
                                    <span className="content-name">News Section</span>
                                    <span className="content-status active">Active</span>
                                </div>
                                <span className="content-count">12 articles</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebsiteAdminDashboard