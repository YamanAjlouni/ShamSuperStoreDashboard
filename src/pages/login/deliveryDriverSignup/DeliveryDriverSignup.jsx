import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/shamSuperStoreLogo.jpg';
import './DeliveryDriverSignup.scss';

const DeliveryDriverSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        country: '',
        idDocument: ''
    });

    const [licenseAndVehicleInfo, setLicenseAndVehicleInfo] = useState({
        licenseId: '',
        licenseImage: null,
        vehiclePlateNumber: '',
        vehicleType: ''
    });

    const countries = [
        'Syria', 'Lebanon', 'Turkey', 'UAE', 'Saudi Arabia', 'Jordan', 'Egypt', 'Iraq'
    ];

    const vehicleTypes = [
        'Motorcycle', 'Car', 'Bicycle'
    ];

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleLicenseAndVehicleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setLicenseAndVehicleInfo(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setLicenseAndVehicleInfo(prev => ({
                ...prev,
                [name]: value
            }));
        }
        if (error) setError('');
    };

    const handleNextStep = () => {
        // Validate personal information
        const requiredPersonalFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'city', 'country', 'idDocument'];
        const missingFields = requiredPersonalFields.filter(field => !personalInfo[field].trim());

        if (missingFields.length > 0) {
            setError('Please fill in all personal information fields');
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

        // Validate license and vehicle information
        const requiredLicenseFields = ['licenseId', 'vehiclePlateNumber', 'vehicleType'];
        const missingLicenseFields = requiredLicenseFields.filter(field => !licenseAndVehicleInfo[field].trim());

        if (missingLicenseFields.length > 0) {
            setError('Please fill in all required license and vehicle information fields');
            setIsLoading(false);
            return;
        }

        if (!licenseAndVehicleInfo.licenseImage) {
            setError('Please upload your license image');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Personal Info:', personalInfo);
            console.log('License & Vehicle Info:', licenseAndVehicleInfo);
            // Here you would integrate with your backend
            setIsLoading(false);
            // Navigate to success page or login
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="delivery-signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" className="logo-image" />
                        <p>Delivery Driver Registration</p>
                    </div>
                    <h2>Join Our Delivery Team</h2>
                    <p>Create your delivery driver account to start delivering</p>

                    <div className="progress-bar">
                        <div className="progress-steps">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-label">Personal Info</span>
                            </div>
                            <div className="progress-line"></div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-label">License & Vehicle</span>
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
                                        <select
                                            id="country"
                                            name="country"
                                            value={personalInfo.country}
                                            onChange={handlePersonalInfoChange}
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

                            <div className="form-group">
                                <label htmlFor="idDocument">ID Document Number *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="idDocument"
                                        name="idDocument"
                                        value={personalInfo.idDocument}
                                        onChange={handlePersonalInfoChange}
                                        placeholder="Enter your ID document number"
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
                            <h3>License & Vehicle Information</h3>

                            <div className="form-group">
                                <label htmlFor="licenseId">License ID *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="licenseId"
                                        name="licenseId"
                                        value={licenseAndVehicleInfo.licenseId}
                                        onChange={handleLicenseAndVehicleChange}
                                        placeholder="Enter your license ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="licenseImage">License Image *</label>
                                <div className="input-wrapper file-input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <input
                                        type="file"
                                        id="licenseImage"
                                        name="licenseImage"
                                        onChange={handleLicenseAndVehicleChange}
                                        accept="image/*"
                                        required
                                    />
                                    <label htmlFor="licenseImage" className="file-label">
                                        {licenseAndVehicleInfo.licenseImage ?
                                            licenseAndVehicleInfo.licenseImage.name :
                                            'Choose license image file'
                                        }
                                    </label>
                                </div>
                                <p className="file-hint">Upload a clear image of your driving license (JPG, PNG, max 5MB)</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="vehiclePlateNumber">Vehicle Plate Number *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <input
                                        type="text"
                                        id="vehiclePlateNumber"
                                        name="vehiclePlateNumber"
                                        value={licenseAndVehicleInfo.vehiclePlateNumber}
                                        onChange={handleLicenseAndVehicleChange}
                                        placeholder="Enter your vehicle plate number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="vehicleType">Vehicle Type *</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    <select
                                        id="vehicleType"
                                        name="vehicleType"
                                        value={licenseAndVehicleInfo.vehicleType}
                                        onChange={handleLicenseAndVehicleChange}
                                        required
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        {vehicleTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
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
                                        'Create Driver Account'
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

export default DeliveryDriverSignup;