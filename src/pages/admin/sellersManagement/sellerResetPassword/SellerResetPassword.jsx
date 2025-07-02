import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SellerResetPassword.scss'

const SellerResetPassword = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [seller, setSeller] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
        sendEmail: true,
    })
    const [errors, setErrors] = useState({})

    // Mock seller data
    const mockSellerData = {
        id: id,
        personalName: 'John Smith',
        storeName: 'Tech Paradise',
        email: 'john.smith@email.com',
        status: 'active'
    }

    useEffect(() => {
        // Simulate API call to get seller data
        setLoading(true)
        setTimeout(() => {
            setSeller(mockSellerData)
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
                navigate('/admin/sellers')
            }, 3000)
        } catch (error) {
            setErrors({ submit: 'Failed to reset password. Please try again.' })
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="seller-reset-password">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading seller information...</p>
                </div>
            </div>
        )
    }

    if (!seller) {
        return (
            <div className="seller-reset-password">
                <div className="error-state">
                    <h2>Seller Not Found</h2>
                    <p>The seller you're trying to reset password for doesn't exist.</p>
                    <button onClick={() => navigate('/admin/sellers')}>Back to Sellers</button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="seller-reset-password">
                <div className="success-state">
                    <div className="success-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2>Password Reset Successfully</h2>
                    <p>The password for <strong>{seller.personalName}</strong> (<strong>{seller.storeName}</strong>) has been reset successfully.</p>
                    {formData.sendEmail && (
                        <p>A notification email has been sent to <strong>{seller.email}</strong> with the new password.</p>
                    )}
                    <div className="success-actions">
                        <button
                            className="btn btn--primary"
                            onClick={() => navigate('/admin/sellers')}
                        >
                            Back to Sellers
                        </button>
                        <button
                            className="btn btn--secondary"
                            onClick={() => navigate(`/admin/sellers/details/${seller.id}`)}
                        >
                            View Seller Details
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="seller-reset-password">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/admin/sellers')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Sellers
                </button>
                <div className="header-content">
                    <h1>Reset Seller Password</h1>
                    <p>Reset password for seller account</p>
                </div>
            </div>

            <div className="reset-form-container">
                <div className="seller-info-card">
                    <div className="seller-avatar">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="seller-details">
                        <h3>{seller.personalName}</h3>
                        <p className="store-name">{seller.storeName}</p>
                        <p className="email">{seller.email}</p>
                        <span className="seller-id">ID: {seller.id}</span>
                        <span className={`status-badge status-badge--${seller.status === 'active' ? 'success' : 'warning'}`}>
                            {seller.status}
                        </span>
                    </div>
                </div>

                <div className="reset-form-card">
                    <div className="card-header">
                        <h2>New Password Information</h2>
                        <p>Set a new secure password for this seller account</p>
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
                                <inputg
                                    type="checkbox"
                                    name="sendEmail"
                                    checked={formData.sendEmail}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                                Send notification email to seller with new password
                            </label>
                        </div>

                        {errors.submit && (
                            <div className="error-message submit-error">{errors.submit}</div>
                        )}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => navigate('/admin/sellers')}
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
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

export default SellerResetPassword