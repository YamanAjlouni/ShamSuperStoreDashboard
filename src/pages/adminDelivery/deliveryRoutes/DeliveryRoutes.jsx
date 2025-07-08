import { useState, useEffect } from 'react'
import './DeliveryRoutes.scss'

const DeliveryRoutes = () => {
    const [loading, setLoading] = useState(true)
    const [routes, setRoutes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [dateRange, setDateRange] = useState('today')
    const [sortBy, setSortBy] = useState('priority')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // grid or list

    useEffect(() => {
        const fetchRoutes = async () => {
            setLoading(true)
            setTimeout(() => {
                const mockRoutes = [
                    {
                        id: 'RT001',
                        name: 'Downtown Express',
                        status: 'active',
                        priority: 'high',
                        driver: {
                            name: 'John Miller',
                            id: 'DRV001',
                            phone: '+1 (555) 123-4567',
                            rating: 4.8
                        },
                        vehicle: {
                            type: 'Van',
                            model: 'Ford Transit',
                            plate: 'DLV-001',
                            capacity: '15 packages'
                        },
                        schedule: {
                            startTime: '2024-01-25T08:00:00Z',
                            endTime: '2024-01-25T14:00:00Z',
                            estimatedDuration: '6 hours'
                        },
                        locations: {
                            start: 'Main Distribution Center, 123 Industrial Blvd',
                            end: 'Downtown Hub, 456 Central Ave',
                            waypoints: 8
                        },
                        deliveries: [
                            { id: 'DEL051', address: '789 First St', priority: 'urgent', estimatedTime: '09:15' },
                            { id: 'DEL052', address: '321 Main Ave', priority: 'standard', estimatedTime: '09:45' },
                            { id: 'DEL053', address: '654 Oak St', priority: 'high', estimatedTime: '10:30' },
                            { id: 'DEL054', address: '987 Pine Rd', priority: 'standard', estimatedTime: '11:00' },
                            { id: 'DEL055', address: '147 Elm Way', priority: 'urgent', estimatedTime: '11:45' },
                            { id: 'DEL056', address: '258 Cedar Ln', priority: 'standard', estimatedTime: '12:30' },
                            { id: 'DEL057', address: '369 Birch Ave', priority: 'high', estimatedTime: '13:00' },
                            { id: 'DEL058', address: '741 Maple Dr', priority: 'standard', estimatedTime: '13:30' }
                        ],
                        metrics: {
                            totalDistance: '34.2 miles',
                            estimatedFuel: '$18.50',
                            efficiency: 92,
                            onTimeDeliveries: 7,
                            totalPackages: 24
                        },
                        progress: {
                            completed: 3,
                            total: 8,
                            currentLocation: '321 Main Ave',
                            nextStop: '654 Oak St',
                            eta: '10:30 AM'
                        }
                    },
                    {
                        id: 'RT002',
                        name: 'Suburban Circuit',
                        status: 'planned',
                        priority: 'medium',
                        driver: {
                            name: 'Sarah Johnson',
                            id: 'DRV002',
                            phone: '+1 (555) 234-5678',
                            rating: 4.9
                        },
                        vehicle: {
                            type: 'Truck',
                            model: 'Isuzu NPR',
                            plate: 'DLV-002',
                            capacity: '25 packages'
                        },
                        schedule: {
                            startTime: '2024-01-25T09:30:00Z',
                            endTime: '2024-01-25T16:30:00Z',
                            estimatedDuration: '7 hours'
                        },
                        locations: {
                            start: 'North Warehouse, 789 Commerce Dr',
                            end: 'Suburban Center, 321 Shopping Blvd',
                            waypoints: 12
                        },
                        deliveries: [
                            { id: 'DEL059', address: '123 Residential Way', priority: 'standard', estimatedTime: '10:15' },
                            { id: 'DEL060', address: '456 Suburb Lane', priority: 'high', estimatedTime: '10:45' },
                            { id: 'DEL061', address: '789 Family Circle', priority: 'standard', estimatedTime: '11:30' },
                            { id: 'DEL062', address: '321 Garden Path', priority: 'urgent', estimatedTime: '12:00' },
                            { id: 'DEL063', address: '654 Meadow View', priority: 'standard', estimatedTime: '12:45' },
                            { id: 'DEL064', address: '987 Valley Road', priority: 'high', estimatedTime: '13:30' },
                            { id: 'DEL065', address: '147 Hill Crest', priority: 'standard', estimatedTime: '14:15' },
                            { id: 'DEL066', address: '258 Brook Side', priority: 'standard', estimatedTime: '15:00' },
                            { id: 'DEL067', address: '369 Park View', priority: 'urgent', estimatedTime: '15:30' },
                            { id: 'DEL068', address: '741 Sunset Dr', priority: 'standard', estimatedTime: '16:00' },
                            { id: 'DEL069', address: '852 Dawn Avenue', priority: 'high', estimatedTime: '16:15' },
                            { id: 'DEL070', address: '963 Night Circle', priority: 'standard', estimatedTime: '16:30' }
                        ],
                        metrics: {
                            totalDistance: '48.7 miles',
                            estimatedFuel: '$26.20',
                            efficiency: 89,
                            onTimeDeliveries: 0,
                            totalPackages: 35
                        },
                        progress: {
                            completed: 0,
                            total: 12,
                            currentLocation: 'North Warehouse',
                            nextStop: '123 Residential Way',
                            eta: '10:15 AM'
                        }
                    },
                    {
                        id: 'RT003',
                        name: 'Express Priority',
                        status: 'completed',
                        priority: 'urgent',
                        driver: {
                            name: 'Mike Chen',
                            id: 'DRV003',
                            phone: '+1 (555) 345-6789',
                            rating: 4.7
                        },
                        vehicle: {
                            type: 'Motorcycle',
                            model: 'Honda CBR',
                            plate: 'DLV-003',
                            capacity: '5 packages'
                        },
                        schedule: {
                            startTime: '2024-01-24T13:00:00Z',
                            endTime: '2024-01-24T17:00:00Z',
                            estimatedDuration: '4 hours'
                        },
                        locations: {
                            start: 'Express Hub, 555 Speed Way',
                            end: 'City Center, 777 Business District',
                            waypoints: 5
                        },
                        deliveries: [
                            { id: 'DEL046', address: '888 Corporate Plaza', priority: 'urgent', estimatedTime: '13:30' },
                            { id: 'DEL047', address: '999 Executive Tower', priority: 'urgent', estimatedTime: '14:15' },
                            { id: 'DEL048', address: '111 Finance Building', priority: 'urgent', estimatedTime: '15:00' },
                            { id: 'DEL049', address: '222 Tech Campus', priority: 'urgent', estimatedTime: '15:45' },
                            { id: 'DEL050', address: '333 Innovation Center', priority: 'urgent', estimatedTime: '16:30' }
                        ],
                        metrics: {
                            totalDistance: '18.3 miles',
                            estimatedFuel: '$8.40',
                            efficiency: 96,
                            onTimeDeliveries: 5,
                            totalPackages: 5
                        },
                        progress: {
                            completed: 5,
                            total: 5,
                            currentLocation: 'City Center',
                            nextStop: 'Route Complete',
                            eta: 'Completed'
                        }
                    },
                    {
                        id: 'RT004',
                        name: 'Industrial Zone',
                        status: 'delayed',
                        priority: 'medium',
                        driver: {
                            name: 'Lisa Rodriguez',
                            id: 'DRV004',
                            phone: '+1 (555) 456-7890',
                            rating: 4.6
                        },
                        vehicle: {
                            type: 'Van',
                            model: 'Mercedes Sprinter',
                            plate: 'DLV-004',
                            capacity: '20 packages'
                        },
                        schedule: {
                            startTime: '2024-01-25T07:00:00Z',
                            endTime: '2024-01-25T15:00:00Z',
                            estimatedDuration: '8 hours'
                        },
                        locations: {
                            start: 'Warehouse District, 444 Logistics Ave',
                            end: 'Manufacturing Hub, 666 Factory Rd',
                            waypoints: 10
                        },
                        deliveries: [
                            { id: 'DEL071', address: '101 Factory Lane', priority: 'high', estimatedTime: '08:00' },
                            { id: 'DEL072', address: '202 Industrial Blvd', priority: 'standard', estimatedTime: '08:45' },
                            { id: 'DEL073', address: '303 Manufacturing Way', priority: 'high', estimatedTime: '09:30' },
                            { id: 'DEL074', address: '404 Production St', priority: 'standard', estimatedTime: '10:15' },
                            { id: 'DEL075', address: '505 Assembly Ave', priority: 'urgent', estimatedTime: '11:00' },
                            { id: 'DEL076', address: '606 Workshop Dr', priority: 'standard', estimatedTime: '12:00' },
                            { id: 'DEL077', address: '707 Machinery Rd', priority: 'high', estimatedTime: '13:00' },
                            { id: 'DEL078', address: '808 Equipment Way', priority: 'standard', estimatedTime: '13:45' },
                            { id: 'DEL079', address: '909 Tool Center', priority: 'standard', estimatedTime: '14:30' },
                            { id: 'DEL080', address: '1010 Supply Chain Ave', priority: 'high', estimatedTime: '15:00' }
                        ],
                        metrics: {
                            totalDistance: '52.1 miles',
                            estimatedFuel: '$31.80',
                            efficiency: 85,
                            onTimeDeliveries: 4,
                            totalPackages: 42
                        },
                        progress: {
                            completed: 4,
                            total: 10,
                            currentLocation: '404 Production St',
                            nextStop: '505 Assembly Ave',
                            eta: '11:30 AM (30 min delayed)'
                        }
                    },
                    {
                        id: 'RT005',
                        name: 'Evening Shift',
                        status: 'scheduled',
                        priority: 'low',
                        driver: {
                            name: 'David Wilson',
                            id: 'DRV005',
                            phone: '+1 (555) 567-8901',
                            rating: 4.5
                        },
                        vehicle: {
                            type: 'Van',
                            model: 'Nissan NV200',
                            plate: 'DLV-005',
                            capacity: '12 packages'
                        },
                        schedule: {
                            startTime: '2024-01-25T18:00:00Z',
                            endTime: '2024-01-25T22:00:00Z',
                            estimatedDuration: '4 hours'
                        },
                        locations: {
                            start: 'Evening Depot, 123 Night Shift Rd',
                            end: 'Residential Area, 789 Community Dr',
                            waypoints: 6
                        },
                        deliveries: [
                            { id: 'DEL081', address: '111 Evening Way', priority: 'standard', estimatedTime: '18:30' },
                            { id: 'DEL082', address: '222 Twilight St', priority: 'standard', estimatedTime: '19:00' },
                            { id: 'DEL083', address: '333 Dusk Avenue', priority: 'standard', estimatedTime: '19:45' },
                            { id: 'DEL084', address: '444 Sunset Blvd', priority: 'high', estimatedTime: '20:30' },
                            { id: 'DEL085', address: '555 Moonlight Dr', priority: 'standard', estimatedTime: '21:15' },
                            { id: 'DEL086', address: '666 Starlight Rd', priority: 'standard', estimatedTime: '21:45' }
                        ],
                        metrics: {
                            totalDistance: '28.5 miles',
                            estimatedFuel: '$15.20',
                            efficiency: 91,
                            onTimeDeliveries: 0,
                            totalPackages: 18
                        },
                        progress: {
                            completed: 0,
                            total: 6,
                            currentLocation: 'Evening Depot',
                            nextStop: '111 Evening Way',
                            eta: '6:30 PM'
                        }
                    },
                    {
                        id: 'RT006',
                        name: 'Weekend Special',
                        status: 'optimizing',
                        priority: 'medium',
                        driver: {
                            name: 'Emma Davis',
                            id: 'DRV006',
                            phone: '+1 (555) 678-9012',
                            rating: 4.9
                        },
                        vehicle: {
                            type: 'Truck',
                            model: 'Freightliner Cascadia',
                            plate: 'DLV-006',
                            capacity: '50 packages'
                        },
                        schedule: {
                            startTime: '2024-01-27T10:00:00Z',
                            endTime: '2024-01-27T18:00:00Z',
                            estimatedDuration: '8 hours'
                        },
                        locations: {
                            start: 'Weekend Hub, 987 Saturday Ave',
                            end: 'Distribution Point, 654 Sunday Blvd',
                            waypoints: 15
                        },
                        deliveries: [
                            { id: 'DEL087', address: '123 Weekend Way', priority: 'standard', estimatedTime: '10:30' },
                            { id: 'DEL088', address: '456 Holiday St', priority: 'high', estimatedTime: '11:15' },
                            { id: 'DEL089', address: '789 Leisure Ln', priority: 'standard', estimatedTime: '12:00' },
                            { id: 'DEL090', address: '321 Relaxation Rd', priority: 'standard', estimatedTime: '12:45' },
                            { id: 'DEL091', address: '654 Recreation Ave', priority: 'urgent', estimatedTime: '13:30' }
                        ],
                        metrics: {
                            totalDistance: '67.3 miles',
                            estimatedFuel: '$42.50',
                            efficiency: 88,
                            onTimeDeliveries: 0,
                            totalPackages: 65
                        },
                        progress: {
                            completed: 0,
                            total: 15,
                            currentLocation: 'Route Planning',
                            nextStop: 'Optimization in Progress',
                            eta: 'TBD'
                        }
                    }
                ]
                setRoutes(mockRoutes)
                setLoading(false)
            }, 1200)
        }

        fetchRoutes()
    }, [dateRange])

    const filteredRoutes = routes.filter(route => {
        const matchesSearch =
            route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.locations.start.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || route.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const sortedRoutes = [...filteredRoutes].sort((a, b) => {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
                return priorityOrder[b.priority] - priorityOrder[a.priority]
            case 'time':
                return new Date(a.schedule.startTime) - new Date(b.schedule.startTime)
            case 'distance':
                return parseFloat(b.metrics.totalDistance) - parseFloat(a.metrics.totalDistance)
            case 'efficiency':
                return b.metrics.efficiency - a.metrics.efficiency
            case 'deliveries':
                return b.deliveries.length - a.deliveries.length
            default:
                return 0
        }
    })

    // Pagination
    const totalRoutes = sortedRoutes.length
    const totalPages = Math.ceil(totalRoutes / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedRoutes = sortedRoutes.slice(startIndex, startIndex + itemsPerPage)

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#10b981'
            case 'completed': return '#6b7280'
            case 'planned': return '#3b82f6'
            case 'scheduled': return '#8b5cf6'
            case 'delayed': return '#ef4444'
            case 'optimizing': return '#f59e0b'
            default: return '#6b7280'
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return '#ef4444'
            case 'high': return '#f59e0b'
            case 'medium': return '#3b82f6'
            case 'low': return '#6b7280'
            default: return '#6b7280'
        }
    }

    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'Active'
            case 'completed': return 'Completed'
            case 'planned': return 'Planned'
            case 'scheduled': return 'Scheduled'
            case 'delayed': return 'Delayed'
            case 'optimizing': return 'Optimizing'
            default: return status
        }
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const calculateProgress = (completed, total) => {
        return total > 0 ? Math.round((completed / total) * 100) : 0
    }

    const exportToCSV = () => {
        const csvData = [
            ['Route ID', 'Route Name', 'Driver', 'Status', 'Priority', 'Deliveries', 'Distance', 'Efficiency'],
            ...sortedRoutes.map(route => [
                route.id,
                route.name,
                route.driver.name,
                route.status,
                route.priority,
                route.deliveries.length,
                route.metrics.totalDistance,
                `${route.metrics.efficiency}%`
            ])
        ]

        const csvContent = csvData.map(row => row.join(',')).join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', `delivery-routes-${new Date().toISOString().split('T')[0]}.csv`)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    if (loading) {
        return (
            <div className="delivery-routes">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading delivery routes...</p>
                </div>
            </div>
        )
    }

    const activeRoutes = routes.filter(r => r.status === 'active').length
    const totalDeliveries = routes.reduce((sum, r) => sum + r.deliveries.length, 0)
    const averageEfficiency = routes.reduce((sum, r, _, arr) => sum + r.metrics.efficiency / arr.length, 0)

    return (
        <div className="delivery-routes">
            <div className="page-header">
                <div className="header-content">
                    <h1>Delivery Routes</h1>
                    <p>Manage and optimize your delivery routes for maximum efficiency</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-number">{activeRoutes}</span>
                        <span className="stat-label">Active Routes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{totalDeliveries}</span>
                        <span className="stat-label">Total Deliveries</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">{averageEfficiency.toFixed(1)}%</span>
                        <span className="stat-label">Avg Efficiency</span>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="controls-left">
                    <div className="search-box">
                        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by route name, driver, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="planned">Planned</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="delayed">Delayed</option>
                            <option value="optimizing">Optimizing</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                </div>
                <div className="controls-right">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="sort-group">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="priority">Priority</option>
                            <option value="time">Start Time</option>
                            <option value="distance">Distance</option>
                            <option value="efficiency">Efficiency</option>
                            <option value="deliveries">Deliveries</option>
                        </select>
                    </div>
                    <button className="export-btn" onClick={exportToCSV}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            </div>

            <div className={`routes-container ${viewMode}`}>
                {paginatedRoutes.length > 0 ? (
                    paginatedRoutes.map((route) => (
                        <div key={route.id} className="route-card">
                            <div className="card-header">
                                <div className="route-info">
                                    <div className="route-title">
                                        <span className="route-id">#{route.id}</span>
                                        <h3 className="route-name">{route.name}</h3>
                                    </div>
                                    <div className="route-badges">
                                        <span
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(route.status) }}
                                        >
                                            {getStatusLabel(route.status)}
                                        </span>
                                        <span
                                            className="priority-badge"
                                            style={{ backgroundColor: getPriorityColor(route.priority) }}
                                        >
                                            {route.priority.charAt(0).toUpperCase() + route.priority.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <div className="route-schedule">
                                    <div className="schedule-item">
                                        <span className="label">Start:</span>
                                        <span className="time">{formatTime(route.schedule.startTime)}</span>
                                    </div>
                                    <div className="schedule-item">
                                        <span className="label">End:</span>
                                        <span className="time">{formatTime(route.schedule.endTime)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="driver-vehicle-section">
                                    <div className="driver-info">
                                        <h4>Driver</h4>
                                        <div className="driver-details">
                                            <span className="driver-name">{route.driver.name}</span>
                                            <div className="driver-meta">
                                                <span>ID: {route.driver.id}</span>
                                                <span>Rating: {route.driver.rating}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vehicle-info">
                                        <h4>Vehicle</h4>
                                        <div className="vehicle-details">
                                            <span className="vehicle-model">{route.vehicle.model}</span>
                                            <div className="vehicle-meta">
                                                <span>{route.vehicle.plate}</span>
                                                <span>{route.vehicle.capacity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="route-progress">
                                    <h4>Progress</h4>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${calculateProgress(route.progress.completed, route.progress.total)}%`,
                                                backgroundColor: getStatusColor(route.status)
                                            }}
                                        />
                                    </div>
                                    <div className="progress-info">
                                        <span>{route.progress.completed}/{route.progress.total} deliveries</span>
                                        <span>{calculateProgress(route.progress.completed, route.progress.total)}% complete</span>
                                    </div>
                                    <div className="current-status">
                                        <div className="status-item">
                                            <span className="label">Current:</span>
                                            <span className="value">{route.progress.currentLocation}</span>
                                        </div>
                                        <div className="status-item">
                                            <span className="label">Next:</span>
                                            <span className="value">{route.progress.nextStop}</span>
                                        </div>
                                        <div className="status-item">
                                            <span className="label">ETA:</span>
                                            <span className="value">{route.progress.eta}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="route-metrics">
                                    <h4>Route Metrics</h4>
                                    <div className="metrics-grid">
                                        <div className="metric-item">
                                            <span className="metric-value">{route.metrics.totalDistance}</span>
                                            <span className="metric-label">Total Distance</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="metric-value">{route.metrics.efficiency}%</span>
                                            <span className="metric-label">Efficiency</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="metric-value">{route.metrics.totalPackages}</span>
                                            <span className="metric-label">Packages</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="metric-value">{route.metrics.estimatedFuel}</span>
                                            <span className="metric-label">Est. Fuel</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="deliveries-preview">
                                    <h4>Upcoming Deliveries</h4>
                                    <div className="delivery-list">
                                        {route.deliveries.slice(route.progress.completed, route.progress.completed + 3).map((delivery, index) => (
                                            <div key={delivery.id} className="delivery-item">
                                                <span className="delivery-time">{delivery.estimatedTime}</span>
                                                <span className="delivery-address">{delivery.address}</span>
                                                <span
                                                    className="delivery-priority"
                                                    style={{ color: getPriorityColor(delivery.priority) }}
                                                >
                                                    {delivery.priority}
                                                </span>
                                            </div>
                                        ))}
                                        {route.deliveries.length > route.progress.completed + 3 && (
                                            <div className="more-deliveries">
                                                +{route.deliveries.length - route.progress.completed - 3} more stops
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button
                                    className="action-btn view-details"
                                    onClick={() => setSelectedRoute(route)}
                                >
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Details
                                </button>
                                <button className="action-btn optimize">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Optimize
                                </button>
                                {route.status === 'active' && (
                                    <button className="action-btn track">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Track Live
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <h3>No Routes Found</h3>
                        <p>No routes match your current search and filter criteria.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    <div className="pagination-info">
                        <span>Page {currentPage} of {totalPages}</span>
                        <span className="total-items">({totalRoutes} total routes)</span>
                    </div>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Route Details Modal */}
            {selectedRoute && (
                <div className="modal-overlay" onClick={() => setSelectedRoute(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Route Details - {selectedRoute.name}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedRoute(null)}
                            >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-section">
                                <h3>Route Information</h3>
                                <div className="route-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Route ID:</span>
                                        <span className="detail-value">{selectedRoute.id}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Start Location:</span>
                                        <span className="detail-value">{selectedRoute.locations.start}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">End Location:</span>
                                        <span className="detail-value">{selectedRoute.locations.end}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Total Waypoints:</span>
                                        <span className="detail-value">{selectedRoute.locations.waypoints}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-section">
                                <h3>All Deliveries</h3>
                                <div className="delivery-timeline">
                                    {selectedRoute.deliveries.map((delivery, index) => (
                                        <div
                                            key={delivery.id}
                                            className={`timeline-item ${index < selectedRoute.progress.completed ? 'completed' : ''}`}
                                        >
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-time">{delivery.estimatedTime}</div>
                                                <div className="timeline-address">{delivery.address}</div>
                                                <div className="timeline-meta">
                                                    <span className="delivery-id">#{delivery.id}</span>
                                                    <span
                                                        className="timeline-priority"
                                                        style={{ color: getPriorityColor(delivery.priority) }}
                                                    >
                                                        {delivery.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn--secondary"
                                onClick={() => setSelectedRoute(null)}
                            >
                                Close
                            </button>
                            <button className="btn btn--primary">
                                Optimize Route
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DeliveryRoutes