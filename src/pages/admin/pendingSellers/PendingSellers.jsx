import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PendingSellers.scss'

const PendingSellers = () => {
    const navigate = useNavigate()
    const [pendingSellers, setPendingSellers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sellersPerPage, setSellersPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)

    // Mock data for pending sellers
    const mockPendingSellers = [
        {
            id: 'PEND001',
            personalName: 'Alex Thompson',
            storeName: 'Book Haven',
            storeAddress: '456 Literary Lane, Boston, MA 02101',
            storePhone: '+1 (555) 111-2233',
            personalAddress: '789 Reading Road, Cambridge, MA 02139',
            personalPhone: '+1 (555) 333-4455',
            email: 'alex.thompson@email.com',
            applicationDate: '2024-06-20',
            documents: ['business_license.pdf', 'tax_id.pdf'],
            businessType: 'Bookstore',
            expectedProducts: 500
        },
        {
            id: 'PEND002',
            personalName: 'Maria Garcia',
            storeName: 'Artisan Crafts',
            storeAddress: '321 Creative Ave, Portland, OR 97201',
            storePhone: '+1 (555) 222-3344',
            personalAddress: '654 Craft Circle, Portland, OR 97205',
            personalPhone: '+1 (555) 444-5566',
            email: 'maria.garcia@email.com',
            applicationDate: '2024-06-22',
            documents: ['business_license.pdf', 'tax_id.pdf', 'portfolio.pdf'],
            businessType: 'Handmade Crafts',
            expectedProducts: 150
        },
        {
            id: 'PEND003',
            personalName: 'Robert Kim',
            storeName: 'Tech Gadgets Pro',
            storeAddress: '888 Innovation Blvd, Austin, TX 78701',
            storePhone: '+1 (555) 333-4455',
            personalAddress: '999 Silicon Street, Austin, TX 78704',
            personalPhone: '+1 (555) 555-6677',
            email: 'robert.kim@email.com',
            applicationDate: '2024-06-25',
            documents: ['business_license.pdf', 'tax_id.pdf', 'supplier_agreements.pdf'],
            businessType: 'Electronics',
            expectedProducts: 200
        }
    ]

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setPendingSellers(mockPendingSellers)
            setLoading(false)
        }, 500)
    }, [])

    const filteredSellers = pendingSellers.filter(seller =>
        seller.personalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination
    const indexOfLastSeller = currentPage * sellersPerPage
    const indexOfFirstSeller = indexOfLastSeller - sellersPerPage
    const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller)
    const totalPages = Math.ceil(filteredSellers.length / sellersPerPage)

    const handleViewApplication = (sellerId) => {
        navigate(`/admin/sellers/details/${sellerId}`)
    }

    const handleApproveApplication = async (sellerId) => {
        if (window.confirm('Are you sure you want to approve this seller application?')) {
            // API call to approve seller
            console.log('Approving seller:', sellerId)
            setPendingSellers(pendingSellers.filter(seller => seller.id !== sellerId))
            // Show success notification
        }
    }

    const handleRejectApplication = async (sellerId) => {
        const reason = window.prompt('Please provide a reason for rejection:')
        if (reason) {
            // API call to reject seller with reason
            console.log('Rejecting seller:', sellerId, 'Reason:', reason)
            setPendingSellers(pendingSellers.filter(seller => seller.id !== sellerId))
            // Show success notification
        }
    }

    const handleContactApplicant = (seller) => {
        window.location.href = `mailto:${seller.email}?subject=Regarding your seller application for ${seller.storeName}`
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getDaysAgo = (dateString) => {
        const applicationDate = new Date(dateString)
        const today = new Date()
        const diffTime = Math.abs(today - applicationDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    if (loading) {
        return (
            <div className="pending-sellers">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading pending applications...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pending-sellers">
            <div className="page-header">
                <div className="header-content">
                    <h1>Pending Seller Applications</h1>
                    <p>Review and approve new seller registrations</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{pendingSellers.length}</span>
                        <span className="stat-label">Pending Applications</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{pendingSellers.filter(s => getDaysAgo(s.applicationDate) > 7).length}</span>
                        <span className="stat-label">Over 7 Days</span>
                    </div>
                </div>
            </div>

            <div className="applications-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search applications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {indexOfFirstSeller + 1}-{Math.min(indexOfLastSeller, filteredSellers.length)} of {filteredSellers.length} applications
                        </span>
                        <select
                            value={sellersPerPage}
                            onChange={(e) => setSellersPerPage(Number(e.target.value))}
                            className="per-page-select"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                        </select>
                    </div>
                </div>

                <div className="applications-grid">
                    {currentSellers.map((seller) => (
                        <div key={seller.id} className="application-card">
                            <div className="card-header">
                                <div className="applicant-info">
                                    <h3 className="store-name">{seller.storeName}</h3>
                                    <p className="personal-name">by {seller.personalName}</p>
                                    <span className="application-id">{seller.id}</span>
                                </div>
                                <div className="application-meta">
                                    <span className="application-date">{formatDate(seller.applicationDate)}</span>
                                    <span className={`days-ago ${getDaysAgo(seller.applicationDate) > 7 ? 'urgent' : ''}`}>
                                        {getDaysAgo(seller.applicationDate)} days ago
                                    </span>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="info-section">
                                    <h4>Business Information</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="label">Type:</span>
                                            <span className="value">{seller.businessType}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Expected Products:</span>
                                            <span className="value">{seller.expectedProducts}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Store Phone:</span>
                                            <span className="value">{seller.storePhone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{seller.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>Store Address</h4>
                                    <p className="address">{seller.storeAddress}</p>
                                </div>

                                <div className="info-section">
                                    <h4>Documents Submitted</h4>
                                    <div className="documents-list">
                                        {seller.documents.map((doc, index) => (
                                            <span key={index} className="document-tag">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                {doc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button
                                    className="action-btn action-btn--view"
                                    onClick={() => handleViewApplication(seller.id)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Details
                                </button>
                                <button
                                    className="action-btn action-btn--contact"
                                    onClick={() => handleContactApplicant(seller)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact
                                </button>
                                <button
                                    className="action-btn action-btn--approve"
                                    onClick={() => handleApproveApplication(seller.id)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Approve
                                </button>
                                <button
                                    className="action-btn action-btn--reject"
                                    onClick={() => handleRejectApplication(seller.id)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredSellers.length === 0 && (
                    <div className="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3>No Pending Applications</h3>
                        <p>All applications have been processed or no new applications have been submitted.</p>
                    </div>
                )}

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

export default PendingSellers