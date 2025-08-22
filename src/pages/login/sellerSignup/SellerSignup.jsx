import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/shamSuperStoreLogo.jpg';
import './SellerSignup.scss';

const SellerSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        city: '',
        country: '',
        idDocuments: [],
        address: '',
        phoneNumber: ''
    });

    const [businessInfo, setBusinessInfo] = useState({
        businessName: '',
        website: '',
        businessPhone: '',
        storeDescription: '',
        storeEmail: '',
        storeAddress: '',
        storeCity: '',
        storeCountry: ''
    });

    const countries = [
        'Syria', 'Lebanon', 'Turkey', 'UAE', 'Saudi Arabia', 'Jordan', 'Egypt', 'Iraq'
    ];

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleBusinessInfoChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // Limit to 2 files maximum
            const limitedFiles = files.slice(0, 2);
            setPersonalInfo(prev => ({
                ...prev,
                idDocuments: [...prev.idDocuments, ...limitedFiles].slice(0, 2)
            }));
        }
        if (error) setError('');
    };

    const removeFile = (index) => {
        setPersonalInfo(prev => ({
            ...prev,
            idDocuments: prev.idDocuments.filter((_, i) => i !== index)
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            const limitedFiles = imageFiles.slice(0, 2);
            setPersonalInfo(prev => ({
                ...prev,
                idDocuments: [...prev.idDocuments, ...limitedFiles].slice(0, 2)
            }));
        }
        if (error) setError('');
    };

    const handleNextStep = () => {
        // Validate personal information
        const requiredPersonalFields = ['firstName', 'lastName', 'email', 'dateOfBirth', 'city', 'country', 'address', 'phoneNumber'];
        const missingFields = requiredPersonalFields.filter(field => !personalInfo[field].trim());

        if (missingFields.length > 0) {
            setError('Please fill in all personal information fields');
            return;
        }

        if (personalInfo.idDocuments.length === 0) {
            setError('Please upload at least one ID document');
            return;
        }

        setStep(2);
        setError('');
    };

    const handlePrevStep = () => {
        setStep(1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate business information
        const requiredBusinessFields = ['businessName', 'businessPhone', 'storeDescription', 'storeEmail', 'storeAddress', 'storeCity', 'storeCountry'];
        const missingBusinessFields = requiredBusinessFields.filter(field => !businessInfo[field].trim());

        if (missingBusinessFields.length > 0) {
            setError('Please fill in all required business information fields');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Personal Info:', personalInfo);
            console.log('Business Info:', businessInfo);
            console.log('ID Documents:', personalInfo.idDocuments);
            // Here you would integrate with your backend
            setIsLoading(false);
            // Navigate to success page or login
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="seller-signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" className="logo-image" />
                        <p>Seller Registration</p>
                    </div>
                    <h2>Join Our Marketplace</h2>
                    <p>Create your seller account to start selling</p>

                    <div className="progress-bar">
                        <div className="progress-steps">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-label">Personal Info</span>
                            </div>
                            <div className="progress-line"></div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-label">Business Info</span>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="signup-form" onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="form-step">
                            <h3>Personal Information</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={personalInfo.firstName}
                                            onChange={handlePersonalInfoChange}
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={personalInfo.lastName}
                                            onChange={handlePersonalInfoChange}
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={personalInfo.email}
                                        onChange={handlePersonalInfoChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateOfBirth">Date of Birth *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        value={personalInfo.dateOfBirth}
                                        onChange={handlePersonalInfoChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={personalInfo.city}
                                            onChange={handlePersonalInfoChange}
                                            placeholder="Enter your city"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="country">Country *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={personalInfo.country}
                                            onChange={handlePersonalInfoChange}
                                            placeholder="Enter your country"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>ID Documents * (Upload 1-2 images)</label>
                                <div className="file-upload-wrapper">
                                    <div
                                        className="file-drop-zone"
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="upload-text">
                                            Drag & drop your ID documents here, or
                                            <label htmlFor="idUpload" className="upload-link"> browse</label>
                                        </p>
                                        <p className="upload-subtext">Supports: JPG, PNG, PDF (Max 2 files)</p>
                                        <input
                                            type="file"
                                            id="idUpload"
                                            accept="image/*,.pdf"
                                            multiple
                                            onChange={handleFileUpload}
                                            className="hidden-input"
                                        />
                                    </div>

                                    {personalInfo.idDocuments.length > 0 && (
                                        <div className="uploaded-files">
                                            {personalInfo.idDocuments.map((file, index) => (
                                                <div key={index} className="file-item">
                                                    <div className="file-info">
                                                        <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="file-name">{file.name}</span>
                                                        {/* <span className="file-size">({(file.size / 1024 / 1024).toFixed(1)} MB)</span> */}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="remove-file"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={personalInfo.address}
                                        onChange={handlePersonalInfoChange}
                                        placeholder="Enter your address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={personalInfo.phoneNumber}
                                        onChange={handlePersonalInfoChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="next-btn">
                                Next Step
                                <svg className="next-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="form-step">
                            <h3>Business Information</h3>

                            <div className="form-group">
                                <label htmlFor="businessName">Business Name *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="businessName"
                                        name="businessName"
                                        value={businessInfo.businessName}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="Enter your business name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="website">Website (Optional)</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={businessInfo.website}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="https://your-website.com"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessPhone">Business Phone Number *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <input
                                        type="tel"
                                        id="businessPhone"
                                        name="businessPhone"
                                        value={businessInfo.businessPhone}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="Enter your business phone"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="storeDescription">Store Description *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    <textarea
                                        id="storeDescription"
                                        name="storeDescription"
                                        value={businessInfo.storeDescription}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="Describe your store and products"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="storeEmail">Store Email *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="storeEmail"
                                        name="storeEmail"
                                        value={businessInfo.storeEmail}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="Enter your store email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="storeAddress">Store Address *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="storeAddress"
                                        name="storeAddress"
                                        value={businessInfo.storeAddress}
                                        onChange={handleBusinessInfoChange}
                                        placeholder="Enter your store address"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="storeCity">Store City *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="storeCity"
                                            name="storeCity"
                                            value={businessInfo.storeCity}
                                            onChange={handleBusinessInfoChange}
                                            placeholder="Enter store city"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="storeCountry">Store Country *</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <select
                                            id="storeCountry"
                                            name="storeCountry"
                                            value={businessInfo.storeCountry}
                                            onChange={handleBusinessInfoChange}
                                            required
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="back-btn" onClick={handlePrevStep}>
                                    <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <span className="spinner"></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Seller Account'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>

            <div className="signup-background">
                <div className="bg-pattern"></div>
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>
        </div>
    );
};

export default SellerSignup;