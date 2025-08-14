import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../../components/seller/navbar/Navbar'
import Sidebar from '../../components/seller/sidebar/Sidebar'

// Import Seller Pages
import Dashboard from './dashboard/Dashboard'
import Products from './products/Products'
import ProductForm from './products/productForm/ProductForm'
import CouponForm from './coupons/couponForm/CouponForm'
import Coupons from './coupons/Coupons'
import Orders from './orders/Orders'
import OrdersView from './orders/ordersView/OrdersView'
import Payments from './payments/Payments'
import Settings from './settings/Settings'

import './Seller.scss'
import ProductDetails from './products/productDetails/ProductDetails'
import Refund from './refund/Refund'

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
                        <Route path="/products/view/:id" element={<ProductDetails mode="view" />} />

                        {/* E-commerce Pages */}
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/orders/view/:id" element={<OrdersView />} />

                        <Route path="/coupons" element={<Coupons />} />
                        <Route path="/coupons/new" element={<CouponForm mode="add" />} />
                        <Route path="/coupons/edit/:id" element={<CouponForm mode="edit" />} />

                        {/* Financial Management */}
                        <Route path="/payments" element={<Payments />} />
                        <Route path="/refund" element={<Refund />} />

                        {/* Settings & Configuration */}
                        <Route path="/settings" element={<Settings />} />

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