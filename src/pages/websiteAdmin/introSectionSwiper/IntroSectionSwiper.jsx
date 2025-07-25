import { useState, useRef } from 'react'
import './IntroSectionSwiper.scss'

const IntroSectionSwiper = () => {
    const [slides, setSlides] = useState([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'SPRING AND SUMMER 2025',
            mainTitle: "Men's Fashion",
            shopLink: 'mens-fashion'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'NEW COLLECTION',
            mainTitle: "Women's Style",
            shopLink: 'womens-style'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'LIMITED EDITION',
            mainTitle: 'Premium Collection',
            shopLink: 'premium'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'EXCLUSIVE DEALS',
            mainTitle: 'Accessories Collection',
            shopLink: 'accessories'
        }
    ])

    const [currentSlide, setCurrentSlide] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSlide, setEditingSlide] = useState(null)
    const [isPreviewMode, setIsPreviewMode] = useState(false)
    const fileInputRef = useRef(null)

    // Form state for slide editing
    const [formData, setFormData] = useState({
        image: '',
        smallTitle: '',
        mainTitle: '',
        shopLink: ''
    })

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

    const openModal = (slide) => {
        setEditingSlide(slide)
        setFormData({
            image: slide.image,
            smallTitle: slide.smallTitle,
            mainTitle: slide.mainTitle,
            shopLink: slide.shopLink
        })
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingSlide(null)
        setFormData({
            image: '',
            smallTitle: '',
            mainTitle: '',
            shopLink: ''
        })
    }

    const handleSaveSlide = () => {
        if (!formData.image || !formData.mainTitle) {
            alert('Please provide at least an image and main title')
            return
        }

        // Update existing slide
        setSlides(prev => prev.map(slide =>
            slide.id === editingSlide.id
                ? { ...formData, id: editingSlide.id }
                : slide
        ))

        closeModal()
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    }

    return (
        <div className="intro-section-swiper">
            <div className="admin-header">
                <div className="header-content">
                    <h1>Intro Section Swiper</h1>
                    <p>Manage your homepage hero slider content with 4 fixed slides</p>
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
                </div>
            </div>

            {/* Preview Mode */}
            {isPreviewMode && (
                <div className="preview-container">
                    <div className="swiper-preview">
                        <div className="slide-container">
                            <div className="slide active" key={slides[currentSlide]?.id}>
                                <div className="slide-image">
                                    <img
                                        src={slides[currentSlide]?.image}
                                        alt={slides[currentSlide]?.mainTitle}
                                    />
                                </div>
                                <div className="slide-content">
                                    <span className="small-title">
                                        {slides[currentSlide]?.smallTitle}
                                    </span>
                                    <h2 className="main-title">
                                        {slides[currentSlide]?.mainTitle}
                                    </h2>
                                    <button className="cta-button">
                                        SHOP ACCESSORIES
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="nav-btn prev" onClick={prevSlide}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="nav-btn next" onClick={nextSlide}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="slide-indicators">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Management Mode */}
            {!isPreviewMode && (
                <div className="slides-management">
                    <div className="slides-grid">
                        {slides.map((slide, index) => (
                            <div key={slide.id} className="slide-card">
                                <div className="card-header">
                                    <div className="card-number">
                                        <span>Slide {index + 1}</span>
                                    </div>
                                    <div className="card-actions">
                                        <button className="btn-icon btn-edit" onClick={() => openModal(slide)}>
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="card-preview">
                                    <div className="preview-image">
                                        <img src={slide.image} alt={slide.mainTitle} />
                                    </div>
                                    <div className="preview-content">
                                        <span className="small-title">{slide.smallTitle}</span>
                                        <h3 className="main-title">{slide.mainTitle}</h3>
                                        <div className="shop-link">
                                            <span className="link-preview">shop/{slide.shopLink}</span>
                                            <button className="shop-btn">Shop Accessories
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal for Editing Slides */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Slide</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSaveSlide(); }}>
                            <div className="form-group">
                                <label>Slide Image</label>
                                <div className="image-upload">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
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

                            <div className="form-group">
                                <label>Small Title</label>
                                <input
                                    type="text"
                                    name="smallTitle"
                                    value={formData.smallTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. SPRING AND SUMMER 2025"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Main Title</label>
                                <input
                                    type="text"
                                    name="mainTitle"
                                    value={formData.mainTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Men's Fashion"
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
                                        placeholder="mens-fashion, womens-style, etc."
                                        required
                                    />
                                </div>
                                <small>Only enter the category name. The "shop/" prefix will be added automatically.</small>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Update Slide
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IntroSectionSwiper