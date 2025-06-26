import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../../components/seller/navbar/Navbar'
import Sidebar from '../../components/seller/sidebar/Sidebar'

// Import Seller Pages
import Dashboard from '../dashboard/Dashboard'
import Products from '../products/Products'
import ProductForm from '../products/productForm/ProductForm'
import CouponForm from '../coupons/couponForm/CouponForm'
import Coupons from '../coupons/Coupons'
import Orders from '../orders/Orders'
import OrdersView from '../orders/ordersView/OrdersView'
import Payments from '../payments/Payments'
import Settings from '../settings/Settings'

import './Seller.scss'

const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const Seller = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)

            // Auto-collapse sidebar on tablet screens
            if (window.innerWidth <= 1024 && window.innerWidth > 768) {
                setIsSidebarCollapsed(true)
            }

            // Reset states on mobile
            if (mobile) {
                setIsSidebarCollapsed(false)
                setIsSidebarOpen(false)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Handle sidebar toggle from navbar
    const handleToggleSidebar = () => {
        if (isMobile) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
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
        <div className="seller-layout">
            <Navbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="seller-content">
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
                    {/* Seller Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/seller" replace />} />

                        {/* Products Management */}
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/new" element={<ProductForm mode="add" />} />
                        <Route path="/products/edit/:id" element={<ProductForm mode="edit" />} />

                        {/* E-commerce Pages */}
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/view/:id" element={<OrdersView />} />

                        <Route path="/coupons" element={<Coupons />} />
                        <Route path="/coupons/new" element={<CouponForm mode="add" />} />
                        <Route path="/coupons/edit/:id" element={<CouponForm mode="edit" />} />

                        {/* Financial Management */}
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/refund" element={<PlaceholderPage pageName="Refund Management" />} />

                        {/* Settings & Configuration */}
                        <Route path="/settings" element={<Settings />} />

                        {/* User Management */}
                        <Route path="/profile" element={<PlaceholderPage pageName="User Profile" />} />
                        <Route path="/account" element={<PlaceholderPage pageName="Account Settings" />} />

                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/seller/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Seller