import { useState, useRef } from 'react'
import './FirstHighlight.scss'

const FirstHighlight = () => {
    const [highlights, setHighlights] = useState([
        {
            id: 1,
            category: 'New Look',
            title: 'Home Furniture',
            buttonLink: '/furniture',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isActive: true,
            order: 1
        },
        {
            id: 2,
            category: 'New Products',
            title: 'Bags and Luggage',
            buttonLink: '/bags',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isActive: true,
            order: 2
        },
        {
            id: 3,
            category: 'At Lowest Price',
            title: 'Arts and Accessories',
            buttonLink: '/arts',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isActive: true,
            order: 3
        }
    ])

    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingHighlight, setEditingHighlight] = useState(null)
    const fileInputRef = useRef(null)

    // Form state for highlight editing
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        buttonLink: '',
        image: '',
        isActive: true
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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

    const openModal = (highlight = null) => {
        if (highlight) {
            setEditingHighlight(highlight)
            setFormData(highlight)
        } else {
            setEditingHighlight(null)
            setFormData({
                category: '',
                title: '',
                buttonLink: '',
                image: '',
                isActive: true
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingHighlight(null)
    }

    const handleSaveHighlight = () => {
        if (!formData.title || !formData.image) {
            alert('Please provide at least a title and image')
            return
        }

        if (editingHighlight) {
            // Update existing highlight
            setHighlights(prev => prev.map(highlight =>
                highlight.id === editingHighlight.id
                    ? { ...formData, id: editingHighlight.id, order: editingHighlight.order }
                    : highlight
            ))
        } else {
            // Add new highlight (max 3 for this section)
            if (highlights.length >= 3) {
                alert('First Highlight section can only have 3 highlights maximum')
                return
            }
            const newHighlight = {
                ...formData,
                id: Date.now(),
                order: highlights.length + 1
            }
            setHighlights(prev => [...prev, newHighlight])
        }
        closeModal()
    }

    const handleDeleteHighlight = (highlightId) => {
        if (highlights.length <= 1) {
            alert('You must have at least one highlight in this section')
            return
        }

        if (window.confirm('Are you sure you want to delete this highlight?')) {
            setHighlights(prev => prev.filter(highlight => highlight.id !== highlightId))
        }
    }

    const toggleHighlightStatus = (highlightId) => {
        setHighlights(prev => prev.map(highlight =>
            highlight.id === highlightId
                ? { ...highlight, isActive: !highlight.isActive }
                : highlight
        ))
    }

    const moveHighlight = (fromIndex, toIndex) => {
        const newHighlights = [...highlights]
        const [movedHighlight] = newHighlights.splice(fromIndex, 1)
        newHighlights.splice(toIndex, 0, movedHighlight)

        // Update order for all highlights
        const updatedHighlights = newHighlights.map((highlight, index) => ({
            ...highlight,
            order: index + 1
        }))

        setHighlights(updatedHighlights)
    }

    const activeHighlights = highlights.filter(h => h.isActive).sort((a, b) => a.order - b.order)
    const sortedHighlights = highlights.sort((a, b) => a.order - b.order)

    const renderHighlightCard = (highlight, isPreview = false) => {
        return (
            <div key={highlight.id} className={`first-highlight-card ${isPreview ? 'preview' : ''}`}>
                <div className="highlight-content">
                    <div className="highlight-text">
                        <span className="highlight-category">{highlight.category}</span>
                        <h3 className="highlight-title">{highlight.title}</h3>
                        <button className="highlight-button">
                            Shop
                        </button>
                    </div>
                    <div className="highlight-image">
                        <img src={highlight.image} alt={highlight.title} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="first-highlight">
            <div className="page-header">
                <div className="header-content">
                    <h1>First Highlight Section</h1>
                    <p>Manage the first highlight section with fixed styling (Home & Lifestyle)</p>
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
                    {highlights.length < 3 && (
                        <button className="add-highlight-btn" onClick={() => openModal()}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Highlight ({highlights.length}/3)
                        </button>
                    )}
                    <div className="active-count">
                        <span className="count">{activeHighlights.length}</span>
                        <span className="label">Active</span>
                    </div>
                </div>
            </div>

            {/* Preview Mode */}
            {isPreviewMode && (
                <div className="preview-container">
                    <div className="first-highlight-preview">
                        <div className="highlights-grid">
                            {activeHighlights.map(highlight => renderHighlightCard(highlight, true))}
                        </div>
                    </div>
                </div>
            )}

            {/* Management Mode */}
            {!isPreviewMode && (
                <div className="management-container">
                    <div className="highlights-management">
                        <div className="section-info">
                            <div className="info-card">
                                <h3>Section Restrictions</h3>
                                <ul>
                                    <li>✅ Maximum 3 highlights allowed</li>
                                    <li>🔒 Button text is fixed as "Shop"</li>
                                    <li>🔒 Colors and background are fixed</li>
                                    <li>✏️ You can edit: Category, Title, Image, Button Link</li>
                                </ul>
                            </div>
                        </div>

                        <div className="highlights-list">
                            {sortedHighlights.map((highlight, index) => (
                                <div key={highlight.id} className={`highlight-manage-card ${!highlight.isActive ? 'inactive' : ''}`}>
                                    <div className="manage-card-preview">
                                        {renderHighlightCard(highlight)}
                                        <div className="card-overlay">
                                            <button
                                                className="edit-btn"
                                                onClick={() => openModal(highlight)}
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            {highlights.length > 1 && (
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteHighlight(highlight.id)}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="manage-card-info">
                                        <div className="card-details">
                                            <h4>{highlight.title}</h4>
                                            <p>{highlight.category}</p>
                                            <span className="link-preview">→ {highlight.buttonLink}</span>
                                        </div>

                                        <div className="card-actions">
                                            <button
                                                className={`status-toggle ${highlight.isActive ? 'active' : 'inactive'}`}
                                                onClick={() => toggleHighlightStatus(highlight.id)}
                                            >
                                                {highlight.isActive ? 'Active' : 'Inactive'}
                                            </button>

                                            <div className="order-controls">
                                                <button
                                                    className="move-btn"
                                                    onClick={() => moveHighlight(index, Math.max(0, index - 1))}
                                                    disabled={index === 0}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <span className="order-number">#{highlight.order}</span>
                                                <button
                                                    className="move-btn"
                                                    onClick={() => moveHighlight(index, Math.min(highlights.length - 1, index + 1))}
                                                    disabled={index === highlights.length - 1}
                                                >
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                            <div className="form-sections">
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

                                    <div className="form-group">
                                        <label htmlFor="buttonLink">Button Link *</label>
                                        <input
                                            type="text"
                                            id="buttonLink"
                                            name="buttonLink"
                                            value={formData.buttonLink}
                                            onChange={handleInputChange}
                                            placeholder="e.g., /furniture"
                                            required
                                        />
                                        <small>Button text is fixed as "Shop"</small>
                                    </div>

                                    <div className="form-group checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={formData.isActive}
                                                onChange={handleInputChange}
                                            />
                                            <span className="checkmark"></span>
                                            Active (visible on website)
                                        </label>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h4>Image</h4>

                                    <div className="form-group">
                                        <label>Product Image *</label>
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

                                    <div className="restrictions-info">
                                        <h5>Fixed Settings</h5>
                                        <ul>
                                            <li>Background: Light gray (#f8f9fa)</li>
                                            <li>Text Color: Dark (#333333)</li>
                                            <li>Button: Blue (#4f46e5)</li>
                                            <li>Button Text: "Shop" (cannot change)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Live Preview */}
                            <div className="live-preview">
                                <h4>Live Preview</h4>
                                <div className="preview-wrapper">
                                    {formData.title && formData.image && renderHighlightCard({
                                        ...formData,
                                        id: 'preview'
                                    }, true)}
                                    {(!formData.title || !formData.image) && (
                                        <div className="preview-placeholder">
                                            Add title and image to see preview
                                        </div>
                                    )}
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

export default FirstHighlight