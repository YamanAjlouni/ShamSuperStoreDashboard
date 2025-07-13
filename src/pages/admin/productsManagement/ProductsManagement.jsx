import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductsManagement.scss'

const ProductsManagement = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                const mockProducts = [
                    {
                        id: 'PRD001',
                        sku: 'SKU-001-2024',
                        name: 'Wireless Bluetooth Headphones',
                        shortDescription: 'High-quality wireless headphones with noise cancellation',
                        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
                        price: 99.99,
                        salePrice: 79.99,
                        onSale: true,
                        stock: 150,
                        seller: {
                            id: 'SEL001',
                            name: 'TechStore Pro',
                            storeName: 'TechStore Pro'
                        },
                        status: 'active',
                        totalSales: 245,
                        createdAt: '2024-01-15',
                        category: 'Electronics',
                        shipping: {
                            type: 'system',
                            flatRate: null,
                            percentage: null
                        }
                    },
                    {
                        id: 'PRD002',
                        sku: 'SKU-002-2024',
                        name: 'Organic Cotton T-Shirt',
                        shortDescription: 'Comfortable organic cotton t-shirt available in multiple colors',
                        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
                        price: 29.99,
                        salePrice: null,
                        onSale: false,
                        stock: 75,
                        seller: {
                            id: 'SEL002',
                            name: 'Fashion Forward',
                            storeName: 'Fashion Forward'
                        },
                        status: 'pending',
                        totalSales: 89,
                        createdAt: '2024-01-20',
                        category: 'Clothing',
                        shipping: {
                            type: 'free',
                            flatRate: null,
                            percentage: null
                        }
                    },
                    {
                        id: 'PRD003',
                        sku: 'SKU-003-2024',
                        name: 'Smart Fitness Watch',
                        shortDescription: 'Advanced fitness tracking watch with heart rate monitor',
                        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
                        price: 199.99,
                        salePrice: 149.99,
                        onSale: true,
                        stock: 0,
                        seller: {
                            id: 'SEL001',
                            name: 'TechStore Pro',
                            storeName: 'TechStore Pro'
                        },
                        status: 'active',
                        totalSales: 432,
                        createdAt: '2024-01-10',
                        category: 'Electronics',
                        shipping: {
                            type: 'percentage',
                            flatRate: null,
                            percentage: 5.5
                        }
                    },
                    {
                        id: 'PRD004',
                        sku: 'SKU-004-2024',
                        name: 'Ceramic Coffee Mug Set',
                        shortDescription: 'Set of 4 handcrafted ceramic coffee mugs',
                        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop',
                        price: 45.99,
                        salePrice: null,
                        onSale: false,
                        stock: 25,
                        seller: {
                            id: 'SEL003',
                            name: 'Home Essentials',
                            storeName: 'Home Essentials'
                        },
                        status: 'archived',
                        totalSales: 156,
                        createdAt: '2024-01-05',
                        category: 'Home & Garden',
                        shipping: {
                            type: 'flat',
                            flatRate: 12.50,
                            percentage: null
                        }
                    },
                    {
                        id: 'PRD005',
                        sku: 'SKU-005-2024',
                        name: 'Professional Camera Lens',
                        shortDescription: '85mm f/1.4 portrait lens for professional photography',
                        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop',
                        price: 899.99,
                        salePrice: null,
                        onSale: false,
                        stock: 12,
                        seller: {
                            id: 'SEL004',
                            name: 'PhotoGear Pro',
                            storeName: 'PhotoGear Pro'
                        },
                        status: 'pending',
                        totalSales: 23,
                        createdAt: '2024-01-25',
                        category: 'Electronics',
                        shipping: {
                            type: 'free',
                            flatRate: null,
                            percentage: null
                        }
                    }
                ]
                setProducts(mockProducts)
                setLoading(false)
            }, 1000)
        }

        fetchProducts()
    }, [])

    // Filter products based on search and status
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller.storeName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || product.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Pagination
    const totalProducts = filteredProducts.length
    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    const handleViewProduct = (id) => {
        navigate(`/admin/products/details/${id}`)
    }

    const handleAcceptProduct = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, status: 'active' } : product
        ))
        console.log(`Accepting product ${id}`)
    }

    const handleRejectProduct = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, status: 'rejected' } : product
        ))
        console.log(`Rejecting product ${id}`)
    }

    const handleArchiveProduct = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, status: 'archived' } : product
        ))
        console.log(`Archiving product ${id}`)
    }

    const handleUnarchiveProduct = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, status: 'active' } : product
        ))
        console.log(`Unarchiving product ${id}`)
    }

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            setProducts(products.filter(product => product.id !== id))
            console.log(`Deleting product ${id}`)
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

    const getStockStatus = (stock) => {
        if (stock === 0) {
            return <span className="stock-status stock-status--out">Out of Stock</span>
        } else if (stock <= 10) {
            return <span className="stock-status stock-status--low">Low Stock ({stock})</span>
        } else {
            return <span className="stock-status stock-status--in">In Stock ({stock})</span>
        }
    }

    const getShippingInfo = (shipping) => {
        switch (shipping.type) {
            case 'free':
                return (
                    <div className="shipping-info">
                        <span className="shipping-badge shipping-badge--free">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            FREE
                        </span>
                        <span className="shipping-details">No shipping charges</span>
                    </div>
                )
            case 'flat':
                return (
                    <div className="shipping-info">
                        <span className="shipping-badge shipping-badge--flat">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            FLAT
                        </span>
                        <span className="shipping-details">${shipping.flatRate} per order</span>
                    </div>
                )
            case 'percentage':
                return (
                    <div className="shipping-info">
                        <span className="shipping-badge shipping-badge--percentage">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            {shipping.percentage}%
                        </span>
                        <span className="shipping-details">{shipping.percentage}% of order total</span>
                    </div>
                )
            case 'system':
                return (
                    <div className="shipping-info">
                        <span className="shipping-badge shipping-badge--system">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            SYSTEM
                        </span>
                        <span className="shipping-details">Admin configured rate</span>
                    </div>
                )
            default:
                return (
                    <div className="shipping-info">
                        <span className="shipping-badge shipping-badge--unknown">N/A</span>
                        <span className="shipping-details">Not configured</span>
                    </div>
                )
        }
    }

    if (loading) {
        return (
            <div className="products-management">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading products...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="products-management">
            <div className="page-header">
                <div className="header-content">
                    <h1>Product Management</h1>
                    <p>Manage all products across your marketplace</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{products.length}</span>
                        <span className="stat-label">Total Products</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{products.filter(p => p.status === 'pending').length}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{products.filter(p => p.stock <= 10).length}</span>
                        <span className="stat-label">Low Stock</span>
                    </div>
                </div>
            </div>

            <div className="products-table-container">
                <div className="table-controls">
                    <div className="controls-left">
                        <div className="search-box">
                            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products, SKU, or seller..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="archived">Archived</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="controls-right">
                        <span className="results-count">
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalProducts)} of {totalProducts}
                        </span>
                        <select
                            className="per-page-select"
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Pricing</th>
                                <th>Stock</th>
                                <th>Shipping</th>
                                <th>Seller</th>
                                <th>Sales</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="product-info">
                                        <div className="product-cell">
                                            <div className="product-image">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                            <div className="product-details">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-description">{product.shortDescription}</div>
                                                <div className="product-category">{product.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="sku">
                                        <span className="sku-code">{product.sku}</span>
                                    </td>
                                    <td className="pricing">
                                        <div className="price-info">
                                            {product.onSale ? (
                                                <>
                                                    <div className="sale-price">${product.salePrice}</div>
                                                    <div className="original-price">${product.price}</div>
                                                    <div className="sale-badge">ON SALE</div>
                                                </>
                                            ) : (
                                                <div className="regular-price">${product.price}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="stock">
                                        {getStockStatus(product.stock)}
                                    </td>
                                    <td className="shipping">
                                        {getShippingInfo(product.shipping)}
                                    </td>
                                    <td className="seller">
                                        <div className="seller-info">
                                            <div className="seller-name">{product.seller.storeName}</div>
                                            <div className="seller-id">ID: {product.seller.id}</div>
                                        </div>
                                    </td>
                                    <td className="sales">
                                        <span className="sales-count">{product.totalSales} sold</span>
                                    </td>
                                    <td className="status">
                                        {getStatusBadge(product.status)}
                                    </td>
                                    <td className="created-date">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="actions">
                                        <div className="action-buttons">
                                            <button
                                                className="action-btn action-btn--view"
                                                onClick={() => handleViewProduct(product.id)}
                                                title="View Details"
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            {product.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="action-btn action-btn--accept"
                                                        onClick={() => handleAcceptProduct(product.id)}
                                                        title="Accept Product"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="action-btn action-btn--reject"
                                                        onClick={() => handleRejectProduct(product.id)}
                                                        title="Reject Product"
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                            {product.status === 'active' && (
                                                <button
                                                    className="action-btn action-btn--archive"
                                                    onClick={() => handleArchiveProduct(product.id)}
                                                    title="Archive Product"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 6 6-6" />
                                                    </svg>
                                                </button>
                                            )}
                                            {product.status === 'archived' && (
                                                <button
                                                    className="action-btn action-btn--unarchive"
                                                    onClick={() => handleUnarchiveProduct(product.id)}
                                                    title="Unarchive Product"
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                                    </svg>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn action-btn--delete"
                                                onClick={() => handleDeleteProduct(product.id)}
                                                title="Delete Product"
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

                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
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
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductsManagement