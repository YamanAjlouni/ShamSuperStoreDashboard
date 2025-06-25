import { useState } from 'react'
import './Navbar.scss'

const Navbar = () => {
    const [notifications] = useState(1)
    const [orders] = useState(1)
    const [messages] = useState(1)

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <div className="brand-icon">SHA</div>
                    <span className="brand-text">My Store</span>
                </div>
                <div className="navbar-breadcrumb">
                    <svg className="breadcrumb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="breadcrumb-text">Dashboard</span>
                </div>
            </div>

            <div className="navbar-right">
                <div className="navbar-stats">
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">/ ∞</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0 MB</span>
                        <span className="stat-label">/ ∞</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    <button className="action-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM7 7h10v10H7V7z" />
                        </svg>
                        {notifications > 0 && <span className="badge">{notifications}</span>}
                    </button>

                    <button className="action-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                        </svg>
                        {orders > 0 && <span className="badge">{orders}</span>}
                    </button>

                    <button className="action-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {messages > 0 && <span className="badge">{messages}</span>}
                    </button>

                    <button className="action-btn">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button>

                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="https://via.placeholder.com/40" alt="User" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar