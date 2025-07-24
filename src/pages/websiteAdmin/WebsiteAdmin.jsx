import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WebsiteAdminNavbar from '../../components/websiteAdmin/websiteAdminNavbar/WebsiteAdminNavbar'
import WebsiteAdminSidebar from '../../components/websiteAdmin/websiteAdminSidebar/WebsiteAdminSidebar'

// Import Website Admin Pages
import WebsiteAdminDashboard from './websiteAdminDashboard/WebsiteAdminDashboard'
import IntroSectionSwiper from './introSectionSwiper/IntroSectionSwiper'
import FeaturesProducts from './featuresProducts/FeaturesProducts'
import HighlightsSection from './highlightsSection/HighlightsSection'

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
                        <Route path="/highlights" element={<HighlightsSection />} />
                        <Route path="/first-highlight" element={<PlaceholderPage pageName="First Highlight" />} />
                        <Route path="/second-highlight" element={<PlaceholderPage pageName="Second Highlight" />} />
                        <Route path="/third-highlight" element={<PlaceholderPage pageName="Third Highlight" />} />

                        {/* News Section */}
                        <Route path="/news" element={<PlaceholderPage pageName="News Section" />} />

                        {/* Website Content Management */}
                        <Route path="/pages" element={<PlaceholderPage pageName="Pages Management" />} />
                        <Route path="/content" element={<PlaceholderPage pageName="Content Management" />} />
                        <Route path="/menus" element={<PlaceholderPage pageName="Menu Management" />} />
                        <Route path="/sliders" element={<PlaceholderPage pageName="Slider Management" />} />
                        <Route path="/banners" element={<PlaceholderPage pageName="Banner Management" />} />

                        {/* SEO & Marketing */}
                        <Route path="/seo" element={<PlaceholderPage pageName="SEO Management" />} />
                        <Route path="/meta" element={<PlaceholderPage pageName="Meta Tags" />} />
                        <Route path="/analytics" element={<PlaceholderPage pageName="Website Analytics" />} />
                        <Route path="/marketing" element={<PlaceholderPage pageName="Marketing Tools" />} />

                        {/* Design & Appearance */}
                        <Route path="/themes" element={<PlaceholderPage pageName="Theme Management" />} />
                        <Route path="/customization" element={<PlaceholderPage pageName="Website Customization" />} />
                        <Route path="/media" element={<PlaceholderPage pageName="Media Library" />} />

                        {/* Website Settings */}
                        <Route path="/general-settings" element={<PlaceholderPage pageName="General Settings" />} />
                        <Route path="/contact-info" element={<PlaceholderPage pageName="Contact Information" />} />
                        <Route path="/social-media" element={<PlaceholderPage pageName="Social Media Settings" />} />
                        <Route path="/maintenance" element={<PlaceholderPage pageName="Maintenance Mode" />} />

                        {/* Security & Performance */}
                        <Route path="/security" element={<PlaceholderPage pageName="Website Security" />} />
                        <Route path="/backups" element={<PlaceholderPage pageName="Website Backups" />} />
                        <Route path="/performance" element={<PlaceholderPage pageName="Performance Optimization" />} />

                        {/* Notifications & Profile */}
                        <Route path="/notifications" element={<PlaceholderPage pageName="Notifications" />} />
                        <Route path="/profile" element={<PlaceholderPage pageName="Website Admin Profile" />} />

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