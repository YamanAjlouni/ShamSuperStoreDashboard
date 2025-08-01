import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../../components/accountant/navbar/Navbar'
import Sidebar from '../../components/accountant/sidebar/Sidebar'

// Import Accountant Pages
import Dashboard from './dashboard/Dashboard'
import AccountantOrdersReports from './accountantOrdersReports/AccountantOrdersReports'
import AccountantPaymentReports from './accountantPaymentReports/AccountantPaymentReports'
import AccountantTaxInformation from './accountantTaxInformation/AccountantTaxInformation'
import AccountantSettings from './accountantSettings/AccountantSettings'

import './Accountant.scss'

const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const Accountant = () => {
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
        <div className="accountant-layout">
            <Navbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="accountant-content">
                <Sidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                />

                <main
                    className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                    onClick={handleMainContentClick}
                >
                    {/* Accountant Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/accountant" replace />} />

                        {/* Reports Management */}
                        <Route path="/orders-reports" element={<AccountantOrdersReports />} />
                        <Route path="/payment-reports" element={<AccountantPaymentReports />} />
                        <Route path="/tax-information" element={<AccountantTaxInformation />} />

                        {/* Settings & Configuration */}
                        <Route path="/settings" element={<AccountantSettings />} />

                        {/* User Management */}
                        <Route path="/profile" element={<PlaceholderPage pageName="User Profile" />} />
                        <Route path="/account" element={<PlaceholderPage pageName="Account Settings" />} />

                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/accountant/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Accountant