import { useState, useEffect } from 'react'
import './FeaturesProducts.scss'

const FeaturesProducts = () => {
    // Sample products data (in real app, this would come from API)
    const [allProducts] = useState([
        {
            id: 1,
            title: 'Designer Leather Handbag',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 299.00,
            salePrice: 199.00,
            seller: 'Fashion House Co.',
            category: 'Handbags',
            onSale: true,
            dateAdded: '2024-01-15',
            stock: 25
        },
        {
            id: 2,
            title: 'Classic Running Shoes',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 150.00,
            salePrice: 89.00,
            seller: 'SportMax',
            category: 'Shoes',
            onSale: true,
            dateAdded: '2024-01-20',
            stock: 50
        },
        {
            id: 3,
            title: 'Elegant Diamond Earrings',
            image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 450.00,
            salePrice: 450.00,
            seller: 'Luxury Gems',
            category: 'Jewelry',
            onSale: false,
            dateAdded: '2024-01-25',
            stock: 10
        },
        {
            id: 4,
            title: 'Cotton Summer Dress',
            image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 120.00,
            salePrice: 75.00,
            seller: 'Summer Styles',
            category: 'Dresses',
            onSale: true,
            dateAdded: '2024-02-01',
            stock: 30
        },
        {
            id: 5,
            title: 'Luxury Watch',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 899.00,
            salePrice: 899.00,
            seller: 'TimeKeepers',
            category: 'Watches',
            onSale: false,
            dateAdded: '2024-02-05',
            stock: 15
        },
        {
            id: 6,
            title: 'Casual Sneakers',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 89.00,
            salePrice: 59.00,
            seller: 'SportMax',
            category: 'Shoes',
            onSale: true,
            dateAdded: '2024-02-10',
            stock: 40
        },
        {
            id: 7,
            title: 'Professional Blazer',
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 180.00,
            salePrice: 180.00,
            seller: 'Business Attire',
            category: 'Clothing',
            onSale: false,
            dateAdded: '2024-02-12',
            stock: 20
        },
        {
            id: 8,
            title: 'Wireless Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            originalPrice: 299.00,
            salePrice: 199.00,
            seller: 'TechGear',
            category: 'Electronics',
            onSale: true,
            dateAdded: '2024-02-15',
            stock: 35
        }
    ])

    const [featuredProducts, setFeaturedProducts] = useState([1, 2, 3, 4, 5, 6]) // IDs of featured products
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    // Filters and pagination
    const [filters, setFilters] = useState({
        seller: '',
        title: '',
        minPrice: '',
        maxPrice: '',
        dateFrom: '',
        dateTo: '',
        onSale: 'all'
    })

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [sortBy, setSortBy] = useState('dateAdded')
    const [sortOrder, setSortOrder] = useState('desc')

    // Get unique sellers for filter dropdown
    const uniqueSellers = [...new Set(allProducts.map(product => product.seller))]

    // Filter and sort products
    const filteredProducts = allProducts
        .filter(product => {
            const matchesSeller = !filters.seller || product.seller === filters.seller
            const matchesTitle = !filters.title || product.title.toLowerCase().includes(filters.title.toLowerCase())
            const matchesMinPrice = !filters.minPrice || product.salePrice >= parseFloat(filters.minPrice)
            const matchesMaxPrice = !filters.maxPrice || product.salePrice <= parseFloat(filters.maxPrice)
            const matchesDateFrom = !filters.dateFrom || new Date(product.dateAdded) >= new Date(filters.dateFrom)
            const matchesDateTo = !filters.dateTo || new Date(product.dateAdded) <= new Date(filters.dateTo)
            const matchesSale = filters.onSale === 'all' ||
                (filters.onSale === 'sale' && product.onSale) ||
                (filters.onSale === 'regular' && !product.onSale)

            return matchesSeller && matchesTitle && matchesMinPrice && matchesMaxPrice &&
                matchesDateFrom && matchesDateTo && matchesSale
        })
        .sort((a, b) => {
            let aValue = a[sortBy]
            let bValue = b[sortBy]

            if (sortBy === 'salePrice' || sortBy === 'originalPrice') {
                aValue = parseFloat(aValue)
                bValue = parseFloat(bValue)
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    // Get featured products data
    const featuredProductsData = featuredProducts
        .map(id => allProducts.find(product => product.id === id))
        .filter(Boolean)

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
        setCurrentPage(1) // Reset to first page when filters change
    }

    const clearFilters = () => {
        setFilters({
            seller: '',
            title: '',
            minPrice: '',
            maxPrice: '',
            dateFrom: '',
            dateTo: '',
            onSale: 'all'
        })
        setCurrentPage(1)
    }

    const toggleFeatured = (productId) => {
        setFeaturedProducts(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId)
            } else {
                return [...prev, productId]
            }
        })
    }

    const moveFeaturedProduct = (fromIndex, toIndex) => {
        const newFeatured = [...featuredProducts]
        const [movedId] = newFeatured.splice(fromIndex, 1)
        newFeatured.splice(toIndex, 0, movedId)
        setFeaturedProducts(newFeatured)
    }

    const nextSlide = () => {
        if (featuredProductsData.length > 4) {
            setCurrentSlide(prev => Math.min(prev + 1, featuredProductsData.length - 4))
        }
    }

    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0))
    }

    return (
        <div className="features-products">
            <div className="page-header">
                <div className="header-content">
                    <h1>Featured Products</h1>
                    <p>Select and manage products to display in the featured section</p>
                </div>
                <div className="header-actions">
                    <button
                        className={`preview-btn ${isPreviewMode ? 'active' : ''}`}
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {isPreviewMode ? 'Exit Preview' : 'Preview'}
                    </button>
                    <div className="featured-count">
                        <span className="count">{featuredProducts.length}</span>
                        <span className="label">Featured Products</span>
                    </div>
                </div>
            </div>

            {/* Preview Mode */}
            {isPreviewMode && (
                <div className="preview-container">
                    <div className="featured-section-preview">
                        <div className="section-header">
                            <h2>Featured Products</h2>
                        </div>
                        <div className="products-slider">
                            <button
                                className="nav-btn prev"
                                onClick={prevSlide}
                                disabled={currentSlide === 0}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="products-container">
                                <div
                                    className="products-track"
                                    style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                                >
                                    {featuredProductsData.map((product) => (
                                        <div key={product.id} className="product-card">
                                            {product.onSale && <div className="sale-badge">SALE</div>}
                                            <div className="product-image">
                                                <img src={product.image} alt={product.title} />
                                            </div>
                                            <div className="product-info">
                                                <h3 className="product-title">{product.title}</h3>
                                                <div className="product-price">
                                                    {product.onSale && (
                                                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                                    )}
                                                    <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="nav-btn next"
                                onClick={nextSlide}
                                disabled={currentSlide >= featuredProductsData.length - 4}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Management Mode */}
            {!isPreviewMode && (
                <div className="management-container">
                    {/* Filters */}
                    <div className="filters-section">
                        <div className="filters-header">
                            <h3>Filter Products</h3>
                            <button className="clear-filters-btn" onClick={clearFilters}>
                                Clear All Filters
                            </button>
                        </div>

                        <div className="filters-grid">
                            <div className="filter-group">
                                <label>Seller</label>
                                <select name="seller" value={filters.seller} onChange={handleFilterChange}>
                                    <option value="">All Sellers</option>
                                    {uniqueSellers.map(seller => (
                                        <option key={seller} value={seller}>{seller}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={filters.title}
                                    onChange={handleFilterChange}
                                    placeholder="Search by title..."
                                />
                            </div>

                            <div className="filter-group">
                                <label>Min Price</label>
                                <input
                                    type="number"
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="filter-group">
                                <label>Max Price</label>
                                <input
                                    type="number"
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    placeholder="999"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div className="filter-group">
                                <label>Date From</label>
                                <input
                                    type="date"
                                    name="dateFrom"
                                    value={filters.dateFrom}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="filter-group">
                                <label>Date To</label>
                                <input
                                    type="date"
                                    name="dateTo"
                                    value={filters.dateTo}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div className="filter-group">
                                <label>Sale Status</label>
                                <select name="onSale" value={filters.onSale} onChange={handleFilterChange}>
                                    <option value="all">All Products</option>
                                    <option value="sale">On Sale</option>
                                    <option value="regular">Regular Price</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Sort By</label>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="dateAdded">Date Added</option>
                                    <option value="title">Title</option>
                                    <option value="salePrice">Price</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>Order</label>
                                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                    <option value="desc">Descending</option>
                                    <option value="asc">Ascending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="products-table-section">
                        <div className="table-header">
                            <h3>Products ({filteredProducts.length} found)</h3>
                            <div className="results-info">
                                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length}
                            </div>
                        </div>

                        <div className="products-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Featured</th>
                                        <th>Product</th>
                                        <th>Seller</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Date Added</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProducts.map((product) => (
                                        <tr key={product.id} className={featuredProducts.includes(product.id) ? 'featured' : ''}>
                                            <td>
                                                <button
                                                    className={`featured-toggle ${featuredProducts.includes(product.id) ? 'active' : ''}`}
                                                    onClick={() => toggleFeatured(product.id)}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td>
                                                <div className="product-cell">
                                                    <img src={product.image} alt={product.title} className="product-thumb" />
                                                    <div className="product-details">
                                                        <span className="product-name">{product.title}</span>
                                                        <span className="product-category">{product.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product.seller}</td>
                                            <td>
                                                <div className="price-cell">
                                                    {product.onSale && (
                                                        <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                                    )}
                                                    <span className="current-price">${product.salePrice.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td>
                                                {product.onSale ? (
                                                    <span className="status-badge sale">Sale</span>
                                                ) : (
                                                    <span className="status-badge regular">Regular</span>
                                                )}
                                            </td>
                                            <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`stock-indicator ${product.stock < 20 ? 'low' : 'normal'}`}>
                                                    {product.stock}
                                                </span>
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
                                    className="page-btn"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    First
                                </button>
                                <button
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                <div className="page-numbers">
                                    {[...Array(totalPages)].map((_, index) => {
                                        const pageNum = index + 1
                                        if (
                                            pageNum === 1 ||
                                            pageNum === totalPages ||
                                            (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                >
                                                    {pageNum}
                                                </button>
                                            )
                                        } else if (
                                            pageNum === currentPage - 3 ||
                                            pageNum === currentPage + 3
                                        ) {
                                            return <span key={pageNum} className="page-ellipsis">...</span>
                                        }
                                        return null
                                    })}
                                </div>

                                <button
                                    className="page-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                                <button
                                    className="page-btn"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    Last
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Featured Products Order */}
                    {featuredProducts.length > 0 && (
                        <div className="featured-order-section">
                            <h3>Featured Products Order ({featuredProducts.length} selected)</h3>
                            <div className="featured-products-list">
                                {featuredProductsData.map((product, index) => (
                                    <div key={product.id} className="featured-product-item">
                                        <div className="order-number">#{index + 1}</div>
                                        <img src={product.image} alt={product.title} />
                                        <div className="product-info">
                                            <span className="title">{product.title}</span>
                                            <span className="price">${product.salePrice.toFixed(2)}</span>
                                        </div>
                                        {/* <div className="order-controls">
                                            <button
                                                className="move-btn"
                                                onClick={() => moveFeaturedProduct(index, Math.max(0, index - 1))}
                                                disabled={index === 0}
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                className="move-btn"
                                                onClick={() => moveFeaturedProduct(index, Math.min(featuredProducts.length - 1, index + 1))}
                                                disabled={index === featuredProducts.length - 1}
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div> */}
                                        <button
                                            className="remove-btn"
                                            onClick={() => toggleFeatured(product.id)}
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FeaturesProducts