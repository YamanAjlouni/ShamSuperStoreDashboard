import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
    ArrowLeft, Edit, Share2, Star, Eye, Archive, RotateCcw, Trash2,
    Package, Truck, Shield, Clock, MapPin
} from 'lucide-react'
import './ProductDetails.scss'

const ProductDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showStatusModal, setShowStatusModal] = useState(false)
    const [statusAction, setStatusAction] = useState('')

    // Check if we're in preview mode (coming from ProductForm)
    const isPreviewMode = location.state?.productData || id === 'new'
    const previewData = location.state?.productData

    useEffect(() => {
        if (isPreviewMode && previewData) {
            // Use preview data from ProductForm
            const formattedProduct = {
                ...previewData,
                images: previewData.images.length > 0 ? previewData.images : ['https://via.placeholder.com/600'],
                rating: 4.5,
                reviewCount: 128,
                sold: 250,
                views: 1847,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            setProduct(formattedProduct)
        } else if (id && id !== 'new') {
            // Mock loading existing product data
            const mockProduct = {
                id: parseInt(id),
                name: 'Wireless Bluetooth Headphones',
                shortDescription: 'High-quality wireless headphones with noise cancellation',
                longDescription: 'These premium wireless headphones feature advanced noise cancellation technology, superior sound quality, and comfortable over-ear design. Perfect for music lovers and professionals who demand the best audio experience.',
                images: [
                    'https://via.placeholder.com/600',
                    'https://via.placeholder.com/600/FF0000',
                    'https://via.placeholder.com/600/00FF00',
                    'https://via.placeholder.com/600/0000FF'
                ],
                price: '99.99',
                salePrice: '79.99',
                onSale: true,
                saleStartDate: '2024-01-01',
                saleEndDate: '2024-12-31',
                quantityPricing: [
                    { minQuantity: 5, price: '89.99' },
                    { minQuantity: 10, price: '84.99' }
                ],
                category: 'Electronics',
                subcategory: 'Audio',
                subSubcategory: 'Headphones',
                stock: '45',
                sku: 'WBH-001',
                status: 'published',
                soldIndividually: false,
                weight: '0.35',
                dimensions: {
                    length: '20',
                    width: '18',
                    height: '8'
                },
                shippingClass: 'Standard',
                processTime: '2 days',
                deliveryDriverPickup: 'Warehouse A',
                color: 'Black',
                condition: 'New',
                size: 'One Size',
                brand: 'SoundMax',
                tags: ['wireless', 'bluetooth', 'noise-canceling'],
                customAttributes: [
                    { name: 'Warranty', value: '2 years' },
                    { name: 'Battery Life', value: '30 hours' },
                    { name: 'Charging Time', value: '2 hours' },
                    { name: 'Bluetooth Version', value: '5.0' }
                ],
                rating: 4.5,
                reviewCount: 128,
                sold: 250,
                views: 1847,
                createdAt: '2024-01-15T10:30:00Z',
                updatedAt: '2024-01-20T14:22:00Z'
            }
            setProduct(mockProduct)
        }
    }, [id, isPreviewMode, previewData])

    const handleStatusChange = (action) => {
        setStatusAction(action)
        setShowStatusModal(true)
    }

    const confirmStatusChange = () => {
        // Update product status
        setProduct(prev => ({ ...prev, status: statusAction }))
        setShowStatusModal(false)
        setStatusAction('')
    }

    const confirmDelete = () => {
        console.log('Product deleted')
        setShowDeleteModal(false)
        navigate('/seller/products')
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            published: { class: 'status--published', text: 'Published' },
            private: { class: 'status--private', text: 'Private' },
            archived: { class: 'status--archived', text: 'Archived' }
        }
        const config = statusConfig[status] || statusConfig.private
        return <span className={`status-badge ${config.class}`}>{config.text}</span>
    }

    const getCurrentPrice = () => {
        if (product.onSale && product.salePrice) {
            return parseFloat(product.salePrice)
        }
        return parseFloat(product.price)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="loading">Loading...</div>
            </div>
        )
    }

    return (
        <div className="product-details-page">
            {/* Header */}
            <div className="details-header">
                <div className="header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate(isPreviewMode ? -1 : '/seller/products')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="header-text">
                        <h1>{isPreviewMode ? 'Product Preview' : 'Product Details'}</h1>
                        <div className="product-meta">
                            <span className="product-sku">SKU: {product.sku}</span>
                            {getStatusBadge(product.status)}
                            {!isPreviewMode && (
                                <span className="product-views">
                                    <Eye size={14} />
                                    {product.views} views
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    {!isPreviewMode && (
                        <>
                            <button
                                className="action-btn share-btn"
                                onClick={() => console.log('Share product')}
                            >
                                <Share2 size={16} />
                                Share
                            </button>
                            <button
                                className="action-btn edit-btn"
                                onClick={() => navigate(`/seller/products/edit/${product.id}`)}
                            >
                                <Edit size={16} />
                                Edit
                            </button>
                            {product.status === 'private' && (
                                <button
                                    className="action-btn publish-btn"
                                    onClick={() => handleStatusChange('published')}
                                >
                                    <RotateCcw size={16} />
                                    Publish
                                </button>
                            )}
                            {product.status === 'published' && (
                                <button
                                    className="action-btn archive-btn"
                                    onClick={() => handleStatusChange('archived')}
                                >
                                    <Archive size={16} />
                                    Archive
                                </button>
                            )}
                            {product.status === 'archived' && (
                                <button
                                    className="action-btn publish-btn"
                                    onClick={() => handleStatusChange('published')}
                                >
                                    <RotateCcw size={16} />
                                    Restore
                                </button>
                            )}
                            <button
                                className="action-btn delete-btn"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="details-content">
                {/* Product Images and Basic Info */}
                <div className="product-main">
                    <div className="product-images">
                        <div className="main-image">
                            <img src={product.images[selectedImage]} alt={product.name} />
                        </div>
                        {product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <div className="product-title">
                            <h2>{product.name}</h2>
                            <p className="short-description">{product.shortDescription}</p>
                        </div>

                        {!isPreviewMode && (
                            <div className="product-stats">
                                <div className="rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < Math.floor(product.rating) ? 'filled' : ''}
                                            />
                                        ))}
                                    </div>
                                    <span className="rating-value">{product.rating}</span>
                                    <span className="review-count">({product.reviewCount} reviews)</span>
                                    <span className="sold-count">{product.sold} sold</span>
                                </div>
                            </div>
                        )}

                        <div className="pricing">
                            <div className="price-main">
                                {product.onSale ? (
                                    <>
                                        <span className="sale-price">${product.salePrice}</span>
                                        <span className="original-price">${product.price}</span>
                                        <span className="discount-badge">
                                            {Math.round(((parseFloat(product.price) - parseFloat(product.salePrice)) / parseFloat(product.price)) * 100)}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <span className="regular-price">${product.price}</span>
                                )}
                            </div>

                            {product.quantityPricing && product.quantityPricing.length > 0 && (
                                <div className="quantity-pricing">
                                    <h4>Bulk Pricing</h4>
                                    <div className="pricing-tiers">
                                        {product.quantityPricing.map((tier, index) => (
                                            <div key={index} className="pricing-tier">
                                                <span className="quantity">{tier.minQuantity}+ units</span>
                                                <span className="price">${tier.price} each</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isPreviewMode && (
                            <div className="seller-info-section">
                                <div className="stock-info">
                                    <h4>Inventory Status</h4>
                                    <span className={`stock-status ${parseInt(product.stock) > 10 ? 'in-stock' : parseInt(product.stock) > 0 ? 'low-stock' : 'out-of-stock'}`}>
                                        {parseInt(product.stock) > 10 ? `In Stock (${product.stock} units)` : parseInt(product.stock) > 0 ? `Low Stock (${product.stock} units)` : 'Out of Stock'}
                                    </span>
                                </div>

                                {product.soldIndividually && (
                                    <div className="sale-type-info">
                                        <h4>Sale Type</h4>
                                        <span className="sale-type-badge">Sold Individually</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="product-details-tabs">
                    <div className="tabs-content">
                        {/* Description */}
                        <div className="tab-section">
                            <h3>Description</h3>
                            <div className="description-content">
                                <p>{product.longDescription}</p>
                            </div>
                        </div>

                        {/* Specifications */}
                        <div className="tab-section">
                            <h3>Specifications</h3>
                            <div className="specifications">
                                <div className="spec-grid">
                                    <div className="spec-item">
                                        <span className="spec-label">Brand:</span>
                                        <span className="spec-value">{product.brand}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">SKU:</span>
                                        <span className="spec-value">{product.sku}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Condition:</span>
                                        <span className="spec-value">{product.condition}</span>
                                    </div>
                                    {product.color && (
                                        <div className="spec-item">
                                            <span className="spec-label">Color:</span>
                                            <span className="spec-value">{product.customColor || product.color}</span>
                                        </div>
                                    )}
                                    {product.size && (
                                        <div className="spec-item">
                                            <span className="spec-label">Size:</span>
                                            <span className="spec-value">{product.size}</span>
                                        </div>
                                    )}
                                    {product.weight && (
                                        <div className="spec-item">
                                            <span className="spec-label">Weight:</span>
                                            <span className="spec-value">{product.weight} kg</span>
                                        </div>
                                    )}
                                    {product.dimensions && (product.dimensions.length || product.dimensions.width || product.dimensions.height) && (
                                        <div className="spec-item">
                                            <span className="spec-label">Dimensions:</span>
                                            <span className="spec-value">
                                                {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {product.customAttributes && product.customAttributes.length > 0 && (
                                    <div className="custom-attributes">
                                        <h4>Additional Specifications</h4>
                                        <div className="spec-grid">
                                            {product.customAttributes.map((attr, index) => (
                                                <div key={index} className="spec-item">
                                                    <span className="spec-label">{attr.name}:</span>
                                                    <span className="spec-value">{attr.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Shipping & Returns */}
                        <div className="tab-section">
                            <h3>Shipping & Returns</h3>
                            <div className="shipping-info">
                                <div className="shipping-grid">
                                    <div className="shipping-item">
                                        <div className="shipping-icon">
                                            <Truck size={20} />
                                        </div>
                                        <div className="shipping-details">
                                            <h4>Shipping Class</h4>
                                            <p>{product.shippingClass}</p>
                                        </div>
                                    </div>
                                    <div className="shipping-item">
                                        <div className="shipping-icon">
                                            <Clock size={20} />
                                        </div>
                                        <div className="shipping-details">
                                            <h4>Processing Time</h4>
                                            <p>{product.processTime}</p>
                                        </div>
                                    </div>
                                    {product.deliveryDriverPickup && (
                                        <div className="shipping-item">
                                            <div className="shipping-icon">
                                                <MapPin size={20} />
                                            </div>
                                            <div className="shipping-details">
                                                <h4>Pickup Location</h4>
                                                <p>{product.deliveryDriverPickup}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="shipping-item">
                                        <div className="shipping-icon">
                                            <Shield size={20} />
                                        </div>
                                        <div className="shipping-details">
                                            <h4>Return Policy</h4>
                                            <p>30-day return policy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Data */}
                        {!isPreviewMode && (
                            <div className="tab-section">
                                <h3>Product Data</h3>
                                <div className="product-data">
                                    <div className="data-grid">
                                        <div className="data-item">
                                            <span className="data-label">Created:</span>
                                            <span className="data-value">{formatDate(product.createdAt)}</span>
                                        </div>
                                        <div className="data-item">
                                            <span className="data-label">Last Updated:</span>
                                            <span className="data-value">{formatDate(product.updatedAt)}</span>
                                        </div>
                                        <div className="data-item">
                                            <span className="data-label">Status:</span>
                                            <span className="data-value">{product.status}</span>
                                        </div>
                                        <div className="data-item">
                                            <span className="data-label">Stock:</span>
                                            <span className="data-value">{product.stock} units</span>
                                        </div>
                                        {product.soldIndividually && (
                                            <div className="data-item">
                                                <span className="data-label">Sale Type:</span>
                                                <span className="data-value">Sold Individually</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Categories & Tags */}
                        <div className="tab-section">
                            <h3>Categories & Tags</h3>
                            <div className="categories-tags">
                                <div className="categories">
                                    <h4>Categories</h4>
                                    <div className="category-path">
                                        <span className="category">{product.category}</span>
                                        {product.subcategory && (
                                            <>
                                                <span className="separator">→</span>
                                                <span className="subcategory">{product.subcategory}</span>
                                            </>
                                        )}
                                        {product.subSubcategory && (
                                            <>
                                                <span className="separator">→</span>
                                                <span className="sub-subcategory">{product.subSubcategory}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {product.tags && product.tags.length > 0 && (
                                    <div className="tags">
                                        <h4>Tags</h4>
                                        <div className="tags-list">
                                            {product.tags.map((tag, index) => (
                                                <span key={index} className="tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
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

            {/* Status Change Modal */}
            {showStatusModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Status Change</h3>
                        <p>
                            Are you sure you want to {statusAction === 'published' ? 'publish' : statusAction === 'archived' ? 'archive' : 'update'} "{product.name}"?
                        </p>
                        <div className="modal-actions">
                            <button
                                className="cancel-btn"
                                onClick={() => setShowStatusModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`action-btn ${statusAction === 'published' ? 'publish-btn' : 'archive-btn'}`}
                                onClick={confirmStatusChange}
                            >
                                {statusAction === 'published' ? 'Publish' : statusAction === 'archived' ? 'Archive' : 'Update'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails