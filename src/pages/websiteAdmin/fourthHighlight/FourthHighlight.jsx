import { useState, useEffect } from 'react'
import './FourthHighlight.scss'

const FourthHighlight = () => {
    const [highlights, setHighlights] = useState([
        {
            id: 1,
            smallTitle: 'New Look',
            bigTitle: 'Home Furniture',
            shopLink: 'furniture',
            image: '/api/placeholder/300/200'
        },
        {
            id: 2,
            smallTitle: 'New Products',
            bigTitle: 'Bags and Luggage',
            shopLink: 'bags',
            image: '/api/placeholder/300/200'
        }
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingHighlight, setEditingHighlight] = useState(null)
    const [formData, setFormData] = useState({
        smallTitle: '',
        bigTitle: '',
        shopLink: '',
        image: ''
    })

    const handleEdit = (highlight) => {
        setEditingHighlight(highlight)
        setFormData({
            smallTitle: highlight.smallTitle,
            bigTitle: highlight.bigTitle,
            shopLink: highlight.shopLink,
            image: highlight.image
        })
        setIsModalOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Update existing highlight
        setHighlights(highlights.map(h =>
            h.id === editingHighlight.id
                ? { ...h, ...formData }
                : h
        ))

        setIsModalOpen(false)
        setEditingHighlight(null)
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

    return (
        <div className="fourth-highlight-admin">
            <div className="admin-header">
                <div className="header-content">
                    <h1>Fourth Highlight Section</h1>
                    <p>Manage your website's fourth highlight cards with images, titles, and shop links</p>
                </div>
            </div>

            <div className="highlights-grid">
                {highlights.map(highlight => (
                    <div key={highlight.id} className="highlight-card">
                        <div className="card-header">
                            <div className="card-number">
                                <span>Highlight {highlight.id}</span>
                            </div>
                            <div className="card-actions">
                                <button className="btn-icon btn-edit" onClick={() => handleEdit(highlight)}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="card-preview">
                            <div className="preview-image">
                                <img src={highlight.image} alt={highlight.bigTitle} />
                            </div>
                            <div className="preview-content">
                                <span className="small-title">{highlight.smallTitle}</span>
                                <h3 className="big-title">{highlight.bigTitle}</h3>
                                <div className="shop-link">
                                    <span className="link-preview">shop/{highlight.shopLink}</span>
                                    <button className="shop-btn">Shop</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Highlight</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Small Title</label>
                                <input
                                    type="text"
                                    name="smallTitle"
                                    value={formData.smallTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. New Look, New Products"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Big Title</label>
                                <input
                                    type="text"
                                    name="bigTitle"
                                    value={formData.bigTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Home Furniture, Bags and Luggage"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Shop Link</label>
                                <div className="link-input">
                                    <span className="link-prefix">shop/</span>
                                    <input
                                        type="text"
                                        name="shopLink"
                                        value={formData.shopLink}
                                        onChange={handleInputChange}
                                        placeholder="furniture, bags, arts, etc."
                                        required
                                    />
                                </div>
                                <small>Only enter the category name. The "shop/" prefix will be added automatically.</small>
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <div className="image-upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="upload-btn">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Choose Image
                                    </label>
                                    {formData.image && (
                                        <div className="image-preview">
                                            <img src={formData.image} alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Update Highlight
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FourthHighlight