import { useState, useEffect } from 'react'
import './DeliverySettings.scss'

const DeliverySettings = () => {
    const [loading, setLoading] = useState(true)
    const [activeSection, setActiveSection] = useState('profile')
    const [settings, setSettings] = useState({})
    const [unsavedChanges, setUnsavedChanges] = useState(false)

    // Profile Settings
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        profilePhoto: null
    })

    // Documents
    const [documents, setDocuments] = useState({
        driverLicense: null,
        vehicleRegistration: null,
        insurance: null,
        backgroundCheck: null
    })

    // Vehicle Information
    const [vehicleData, setVehicleData] = useState({
        type: 'car', // car, motorcycle, bicycle, scooter
        make: '',
        model: '',
        year: '',
        color: '',
        licensePlate: '',
        platePhoto: null
    })

    // Account Settings
    const [accountSettings, setAccountSettings] = useState({
        language: 'en',
        timezone: 'America/New_York',
        currency: 'USD',
        twoFactorEnabled: false
    })

    // Notification Settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        orderAlerts: true,
        promotionEmails: false,
        weeklyReports: true
    })

    // Banking Information
    const [bankingData, setBankingData] = useState({
        accountHolder: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        accountType: 'checking'
    })

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                // Load existing settings
                setProfileData({
                    firstName: 'John',
                    lastName: 'Smith',
                    email: 'john.smith@email.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zipCode: '10001',
                    profilePhoto: null
                })

                setVehicleData({
                    type: 'car',
                    make: 'Honda',
                    model: 'Civic',
                    year: '2020',
                    color: 'Blue',
                    licensePlate: 'ABC123',
                    platePhoto: null
                })

                setLoading(false)
            }, 1000)
        }

        fetchSettings()
    }, [])

    const handleFileUpload = (type, category, event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                if (category === 'documents') {
                    setDocuments(prev => ({
                        ...prev,
                        [type]: {
                            file: e.target.result,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            uploadDate: new Date().toISOString()
                        }
                    }))
                } else if (category === 'vehicle') {
                    setVehicleData(prev => ({
                        ...prev,
                        platePhoto: {
                            file: e.target.result,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            uploadDate: new Date().toISOString()
                        }
                    }))
                } else if (category === 'profile') {
                    setProfileData(prev => ({
                        ...prev,
                        profilePhoto: {
                            file: e.target.result,
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            uploadDate: new Date().toISOString()
                        }
                    }))
                }
                setUnsavedChanges(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleInputChange = (category, field, value) => {
        setUnsavedChanges(true)

        switch (category) {
            case 'profile':
                setProfileData(prev => ({ ...prev, [field]: value }))
                break
            case 'vehicle':
                setVehicleData(prev => ({ ...prev, [field]: value }))
                break
            case 'account':
                setAccountSettings(prev => ({ ...prev, [field]: value }))
                break
            case 'notifications':
                setNotificationSettings(prev => ({ ...prev, [field]: value }))
                break
            case 'banking':
                setBankingData(prev => ({ ...prev, [field]: value }))
                break
        }
    }

    const saveSettings = () => {
        // Simulate API save
        setUnsavedChanges(false)
        alert('Settings saved successfully!')
    }

    const getDocumentStatus = (doc) => {
        if (!doc) return 'not-uploaded'
        return 'uploaded' // Could be 'pending', 'approved', 'rejected'
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const menuSections = [
        {
            id: 'profile',
            label: 'Profile Information',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
        {
            id: 'documents',
            label: 'Documents & Verification',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 'vehicle',
            label: 'Vehicle Information',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        // {
        //     id: 'banking',
        //     label: 'Banking & Payments',
        //     icon: (
        //         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        //         </svg>
        //     )
        // },
        // {
        //     id: 'notifications',
        //     label: 'Notifications',
        //     icon: (
        //         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 6.83 7.07.91-5.43 4.63 1.45 6.82L12 18.75l-4.28 2.26 1.45-6.82L3.74 9.56l7.07-.91L13.93 2.82z" />
        //         </svg>
        //     )
        // },
        {
            id: 'account',
            label: 'Account Settings',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ]

    if (loading) {
        return (
            <div className="delivery-settings">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading settings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="delivery-settings">
            {/* Header */}
            <div className="settings-header">
                <div className="header-content">
                    <div className="page-title">
                        <h1>Driver Settings</h1>
                        <p>Manage your profile, documents, and preferences</p>
                    </div>
                    {unsavedChanges && (
                        <button className="save-btn" onClick={saveSettings}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                    )}
                </div>
            </div>

            <div className="settings-content">
                {/* Sidebar Menu */}
                <div className="settings-sidebar">
                    <nav className="settings-menu">
                        {menuSections.map((section) => (
                            <button
                                key={section.id}
                                className={`menu-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className="menu-icon">{section.icon}</span>
                                <span className="menu-label">{section.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="settings-main">
                    {/* Profile Information */}
                    {activeSection === 'profile' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Profile Information</h2>
                                <p>Update your personal information and profile photo</p>
                            </div>

                            <div className="profile-photo-section">
                                <div className="photo-upload">
                                    {profileData.profilePhoto ? (
                                        <div className="photo-preview">
                                            <img src={profileData.profilePhoto.file} alt="Profile" />
                                            <button
                                                className="change-photo-btn"
                                                onClick={() => setProfileData(prev => ({ ...prev, profilePhoto: null }))}
                                            >
                                                Change Photo
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="upload-area">
                                            <div className="upload-placeholder">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>Upload Profile Photo</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload('profilePhoto', 'profile', e)}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={profileData.address}
                                        onChange={(e) => handleInputChange('profile', 'address', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        value={profileData.city}
                                        onChange={(e) => handleInputChange('profile', 'city', e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <select
                                        value={profileData.state}
                                        onChange={(e) => handleInputChange('profile', 'state', e.target.value)}
                                    >
                                        <option value="">Select State</option>
                                        <option value="NY">New York</option>
                                        <option value="CA">California</option>
                                        <option value="TX">Texas</option>
                                        <option value="FL">Florida</option>
                                        {/* Add more states */}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code</label>
                                    <input
                                        type="text"
                                        value={profileData.zipCode}
                                        onChange={(e) => handleInputChange('profile', 'zipCode', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Documents Section */}
                    {activeSection === 'documents' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Documents & Verification</h2>
                                <p>Upload required documents for driver verification</p>
                            </div>

                            <div className="documents-grid">
                                {/* Driver License */}
                                <div className="document-card">
                                    <div className="document-header">
                                        <div className="document-info">
                                            <h3>Driver License</h3>
                                            <p>Valid government-issued driver's license</p>
                                        </div>
                                        <div className={`status-badge ${getDocumentStatus(documents.driverLicense)}`}>
                                            {getDocumentStatus(documents.driverLicense) === 'uploaded' ? 'Uploaded' : 'Required'}
                                        </div>
                                    </div>

                                    {documents.driverLicense ? (
                                        <div className="document-preview">
                                            <div className="file-info">
                                                <div className="file-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="file-details">
                                                    <span className="file-name">{documents.driverLicense.name}</span>
                                                    <span className="file-size">{formatFileSize(documents.driverLicense.size)}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="replace-btn"
                                                onClick={() => setDocuments(prev => ({ ...prev, driverLicense: null }))}
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="upload-area">
                                            <div className="upload-content">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span>Upload Driver License</span>
                                                <small>PDF, JPG, PNG up to 10MB</small>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload('driverLicense', 'documents', e)}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Vehicle Registration */}
                                <div className="document-card">
                                    <div className="document-header">
                                        <div className="document-info">
                                            <h3>Vehicle Registration</h3>
                                            <p>Current vehicle registration document</p>
                                        </div>
                                        <div className={`status-badge ${getDocumentStatus(documents.vehicleRegistration)}`}>
                                            {getDocumentStatus(documents.vehicleRegistration) === 'uploaded' ? 'Uploaded' : 'Required'}
                                        </div>
                                    </div>

                                    {documents.vehicleRegistration ? (
                                        <div className="document-preview">
                                            <div className="file-info">
                                                <div className="file-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="file-details">
                                                    <span className="file-name">{documents.vehicleRegistration.name}</span>
                                                    <span className="file-size">{formatFileSize(documents.vehicleRegistration.size)}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="replace-btn"
                                                onClick={() => setDocuments(prev => ({ ...prev, vehicleRegistration: null }))}
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="upload-area">
                                            <div className="upload-content">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span>Upload Registration</span>
                                                <small>PDF, JPG, PNG up to 10MB</small>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload('vehicleRegistration', 'documents', e)}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Insurance */}
                                <div className="document-card">
                                    <div className="document-header">
                                        <div className="document-info">
                                            <h3>Insurance Certificate</h3>
                                            <p>Valid vehicle insurance certificate</p>
                                        </div>
                                        <div className={`status-badge ${getDocumentStatus(documents.insurance)}`}>
                                            {getDocumentStatus(documents.insurance) === 'uploaded' ? 'Uploaded' : 'Required'}
                                        </div>
                                    </div>

                                    {documents.insurance ? (
                                        <div className="document-preview">
                                            <div className="file-info">
                                                <div className="file-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="file-details">
                                                    <span className="file-name">{documents.insurance.name}</span>
                                                    <span className="file-size">{formatFileSize(documents.insurance.size)}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="replace-btn"
                                                onClick={() => setDocuments(prev => ({ ...prev, insurance: null }))}
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="upload-area">
                                            <div className="upload-content">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span>Upload Insurance</span>
                                                <small>PDF, JPG, PNG up to 10MB</small>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload('insurance', 'documents', e)}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Background Check */}
                                <div className="document-card">
                                    <div className="document-header">
                                        <div className="document-info">
                                            <h3>Background Check</h3>
                                            <p>Criminal background check certificate</p>
                                        </div>
                                        <div className={`status-badge ${getDocumentStatus(documents.backgroundCheck)}`}>
                                            {getDocumentStatus(documents.backgroundCheck) === 'uploaded' ? 'Uploaded' : 'Optional'}
                                        </div>
                                    </div>

                                    {documents.backgroundCheck ? (
                                        <div className="document-preview">
                                            <div className="file-info">
                                                <div className="file-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="file-details">
                                                    <span className="file-name">{documents.backgroundCheck.name}</span>
                                                    <span className="file-size">{formatFileSize(documents.backgroundCheck.size)}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="replace-btn"
                                                onClick={() => setDocuments(prev => ({ ...prev, backgroundCheck: null }))}
                                            >
                                                Replace
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="upload-area">
                                            <div className="upload-content">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span>Upload Background Check</span>
                                                <small>PDF, JPG, PNG up to 10MB</small>
                                            </div>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileUpload('backgroundCheck', 'documents', e)}
                                                hidden
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Vehicle Information */}
                    {activeSection === 'vehicle' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Vehicle Information</h2>
                                <p>Manage your delivery vehicle details and license plate</p>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Vehicle Type</label>
                                    <select
                                        value={vehicleData.type}
                                        onChange={(e) => handleInputChange('vehicle', 'type', e.target.value)}
                                    >
                                        <option value="car">Car</option>
                                        <option value="motorcycle">Motorcycle</option>
                                        <option value="bicycle">Bicycle</option>
                                        <option value="scooter">Scooter</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Make</label>
                                    <input
                                        type="text"
                                        value={vehicleData.make}
                                        onChange={(e) => handleInputChange('vehicle', 'make', e.target.value)}
                                        placeholder="e.g., Honda"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Model</label>
                                    <input
                                        type="text"
                                        value={vehicleData.model}
                                        onChange={(e) => handleInputChange('vehicle', 'model', e.target.value)}
                                        placeholder="e.g., Civic"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input
                                        type="number"
                                        value={vehicleData.year}
                                        onChange={(e) => handleInputChange('vehicle', 'year', e.target.value)}
                                        placeholder="2020"
                                        min="1990"
                                        max="2024"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Color</label>
                                    <input
                                        type="text"
                                        value={vehicleData.color}
                                        onChange={(e) => handleInputChange('vehicle', 'color', e.target.value)}
                                        placeholder="e.g., Blue"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>License Plate Number</label>
                                    <input
                                        type="text"
                                        value={vehicleData.licensePlate}
                                        onChange={(e) => handleInputChange('vehicle', 'licensePlate', e.target.value)}
                                        placeholder="ABC123"
                                        style={{ textTransform: 'uppercase' }}
                                    />
                                </div>
                            </div>

                            {/* License Plate Photo */}
                            <div className="plate-photo-section">
                                <h3>License Plate Photo</h3>
                                <p>Upload a clear photo of your vehicle's license plate</p>

                                {vehicleData.platePhoto ? (
                                    <div className="plate-preview">
                                        <img src={vehicleData.platePhoto.file} alt="License Plate" />
                                        <div className="plate-info">
                                            <span className="file-name">{vehicleData.platePhoto.name}</span>
                                            <span className="file-size">{formatFileSize(vehicleData.platePhoto.size)}</span>
                                        </div>
                                        <button
                                            className="replace-btn"
                                            onClick={() => setVehicleData(prev => ({ ...prev, platePhoto: null }))}
                                        >
                                            Replace Photo
                                        </button>
                                    </div>
                                ) : (
                                    <label className="upload-area large">
                                        <div className="upload-content">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Upload License Plate Photo</span>
                                            <small>JPG, PNG up to 5MB - Ensure plate number is clearly visible</small>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="camera"
                                            onChange={(e) => handleFileUpload('platePhoto', 'vehicle', e)}
                                            hidden
                                        />
                                    </label>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Banking Information */}
                    {activeSection === 'banking' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Banking & Payments</h2>
                                <p>Manage your payment information for earnings deposits</p>
                            </div>

                            <div className="banking-info">
                                <div className="security-notice">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <div>
                                        <h4>Secure Banking Information</h4>
                                        <p>Your banking details are encrypted and securely stored. We only use this information for earnings deposits.</p>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Account Holder Name</label>
                                        <input
                                            type="text"
                                            value={bankingData.accountHolder}
                                            onChange={(e) => handleInputChange('banking', 'accountHolder', e.target.value)}
                                            placeholder="Full name as it appears on account"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Bank Name</label>
                                        <input
                                            type="text"
                                            value={bankingData.bankName}
                                            onChange={(e) => handleInputChange('banking', 'bankName', e.target.value)}
                                            placeholder="Name of your bank"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Account Type</label>
                                        <select
                                            value={bankingData.accountType}
                                            onChange={(e) => handleInputChange('banking', 'accountType', e.target.value)}
                                        >
                                            <option value="checking">Checking</option>
                                            <option value="savings">Savings</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Routing Number</label>
                                        <input
                                            type="text"
                                            value={bankingData.routingNumber}
                                            onChange={(e) => handleInputChange('banking', 'routingNumber', e.target.value)}
                                            placeholder="9-digit routing number"
                                            maxLength="9"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Account Number</label>
                                        <input
                                            type="password"
                                            value={bankingData.accountNumber}
                                            onChange={(e) => handleInputChange('banking', 'accountNumber', e.target.value)}
                                            placeholder="Your account number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications */}
                    {activeSection === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Notification Preferences</h2>
                                <p>Choose how you want to receive updates and alerts</p>
                            </div>

                            <div className="notification-groups">
                                <div className="notification-group">
                                    <h3>Delivery Notifications</h3>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>Order Alerts</label>
                                            <span>Get notified about new orders and delivery updates</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.orderAlerts}
                                                onChange={(e) => handleInputChange('notifications', 'orderAlerts', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="notification-group">
                                    <h3>Communication Preferences</h3>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>Email Notifications</label>
                                            <span>Receive updates via email</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.emailNotifications}
                                                onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>Push Notifications</label>
                                            <span>Receive push notifications on your device</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.pushNotifications}
                                                onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>SMS Notifications</label>
                                            <span>Receive text messages for urgent updates</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.smsNotifications}
                                                onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="notification-group">
                                    <h3>Marketing & Reports</h3>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>Promotional Emails</label>
                                            <span>Receive information about promotions and bonuses</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.promotionEmails}
                                                onChange={(e) => handleInputChange('notifications', 'promotionEmails', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notification-info">
                                            <label>Weekly Reports</label>
                                            <span>Get weekly summaries of your performance and earnings</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={notificationSettings.weeklyReports}
                                                onChange={(e) => handleInputChange('notifications', 'weeklyReports', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Settings */}
                    {activeSection === 'account' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2>Account Settings</h2>
                                <p>Manage your account preferences and security settings</p>
                            </div>

                            <div className="account-groups">
                                <div className="account-group">
                                    <h3>Regional Settings</h3>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Language</label>
                                            <select
                                                value={accountSettings.language}
                                                onChange={(e) => handleInputChange('account', 'language', e.target.value)}
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Timezone</label>
                                            <select
                                                value={accountSettings.timezone}
                                                onChange={(e) => handleInputChange('account', 'timezone', e.target.value)}
                                            >
                                                <option value="America/New_York">Eastern Time</option>
                                                <option value="America/Chicago">Central Time</option>
                                                <option value="America/Denver">Mountain Time</option>
                                                <option value="America/Los_Angeles">Pacific Time</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Currency</label>
                                            <select
                                                value={accountSettings.currency}
                                                onChange={(e) => handleInputChange('account', 'currency', e.target.value)}
                                            >
                                                <option value="USD">USD ($)</option>
                                                <option value="CAD">CAD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="account-group">
                                    <h3>Security</h3>
                                    <div className="security-item">
                                        <div className="security-info">
                                            <label>Two-Factor Authentication</label>
                                            <span>Add an extra layer of security to your account</span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={accountSettings.twoFactorEnabled}
                                                onChange={(e) => handleInputChange('account', 'twoFactorEnabled', e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="security-actions">
                                        <button className="security-btn">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                            Change Password
                                        </button>
                                        <button className="security-btn danger">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeliverySettings