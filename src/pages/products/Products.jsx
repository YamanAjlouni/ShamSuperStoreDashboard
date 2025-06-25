import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Plus, Search, Filter, Eye, Edit, Trash2, Archive,
    RotateCcw, CheckSquare, Square, ChevronDown
} from 'lucide-react'
import './Products.scss'

const Products = () => {
    const navigate = useNavigate()
    const [selectedProducts, setSelectedProducts] = useState([])
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        status: '',
        search: '',
        priceRange: '',
        view: ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showPublishModal, setShowPublishModal] = useState(false)
    const [productToAction, setProductToAction] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Mock data for products
    const mockProducts = [
        {
            id: 1,
            image: 'https://via.placeholder.com/60',
            name: 'Wireless Bluetooth Headphones',
            sku: 'WBH-001',
            status: 'published',
            stock: 'in_stock',
            stockCount: 45,
            price: 99.99,
            category: 'Electronics',
            subcategory: 'Audio',
            store: 'TechStore Pro',
            brand: 'SoundMax'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/60',
            name: 'Organic Cotton T-Shirt',
            sku: 'OCT-002',
            status: 'private',
            stock: 'low_stock',
            stockCount: 3,
            price: 29.99,
            category: 'Clothing',
            subcategory: 'T-Shirts',
            store: 'EcoWear',
            brand: 'GreenFashion'
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/60',
            name: 'Smart Watch Series 5',
            sku: 'SW5-003',
            status: 'published',
            stock: 'out_of_stock',
            stockCount: 0,
            price: 299.99,
            category: 'Electronics',
            subcategory: 'Wearables',
            store: 'GadgetHub',
            brand: 'TechWatch'
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/60',
            name: 'Ceramic Coffee Mug',
            sku: 'CCM-004',
            status: 'published',
            stock: 'in_stock',
            stockCount: 120,
            price: 15.99,
            category: 'Home & Garden',
            subcategory: 'Kitchen',
            store: 'HomeComfort',
            brand: 'CeramicCraft'
        },
        {
            id: 5,
            image: 'https://via.placeholder.com/60',
            name: 'Gaming Mechanical Keyboard',
            sku: 'GMK-005',
            status: 'private',
            stock: 'in_stock',
            stockCount: 25,
            price: 149.99,
            category: 'Electronics',
            subcategory: 'Gaming',
            store: 'GameGear',
            brand: 'MechKeys'
        }
    ]

    const categories = ['All Categories', 'Electronics', 'Clothing', 'Home & Garden']
    const brands = ['All Brands', 'SoundMax', 'GreenFashion', 'TechWatch', 'CeramicCraft', 'MechKeys']
    const statuses = ['All Status', 'published', 'private']
    const stockStatuses = ['All Stock', 'in_stock', 'low_stock', 'out_of_stock']
    const priceRanges = ['All Prices', '$0-$50', '$50-$100', '$100-$200', '$200+']
    const viewOptions = ['All', 'Published Only', 'Private Only']

    const getStatusBadge = (status) => {
        const statusClass = status === 'published' ? 'status--published' : 'status--private'
        return <span className={`status-badge ${statusClass}`}>{status}</span>
    }

    const getStockBadge = (stock, count) => {
        const stockConfig = {
            in_stock: { class: 'stock--in', text: `In Stock (${count})` },
            low_stock: { class: 'stock--low', text: `Low Stock (${count})` },
            out_of_stock: { class: 'stock--out', text: 'Out of Stock' }
        }
        const config = stockConfig[stock] || stockConfig.out_of_stock
        return <span className={`stock-badge ${config.class}`}>{config.text}</span>
    }

    const handleSelectAll = () => {
        if (selectedProducts.length === mockProducts.length) {
            setSelectedProducts([])
        } else {
            setSelectedProducts(mockProducts.map(p => p.id))
        }
    }

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const handleDelete = (product) => {
        setProductToAction(product)
        setShowDeleteModal(true)
    }

    const handlePublish = (product) => {
        setProductToAction(product)
        setShowPublishModal(true)
    }

    const confirmDelete = () => {
        console.log('Deleting product:', productToAction)
        setShowDeleteModal(false)
        setProductToAction(null)
    }

    const confirmPublish = () => {
        console.log('Publishing product:', productToAction)
        setShowPublishModal(false)
        setProductToAction(null)
    }

    const filteredProducts = mockProducts.filter(product => {
        return (
            (filters.category === '' || filters.category === 'All Categories' || product.category === filters.category) &&
            (filters.brand === '' || filters.brand === 'All Brands' || product.brand === filters.brand) &&
            (filters.status === '' || filters.status === 'All Status' || product.status === filters.status) &&
            (filters.search === '' || product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.sku.toLowerCase().includes(filters.search.toLowerCase()))
        )
    })

    const totalProducts = filteredProducts.length
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalProducts)
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    return (
        <div className="products-page">
            {/* Header */}
            <div className="products-header">
                <h1>Products</h1>
                <button
                    className="add-product-btn"
                    onClick={() => navigate('/products/new')}
                >
                    <Plus size={20} />
                    Add New Product
                </button>
            </div>

            {/* Filters */}
            <div className="products-filters">
                <div className="filters-left">
                    <span className="products-count">
                        Showing {startIndex + 1}-{endIndex} of {totalProducts} products
                    </span>
                </div>

                <div className="filters-center">
                    <div className="filter-group">
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                            className="filter-select"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.brand}
                            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                            className="filter-select"
                        >
                            {brands.map(brand => (
                                <option key={brand} value={brand === 'All Brands' ? '' : brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    <div className="filter-group">
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="filter-select"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status === 'All Status' ? '' : status}>
                                    {status}
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
                            placeholder="Search products..."
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th className="select-column">
                                <button onClick={handleSelectAll} className="select-all-btn">
                                    {selectedProducts.length === mockProducts.length ?
                                        <CheckSquare size={18} /> :
                                        <Square size={18} />
                                    }
                                </button>
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Status</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Taxonomies</th>
                            <th>View</th>
                            <th>Store</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.id} className="product-row">
                                <td className="select-column">
                                    <button
                                        onClick={() => handleSelectProduct(product.id)}
                                        className="select-btn"
                                    >
                                        {selectedProducts.includes(product.id) ?
                                            <CheckSquare size={18} /> :
                                            <Square size={18} />
                                        }
                                    </button>
                                </td>
                                <td className="image-column">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                </td>
                                <td className="name-column">
                                    <span className="product-name">{product.name}</span>
                                </td>
                                <td className="sku-column">{product.sku}</td>
                                <td className="status-column">
                                    {getStatusBadge(product.status)}
                                </td>
                                <td className="stock-column">
                                    {getStockBadge(product.stock, product.stockCount)}
                                </td>
                                <td className="price-column">${product.price}</td>
                                <td className="taxonomies-column">
                                    <div className="taxonomies">
                                        <span className="category">{product.category}</span>
                                        <span className="subcategory">{product.subcategory}</span>
                                    </div>
                                </td>
                                <td className="view-column">
                                    <button className="view-btn">
                                        <Eye size={16} />
                                    </button>
                                </td>
                                <td className="store-column">{product.store}</td>
                                <td className="actions-column">
                                    <div className="actions">
                                        <button
                                            className="action-btn edit-btn"
                                            onClick={() => navigate(`/products/edit/${product.id}`)}
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        {product.status === 'private' ? (
                                            <button
                                                className="action-btn publish-btn"
                                                onClick={() => handlePublish(product)}
                                                title="Publish"
                                            >
                                                <RotateCcw size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                className="action-btn archive-btn"
                                                title="Archive"
                                            >
                                                <Archive size={16} />
                                            </button>
                                        )}
                                        <button
                                            className="action-btn view-btn"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDelete(product)}
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
                        Page {currentPage} of {Math.ceil(totalProducts / itemsPerPage)}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalProducts / itemsPerPage)))}
                        disabled={currentPage === Math.ceil(totalProducts / itemsPerPage)}
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
                        <p>Are you sure you want to delete "{productToAction?.name}"? This action cannot be undone.</p>
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

            {/* Publish Modal */}
            {showPublishModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Publish</h3>
                        <p>Are you sure you want to publish "{productToAction?.name}"? This will make it visible to customers.</p>
                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowPublishModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="publish-btn"
                                onClick={confirmPublish}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products