import { useState, useEffect } from 'react'
import './Settings.scss'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('terms')
    const [isLoading, setIsLoading] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')

    // Terms & Conditions State
    const [termsData, setTermsData] = useState({
        companyName: 'Sham Superstore',
        website: 'https://www.shamsuperstore.com',
        country: 'United States',
        contactEmail: 'support@shamsuperstore.com',
        content: `These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.

Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.

By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.`
    })

    // Return Policy State
    const [returnData, setReturnData] = useState({
        storeName: 'Sham Superstore',
        returnPeriod: '15 days',
        processingTime: '15 days',
        contactEmail: 'support@shamsuperstore.com',
        content: `At "Sham Superstore", we're committed to making your shopping experience as seamless and worry-free as possible. We understand that there may be times when a purchase may not meet your expectations or your needs might change. When that happens, we make completing a return simple and convenient.

Most items can be returned for a refund or replacement/exchange within 15 days of delivery as long as they are in original or unused condition. For eligible items, you can enjoy free returns.`
    })

    // Privacy Policy State
    const [privacyData, setPrivacyData] = useState({
        companyName: 'Sham Superstore',
        website: 'https://www.shamsuperstore.com',
        contactEmail: 'support@shamsuperstore.com',
        effectiveDate: '03/17/2025',
        version: '1.0',
        content: `This document governs the privacy notice of our website www.shamsuperstore.com

Our privacy notice tells you what personal data (PD) and non-personal data (NPD) we may collect from you, how we collect it, how we protect it, how we may share it, how you can access and change it, and how you can limit our sharing of it.`
    })

    // Contact Us State
    const [contactData, setContactData] = useState({
        phone: '1-001-234-5678',
        phoneHours: 'Mon-Sat: 8:00 - 21:00',
        email: 'support@shamsuperstore.com',
        emailDescription: '24/7 Customer support',
        address: '3 Rockaway St., New Rochelle, NY 10801',
        addressDescription: 'Main office location'
    })

    const tabs = [
        {
            id: 'terms',
            label: 'Terms & Conditions',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 'returns',
            label: 'Returns & Refunds',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            )
        },
        {
            id: 'privacy',
            label: 'Privacy Policy',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            id: 'contact',
            label: 'Contact Us',
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ]

    const handleSave = async (section) => {
        setIsLoading(true)
        setSaveStatus('saving')

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Here you would make your actual API call
            console.log(`Saving ${section} data:`, getCurrentSectionData())

            setSaveStatus('saved')
            setTimeout(() => setSaveStatus(''), 3000)
        } catch (error) {
            setSaveStatus('error')
            setTimeout(() => setSaveStatus(''), 3000)
        } finally {
            setIsLoading(false)
        }
    }

    const getCurrentSectionData = () => {
        switch (activeTab) {
            case 'terms': return termsData
            case 'returns': return returnData
            case 'privacy': return privacyData
            case 'contact': return contactData
            default: return {}
        }
    }

    const renderTermsSettings = () => (
        <div className="settings-form">
            <div className="form-grid">
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={termsData.companyName}
                        onChange={(e) => setTermsData({ ...termsData, companyName: e.target.value })}
                        placeholder="Enter company name"
                    />
                </div>
                <div className="form-group">
                    <label>Website URL</label>
                    <input
                        type="url"
                        value={termsData.website}
                        onChange={(e) => setTermsData({ ...termsData, website: e.target.value })}
                        placeholder="https://example.com"
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        value={termsData.country}
                        onChange={(e) => setTermsData({ ...termsData, country: e.target.value })}
                        placeholder="Enter country"
                    />
                </div>
                <div className="form-group">
                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={termsData.contactEmail}
                        onChange={(e) => setTermsData({ ...termsData, contactEmail: e.target.value })}
                        placeholder="contact@example.com"
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <label>Terms & Conditions Content</label>
                <textarea
                    value={termsData.content}
                    onChange={(e) => setTermsData({ ...termsData, content: e.target.value })}
                    placeholder="Enter your terms and conditions content..."
                    rows={15}
                />
            </div>
        </div>
    )

    const renderReturnSettings = () => (
        <div className="settings-form">
            <div className="form-grid">
                <div className="form-group">
                    <label>Store Name</label>
                    <input
                        type="text"
                        value={returnData.storeName}
                        onChange={(e) => setReturnData({ ...returnData, storeName: e.target.value })}
                        placeholder="Enter store name"
                    />
                </div>
                <div className="form-group">
                    <label>Return Period</label>
                    <input
                        type="text"
                        value={returnData.returnPeriod}
                        onChange={(e) => setReturnData({ ...returnData, returnPeriod: e.target.value })}
                        placeholder="e.g., 15 days"
                    />
                </div>
                <div className="form-group">
                    <label>Processing Time</label>
                    <input
                        type="text"
                        value={returnData.processingTime}
                        onChange={(e) => setReturnData({ ...returnData, processingTime: e.target.value })}
                        placeholder="e.g., 15 days"
                    />
                </div>
                <div className="form-group">
                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={returnData.contactEmail}
                        onChange={(e) => setReturnData({ ...returnData, contactEmail: e.target.value })}
                        placeholder="support@example.com"
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <label>Return Policy Content</label>
                <textarea
                    value={returnData.content}
                    onChange={(e) => setReturnData({ ...returnData, content: e.target.value })}
                    placeholder="Enter your return policy content..."
                    rows={15}
                />
            </div>
        </div>
    )

    const renderPrivacySettings = () => (
        <div className="settings-form">
            <div className="form-grid">
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={privacyData.companyName}
                        onChange={(e) => setPrivacyData({ ...privacyData, companyName: e.target.value })}
                        placeholder="Enter company name"
                    />
                </div>
                <div className="form-group">
                    <label>Website URL</label>
                    <input
                        type="url"
                        value={privacyData.website}
                        onChange={(e) => setPrivacyData({ ...privacyData, website: e.target.value })}
                        placeholder="https://example.com"
                    />
                </div>
                <div className="form-group">
                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={privacyData.contactEmail}
                        onChange={(e) => setPrivacyData({ ...privacyData, contactEmail: e.target.value })}
                        placeholder="contact@example.com"
                    />
                </div>
                <div className="form-group">
                    <label>Effective Date</label>
                    <input
                        type="date"
                        value={privacyData.effectiveDate}
                        onChange={(e) => setPrivacyData({ ...privacyData, effectiveDate: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Version</label>
                    <input
                        type="text"
                        value={privacyData.version}
                        onChange={(e) => setPrivacyData({ ...privacyData, version: e.target.value })}
                        placeholder="1.0"
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <label>Privacy Policy Content</label>
                <textarea
                    value={privacyData.content}
                    onChange={(e) => setPrivacyData({ ...privacyData, content: e.target.value })}
                    placeholder="Enter your privacy policy content..."
                    rows={15}
                />
            </div>
        </div>
    )

    const renderContactSettings = () => (
        <div className="settings-form">
            <div className="contact-sections">
                <div className="contact-section">
                    <h3>Phone Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                value={contactData.phone}
                                onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                                placeholder="1-001-234-5678"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Hours</label>
                            <input
                                type="text"
                                value={contactData.phoneHours}
                                onChange={(e) => setContactData({ ...contactData, phoneHours: e.target.value })}
                                placeholder="Mon-Sat: 8:00 - 21:00"
                            />
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <h3>Email Information</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={contactData.email}
                                onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                                placeholder="support@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Description</label>
                            <input
                                type="text"
                                value={contactData.emailDescription}
                                onChange={(e) => setContactData({ ...contactData, emailDescription: e.target.value })}
                                placeholder="24/7 Customer support"
                            />
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <h3>Address Information</h3>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Physical Address</label>
                            <input
                                type="text"
                                value={contactData.address}
                                onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                                placeholder="3 Rockaway St., New Rochelle, NY 10801"
                            />
                        </div>
                        <div className="form-group">
                            <label>Address Description</label>
                            <input
                                type="text"
                                value={contactData.addressDescription}
                                onChange={(e) => setContactData({ ...contactData, addressDescription: e.target.value })}
                                placeholder="Main office location"
                            />
                        </div>
                    </div>
                </div>

                <div className="contact-preview">
                    <h3>Preview</h3>
                    <div className="preview-cards">
                        <div className="preview-card">
                            <div className="preview-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="preview-info">
                                <div className="preview-title">{contactData.phone}</div>
                                <div className="preview-subtitle">{contactData.phoneHours}</div>
                            </div>
                        </div>

                        <div className="preview-card">
                            <div className="preview-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="preview-info">
                                <div className="preview-title">{contactData.email}</div>
                                <div className="preview-subtitle">{contactData.emailDescription}</div>
                            </div>
                        </div>

                        <div className="preview-card">
                            <div className="preview-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="preview-info">
                                <div className="preview-title">{contactData.address}</div>
                                <div className="preview-subtitle">{contactData.addressDescription}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (activeTab) {
            case 'terms': return renderTermsSettings()
            case 'returns': return renderReturnSettings()
            case 'privacy': return renderPrivacySettings()
            case 'contact': return renderContactSettings()
            default: return renderTermsSettings()
        }
    }

    const activeTabData = tabs.find(tab => tab.id === activeTab)

    return (
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your website settings and legal pages</p>
            </div>

            <div className="settings-container">
                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'tab-button--active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="settings-content">
                    <div className="content-header">
                        <div className="content-title">
                            <span className="content-icon">{activeTabData?.icon}</span>
                            <h2>{activeTabData?.label}</h2>
                        </div>

                        <div className="content-actions">
                            {saveStatus && (
                                <div className={`save-status save-status--${saveStatus}`}>
                                    {saveStatus === 'saving' && (
                                        <>
                                            <div className="spinner"></div>
                                            Saving...
                                        </>
                                    )}
                                    {saveStatus === 'saved' && (
                                        <>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Saved successfully
                                        </>
                                    )}
                                    {saveStatus === 'error' && (
                                        <>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Error saving
                                        </>
                                    )}
                                </div>
                            )}

                            <button
                                className="save-button"
                                onClick={() => handleSave(activeTab)}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="spinner"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                        </svg>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="content-body">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings