import { useState, useEffect } from 'react'
import './NewsSection.scss'

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState([
        {
            id: 1,
            title: 'Latest Product Launch',
            description: 'We are excited to announce the launch of our new premium collection featuring innovative designs and sustainable materials that will revolutionize your shopping experience.',
            image: '/api/placeholder/300/200',
            publishDate: '2024-01-15'
        },
        {
            id: 2,
            title: 'Summer Sale Event',
            description: 'Join us for the biggest summer sale of the year! Get up to 50% off on selected items across all categories. Limited time offer with exclusive deals for our valued customers.',
            image: '/api/placeholder/300/200',
            publishDate: '2024-01-10'
        },
        {
            id: 3,
            title: 'Store Expansion News',
            description: 'We are thrilled to share that our company is expanding to new locations! Three new stores will be opening this quarter, bringing our products closer to you.',
            image: '/api/placeholder/300/200',
            publishDate: '2024-01-05'
        }
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingNews, setEditingNews] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        publishDate: ''
    })

    const handleEdit = (newsItem) => {
        setEditingNews(newsItem)
        setFormData({
            title: newsItem.title,
            description: newsItem.description,
            image: newsItem.image,
            publishDate: newsItem.publishDate
        })
        setIsModalOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Update existing news item
        setNewsItems(newsItems.map(item =>
            item.id === editingNews.id
                ? { ...item, ...formData }
                : item
        ))

        setIsModalOpen(false)
        setEditingNews(null)
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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className="news-section-admin">
            <div className="admin-header">
                <div className="header-content">
                    <h1>News Section</h1>
                    <p>Manage your website's news articles and announcements</p>
                </div>
            </div>

            <div className="news-grid">
                {newsItems.map(newsItem => (
                    <div key={newsItem.id} className="news-card">
                        <div className="card-header">
                            <div className="card-number">
                                <span>News {newsItem.id}</span>
                            </div>
                            <div className="card-actions">
                                <button className="btn-icon btn-edit" onClick={() => handleEdit(newsItem)}>
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="card-preview">
                            <div className="preview-image">
                                <img src={newsItem.image} alt={newsItem.title} />
                            </div>
                            <div className="preview-content">
                                <div className="publish-date">{formatDate(newsItem.publishDate)}</div>
                                <h3 className="news-title">{newsItem.title}</h3>
                                <p className="news-description">{newsItem.description}</p>
                                {/* <div className="read-more">
                                    <button className="read-more-btn">Read More</button>
                                </div> */}
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
                            <h2>Edit News Article</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>News Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Latest Product Launch, Summer Sale Event"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Write a detailed description of the news article..."
                                    rows={5}
                                    required
                                />
                            </div>

                            {/* <div className="form-group">
                                <label>Publish Date</label>
                                <input
                                    type="date"
                                    name="publishDate"
                                    value={formData.publishDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div> */}

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
                                    Update News Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewsSection