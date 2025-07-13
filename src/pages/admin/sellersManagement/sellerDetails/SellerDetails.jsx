import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './SellerDetails.scss'

const SellerDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [seller, setSeller] = useState(null)
    const [products, setProducts] = useState([])
    const [reviews, setReviews] = useState([])
    const [communications, setCommunications] = useState([])
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)
    const [editingLimit, setEditingLimit] = useState(false)
    const [tempLimit, setTempLimit] = useState('')
    const [customLimit, setCustomLimit] = useState('')
    const [editingMembership, setEditingMembership] = useState(false)
    const [tempMembership, setTempMembership] = useState('')
    const [editingFeatured, setEditingFeatured] = useState(false)
    const [tempFeatured, setTempFeatured] = useState({
        isFeatured: false,
        logoUrl: '',
        websiteUrl: '',
        displayName: '',
        description: ''
    })

    // Preset limit options
    const presetLimits = [50, 100, 200, 500, 1000]

    // Membership plans
    const membershipPlans = [
        { value: 'free', label: 'Free Plan', productLimit: 50, price: '$0/month', features: ['Basic storefront', 'Up to 50 products', 'Standard support'] },
        { value: 'basic', label: 'Basic Plan', productLimit: 100, price: '$29/month', features: ['Enhanced storefront', 'Up to 100 products', 'Priority support', 'Analytics'] },
        { value: 'premium', label: 'Premium Plan', productLimit: 500, price: '$79/month', features: ['Advanced storefront', 'Up to 500 products', '24/7 support', 'Advanced analytics', 'Marketing tools'] },
        { value: 'enterprise', label: 'Enterprise Plan', productLimit: 1000, price: '$199/month', features: ['Custom storefront', 'Unlimited products', 'Dedicated support', 'Full analytics suite', 'API access'] }
    ]

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
        productLimit: 50,
        productsAdded: 45,
        businessType: 'Electronics',
        businessLicense: 'BL123456789',
        taxId: 'TX987654321',
        bankAccount: '**** **** **** 1234',
        totalOrders: 234,
        totalRevenue: 15670.50,
        rating: 4.5,
        reviewCount: 127,
        membership: 'free',
        featured: {
            isFeatured: true,
            logoUrl: 'https://via.placeholder.com/200x80/4267B2/white?text=Tech+Paradise',
            websiteUrl: 'https://techparadise.com',
            displayName: 'Tech Paradise',
            description: 'Your one-stop destination for cutting-edge technology and electronics.'
        }
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

    // Mock reviews data
    const mockReviews = [
        {
            id: 'REV001',
            reviewerName: 'Sarah Johnson',
            reviewerType: 'customer',
            rating: 5,
            reviewText: 'Excellent service! The gaming laptop arrived quickly and was exactly as described. Tech Paradise provides great customer support and competitive prices.',
            date: '2024-03-15',
            orderNumber: 'ORD-2024-0312',
            productName: 'Gaming Laptop Pro',
            categories: {
                productQuality: 5,
                shipping: 5,
                communication: 5,
                overall: 5
            }
        },
        {
            id: 'REV002',
            reviewerName: 'Mike Driver',
            reviewerType: 'driver',
            rating: 4,
            reviewText: 'Seller was well-prepared for pickup. Products were properly packaged and labeled. Easy communication throughout the delivery process.',
            date: '2024-03-10',
            orderNumber: 'ORD-2024-0308',
            productName: 'Wireless Gaming Mouse',
            categories: {
                packaging: 4,
                readiness: 5,
                communication: 4,
                overall: 4
            }
        },
        {
            id: 'REV003',
            reviewerName: 'Emily Chen',
            reviewerType: 'customer',
            rating: 4,
            reviewText: 'Good product quality and fast delivery. The mechanical keyboard works perfectly. Only minor issue was the packaging could have been better.',
            date: '2024-03-05',
            orderNumber: 'ORD-2024-0302',
            productName: 'Mechanical Keyboard',
            categories: {
                productQuality: 5,
                shipping: 4,
                communication: 4,
                overall: 4
            }
        },
        {
            id: 'REV004',
            reviewerName: 'David Wilson',
            reviewerType: 'customer',
            rating: 3,
            reviewText: 'Average experience. Product was okay but took longer than expected to arrive. Customer service could be improved.',
            date: '2024-02-28',
            orderNumber: 'ORD-2024-0225',
            productName: 'Gaming Laptop Pro',
            categories: {
                productQuality: 4,
                shipping: 2,
                communication: 3,
                overall: 3
            }
        },
        {
            id: 'REV005',
            reviewerName: 'Alex Driver',
            reviewerType: 'driver',
            rating: 5,
            reviewText: 'Professional seller. Always has orders ready on time and provides clear delivery instructions. Great to work with!',
            date: '2024-02-20',
            orderNumber: 'ORD-2024-0218',
            productName: 'Multiple Items',
            categories: {
                packaging: 5,
                readiness: 5,
                communication: 5,
                overall: 5
            }
        }
    ]

    // Mock communications data
    const mockCommunications = [
        {
            id: 'COMM001',
            customerName: 'Sarah Johnson',
            customerEmail: 'sarah.j@email.com',
            orderNumber: 'ORD-2024-0312',
            status: 'resolved',
            lastMessage: '2024-03-16',
            subject: 'Question about Gaming Laptop specifications',
            messageCount: 5,
            messages: [
                {
                    id: 'MSG001',
                    sender: 'customer',
                    message: 'Hi, I wanted to know if the Gaming Laptop Pro comes with Windows 11 pre-installed?',
                    timestamp: '2024-03-15 10:30 AM',
                    read: true
                },
                {
                    id: 'MSG002',
                    sender: 'seller',
                    message: 'Hello Sarah! Yes, the Gaming Laptop Pro comes with Windows 11 Home pre-installed and activated. It also includes Microsoft Office trial.',
                    timestamp: '2024-03-15 11:15 AM',
                    read: true
                },
                {
                    id: 'MSG003',
                    sender: 'customer',
                    message: 'Perfect! Also, what is the warranty period for this laptop?',
                    timestamp: '2024-03-15 02:20 PM',
                    read: true
                },
                {
                    id: 'MSG004',
                    sender: 'seller',
                    message: 'The laptop comes with a 2-year manufacturer warranty plus our store provides an additional 6-month service guarantee.',
                    timestamp: '2024-03-15 02:45 PM',
                    read: true
                },
                {
                    id: 'MSG005',
                    sender: 'customer',
                    message: 'Thank you so much for the detailed information! I\'ll proceed with the purchase.',
                    timestamp: '2024-03-16 09:00 AM',
                    read: true
                }
            ]
        },
        {
            id: 'COMM002',
            customerName: 'Mike Thompson',
            customerEmail: 'mike.t@email.com',
            orderNumber: 'ORD-2024-0310',
            status: 'active',
            lastMessage: '2024-03-17',
            subject: 'Shipping delay inquiry',
            messageCount: 3,
            messages: [
                {
                    id: 'MSG006',
                    sender: 'customer',
                    message: 'Hello, my order was supposed to arrive yesterday but I haven\'t received any updates. Can you please check the status?',
                    timestamp: '2024-03-17 08:30 AM',
                    read: true
                },
                {
                    id: 'MSG007',
                    sender: 'seller',
                    message: 'Hi Mike, I apologize for the delay. There was an unexpected issue with our shipping partner. Your order is now with the courier and should arrive by tomorrow evening. I\'ll send you the tracking details shortly.',
                    timestamp: '2024-03-17 10:15 AM',
                    read: true
                },
                {
                    id: 'MSG008',
                    sender: 'customer',
                    message: 'Thank you for the quick response and update. I appreciate your help!',
                    timestamp: '2024-03-17 10:30 AM',
                    read: false
                }
            ]
        },
        {
            id: 'COMM003',
            customerName: 'Lisa Martinez',
            customerEmail: 'lisa.m@email.com',
            orderNumber: 'ORD-2024-0308',
            status: 'pending',
            lastMessage: '2024-03-16',
            subject: 'Product return request',
            messageCount: 2,
            messages: [
                {
                    id: 'MSG009',
                    sender: 'customer',
                    message: 'Hi, I received the wireless mouse but it\'s not working properly. The right click is not responsive. I would like to return it.',
                    timestamp: '2024-03-16 03:20 PM',
                    read: true
                },
                {
                    id: 'MSG010',
                    sender: 'seller',
                    message: 'Hello Lisa, I\'m sorry to hear about the issue with the mouse. I\'ll arrange for a replacement to be sent to you immediately. Please keep the defective unit until the new one arrives, then we\'ll arrange a pickup.',
                    timestamp: '2024-03-16 04:00 PM',
                    read: false
                }
            ]
        }
    ]

    useEffect(() => {
        // Simulate API call
        setLoading(true)
        setTimeout(() => {
            setSeller(mockSellerData)
            setProducts(mockProducts)
            setReviews(mockReviews)
            setCommunications(mockCommunications)
            setTempLimit(mockSellerData.productLimit.toString())
            setTempMembership(mockSellerData.membership)
            setTempFeatured(mockSellerData.featured)
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

    const handleResetPassword = () => {
        navigate(`/admin/sellers/reset-password/${seller.id}`)
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
                    case 'unarchive':
                        return { ...product, status: 'published' }
                    default:
                        return product
                }
            }
            return product
        }))
    }

    const handleEditLimit = () => {
        setEditingLimit(true)
        setTempLimit(seller.productLimit.toString())
        setCustomLimit('')
    }

    const handleCancelEdit = () => {
        setEditingLimit(false)
        setTempLimit(seller.productLimit.toString())
        setCustomLimit('')
    }

    const handleSaveLimit = () => {
        const newLimit = customLimit ? parseInt(customLimit) : parseInt(tempLimit)

        if (newLimit && newLimit > 0 && newLimit >= seller.productsAdded) {
            if (window.confirm(`Are you sure you want to change the product limit to ${newLimit}?`)) {
                setSeller({ ...seller, productLimit: newLimit })
                setEditingLimit(false)
                setCustomLimit('')
                // Here you would make an API call to save the new limit
            }
        } else if (newLimit < seller.productsAdded) {
            alert(`Product limit cannot be lower than current products count (${seller.productsAdded})`)
        } else {
            alert('Please enter a valid product limit')
        }
    }

    const handlePresetSelect = (limit) => {
        setTempLimit(limit.toString())
        setCustomLimit('')
    }

    const handleCustomLimitChange = (value) => {
        setCustomLimit(value)
        setTempLimit('')
    }

    const handleEditMembership = () => {
        setEditingMembership(true)
        setTempMembership(seller.membership)
    }

    const handleCancelMembershipEdit = () => {
        setEditingMembership(false)
        setTempMembership(seller.membership)
    }

    const handleSaveMembership = () => {
        const selectedPlan = membershipPlans.find(plan => plan.value === tempMembership)
        if (window.confirm(`Are you sure you want to change the membership to ${selectedPlan.label}?`)) {
            setSeller({
                ...seller,
                membership: tempMembership,
                productLimit: selectedPlan.productLimit
            })
            setEditingMembership(false)
            // Here you would make an API call to save the new membership
        }
    }

    const handleEditFeatured = () => {
        setEditingFeatured(true)
        setTempFeatured(seller.featured)
    }

    const handleCancelFeaturedEdit = () => {
        setEditingFeatured(false)
        setTempFeatured(seller.featured)
    }

    const handleSaveFeatured = () => {
        if (window.confirm(`Are you sure you want to ${tempFeatured.isFeatured ? 'feature' : 'unfeature'} this seller?`)) {
            setSeller({
                ...seller,
                featured: tempFeatured
            })
            setEditingFeatured(false)
            // Here you would make an API call to save the featured settings
        }
    }

    const handleFeaturedFieldChange = (field, value) => {
        setTempFeatured(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const getCurrentMembershipPlan = () => {
        return membershipPlans.find(plan => plan.value === seller.membership) || membershipPlans[0]
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

    const getProductLimitStatus = () => {
        const percentage = (seller.productsAdded / seller.productLimit) * 100
        if (percentage >= 100) return 'at-limit'
        if (percentage > 80) return 'near-limit'
        return 'normal'
    }

    const getMembershipBadge = (membership) => {
        const membershipConfig = {
            free: { class: 'neutral', label: 'Free Plan' },
            basic: { class: 'info', label: 'Basic Plan' },
            premium: { class: 'warning', label: 'Premium Plan' },
            enterprise: { class: 'success', label: 'Enterprise Plan' }
        }
        const config = membershipConfig[membership] || membershipConfig.free
        return <span className={`membership-badge membership-badge--${config.class}`}>{config.label}</span>
    }

    const getFeaturedBadge = (isFeatured) => {
        return (
            <span className={`featured-badge ${isFeatured ? 'featured-badge--active' : 'featured-badge--inactive'}`}>
                {isFeatured ? (
                    <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Featured
                    </>
                ) : (
                    <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Not Featured
                    </>
                )}
            </span>
        )
    }

    const getRatingStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`star ${i <= rating ? 'filled' : 'empty'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        }
        return stars
    }

    const getReviewTypeIcon = (type) => {
        if (type === 'customer') {
            return (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        } else {
            return (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0M14 9h3l-3-3v3z" />
                </svg>
            )
        }
    }

    const getCommunicationStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'warning', label: 'Active' },
            resolved: { class: 'success', label: 'Resolved' },
            pending: { class: 'info', label: 'Pending Response' }
        }
        const config = statusConfig[status] || statusConfig.pending
        return <span className={`communication-status communication-status--${config.class}`}>{config.label}</span>
    }

    const getAverageRating = (reviews) => {
        if (reviews.length === 0) return 0
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
        return (sum / reviews.length).toFixed(1)
    }

    const getRatingDistribution = (reviews) => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        reviews.forEach(review => {
            distribution[review.rating]++
        })
        return distribution
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
                            {getMembershipBadge(seller.membership)}
                            {getFeaturedBadge(seller.featured.isFeatured)}
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
                        <button className="action-btn action-btn--reset" onClick={handleResetPassword}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                            </svg>
                            Reset Password
                        </button>
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
                        className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Reviews ({reviews.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'communications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('communications')}
                    >
                        Communications ({communications.length})
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
                                        <span>Rejected: {products.filter(p => p.status === 'rejected').length}</span>
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
                                                            {product.status === 'archived' && (
                                                                <button
                                                                    className="product-action-btn unarchive"
                                                                    onClick={() => handleProductAction(product.id, 'unarchive')}
                                                                    title="Unarchive Product"
                                                                >
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l3-3m0 0l3 3m-3-3v12M5 5h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                            {product.status === 'rejected' && (
                                                                <button
                                                                    className="product-action-btn approve"
                                                                    onClick={() => handleProductAction(product.id, 'approve')}
                                                                    title="Approve Product"
                                                                >
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className="tab-content">
                            <div className="reviews-section">
                                <div className="reviews-header">
                                    <h3>Customer & Driver Reviews</h3>
                                    <div className="reviews-summary">
                                        <div className="rating-overview">
                                            <div className="average-rating">
                                                <span className="rating-number">{getAverageRating(reviews)}</span>
                                                <div className="rating-stars">
                                                    {getRatingStars(Math.round(getAverageRating(reviews)))}
                                                </div>
                                                <span className="total-reviews">({reviews.length} reviews)</span>
                                            </div>
                                            <div className="rating-distribution">
                                                {Object.entries(getRatingDistribution(reviews)).reverse().map(([stars, count]) => (
                                                    <div key={stars} className="rating-bar">
                                                        <span className="stars">{stars} stars</span>
                                                        <div className="bar">
                                                            <div
                                                                className="fill"
                                                                style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="count">({count})</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="review-filters">
                                            <span>Customer Reviews: {reviews.filter(r => r.reviewerType === 'customer').length}</span>
                                            <span>Driver Reviews: {reviews.filter(r => r.reviewerType === 'driver').length}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="reviews-list">
                                    {reviews.map(review => (
                                        <div key={review.id} className={`review-card ${review.reviewerType}`}>
                                            <div className="review-header">
                                                <div className="reviewer-info">
                                                    <div className="reviewer-icon">
                                                        {getReviewTypeIcon(review.reviewerType)}
                                                    </div>
                                                    <div className="reviewer-details">
                                                        <span className="reviewer-name">{review.reviewerName}</span>
                                                        <span className={`reviewer-type ${review.reviewerType}`}>
                                                            {review.reviewerType === 'customer' ? 'Customer' : 'Delivery Driver'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="review-meta">
                                                    <div className="review-rating">
                                                        {getRatingStars(review.rating)}
                                                        <span className="rating-number">({review.rating})</span>
                                                    </div>
                                                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <div className="review-content">
                                                <p className="review-text">{review.reviewText}</p>
                                                <div className="review-details">
                                                    <span className="order-number">Order: {review.orderNumber}</span>
                                                    {/* <span className="product-name">Product: {review.productName}</span> */}
                                                </div>
                                            </div>

                                            {/* <div className="review-categories">
                                                {Object.entries(review.categories).map(([category, rating]) => (
                                                    <div key={category} className="category-rating">
                                                        <span className="category-name">
                                                            {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                        </span>
                                                        <div className="category-stars">
                                                            {getRatingStars(rating)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Communications Tab */}
                    {activeTab === 'communications' && (
                        <div className="tab-content">
                            <div className="communications-section">
                                <div className="communications-header">
                                    <h3>Buyer-Seller Communications</h3>
                                    <div className="communications-summary">
                                        <span>Active: {communications.filter(c => c.status === 'active').length}</span>
                                        <span>Resolved: {communications.filter(c => c.status === 'resolved').length}</span>
                                        <span>Pending: {communications.filter(c => c.status === 'pending').length}</span>
                                    </div>
                                </div>

                                <div className="communications-list">
                                    {communications.map(comm => (
                                        <div key={comm.id} className="communication-card">
                                            <div className="communication-header">
                                                <div className="customer-info">
                                                    <div className="customer-icon">
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div className="customer-details">
                                                        <span className="customer-name">{comm.customerName}</span>
                                                        <span className="customer-email">{comm.customerEmail}</span>
                                                    </div>
                                                </div>
                                                <div className="communication-meta">
                                                    {getCommunicationStatusBadge(comm.status)}
                                                    <span className="order-number">Order: {comm.orderNumber}</span>
                                                    <span className="last-message">Last: {new Date(comm.lastMessage).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <div className="communication-subject">
                                                <h4>{comm.subject}</h4>
                                                <span className="message-count">{comm.messageCount} messages</span>
                                            </div>

                                            <div className="messages-thread">
                                                {comm.messages.map((message, index) => (
                                                    <div key={message.id} className={`message ${message.sender}`}>
                                                        <div className="message-avatar">
                                                            {message.sender === 'customer' ? (
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            ) : (
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="message-content">
                                                            <div className="message-header">
                                                                <span className="message-sender">
                                                                    {message.sender === 'customer' ? comm.customerName : seller.storeName}
                                                                </span>
                                                                <span className="message-timestamp">{message.timestamp}</span>
                                                                {!message.read && message.sender === 'customer' && (
                                                                    <span className="unread-indicator">Unread</span>
                                                                )}
                                                            </div>
                                                            <p className="message-text">{message.message}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
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
                                    <h3>Account Settings</h3>
                                    <div className="info-list">
                                        <div className="info-item">
                                            <span className="label">Membership Plan:</span>
                                            {!editingMembership ? (
                                                <div className="value membership-display">
                                                    <div className="membership-info">
                                                        {getMembershipBadge(seller.membership)}
                                                        <span className="membership-price">{getCurrentMembershipPlan().price}</span>
                                                    </div>
                                                    <button
                                                        className="edit-membership-btn"
                                                        onClick={handleEditMembership}
                                                        title="Edit Membership Plan"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="membership-editor">
                                                    <div className="membership-options">
                                                        <span className="membership-label">Select Plan:</span>
                                                        <select
                                                            value={tempMembership}
                                                            onChange={(e) => setTempMembership(e.target.value)}
                                                            className="membership-select"
                                                        >
                                                            {membershipPlans.map(plan => (
                                                                <option key={plan.value} value={plan.value}>
                                                                    {plan.label} - {plan.price}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="membership-preview">
                                                        {membershipPlans.find(plan => plan.value === tempMembership) && (
                                                            <div className="plan-details">
                                                                <h4>{membershipPlans.find(plan => plan.value === tempMembership).label}</h4>
                                                                <p className="plan-price">{membershipPlans.find(plan => plan.value === tempMembership).price}</p>
                                                                <ul className="plan-features">
                                                                    {membershipPlans.find(plan => plan.value === tempMembership).features.map((feature, index) => (
                                                                        <li key={index}>{feature}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="membership-actions">
                                                        <button
                                                            className="save-btn"
                                                            onClick={handleSaveMembership}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="cancel-btn"
                                                            onClick={handleCancelMembershipEdit}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Product Limit:</span>
                                            {!editingLimit ? (
                                                <div className="value limit-display">
                                                    <span className={`limit-value ${getProductLimitStatus()}`}>
                                                        {seller.productLimit} products
                                                    </span>
                                                    <button
                                                        className="edit-limit-btn"
                                                        onClick={handleEditLimit}
                                                        title="Edit Product Limit"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="limit-editor">
                                                    <div className="preset-options">
                                                        <span className="preset-label">Quick Select:</span>
                                                        <div className="preset-buttons">
                                                            {presetLimits.map(limit => (
                                                                <button
                                                                    key={limit}
                                                                    className={`preset-btn ${tempLimit === limit.toString() ? 'active' : ''}`}
                                                                    onClick={() => handlePresetSelect(limit)}
                                                                >
                                                                    {limit}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="custom-input">
                                                        <span className="custom-label">Custom:</span>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter custom limit"
                                                            value={customLimit}
                                                            onChange={(e) => handleCustomLimitChange(e.target.value)}
                                                            min={seller.productsAdded}
                                                            className="custom-limit-input"
                                                        />
                                                    </div>
                                                    <div className="limit-actions">
                                                        <button
                                                            className="save-btn"
                                                            onClick={handleSaveLimit}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="cancel-btn"
                                                            onClick={handleCancelEdit}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Products Added:</span>
                                            <span className="value">{seller.productsAdded} products</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Remaining Slots:</span>
                                            <span className={`value ${getProductLimitStatus()}`}>
                                                {seller.productLimit - seller.productsAdded} products
                                            </span>
                                        </div>
                                        <div className="info-item">
                                            <span className="label">Account Status:</span>
                                            <span className="value">{getStatusBadge(seller.status)}</span>
                                        </div>

                                        {/* Featured Status - Updated to match other sections */}
                                        <div className="info-item">
                                            <span className="label">Featured Status:</span>
                                            {!editingFeatured ? (
                                                <div className="value featured-display">
                                                    <div className="featured-info">
                                                        {getFeaturedBadge(seller.featured.isFeatured)}
                                                        {seller.featured.isFeatured && (
                                                            <span className="featured-details">
                                                                {seller.featured.displayName || seller.storeName}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="edit-featured-btn"
                                                        onClick={handleEditFeatured}
                                                        title="Edit Featured Settings"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="featured-editor">
                                                    <div className="featured-toggle-section">
                                                        <span className="toggle-label">Featured Status:</span>
                                                        <label className="toggle-container">
                                                            <input
                                                                type="checkbox"
                                                                checked={tempFeatured.isFeatured}
                                                                onChange={(e) => handleFeaturedFieldChange('isFeatured', e.target.checked)}
                                                            />
                                                            <span className="toggle-slider"></span>
                                                            <span className="toggle-text">
                                                                {tempFeatured.isFeatured ? 'Featured' : 'Not Featured'}
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {tempFeatured.isFeatured && (
                                                        <div className="featured-settings">
                                                            <div className="form-group">
                                                                <label>Display Name:</label>
                                                                <input
                                                                    type="text"
                                                                    value={tempFeatured.displayName}
                                                                    onChange={(e) => handleFeaturedFieldChange('displayName', e.target.value)}
                                                                    placeholder="Enter display name"
                                                                    className="form-input"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Logo URL:</label>
                                                                <input
                                                                    type="url"
                                                                    value={tempFeatured.logoUrl}
                                                                    onChange={(e) => handleFeaturedFieldChange('logoUrl', e.target.value)}
                                                                    placeholder="https://example.com/logo.png"
                                                                    className="form-input"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Website URL:</label>
                                                                <input
                                                                    type="url"
                                                                    value={tempFeatured.websiteUrl}
                                                                    onChange={(e) => handleFeaturedFieldChange('websiteUrl', e.target.value)}
                                                                    placeholder="https://example.com"
                                                                    className="form-input"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Description:</label>
                                                                <textarea
                                                                    value={tempFeatured.description}
                                                                    onChange={(e) => handleFeaturedFieldChange('description', e.target.value)}
                                                                    placeholder="Brief description for the featured section"
                                                                    className="form-textarea"
                                                                    rows="3"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="featured-actions">
                                                        <button
                                                            className="save-btn"
                                                            onClick={handleSaveFeatured}
                                                        >
                                                            Save Changes
                                                        </button>
                                                        <button
                                                            className="cancel-btn"
                                                            onClick={handleCancelFeaturedEdit}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional featured info when active and not editing */}
                                        {seller.featured.isFeatured && !editingFeatured && (
                                            <>
                                                <div className="info-item">
                                                    <span className="label">Display Name:</span>
                                                    <span className="value">{seller.featured.displayName || 'Not set'}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Website URL:</span>
                                                    <span className="value">
                                                        {seller.featured.websiteUrl ? (
                                                            <a href={seller.featured.websiteUrl} target="_blank" rel="noopener noreferrer" className="website-link">
                                                                {seller.featured.websiteUrl}
                                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        ) : (
                                                            'Not set'
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="label">Description:</span>
                                                    <span className="value">{seller.featured.description || 'Not set'}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Featured Seller Settings - Standalone Section */}
                            <div className="info-card featured-settings-card">
                                <h3>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    Featured Seller Settings
                                </h3>

                                <div className="featured-main-toggle">
                                    <label className="featured-master-control">
                                        <input
                                            type="checkbox"
                                            checked={seller.featured.isFeatured}
                                            onChange={(e) => {
                                                const newFeatured = { ...seller.featured, isFeatured: e.target.checked }
                                                setSeller({ ...seller, featured: newFeatured })
                                            }}
                                        />
                                        <span className="toggle-switch"></span>
                                        <span className="toggle-label-text">
                                            Enable Featured Status
                                        </span>
                                    </label>
                                </div>

                                {seller.featured.isFeatured && (
                                    <div className="featured-controls">
                                        <div className="featured-field">
                                            <div className="field-header">
                                                <label className="field-control">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!seller.featured.displayName}
                                                        onChange={(e) => {
                                                            const newFeatured = {
                                                                ...seller.featured,
                                                                displayName: e.target.checked ? seller.storeName : ''
                                                            }
                                                            setSeller({ ...seller, featured: newFeatured })
                                                        }}
                                                    />
                                                    <span className="field-checkbox"></span>
                                                    <span className="field-label">Display Name</span>
                                                </label>
                                            </div>
                                            {seller.featured.displayName !== undefined && (
                                                <input
                                                    type="text"
                                                    value={seller.featured.displayName}
                                                    onChange={(e) => {
                                                        const newFeatured = { ...seller.featured, displayName: e.target.value }
                                                        setSeller({ ...seller, featured: newFeatured })
                                                    }}
                                                    placeholder="Enter display name"
                                                    className="featured-input"
                                                />
                                            )}
                                        </div>

                                        <div className="featured-field">
                                            <div className="field-header">
                                                <label className="field-control">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!seller.featured.logoUrl}
                                                        onChange={(e) => {
                                                            const newFeatured = {
                                                                ...seller.featured,
                                                                logoUrl: e.target.checked ? 'https://' : ''
                                                            }
                                                            setSeller({ ...seller, featured: newFeatured })
                                                        }}
                                                    />
                                                    <span className="field-checkbox"></span>
                                                    <span className="field-label">Logo URL</span>
                                                </label>
                                            </div>
                                            {seller.featured.logoUrl !== undefined && (
                                                <input
                                                    type="url"
                                                    value={seller.featured.logoUrl}
                                                    onChange={(e) => {
                                                        const newFeatured = { ...seller.featured, logoUrl: e.target.value }
                                                        setSeller({ ...seller, featured: newFeatured })
                                                    }}
                                                    placeholder="https://example.com/logo.png"
                                                    className="featured-input"
                                                />
                                            )}
                                        </div>

                                        <div className="featured-field">
                                            <div className="field-header">
                                                <label className="field-control">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!seller.featured.websiteUrl}
                                                        onChange={(e) => {
                                                            const newFeatured = {
                                                                ...seller.featured,
                                                                websiteUrl: e.target.checked ? 'https://' : ''
                                                            }
                                                            setSeller({ ...seller, featured: newFeatured })
                                                        }}
                                                    />
                                                    <span className="field-checkbox"></span>
                                                    <span className="field-label">Website URL</span>
                                                </label>
                                            </div>
                                            {seller.featured.websiteUrl !== undefined && (
                                                <input
                                                    type="url"
                                                    value={seller.featured.websiteUrl}
                                                    onChange={(e) => {
                                                        const newFeatured = { ...seller.featured, websiteUrl: e.target.value }
                                                        setSeller({ ...seller, featured: newFeatured })
                                                    }}
                                                    placeholder="https://example.com"
                                                    className="featured-input"
                                                />
                                            )}
                                        </div>

                                        <div className="featured-field">
                                            <div className="field-header">
                                                <label className="field-control">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!seller.featured.description}
                                                        onChange={(e) => {
                                                            const newFeatured = {
                                                                ...seller.featured,
                                                                description: e.target.checked ? '' : ''
                                                            }
                                                            setSeller({ ...seller, featured: newFeatured })
                                                        }}
                                                    />
                                                    <span className="field-checkbox"></span>
                                                    <span className="field-label">Description</span>
                                                </label>
                                            </div>
                                            {seller.featured.description !== undefined && (
                                                <textarea
                                                    value={seller.featured.description}
                                                    onChange={(e) => {
                                                        const newFeatured = { ...seller.featured, description: e.target.value }
                                                        setSeller({ ...seller, featured: newFeatured })
                                                    }}
                                                    placeholder="Brief description for the featured section"
                                                    className="featured-textarea"
                                                    rows="3"
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preview section as separate card when featured and not editing */}
                            {seller.featured.isFeatured && !editingFeatured && (
                                <div className="info-card featured-preview-card">
                                    <h3>
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Public Display Preview
                                    </h3>
                                    <div className="preview-card">
                                        {seller.featured.logoUrl && (
                                            <div className="preview-logo">
                                                <img src={seller.featured.logoUrl} alt={seller.featured.displayName} />
                                            </div>
                                        )}
                                        <div className="preview-content">
                                            <h5>{seller.featured.displayName || seller.storeName}</h5>
                                            {seller.featured.description && (
                                                <p>{seller.featured.description}</p>
                                            )}
                                            {seller.featured.websiteUrl && (
                                                <a href={seller.featured.websiteUrl} target="_blank" rel="noopener noreferrer" className="preview-link">
                                                    Visit Website
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SellerDetails