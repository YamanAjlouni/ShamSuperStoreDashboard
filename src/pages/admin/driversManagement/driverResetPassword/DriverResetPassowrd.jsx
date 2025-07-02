import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './DriverResetPassword.scss'

const DriverResetPassword = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [driver, setDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
        sendEmail: true,
    })
    const [errors, setErrors] = useState({})

    // Mock driver data
    const mockDriverData = {
        id: id,
        name: 'Michael Johnson',
        email: 'michael.johnson@email.com',
        phone: '+1 (555) 901-0001',
        status: 'online',
        vehicleType: 'Motorcycle',
        licenseNumber: 'DL123456789'
    }

    useEffect(() => {
        // Simulate API call to get driver data
        setLoading(true)
        setTimeout(() => {
            setDriver(mockDriverData)
            setLoading(false)
        }, 800)
    }, [id])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required'
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters long'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm the password'
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setSubmitting(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            setSuccess(true)

            // Auto redirect after success
            setTimeout(() => {
                navigate('/admin/drivers')
            }, 3000)
        } catch (error) {
            setErrors({ submit: 'Failed to reset password. Please try again.' })
        } finally {
            setSubmitting(false)
        }
    }

    const getVehicleBadge = (vehicleType) => {
        const vehicleConfig = {
            'Motorcycle': { class: 'motorcycle', emoji: '🏍️' },
            'Car': { class: 'car', emoji: '🚗' },
            'Bicycle': { class: 'bicycle', emoji: '🚲' }
        }
        const config = vehicleConfig[vehicleType] || vehicleConfig.Car
        return (
            <span className={`vehicle-badge vehicle-badge--${config.class}`}>
                <span className="vehicle-emoji">{config.emoji}</span>
                {vehicleType}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="driver-reset-password">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading driver information...</p>
                </div>
            </div>
        )
    }

    if (!driver) {
        return (
            <div className="driver-reset-password">
                <div className="error-state">
                    <h2>Driver Not Found</h2>
                    <p>The driver you're trying to reset password for doesn't exist.</p>
                    <button onClick={() => navigate('/admin/drivers')}>Back to Drivers</button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="driver-reset-password">
                <div className="success-state">
                    <div className="success-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2>Password Reset Successfully</h2>
                    <p>The password for <strong>{driver.name}</strong> has been reset successfully.</p>
                    {formData.sendEmail && (
                        <p>A notification email has been sent to <strong>{driver.email}</strong> with the new password.</p>
                    )}
                    <div className="success-actions">
                        <button
                            className="btn btn--primary"
                            onClick={() => navigate('/admin/drivers')}
                        >
                            Back to Drivers
                        </button>
                        <button
                            className="btn btn--secondary"
                            onClick={() => navigate(`/admin/drivers/details/${driver.id}`)}
                        >
                            View Driver Details
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="driver-reset-password">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/admin/drivers')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Drivers
                </button>
                <div className="header-content">
                    <h1>Reset Driver Password</h1>
                    <p>Reset password for driver account</p>
                </div>
            </div>

            <div className="reset-form-container">
                <div className="driver-info-card">
                    <div className="driver-avatar">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="driver-details">
                        <h3>{driver.name}</h3>
                        <p className="email">{driver.email}</p>
                        <p className="phone">{driver.phone}</p>
                        <span className="driver-id">ID: {driver.id}</span>
                        <div className="driver-badges">
                            <span className={`status-badge status-badge--${driver.status === 'online' ? 'success' : 'neutral'}`}>
                                {driver.status}
                            </span>
                            {getVehicleBadge(driver.vehicleType)}
                        </div>
                    </div>
                </div>

                <div className="reset-form-card">
                    <div className="card-header">
                        <h2>New Password Information</h2>
                        <p>Set a new secure password for this driver account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="reset-form">
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password *</label>
                            <div className="password-input-group">
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    className={errors.newPassword ? 'error' : ''}
                                    placeholder="Enter new password"
                                />
                            </div>
                            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                            <div className="password-requirements">
                                <p>Password must contain:</p>
                                <ul>
                                    <li className={formData.newPassword.length >= 8 ? 'valid' : ''}>
                                        At least 8 characters
                                    </li>
                                    <li className={/(?=.*[a-z])/.test(formData.newPassword) ? 'valid' : ''}>
                                        One lowercase letter
                                    </li>
                                    <li className={/(?=.*[A-Z])/.test(formData.newPassword) ? 'valid' : ''}>
                                        One uppercase letter
                                    </li>
                                    <li className={/(?=.*\d)/.test(formData.newPassword) ? 'valid' : ''}>
                                        One number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={errors.confirmPassword ? 'error' : ''}
                                placeholder="Confirm new password"
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="sendEmail"
                                    checked={formData.sendEmail}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                                Send notification email to driver with new password
                            </label>
                        </div>

                        {errors.submit && (
                            <div className="error-message submit-error">{errors.submit}</div>
                        )}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => navigate('/admin/drivers')}
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn--primary"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <div className="btn-spinner"></div>
                                        Resetting Password...
                                    </>
                                ) : (
                                    <>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                                        </svg>
                                        Reset Password
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DriverResetPassword