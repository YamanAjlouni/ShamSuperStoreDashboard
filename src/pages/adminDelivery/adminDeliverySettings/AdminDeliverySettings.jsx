import { useState } from 'react';
import './AdminDeliverySettings.scss';

const AdminDeliverySettings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [formData, setFormData] = useState({
        // Profile Settings
        adminName: 'Ahmed Hassan',
        email: 'ahmed.hassan@deliveryapp.com',
        phone: '+201234567890',
        role: 'Super Admin',

        // Company Settings
        companyName: 'DeliveryApp Syria',
        companyAddress: '123 Nasr City, Damascus, Syria',
        companyPhone: '+20122334455',
        companyEmail: 'info@deliveryapp.com',

        // Delivery Settings
        deliveryRadius: '15',
        minOrderAmount: '50',
        deliveryFee: '25',
        freeDeliveryThreshold: '200',
        avgDeliveryTime: '30',

        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        orderUpdates: true,
        driverUpdates: true,
        customerFeedback: true,

        // Security Settings
        twoFactorAuth: false,
        sessionTimeout: '60',
        passwordExpiry: '90',
    });

    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveSettings = (section) => {
        // Here you would typically make an API call to save the settings
        console.log(`Saving ${section} settings:`, formData);
        alert(`${section} settings saved successfully!`);
    };

    const handlePasswordUpdate = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        // API call to update password
        console.log('Updating password...');
        alert('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordChange(false);
    };

    const menuItems = [
        { id: 'profile', label: 'Admin Profile', icon: '👤' },
        { id: 'company', label: 'Company Info', icon: '🏢' },
        { id: 'delivery', label: 'Delivery Settings', icon: '🚚' },
        // { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'security', label: 'Security', icon: '🔒' },
    ];

    return (
        <div className="admin-settings">
            <div className="settings-header">
                <h1>Admin Settings</h1>
                <p>Manage your admin panel configuration and preferences</p>
            </div>

            <div className="settings-container">
                <div className="settings-sidebar">
                    <div className="settings-menu">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="settings-content">
                    {activeSection === 'profile' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Admin Profile</h2>
                                <p>Manage your personal information and account details</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="adminName"
                                        value={formData.adminName}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* <div className="form-group">
                                    <label>Role</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange}>
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                </div> */}
                            </div>

                            <div className="password-section">
                                <h3>Password Management</h3>
                                <button
                                    className="change-password-btn"
                                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                                >
                                    {showPasswordChange ? 'Cancel' : 'Change Password'}
                                </button>

                                {showPasswordChange && (
                                    <div className="password-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Enter current password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                        <button className="update-password-btn" onClick={handlePasswordUpdate}>
                                            Update Password
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="section-actions">
                                <button className="save-btn" onClick={() => handleSaveSettings('profile')}>
                                    Save Profile Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'company' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Company Information</h2>
                                <p>Update your company details and contact information</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label>Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        placeholder="Enter company name"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Company Address</label>
                                    <textarea
                                        name="companyAddress"
                                        value={formData.companyAddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter complete company address"
                                        rows="3"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Company Phone</label>
                                    <input
                                        type="tel"
                                        name="companyPhone"
                                        value={formData.companyPhone}
                                        onChange={handleInputChange}
                                        placeholder="Enter company phone"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Company Email</label>
                                    <input
                                        type="email"
                                        name="companyEmail"
                                        value={formData.companyEmail}
                                        onChange={handleInputChange}
                                        placeholder="Enter company email"
                                    />
                                </div>
                            </div>

                            <div className="section-actions">
                                <button className="save-btn" onClick={() => handleSaveSettings('company')}>
                                    Save Company Info
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'delivery' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Delivery Settings</h2>
                                <p>Configure delivery parameters and pricing</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Delivery Radius (km)</label>
                                    <input
                                        type="number"
                                        name="deliveryRadius"
                                        value={formData.deliveryRadius}
                                        onChange={handleInputChange}
                                        placeholder="15"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Minimum Order Amount (SYR)</label>
                                    <input
                                        type="number"
                                        name="minOrderAmount"
                                        value={formData.minOrderAmount}
                                        onChange={handleInputChange}
                                        placeholder="50"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Delivery Fee (SYR)</label>
                                    <input
                                        type="number"
                                        name="deliveryFee"
                                        value={formData.deliveryFee}
                                        onChange={handleInputChange}
                                        placeholder="25"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Free Delivery Threshold (SYR)</label>
                                    <input
                                        type="number"
                                        name="freeDeliveryThreshold"
                                        value={formData.freeDeliveryThreshold}
                                        onChange={handleInputChange}
                                        placeholder="200"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Average Delivery Time (minutes)</label>
                                    <input
                                        type="number"
                                        name="avgDeliveryTime"
                                        value={formData.avgDeliveryTime}
                                        onChange={handleInputChange}
                                        placeholder="30"
                                    />
                                </div>
                            </div>

                            <div className="section-actions">
                                <button className="save-btn" onClick={() => handleSaveSettings('delivery')}>
                                    Save Delivery Settings
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Notification Preferences</h2>
                                <p>Choose how you want to receive notifications</p>
                            </div>

                            <div className="notifications-grid">
                                <div className="notification-category">
                                    <h3>Communication Methods</h3>
                                    <div className="toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="emailNotifications"
                                                    checked={formData.emailNotifications}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>Email Notifications</span>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="smsNotifications"
                                                    checked={formData.smsNotifications}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>SMS Notifications</span>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="pushNotifications"
                                                    checked={formData.pushNotifications}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>Push Notifications</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="notification-category">
                                    <h3>Notification Types</h3>
                                    <div className="toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="orderUpdates"
                                                    checked={formData.orderUpdates}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>Order Updates</span>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="driverUpdates"
                                                    checked={formData.driverUpdates}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>Driver Updates</span>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    name="customerFeedback"
                                                    checked={formData.customerFeedback}
                                                    onChange={handleInputChange}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                            <span>Customer Feedback</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="section-actions">
                                <button className="save-btn" onClick={() => handleSaveSettings('notifications')}>
                                    Save Notification Settings
                                </button>
                            </div>
                        </div>
                    )}

                    {activeSection === 'security' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Security Settings</h2>
                                <p>Manage security and access control settings</p>
                            </div>

                            <div className="security-grid">
                                <div className="security-item">
                                    <div className="security-info">
                                        <h3>Two-Factor Authentication</h3>
                                        <p>Add an extra layer of security to your account</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            name="twoFactorAuth"
                                            checked={formData.twoFactorAuth}
                                            onChange={handleInputChange}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                            </div>

                            <div className="section-actions">
                                <button className="save-btn" onClick={() => handleSaveSettings('security')}>
                                    Save Security Settings
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDeliverySettings;