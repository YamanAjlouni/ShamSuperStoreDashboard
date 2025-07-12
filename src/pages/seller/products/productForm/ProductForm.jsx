import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft, Upload, X, Plus, Minus, Save,
    Eye, EyeOff, Package, Tag, DollarSign,
    Image as ImageIcon, FileText, Settings, Truck
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
        saleStartDate: '',
        saleEndDate: '',
        quantityPricing: [],
        category: '',
        subcategory: '',
        subSubcategory: '',
        stock: '',
        sku: '',
        status: 'private',
        soldIndividually: false,
        weight: '',
        dimensions: {
            length: '',
            width: '',
            height: ''
        },
        shippingClass: '',
        processTime: '',
        deliveryDriverPickup: '',
        shippingType: 'free', // Keep original default
        shippingFlatRate: '',
        shippingPercentage: '',
        color: '',
        customColor: '',
        condition: '',
        size: '',
        brand: '',
        tags: [],
        customAttributes: []
    })

    const [dragActive, setDragActive] = useState(false)
    const [activeTab, setActiveTab] = useState('general')
    const [showCustomColor, setShowCustomColor] = useState(false)

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

    const subSubcategories = {
        'Audio': ['Headphones', 'Speakers', 'Amplifiers', 'Microphones'],
        'Computing': ['Laptops', 'Desktops', 'Monitors', 'Peripherals'],
        'Gaming': ['Consoles', 'Games', 'Accessories', 'PC Gaming'],
        'T-Shirts': ['Casual', 'Formal', 'Sports', 'Graphic'],
        'Pants': ['Jeans', 'Chinos', 'Shorts', 'Formal'],
        'Kitchen': ['Appliances', 'Cookware', 'Utensils', 'Storage'],
        'Bedroom': ['Furniture', 'Bedding', 'Decor', 'Storage']
    }

    const commonColors = [
        'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple',
        'Pink', 'Gray', 'Brown', 'Navy', 'Maroon', 'Teal', 'Gold', 'Silver'
    ]

    const shippingClasses = [
        'Standard',
        'Small Items',
        'Bulky Goods',
        'Fragile Items',
        'Hazardous Materials'
    ]

    const shippingTypes = [
        { value: 'admin_default', label: 'System Default (Admin Configured)' },
        { value: 'free', label: 'Free Shipping' },
        { value: 'flat', label: 'Flat Rate' },
        { value: 'percentage', label: 'Percentage of Order Total' }
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
                shippingType: 'admin_default',
                shippingFlatRate: '',
                shippingPercentage: '',
                color: 'Black',
                customColor: '',
                condition: 'New',
                size: 'One Size',
                brand: 'SoundMax',
                tags: ['wireless', 'bluetooth', 'noise-canceling'],
                customAttributes: [
                    { name: 'Warranty', value: '2 years' },
                    { name: 'Battery Life', value: '30 hours' }
                ]
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

    const handleShippingTypeChange = (value) => {
        setFormData(prev => ({
            ...prev,
            shippingType: value,
            // Reset type-specific fields
            shippingFlatRate: '',
            shippingPercentage: ''
        }))
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

    const addQuantityPricing = () => {
        setFormData(prev => ({
            ...prev,
            quantityPricing: [...prev.quantityPricing, { minQuantity: '', price: '' }]
        }))
    }

    const removeQuantityPricing = (index) => {
        setFormData(prev => ({
            ...prev,
            quantityPricing: prev.quantityPricing.filter((_, i) => i !== index)
        }))
    }

    const updateQuantityPricing = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            quantityPricing: prev.quantityPricing.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }))
    }

    // Carrier handlers
    const handleCarrierToggle = (carrierValue, checked) => {
        setFormData(prev => ({
            ...prev,
            enabledCarriers: checked
                ? [...prev.enabledCarriers, carrierValue]
                : prev.enabledCarriers.filter(c => c !== carrierValue)
        }))
    }

    const addCustomAttribute = () => {
        const name = prompt('Enter attribute name:')
        const value = prompt('Enter attribute value:')
        if (name && value) {
            setFormData(prev => ({
                ...prev,
                customAttributes: [...prev.customAttributes, { name, value }]
            }))
        }
    }

    const removeCustomAttribute = (index) => {
        setFormData(prev => ({
            ...prev,
            customAttributes: prev.customAttributes.filter((_, i) => i !== index)
        }))
    }

    const handleColorChange = (color) => {
        if (color === 'custom') {
            setShowCustomColor(true)
            setFormData(prev => ({ ...prev, color: 'custom' }))
        } else {
            setShowCustomColor(false)
            setFormData(prev => ({ ...prev, color, customColor: '' }))
        }
    }

    const calculateShippingPreview = (scenario) => {
        if (!formData.shippingType) return 'Select shipping method'

        switch (formData.shippingType) {
            case 'free':
                return 'Free'

            case 'flat':
                return formData.shippingFlatRate ? `$${formData.shippingFlatRate}` : 'Set flat rate'

            case 'percentage':
                if (!formData.shippingPercentage) return 'Set percentage'
                const orderValues = { local: 100, regional: 100, international: 100 }
                const cost = (orderValues[scenario] * parseFloat(formData.shippingPercentage) / 100).toFixed(2)
                return `$${cost}`

            case 'distance_based':
                if (!formData.baseDistanceRate) return 'Set distance rate'
                const distances = { local: 10, regional: 50, international: 0 }
                const distanceCost = (distances[scenario] * parseFloat(formData.baseDistanceRate)).toFixed(2)
                const minCharge = parseFloat(formData.minimumDistanceCharge || 0)
                const finalCost = Math.max(parseFloat(distanceCost), minCharge).toFixed(2)
                return scenario === 'international' ? 'Not available' : `$${finalCost}`

            case 'weight_based':
                if (!formData.weightTiers.length) return 'Set weight tiers'
                const weight = 2 // 2kg example
                const tier = formData.weightTiers.find(t =>
                    weight >= parseFloat(t.minWeight || 0) &&
                    (!t.maxWeight || weight <= parseFloat(t.maxWeight))
                )
                return tier && tier.rate ? `$${tier.rate}` : 'No matching tier'

            case 'admin_default':
                return 'System calculated'

            case 'realtime_carrier':
                return formData.enabledCarriers.length ? 'Live rates' : 'Select carriers'

            default:
                return 'Unknown method'
        }
    }

    const handlePreview = () => {
        navigate(`/seller/products/view/${id || 'new'}`, { state: { productData: formData } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)

        // Here you would typically send the data to your API
        alert(isEditMode ? 'Product updated successfully!' : 'Product created successfully!')
        navigate('/seller/products')
    }

    const tabs = [
        { id: 'general', label: 'General', icon: <Package size={16} /> },
        { id: 'images', label: 'Images', icon: <ImageIcon size={16} /> },
        { id: 'pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
        { id: 'inventory', label: 'Inventory', icon: <Settings size={16} /> },
        { id: 'shipping', label: 'Shipping', icon: <Truck size={16} /> },
        { id: 'attributes', label: 'Attributes', icon: <Tag size={16} /> }
    ]

    return (
        <div className="product-form-page">
            <div className="form-header">
                <div className="header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/seller/products')}
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
                        onClick={handlePreview}
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
                                            onChange={(e) => {
                                                handleInputChange('category', e.target.value)
                                                handleInputChange('subcategory', '')
                                                handleInputChange('subSubcategory', '')
                                            }}
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
                                            onChange={(e) => {
                                                handleInputChange('subcategory', e.target.value)
                                                handleInputChange('subSubcategory', '')
                                            }}
                                            disabled={!formData.category}
                                        >
                                            <option value="">Select subcategory</option>
                                            {formData.category && subcategories[formData.category]?.map(subcat => (
                                                <option key={subcat} value={subcat}>{subcat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subSubcategory">Sub-subcategory</label>
                                        <select
                                            id="subSubcategory"
                                            value={formData.subSubcategory}
                                            onChange={(e) => handleInputChange('subSubcategory', e.target.value)}
                                            disabled={!formData.subcategory}
                                        >
                                            <option value="">Select sub-subcategory</option>
                                            {formData.subcategory && subSubcategories[formData.subcategory]?.map(subSubcat => (
                                                <option key={subSubcat} value={subSubcat}>{subSubcat}</option>
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
                                <h3>Basic Pricing</h3>
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

                                    <div className="form-group">
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

                                    {formData.onSale && (
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
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="saleStartDate">Sale Start Date</label>
                                                <input
                                                    type="date"
                                                    id="saleStartDate"
                                                    value={formData.saleStartDate}
                                                    onChange={(e) => handleInputChange('saleStartDate', e.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="saleEndDate">Sale End Date</label>
                                                <input
                                                    type="date"
                                                    id="saleEndDate"
                                                    value={formData.saleEndDate}
                                                    onChange={(e) => handleInputChange('saleEndDate', e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Quantity Pricing</h3>
                                <p className="section-description">Offer discounts for bulk purchases to encourage larger orders</p>
                                <div className="quantity-pricing">
                                    <div className="pricing-header">
                                        <h4>Pricing Tiers</h4>
                                        {formData.quantityPricing.length > 0 && (
                                            <span className="pricing-count">
                                                {formData.quantityPricing.length} tier{formData.quantityPricing.length !== 1 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>

                                    {formData.quantityPricing.length === 0 ? (
                                        <div className="empty-state">
                                            <div className="empty-icon">📊</div>
                                            <h5 className="empty-title">No quantity pricing set</h5>
                                            <p className="empty-description">
                                                Add pricing tiers to offer discounts for bulk purchases
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="pricing-tiers">
                                            {formData.quantityPricing.map((pricing, index) => (
                                                <div key={index} className="quantity-pricing-row">
                                                    <div className="pricing-row-header">
                                                        <span className="tier-label">Tier {index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeQuantityPricing(index)}
                                                            className="remove-pricing-btn"
                                                            title="Remove this pricing tier"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="pricing-inputs">
                                                        <div className="pricing-input-group quantity-input">
                                                            <label className="input-label">
                                                                <Package size={16} className="input-icon" />
                                                                Minimum Quantity
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="pricing-input"
                                                                value={pricing.minQuantity}
                                                                onChange={(e) => updateQuantityPricing(index, 'minQuantity', e.target.value)}
                                                                placeholder="e.g., 5"
                                                                min="1"
                                                            />
                                                        </div>
                                                        <div className="pricing-input-group price-input">
                                                            <label className="input-label">
                                                                <DollarSign size={16} className="input-icon" />
                                                                Price per Unit
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="pricing-input"
                                                                value={pricing.price}
                                                                onChange={(e) => updateQuantityPricing(index, 'price', e.target.value)}
                                                                placeholder="0.00"
                                                                step="0.01"
                                                            />
                                                        </div>
                                                    </div>

                                                    {pricing.minQuantity && pricing.price && formData.price && (
                                                        <div className="pricing-preview">
                                                            <p className="preview-text">
                                                                Buy {pricing.minQuantity}+ units at ${pricing.price} each
                                                                {parseFloat(pricing.price) < parseFloat(formData.price) && (
                                                                    <span className="savings">
                                                                        {' '}(Save ${(parseFloat(formData.price) - parseFloat(pricing.price)).toFixed(2)} per unit)
                                                                    </span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={addQuantityPricing}
                                        className="add-pricing-btn"
                                    >
                                        <Plus size={18} className="add-icon" />
                                        Add Pricing Tier
                                    </button>
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

                                    <div className="form-group full-width">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={formData.soldIndividually}
                                                onChange={(e) => handleInputChange('soldIndividually', e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                            Sold individually (customers can only buy one at a time)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Physical Properties</h3>
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
                                <h3>Shipping Configuration</h3>
                                <div className="form-grid">
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

                                    <div className="form-group">
                                        <label htmlFor="deliveryDriverPickup">Delivery Driver Pickup Location</label>
                                        <input
                                            type="text"
                                            id="deliveryDriverPickup"
                                            value={formData.deliveryDriverPickup}
                                            onChange={(e) => handleInputChange('deliveryDriverPickup', e.target.value)}
                                            placeholder="Enter pickup location"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Shipping Rates</h3>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="shippingType">Shipping Type *</label>
                                        <select
                                            id="shippingType"
                                            value={formData.shippingType}
                                            onChange={(e) => handleShippingTypeChange(e.target.value)}
                                            required
                                        >
                                            {shippingTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.shippingType === 'flat' && (
                                        <div className="form-group">
                                            <label htmlFor="shippingFlatRate">Flat Rate Amount ($) *</label>
                                            <div className="input-with-icon">
                                                <DollarSign size={16} className="input-icon" />
                                                <input
                                                    type="number"
                                                    id="shippingFlatRate"
                                                    value={formData.shippingFlatRate}
                                                    onChange={(e) => handleInputChange('shippingFlatRate', e.target.value)}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                            <small className="field-help">Enter the fixed shipping cost for all orders</small>
                                        </div>
                                    )}

                                    {formData.shippingType === 'percentage' && (
                                        <div className="form-group">
                                            <label htmlFor="shippingPercentage">Percentage of Order Total (%) *</label>
                                            <input
                                                type="number"
                                                id="shippingPercentage"
                                                value={formData.shippingPercentage}
                                                onChange={(e) => handleInputChange('shippingPercentage', e.target.value)}
                                                placeholder="5"
                                                step="0.1"
                                                min="0"
                                                max="100"
                                                required
                                            />
                                            <small className="field-help">Enter the percentage of order total to charge for shipping</small>
                                        </div>
                                    )}

                                    {formData.shippingType === 'admin_default' && (
                                        <div className="form-group full-width">
                                            <div className="admin-default-info">
                                                <div className="info-icon">⚙️</div>
                                                <div className="info-content">
                                                    <h4>Using System Default Shipping Rules</h4>
                                                    <p>
                                                        This product will use the shipping calculation method configured by your administrator.
                                                        The system will automatically calculate shipping based on the global settings.
                                                    </p>
                                                    <div className="system-rules-preview">
                                                        <h5>Current System Settings:</h5>
                                                        <ul>
                                                            <li>Calculation Method: Distance + Weight Hybrid</li>
                                                            <li>Base Rate: $5.00</li>
                                                            <li>Weight Multiplier: $0.50 per kg</li>
                                                            <li>Distance Multiplier: $0.25 per km</li>
                                                            <li>Minimum Charge: $3.00</li>
                                                            <li>Maximum Charge: $50.00</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.shippingType === 'free' && (
                                        <div className="form-group full-width">
                                            <div className="shipping-info-box">
                                                <div className="info-icon">🚚</div>
                                                <div className="info-content">
                                                    <h4>Free Shipping Selected</h4>
                                                    <p>No shipping charges will be applied to orders for this product. This can help increase conversion rates and customer satisfaction.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(formData.shippingType === 'flat' && formData.shippingFlatRate) && (
                                        <div className="form-group full-width">
                                            <div className="shipping-preview">
                                                <h4>Shipping Preview</h4>
                                                <p>Customers will be charged <strong>${formData.shippingFlatRate}</strong> for shipping regardless of order size.</p>
                                            </div>
                                        </div>
                                    )}

                                    {(formData.shippingType === 'percentage' && formData.shippingPercentage) && (
                                        <div className="form-group full-width">
                                            <div className="shipping-preview">
                                                <h4>Shipping Preview</h4>
                                                <p>Customers will be charged <strong>{formData.shippingPercentage}%</strong> of their order total for shipping.</p>
                                                <div className="preview-examples">
                                                    <div className="example">
                                                        <span>$100 order:</span>
                                                        <span>${(100 * parseFloat(formData.shippingPercentage || 0) / 100).toFixed(2)} shipping</span>
                                                    </div>
                                                    <div className="example">
                                                        <span>$50 order:</span>
                                                        <span>${(50 * parseFloat(formData.shippingPercentage || 0) / 100).toFixed(2)} shipping</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'attributes' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Product Attributes</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="color">Color</label>
                                        <select
                                            id="color"
                                            value={formData.color}
                                            onChange={(e) => handleColorChange(e.target.value)}
                                        >
                                            <option value="">Select color</option>
                                            {commonColors.map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                            <option value="custom">Custom Color</option>
                                        </select>
                                    </div>

                                    {showCustomColor && (
                                        <div className="form-group">
                                            <label htmlFor="customColor">Custom Color</label>
                                            <input
                                                type="text"
                                                id="customColor"
                                                value={formData.customColor}
                                                onChange={(e) => handleInputChange('customColor', e.target.value)}
                                                placeholder="Enter custom color"
                                            />
                                        </div>
                                    )}

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

                            <div className="form-section">
                                <h3>Custom Attributes</h3>
                                <div className="custom-attributes">
                                    {formData.customAttributes.map((attr, index) => (
                                        <div key={index} className="custom-attribute-row">
                                            <div className="attribute-info">
                                                <span className="attribute-name">{attr.name}:</span>
                                                <span className="attribute-value">{attr.value}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeCustomAttribute(index)}
                                                className="remove-attribute-btn"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addCustomAttribute}
                                        className="add-attribute-btn"
                                    >
                                        <Plus size={16} />
                                        Add Custom Attribute
                                    </button>
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