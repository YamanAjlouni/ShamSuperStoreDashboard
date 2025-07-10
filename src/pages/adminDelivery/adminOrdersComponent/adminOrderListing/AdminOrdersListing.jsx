import { useState } from 'react';
import './AdminOrdersListing.scss';

const AdminOrdersListing = ({ onOrderClick }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Mock orders data with Syrian locations and USD prices
    const allOrders = [
        {
            id: '#ORD001',
            from: 'Damascus',
            to: 'Aleppo',
            status: 'pending',
            size: 'large',
            customer: {
                name: 'Ahmad Al-Mohammad',
                phone: '+963123456789',
                address: '123 Al-Umayyad Street, Damascus, Syria'
            },
            seller: {
                name: 'Damascus Electronics',
                phone: '+963123456788',
                address: '456 Souq Al-Hamidiyah, Damascus, Syria'
            },
            items: [
                { name: 'Wireless Keyboard', quantity: 2, price: 45 },
                { name: 'Gaming Mouse', quantity: 1, price: 35 },
                { name: 'USB Cable', quantity: 3, price: 10 }
            ],
            total: 135,
            orderTime: '10:30 AM',
            estimatedDelivery: '2:30 PM'
        },
        {
            id: '#ORD002',
            from: 'Aleppo',
            to: 'Homs',
            status: 'processing',
            size: 'medium',
            customer: {
                name: 'Fatima Al-Zahra',
                phone: '+963123456787',
                address: '789 Al-Aziziyah District, Aleppo, Syria'
            },
            seller: {
                name: 'Aleppo Mobile Shop',
                phone: '+963123456786',
                address: '321 Baron Street, Aleppo, Syria'
            },
            items: [
                { name: 'Phone Case', quantity: 1, price: 25 },
                { name: 'Screen Protector', quantity: 2, price: 30 }
            ],
            total: 85,
            orderTime: '11:15 AM',
            estimatedDelivery: '1:15 PM'
        },
        {
            id: '#ORD003',
            from: 'Homs',
            to: 'Latakia',
            status: 'processing',
            size: 'small',
            customer: {
                name: 'Omar Al-Khatib',
                phone: '+963123456785',
                address: '654 Al-Hadra District, Homs, Syria'
            },
            seller: {
                name: 'Homs Books & More',
                phone: '+963123456784',
                address: '987 Al-Dablan Street, Homs, Syria'
            },
            items: [
                { name: 'Programming Book', quantity: 1, price: 60 },
                { name: 'Notebook', quantity: 2, price: 15 },
                { name: 'Pen Set', quantity: 1, price: 25 }
            ],
            total: 115,
            orderTime: '9:45 AM',
            estimatedDelivery: '12:45 PM'
        },
        {
            id: '#ORD004',
            from: 'Latakia',
            to: 'Tartus',
            status: 'pending',
            size: 'large',
            customer: {
                name: 'Layla Al-Ahmad',
                phone: '+963123456783',
                address: '159 Al-Ziraa Street, Latakia, Syria'
            },
            seller: {
                name: 'Latakia Home Appliances',
                phone: '+963123456782',
                address: '753 Port Area, Latakia, Syria'
            },
            items: [
                { name: 'Coffee Maker', quantity: 1, price: 240 },
                { name: 'Water Filter', quantity: 1, price: 105 }
            ],
            total: 345,
            orderTime: '12:00 PM',
            estimatedDelivery: '4:00 PM'
        },
        {
            id: '#ORD005',
            from: 'Tartus',
            to: 'Damascus',
            status: 'pending',
            size: 'medium',
            customer: {
                name: 'Youssef Al-Masri',
                phone: '+963123456781',
                address: '852 Corniche Street, Tartus, Syria'
            },
            seller: {
                name: 'Tartus Sports Equipment',
                phone: '+963123456780',
                address: '741 Sports Complex, Tartus, Syria'
            },
            items: [
                { name: 'Football', quantity: 1, price: 35 },
                { name: 'Sports Shoes', quantity: 1, price: 120 },
                { name: 'Water Bottle', quantity: 2, price: 18 }
            ],
            total: 191,
            orderTime: '1:20 PM',
            estimatedDelivery: '4:20 PM'
        },
        {
            id: '#ORD006',
            from: 'Damascus',
            to: 'Daraa',
            status: 'processing',
            size: 'small',
            customer: {
                name: 'Maryam Al-Fares',
                phone: '+963123456779',
                address: '456 Al-Mahatta District, Daraa, Syria'
            },
            seller: {
                name: 'Damascus Fashion Store',
                phone: '+963123456778',
                address: '123 Straight Street, Damascus, Syria'
            },
            items: [
                { name: 'Summer Dress', quantity: 1, price: 90 },
                { name: 'Handbag', quantity: 1, price: 75 }
            ],
            total: 165,
            orderTime: '8:30 AM',
            estimatedDelivery: '11:30 AM'
        }
    ];

    // Filter orders based on active filter
    const orders = allOrders.filter(order => {
        if (activeFilter === 'all') return true;
        return order.status === activeFilter;
    });

    const getStatusClass = (status) => {
        switch(status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            default: return '';
        }
    };

    const getSizeClass = (size) => {
        switch(size) {
            case 'small': return 'size-small';
            case 'medium': return 'size-medium';
            case 'large': return 'size-large';
            default: return '';
        }
    };

    const handleOrderClick = (order) => {
        if (onOrderClick) {
            onOrderClick(order);
        }
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'pending': return 'Pending';
            case 'processing': return 'Processing';
            default: return status;
        }
    };

    return (
        <div className="orders-listing">
            <div className="orders-header">
                <h2>Orders Management</h2>
                <div className="filter-buttons">
                    <button 
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All Orders
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('pending')}
                    >
                        Pending
                    </button>
                    <button 
                        className={`filter-btn ${activeFilter === 'processing' ? 'active' : ''}`}
                        onClick={() => setActiveFilter('processing')}
                    >
                        Processing
                    </button>
                </div>
            </div>

            <div className="orders-grid">
                {orders.map(order => (
                    <div 
                        key={order.id} 
                        className={`order-card ${getSizeClass(order.size)}`}
                        onClick={() => handleOrderClick(order)}
                    >
                        <div className="order-card-header">
                            <span className="order-id">{order.id}</span>
                            <div className="order-badges">
                                <span className={`status ${getStatusClass(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="order-route">
                            <div className="route-point from">
                                <span className="route-label">From</span>
                                <span className="route-location">{order.from}</span>
                            </div>
                            <div className="route-arrow">→</div>
                            <div className="route-point to">
                                <span className="route-label">To</span>
                                <span className="route-location">{order.to}</span>
                            </div>
                        </div>

                        <div className="order-card-footer">
                            <span className="order-time">{order.orderTime}</span>
                            <span className="order-total">${order.total}</span>
                        </div>

                        <div className="size-indicator">
                            <span className={`size-badge ${getSizeClass(order.size)}`}>
                                {order.size}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersListing;