import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ResetPassword.scss'

const ResetPassword = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
        sendEmail: true,
    })
    const [errors, setErrors] = useState({})

    // Mock user data
    const mockUserData = {
        id: id,
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        status: 'active'
    }

    useEffect(() => {
        // Simulate API call to get user data
        setLoading(true)
        setTimeout(() => {
            setUser(mockUserData)
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
                navigate('/admin/users')
            }, 3000)
        } catch (error) {
            setErrors({ submit: 'Failed to reset password. Please try again.' })
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="reset-password">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading user information...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="reset-password">
                <div className="error-state">
                    <h2>User Not Found</h2>
                    <p>The user you're trying to reset password for doesn't exist.</p>
                    <button onClick={() => navigate('/admin/users')}>Back to Users</button>
                </div>
            </div>
        )
    }

    if (success) {
        return (
            <div className="reset-password">
                <div className="success-state">
                    <div className="success-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2>Password Reset Successfully</h2>
                    <p>The password for <strong>{user.name}</strong> has been reset successfully.</p>
                    {formData.sendEmail && (
                        <p>A notification email has been sent to <strong>{user.email}</strong> with the new password.</p>
                    )}
                    <div className="success-actions">
                        <button
                            className="btn btn--primary"
                            onClick={() => navigate('/admin/users')}
                        >
                            Back to Users
                        </button>
                        <button
                            className="btn btn--secondary"
                            onClick={() => navigate(`/admin/users/details/${user.id}`)}
                        >
                            View User Details
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="reset-password">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate('/admin/users')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Users
                </button>
                <div className="header-content">
                    <h1>Reset User Password</h1>
                    <p>Reset password for user account</p>
                </div>
            </div>

            <div className="reset-form-container">
                <div className="user-info-card">
                    <div className="user-avatar">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="user-details">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <span className="user-id">ID: {user.id}</span>
                        <span className={`status-badge status-badge--${user.status === 'active' ? 'success' : 'warning'}`}>
                            {user.status}
                        </span>
                    </div>
                </div>

                <div className="reset-form-card">
                    <div className="card-header">
                        <h2>New Password Information</h2>
                        <p>Set a new secure password for this user account</p>
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
                                Send notification email to user with new password
                            </label>
                        </div>

                        {errors.submit && (
                            <div className="error-message submit-error">{errors.submit}</div>
                        )}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => navigate('/admin/users')}
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

export default ResetPassword