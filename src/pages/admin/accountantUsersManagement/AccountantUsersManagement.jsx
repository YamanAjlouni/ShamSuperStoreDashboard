import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AccountantUsersManagement.scss'

// Modal Components
const AccountantDetailsModal = ({ accountant, isOpen, onClose }) => {
    if (!isOpen || !accountant) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content--large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Accountant Details</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="details-grid">
                        <div className="detail-group">
                            <label>Accountant ID</label>
                            <span className="detail-value detail-value--id">{accountant.id}</span>
                        </div>
                        <div className="detail-group">
                            <label>Full Name</label>
                            <span className="detail-value">{accountant.fullName}</span>
                        </div>
                        <div className="detail-group">
                            <label>Email Address</label>
                            <span className="detail-value detail-value--email">{accountant.email}</span>
                        </div>
                        <div className="detail-group">
                            <label>Phone Number</label>
                            <span className="detail-value">{accountant.phone}</span>
                        </div>
                        <div className="detail-group">
                            <label>Join Date</label>
                            <span className="detail-value">{new Date(accountant.joinDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                        <div className="detail-group">
                            <label>Status</label>
                            <span className={`status-tag status-tag--${accountant.status}`}>
                                {accountant.status.charAt(0).toUpperCase() + accountant.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

const ResetPasswordModal = ({ accountant, isOpen, onClose, onConfirm }) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!')
            return
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long!')
            return
        }

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            onConfirm(accountant.id, newPassword)
            setIsLoading(false)
            setNewPassword('')
            setConfirmPassword('')
            onClose()
        }, 1000)
    }

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let password = ''
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setNewPassword(password)
        setConfirmPassword(password)
    }

    if (!isOpen || !accountant) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Reset Password</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="reset-info">
                            <p>Reset password for: <strong>{accountant.fullName}</strong></p>
                            <p>Email: <strong>{accountant.email}</strong></p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="password-input-group">
                                <input
                                    type="text"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    minLength={8}
                                />
                                <button type="button" className="generate-btn" onClick={generatePassword}>
                                    Generate
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="text"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="password-requirements">
                            <p>Password Requirements:</p>
                            <ul>
                                <li>At least 8 characters long</li>
                                <li>Mix of uppercase and lowercase letters</li>
                                <li>Include numbers and special characters</li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const DeleteConfirmModal = ({ accountant, isOpen, onClose, onConfirm }) => {
    const [confirmText, setConfirmText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const expectedText = 'DELETE'
    const isConfirmValid = confirmText === expectedText

    const handleConfirm = async () => {
        if (!isConfirmValid) return

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            onConfirm(accountant.id)
            setIsLoading(false)
            setConfirmText('')
            onClose()
        }, 1000)
    }

    if (!isOpen || !accountant) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content--danger" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Delete Accountant</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="warning-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div className="delete-warning">
                        <h3>Are you absolutely sure?</h3>
                        <p>You are about to permanently delete the accountant account for:</p>
                        <div className="accountant-info">
                            <strong>{accountant.fullName}</strong><br />
                            <span>{accountant.email}</span><br />
                            <span>ID: {accountant.id}</span>
                        </div>
                        <div className="warning-text">
                            <strong>Warning:</strong> This action cannot be undone. This will permanently delete the accountant's account, remove all access permissions, and delete all associated data.
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmText">
                                Type <strong>DELETE</strong> to confirm:
                            </label>
                            <input
                                type="text"
                                id="confirmText"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder="Type DELETE to confirm"
                                className={confirmText && !isConfirmValid ? 'error' : ''}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleConfirm}
                        disabled={!isConfirmValid || isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete Accountant'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const AddAccountantModal = ({ isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!')
            return
        }
        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long!')
            return
        }

        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            onConfirm(formData)
            setIsLoading(false)
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            })
            onClose()
        }, 1000)
    }

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let password = ''
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setFormData(prev => ({
            ...prev,
            password: password,
            confirmPassword: password
        }))
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content modal-content--large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Accountant</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <div className="password-input-group">
                                    <input
                                        type="text"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter password"
                                        required
                                        minLength={8}
                                    />
                                    <button type="button" className="generate-btn" onClick={generatePassword}>
                                        Generate
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                <input
                                    type="text"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>
                        <div className="password-requirements">
                            <p>Password Requirements:</p>
                            <ul>
                                <li>At least 8 characters long</li>
                                <li>Mix of uppercase and lowercase letters</li>
                                <li>Include numbers and special characters</li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Accountant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const AccountantUsersManagement = () => {
    const navigate = useNavigate()
    const [accountants, setAccountants] = useState([])
    const [filteredAccountants, setFilteredAccountants] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [accountantsPerPage, setAccountantsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Modal states
    const [selectedAccountant, setSelectedAccountant] = useState(null)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    // Mock data - removed employeeId field
    const mockAccountants = [
        {
            id: 'ACC001',
            fullName: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            phone: '+1 (555) 201-0001',
            status: 'active',
            joinDate: '2024-03-15'
        },
        {
            id: 'ACC002',
            fullName: 'Michael Chen',
            email: 'michael.chen@company.com',
            phone: '+1 (555) 201-0002',
            status: 'active',
            joinDate: '2024-01-20'
        },
        {
            id: 'ACC003',
            fullName: 'Emily Rodriguez',
            email: 'emily.rodriguez@company.com',
            phone: '+1 (555) 201-0003',
            status: 'suspended',
            joinDate: '2023-11-10'
        },
        {
            id: 'ACC004',
            fullName: 'David Kim',
            email: 'david.kim@company.com',
            phone: '+1 (555) 201-0004',
            status: 'active',
            joinDate: '2024-06-08'
        },
        {
            id: 'ACC005',
            fullName: 'Lisa Thompson',
            email: 'lisa.thompson@company.com',
            phone: '+1 (555) 201-0005',
            status: 'suspended',
            joinDate: '2024-02-12'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setAccountants(mockAccountants)
            setFilteredAccountants(mockAccountants)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = accountants

        // Search filter - removed employeeId from search
        if (searchTerm) {
            filtered = filtered.filter(accountant =>
                accountant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                accountant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                accountant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                accountant.phone.includes(searchTerm)
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(accountant => accountant.status === statusFilter)
        }

        setFilteredAccountants(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, accountants])

    // Pagination
    const indexOfLastAccountant = currentPage * accountantsPerPage
    const indexOfFirstAccountant = indexOfLastAccountant - accountantsPerPage
    const currentAccountants = filteredAccountants.slice(indexOfFirstAccountant, indexOfLastAccountant)
    const totalPages = Math.ceil(filteredAccountants.length / accountantsPerPage)

    // Modal handlers
    const handleViewAccountant = (accountant) => {
        setSelectedAccountant(accountant)
        setIsDetailsModalOpen(true)
    }

    const handleResetPassword = (accountant) => {
        setSelectedAccountant(accountant)
        setIsResetPasswordModalOpen(true)
    }

    const handleDeleteAccountant = (accountant) => {
        setSelectedAccountant(accountant)
        setIsDeleteModalOpen(true)
    }

    const handleAddAccountant = () => {
        setIsAddModalOpen(true)
    }

    const handlePasswordResetConfirm = async (accountantId, newPassword) => {
        // API call to reset password
        console.log(`Password reset for ${accountantId} with password: ${newPassword}`)
        alert(`Password has been reset for ${selectedAccountant.fullName}`)
    }

    const handleDeleteConfirm = async (accountantId) => {
        // API call to delete accountant
        setAccountants(accountants.filter(accountant => accountant.id !== accountantId))
        alert(`Accountant ${selectedAccountant.fullName} has been deleted`)
    }

    const handleAddConfirm = async (formData) => {
        // API call to add new accountant - removed employeeId
        const newAccountant = {
            id: `ACC${String(accountants.length + 1).padStart(3, '0')}`,
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            status: 'active',
            joinDate: new Date().toISOString().split('T')[0]
        }

        setAccountants([...accountants, newAccountant])
        alert(`Accountant ${formData.fullName} has been added successfully`)
    }

    const handleSuspendAccountant = async (accountantId) => {
        if (window.confirm('Are you sure you want to suspend this accountant?')) {
            // API call to suspend accountant
            setAccountants(accountants.map(accountant =>
                accountant.id === accountantId
                    ? { ...accountant, status: 'suspended' }
                    : accountant
            ))
        }
    }

    const handleUnsuspendAccountant = async (accountantId) => {
        if (window.confirm('Are you sure you want to remove suspension from this accountant?')) {
            // API call to unsuspend accountant
            setAccountants(accountants.map(accountant =>
                accountant.id === accountantId
                    ? { ...accountant, status: 'active' }
                    : accountant
            ))
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'success', label: 'Active', icon: '🟢' },
            suspended: { class: 'warning', label: 'Suspended', icon: '🟡' }
        }
        const config = statusConfig[status] || statusConfig.active
        return (
            <span className={`status-badge status-badge--${config.class}`}>
                <span className="status-icon">{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="accountants-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading accountants...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="accountants-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Accountant Users</h1>
                    <p>Manage and monitor all accountant user accounts</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{accountants.filter(a => a.status === 'active').length}</span>
                        <span className="stat-label">Active</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{accountants.filter(a => a.status === 'suspended').length}</span>
                        <span className="stat-label">Suspended</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{accountants.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                </div>
            </div>

            <div className="accountants-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search accountants, emails, IDs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-filter"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                        <button className="btn btn-primary" onClick={handleAddAccountant}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add New Accountant
                        </button>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstAccountant + 1}-{Math.min(indexOfLastAccountant, filteredAccountants.length)} of {filteredAccountants.length} accountants
                        </span>
                        <select
                            value={accountantsPerPage}
                            onChange={(e) => setAccountantsPerPage(Number(e.target.value))}
                            className="per-page-select"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="accountants-table">
                        <thead>
                            <tr>
                                <th>Accountant ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccountants.map((accountant) => (
                                <tr key={accountant.id}>
                                    <td className="accountant-id">{accountant.id}</td>
                                    <td className="accountant-name">
                                        <div className="name-cell">
                                            <span className="name">{accountant.fullName}</span>
                                            <span className="role">Accountant</span>
                                        </div>
                                    </td>
                                    <td className="email">{accountant.email}</td>
                                    <td className="phone">{accountant.phone}</td>
                                    <td className="join-date">{formatDate(accountant.joinDate)}</td>
                                    <td className="status">{getStatusBadge(accountant.status)}</td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewAccountant(accountant)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {accountant.status === 'suspended' ? (
                                                <button
                                                    className="action-btn action-btn--unsuspend"
                                                    onClick={() => handleUnsuspendAccountant(accountant.id)}
                                                    title="Remove Suspension"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className="action-btn action-btn--suspend"
                                                    onClick={() => handleSuspendAccountant(accountant.id)}
                                                    title="Suspend Accountant"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn action-btn--reset"
                                                onClick={() => handleResetPassword(accountant)}
                                                title="Reset Password"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="action-btn action-btn--delete"
                                                onClick={() => handleDeleteAccountant(accountant)}
                                                title="Delete Accountant"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="pagination-info">
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>

                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Modals */}
            <AccountantDetailsModal
                accountant={selectedAccountant}
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
            />

            <ResetPasswordModal
                accountant={selectedAccountant}
                isOpen={isResetPasswordModalOpen}
                onClose={() => setIsResetPasswordModalOpen(false)}
                onConfirm={handlePasswordResetConfirm}
            />

            <DeleteConfirmModal
                accountant={selectedAccountant}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
            />

            <AddAccountantModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onConfirm={handleAddConfirm}
            />
        </div>
    )
}

export default AccountantUsersManagement