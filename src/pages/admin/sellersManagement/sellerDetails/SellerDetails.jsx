import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SellerDetails.scss'

const SellerDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [seller, setSeller] = useState(null)
    const [products, setProducts] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)

    // Mock seller data
    const mockSellerData = {
        id: id,
        personalName: 'John Smith',
        email: 'john.smith@email.com',
        personalPhone: '+1 (555) 987-6543',
        personalAddress: '456 Oak Ave, Brooklyn, NY 11201',
        storeName: 'Tech Paradise',
        storePhone: '+1 (555) 123-4567',
        storeAddress: '123 Main St, New York, NY 10001',
        status: 'active',
        joinDate: '2024-01-15',
        productLimit: 100,
        productsAdded: 45,
        businessType: 'Electronics',
        businessLicense: 'BL123456789',
        taxId: 'TX987654321',
        bankAccount: '**** **** **** 1234',
        totalOrders: 234,
        totalRevenue: 15670.50,
        rating: 4.5,
        reviewCount: 127
    }

    const mockProducts = [
        {
            id: 'PRD001',
            sku: 'TP-LAP-001',
            name: 'Gaming Laptop Pro',
            shortDescription: 'High-performance gaming laptop',
            longDescription: 'Powerful gaming laptop with RTX 4060, 16GB RAM, and 1TB SSD for ultimate gaming experience.',
            price: 1299.99,
            salePrice: 1199.99,
            isOnSale: true,
            status: 'published',
            stock: 15,
            inStock: true,
            images: ['laptop1.jpg', 'laptop2.jpg'],
            category: 'Electronics',
            createdDate: '2024-02-10'
        },
        {
            id: 'PRD002',
            sku: 'TP-MOU-002',
            name: 'Wireless Gaming Mouse',
            shortDescription: 'Precision wireless gaming mouse',
            longDescription: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons.',
            price: 79.99,
            salePrice: null,
            isOnSale: false,
            status: 'pending',
            stock: 45,
            inStock: true,
            images: ['mouse1.jpg'],
            category: 'Accessories',
            createdDate: '2024-03-01'
        },
        {
            id: 'PRD003',
            sku: 'TP-KEY-003',
            name: 'Mechanical Keyboard',
            shortDescription: 'RGB mechanical keyboard',
            longDescription: 'Premium mechanical keyboard with Cherry MX switches and customizable RGB backlighting.',
            price: 149.99,
            salePrice: null,
            isOnSale: false,
            status: 'archived',
            stock: 0,
            inStock: false,
            images: ['keyboard1.jpg', 'keyboard2.jpg', 'keyboard3.jpg'],
            category: 'Accessories',
            createdDate: '2024-01-20'
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setSeller(mockSellerData)
            setProducts(mockProducts)
            setLoading(false)
        }, 1000)
    }, [id])

    const handleContactSeller = () => {
        window.location.href = `mailto:${seller.email}?subject=Regarding your store: ${seller.storeName}`
    }

    const handleSuspendSeller = () => {
        if (window.confirm('Are you sure you want to suspend this seller?')) {
            setSeller({ ...seller, status: 'suspended' })
        }
    }

    const handleActivateSeller = () => {
        if (window.confirm('Are you sure you want to activate this seller?')) {
            setSeller({ ...seller, status: 'active' })
        }
    }

    const handleDeleteSeller = () => {
        if (window.confirm('Are you sure you want to permanently delete this seller and all their products? This action cannot be undone.')) {
            navigate('/admin/sellers')
        }
    }

    const handleProductAction = (productId, action) => {
        setProducts(products.map(product => {
            if (product.id === productId) {
                switch (action) {
                    case 'approve':
                        return { ...product, status: 'published' }
                    case 'reject':
                        return { ...product, status: 'rejected' }
                    case 'archive':
                        return { ...product, status: 'archived' }
                    default:
                        return product
                }
            }
            return product
        }))
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'success', label: 'Active' },
            suspended: { class: 'warning', label: 'Suspended' },
            pending: { class: 'info', label: 'Pending' },
            inactive: { class: 'danger', label: 'Inactive' }
        }
        const config = statusConfig[status] || statusConfig.inactive
        return <span className={`status-badge status-badge--${config.class}`}>{config.label}</span>
    }

    const getProductStatusBadge = (status) => {
        const statusConfig = {
            published: { class: 'success', label: 'Published' },
            pending: { class: 'warning', label: 'Pending' },
            rejected: { class: 'danger', label: 'Rejected' },
            archived: { class: 'neutral', label: 'Archived' }
        }
        const config = statusConfig[status] || statusConfig.pending
        return <span className={`product-status product-status--${config.class}`}>{config.label}</span>
    }

    if (loading) {
        return (
            <div className="seller-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading seller details...</p>
                </div>
            </div>
        )
    }

    if (!seller) {
        return (
            <div className="seller-details">
                <div className="error-state">
                    <h2>Seller Not Found</h2>
                    <p>The seller you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/admin/sellers')}>Back to Sellers</button>
                </div>
            </div>
        )
    }

    return (
        <div className="seller-details">
            {/* Header */}
            <div className="seller-header">
                <button className="back-btn" onClick={() => navigate('/admin/sellers')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Sellers
                </button>
                <div className="header-content">
                    <div className="seller-info">
                        <h1>{seller.storeName}</h1>
                        <p>Managed by {seller.personalName}</p>
                        <div className="seller-meta">
                            <span className="seller-id">ID: {seller.id}</span>
                            {getStatusBadge(seller.status)}
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="action-btn action-btn--contact" onClick={handleContactSeller}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact
                        </button>
                        {seller.status === 'active' ? (
                            <button className="action-btn action-btn--suspend" onClick={handleSuspendSeller}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                </svg>
                                Suspend
                            </button>
                        ) : (
                            <button className="action-btn action-btn--activate" onClick={handleActivateSeller}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Activate
                            </button>
                        )}
                        <button className="action-btn action-btn--delete" onClick={handleDeleteSeller}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="seller-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{seller.productsAdded}/{seller.productLimit}</span>
                        <span className="stat-label">Products</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{seller.totalOrders}</span>
                        <span className="stat-label">Total Orders</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">${seller.totalRevenue.toLocaleString()}</span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <span className="stat-value">{seller.rating}/5</span>
                        <span className="stat-label">{seller.reviewCount} Reviews</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Products ({products.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'business' ? 'active' : ''}`}
                        onClick={() => setActiveTab('business')}
                    >
                        Business Info
                    </button>
                </div>

                <div className="tabs-content">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="overview-grid">
                                <div className="info-card">
                                    <h3>Personal Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Name:</span>
                                            <span className="value">{seller.personalName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Email:</span>
                                            <span className="value">{seller.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Phone:</span>
                                            <span className="value">{seller.personalPhone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Address:</span>
                                            <span className="value">{seller.personalAddress}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Store Information</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Store Name:</span>
                                            <span className="value">{seller.storeName}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Phone:</span>
                                            <span className="value">{seller.storePhone}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Address:</span>
                                            <span className="value">{seller.storeAddress}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Join Date:</span>
                                            <span className="value">{new Date(seller.joinDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="tab-content">
                            <div className="products-section">
                                <div className="products-header">
                                    <h3>All Products</h3>
                                    <div className="products-summary">
                                        <span>Published: {products.filter(p => p.status === 'published').length}</span>
                                        <span>Pending: {products.filter(p => p.status === 'pending').length}</span>
                                        <span>Archived: {products.filter(p => p.status === 'archived').length}</span>
                                    </div>
                                </div>

                                <div className="products-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>SKU</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td className="sku">{product.sku}</td>
                                                    <td className="product-name">
                                                        <div className="product-info">
                                                            <span className="name">{product.name}</span>
                                                            <span className="description">{product.shortDescription}</span>
                                                        </div>
                                                    </td>
                                                    <td className="price">
                                                        <div className="price-info">
                                                            {product.isOnSale ? (
                                                                <>
                                                                    <span className="sale-price">${product.salePrice}</span>
                                                                    <span className="original-price">${product.price}</span>
                                                                </>
                                                            ) : (
                                                                <span className="regular-price">${product.price}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="stock">
                                                        <span className={`stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>
                                                    <td className="status">
                                                        {getProductStatusBadge(product.status)}
                                                    </td>
                                                    <td className="created">{new Date(product.createdDate).toLocaleDateString()}</td>
                                                    <td className="actions">
                                                        <div className="product-actions">
                                                            {product.status === 'pending' && (
                                                                <>
                                                                    <button
                                                                        className="product-action-btn approve"
                                                                        onClick={() => handleProductAction(product.id, 'approve')}
                                                                        title="Approve Product"
                                                                    >
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </button>
                                                                    <button
                                                                        className="product-action-btn reject"
                                                                        onClick={() => handleProductAction(product.id, 'reject')}
                                                                        title="Reject Product"
                                                                    >
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                        </svg>
                                                                    </button>
                                                                </>
                                                            )}
                                                            {product.status === 'published' && (
                                                                <button
                                                                    className="product-action-btn archive"
                                                                    onClick={() => handleProductAction(product.id, 'archive')}
                                                                    title="Archive Product"
                                                                >
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l7-7 7 7M5 16l7 7 7-7" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Business Info Tab */}
                    {activeTab === 'business' && (
                        <div className="tab-content">
                            <div className="business-grid">
                                <div className="info-card">
                                    <h3>Business Details</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Business Type:</span>
                                            <span className="value">{seller.businessType}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Business License:</span>
                                            <span className="value">{seller.businessLicense}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Tax ID:</span>
                                            <span className="value">{seller.taxId}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Bank Account:</span>
                                            <span className="value">{seller.bankAccount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Account Limits</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Product Limit:</span>
                                            <span className="value">{seller.productLimit} products</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Products Added:</span>
                                            <span className="value">{seller.productsAdded} products</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Remaining Slots:</span>
                                            <span className="value">{seller.productLimit - seller.productsAdded} products</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Account Status:</span>
                                            <span className="value">{getStatusBadge(seller.status)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SellerDetails