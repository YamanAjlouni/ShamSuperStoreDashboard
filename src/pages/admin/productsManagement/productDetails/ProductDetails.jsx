import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetails.scss'

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [showCouponForm, setShowCouponForm] = useState(false)
    const [coupons, setCoupons] = useState([])
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        type: 'percentage', // percentage or fixed
        value: '',
        expiryDate: '',
        usageLimit: '',
        minOrderAmount: '',
        description: ''
    })

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                // Simulate API call
                setTimeout(() => {
                    // Mock detailed product data
                    const mockProduct = {
                        id: 'PRD001',
                        sku: 'SKU-001-2024',
                        name: 'Wireless Bluetooth Headphones',
                        shortDescription: 'High-quality wireless headphones with noise cancellation',
                        longDescription: 'Experience premium audio quality with these advanced wireless Bluetooth headphones. Featuring active noise cancellation technology, 30-hour battery life, and premium materials for all-day comfort. Perfect for music lovers, commuters, and professionals who demand the best in audio technology. The headphones come with multiple ear cup sizes and a premium carrying case.',
                        images: [
                            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
                            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop',
                            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
                            'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&h=600&fit=crop'
                        ],
                        price: 99.99,
                        salePrice: 79.99,
                        onSale: true,
                        stock: 150,
                        lowStockThreshold: 20,
                        seller: {
                            id: 'SEL001',
                            name: 'John Smith',
                            storeName: 'TechStore Pro',
                            email: 'john@techstore.com',
                            rating: 4.8,
                            totalProducts: 156
                        },
                        category: {
                            id: 'CAT001',
                            name: 'Electronics',
                            subcategory: 'Audio & Headphones'
                        },
                        status: 'active',
                        totalSales: 245,
                        revenue: 19604.55,
                        createdAt: '2024-01-15T10:30:00Z',
                        updatedAt: '2024-01-25T14:22:00Z',
                        specifications: {
                            brand: 'AudioTech',
                            model: 'AT-BT500',
                            color: 'Matte Black',
                            weight: '250g',
                            batteryLife: '30 hours',
                            connectivity: 'Bluetooth 5.0',
                            noiseCancellation: 'Active',
                            warranty: '2 years'
                        },
                        features: [
                            'Active Noise Cancellation',
                            '30-hour battery life',
                            'Premium materials',
                            'Multiple ear cup sizes',
                            'Premium carrying case',
                            'Quick charge (5 min = 2 hours)',
                            'Multi-device connectivity'
                        ],
                        reviews: {
                            totalCount: 89,
                            averageRating: 4.6,
                            distribution: {
                                5: 52,
                                4: 28,
                                3: 7,
                                2: 1,
                                1: 1
                            },
                            recent: [
                                {
                                    id: 'REV001',
                                    user: 'Alice Johnson',
                                    rating: 5,
                                    comment: 'Amazing sound quality and battery life. Worth every penny!',
                                    date: '2024-01-20T09:15:00Z',
                                    verified: true
                                },
                                {
                                    id: 'REV002',
                                    user: 'Mike Chen',
                                    rating: 4,
                                    comment: 'Great headphones, noise cancellation works perfectly.',
                                    date: '2024-01-18T16:30:00Z',
                                    verified: true
                                },
                                {
                                    id: 'REV003',
                                    user: 'Sarah Wilson',
                                    rating: 5,
                                    comment: 'Comfortable for long listening sessions. Highly recommended!',
                                    date: '2024-01-16T11:45:00Z',
                                    verified: false
                                }
                            ]
                        },
                        analytics: {
                            views: 1234,
                            wishlistAdds: 89,
                            cartAdds: 156,
                            conversionRate: 15.8
                        }
                    }
                    setProduct(mockProduct)
                    
                    // Mock coupons data
                    const mockCoupons = [
                        {
                            id: 'COUP001',
                            code: 'HEADPHONES20',
                            type: 'percentage',
                            value: 20,
                            expiryDate: '2024-12-31',
                            usageLimit: 100,
                            usedCount: 23,
                            minOrderAmount: 50,
                            description: '20% off on headphones',
                            isActive: true,
                            createdAt: '2024-01-20T10:00:00Z'
                        },
                        {
                            id: 'COUP002',
                            code: 'SAVE15',
                            type: 'fixed',
                            value: 15,
                            expiryDate: '2024-06-30',
                            usageLimit: 50,
                            usedCount: 45,
                            minOrderAmount: 75,
                            description: '$15 off on orders over $75',
                            isActive: true,
                            createdAt: '2024-01-15T14:30:00Z'
                        }
                    ]
                    setCoupons(mockCoupons)
                    setLoading(false)
                }, 1000)
            } catch (err) {
                setError('Failed to load product details')
                setLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const handleAcceptProduct = () => {
        setProduct({ ...product, status: 'active' })
        console.log(`Accepting product ${id}`)
    }

    const handleRejectProduct = () => {
        setProduct({ ...product, status: 'rejected' })
        console.log(`Rejecting product ${id}`)
    }

    const handleArchiveProduct = () => {
        setProduct({ ...product, status: 'archived' })
        console.log(`Archiving product ${id}`)
    }

    const handleUnarchiveProduct = () => {
        setProduct({ ...product, status: 'active' })
        console.log(`Unarchiving product ${id}`)
    }

    const handleDeleteProduct = () => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            console.log(`Deleting product ${id}`)
            navigate('/admin/products')
        }
    }

    const handleAddCoupon = () => {
        if (!newCoupon.code || !newCoupon.value || !newCoupon.expiryDate) {
            alert('Please fill in all required fields')
            return
        }

        const coupon = {
            id: `COUP${Date.now()}`,
            ...newCoupon,
            value: parseFloat(newCoupon.value),
            usageLimit: parseInt(newCoupon.usageLimit) || 0,
            minOrderAmount: parseFloat(newCoupon.minOrderAmount) || 0,
            usedCount: 0,
            isActive: true,
            createdAt: new Date().toISOString()
        }

        setCoupons([...coupons, coupon])
        setNewCoupon({
            code: '',
            type: 'percentage',
            value: '',
            expiryDate: '',
            usageLimit: '',
            minOrderAmount: '',
            description: ''
        })
        setShowCouponForm(false)
        console.log('Adding coupon:', coupon)
    }

    const handleToggleCoupon = (couponId) => {
        setCoupons(coupons.map(coupon =>
            coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon
        ))
    }

    const handleDeleteCoupon = (couponId) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            setCoupons(coupons.filter(coupon => coupon.id !== couponId))
        }
    }

    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'status-badge--success',
            pending: 'status-badge--warning',
            archived: 'status-badge--neutral',
            rejected: 'status-badge--danger'
        }

        return (
            <span className={`status-badge ${statusClasses[status]}`}>
                {status}
            </span>
        )
    }

    const renderStars = (rating) => {
        return (
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={star <= rating ? 'star star--filled' : 'star'}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        )
    }

    if (loading) {
        return (
            <div className="product-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="product-details">
                <div className="error-state">
                    <h2>Product Not Found</h2>
                    <p>{error || 'The requested product could not be found.'}</p>
                    <button onClick={() => navigate('/admin/products')}>
                        Back to Products
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="product-details">
            <div className="product-header">
                <button className="back-btn" onClick={() => navigate('/admin/products')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                </button>

                <div className="header-content">
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <p>{product.shortDescription}</p>
                        <div className="product-meta">
                            <span className="product-id">ID: {product.id}</span>
                            <span className="product-sku">SKU: {product.sku}</span>
                            {getStatusBadge(product.status)}
                        </div>
                    </div>

                    <div className="header-actions">
                        {product.status === 'pending' && (
                            <>
                                <button className="action-btn action-btn--accept" onClick={handleAcceptProduct}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Accept
                                </button>
                                <button className="action-btn action-btn--reject" onClick={handleRejectProduct}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reject
                                </button>
                            </>
                        )}
                        {product.status === 'active' && (
                            <button className="action-btn action-btn--archive" onClick={handleArchiveProduct}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 6 6-6" />
                                </svg>
                                Archive
                            </button>
                        )}
                        {product.status === 'archived' && (
                            <button className="action-btn action-btn--unarchive" onClick={handleUnarchiveProduct}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                Unarchive
                            </button>
                        )}
                        <button className="action-btn action-btn--delete" onClick={handleDeleteProduct}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-summary">
                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Revenue</h3>
                        <div className="primary">${product.revenue.toLocaleString()}</div>
                        <div className="secondary">{product.totalSales} units sold</div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Stock Level</h3>
                        <div className="primary">{product.stock}</div>
                        <div className="secondary">
                            {product.stock <= product.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                        </div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Rating</h3>
                        <div className="primary">{product.reviews.averageRating}/5</div>
                        <div className="secondary">{product.reviews.totalCount} reviews</div>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="card-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h3>Views</h3>
                        <div className="primary">{product.analytics.views.toLocaleString()}</div>
                        <div className="secondary">{product.analytics.conversionRate}% conversion</div>
                    </div>
                </div>
            </div>

            <div className="product-content">
                <div className="content-section">
                    <h2>Product Images</h2>
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.images[activeImageIndex]} alt={product.name} />
                        </div>
                        <div className="thumbnail-list">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${index === activeImageIndex ? 'thumbnail--active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Coupon Management</h2>
                    <div className="coupon-section">
                        <div className="coupon-header">
                            <div className="coupon-stats">
                                <span>Active Coupons: {coupons.filter(c => c.isActive).length}</span>
                                <span>Total Coupons: {coupons.length}</span>
                            </div>
                            <button 
                                className="add-coupon-btn"
                                onClick={() => setShowCouponForm(!showCouponForm)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Coupon
                            </button>
                        </div>

                        {showCouponForm && (
                            <div className="coupon-form">
                                <h3>Create New Coupon</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Coupon Code*</label>
                                        <input
                                            type="text"
                                            value={newCoupon.code}
                                            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                                            placeholder="e.g., SAVE20"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Type*</label>
                                        <select
                                            value={newCoupon.type}
                                            onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount ($)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Discount Value*</label>
                                        <input
                                            type="number"
                                            value={newCoupon.value}
                                            onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
                                            placeholder={newCoupon.type === 'percentage' ? '20' : '15'}
                                            min="0"
                                            step={newCoupon.type === 'percentage' ? '1' : '0.01'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Expiry Date*</label>
                                        <input
                                            type="date"
                                            value={newCoupon.expiryDate}
                                            onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Usage Limit</label>
                                        <input
                                            type="number"
                                            value={newCoupon.usageLimit}
                                            onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                                            placeholder="100"
                                            min="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Min Order Amount</label>
                                        <input
                                            type="number"
                                            value={newCoupon.minOrderAmount}
                                            onChange={(e) => setNewCoupon({...newCoupon, minOrderAmount: e.target.value})}
                                            placeholder="50.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        value={newCoupon.description}
                                        onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                                        placeholder="Brief description of the coupon"
                                    />
                                </div>
                                <div className="form-actions">
                                    <button className="save-btn" onClick={handleAddCoupon}>
                                        Save Coupon
                                    </button>
                                    <button 
                                        className="cancel-btn" 
                                        onClick={() => setShowCouponForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="coupons-list">
                            {coupons.length === 0 ? (
                                <div className="no-coupons">
                                    <p>No coupons created for this product yet.</p>
                                </div>
                            ) : (
                                coupons.map((coupon) => (
                                    <div key={coupon.id} className={`coupon-item ${!coupon.isActive ? 'coupon-item--inactive' : ''}`}>
                                        <div className="coupon-main">
                                            <div className="coupon-info">
                                                <div className="coupon-code">{coupon.code}</div>
                                                <div className="coupon-details">
                                                    <span className="coupon-value">
                                                        {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                                                    </span>
                                                    <span className="coupon-expiry">
                                                        Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                {coupon.description && (
                                                    <div className="coupon-description">{coupon.description}</div>
                                                )}
                                            </div>
                                            <div className="coupon-stats">
                                                <div className="stat">
                                                    <span className="stat-label">Used</span>
                                                    <span className="stat-value">{coupon.usedCount}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Limit</span>
                                                    <span className="stat-value">{coupon.usageLimit || '∞'}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Min Order</span>
                                                    <span className="stat-value">${coupon.minOrderAmount || '0'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="coupon-actions">
                                            <button
                                                className={`toggle-btn ${coupon.isActive ? 'toggle-btn--active' : 'toggle-btn--inactive'}`}
                                                onClick={() => handleToggleCoupon(coupon.id)}
                                            >
                                                {coupon.isActive ? 'Disable' : 'Enable'}
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteCoupon(coupon.id)}
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Product Information</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Basic Details</h3>
                            <div className="info-list">
                                <div className="info-item">
                                    <span className="label">Full Description</span>
                                    <span className="value">{product.longDescription}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Category</span>
                                    <span className="value">{product.category.name} → {product.category.subcategory}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Created</span>
                                    <span className="value">{new Date(product.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="info-item">
                                    <span className="label">Last Updated</span>
                                    <span className="value">{new Date(product.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Pricing & Inventory</h3>
                            <div className="pricing-breakdown">
                                <div className="pricing-item">
                                    <span>Regular Price</span>
                                    <span>${product.price}</span>
                                </div>
                                {product.onSale && (
                                    <div className="pricing-item sale">
                                        <span>Sale Price</span>
                                        <span>${product.salePrice}</span>
                                    </div>
                                )}
                                <div className="pricing-item">
                                    <span>Current Stock</span>
                                    <span>{product.stock} units</span>
                                </div>
                                <div className="pricing-item">
                                    <span>Low Stock Alert</span>
                                    <span>≤ {product.lowStockThreshold} units</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Seller Information</h2>
                    <div className="info-card">
                        <h3>Store Details</h3>
                        <div className="info-list">
                            <div className="info-item">
                                <span className="label">Store Name</span>
                                <span className="value">{product.seller.storeName}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Owner</span>
                                <span className="value">{product.seller.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Seller ID</span>
                                <span className="value">{product.seller.id}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Contact</span>
                                <span className="value">{product.seller.email}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Store Rating</span>
                                <span className="value">{product.seller.rating}/5 ⭐</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Total Products</span>
                                <span className="value">{product.seller.totalProducts}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Product Specifications</h2>
                    <div className="info-grid">
                        <div className="info-card">
                            <h3>Technical Specs</h3>
                            <div className="info-list">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="info-item">
                                        <span className="label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                                        <span className="value">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Key Features</h3>
                            <div className="features-list">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Customer Reviews</h2>
                    <div className="reviews-section">
                        <div className="reviews-summary">
                            <div className="rating-overview">
                                <div className="average-rating">
                                    <span className="rating-number">{product.reviews.averageRating}</span>
                                    {renderStars(Math.round(product.reviews.averageRating))}
                                    <span className="total-reviews">({product.reviews.totalCount} reviews)</span>
                                </div>
                                <div className="rating-distribution">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="rating-bar">
                                            <span className="stars-label">{stars} ⭐</span>
                                            <div className="bar">
                                                <div
                                                    className="bar-fill"
                                                    style={{
                                                        width: `${(product.reviews.distribution[stars] / product.reviews.totalCount) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="count">{product.reviews.distribution[stars]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="recent-reviews">
                            <h3>Recent Reviews</h3>
                            {product.reviews.recent.map((review) => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <div className="reviewer-info">
                                            <span className="reviewer-name">{review.user}</span>
                                            {review.verified && <span className="verified-badge">Verified Purchase</span>}
                                        </div>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                            <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails