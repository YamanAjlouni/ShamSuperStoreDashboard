import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './AdminDelivery.scss'
import AdminDeliveryNavbar from '../../components/adminDelivery/adminDeliveryNavbar/AdminDeliveryNavbar'
import AdminDeliverySidebar from '../../components/adminDelivery/adminDeliverySidebar/AdminDeliverySidebar'
import AdminDeliveryDashboard from './adminDeliveryDashboard/AdminDeliveryDashboard'
import AdminOrdersComponent from './adminOrdersComponent/AdminOrdersComponent'
import AdminDeliveryDrivers from './adminDeliveryDrivers/AdminDeliveryDrivers'
import AdminRevenueReports from './adminRevenueReports/AdminRevenueReports'
import AdminOrdersHistory from './adminOrdersHistory/AdminOrdersHistory'
import PendingDeliveryDrivers from './pendingDeliveryDrivers/PendingDeliveryDrivers'

const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const AdminDelivery = () => {
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
        <div className="delivery-layout">
            <AdminDeliveryNavbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="delivery-content">
                <AdminDeliverySidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                />

                <main
                    className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                    onClick={handleMainContentClick}
                >
                    {/* Admin Delivery Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<AdminDeliveryDashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/adminDelivery" replace />} />

                        {/* Orders Management */}
                        <Route path="/orders" element={<AdminOrdersComponent />} />
                        <Route path="/orders-history" element={<AdminOrdersHistory />} />

                        {/* Delivery Drivers Management */}
                        <Route path="/drivers" element={<AdminDeliveryDrivers />} />
                        <Route path="/pending-drivers" element={<PendingDeliveryDrivers />} />

                        {/* Reports & Analytics */}
                        <Route path="/reports" element={<AdminRevenueReports />} />

                        {/* Admin Settings */}
                        <Route path="/settings" element={<PlaceholderPage pageName="Admin Settings" />} />
                        <Route path="/profile" element={<PlaceholderPage pageName="Admin Profile" />} />

                        {/* Notifications */}
                        <Route path="/notifications" element={<PlaceholderPage pageName="Notifications" />} />

                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/adminDelivery/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default AdminDelivery