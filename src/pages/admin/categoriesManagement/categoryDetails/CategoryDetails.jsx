import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CategoryDetails.scss'

const CategoryDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState('overview')
    const [showAddSubcategory, setShowAddSubcategory] = useState(false)
    const [newSubcategoryName, setNewSubcategoryName] = useState('')
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('')

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                // Simulate API call
                setTimeout(() => {
                    // Mock detailed category data
                    const mockCategory = {
                        id: 'CAT001',
                        name: 'Electronics',
                        description: 'Electronic devices and accessories including smartphones, laptops, audio equipment, and gaming consoles',
                        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
                        status: 'active',
                        productsCount: 245,
                        subcategoriesCount: 4,
                        createdAt: '2024-01-10T10:30:00Z',
                        updatedAt: '2024-01-25T14:22:00Z',
                        subcategories: [
                            {
                                id: 'SUB001',
                                name: 'Smartphones',
                                description: 'Mobile phones and accessories including cases, chargers, and screen protectors',
                                status: 'active',
                                productsCount: 89,
                                revenue: 125000,
                                createdAt: '2024-01-10T10:30:00Z'
                            },
                            {
                                id: 'SUB002',
                                name: 'Laptops',
                                description: 'Portable computers and accessories including bags, mice, and keyboards',
                                status: 'active',
                                productsCount: 56,
                                revenue: 280000,
                                createdAt: '2024-01-10T10:30:00Z'
                            },
                            {
                                id: 'SUB003',
                                name: 'Audio & Headphones',
                                description: 'Headphones, speakers, and audio equipment for music and entertainment',
                                status: 'active',
                                productsCount: 67,
                                revenue: 95000,
                                createdAt: '2024-01-10T10:30:00Z'
                            },
                            {
                                id: 'SUB004',
                                name: 'Gaming',
                                description: 'Gaming consoles, accessories, and video games',
                                status: 'inactive',
                                productsCount: 33,
                                revenue: 78000,
                                createdAt: '2024-01-10T10:30:00Z'
                            }
                        ],
                        analytics: {
                            totalRevenue: 578000,
                            topSellingProducts: [
                                { id: 'PRD001', name: 'iPhone 15 Pro', sales: 156, revenue: 156000 },
                                { id: 'PRD002', name: 'MacBook Pro M3', sales: 89, revenue: 178000 },
                                { id: 'PRD003', name: 'AirPods Pro', sales: 234, revenue: 58500 }
                            ],
                            monthlyGrowth: 12.5,
                            averageOrderValue: 245.67
                        },
                        recentProducts: [
                            {
                                id: 'PRD005',
                                name: 'Wireless Bluetooth Headphones',
                                sku: 'SKU-001-2024',
                                price: 99.99,
                                subcategory: 'Audio & Headphones',
                                status: 'active',
                                createdAt: '2024-01-25'
                            },
                            {
                                id: 'PRD006',
                                name: 'Gaming Mechanical Keyboard',
                                sku: 'SKU-002-2024',
                                price: 129.99,
                                subcategory: 'Gaming',
                                status: 'pending',
                                createdAt: '2024-01-24'
                            },
                            {
                                id: 'PRD007',
                                name: 'Smartphone Case',
                                sku: 'SKU-003-2024',
                                price: 19.99,
                                subcategory: 'Smartphones',
                                status: 'active',
                                createdAt: '2024-01-23'
                            }
                        ]
                    }
                    setCategory(mockCategory)
                    setLoading(false)
                }, 1000)
            } catch (err) {
                setError('Failed to load category details')
                setLoading(false)
            }
        }

        fetchCategory()
    }, [id])

    const handleToggleStatus = () => {
        setCategory({
            ...category,
            status: category.status === 'active' ? 'inactive' : 'active'
        })
    }

    const handleDeleteCategory = () => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            console.log(`Deleting category ${id}`)
            navigate('/admin/categories')
        }
    }

    const handleToggleSubcategoryStatus = (subcategoryId) => {
        setCategory({
            ...category,
            subcategories: category.subcategories.map(sub =>
                sub.id === subcategoryId
                    ? { ...sub, status: sub.status === 'active' ? 'inactive' : 'active' }
                    : sub
            )
        })
    }

    const handleDeleteSubcategory = (subcategoryId) => {
        if (window.confirm('Are you sure you want to delete this subcategory?')) {
            setCategory({
                ...category,
                subcategories: category.subcategories.filter(sub => sub.id !== subcategoryId),
                subcategoriesCount: category.subcategoriesCount - 1
            })
        }
    }

    const handleAddSubcategory = () => {
        if (newSubcategoryName.trim()) {
            const newSubcategory = {
                id: `SUB${String(Date.now()).slice(-3)}`,
                name: newSubcategoryName,
                description: newSubcategoryDescription,
                status: 'active',
                productsCount: 0,
                revenue: 0,
                createdAt: new Date().toISOString()
            }

            setCategory({
                ...category,
                subcategories: [...category.subcategories, newSubcategory],
                subcategoriesCount: category.subcategoriesCount + 1
            })

            setNewSubcategoryName('')
            setNewSubcategoryDescription('')
            setShowAddSubcategory(false)
        }
    }

    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'status-badge--success',
            inactive: 'status-badge--neutral',
            pending: 'status-badge--warning'
        }

        return (
            <span className={`status-badge ${statusClasses[status]}`}>
                {status}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="category-details">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading category details...</p>
                </div>
            </div>
        )
    }

    if (error || !category) {
        return (
            <div className="category-details">
                <div className="error-state">
                    <h2>Category Not Found</h2>
                    <p>{error || 'The requested category could not be found.'}</p>
                    <button onClick={() => navigate('/admin/categories')}>
                        Back to Categories
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="category-details">
            <div className="category-header">
                <button className="back-btn" onClick={() => navigate('/admin/categories')}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Categories
                </button>

                <div className="header-content">
                    <div className="category-info">
                        <h1>{category.name}</h1>
                        <p>{category.description}</p>
                        <div className="category-meta">
                            <span className="category-id">ID: {category.id}</span>
                            {getStatusBadge(category.status)}
                        </div>
                    </div>

                    <div className="header-actions">
                        <button
                            className="action-btn action-btn--add"
                            onClick={() => setShowAddSubcategory(true)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Subcategory
                        </button>
                        <button
                            className={`action-btn ${category.status === 'active' ? 'action-btn--deactivate' : 'action-btn--activate'}`}
                            onClick={handleToggleStatus}
                        >
                            {category.status === 'active' ? (
                                <>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                    </svg>
                                    Deactivate
                                </>
                            ) : (
                                <>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Activate
                                </>
                            )}
                        </button>
                        <button className="action-btn action-btn--delete" onClick={handleDeleteCategory}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="category-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{category.productsCount}</div>
                        <div className="stat-label">Total Products</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{category.subcategoriesCount}</div>
                        <div className="stat-label">Subcategories</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">${category.analytics.totalRevenue.toLocaleString()}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">+{category.analytics.monthlyGrowth}%</div>
                        <div className="stat-label">Monthly Growth</div>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'subcategories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('subcategories')}
                    >
                        Subcategories
                    </button>
                    {/* <button
                        className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('products')}
                    >
                        Recent Products
                    </button> */}
                </div>

                <div className="tabs-content">
                    {activeTab === 'overview' && (
                        <div className="tab-content">
                            <div className="overview-grid">
                                <div className="info-card">
                                    <h3>Category Information</h3>
                                    <div className="category-image-section">
                                        <img src={category.image} alt={category.name} />
                                    </div>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Name</span>
                                            <span className="value">{category.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Description</span>
                                            <span className="value">{category.description}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Status</span>
                                            <span className="value">{getStatusBadge(category.status)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Created</span>
                                            <span className="value">{new Date(category.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        {/* <div className="info-item">
                                            <span className="label">Last Updated</span>
                                            <span className="value">{new Date(category.updatedAt).toLocaleDateString()}</span>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="info-card">
                                    {/* <h3>Performance Analytics</h3>
                                    <div className="analytics-list">
                                        <div className="analytics-item">
                                            <span className="label">Average Order Value</span>
                                            <span className="value">${category.analytics.averageOrderValue}</span>
                                        </div>
                                        <div className="analytics-item">
                                            <span className="label">Monthly Growth</span>
                                            <span className="value growth-positive">+{category.analytics.monthlyGrowth}%</span>
                                        </div>
                                        <div className="analytics-item">
                                            <span className="label">Total Revenue</span>
                                            <span className="value">${category.analytics.totalRevenue.toLocaleString()}</span>
                                        </div>
                                    </div> */}

                                    <h4>Top Selling Products</h4>
                                    <div className="top-products">
                                        {category.analytics.topSellingProducts.map((product, index) => (
                                            <div key={product.id} className="product-item">
                                                <div className="product-rank">#{index + 1}</div>
                                                <div className="product-info">
                                                    <div className="product-name">{product.name}</div>
                                                    <div className="product-stats">
                                                        {product.sales} sales • ${product.revenue.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'subcategories' && (
                        <div className="tab-content">
                            <div className="subcategories-section">
                                <div className="subcategories-header">
                                    <h3>Subcategories ({category.subcategoriesCount})</h3>
                                    <button
                                        className="add-subcategory-btn"
                                        onClick={() => setShowAddSubcategory(true)}
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Subcategory
                                    </button>
                                </div>

                                <div className="subcategories-grid">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id} className="subcategory-card">
                                            <div className="subcategory-header">
                                                <div className="subcategory-info">
                                                    <h4>{subcategory.name}</h4>
                                                    <p>{subcategory.description}</p>
                                                    <span className="subcategory-id">ID: {subcategory.id}</span>
                                                </div>
                                                {getStatusBadge(subcategory.status)}
                                            </div>

                                            <div className="subcategory-stats">
                                                <div className="stat">
                                                    <span className="stat-value">{subcategory.productsCount}</span>
                                                    <span className="stat-label">Products</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-value">${subcategory.revenue.toLocaleString()}</span>
                                                    <span className="stat-label">Revenue</span>
                                                </div>
                                            </div>

                                            <div className="subcategory-actions">
                                                <button
                                                    className={`action-btn ${subcategory.status === 'active' ? 'action-btn--deactivate' : 'action-btn--activate'}`}
                                                    onClick={() => handleToggleSubcategoryStatus(subcategory.id)}
                                                    title={subcategory.status === 'active' ? 'Deactivate' : 'Activate'}
                                                >
                                                    {subcategory.status === 'active' ? (
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                                        </svg>
                                                    ) : (
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <button
                                                    className="action-btn action-btn--delete"
                                                    onClick={() => handleDeleteSubcategory(subcategory.id)}
                                                    title="Delete Subcategory"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* {activeTab === 'products' && (
                        <div className="tab-content">
                            <div className="products-section">
                                <h3>Recent Products</h3>
                                <div className="products-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>SKU</th>
                                                <th>Subcategory</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category.recentProducts.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="product-name">{product.name}</td>
                                                    <td className="product-sku">{product.sku}</td>
                                                    <td className="product-subcategory">{product.subcategory}</td>
                                                    <td className="product-price">${product.price}</td>
                                                    <td className="product-status">{getStatusBadge(product.status)}</td>
                                                    <td className="product-date">{new Date(product.createdAt).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>

            {/* Add Subcategory Modal */}
            {showAddSubcategory && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add Subcategory to {category.name}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddSubcategory(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Subcategory Name</label>
                                <input
                                    type="text"
                                    value={newSubcategoryName}
                                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                                    placeholder="Enter subcategory name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newSubcategoryDescription}
                                    onChange={(e) => setNewSubcategoryDescription(e.target.value)}
                                    placeholder="Enter subcategory description"
                                    rows={3}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddSubcategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddSubcategory}
                            >
                                Add Subcategory
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryDetails