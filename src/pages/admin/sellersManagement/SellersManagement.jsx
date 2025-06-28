import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './SellersManagement.scss'

const SellersManagement = () => {
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([])
    const [filteredSellers, setFilteredSellers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sellersPerPage, setSellersPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)

    // Mock data - replace with actual API call
    const mockSellers = [
        {
            id: 'SEL001',
            personalName: 'John Smith',
            storeName: 'Tech Paradise',
            storeAddress: '123 Main St, New York, NY 10001',
            storePhone: '+1 (555) 123-4567',
            personalAddress: '456 Oak Ave, Brooklyn, NY 11201',
            personalPhone: '+1 (555) 987-6543',
            status: 'active',
            joinDate: '2024-01-15',
            productsCount: 45,
            totalOrders: 234,
            revenue: 15670.50,
            email: 'john.smith@email.com'
        },
        {
            id: 'SEL002',
            personalName: 'Sarah Johnson',
            storeName: 'Fashion Hub',
            storeAddress: '789 Fashion Ave, Los Angeles, CA 90210',
            storePhone: '+1 (555) 234-5678',
            personalAddress: '321 Sunset Blvd, Hollywood, CA 90028',
            personalPhone: '+1 (555) 876-5432',
            status: 'active',
            joinDate: '2024-02-20',
            productsCount: 78,
            totalOrders: 189,
            revenue: 12450.75,
            email: 'sarah.johnson@email.com'
        },
        {
            id: 'SEL003',
            personalName: 'Mike Rodriguez',
            storeName: 'Home Essentials',
            storeAddress: '555 Garden St, Chicago, IL 60601',
            storePhone: '+1 (555) 345-6789',
            personalAddress: '777 Lake Dr, Chicago, IL 60614',
            personalPhone: '+1 (555) 765-4321',
            status: 'suspended',
            joinDate: '2024-03-10',
            productsCount: 23,
            totalOrders: 67,
            revenue: 3240.25,
            email: 'mike.rodriguez@email.com'
        },
        {
            id: 'SEL004',
            personalName: 'Emily Chen',
            storeName: 'Beauty Corner',
            storeAddress: '888 Beauty Blvd, Miami, FL 33101',
            storePhone: '+1 (555) 456-7890',
            personalAddress: '999 Palm St, Miami Beach, FL 33139',
            personalPhone: '+1 (555) 654-3210',
            status: 'active',
            joinDate: '2024-01-28',
            productsCount: 156,
            totalOrders: 445,
            revenue: 28950.80,
            email: 'emily.chen@email.com'
        },
        {
            id: 'SEL005',
            personalName: 'David Wilson',
            storeName: 'Sports Zone',
            storeAddress: '222 Sports Way, Denver, CO 80202',
            storePhone: '+1 (555) 567-8901',
            personalAddress: '444 Mountain View, Denver, CO 80205',
            personalPhone: '+1 (555) 543-2109',
            status: 'active',
            joinDate: '2024-02-14',
            productsCount: 89,
            totalOrders: 312,
            revenue: 19675.45,
            email: 'david.wilson@email.com'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setSellers(mockSellers)
            setFilteredSellers(mockSellers)
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        let filtered = sellers

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(seller =>
                seller.personalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seller.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seller.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seller.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(seller => seller.status === statusFilter)
        }

        setFilteredSellers(filtered)
        setCurrentPage(1)
    }, [searchTerm, statusFilter, sellers])

    // Pagination
    const indexOfLastSeller = currentPage * sellersPerPage
    const indexOfFirstSeller = indexOfLastSeller - sellersPerPage
    const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller)
    const totalPages = Math.ceil(filteredSellers.length / sellersPerPage)

    const handleViewSeller = (sellerId) => {
        navigate(`/admin/sellers/details/${sellerId}`)
    }

    const handleContactSeller = (seller) => {
        // Open email client or contact modal
        window.location.href = `mailto:${seller.email}?subject=Regarding your store: ${seller.storeName}`
    }

    const handleSuspendSeller = async (sellerId) => {
        if (window.confirm('Are you sure you want to suspend this seller?')) {
            // API call to suspend seller
            setSellers(sellers.map(seller =>
                seller.id === sellerId
                    ? { ...seller, status: 'suspended' }
                    : seller
            ))
        }
    }

    const handleActivateSeller = async (sellerId) => {
        if (window.confirm('Are you sure you want to activate this seller?')) {
            // API call to activate seller
            setSellers(sellers.map(seller =>
                seller.id === sellerId
                    ? { ...seller, status: 'active' }
                    : seller
            ))
        }
    }

    const handleDeleteSeller = async (sellerId) => {
        if (window.confirm('Are you sure you want to permanently delete this seller and all their products? This action cannot be undone.')) {
            // API call to delete seller
            setSellers(sellers.filter(seller => seller.id !== sellerId))
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

    if (loading) {
        return (
            <div className="sellers-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading sellers...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="sellers-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Sellers Management</h1>
                    <p>Manage and monitor all registered sellers and their stores</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{sellers.filter(s => s.status === 'active').length}</span>
                        <span className="stat-label">Active Sellers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{sellers.filter(s => s.status === 'suspended').length}</span>
                        <span className="stat-label">Suspended</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{sellers.length}</span>
                        <span className="stat-label">Total Sellers</span>
                    </div>
                </div>
            </div>

            <div className="sellers-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search sellers, stores, or IDs..."
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
                            Showing {indexOfFirstSeller + 1}-{Math.min(indexOfLastSeller, filteredSellers.length)} of {filteredSellers.length} sellers
                        </span>
                        <select
                            value={sellersPerPage}
                            onChange={(e) => setSellersPerPage(Number(e.target.value))}
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
                    <table className="sellers-table">
                        <thead>
                            <tr>
                                <th>Seller ID</th>
                                <th>Personal Name</th>
                                <th>Store Name</th>
                                <th>Store Address</th>
                                <th>Store Phone</th>
                                <th>Personal Address</th>
                                <th>Personal Phone</th>
                                <th>Status</th>
                                <th>Products</th>
                                <th>Revenue</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSellers.map((seller) => (
                                <tr key={seller.id}>
                                    <td className="seller-id">{seller.id}</td>
                                    <td className="personal-name">
                                        <div className="name-cell">
                                            <span className="name">{seller.personalName}</span>
                                            <span className="email">{seller.email}</span>
                                        </div>
                                    </td>
                                    <td className="store-name">{seller.storeName}</td>
                                    <td className="store-address">
                                        <div className="address-cell">
                                            {seller.storeAddress}
                                        </div>
                                    </td>
                                    <td className="store-phone">{seller.storePhone}</td>
                                    <td className="personal-address">
                                        <div className="address-cell">
                                            {seller.personalAddress}
                                        </div>
                                    </td>
                                    <td className="personal-phone">{seller.personalPhone}</td>
                                    <td className="status">{getStatusBadge(seller.status)}</td>
                                    <td className="products-count">{seller.productsCount}</td>
                                    <td className="revenue">${seller.revenue.toLocaleString()}</td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewSeller(seller.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                className="action-btn action-btn--contact"
                                                onClick={() => handleContactSeller(seller)}
                                                title="Contact Seller"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            {seller.status === 'active' ? (
                                                <button
                                                    className="action-btn action-btn--suspend"
                                                    onClick={() => handleSuspendSeller(seller.id)}
                                                    title="Suspend Seller"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className="action-btn action-btn--activate"
                                                    onClick={() => handleActivateSeller(seller.id)}
                                                    title="Activate Seller"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn action-btn--delete"
                                                onClick={() => handleDeleteSeller(seller.id)}
                                                title="Delete Seller"
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

export default SellersManagement