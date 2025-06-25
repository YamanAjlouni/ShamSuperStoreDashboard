import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Products from '../pages/products/Products'
import ProductForm from '../pages/products/productForm/ProductForm'
import CouponForm from '../pages/coupons/couponForm/CouponForm'
import Coupons from '../pages/coupons/Coupons'
import Orders from '../pages/orders/Orders'
import OrdersView from '../pages/orders/ordersView/OrdersView'
import Payments from '../pages/payments/Payments'
import Settings from '../pages/settings/Settings'

// Placeholder component for pages not yet implemented
const PlaceholderPage = ({ pageName }) => (
    <div className="page-placeholder">
        <div className="placeholder-content">
            <h2>{pageName}</h2>
            <p>This page is coming soon!</p>
        </div>
    </div>
)

const AppRoutes = () => {
    return (
        <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

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

            <Route
                path="/refund"
                element={<PlaceholderPage pageName="Refund Management" />}
            />

            {/* <Route
                path="/support"
                element={<PlaceholderPage pageName="Support Center" />}
            /> */}

            {/* Settings & Configuration */}
            <Route path="/settings" element={<Settings />} />


            {/* User Management */}
            <Route
                path="/profile"
                element={<PlaceholderPage pageName="User Profile" />}
            />
            <Route
                path="/account"
                element={<PlaceholderPage pageName="Account Settings" />}
            />

            {/* Error Pages */}
            <Route
                path="/404"
                element={<PlaceholderPage pageName="Page Not Found" />}
            />

            {/* Catch all route - redirect to 404 */}
            <Route
                path="*"
                element={<Navigate to="/404" replace />}
            />
        </Routes>
    )
}

export default AppRoutes