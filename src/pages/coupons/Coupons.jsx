import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Plus, Search, Filter, Edit, Trash2,
    CheckSquare, Square, ChevronDown, Calendar,
    Percent, DollarSign, Users, ShoppingCart
} from 'lucide-react'
import './Coupons.scss'

const Coupons = () => {
    const navigate = useNavigate()
    const [selectedCoupons, setSelectedCoupons] = useState([])
    const [filters, setFilters] = useState({
        discountType: '',
        search: ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [couponToDelete, setCouponToDelete] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Mock data for coupons
    const mockCoupons = [
        {
            id: 1,
            code: 'SUMMER20',
            description: 'Summer Sale 20% Off',
            type: 'percentage',
            amount: 20,
            store: 'TechStore Pro',
            usageLimit: 100,
            usedCount: 45,
            expireDate: '2025-08-31',
            isActive: true,
            freeShipping: false
        },
        {
            id: 2,
            code: 'FIXED50',
            description: 'Fixed $50 Off Orders',
            type: 'fixed_cart',
            amount: 50,
            store: 'EcoWear',
            usageLimit: 50,
            usedCount: 12,
            expireDate: '2025-07-15',
            isActive: true,
            freeShipping: true
        },
        {
            id: 3,
            code: 'WELCOME10',
            description: 'Welcome New Customers',
            type: 'percentage',
            amount: 10,
            store: 'GadgetHub',
            usageLimit: 500,
            usedCount: 234,
            expireDate: '2025-12-31',
            isActive: true,
            freeShipping: false
        },
        {
            id: 4,
            code: 'FREESHIP',
            description: 'Free Shipping Only',
            type: 'fixed_cart',
            amount: 0,
            store: 'HomeComfort',
            usageLimit: 200,
            usedCount: 89,
            expireDate: '2025-09-30',
            isActive: false,
            freeShipping: true
        },
        {
            id: 5,
            code: 'BULK25',
            description: 'Bulk Order Discount',
            type: 'percentage',
            amount: 25,
            store: 'GameGear',
            usageLimit: 25,
            usedCount: 8,
            expireDate: '2025-06-30',
            isActive: true,
            freeShipping: false
        }
    ]

    const discountTypes = ['All Types', 'Percentage discount', 'Fixed cart discount']

    const getDiscountTypeBadge = (type) => {
        const typeClass = type === 'percentage' ? 'type--percentage' : 'type--fixed'
        const icon = type === 'percentage' ? <Percent size={12} /> : <DollarSign size={12} />
        const label = type === 'percentage' ? 'Percentage' : 'Fixed Cart'

        return (
            <span className={`discount-type-badge ${typeClass}`}>
                {icon}
                {label}
            </span>
        )
    }

    const getAmountDisplay = (type, amount) => {
        if (type === 'percentage') {
            return `${amount}%`
        } else {
            return amount === 0 ? 'Free Shipping' : `$${amount}`
        }
    }

    const getUsageBadge = (usedCount, limit) => {
        const percentage = (usedCount / limit) * 100
        let badgeClass = 'usage--low'

        if (percentage >= 80) {
            badgeClass = 'usage--high'
        } else if (percentage >= 50) {
            badgeClass = 'usage--medium'
        }

        return (
            <span className={`usage-badge ${badgeClass}`}>
                {usedCount} / {limit}
            </span>
        )
    }

    const getExpireBadge = (expireDate) => {
        const today = new Date()
        const expire = new Date(expireDate)
        const daysUntilExpire = Math.ceil((expire - today) / (1000 * 60 * 60 * 24))

        let badgeClass = 'expire--normal'
        let status = `${daysUntilExpire} days`

        if (daysUntilExpire < 0) {
            badgeClass = 'expire--expired'
            status = 'Expired'
        } else if (daysUntilExpire <= 7) {
            badgeClass = 'expire--warning'
            status = `${daysUntilExpire} days`
        }

        return (
            <span className={`expire-badge ${badgeClass}`}>
                <Calendar size={12} />
                {status}
            </span>
        )
    }

    const handleSelectAll = () => {
        if (selectedCoupons.length === mockCoupons.length) {
            setSelectedCoupons([])
        } else {
            setSelectedCoupons(mockCoupons.map(c => c.id))
        }
    }

    const handleSelectCoupon = (couponId) => {
        setSelectedCoupons(prev =>
            prev.includes(couponId)
                ? prev.filter(id => id !== couponId)
                : [...prev, couponId]
        )
    }

    const handleDelete = (coupon) => {
        setCouponToDelete(coupon)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        console.log('Deleting coupon:', couponToDelete)
        setShowDeleteModal(false)
        setCouponToDelete(null)
    }

    const filteredCoupons = mockCoupons.filter(coupon => {
        const typeFilter = filters.discountType === '' ||
            filters.discountType === 'All Types' ||
            (filters.discountType === 'Percentage discount' && coupon.type === 'percentage') ||
            (filters.discountType === 'Fixed cart discount' && coupon.type === 'fixed_cart')

        const searchFilter = filters.search === '' ||
            coupon.code.toLowerCase().includes(filters.search.toLowerCase()) ||
            coupon.description.toLowerCase().includes(filters.search.toLowerCase())

        return typeFilter && searchFilter
    })

    const totalCoupons = filteredCoupons.length
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalCoupons)
    const currentCoupons = filteredCoupons.slice(startIndex, endIndex)

    return (
        <div className="coupons-page">
            {/* Header */}
            <div className="coupons-header">
                <h1>Coupons</h1>
                <button
                    className="add-coupon-btn"
                    onClick={() => navigate('/seller/coupons/new')}
                >
                    <Plus size={20} />
                    Add New Coupon
                </button>
            </div>

            {/* Filters */}
            <div className="coupons-filters">
                <div className="filters-left">
                    <span className="coupons-count">
                        Showing {startIndex + 1}-{endIndex} of {totalCoupons} coupons
                    </span>
                </div>

                <div className="filters-center">
                    <div className="filter-group">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="filter-select"
                        >
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.discountType}
                            onChange={(e) => setFilters(prev => ({ ...prev, discountType: e.target.value }))}
                            className="filter-select"
                        >
                            {discountTypes.map(type => (
                                <option key={type} value={type === 'All Types' ? '' : type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>
                </div>

                <div className="filters-right">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search coupons..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Coupons Table */}
            <div className="coupons-table-container">
                <table className="coupons-table">
                    <thead>
                        <tr>
                            <th className="select-column">
                                <button onClick={handleSelectAll} className="select-all-btn">
                                    {selectedCoupons.length === mockCoupons.length ?
                                        <CheckSquare size={18} /> :
                                        <Square size={18} />
                                    }
                                </button>
                            </th>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Store</th>
                            <th>Usage Limit</th>
                            <th>Expire Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoupons.map(coupon => (
                            <tr key={coupon.id} className="coupon-row">
                                <td className="select-column">
                                    <button
                                        onClick={() => handleSelectCoupon(coupon.id)}
                                        className="select-btn"
                                    >
                                        {selectedCoupons.includes(coupon.id) ?
                                            <CheckSquare size={18} /> :
                                            <Square size={18} />
                                        }
                                    </button>
                                </td>
                                <td className="code-column">
                                    <div className="coupon-code">
                                        <span className="code">{coupon.code}</span>
                                        <span className="description">{coupon.description}</span>
                                        {coupon.freeShipping && (
                                            <span className="free-shipping-badge">
                                                <ShoppingCart size={12} />
                                                Free Shipping
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="type-column">
                                    {getDiscountTypeBadge(coupon.type)}
                                </td>
                                <td className="amount-column">
                                    <span className="amount">
                                        {getAmountDisplay(coupon.type, coupon.amount)}
                                    </span>
                                </td>
                                <td className="store-column">{coupon.store}</td>
                                <td className="usage-column">
                                    {getUsageBadge(coupon.usedCount, coupon.usageLimit)}
                                </td>
                                <td className="expire-column">
                                    {getExpireBadge(coupon.expireDate)}
                                </td>
                                <td className="actions-column">
                                    <div className="actions">
                                        <button
                                            className="action-btn edit-btn"
                                            onClick={() => navigate(`/seller/coupons/edit/${coupon.id}`)}
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDelete(coupon)}
                                            title="Delete"
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

            {/* Pagination */}
            <div className="pagination">
                <div className="pagination-info">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="items-per-page"
                    >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>

                <div className="pagination-controls">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {Math.ceil(totalCoupons / itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalCoupons / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(totalCoupons / itemsPerPage)}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete coupon "{couponToDelete?.code}"? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="delete-btn"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Coupons