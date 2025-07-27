import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from '../pages/login/Login'
import Seller from '../pages/seller/Seller'
import Admin from '../pages/admin/Admin'
import Delivery from '../pages/delivery/Delivery'
import AdminDeliverySidebar from '../components/adminDelivery/AdminDeliverySidebar/AdminDeliverySidebar'
import AdminDelivery from '../pages/adminDelivery/AdminDelivery'
import WebsiteAdmin from '../pages/websiteAdmin/WebsiteAdmin'
import CustomerServices from '../pages/customerServices/CustomerServices'

const AppRoutes = () => {
    const location = useLocation()
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const userRole = localStorage.getItem('userRole')

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && location.pathname !== '/login') {
        return <Navigate to="/login" replace />
    }

    // If authenticated and on login page, redirect to appropriate dashboard
    if (isAuthenticated && location.pathname === '/login') {
        if (userRole === 'seller') return <Navigate to="/seller" replace />
        if (userRole === 'admin') return <Navigate to="/admin" replace />
        if (userRole === 'delivery') return <Navigate to="/delivery" replace />
        if (userRole === 'adminDelivery') return <Navigate to="/adminDelivery" replace />
        if (userRole === 'websiteAdmin') return <Navigate to="/websiteAdmin/intro-section" replace />
        if (userRole === 'customerService') return <Navigate to="/customerService" replace />
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/seller/*" element={<Seller />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/adminDelivery/*" element={<AdminDelivery />} />
            <Route path="/delivery/*" element={<Delivery />} />
            <Route path="/websiteAdmin/*" element={<WebsiteAdmin />} />
            <Route path="/customerService/*" element={<CustomerServices />} />

            {/* Default redirects */}
            <Route
                path="/"
                element={
                    isAuthenticated ? (
                        userRole === 'seller' ? <Navigate to="/seller" replace /> :
                            userRole === 'admin' ? <Navigate to="/admin" replace /> :
                                userRole === 'delivery' ? <Navigate to="/delivery" replace /> :
                                    userRole === 'adminDelivery' ? <Navigate to="/adminDelivery" replace /> :
                                        userRole === 'websiteAdmin' ? <Navigate to="/websiteAdmin/intro-section" replace /> :
                                            userRole === 'customerService' ? <Navigate to="/customerService" replace /> :
                                                <Navigate to="/login" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes