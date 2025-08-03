import { useState } from 'react'
import './AccountantSettings.scss'

const AccountantSettings = () => {

    const [settingsData] = useState({
        profile: {
            name: 'Sarah Johnson',
            email: 'accountant@accountant.accountant',
            employeeId: 'EMP-2025-001',
            joinDate: '2024-03-15',
            lastLogin: '2025-01-15 09:30 AM',
            status: 'Active',
            taxRate: '25.0%'
        },
        systemPreferences: {
            theme: 'Light',
            language: 'English (US)',
            timezone: 'Eastern Time (ET)',
            itemsPerPage: 10,
            autoSaveEnabled: true,
            sessionTimeout: 8
        },
        securityInfo: {
            lastPasswordChange: '2024-12-01',
            twoFactorEnabled: true,
            accountLocked: false,
            securityQuestions: 3,
        }
    })

    const [activeTab, setActiveTab] = useState('profile')

    const handlePrint = () => {
        window.print()
    }

    const handleContactAdmin = () => {
        alert('Please contact your system administrator to make changes to these settings.')
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="accountant-settings">
            <div className="page-header">
                <div className="header-content">
                    <h1>Settings</h1>
                    <p>Account preferences and system configuration (read-only access)</p>
                </div>

                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={handlePrint}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                    <button className="btn btn-primary" onClick={handleContactAdmin}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Contact Admin
                    </button>
                </div>
            </div>

            {/* Profile Summary Card */}
            <div className="profile-summary">
                <div className="profile-avatar">
                    <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile Avatar"
                    />
                </div>
                <div className="profile-info">
                    <h2>{settingsData.profile.name}</h2>
                    <p className="profile-email">{settingsData.profile.email}</p>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-label">Employee ID:</span>
                            <span className="stat-value">{settingsData.profile.employeeId}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Last Login:</span>
                            <span className="stat-value">{settingsData.profile.lastLogin}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Status:</span>
                            <span className={`status ${settingsData.profile.status.toLowerCase()}`}>
                                {settingsData.profile.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'profile' && (
                    <div className="profile-content">
                        <div className="settings-section">
                            <div className="section-header">
                                <h3>Profile Information</h3>
                                <p>Personal and professional details</p>
                            </div>

                            <div className="settings-grid">
                                <div className="setting-item">
                                    <label>Full Name</label>
                                    <div className="setting-value readonly">
                                        {settingsData.profile.name}
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <label>Email Address</label>
                                    <div className="setting-value readonly">
                                        {settingsData.profile.email}
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <label>Employee ID</label>
                                    <div className="setting-value readonly">
                                        {settingsData.profile.employeeId}
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <label>Join Date</label>
                                    <div className="setting-value readonly">
                                        {formatDate(settingsData.profile.joinDate)}
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <label>Tax Rate</label>
                                    <div className="setting-value readonly highlight">
                                        {settingsData.profile.taxRate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="security-content">
                        <div className="settings-section">
                            <div className="section-header">
                                <h3>Security & Access</h3>
                                <p>Account security and permission overview</p>
                            </div>

                            <div className="security-overview">
                                <div className="security-card">
                                    <div className="security-icon">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div className="security-info">
                                        <h4>Security Status</h4>
                                        <p className="security-status good">Account Secure</p>
                                        <span className="security-detail">All security measures active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-grid">
                                <div className="setting-item">
                                    <label>Last Password Change</label>
                                    <div className="setting-value readonly">
                                        {formatDate(settingsData.securityInfo.lastPasswordChange)}
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <label>Two-Factor Authentication</label>
                                    <div className={`setting-value readonly ${settingsData.securityInfo.twoFactorEnabled ? 'enabled' : 'disabled'}`}>
                                        {settingsData.securityInfo.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AccountantSettings