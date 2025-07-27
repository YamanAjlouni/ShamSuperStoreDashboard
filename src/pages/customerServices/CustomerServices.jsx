import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Navbar from '../../components/customerService/navbar/Navbar'
// import Sidebar from '../../components/customerService/sidebar/Sidebar'

// Import Customer Service Pages (to be created later)
// import Dashboard from './dashboard/Dashboard'
// import Tickets from './tickets/Tickets'
// import Chat from './chat/Chat'
// import Knowledge from './knowledge/Knowledge'
// import Reports from './reports/Reports'
// import Settings from './settings/Settings'

import './CustomerServices.scss'

const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const CustomerServices = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 1024
            setIsMobile(mobile)

            if (window.innerWidth > 1024) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarCollapsed(false)
                setIsSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile && isSidebarOpen) {
            document.body.classList.add('sidebar-open')
        } else {
            document.body.classList.remove('sidebar-open')
        }

        return () => {
            document.body.classList.remove('sidebar-open')
        }
    }, [isMobile, isSidebarOpen])

    const handleToggleSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed)
        }
    }

    const handleCloseMobileSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    const handleMainContentClick = () => {
        if (isMobile && isSidebarOpen) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <div className="customer-services-layout">
            {/* Navbar component will be added here later */}
            {/* <Navbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            /> */}

            <div className="customer-services-content">
                {/* Sidebar component will be added here later */}
                {/* <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                /> */}

                <main
                    className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                    onClick={handleMainContentClick}
                >
                    {/* Customer Service Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<PlaceholderPage pageName="Customer Service Dashboard" />} />
                        <Route path="/dashboard" element={<Navigate to="/customerService" replace />} />

                        {/* Support Tickets Management */}
                        <Route path="/tickets" element={<PlaceholderPage pageName="Support Tickets" />} />
                        <Route path="/tickets/view/:id" element={<PlaceholderPage pageName="Ticket Details" />} />
                        <Route path="/tickets/new" element={<PlaceholderPage pageName="New Ticket" />} />

                        {/* Chat & Communication */}
                        <Route path="/chat" element={<PlaceholderPage pageName="Live Chat" />} />
                        <Route path="/messages" element={<PlaceholderPage pageName="Messages" />} />

                        {/* Customer Management */}
                        <Route path="/customers" element={<PlaceholderPage pageName="Customer Management" />} />
                        <Route path="/customers/view/:id" element={<PlaceholderPage pageName="Customer Details" />} />

                        {/* Knowledge Base */}
                        <Route path="/knowledge" element={<PlaceholderPage pageName="Knowledge Base" />} />
                        <Route path="/faq" element={<PlaceholderPage pageName="FAQ Management" />} />

                        {/* Reports & Analytics */}
                        <Route path="/reports" element={<PlaceholderPage pageName="Reports & Analytics" />} />
                        <Route path="/feedback" element={<PlaceholderPage pageName="Customer Feedback" />} />

                        {/* Settings & Configuration */}
                        <Route path="/settings" element={<PlaceholderPage pageName="Settings" />} />

                        {/* User Management */}
                        <Route path="/profile" element={<PlaceholderPage pageName="User Profile" />} />
                        <Route path="/account" element={<PlaceholderPage pageName="Account Settings" />} />

                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/customerService/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default CustomerServices