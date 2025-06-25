import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft, Upload, X, Plus, Minus, Save,
    Eye, EyeOff, Package, Tag, DollarSign,
    Image as ImageIcon, FileText, Settings
} from 'lucide-react'
import './ProductForm.scss'

const ProductForm = ({ mode = 'add' }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = mode === 'edit' || id

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        images: [],
        price: '',
        salePrice: '',
        onSale: false,
        category: '',
        subcategory: '',
        stock: '',
        sku: '',
        status: 'private',
        weight: '',
        dimensions: {
            length: '',
            width: '',
            height: ''
        },
        shippingClass: '',
        processTime: '',
        color: '',
        condition: '',
        size: '',
        brand: '',
        tags: []
    })

    const [dragActive, setDragActive] = useState(false)
    const [activeTab, setActiveTab] = useState('general')

    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports & Recreation',
        'Books & Media',
        'Health & Beauty',
        'Automotive',
        'Baby & Kids'
    ]

    const subcategories = {
        'Electronics': ['Audio', 'Computing', 'Gaming', 'Mobile', 'Wearables'],
        'Clothing': ['T-Shirts', 'Pants', 'Shoes', 'Accessories', 'Outerwear'],
        'Home & Garden': ['Kitchen', 'Bedroom', 'Living Room', 'Garden', 'Tools'],
        'Sports & Recreation': ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'],
        'Books & Media': ['Books', 'Movies', 'Music', 'Games'],
        'Health & Beauty': ['Skincare', 'Makeup', 'Health Supplements', 'Personal Care'],
        'Automotive': ['Parts', 'Accessories', 'Tools', 'Care Products'],
        'Baby & Kids': ['Toys', 'Clothing', 'Care Products', 'Safety']
    }

    const shippingClasses = [
        'Standard',
        'Small Items',
        'Bulky Goods',
        'Fragile Items',
        'Hazardous Materials'
    ]

    const processTimes = [
        '1 day',
        '2 days',
        '3 days',
        '1 week',
        '2 weeks',
        '3 weeks',
        '4 weeks',
        '6 weeks',
        '8 weeks'
    ]

    const conditions = [
        'New',
        'Open Box',
        'Used - Like New',
        'Used - Good',
        'Used - Fair',
        'Refurbished'
    ]

    const sizes = [
        'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size'
    ]

    useEffect(() => {
        if (isEditMode && id) {
            // Mock loading existing product data
            const mockProduct = {
                name: 'Wireless Bluetooth Headphones',
                shortDescription: 'High-quality wireless headphones with noise cancellation',
                longDescription: 'These premium wireless headphones feature advanced noise cancellation technology, superior sound quality, and comfortable over-ear design. Perfect for music lovers and professionals.',
                images: ['https://via.placeholder.com/400', 'https://via.placeholder.com/400'],
                price: '99.99',
                salePrice: '79.99',
                onSale: true,
                category: 'Electronics',
                subcategory: 'Audio',
                stock: '45',
                sku: 'WBH-001',
                status: 'published',
                weight: '0.35',
                dimensions: {
                    length: '20',
                    width: '18',
                    height: '8'
                },
                shippingClass: 'Standard',
                processTime: '2 days',
                color: 'Black',
                condition: 'New',
                size: 'One Size',
                brand: 'SoundMax',
                tags: ['wireless', 'bluetooth', 'noise-canceling']
            }
            setFormData(mockProduct)
        }
    }, [isEditMode, id])

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.')
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }))
        }
    }

    const handleImageUpload = (files) => {
        const newImages = Array.from(files).map(file => URL.createObjectURL(file))
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages].slice(0, 10) // Max 10 images
        }))
    }

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }))
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files)
        }
    }

    const addTag = () => {
        const newTag = prompt('Enter tag name:')
        if (newTag && !formData.tags.includes(newTag.toLowerCase())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.toLowerCase()]
            }))
        }
    }

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)

        // Here you would typically send the data to your API
        alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!')
        navigate('/products')
    }

    const tabs = [
        { id: 'general', label: 'General', icon: <Package size={16} /> },
        { id: 'images', label: 'Images', icon: <ImageIcon size={16} /> },
        { id: 'pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
        { id: 'inventory', label: 'Inventory', icon: <Settings size={16} /> },
        { id: 'attributes', label: 'Attributes', icon: <Tag size={16} /> }
    ]

    return (
        <div className="product-form-page">
            <div className="form-header">
                <div className="header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/products')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="header-text">
                        <h1>{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
                        <p>{isEditMode ? 'Update product information' : 'Create a new product for your store'}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        className="preview-btn"
                        onClick={() => console.log('Preview product')}
                    >
                        <Eye size={16} />
                        Preview
                    </button>
                    <button
                        type="submit"
                        form="product-form"
                        className="save-btn"
                    >
                        <Save size={16} />
                        {isEditMode ? 'Update Product' : 'Save Product'}
                    </button>
                </div>
            </div>

            <div className="form-container">
                <div className="form-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form id="product-form" onSubmit={handleSubmit} className="product-form">
                    {activeTab === 'general' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label htmlFor="name">Product Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="sku">SKU</label>
                                        <input
                                            type="text"
                                            id="sku"
                                            value={formData.sku}
                                            onChange={(e) => handleInputChange('sku', e.target.value)}
                                            placeholder="Product SKU"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="brand">Brand</label>
                                        <input
                                            type="text"
                                            id="brand"
                                            value={formData.brand}
                                            onChange={(e) => handleInputChange('brand', e.target.value)}
                                            placeholder="Product brand"
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="shortDescription">Short Description</label>
                                        <textarea
                                            id="shortDescription"
                                            value={formData.shortDescription}
                                            onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                            placeholder="Brief product description"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="longDescription">Long Description</label>
                                        <textarea
                                            id="longDescription"
                                            value={formData.longDescription}
                                            onChange={(e) => handleInputChange('longDescription', e.target.value)}
                                            placeholder="Detailed product description"
                                            rows="6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Categories & Tags</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="category">Category *</label>
                                        <select
                                            id="category"
                                            value={formData.category}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            required
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subcategory">Subcategory</label>
                                        <select
                                            id="subcategory"
                                            value={formData.subcategory}
                                            onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                            disabled={!formData.category}
                                        >
                                            <option value="">Select subcategory</option>
                                            {formData.category && subcategories[formData.category]?.map(subcat => (
                                                <option key={subcat} value={subcat}>{subcat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Tags</label>
                                        <div className="tags-container">
                                            <div className="tags-list">
                                                {formData.tags.map((tag, index) => (
                                                    <span key={index} className="tag">
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(tag)}
                                                            className="remove-tag"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </span>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addTag}
                                                    className="add-tag-btn"
                                                >
                                                    <Plus size={16} />
                                                    Add Tag
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'images' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Product Images</h3>
                                <div className="images-upload">
                                    <div
                                        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <Upload size={48} />
                                        <h4>Drag & drop images here</h4>
                                        <p>or click to browse files</p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e.target.files)}
                                            className="file-input"
                                        />
                                    </div>

                                    {formData.images.length > 0 && (
                                        <div className="images-preview">
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image} alt={`Product ${index + 1}`} />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="remove-image"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    {index === 0 && (
                                                        <span className="primary-badge">Primary</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Pricing Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="price">Regular Price *</label>
                                        <div className="input-with-icon">
                                            <DollarSign size={16} className="input-icon" />
                                            <input
                                                type="number"
                                                id="price"
                                                value={formData.price}
                                                onChange={(e) => handleInputChange('price', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {isEditMode && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="salePrice">Sale Price</label>
                                                <div className="input-with-icon">
                                                    <DollarSign size={16} className="input-icon" />
                                                    <input
                                                        type="number"
                                                        id="salePrice"
                                                        value={formData.salePrice}
                                                        onChange={(e) => handleInputChange('salePrice', e.target.value)}
                                                        placeholder="0.00"
                                                        step="0.01"
                                                        disabled={!formData.onSale}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group full-width">
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.onSale}
                                                        onChange={(e) => handleInputChange('onSale', e.target.checked)}
                                                    />
                                                    <span className="checkmark"></span>
                                                    This product is on sale
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Inventory Management</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="stock">Stock Quantity *</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            value={formData.stock}
                                            onChange={(e) => handleInputChange('stock', e.target.value)}
                                            placeholder="0"
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status">Product Status</label>
                                        <select
                                            id="status"
                                            value={formData.status}
                                            onChange={(e) => handleInputChange('status', e.target.value)}
                                        >
                                            <option value="private">Private</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attributes' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Physical Attributes</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="weight">Weight (kg)</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            placeholder="0.0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shippingClass">Shipping Class</label>
                                        <select
                                            id="shippingClass"
                                            value={formData.shippingClass}
                                            onChange={(e) => handleInputChange('shippingClass', e.target.value)}
                                        >
                                            <option value="">Select shipping class</option>
                                            {shippingClasses.map(cls => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="processTime">Process Time</label>
                                        <select
                                            id="processTime"
                                            value={formData.processTime}
                                            onChange={(e) => handleInputChange('processTime', e.target.value)}
                                        >
                                            <option value="">Select process time</option>
                                            {processTimes.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group dimensions-group full-width">
                                        <label>Dimensions (cm)</label>
                                        <div className="dimensions-inputs">
                                            <div className="dimension-input">
                                                <label htmlFor="length">Length</label>
                                                <input
                                                    type="number"
                                                    id="length"
                                                    value={formData.dimensions.length}
                                                    onChange={(e) => handleInputChange('dimensions.length', e.target.value)}
                                                    placeholder="0"
                                                    step="0.1"
                                                />
                                            </div>
                                            <div className="dimension-input">
                                                <label htmlFor="width">Width</label>
                                                <input
                                                    type="number"
                                                    id="width"
                                                    value={formData.dimensions.width}
                                                    onChange={(e) => handleInputChange('dimensions.width', e.target.value)}
                                                    placeholder="0"
                                                    step="0.1"
                                                />
                                            </div>
                                            <div className="dimension-input">
                                                <label htmlFor="height">Height</label>
                                                <input
                                                    type="number"
                                                    id="height"
                                                    value={formData.dimensions.height}
                                                    onChange={(e) => handleInputChange('dimensions.height', e.target.value)}
                                                    placeholder="0"
                                                    step="0.1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Optional Attributes</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="color">Color</label>
                                        <input
                                            type="text"
                                            id="color"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange('color', e.target.value)}
                                            placeholder="Product color"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="condition">Condition</label>
                                        <select
                                            id="condition"
                                            value={formData.condition}
                                            onChange={(e) => handleInputChange('condition', e.target.value)}
                                        >
                                            <option value="">Select condition</option>
                                            {conditions.map(condition => (
                                                <option key={condition} value={condition}>{condition}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="size">Size</label>
                                        <select
                                            id="size"
                                            value={formData.size}
                                            onChange={(e) => handleInputChange('size', e.target.value)}
                                        >
                                            <option value="">Select size</option>
                                            {sizes.map(size => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ProductForm