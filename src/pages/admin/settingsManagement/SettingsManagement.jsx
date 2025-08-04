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
                        commissionRate: 8.5,
                        taxRate: 25,
                        commissionIncluded: false,
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
                        <button
                            className={`nav-item ${activeTab === 'business' ? 'active' : ''}`}
                            onClick={() => setActiveTab('business')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Business
                        </button>
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
                                            'Commission Rate (%)',
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="50"
                                                value={settings.business?.commissionRate || 8.5}
                                                onChange={(e) => handleInputChange('business', 'commissionRate', parseFloat(e.target.value))}
                                            />
                                        )}
                                    </div>
                                    <div className="form-col">
                                        {renderFormGroup(
                                            'Tax Rate (%)',
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="100"
                                                value={settings.business?.taxRate || 25}
                                                onChange={(e) => handleInputChange('business', 'taxRate', parseFloat(e.target.value))}
                                            />,
                                            'Tax rate applied to all transactions'
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-col">
                                        <div className="form-group">
                                            <label className="form-label">Commission Configuration</label>
                                            {renderToggle('business', 'commissionIncluded', 'Commission Included in Prices', 'Display prices with commission included')}
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
                </div>
            </div>
        </div>
    )
}

export default SettingsManagement