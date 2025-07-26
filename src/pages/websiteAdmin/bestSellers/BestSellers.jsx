import { useState, useEffect } from 'react'
import './BestSellers.scss'

const BestSellers = () => {
    // Available categories for the dropdown
    const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Books',
        'Sports',
        'Home & Garden',
        'Beauty',
        'Automotive',
        'Toys',
        'Food & Beverages',
        'Health',
        'Music',
        'Art & Crafts',
        'Office Supplies'
    ]

    // Initialize best seller configurations
    const [bestSellers, setBestSellers] = useState(() => {
        // Try to load from localStorage first
        const saved = localStorage.getItem('bestSellersConfig')
        if (saved) {
            return JSON.parse(saved)
        }

        // Default configuration for 10 rows
        return Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            title: `${getOrdinalNumber(index + 1)} Swiper`,
            category: categories[index % categories.length] // Default to cycling through categories
        }))
    })

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // Helper function to get ordinal numbers
    function getOrdinalNumber(num) {
        const ordinals = [
            'First', 'Second', 'Third', 'Fourth', 'Fifth',
            'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'
        ]
        return ordinals[num - 1] || `${num}th`
    }

    // Handle category change
    const handleCategoryChange = (id, newCategory) => {
        setBestSellers(prev =>
            prev.map(item =>
                item.id === id ? { ...item, category: newCategory } : item
            )
        )
        setHasUnsavedChanges(true)
    }

    // Save changes
    const handleSave = () => {
        localStorage.setItem('bestSellersConfig', JSON.stringify(bestSellers))
        setHasUnsavedChanges(false)

        // Show success message
        const message = document.createElement('div')
        message.textContent = 'Best Seller configuration saved successfully!'
        message.className = 'save-notification'
        document.body.appendChild(message)

        setTimeout(() => {
            document.body.removeChild(message)
        }, 3000)
    }

    // Reset to defaults
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all configurations to default values?')) {
            const defaultConfig = Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                title: `${getOrdinalNumber(index + 1)} Swiper`,
                category: categories[index % categories.length]
            }))
            setBestSellers(defaultConfig)
            setHasUnsavedChanges(true)
        }
    }

    // Auto-save effect
    useEffect(() => {
        if (hasUnsavedChanges) {
            const timer = setTimeout(() => {
                handleSave()
            }, 2000) // Auto-save after 2 seconds of inactivity

            return () => clearTimeout(timer)
        }
    }, [bestSellers, hasUnsavedChanges])

    return (
        <div className="best-sellers-page">
            {/* Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1>Best Sellers Configuration</h1>
                    <p>Configure categories for each swiper section on your homepage</p>
                </div>
                <div className="header-stats">
                    <div className="stat-card">
                        <div className="stat-number">{bestSellers.length}</div>
                        <div className="stat-label">Total Swipers</div>
                    </div>
                    {/* <div className="stat-card">
                        <div className="stat-number">{new Set(bestSellers.map(item => item.category)).size}</div>
                        <div className="stat-label">Categories</div>
                    </div> */}
                </div>
            </div>

            {/* Best Seller Section */}
            <div className="best-seller-section">
                <div className="section-header">
                    <div className="section-title">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <h2>Swiper Configurations</h2>
                    </div>
                    <div className="section-actions">
                        {hasUnsavedChanges && (
                            <span className="unsaved-indicator">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" />
                                </svg>
                                Unsaved changes
                            </span>
                        )}
                        <button className="reset-btn" onClick={handleReset}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset
                        </button>
                        <button className="save-btn" onClick={handleSave}>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="best-seller-grid">
                    {bestSellers.map((item) => (
                        <div
                            key={item.id}
                            className="best-seller-card"
                        >
                            <div className="card-header">
                                <div className="card-title">
                                    <span className="swiper-number">{item.id}</span>
                                    <h3>{item.title}:</h3>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="category-section">
                                    <label htmlFor={`category-${item.id}`}>Best Seller in:</label>
                                    <div className="select-wrapper">
                                        <select
                                            id={`category-${item.id}`}
                                            value={item.category}
                                            onChange={(e) => handleCategoryChange(item.id, e.target.value)}
                                            className="category-select"
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <svg className="select-arrow" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="category-preview">
                                    <span className="preview-label">Preview:</span>
                                    <span className="preview-text">
                                        "Best Seller in <strong>{item.category}</strong>"
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellers