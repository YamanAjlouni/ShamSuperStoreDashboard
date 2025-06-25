import { useState } from 'react'
import { Save, Upload, Camera, User, Store, Shield, Eye, EyeOff } from 'lucide-react'
import seller from '../../assets/images/seller/userimage.jpg'
import './Settings.scss'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('store')
    const [showPassword, setShowPassword] = useState(false)
    
    // Store Information State
    const [storeData, setStoreData] = useState({
        storeName: 'ShamSuperStore',
        description: 'Your one-stop shop for quality products',
        email: 'store@shamsuperstore.com',
        phone: '+963 11 123 4567',
        address: 'شارع الحمرا، حي المالكي',
        city: 'دمشق',
        country: 'Syria',
        website: 'www.shamsuperstore.com',
        storeLogo: 'https://via.placeholder.com/150'
    })

    // Personal Information State
    const [personalData, setPersonalData] = useState({
        firstName: 'أحمد',
        lastName: 'الشامي',
        email: 'ahmed.shami@example.com',
        phone: '+963 944 123 456',
        address: 'شارع بغداد، حي الشعلان',
        city: 'دمشق',
        country: 'Syria',
        dateOfBirth: '1990-05-15',
        profilePicture: seller,
        idDocument: null
    })

    // Account Settings State
    const [accountData, setAccountData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const tabs = [
        { id: 'store', label: 'Store Information', icon: <Store size={16} /> },
        { id: 'personal', label: 'Personal Information', icon: <User size={16} /> },
        { id: 'account', label: 'Account Settings', icon: <Shield size={16} /> }
    ]

    const handleStoreChange = (field, value) => {
        setStoreData(prev => ({ ...prev, [field]: value }))
    }

    const handlePersonalChange = (field, value) => {
        setPersonalData(prev => ({ ...prev, [field]: value }))
    }

    const handleAccountChange = (field, value) => {
        setAccountData(prev => ({ ...prev, [field]: value }))
    }

    const handleImageUpload = (type, file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            if (type === 'store') {
                handleStoreChange('storeLogo', imageUrl)
            } else if (type === 'profile') {
                handlePersonalChange('profilePicture', imageUrl)
            } else if (type === 'id') {
                handlePersonalChange('idDocument', imageUrl)
            }
        }
    }

    const handleSave = () => {
        console.log('Saving settings:', { storeData, personalData, accountData })
        alert('Settings saved successfully!')
    }

    const countries = [
        'Syria', 'Lebanon', 'Jordan', 'Turkey', 'Iraq', 'Egypt',
        'Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'United States', 
        'Canada', 'United Kingdom', 'Germany', 'France'
    ]

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your store and account settings</p>
            </div>

            <div className="settings-container">
                <div className="settings-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="settings-content">
                    {activeTab === 'store' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Store Information</h2>
                                <p>Update your store details and contact information</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group image-upload-group">
                                    <label>Store Logo</label>
                                    <div className="image-upload">
                                        <div className="image-preview">
                                            <img src={storeData.storeLogo} alt="Store Logo" />
                                        </div>
                                        <div className="upload-controls">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload('store', e.target.files[0])}
                                                id="store-logo"
                                                className="file-input"
                                            />
                                            <label htmlFor="store-logo" className="upload-btn">
                                                <Camera size={16} />
                                                Change Logo
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="storeName">Store Name *</label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        value={storeData.storeName}
                                        onChange={(e) => handleStoreChange('storeName', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="description">Store Description</label>
                                    <textarea
                                        id="description"
                                        value={storeData.description}
                                        onChange={(e) => handleStoreChange('description', e.target.value)}
                                        rows="3"
                                        placeholder="Brief description of your store"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="storeEmail">Store Email *</label>
                                    <input
                                        type="email"
                                        id="storeEmail"
                                        value={storeData.email}
                                        onChange={(e) => handleStoreChange('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="storePhone">Store Phone *</label>
                                    <input
                                        type="tel"
                                        id="storePhone"
                                        value={storeData.phone}
                                        onChange={(e) => handleStoreChange('phone', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="website">Website</label>
                                    <input
                                        type="url"
                                        id="website"
                                        value={storeData.website}
                                        onChange={(e) => handleStoreChange('website', e.target.value)}
                                        placeholder="https://yourstore.com"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="storeAddress">Address *</label>
                                    <input
                                        type="text"
                                        id="storeAddress"
                                        value={storeData.address}
                                        onChange={(e) => handleStoreChange('address', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="storeCity">City *</label>
                                    <input
                                        type="text"
                                        id="storeCity"
                                        value={storeData.city}
                                        onChange={(e) => handleStoreChange('city', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="storeCountry">Country *</label>
                                    <select
                                        id="storeCountry"
                                        value={storeData.country}
                                        onChange={(e) => handleStoreChange('country', e.target.value)}
                                        required
                                    >
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'personal' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Personal Information</h2>
                                <p>Update your personal details and profile</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group image-upload-group">
                                    <label>Profile Picture</label>
                                    <div className="image-upload">
                                        <div className="image-preview circular">
                                            <img src={personalData.profilePicture} alt="Profile" />
                                        </div>
                                        <div className="upload-controls">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload('profile', e.target.files[0])}
                                                id="profile-picture"
                                                className="file-input"
                                            />
                                            <label htmlFor="profile-picture" className="upload-btn">
                                                <Camera size={16} />
                                                Change Picture
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={personalData.firstName}
                                        onChange={(e) => handlePersonalChange('firstName', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={personalData.lastName}
                                        onChange={(e) => handlePersonalChange('lastName', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="personalEmail">Email *</label>
                                    <input
                                        type="email"
                                        id="personalEmail"
                                        value={personalData.email}
                                        onChange={(e) => handlePersonalChange('email', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="personalPhone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="personalPhone"
                                        value={personalData.phone}
                                        onChange={(e) => handlePersonalChange('phone', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        value={personalData.dateOfBirth}
                                        onChange={(e) => handlePersonalChange('dateOfBirth', e.target.value)}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="personalAddress">Address *</label>
                                    <input
                                        type="text"
                                        id="personalAddress"
                                        value={personalData.address}
                                        onChange={(e) => handlePersonalChange('address', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="personalCity">City *</label>
                                    <input
                                        type="text"
                                        id="personalCity"
                                        value={personalData.city}
                                        onChange={(e) => handlePersonalChange('city', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="personalCountry">Country *</label>
                                    <select
                                        id="personalCountry"
                                        value={personalData.country}
                                        onChange={(e) => handlePersonalChange('country', e.target.value)}
                                        required
                                    >
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label>ID Document</label>
                                    <div className="document-upload">
                                        {personalData.idDocument ? (
                                            <div className="document-preview">
                                                <img src={personalData.idDocument} alt="ID Document" />
                                                <button 
                                                    type="button" 
                                                    onClick={() => handlePersonalChange('idDocument', null)}
                                                    className="remove-document"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="upload-placeholder">
                                                <Upload size={24} />
                                                <p>Upload ID Document</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload('id', e.target.files[0])}
                                                    id="id-document"
                                                    className="file-input"
                                                />
                                                <label htmlFor="id-document" className="upload-btn">
                                                    Choose File
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Account Settings</h2>
                                <p>Manage your account security</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <h3>Change Password</h3>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <div className="password-input">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="currentPassword"
                                            value={accountData.currentPassword}
                                            onChange={(e) => handleAccountChange('currentPassword', e.target.value)}
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="password-toggle"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={accountData.newPassword}
                                        onChange={(e) => handleAccountChange('newPassword', e.target.value)}
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={accountData.confirmPassword}
                                        onChange={(e) => handleAccountChange('confirmPassword', e.target.value)}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="button" onClick={handleSave} className="save-btn">
                            <Save size={16} />
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings