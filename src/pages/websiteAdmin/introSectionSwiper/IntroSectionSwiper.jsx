import { useState, useRef } from 'react'
import './IntroSectionSwiper.scss'

const IntroSectionSwiper = () => {
    const [slides, setSlides] = useState([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'SPRING AND SUMMER 2025',
            mainTitle: "Men's Fashion",
            buttonText: 'SHOP ACCESSORIES',
            buttonLink: '/accessories',
            isActive: true
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'NEW COLLECTION',
            mainTitle: "Women's Style",
            buttonText: 'EXPLORE NOW',
            buttonLink: '/women',
            isActive: true
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            smallTitle: 'LIMITED EDITION',
            mainTitle: 'Premium Collection',
            buttonText: 'SHOP PREMIUM',
            buttonLink: '/premium',
            isActive: false
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
        buttonText: '',
        buttonLink: '',
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

    const openModal = (slide = null) => {
        if (slide) {
            setEditingSlide(slide)
            setFormData(slide)
        } else {
            setEditingSlide(null)
            setFormData({
                image: '',
                smallTitle: '',
                mainTitle: '',
                buttonText: '',
                buttonLink: '',
                isActive: true
            })
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingSlide(null)
        setFormData({
            image: '',
            smallTitle: '',
            mainTitle: '',
            buttonText: '',
            buttonLink: '',
            isActive: true
        })
    }

    const handleSaveSlide = () => {
        if (!formData.image || !formData.mainTitle) {
            alert('Please provide at least an image and main title')
            return
        }

        if (editingSlide) {
            // Update existing slide
            setSlides(prev => prev.map(slide =>
                slide.id === editingSlide.id
                    ? { ...formData, id: editingSlide.id }
                    : slide
            ))
        } else {
            // Add new slide
            const newSlide = {
                ...formData,
                id: Date.now()
            }
            setSlides(prev => [...prev, newSlide])
        }
        closeModal()
    }

    const handleDeleteSlide = (slideId) => {
        if (slides.length <= 1) {
            alert('You must have at least one slide')
            return
        }

        if (window.confirm('Are you sure you want to delete this slide?')) {
            setSlides(prev => prev.filter(slide => slide.id !== slideId))
            if (currentSlide >= slides.length - 1) {
                setCurrentSlide(0)
            }
        }
    }

    const toggleSlideStatus = (slideId) => {
        setSlides(prev => prev.map(slide =>
            slide.id === slideId
                ? { ...slide, isActive: !slide.isActive }
                : slide
        ))
    }

    const moveSlide = (fromIndex, toIndex) => {
        const newSlides = [...slides]
        const [movedSlide] = newSlides.splice(fromIndex, 1)
        newSlides.splice(toIndex, 0, movedSlide)
        setSlides(newSlides)
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    }

    const activeSlides = slides.filter(slide => slide.isActive)

    return (
        <div className="intro-section-swiper">
            <div className="page-header">
                <div className="header-content">
                    <h1>Intro Section Swiper</h1>
                    <p>Manage your homepage hero slider content</p>
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
                    <button className="add-slide-btn" onClick={() => openModal()}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Slide
                    </button>
                </div>
            </div>

            {/* Preview Mode */}
            {isPreviewMode && (
                <div className="preview-container">
                    <div className="swiper-preview">
                        <div className="slide-container">
                            {activeSlides.length > 0 && (
                                <div className="slide active" key={activeSlides[currentSlide % activeSlides.length]?.id}>
                                    <div className="slide-image">
                                        <img
                                            src={activeSlides[currentSlide % activeSlides.length]?.image}
                                            alt={activeSlides[currentSlide % activeSlides.length]?.mainTitle}
                                        />
                                    </div>
                                    <div className="slide-content">
                                        <span className="small-title">
                                            {activeSlides[currentSlide % activeSlides.length]?.smallTitle}
                                        </span>
                                        <h2 className="main-title">
                                            {activeSlides[currentSlide % activeSlides.length]?.mainTitle}
                                        </h2>
                                        <button className="cta-button">
                                            {activeSlides[currentSlide % activeSlides.length]?.buttonText}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {activeSlides.length > 1 && (
                            <>
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
                                    {activeSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`indicator ${index === currentSlide % activeSlides.length ? 'active' : ''}`}
                                            onClick={() => setCurrentSlide(index)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Management Mode */}
            {!isPreviewMode && (
                <div className="slides-management">
                    <div className="slides-grid">
                        {slides.map((slide, index) => (
                            <div key={slide.id} className={`slide-card ${!slide.isActive ? 'inactive' : ''}`}>
                                <div className="slide-preview">
                                    <img src={slide.image} alt={slide.mainTitle} />
                                    <div className="slide-overlay">
                                        <button
                                            className="edit-btn"
                                            onClick={() => openModal(slide)}
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteSlide(slide.id)}
                                        >
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="slide-info">
                                    <div className="slide-content-preview">
                                        {slide.smallTitle && <span className="small-title">{slide.smallTitle}</span>}
                                        <h3 className="main-title">{slide.mainTitle}</h3>
                                        {slide.buttonText && <span className="button-text">{slide.buttonText}</span>}
                                    </div>

                                    <div className="slide-actions">
                                        <button
                                            className={`status-toggle ${slide.isActive ? 'active' : 'inactive'}`}
                                            onClick={() => toggleSlideStatus(slide.id)}
                                        >
                                            {slide.isActive ? 'Active' : 'Inactive'}
                                        </button>

                                        <div className="order-controls">
                                            <button
                                                className="move-btn"
                                                onClick={() => moveSlide(index, Math.max(0, index - 1))}
                                                disabled={index === 0}
                                            >
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <span className="slide-order">#{index + 1}</span>
                                            <button
                                                className="move-btn"
                                                onClick={() => moveSlide(index, Math.min(slides.length - 1, index + 1))}
                                                disabled={index === slides.length - 1}
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
            )}

            {/* Modal for Adding/Editing Slides */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingSlide ? 'Edit Slide' : 'Add New Slide'}</h3>
                            <button className="close-btn" onClick={closeModal}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>Slide Image</label>
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

                            <div className="form-group">
                                <label htmlFor="smallTitle">Small Title (Optional)</label>
                                <input
                                    type="text"
                                    id="smallTitle"
                                    name="smallTitle"
                                    value={formData.smallTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g., SPRING AND SUMMER 2025"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mainTitle">Main Title *</label>
                                <input
                                    type="text"
                                    id="mainTitle"
                                    name="mainTitle"
                                    value={formData.mainTitle}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Men's Fashion"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="buttonText">Button Text (Optional)</label>
                                <input
                                    type="text"
                                    id="buttonText"
                                    name="buttonText"
                                    value={formData.buttonText}
                                    onChange={handleInputChange}
                                    placeholder="e.g., SHOP ACCESSORIES"
                                />
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="buttonLink">Button Link (Optional)</label>
                                <input
                                    type="text"
                                    id="buttonLink"
                                    name="buttonLink"
                                    value={formData.buttonLink}
                                    onChange={handleInputChange}
                                    placeholder="e.g., /accessories"
                                />
                            </div> */}

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

                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="save-btn" onClick={handleSaveSlide}>
                                {editingSlide ? 'Update Slide' : 'Add Slide'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IntroSectionSwiper