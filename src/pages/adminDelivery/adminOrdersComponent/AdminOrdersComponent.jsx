import { useState } from 'react';
import AdminOrdersListing from './adminOrderListing/AdminOrdersListing';
import AdminOrderDetails from './adminOrderDetails/AdminOrderDetails';

const AdminOrdersComponent = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentView, setCurrentView] = useState('listing');

    // Handle order selection and navigation to details
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setCurrentView('details');
    };

    // Handle navigation back to orders listing
    const handleBackToOrders = () => {
        setCurrentView('listing');
        setSelectedOrder(null);
    };

    // Render the appropriate component based on current view
    if (currentView === 'details') {
        return (
            <AdminOrderDetails
                order={selectedOrder} 
                onBack={handleBackToOrders} 
            />
        );
    }

    return (
        <AdminOrdersListing
            onOrderClick={handleOrderClick}
        />
    );
};

export default AdminOrdersComponent;