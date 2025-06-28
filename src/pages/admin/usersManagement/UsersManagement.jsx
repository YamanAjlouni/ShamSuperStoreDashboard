import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UsersManagement.scss'

const UsersManagement = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Mock data - replace with actual API call
    const mockUsers = [
        {
            id: 'USR001',
            name: 'Alice Johnson',
            email: 'alice.johnson@email.com',
            phone: '+1 (555) 123-0001',
            address: '123 Maple Street, New York, NY 10001',
            status: 'active',
            joinDate: '2024-01-10',
            totalOrders: 15,
            totalSpent: 2450.75,
            lastOrderDate: '2024-06-20',
            accountType: 'premium'
        },
        {
            id: 'USR002',
            name: 'Bob Smith',
            email: 'bob.smith@email.com',
            phone: '+1 (555) 123-0002',
            address: '456 Oak Avenue, Los Angeles, CA 90210',
            status: 'active',
            joinDate: '2024-02-15',
            totalOrders: 8,
            totalSpent: 1240.50,
            lastOrderDate: '2024-06-18',
            accountType: 'standard'
        },
        {
            id: 'USR003',
            name: 'Carol Davis',
            email: 'carol.davis@email.com',
            phone: '+1 (555) 123-0003',
            address: '789 Pine Road, Chicago, IL 60601',
            status: 'suspended',
            joinDate: '2024-01-25',
            totalOrders: 3,
            totalSpent: 180.25,
            lastOrderDate: '2024-05-10',
            accountType: 'standard'
        },
        {
            id: 'USR004',
            name: 'David Wilson',
            email: 'david.wilson@email.com',
            phone: '+1 (555) 123-0004',
            address: '321 Elm Street, Houston, TX 77001',
            status: 'active',
            joinDate: '2024-03-08',
            totalOrders: 22,
            totalSpent: 3675.90,
            lastOrderDate: '2024-06-25',
            accountType: 'premium'
        },
        {
            id: 'USR005',
            name: 'Emily Brown',
            email: 'emily.brown@email.com',
            phone: '+1 (555) 123-0005',
            address: '654 Cedar Lane, Phoenix, AZ 85001',
            status: 'active',
            joinDate: '2024-02-20',
            totalOrders: 12,
            totalSpent: 1890.40,
            lastOrderDate: '2024-06-22',
            accountType: 'standard'
        },
        {
            id: 'USR006',
            name: 'Frank Miller',
            email: 'frank.miller@email.com',
            phone: '+1 (555) 123-0006',
            address: '987 Birch Drive, Philadelphia, PA 19101',
            status: 'inactive',
            joinDate: '2024-01-05',
            totalOrders: 1,
            totalSpent: 45.99,
            lastOrderDate: '2024-01-12',
            accountType: 'standard'
        },
        {
            id: 'USR007',
            name: 'Grace Taylor',
            email: 'grace.taylor@email.com',
            phone: '+1 (555) 123-0007',
            address: '159 Walnut Street, San Antonio, TX 78201',
            status: 'active',
            joinDate: '2024-04-12',
            totalOrders: 7,
            totalSpent: 980.15,
            lastOrderDate: '2024-06-19',
            accountType: 'standard'
        },
        {
            id: 'USR008',
            name: 'Henry Anderson',
            email: 'henry.anderson@email.com',
            phone: '+1 (555) 123-0008',
            address: '753 Spruce Court, San Diego, CA 92101',
            status: 'active',
            joinDate: '2024-03-22',
            totalOrders: 18,
            totalSpent: 2850.60,
            lastOrderDate: '2024-06-24',
            accountType: 'premium'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setUsers(mockUsers)
            setFilteredUsers(mockUsers)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = users

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.includes(searchTerm)
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => user.status === statusFilter)
        }

        setFilteredUsers(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, users])

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const handleViewUser = (userId) => {
        navigate(`/admin/users/details/${userId}`)
    }

    const handleContactUser = (user) => {
        // Open email client or contact modal
        window.location.href = `mailto:${user.email}?subject=Regarding your account`
    }

    const handleSuspendUser = async (userId) => {
        if (window.confirm('Are you sure you want to suspend this user?')) {
            // API call to suspend user
            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, status: 'suspended' }
                    : user
            ))
        }
    }

    const handleActivateUser = async (userId) => {
        if (window.confirm('Are you sure you want to activate this user?')) {
            // API call to activate user
            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, status: 'active' }
                    : user
            ))
        }
    }

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
            // API call to delete user
            setUsers(users.filter(user => user.id !== userId))
        }
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'success', label: 'Active' },
            suspended: { class: 'warning', label: 'Suspended' },
            inactive: { class: 'danger', label: 'Inactive' }
        }
        const config = statusConfig[status] || statusConfig.inactive
        return <span className={`status-badge status-badge--${config.class}`}>{config.label}</span>
    }

    const getAccountTypeBadge = (accountType) => {
        const typeConfig = {
            premium: { class: 'premium', label: 'Premium' },
            standard: { class: 'standard', label: 'Standard' }
        }
        const config = typeConfig[accountType] || typeConfig.standard
        return <span className={`account-type account-type--${config.class}`}>{config.label}</span>
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
            <div className="users-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading users...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="users-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Users Management</h1>
                    <p>Manage and monitor all registered users and their accounts</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{users.filter(u => u.status === 'active').length}</span>
                        <span className="stat-label">Active Users</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{users.filter(u => u.status === 'suspended').length}</span>
                        <span className="stat-label">Suspended</span>
                    </div>
                    {/* <div className="stat-item">
                        <span className="stat-number">{users.filter(u => u.accountType === 'premium').length}</span>
                        <span className="stat-label">Premium Users</span>
                    </div> */}
                    <div className="stat-item">
                        <span className="stat-number">{users.length}</span>
                        <span className="stat-label">Total Users</span>
                    </div>
                </div>
            </div>

            <div className="users-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search users, emails, or IDs..."
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
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                        </span>
                        <select
                            value={usersPerPage}
                            onChange={(e) => setUsersPerPage(Number(e.target.value))}
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
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Join Date</th>
                                <th>Status</th>
                                {/* <th>Account Type</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="user-id">{user.id}</td>
                                    <td className="user-name">
                                        <div className="name-cell">
                                            <span className="name">{user.name}</span>
                                            <span className="last-order">Last order: {formatDate(user.lastOrderDate)}</span>
                                        </div>
                                    </td>
                                    <td className="email">{user.email}</td>
                                    <td className="phone">{user.phone}</td>
                                    <td className="address">
                                        <div className="address-cell">
                                            {user.address}
                                        </div>
                                    </td>
                                    <td className="orders-count">
                                        <span className="orders-number">{user.totalOrders}</span>
                                    </td>
                                    <td className="total-spent">
                                        <span className="amount">${user.totalSpent.toLocaleString()}</span>
                                    </td>
                                    <td className="join-date">{formatDate(user.joinDate)}</td>
                                    <td className="status">{getStatusBadge(user.status)}</td>
                                    {/* <td className="account-type">{getAccountTypeBadge(user.accountType)}</td> */}
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewUser(user.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="action-btn action-btn--contact"
                                                onClick={() => handleContactUser(user)}
                                                title="Contact User"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            {user.status === 'active' ? (
                                                <button
                                                    className="action-btn action-btn--suspend"
                                                    onClick={() => handleSuspendUser(user.id)}
                                                    title="Suspend User"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className="action-btn action-btn--activate"
                                                    onClick={() => handleActivateUser(user.id)}
                                                    title="Activate User"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn action-btn--delete"
                                                onClick={() => handleDeleteUser(user.id)}
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
                </div>

                {/* Pagination */}
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
        </div>
    )
}

export default UsersManagement