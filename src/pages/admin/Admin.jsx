import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminNavbar from '../../components/admin/adminNavbar/AdminNavbar'
import AdminSidebar from '../../components/admin/adminSidebar/AdminSidebar'

// Import Admin Pages
import AdminDashboard from './adminDashboard/AdminDashboard'
import SellersManagement from './sellersManagement/SellersManagement'
import PendingSellers from './pendingSellers/PendingSellers'
import SellerDetails from './sellersManagement/sellerDetails/SellerDetails'
import SellerResetPassword from './sellersManagement/sellerResetPassword/SellerResetPassword'
import UsersManagement from './usersManagement/UsersManagement'
import UserDetails from './usersManagement/userDetails/UserDetails'
import ResetPassword from './usersManagement/resetPassword/ResetPassword'
import DriversManagement from './driversManagement/DriversManagement'
import DriverDetails from './driversManagement/driverDetails/DriverDetails'
import OrdersManagement from './ordersManagement/OrdersManagement'
import OrderDetails from './ordersManagement/orderDetails/OrderDetails'
import ProductsManagement from './productsManagement/ProductsManagement'
import ProductDetails from './productsManagement/productDetails/ProductDetails'

// Import Category Management Components
import CategoriesManagement from './categoriesManagement/CategoriesManagement'
import CategoryDetails from './categoriesManagement/categoryDetails/CategoryDetails'

// Import Reviews Management Components
import ReviewsManagement from './reviewsManagement/ReviewsManagement'
import ReviewDetails from './reviewsManagement/reviewDetails/ReviewDetails'

// Import Payment Management Components
import PaymentsManagement from './paymentsManagement/PaymentsManagement'

// Import Reports Management Components
import ReportsManagement from './reportsManagement/ReportsManagement'

// Import Settings Management Components
import SettingsManagement from './settingsManagement/SettingsManagement'

import './Admin.scss'
import DriverResetPassword from './driversManagement/driverResetPassword/DriverResetPassowrd'

const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const Admin = () => {
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
        <div className="admin-layout">
            <AdminNavbar
                onToggleSidebar={handleToggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="admin-content">
                <AdminSidebar
                    isCollapsed={isSidebarCollapsed}
                    isMobile={isMobile}
                    isOpen={isSidebarOpen}
                    onClose={handleCloseMobileSidebar}
                />

                <main
                    className={`main-content ${isSidebarCollapsed ? 'main-content--expanded' : ''} ${isMobile ? 'main-content--mobile' : ''}`}
                    onClick={handleMainContentClick}
                >
                    {/* Admin Routes */}
                    <Routes>
                        {/* Dashboard */}
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />

                        {/* User Management */}
                        <Route path="/users" element={<UsersManagement />} />
                        <Route path="/users/details/:id" element={<UserDetails />} />
                        <Route path="/users/reset-password/:id" element={<ResetPassword />} />
                        <Route path="/sellers" element={<SellersManagement />} />
                        <Route path="/sellers/details/:id" element={<SellerDetails />} />
                        <Route path="/sellers/reset-password/:id" element={<SellerResetPassword />} />
                        <Route path="/pending-sellers" element={<PendingSellers />} />
                        <Route path="/drivers" element={<DriversManagement />} />
                        <Route path="/drivers/details/:id" element={<DriverDetails />} />
                        <Route path="/drivers/reset-password/:id" element={<DriverResetPassword />} />

                        {/* Order Management */}
                        <Route path="/orders" element={<OrdersManagement />} />
                        <Route path="/orders/details/:id" element={<OrderDetails />} />
                        <Route path="/orders/analytics" element={<PlaceholderPage pageName="Order Analytics" />} />

                        {/* Product Management */}
                        <Route path="/products" element={<ProductsManagement />} />
                        <Route path="/products/details/:id" element={<ProductDetails />} />

                        {/* Category Management */}
                        <Route path="/categories" element={<CategoriesManagement />} />
                        <Route path="/categories/details/:id" element={<CategoryDetails />} />

                        {/* Reviews Management */}
                        <Route path="/reviews" element={<ReviewsManagement />} />
                        <Route path="/reviews/details/:id" element={<ReviewDetails />} />

                        {/* Financial Management */}
                        <Route path="/payments" element={<PaymentsManagement />} />
                        <Route path="/reports" element={<ReportsManagement />} />
                        <Route path="/returns" element={<PlaceholderPage pageName="Return Orders Management" />} />

                        {/* System Management */}
                        <Route path="/settings" element={<SettingsManagement />} />
                        <Route path="/logs" element={<PlaceholderPage pageName="System Logs" />} />

                        {/* Notifications & Profile */}
                        <Route path="/notifications" element={<PlaceholderPage pageName="Notifications" />} />
                        <Route path="/profile" element={<PlaceholderPage pageName="Admin Profile" />} />

                        {/* Error Pages */}
                        <Route path="/404" element={<PlaceholderPage pageName="Page Not Found" />} />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/admin/404" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Admin