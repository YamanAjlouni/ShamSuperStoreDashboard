import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CustomerServiceManagement.scss'

const CustomerServiceManagement = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formErrors, setFormErrors] = useState({})

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                email: 'sarah.johnson@company.com',
                status: 'active',
                ticketsCount: 45,
                createdAt: '2024-01-15',
                lastLogin: '2024-07-26'
            },
            {
                id: 2,
                email: 'mike.chen@company.com',
                status: 'active',
                ticketsCount: 32,
                createdAt: '2024-02-20',
                lastLogin: '2024-07-25'
            },
            {
                id: 3,
                email: 'emily.rodriguez@company.com',
                status: 'pending',
                ticketsCount: 0,
                createdAt: '2024-07-20',
                lastLogin: null
            },
            {
                id: 4,
                email: 'david.kim@company.com',
                status: 'active',
                ticketsCount: 78,
                createdAt: '2023-11-10',
                lastLogin: '2024-07-26'
            },
            {
                id: 5,
                email: 'lisa.thompson@company.com',
                status: 'pending',
                ticketsCount: 0,
                createdAt: '2024-07-22',
                lastLogin: null
            }
        ]

        setTimeout(() => {
            setUsers(mockUsers)
            setLoading(false)
        }, 1000)
    }, [])

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleAddUser = (e) => {
        e.preventDefault()

        // Validate form
        const errors = {}
        if (!formData.email) errors.email = 'Email is required'
        if (!formData.password) errors.password = 'Password is required'
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }
        if (formData.password && formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        // Add user logic here
        const newUser = {
            id: users.length + 1,
            email: formData.email,
            status: 'pending',
            ticketsCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: null
        }

        setUsers([...users, newUser])
        setShowAddModal(false)
        setFormData({ email: '', password: '', confirmPassword: '' })
        setFormErrors({})
    }

    const handleDeleteUser = () => {
        if (selectedUser) {
            setUsers(users.filter(user => user.id !== selectedUser.id))
            setShowDeleteModal(false)
            setSelectedUser(null)
        }
    }

    const handleResetPassword = (userId) => {
        console.log('Reset password for user:', userId)
        // Add reset password logic here
        alert('Password reset email sent!')
    }

    const getStatusBadge = (status) => {
        return (
            <span className={`status-badge status-badge--${status}`}>
                {status === 'active' ? 'Active' : 'Pending'}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="customer-service-management">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading customer service users...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="customer-service-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Customer Service Users</h1>
                    <p>Manage customer service representatives and their ticket assignments</p>
                </div>
                <button
                    className="btn btn--primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add User
                </button>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by email..."
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
                    <option value="pending">Pending</option>
                </select>
            </div>

            <div className="stats-cards">
                <div className="stat-card">
                    <div className="stat-icon stat-icon--total">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{users.length}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--active">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{users.filter(u => u.status === 'active').length}</h3>
                        <p>Active Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--pending">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{users.filter(u => u.status === 'pending').length}</h3>
                        <p>Pending Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--tickets">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <h3>{users.reduce((total, user) => total + user.ticketsCount, 0)}</h3>
                        <p>Total Tickets</p>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User #</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Tickets</th>
                            <th>Created</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <span className="user-number">#{String(user.id).padStart(3, '0')}</span>
                                </td>
                                <td>
                                    <div className="user-email">
                                        <span className="email-text">{user.email}</span>
                                    </div>
                                </td>
                                <td>{getStatusBadge(user.status)}</td>
                                <td>
                                    <span className="tickets-count">{user.ticketsCount}</span>
                                </td>
                                <td>
                                    <span className="date-text">{new Date(user.createdAt).toLocaleDateString()}</span>
                                </td>
                                <td>
                                    <span className="date-text">
                                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                    </span>
                                </td>
                                <td>
                                    <div className="actions-group">
                                        <button
                                            className="btn btn--sm btn--secondary"
                                            onClick={() => handleResetPassword(user.id)}
                                            title="Reset Password"
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="btn btn--sm btn--danger"
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setShowDeleteModal(true)
                                            }}
                                            title="Delete User"
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

                {filteredUsers.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3>No users found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add New Customer Service User</h2>
                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowAddModal(false)
                                    setFormData({ email: '', password: '', confirmPassword: '' })
                                    setFormErrors({})
                                }}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={formErrors.email ? 'error' : ''}
                                    placeholder="Enter email address"
                                />
                                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={formErrors.password ? 'error' : ''}
                                    placeholder="Enter password"
                                />
                                {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={formErrors.confirmPassword ? 'error' : ''}
                                    placeholder="Confirm password"
                                />
                                {formErrors.confirmPassword && <span className="error-text">{formErrors.confirmPassword}</span>}
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="btn btn--secondary"
                                    onClick={() => {
                                        setShowAddModal(false)
                                        setFormData({ email: '', password: '', confirmPassword: '' })
                                        setFormErrors({})
                                    }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn--primary">
                                    Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal modal--danger">
                        <div className="modal-header">
                            <h2>Delete User</h2>
                            <button
                                className="modal-close"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    setSelectedUser(null)
                                }}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="warning-icon">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3>Are you sure?</h3>
                            <p>
                                This will permanently delete the user account for{' '}
                                <strong>{selectedUser.email}</strong>. This action cannot be undone.
                            </p>
                        </div>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="btn btn--secondary"
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    setSelectedUser(null)
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn--danger"
                                onClick={handleDeleteUser}
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomerServiceManagement