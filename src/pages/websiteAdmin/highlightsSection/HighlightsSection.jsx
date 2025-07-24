import { useState, useRef } from 'react'
import './HighlightsSection.scss'

const HighlightsSection = () => {
    const [sections, setSections] = useState([
        {
            id: 1,
            name: 'Section 1 - Home & Lifestyle',
            isActive: true,
            highlights: [
                {
                    id: 11,
                    category: 'New Look',
                    title: 'Home Furniture',
                    buttonText: 'Shop',
                    buttonLink: '/furniture',
                    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 12,
                    category: 'New Products',
                    title: 'Bags and Luggage',
                    buttonText: 'Shop',
                    buttonLink: '/bags',
                    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 13,
                    category: 'At Lowest Price',
                    title: 'Arts and Accessories',
                    buttonText: 'Shop',
                    buttonLink: '/arts',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                }
            ]
        },
        {
            id: 2,
            name: 'Section 2 - Technology & Accessories',
            isActive: true,
            highlights: [
                {
                    id: 21,
                    category: 'New Items',
                    title: 'Smart Phones',
                    buttonText: 'Shop',
                    buttonLink: '/phones',
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 22,
                    category: 'New Products',
                    title: 'Bags and Luggage',
                    buttonText: 'Shop',
                    buttonLink: '/bags',
                    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 23,
                    category: 'At Lowest Price',
                    title: 'Arts and Accessories',
                    buttonText: 'Shop',
                    buttonLink: '/accessories',
                    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                }
            ]
        },
        {
            id: 3,
            name: 'Section 3 - Home Essentials',
            isActive: true,
            highlights: [
                {
                    id: 31,
                    category: 'Great Deals',
                    title: 'Shoes',
                    buttonText: 'Shop',
                    buttonLink: '/shoes',
                    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 32,
                    category: 'New Look',
                    title: 'Home Appliances',
                    buttonText: 'Shop',
                    buttonLink: '/appliances',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                },
                {
                    id: 33,
                    category: 'On Sale',
                    title: 'Laundry Supplies',
                    buttonText: 'Shop',
                    buttonLink: '/laundry',
                    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f8f9fa',
                    textColor: '#333333',
                    buttonColor: '#4f46e5'
                }
            ]
        },
        {
            id: 4,
            name: 'Section 4 - Sale Banners',
            isActive: true,
            highlights: [
                {
                    id: 41,
                    category: 'Special Offer',
                    title: 'Up to 50% off',
                    subtitle: 'Items on Sale',
                    buttonText: 'SHOP NOW',
                    buttonLink: '/sale',
                    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    backgroundColor: '#d97706',
                    textColor: '#ffffff',
                    buttonColor: '#4f46e5',
                    type: 'banner'
                },
                {
                    id: 42,
                    category: 'Limited Time',
                    title: 'Up to 50% off',
                    subtitle: 'Items on Sale',
                    buttonText: 'SHOP NOW',
                    buttonLink: '/sale',
                    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    backgroundColor: '#6b7280',
                    textColor: '#ffffff',
                    buttonColor: '#4f46e5',
                    type: 'banner'
                }
            ]
        },
        {
            id: 5,
            name: 'Section 5 - Mixed Layout',
            isActive: true,
            highlights: [
                {
                    id: 51,
                    category: 'Smart Technology',
                    title: 'Latest Gadgets',
                    buttonText: 'Shop',
                    buttonLink: '/gadgets',
                    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#4f46e5',
                    textColor: '#ffffff',
                    buttonColor: '#ffffff',
                    type: 'small'
                },
                {
                    id: 52,
                    category: 'Home Essentials',
                    title: 'Comfort Living',
                    buttonText: 'Shop',
                    buttonLink: '/comfort',
                    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f97316',
                    textColor: '#ffffff',
                    buttonColor: '#4f46e5',
                    type: 'small'
                },
                {
                    id: 53,
                    category: 'Premium Collection',
                    title: 'Luxury Fashion',
                    buttonText: 'Shop',
                    buttonLink: '/fashion',
                    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#ef4444',
                    textColor: '#ffffff',
                    buttonColor: '#4f46e5',
                    type: 'large'
                }
            ]
        },
        {
            id: 6,
            name: 'Section 6 - Specialized Categories',
            isActive: true,
            highlights: [
                {
                    id: 61,
                    category: 'Best Sellers in',
                    title: 'Computers',
                    buttonText: 'Shop',
                    buttonLink: '/computers',
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#4f46e5',
                    textColor: '#ffffff',
                    buttonColor: '#fbbf24'
                },
                {
                    id: 62,
                    category: 'Shop',
                    title: 'Homemade Products',
                    buttonText: 'Shop',
                    buttonLink: '/homemade',
                    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#f97316',
                    textColor: '#ffffff',
                    buttonColor: '#fbbf24'
                },
                {
                    id: 63,
                    category: 'Baby',
                    title: 'Supplies',
                    buttonText: 'Shop',
                    buttonLink: '/baby',
                    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                    backgroundColor: '#4f46e5',
                    textColor: '#ffffff',
                    buttonColor: '#fbbf24'
                }
            ]
        }
    ])

    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [selectedSection, setSelectedSection] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingHighlight, setEditingHighlight] = useState(null)
    const [editingSection, setEditingSection] = useState(null)
    const fileInputRef = useRef(null)

    // Form state for highlight editing
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        subtitle: '',
        buttonText: 'Shop',
        buttonLink: '',
        image: '',
        backgroundColor: '#f8f9fa',
        textColor: '#333333',
        buttonColor: '#4f46e5',
        type: 'card'
    })

    // Predefined themes
    const themes = [
        { name: 'Light', bg: '#f8f9fa', text: '#333333', button: '#4f46e5' },
        { name: 'Blue', bg: '#4f46e5', text: '#ffffff', button: '#ffffff' },
        { name: 'Orange', bg: '#f97316', text: '#ffffff', button: '#4f46e5' },
        { name: 'Red', bg: '#ef4444', text: '#ffffff', button: '#4f46e5' },
        { name: 'Green', bg: '#10b981', text: '#ffffff', button: '#4f46e5' },
        { name: 'Purple', bg: '#8b5cf6', text: '#ffffff', button: '#4f46e5' },
        { name: 'Gray', bg: '#6b7280', text: '#ffffff', button: '#4f46e5' },
        { name: 'Yellow', bg: '#fbbf24', text: '#333333', button: '#4f46e5' }
    ]

    const getCurrentSection = () => {
        return sections.find(section => section.id === selectedSection)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFormData(prev => ({
                    ...prev,
                    image: e.target.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const applyTheme = (theme) => {
        setFormData(prev => ({
            ...prev,
            backgroundColor: theme.bg,
            textColor: theme.text,
            buttonColor: theme.button
        }))
    }

    const openModal = (highlight = null, sectionId = null) => {
        if (highlight) {
            setEditingHighlight(highlight)
            setEditingSection(sectionId)
            setFormData(highlight)
        } else {
            setEditingHighlight(null)
            setEditingSection(selectedSection)
            setFormData({
                category: '',
                title: '',
                subtitle: '',
                buttonText: 'Shop',
                buttonLink: '',
                image: '',
                backgroundColor: '#f8f9fa',
                textColor: '#333333',
                buttonColor: '#4f46e5',
                type: 'card'
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingHighlight(null)
        setEditingSection(null)
    }

    const handleSaveHighlight = () => {
        if (!formData.title || !formData.image) {
            alert('Please provide at least a title and image')
            return
        }

        const targetSectionId = editingSection || selectedSection

        setSections(prev => prev.map(section => {
            if (section.id === targetSectionId) {
                if (editingHighlight) {
                    // Update existing highlight
                    return {
                        ...section,
                        highlights: section.highlights.map(highlight =>
                            highlight.id === editingHighlight.id
                                ? { ...formData, id: editingHighlight.id }
                                : highlight
                        )
                    }
                } else {
                    // Add new highlight
                    const newHighlight = {
                        ...formData,
                        id: Date.now()
                    }
                    return {
                        ...section,
                        highlights: [...section.highlights, newHighlight]
                    }
                }
            }
            return section
        }))
        closeModal()
    }

    const handleDeleteHighlight = (highlightId, sectionId) => {
        if (window.confirm('Are you sure you want to delete this highlight?')) {
            setSections(prev => prev.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        highlights: section.highlights.filter(highlight => highlight.id !== highlightId)
                    }
                }
                return section
            }))
        }
    }

    const toggleSectionStatus = (sectionId) => {
        setSections(prev => prev.map(section =>
            section.id === sectionId
                ? { ...section, isActive: !section.isActive }
                : section
        ))
    }

    const renderHighlightCard = (highlight, isPreview = false) => {
        const cardType = highlight.type || 'card'
        const cardClass = `highlight-${cardType} ${isPreview ? 'preview' : ''}`

        return (
            <div
                key={highlight.id}
                className={cardClass}
                style={{
                    backgroundColor: highlight.backgroundColor,
                    color: highlight.textColor
                }}
            >
                <div className="highlight-content">
                    <div className="highlight-text">
                        <span className="highlight-category">{highlight.category}</span>
                        <h3 className="highlight-title">{highlight.title}</h3>
                        {highlight.subtitle && (
                            <p className="highlight-subtitle">{highlight.subtitle}</p>
                        )}
                        <button
                            className="highlight-button"
                            style={{
                                backgroundColor: highlight.buttonColor,
                                color: highlight.buttonColor === '#ffffff' || highlight.buttonColor === '#fbbf24' ? '#333333' : '#ffffff'
                            }}
                        >
                            {highlight.buttonText}
                        </button>
                    </div>
                    <div className="highlight-image">
                        <img src={highlight.image} alt={highlight.title} />
                    </div>
                </div>
            </div>
        )
    }

    const renderSectionPreview = (section) => {
        if (!section.isActive) return null

        const sectionClass = `section-${section.id}`

        return (
            <div key={section.id} className={`section-preview ${sectionClass}`}>
                <h3 className="section-title">{section.name}</h3>
                <div className="section-highlights">
                    {section.highlights.map(highlight => renderHighlightCard(highlight, true))}
                </div>
            </div>
        )
    }

    return (
        <div className="highlights-section">
            <div className="page-header">
                <div className="header-content">
                    <h1>Highlights Sections</h1>
                    <p>Manage all 6 highlight sections for your homepage</p>
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
                        {isPreviewMode ? 'Exit Preview' : 'Preview All'}
                    </button>
                    <div className="active-sections-count">
                        <span className="count">{sections.filter(s => s.isActive).length}</span>
                        <span className="label">Active Sections</span>
                    </div>
                </div>
            </div>

            {/* Preview Mode - All Sections */}
            {isPreviewMode && (
                <div className="preview-container">
                    <div className="all-sections-preview">
                        {sections.map(section => renderSectionPreview(section))}
                    </div>
                </div>
            )}

            {/* Management Mode */}
            {!isPreviewMode && (
                <div className="management-container">
                    {/* Section Selector */}
                    <div className="section-selector">
                        <h3>Select Section to Manage</h3>
                        <div className="sections-grid">
                            {sections.map(section => (
                                <div
                                    key={section.id}
                                    className={`section-card ${selectedSection === section.id ? 'selected' : ''} ${!section.isActive ? 'inactive' : ''}`}
                                    onClick={() => setSelectedSection(section.id)}
                                >
                                    <div className="section-header">
                                        <h4>{section.name}</h4>
                                        <button
                                            className={`status-toggle ${section.isActive ? 'active' : 'inactive'}`}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleSectionStatus(section.id)
                                            }}
                                        >
                                            {section.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                    <div className="section-highlights-preview">
                                        {section.highlights.slice(0, 3).map(highlight => (
                                            <div key={highlight.id} className="mini-highlight">
                                                <img src={highlight.image} alt={highlight.title} />
                                                <span>{highlight.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="section-info">
                                        <span>{section.highlights.length} highlights</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current Section Management */}
                    {getCurrentSection() && (
                        <div className="current-section-management">
                            <div className="section-management-header">
                                <h3>Managing: {getCurrentSection().name}</h3>
                            </div>

                            <div className="highlights-management">
                                <div className="highlights-list">
                                    {getCurrentSection().highlights.map((highlight) => (
                                        <div key={highlight.id} className="highlight-manage-card">
                                            <div className="manage-card-preview">
                                                {renderHighlightCard(highlight)}
                                                <div className="card-overlay">
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => openModal(highlight, selectedSection)}
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteHighlight(highlight.id, selectedSection)}
                                                    >
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="manage-card-info">
                                                <div className="card-details">
                                                    <h4>{highlight.title}</h4>
                                                    <p>{highlight.category}</p>
                                                    <span className={`type-badge ${highlight.type || 'card'}`}>
                                                        {highlight.type || 'card'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modal for Adding/Editing Highlights */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}</h3>
                            <button className="close-btn" onClick={closeModal}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-section">
                                    <h4>Content</h4>

                                    <div className="form-group">
                                        <label htmlFor="category">Category/Subtitle</label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            placeholder="e.g., New Look, At Lowest Price"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="title">Main Title *</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Home Furniture"
                                            required
                                        />
                                    </div>

                                    {(formData.type === 'banner') && (
                                        <div className="form-group">
                                            <label htmlFor="subtitle">Additional Text</label>
                                            <input
                                                type="text"
                                                id="subtitle"
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Items on Sale"
                                            />
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label htmlFor="buttonText">Button Text</label>
                                        <input
                                            type="text"
                                            id="buttonText"
                                            name="buttonText"
                                            value={formData.buttonText}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Shop, Shop Now"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="buttonLink">Button Link</label>
                                        <input
                                            type="text"
                                            id="buttonLink"
                                            name="buttonLink"
                                            value={formData.buttonLink}
                                            onChange={handleInputChange}
                                            placeholder="e.g., /furniture"
                                        />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h4>Design</h4>

                                    <div className="form-group">
                                        <label>Image</label>
                                        <div className="image-upload">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                            />
                                            <div className="image-preview" onClick={() => fileInputRef.current?.click()}>
                                                {formData.image ? (
                                                    <img src={formData.image} alt="Preview" />
                                                ) : (
                                                    <div className="upload-placeholder">
                                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        <span>Click to upload image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handleSaveHighlight}>
                                {editingHighlight ? 'Update Highlight' : 'Add Highlight'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HighlightsSection