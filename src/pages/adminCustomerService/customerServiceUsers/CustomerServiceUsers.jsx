import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Plus,
    Search,
    Users,
    CheckCircle,
    Clock,
    Ticket,
    Eye,
    Key,
    Trash2,
    X,
    AlertTriangle
} from 'lucide-react'
import CustomerServiceUserDetails from './customerServiceUserDetails/CustomerServiceUserDetails'
import './CustomerServiceUsers.scss'

const CustomerServiceUsers = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedUserForDetails, setSelectedUserForDetails] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [formData, setFormData] = useState({
        name: '', // Added name field
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formErrors, setFormErrors] = useState({})

    // Mock data with tickets
    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                email: 'sarah.johnson@company.com',
                firstName: 'Sarah',
                lastName: 'Johnson',
                status: 'active',
                ticketsCount: 45,
                createdAt: '2024-01-15',
                lastLogin: '2024-07-26',
                tickets: [
                    {
                        id: 'T-001',
                        orderNumber: '12345',
                        customerName: 'John Doe',
                        sellerName: 'Fresh Market Co.',
                        reason: 'Product quality issue',
                        status: 'resolved',
                        priority: 'medium',
                        createdAt: '2024-07-20',
                        resolvedAt: '2024-07-21'
                    },
                    {
                        id: 'T-015',
                        orderNumber: '12389',
                        customerName: 'Mike Wilson',
                        sellerName: 'Tech Solutions Ltd.',
                        reason: 'Delivery problem',
                        status: 'open',
                        priority: 'high',
                        createdAt: '2024-07-25',
                        resolvedAt: null
                    },
                    {
                        id: 'T-028',
                        orderNumber: '12412',
                        customerName: 'Emma Davis',
                        sellerName: 'Fashion Hub',
                        reason: 'Wrong item',
                        status: 'closed',
                        priority: 'low',
                        createdAt: '2024-07-15',
                        resolvedAt: '2024-07-16'
                    }
                ]
            },
            {
                id: 2,
                email: 'mike.chen@company.com',
                firstName: 'Mike',
                lastName: 'Chen',
                status: 'active',
                ticketsCount: 32,
                createdAt: '2024-02-20',
                lastLogin: '2024-07-25',
                tickets: [
                    {
                        id: 'T-008',
                        orderNumber: '12356',
                        customerName: 'Lisa Brown',
                        sellerName: 'Book Store Plus',
                        reason: 'Damaged item',
                        status: 'resolved',
                        priority: 'medium',
                        createdAt: '2024-07-22',
                        resolvedAt: '2024-07-23'
                    },
                    {
                        id: 'T-019',
                        orderNumber: '12398',
                        customerName: 'David Kim',
                        sellerName: 'Fresh Market Co.',
                        reason: 'Late delivery',
                        status: 'open',
                        priority: 'low',
                        createdAt: '2024-07-24',
                        resolvedAt: null
                    }
                ]
            },
            {
                id: 3,
                email: 'emily.rodriguez@company.com',
                firstName: 'Emily',
                lastName: 'Rodriguez',
                status: 'pending',
                ticketsCount: 0,
                createdAt: '2024-07-20',
                lastLogin: null,
                tickets: []
            },
            {
                id: 4,
                email: 'david.kim@company.com',
                firstName: 'David',
                lastName: 'Kim',
                status: 'active',
                ticketsCount: 78,
                createdAt: '2023-11-10',
                lastLogin: '2024-07-26',
                tickets: [
                    {
                        id: 'T-003',
                        orderNumber: '12347',
                        customerName: 'Jane Smith',
                        sellerName: 'Fashion Hub',
                        reason: 'Refund request',
                        status: 'resolved',
                        priority: 'high',
                        createdAt: '2024-07-18',
                        resolvedAt: '2024-07-19'
                    },
                    {
                        id: 'T-012',
                        orderNumber: '12378',
                        customerName: 'Robert Johnson',
                        sellerName: 'Tech Solutions Ltd.',
                        reason: 'Product quality issue',
                        status: 'open',
                        priority: 'medium',
                        createdAt: '2024-07-23',
                        resolvedAt: null
                    },
                    {
                        id: 'T-021',
                        orderNumber: '12401',
                        customerName: 'Anna Garcia',
                        sellerName: 'Book Store Plus',
                        reason: 'Customer complaint',
                        status: 'closed',
                        priority: 'low',
                        createdAt: '2024-07-16',
                        resolvedAt: '2024-07-17'
                    }
                ]
            },
            {
                id: 5,
                email: 'lisa.thompson@company.com',
                firstName: 'Lisa',
                lastName: 'Thompson',
                status: 'pending',
                ticketsCount: 0,
                createdAt: '2024-07-22',
                lastLogin: null,
                tickets: []
            }
        ]

        setTimeout(() => {
            setUsers(mockUsers)
            setLoading(false)
        }, 1000)
    }, [])

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const handleAddUser = (e) => {
        e.preventDefault()

        // Validate form
        const errors = {}
        if (!formData.name.trim()) errors.name = 'Name is required'
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

        // Split name into first and last name
        const nameParts = formData.name.trim().split(' ')
        const firstName = nameParts[0] || 'User'
        const lastName = nameParts.slice(1).join(' ') || ''

        const newUser = {
            id: users.length + 1,
            email: formData.email,
            firstName,
            lastName,
            status: 'pending',
            ticketsCount: 0,
            createdAt: new Date().toISOString().split('T')[0],
            lastLogin: null,
            tickets: []
        }

        setUsers([...users, newUser])
        setShowAddModal(false)
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
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
        alert('Password reset email sent!')
    }

    const handleViewDetails = (user) => {
        setSelectedUserForDetails(user)
    }

    const handleBackToList = () => {
        setSelectedUserForDetails(null)
    }

    const getStatusBadge = (status) => {
        return (
            <span className={`status-badge status-badge--${status}`}>
                {status === 'active' ? 'Active' : 'Pending'}
            </span>
        )
    }

    // Reset form function
    const resetForm = () => {
        setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        setFormErrors({})
    }

    // If viewing user details, render the details component
    if (selectedUserForDetails) {
        return (
            <CustomerServiceUserDetails
                user={selectedUserForDetails}
                onBack={handleBackToList}
            />
        )
    }

    if (loading) {
        return (
            <div className="customer-service-users">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading customer service users...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="customer-service-users">
            <div className="page-header">
                <div className="header-content">
                    <h1>Customer Service Users</h1>
                    <p>Manage customer service representatives and their ticket assignments</p>
                </div>
                <button
                    className="btn btn--primary"
                    onClick={() => setShowAddModal(true)}
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
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
                        <Users size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{users.length}</h3>
                        <p>Total Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--active">
                        <CheckCircle size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{users.filter(u => u.status === 'active').length}</h3>
                        <p>Active Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--pending">
                        <Clock size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{users.filter(u => u.status === 'pending').length}</h3>
                        <p>Pending Users</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon stat-icon--tickets">
                        <Ticket size={24} />
                    </div>
                    <div className="stat-content">
                        <h3>{users.reduce((total, user) => total + user.ticketsCount, 0)}</h3>
                        <p>Total Tickets</p>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <div className="table-wrapper">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User #</th>
                                <th>Name</th>
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
                                        <div className="user-name">
                                            <span className="name-text">{user.firstName} {user.lastName}</span>
                                        </div>
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
                                                className="btn btn--sm btn--primary"
                                                onClick={() => handleViewDetails(user)}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="btn btn--sm btn--secondary"
                                                onClick={() => handleResetPassword(user.id)}
                                                title="Reset Password"
                                            >
                                                <Key size={16} />
                                            </button>
                                            <button
                                                className="btn btn--sm btn--danger"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setShowDeleteModal(true)
                                                }}
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <Users size={32} />
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
                                    resetForm()
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddUser} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={formErrors.name ? 'error' : ''}
                                    placeholder="Enter full name (e.g., John Doe)"
                                />
                                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                            </div>

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
                                        resetForm()
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
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="warning-icon">
                                <AlertTriangle size={24} />
                            </div>
                            <h3>Are you sure?</h3>
                            <p>
                                This will permanently delete the user account for{' '}
                                <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>. This action cannot be undone.
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

export default CustomerServiceUsers