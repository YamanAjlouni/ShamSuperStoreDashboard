import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WebsiteAdminNavbar from '../../components/websiteAdmin/websiteAdminNavbar/WebsiteAdminNavbar'
import WebsiteAdminSidebar from '../../components/websiteAdmin/websiteAdminSidebar/WebsiteAdminSidebar'

// Import Website Admin Pages
import WebsiteAdminDashboard from './websiteAdminDashboard/WebsiteAdminDashboard'
import IntroSectionSwiper from './introSectionSwiper/IntroSectionSwiper'
import FeaturesProducts from './featuresProducts/FeaturesProducts'
import FirstHighlight from './firstHighlight/FirstHighlight'
import SecondHighlight from './secondHighlight/SecondHighlight'
import ThirdHighlight from './thirdHighlight/ThirdHighlight'
import FourthHighlight from './fourthHighlight/FourthHighlight'
import FifthHighlight from './fifthHighlight/FifthHighlight'
import SixthHighlight from './sixthHighlight/SixthHighlight'
import NewsSection from './newsSection/NewsSection'


import './WebsiteAdmin.scss'


const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
            <div className="placeholder-info">
                <span>Section: Website Management</span>
            </div>
        </div>
    </div>
)

const WebsiteAdmin = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            // Changed breakpoint: treat tablets as mobile for sidebar behavior
            const mobile = window.innerWidth <= 1024 // Changed from 768 to 1024
            setIsMobile(mobile)

            // Only auto-collapse on true desktop screens
            if (window.innerWidth > 1024) {
                // Reset mobile states when on desktop
                setIsSidebarOpen(false)
            } else {
                // Reset desktop states when on mobile/tablet
                setIsSidebarCollapsed(false)
                setIsSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Add/remove body class when sidebar is open on mobile/tablet
    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            document.body.classList.add('sidebar-open')
        } else {
            document.body.classList.remove('sidebar-open')
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('sidebar-open')
        }
    }, [isMobile, isSidebarOpen])

    // Handle sidebar toggle from navbar
    const handleToggleSidebar = () => {
        if (isMobile) {
            // Mobile/Tablet behavior: toggle overlay sidebar
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            // Desktop behavior: toggle collapse/expand
            setIsSidebarCollapsed(!isSidebarCollapsed)
        }
    }

    // Close mobile sidebar
    const handleCloseMobileSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    // Close mobile sidebar when clicking on main content
    const handleMainContentClick = () => {
        if (isMobile && isSidebarOpen) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <div className="website-admin-layout">
            <WebsiteAdminNavbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="website-admin-content">
                <WebsiteAdminSidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                />

                <main
                    className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                    onClick={handleMainContentClick}
                >
                    {/* Website Admin Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<WebsiteAdminDashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/websiteAdmin" replace />} />

                        {/* Homepage Sections */}
                        <Route path="/intro-section" element={<IntroSectionSwiper />} />
                        <Route path="/features-products" element={<FeaturesProducts />} />

                        {/* Highlights Section */}
                        <Route path="/first-highlight" element={<FirstHighlight />} />
                        <Route path="/second-highlight" element={<SecondHighlight />} />
                        <Route path="/third-highlight" element={<ThirdHighlight />} />
                        <Route path="/fourth-highlight" element={<FourthHighlight />} />
                        <Route path="/fifth-highlight" element={<FifthHighlight />} />
                        <Route path="/sixth-highlight" element={<SixthHighlight />} />

                        {/* News Section */}
                        <Route path="/news" element={<NewsSection />} />
                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/websiteAdmin/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default WebsiteAdmin