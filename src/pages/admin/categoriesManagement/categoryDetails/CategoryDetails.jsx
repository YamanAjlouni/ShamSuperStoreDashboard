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
    const [showAddSubSubcategory, setShowAddSubSubcategory] = useState(false)
    const [showEditCommission, setShowEditCommission] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [editingItemType, setEditingItemType] = useState(null) // 'category', 'subcategory', 'subsubcategory'
    const [newSubcategoryName, setNewSubcategoryName] = useState('')
    const [newSubcategoryDescription, setNewSubcategoryDescription] = useState('')
    const [newSubcategoryCommissionRate, setNewSubcategoryCommissionRate] = useState('')
    const [newSubcategoryUseOverride, setNewSubcategoryUseOverride] = useState(false)
    const [newSubSubcategoryName, setNewSubSubcategoryName] = useState('')
    const [newSubSubcategoryDescription, setNewSubSubcategoryDescription] = useState('')
    const [newSubSubcategoryCommissionRate, setNewSubSubcategoryCommissionRate] = useState('')
    const [newSubSubcategoryUseOverride, setNewSubSubcategoryUseOverride] = useState(false)
    const [selectedParentSubcategory, setSelectedParentSubcategory] = useState('')
    const [expandedSubcategories, setExpandedSubcategories] = useState(new Set())
    const [editCommissionRate, setEditCommissionRate] = useState('')
    const [editUseOverride, setEditUseOverride] = useState(false)

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                // Simulate API call
                setTimeout(() => {
                    // Mock detailed category data with sub-sub categories and commission rates
                    const mockCategory = {
                        id: 'CAT001',
                        name: 'Electronics',
                        description: 'Electronic devices and accessories including smartphones, laptops, audio equipment, and gaming consoles',
                        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
                        status: 'active',
                        productsCount: 245,
                        subcategoriesCount: 4,
                        subSubcategoriesCount: 8,
                        createdAt: '2024-01-10T10:30:00Z',
                        updatedAt: '2024-01-25T14:22:00Z',
                        defaultCommissionRate: 5.0,
                        commissionRateOverride: 7.5,
                        useCommissionOverride: true,
                        subcategories: [
                            {
                                id: 'SUB001',
                                name: 'Smartphones',
                                description: 'Mobile phones and accessories including cases, chargers, and screen protectors',
                                status: 'active',
                                productsCount: 89,
                                revenue: 125000,
                                subSubcategoriesCount: 3,
                                createdAt: '2024-01-10T10:30:00Z',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 8.0,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB001',
                                        name: 'iPhone',
                                        description: 'Apple iPhone devices and accessories',
                                        status: 'active',
                                        productsCount: 45,
                                        revenue: 85000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB002',
                                        name: 'Android',
                                        description: 'Android smartphone devices',
                                        status: 'active',
                                        productsCount: 32,
                                        revenue: 28000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 6.5,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB003',
                                        name: 'Phone Cases',
                                        description: 'Protective cases for smartphones',
                                        status: 'active',
                                        productsCount: 12,
                                        revenue: 12000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            },
                            {
                                id: 'SUB002',
                                name: 'Laptops',
                                description: 'Portable computers and accessories including bags, mice, and keyboards',
                                status: 'active',
                                productsCount: 56,
                                revenue: 280000,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-10T10:30:00Z',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB004',
                                        name: 'Gaming Laptops',
                                        description: 'High-performance gaming laptops',
                                        status: 'active',
                                        productsCount: 28,
                                        revenue: 180000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 4.5,
                                        useCommissionOverride: true
                                    },
                                    {
                                        id: 'SUBSUB005',
                                        name: 'Business Laptops',
                                        description: 'Professional laptops for business use',
                                        status: 'active',
                                        productsCount: 28,
                                        revenue: 100000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
                            },
                            {
                                id: 'SUB003',
                                name: 'Audio & Headphones',
                                description: 'Headphones, speakers, and audio equipment for music and entertainment',
                                status: 'active',
                                productsCount: 67,
                                revenue: 95000,
                                subSubcategoriesCount: 2,
                                createdAt: '2024-01-10T10:30:00Z',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: 9.0,
                                useCommissionOverride: true,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB006',
                                        name: 'Wireless Headphones',
                                        description: 'Bluetooth and wireless audio devices',
                                        status: 'active',
                                        productsCount: 40,
                                        revenue: 60000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    },
                                    {
                                        id: 'SUBSUB007',
                                        name: 'Speakers',
                                        description: 'Portable and home speakers',
                                        status: 'active',
                                        productsCount: 27,
                                        revenue: 35000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: 10.0,
                                        useCommissionOverride: true
                                    }
                                ]
                            },
                            {
                                id: 'SUB004',
                                name: 'Gaming',
                                description: 'Gaming consoles, accessories, and video games',
                                status: 'inactive',
                                productsCount: 33,
                                revenue: 78000,
                                subSubcategoriesCount: 1,
                                createdAt: '2024-01-10T10:30:00Z',
                                defaultCommissionRate: 5.0,
                                commissionRateOverride: null,
                                useCommissionOverride: false,
                                subSubcategories: [
                                    {
                                        id: 'SUBSUB008',
                                        name: 'Gaming Consoles',
                                        description: 'Video game consoles and controllers',
                                        status: 'inactive',
                                        productsCount: 33,
                                        revenue: 78000,
                                        createdAt: '2024-01-10T10:30:00Z',
                                        defaultCommissionRate: 5.0,
                                        commissionRateOverride: null,
                                        useCommissionOverride: false
                                    }
                                ]
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
                        }
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

    const toggleSubcategoryExpansion = (subcategoryId) => {
        const newExpanded = new Set(expandedSubcategories)
        if (newExpanded.has(subcategoryId)) {
            newExpanded.delete(subcategoryId)
        } else {
            newExpanded.add(subcategoryId)
        }
        setExpandedSubcategories(newExpanded)
    }

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

    const handleToggleSubSubcategoryStatus = (subcategoryId, subSubcategoryId) => {
        setCategory({
            ...category,
            subcategories: category.subcategories.map(sub =>
                sub.id === subcategoryId
                    ? {
                        ...sub,
                        subSubcategories: sub.subSubcategories.map(subSub =>
                            subSub.id === subSubcategoryId
                                ? { ...subSub, status: subSub.status === 'active' ? 'inactive' : 'active' }
                                : subSub
                        )
                    }
                    : sub
            )
        })
    }

    const handleDeleteSubSubcategory = (subcategoryId, subSubcategoryId) => {
        if (window.confirm('Are you sure you want to delete this sub-subcategory?')) {
            setCategory({
                ...category,
                subcategories: category.subcategories.map(sub =>
                    sub.id === subcategoryId
                        ? {
                            ...sub,
                            subSubcategories: sub.subSubcategories.filter(subSub => subSub.id !== subSubcategoryId),
                            subSubcategoriesCount: sub.subSubcategoriesCount - 1
                        }
                        : sub
                ),
                subSubcategoriesCount: category.subSubcategoriesCount - 1
            })
        }
    }

    const handleEditCommission = (item, type, subcategoryId = null) => {
        setEditingItem(item)
        setEditingItemType(type)
        setEditCommissionRate(item.commissionRateOverride || '')
        setEditUseOverride(item.useCommissionOverride)
        setSelectedParentSubcategory(subcategoryId)
        setShowEditCommission(true)
    }

    const handleSaveCommission = () => {
        const updatedRate = editUseOverride ? parseFloat(editCommissionRate) || null : null

        if (editingItemType === 'category') {
            setCategory({
                ...category,
                commissionRateOverride: updatedRate,
                useCommissionOverride: editUseOverride
            })
        } else if (editingItemType === 'subcategory') {
            setCategory({
                ...category,
                subcategories: category.subcategories.map(sub =>
                    sub.id === editingItem.id
                        ? {
                            ...sub,
                            commissionRateOverride: updatedRate,
                            useCommissionOverride: editUseOverride
                        }
                        : sub
                )
            })
        } else if (editingItemType === 'subsubcategory') {
            setCategory({
                ...category,
                subcategories: category.subcategories.map(sub =>
                    sub.id === selectedParentSubcategory
                        ? {
                            ...sub,
                            subSubcategories: sub.subSubcategories.map(subSub =>
                                subSub.id === editingItem.id
                                    ? {
                                        ...subSub,
                                        commissionRateOverride: updatedRate,
                                        useCommissionOverride: editUseOverride
                                    }
                                    : subSub
                            )
                        }
                        : sub
                )
            })
        }

        setShowEditCommission(false)
        setEditingItem(null)
        setEditingItemType(null)
        setEditCommissionRate('')
        setEditUseOverride(false)
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
                subSubcategoriesCount: 0,
                subSubcategories: [],
                createdAt: new Date().toISOString(),
                defaultCommissionRate: 5.0,
                commissionRateOverride: newSubcategoryUseOverride ? parseFloat(newSubcategoryCommissionRate) || null : null,
                useCommissionOverride: newSubcategoryUseOverride
            }

            setCategory({
                ...category,
                subcategories: [...category.subcategories, newSubcategory],
                subcategoriesCount: category.subcategoriesCount + 1
            })

            setNewSubcategoryName('')
            setNewSubcategoryDescription('')
            setNewSubcategoryCommissionRate('')
            setNewSubcategoryUseOverride(false)
            setShowAddSubcategory(false)
        }
    }

    const handleAddSubSubcategory = () => {
        if (newSubSubcategoryName.trim() && selectedParentSubcategory) {
            const newSubSubcategory = {
                id: `SUBSUB${String(Date.now()).slice(-3)}`,
                name: newSubSubcategoryName,
                description: newSubSubcategoryDescription,
                status: 'active',
                productsCount: 0,
                revenue: 0,
                createdAt: new Date().toISOString(),
                defaultCommissionRate: 5.0,
                commissionRateOverride: newSubSubcategoryUseOverride ? parseFloat(newSubSubcategoryCommissionRate) || null : null,
                useCommissionOverride: newSubSubcategoryUseOverride
            }

            setCategory({
                ...category,
                subcategories: category.subcategories.map(sub =>
                    sub.id === selectedParentSubcategory
                        ? {
                            ...sub,
                            subSubcategories: [...(sub.subSubcategories || []), newSubSubcategory],
                            subSubcategoriesCount: (sub.subSubcategoriesCount || 0) + 1
                        }
                        : sub
                ),
                subSubcategoriesCount: category.subSubcategoriesCount + 1
            })

            setNewSubSubcategoryName('')
            setNewSubSubcategoryDescription('')
            setNewSubSubcategoryCommissionRate('')
            setNewSubSubcategoryUseOverride(false)
            setSelectedParentSubcategory('')
            setShowAddSubSubcategory(false)
        }
    }

    const getAvailableSubcategories = () => {
        return category ? category.subcategories.filter(sub => sub.status === 'active') : []
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

    const getCommissionRate = (item) => {
        return item.useCommissionOverride && item.commissionRateOverride !== null
            ? item.commissionRateOverride
            : item.defaultCommissionRate
    }

    const getCommissionBadge = (item) => {
        const rate = getCommissionRate(item)
        const isOverride = item.useCommissionOverride && item.commissionRateOverride !== null

        return (
            <span className={`commission-badge ${isOverride ? 'commission-badge--override' : 'commission-badge--default'}`}>
                {rate}% {isOverride && '(Override)'}
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
                            {getCommissionBadge(category)}
                        </div>
                    </div>

                    <div className="header-actions">
                        <button
                            className="action-btn action-btn--commission"
                            onClick={() => handleEditCommission(category, 'category')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Edit Commission
                        </button>
                        <button
                            className="action-btn action-btn--add"
                            onClick={() => setShowAddSubSubcategory(true)}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Sub-subcategory
                        </button>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{category.subSubcategoriesCount}</div>
                        <div className="stat-label">Sub-subcategories</div>
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

                <div className="stat-card commission-stat-card">
                    <div className="stat-icon commission-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{getCommissionRate(category)}%</div>
                        <div className="stat-label">Commission Rate</div>
                        <div className="commission-status">
                            {category.useCommissionOverride && category.commissionRateOverride !== null
                                ? 'Override Applied'
                                : 'Default Rate'}
                        </div>
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
                                            <span className="label">Commission Rate</span>
                                            <span className="value">{getCommissionBadge(category)}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Created</span>
                                            <span className="value">{new Date(category.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <h3>Top Selling Products</h3>
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
                                    <div className="header-actions">
                                        <button
                                            className="add-btn"
                                            onClick={() => setShowAddSubSubcategory(true)}
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add Sub-subcategory
                                        </button>
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
                                </div>

                                <div className="subcategories-list">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id} className="subcategory-card">
                                            <div className="subcategory-header">
                                                <div className="subcategory-info">
                                                    <h4>{subcategory.name}</h4>
                                                    <p>{subcategory.description}</p>
                                                    <div className="subcategory-meta">
                                                        <span className="subcategory-id">ID: {subcategory.id}</span>
                                                        {getCommissionBadge(subcategory)}
                                                    </div>
                                                </div>
                                                <div className="subcategory-controls">
                                                    {getStatusBadge(subcategory.status)}
                                                    <button
                                                        className="expand-btn"
                                                        onClick={() => toggleSubcategoryExpansion(subcategory.id)}
                                                        title={expandedSubcategories.has(subcategory.id) ? 'Collapse' : 'Expand'}
                                                    >
                                                        <svg
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            className={expandedSubcategories.has(subcategory.id) ? 'rotated' : ''}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="subcategory-stats">
                                                <div className="stat">
                                                    <span className="stat-value">{subcategory.productsCount}</span>
                                                    <span className="stat-label">Products</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-value">{subcategory.subSubcategoriesCount}</span>
                                                    <span className="stat-label">Sub-subs</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-value">${subcategory.revenue.toLocaleString()}</span>
                                                    <span className="stat-label">Revenue</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-value">{getCommissionRate(subcategory)}%</span>
                                                    <span className="stat-label">Commission</span>
                                                </div>
                                            </div>

                                            <div className="subcategory-actions">
                                                <button
                                                    className="action-btn action-btn--commission"
                                                    onClick={() => handleEditCommission(subcategory, 'subcategory')}
                                                    title="Edit Commission"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                </button>
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

                                            {/* Sub-subcategories section */}
                                            {expandedSubcategories.has(subcategory.id) && subcategory.subSubcategories && (
                                                <div className="sub-subcategories-section">
                                                    <div className="sub-subcategories-header">
                                                        <h5>Sub-subcategories ({subcategory.subSubcategoriesCount})</h5>
                                                        <button
                                                            className="add-sub-subcategory-btn"
                                                            onClick={() => {
                                                                setSelectedParentSubcategory(subcategory.id)
                                                                setShowAddSubSubcategory(true)
                                                            }}
                                                        >
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                            Add
                                                        </button>
                                                    </div>
                                                    <div className="sub-subcategories-grid">
                                                        {subcategory.subSubcategories.map((subSubcategory) => (
                                                            <div key={subSubcategory.id} className="sub-subcategory-card">
                                                                <div className="sub-subcategory-header">
                                                                    <div className="sub-subcategory-info">
                                                                        <h6>{subSubcategory.name}</h6>
                                                                        <p>{subSubcategory.description}</p>
                                                                        <div className="sub-subcategory-meta">
                                                                            <span className="sub-subcategory-id">ID: {subSubcategory.id}</span>
                                                                            {getCommissionBadge(subSubcategory)}
                                                                        </div>
                                                                    </div>
                                                                    {getStatusBadge(subSubcategory.status)}
                                                                </div>

                                                                <div className="sub-subcategory-stats">
                                                                    <div className="stat">
                                                                        <span className="stat-value">{subSubcategory.productsCount}</span>
                                                                        <span className="stat-label">Products</span>
                                                                    </div>
                                                                    <div className="stat">
                                                                        <span className="stat-value">${subSubcategory.revenue.toLocaleString()}</span>
                                                                        <span className="stat-label">Revenue</span>
                                                                    </div>
                                                                    <div className="stat">
                                                                        <span className="stat-value">{getCommissionRate(subSubcategory)}%</span>
                                                                        <span className="stat-label">Commission</span>
                                                                    </div>
                                                                </div>

                                                                <div className="sub-subcategory-actions">
                                                                    <button
                                                                        className="action-btn action-btn--commission"
                                                                        onClick={() => handleEditCommission(subSubcategory, 'subsubcategory', subcategory.id)}
                                                                        title="Edit Commission"
                                                                    >
                                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                                        </svg>
                                                                    </button>
                                                                    <button
                                                                        className={`action-btn ${subSubcategory.status === 'active' ? 'action-btn--deactivate' : 'action-btn--activate'}`}
                                                                        onClick={() => handleToggleSubSubcategoryStatus(subcategory.id, subSubcategory.id)}
                                                                        title={subSubcategory.status === 'active' ? 'Deactivate' : 'Activate'}
                                                                    >
                                                                        {subSubcategory.status === 'active' ? (
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
                                                                        onClick={() => handleDeleteSubSubcategory(subcategory.id, subSubcategory.id)}
                                                                        title="Delete Sub-subcategory"
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
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Commission Modal */}
            {showEditCommission && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Edit Commission Rate - {editingItem?.name}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowEditCommission(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="editCommissionOverride"
                                            checked={editUseOverride}
                                            onChange={(e) => setEditUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="editCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {editUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={editCommissionRate}
                                            onChange={(e) => setEditCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!editUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
                            </div>
                            <div className="commission-preview">
                                <div className="preview-label">Preview:</div>
                                <div className="preview-badge">
                                    {editUseOverride
                                        ? `${editCommissionRate || 0}% (Override)`
                                        : '5.0% (Default)'
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowEditCommission(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleSaveCommission}
                            >
                                Save Commission
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="newSubcategoryCommissionOverride"
                                            checked={newSubcategoryUseOverride}
                                            onChange={(e) => setNewSubcategoryUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="newSubcategoryCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {newSubcategoryUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={newSubcategoryCommissionRate}
                                            onChange={(e) => setNewSubcategoryCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!newSubcategoryUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
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

            {/* Add Sub-subcategory Modal */}
            {showAddSubSubcategory && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Add Sub-subcategory</h2>
                            <button
                                className="close-btn"
                                onClick={() => setShowAddSubSubcategory(false)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Parent Subcategory</label>
                                <select
                                    value={selectedParentSubcategory}
                                    onChange={(e) => setSelectedParentSubcategory(e.target.value)}
                                >
                                    <option value="">Select a subcategory</option>
                                    {getAvailableSubcategories().map(subcategory => (
                                        <option key={subcategory.id} value={subcategory.id}>
                                            {subcategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Sub-subcategory Name</label>
                                <input
                                    type="text"
                                    value={newSubSubcategoryName}
                                    onChange={(e) => setNewSubSubcategoryName(e.target.value)}
                                    placeholder="Enter sub-subcategory name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newSubSubcategoryDescription}
                                    onChange={(e) => setNewSubSubcategoryDescription(e.target.value)}
                                    placeholder="Enter sub-subcategory description"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group commission-group">
                                <div className="commission-header">
                                    <label>Commission Rate</label>
                                    <div className="commission-toggle">
                                        <input
                                            type="checkbox"
                                            id="newSubSubcategoryCommissionOverride"
                                            checked={newSubSubcategoryUseOverride}
                                            onChange={(e) => setNewSubSubcategoryUseOverride(e.target.checked)}
                                        />
                                        <label htmlFor="newSubSubcategoryCommissionOverride">Override default rate (5.0%)</label>
                                    </div>
                                </div>
                                {newSubSubcategoryUseOverride && (
                                    <div className="commission-input">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={newSubSubcategoryCommissionRate}
                                            onChange={(e) => setNewSubSubcategoryCommissionRate(e.target.value)}
                                            placeholder="Enter commission rate (%)"
                                        />
                                        <span className="commission-unit">%</span>
                                    </div>
                                )}
                                {!newSubSubcategoryUseOverride && (
                                    <div className="commission-default">
                                        <span>Using default commission rate: 5.0%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setShowAddSubSubcategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleAddSubSubcategory}
                            >
                                Add Sub-subcategory
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryDetails