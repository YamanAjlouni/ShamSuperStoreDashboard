import { useState, useEffect } from 'react'
import './SettingsManagement.scss'

const SettingsManagement = () => {
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('general')
    const [saving, setSaving] = useState('')
    const [savedMessage, setSavedMessage] = useState('')
    const [settings, setSettings] = useState({})

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true)
            setTimeout(() => {
                const mockSettings = {
                    general: {
                        siteName: 'ShamSuperStore',
                        siteDescription: 'Your premier online marketplace for everything',
                        contactEmail: 'support@mymarketplace.com',
                        supportPhone: '+1 (555) 123-4567',
                        address: '123 Business St, City, State 12345',
                        timezone: 'America/New_York',
                        language: 'en',
                        currency: 'USD',
                        dateFormat: 'MM/DD/YYYY',
                        timeFormat: '12h'
                    },
                    notifications: {
                        emailNotifications: true,
                        smsNotifications: false,
                        pushNotifications: true,
                        orderNotifications: true,
                        userRegistrationNotifications: true,
                        sellerNotifications: true,
                        systemAlerts: true,
                        marketingEmails: false,
                        weeklyReports: true,
                        monthlyReports: true
                    },
                    security: {
                        twoFactorAuth: false,
                        passwordMinLength: 8,
                        passwordRequireUppercase: true,
                        passwordRequireNumbers: true,
                        passwordRequireSymbols: false,
                        sessionTimeout: 30,
                        maxLoginAttempts: 5,
                        lockoutDuration: 15,
                        forcePasswordChange: false,
                        allowMultipleSessions: true
                    },
                    business: {
                        taxRate: 8.5,
                        taxIncluded: false,
                        shippingEnabled: true,
                        freeShippingThreshold: 50,
                        defaultShippingCost: 9.99,
                        orderProcessingTime: 24,
                        returnPolicy: 30,
                        minimumOrderAmount: 10,
                        maxOrderAmount: 5000,
                        inventoryTracking: true,
                        lowStockAlert: 5,
                        autoReorderEnabled: false
                    },
                    integrations: {
                        paypalEnabled: false,
                        stripeEnabled: true,
                        googleAnalyticsId: '',
                        facebookPixelId: '',
                        mailchimpApiKey: '',
                        twilioEnabled: false,
                        slackWebhook: '',
                        zapierEnabled: false,
                        apiRateLimit: 1000,
                        webhooksEnabled: true
                    },
                    appearance: {
                        theme: 'light',
                        primaryColor: '#4267B2',
                        secondaryColor: '#CE802D',
                        logoUrl: '',
                        faviconUrl: '',
                        customCSS: '',
                        showBranding: true,
                        compactMode: false,
                        animationsEnabled: true
                    }
                }
                setSettings(mockSettings)
                setLoading(false)
            }, 1000)
        }

        fetchSettings()
    }, [])

    const handleInputChange = (category, field, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }))
    }

    const handleSave = async (category) => {
        setSaving(category)
        // Simulate API call
        setTimeout(() => {
            setSaving('')
            setSavedMessage(`${category.charAt(0).toUpperCase() + category.slice(1)} settings saved successfully!`)
            setTimeout(() => setSavedMessage(''), 3000)
        }, 1500)
    }

    const handleReset = (category) => {
        if (window.confirm('Are you sure you want to reset these settings to default values?')) {
            // Reset logic would go here
            console.log(`Resetting ${category} settings`)
        }
    }

    const renderFormGroup = (label, children, description = null) => (
        <div className="form-group">
            <label className="form-label">{label}</label>
            {children}
            {description && <p className="form-description">{description}</p>}
        </div>
    )

    const renderToggle = (category, field, label, description = null) => (
        <div className="toggle-group">
            <div className="toggle-info">
                <span className="toggle-label">{label}</span>
                {description && <span className="toggle-description">{description}</span>}
            </div>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={settings[category]?.[field] || false}
                    onChange={(e) => handleInputChange(category, field, e.target.checked)}
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    )

    if (loading) {
        return (
            <div className="settings-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="settings-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>System Settings</h1>
                    <p>Configure your application settings and preferences</p>
                </div>
                {savedMessage && (
                    <div className="save-message">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {savedMessage}
                    </div>
                )}
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <nav className="settings-nav">
                        <button
                            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            General
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v2H4v-2zM6 7v10H4V7h2zM20 3H8v14h12V3z" />
                            </svg>
                            Notifications
                        </button>
                        {/* <button
                            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Security
                        </button> */}
                        <button
                            className={`nav-item ${activeTab === 'business' ? 'active' : ''}`}
                            onClick={() => setActiveTab('business')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Business
                        </button>
                        {/* <button
                            className={`nav-item ${activeTab === 'integrations' ? 'active' : ''}`}
                            onClick={() => setActiveTab('integrations')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Integrations
                        </button> */}
                        {/* <button
                            className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
                            </svg>
                            Appearance
                        </button> */}
                    </nav>
                </div>

                <div className="settings-content">
                    {activeTab === 'general' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>General Settings</h2>
                                <p>Basic information and configuration for your application</p>
                            </div>
                            <div className="settings-form">
                                {renderFormGroup(
                                    'Site Name',
                                    <input
                                        type="text"
                                        value={settings.general?.siteName || ''}
                                        onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                                        placeholder="Enter site name"
                                    />,
                                    'The name of your marketplace that appears in the header and emails'
                                )}

                                {renderFormGroup(
                                    'Site Description',
                                    <textarea
                                        value={settings.general?.siteDescription || ''}
                                        onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                                        placeholder="Enter site description"
                                        rows={3}
                                    />,
                                    'A brief description of your marketplace for SEO and marketing'
                                )}

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Contact Email',
                                            <input
                                                type="email"
                                                value={settings.general?.contactEmail || ''}
                                                onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                                                placeholder="support@example.com"
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Support Phone',
                                            <input
                                                type="tel"
                                                value={settings.general?.supportPhone || ''}
                                                onChange={(e) => handleInputChange('general', 'supportPhone', e.target.value)}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        )}
                                    </div>
                                </div>

                                {renderFormGroup(
                                    'Business Address',
                                    <input
                                        type="text"
                                        value={settings.general?.address || ''}
                                        onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                                        placeholder="123 Business St, City, State 12345"
                                    />
                                )}

                                <div className="form-row">
                                    {/* <div className="form-col">
                                        {renderFormGroup(
                                            'Timezone',
                                            <select
                                                value={settings.general?.timezone || 'America/New_York'}
                                                onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
                                            >
                                                <option value="America/New_York">Eastern Time</option>
                                                <option value="America/Chicago">Central Time</option>
                                                <option value="America/Denver">Mountain Time</option>
                                                <option value="America/Los_Angeles">Pacific Time</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        )}
                                    </div> */}
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Language',
                                            <select
                                                value={settings.general?.language || 'en'}
                                                onChange={(e) => handleInputChange('general', 'language', e.target.value)}
                                            >
                                                <option value="en">English</option>
                                                <option value="ar">Arabic</option>
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Currency',
                                            <select
                                                value={settings.general?.currency || 'USD'}
                                                onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
                                            >
                                                <option value="USD">US Dollar ($)</option>
                                                <option value="SYR">Syrian Pound</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Date Format',
                                            <select
                                                value={settings.general?.dateFormat || 'MM/DD/YYYY'}
                                                onChange={(e) => handleInputChange('general', 'dateFormat', e.target.value)}
                                            >
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            </select>
                                        )}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('general')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('general')}
                                        disabled={saving === 'general'}
                                    >
                                        {saving === 'general' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Notification Settings</h2>
                                <p>Configure how you want to receive notifications and alerts</p>
                            </div>
                            <div className="settings-form">
                                <div className="toggle-section">
                                    <h3>Communication Preferences</h3>
                                    {renderToggle('notifications', 'emailNotifications', 'Email Notifications', 'Receive notifications via email')}
                                    {/* {renderToggle('notifications', 'smsNotifications', 'SMS Notifications', 'Receive notifications via text message')} */}
                                    {renderToggle('notifications', 'pushNotifications', 'Push Notifications', 'Receive browser push notifications')}
                                </div>

                                <div className="toggle-section">
                                    <h3>System Notifications</h3>
                                    {renderToggle('notifications', 'orderNotifications', 'Order Notifications', 'Get notified about new orders and order updates')}
                                    {renderToggle('notifications', 'userRegistrationNotifications', 'User Registration', 'Get notified when new users register')}
                                    {renderToggle('notifications', 'sellerNotifications', 'Seller Notifications', 'Get notified about seller activities')}
                                    {renderToggle('notifications', 'systemAlerts', 'System Alerts', 'Receive important system alerts and warnings')}
                                </div>

                                <div className="toggle-section">
                                    <h3>Marketing & Reports</h3>
                                    {renderToggle('notifications', 'marketingEmails', 'Marketing Emails', 'Receive marketing and promotional emails')}
                                    {renderToggle('notifications', 'weeklyReports', 'Weekly Reports', 'Receive weekly performance reports')}
                                    {renderToggle('notifications', 'monthlyReports', 'Monthly Reports', 'Receive monthly analytics reports')}
                                </div>

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('notifications')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('notifications')}
                                        disabled={saving === 'notifications'}
                                    >
                                        {saving === 'notifications' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Security Settings</h2>
                                <p>Configure security policies and authentication settings</p>
                            </div>
                            <div className="settings-form">
                                <div className="toggle-section">
                                    <h3>Authentication</h3>
                                    {renderToggle('security', 'twoFactorAuth', 'Two-Factor Authentication', 'Require 2FA for admin accounts')}
                                    {renderToggle('security', 'allowMultipleSessions', 'Multiple Sessions', 'Allow users to be logged in from multiple devices')}
                                    {renderToggle('security', 'forcePasswordChange', 'Force Password Change', 'Require password change on first login')}
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Minimum Password Length',
                                            <input
                                                type="number"
                                                min="6"
                                                max="32"
                                                value={settings.security?.passwordMinLength || 8}
                                                onChange={(e) => handleInputChange('security', 'passwordMinLength', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Session Timeout (minutes)',
                                            <input
                                                type="number"
                                                min="5"
                                                max="1440"
                                                value={settings.security?.sessionTimeout || 30}
                                                onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="toggle-section">
                                    <h3>Password Requirements</h3>
                                    {renderToggle('security', 'passwordRequireUppercase', 'Require Uppercase', 'Passwords must contain uppercase letters')}
                                    {renderToggle('security', 'passwordRequireNumbers', 'Require Numbers', 'Passwords must contain numbers')}
                                    {renderToggle('security', 'passwordRequireSymbols', 'Require Symbols', 'Passwords must contain special characters')}
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Max Login Attempts',
                                            <input
                                                type="number"
                                                min="3"
                                                max="10"
                                                value={settings.security?.maxLoginAttempts || 5}
                                                onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Lockout Duration (minutes)',
                                            <input
                                                type="number"
                                                min="5"
                                                max="60"
                                                value={settings.security?.lockoutDuration || 15}
                                                onChange={(e) => handleInputChange('security', 'lockoutDuration', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('security')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('security')}
                                        disabled={saving === 'security'}
                                    >
                                        {saving === 'security' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'business' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Business Settings</h2>
                                <p>Configure your business rules and operational settings</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Tax Rate (%)',
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="50"
                                                value={settings.business?.taxRate || 8.5}
                                                onChange={(e) => handleInputChange('business', 'taxRate', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        <div className="form-group">
                                            <label className="form-label">Tax Configuration</label>
                                            {renderToggle('business', 'taxIncluded', 'Tax Included in Prices', 'Display prices with tax included')}
                                        </div>
                                    </div>
                                </div>

                                <div className="toggle-section">
                                    <h3>Shipping Settings</h3>
                                    {renderToggle('business', 'shippingEnabled', 'Enable Shipping', 'Allow customers to choose shipping options')}
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Free Shipping Threshold ($)',
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={settings.business?.freeShippingThreshold || 50}
                                                onChange={(e) => handleInputChange('business', 'freeShippingThreshold', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Default Shipping Cost ($)',
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={settings.business?.defaultShippingCost || 9.99}
                                                onChange={(e) => handleInputChange('business', 'defaultShippingCost', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Order Processing Time (hours)',
                                            <input
                                                type="number"
                                                min="1"
                                                max="168"
                                                value={settings.business?.orderProcessingTime || 24}
                                                onChange={(e) => handleInputChange('business', 'orderProcessingTime', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Return Policy (days)',
                                            <input
                                                type="number"
                                                min="0"
                                                max="365"
                                                value={settings.business?.returnPolicy || 30}
                                                onChange={(e) => handleInputChange('business', 'returnPolicy', parseInt(e.target.value))}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Minimum Order Amount ($)',
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={settings.business?.minimumOrderAmount || 10}
                                                onChange={(e) => handleInputChange('business', 'minimumOrderAmount', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Maximum Order Amount ($)',
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={settings.business?.maxOrderAmount || 5000}
                                                onChange={(e) => handleInputChange('business', 'maxOrderAmount', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="toggle-section">
                                    <h3>Inventory Management</h3>
                                    {renderToggle('business', 'inventoryTracking', 'Enable Inventory Tracking', 'Track product stock levels')}
                                    {renderToggle('business', 'autoReorderEnabled', 'Auto Reorder', 'Automatically reorder low stock items')}
                                </div>

                                {renderFormGroup(
                                    'Low Stock Alert Threshold',
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={settings.business?.lowStockAlert || 5}
                                        onChange={(e) => handleInputChange('business', 'lowStockAlert', parseInt(e.target.value))}
                                    />,
                                    'Send alerts when stock falls below this number'
                                )}

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('business')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('business')}
                                        disabled={saving === 'business'}
                                    >
                                        {saving === 'business' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Integrations</h2>
                                <p>Configure third-party services and API integrations</p>
                            </div>
                            <div className="settings-form">
                                <div className="toggle-section">
                                    <h3>Payment Gateways</h3>
                                    {renderToggle('integrations', 'stripeEnabled', 'Stripe Integration', 'Enable Stripe payment processing')}
                                    {renderToggle('integrations', 'paypalEnabled', 'PayPal Integration', 'Enable PayPal payment processing')}
                                </div>

                                <div className="toggle-section">
                                    <h3>Analytics & Marketing</h3>
                                    {renderFormGroup(
                                        'Google Analytics ID',
                                        <input
                                            type="text"
                                            value={settings.integrations?.googleAnalyticsId || ''}
                                            onChange={(e) => handleInputChange('integrations', 'googleAnalyticsId', e.target.value)}
                                            placeholder="UA-XXXXXXXX-X or G-XXXXXXXXXX"
                                        />
                                    )}

                                    {renderFormGroup(
                                        'Facebook Pixel ID',
                                        <input
                                            type="text"
                                            value={settings.integrations?.facebookPixelId || ''}
                                            onChange={(e) => handleInputChange('integrations', 'facebookPixelId', e.target.value)}
                                            placeholder="1234567890123456"
                                        />
                                    )}

                                    {renderFormGroup(
                                        'Mailchimp API Key',
                                        <input
                                            type="password"
                                            value={settings.integrations?.mailchimpApiKey || ''}
                                            onChange={(e) => handleInputChange('integrations', 'mailchimpApiKey', e.target.value)}
                                            placeholder="Enter your Mailchimp API key"
                                        />
                                    )}
                                </div>

                                <div className="toggle-section">
                                    <h3>Communication & Notifications</h3>
                                    {renderToggle('integrations', 'twilioEnabled', 'Twilio SMS', 'Enable SMS notifications via Twilio')}

                                    {renderFormGroup(
                                        'Slack Webhook URL',
                                        <input
                                            type="url"
                                            value={settings.integrations?.slackWebhook || ''}
                                            onChange={(e) => handleInputChange('integrations', 'slackWebhook', e.target.value)}
                                            placeholder="https://hooks.slack.com/services/..."
                                        />
                                    )}
                                </div>

                                <div className="toggle-section">
                                    <h3>API & Automation</h3>
                                    {renderToggle('integrations', 'webhooksEnabled', 'Webhooks', 'Enable webhook notifications')}
                                    {renderToggle('integrations', 'zapierEnabled', 'Zapier Integration', 'Enable Zapier automation')}

                                    {renderFormGroup(
                                        'API Rate Limit (requests/hour)',
                                        <input
                                            type="number"
                                            min="100"
                                            max="10000"
                                            value={settings.integrations?.apiRateLimit || 1000}
                                            onChange={(e) => handleInputChange('integrations', 'apiRateLimit', parseInt(e.target.value))}
                                        />
                                    )}
                                </div>

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('integrations')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('integrations')}
                                        disabled={saving === 'integrations'}
                                    >
                                        {saving === 'integrations' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Appearance Settings</h2>
                                <p>Customize the look and feel of your application</p>
                            </div>
                            <div className="settings-form">
                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Theme',
                                            <select
                                                value={settings.appearance?.theme || 'light'}
                                                onChange={(e) => handleInputChange('appearance', 'theme', e.target.value)}
                                            >
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                                <option value="auto">Auto (System)</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-col">
                                        <div className="form-group">
                                            <label className="form-label">Display Options</label>
                                            {renderToggle('appearance', 'compactMode', 'Compact Mode', 'Use smaller spacing and components')}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Primary Color',
                                            <div className="color-input-group">
                                                <input
                                                    type="color"
                                                    value={settings.appearance?.primaryColor || '#4267B2'}
                                                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.appearance?.primaryColor || '#4267B2'}
                                                    onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                                                    placeholder="#4267B2"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Secondary Color',
                                            <div className="color-input-group">
                                                <input
                                                    type="color"
                                                    value={settings.appearance?.secondaryColor || '#CE802D'}
                                                    onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.appearance?.secondaryColor || '#CE802D'}
                                                    onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                                                    placeholder="#CE802D"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Logo URL',
                                            <input
                                                type="url"
                                                value={settings.appearance?.logoUrl || ''}
                                                onChange={(e) => handleInputChange('appearance', 'logoUrl', e.target.value)}
                                                placeholder="https://example.com/logo.png"
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Favicon URL',
                                            <input
                                                type="url"
                                                value={settings.appearance?.faviconUrl || ''}
                                                onChange={(e) => handleInputChange('appearance', 'faviconUrl', e.target.value)}
                                                placeholder="https://example.com/favicon.ico"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="toggle-section">
                                    <h3>Additional Options</h3>
                                    {renderToggle('appearance', 'showBranding', 'Show Branding', 'Display your branding throughout the interface')}
                                    {renderToggle('appearance', 'animationsEnabled', 'Enable Animations', 'Use smooth animations and transitions')}
                                </div>

                                {renderFormGroup(
                                    'Custom CSS',
                                    <textarea
                                        value={settings.appearance?.customCSS || ''}
                                        onChange={(e) => handleInputChange('appearance', 'customCSS', e.target.value)}
                                        placeholder="/* Add your custom CSS here */"
                                        rows={6}
                                    />,
                                    'Add custom CSS to override default styles'
                                )}

                                <div className="form-actions">
                                    <button
                                        className="btn btn--secondary"
                                        onClick={() => handleReset('appearance')}
                                    >
                                        Reset to Default
                                    </button>
                                    <button
                                        className="btn btn--primary"
                                        onClick={() => handleSave('appearance')}
                                        disabled={saving === 'appearance'}
                                    >
                                        {saving === 'appearance' ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SettingsManagement