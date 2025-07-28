import { useState } from 'react'
import {
    ArrowLeft,
    Mail,
    Calendar,
    Clock,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    Ticket,
    Package,
    Store,
    Star,
    Filter,
    MoreVertical
} from 'lucide-react'
import './CustomerServiceUserDetails.scss'

const CustomerServiceUserDetails = ({ user, onBack }) => {
    const [ticketFilter, setTicketFilter] = useState('all')
    const [priorityFilter, setPriorityFilter] = useState('all')
    const [showUserActions, setShowUserActions] = useState(false)

    // Filter tickets based on status and priority
    const filteredTickets = user.tickets.filter(ticket => {
        const matchesStatus = ticketFilter === 'all' || ticket.status === ticketFilter
        const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
        return matchesStatus && matchesPriority
    })

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { icon: CheckCircle, class: 'status-active', text: 'Active' },
            pending: { icon: Clock, class: 'status-pending', text: 'Pending' },
            suspended: { icon: XCircle, class: 'status-suspended', text: 'Suspended' }
        }
        const config = statusConfig[status] || statusConfig.pending
        const IconComponent = config.icon

        return (
            <span className={`status-badge ${config.class}`}>
                <IconComponent size={14} />
                {config.text}
            </span>
        )
    }

    const getTicketStatusBadge = (status) => {
        const statusConfig = {
            open: { class: 'ticket-status-open', text: 'Open' },
            resolved: { class: 'ticket-status-resolved', text: 'Resolved' },
            closed: { class: 'ticket-status-closed', text: 'Closed' }
        }
        const config = statusConfig[status] || statusConfig.open

        return (
            <span className={`ticket-status-badge ${config.class}`}>
                {config.text}
            </span>
        )
    }

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            low: { class: 'priority-low', text: 'Low' },
            medium: { class: 'priority-medium', text: 'Medium' },
            high: { class: 'priority-high', text: 'High' }
        }
        const config = priorityConfig[priority] || priorityConfig.medium

        return (
            <span className={`priority-badge ${config.class}`}>
                {config.text}
            </span>
        )
    }

    const handleStatusChange = (newStatus) => {
        console.log(`Changing user status to: ${newStatus}`)
        setShowUserActions(false)
        // Here you would typically make an API call to update the user status
    }

    const getTicketStats = () => {
        const tickets = user.tickets
        return {
            total: tickets.length,
            open: tickets.filter(t => t.status === 'open').length,
            resolved: tickets.filter(t => t.status === 'resolved').length,
            closed: tickets.filter(t => t.status === 'closed').length,
            highPriority: tickets.filter(t => t.priority === 'high').length
        }
    }

    const stats = getTicketStats()

    return (
        <div className="customer-service-user-details">
            {/* Header Section */}
            <div className="details-header">
                <div className="header-left">
                    <button className="back-btn" onClick={onBack}>
                        <ArrowLeft size={20} />
                        <span>Back to Users</span>
                    </button>
                    <div className="user-title">
                        <h1>{user.firstName} {user.lastName}</h1>
                        <p>Customer Service Representative</p>
                    </div>
                </div>
                <div className="header-right">
                    {getStatusBadge(user.status)}
                    <div className="user-actions-dropdown">
                        <button
                            className="actions-trigger"
                            onClick={() => setShowUserActions(!showUserActions)}
                        >
                            <MoreVertical size={20} />
                        </button>
                        {showUserActions && (
                            <div className="actions-menu">
                                <button onClick={() => handleStatusChange('active')}>
                                    <CheckCircle size={16} />
                                    Set Active
                                </button>
                                <button onClick={() => handleStatusChange('suspended')}>
                                    <XCircle size={16} />
                                    Suspend User
                                </button>
                                <button onClick={() => handleStatusChange('pending')}>
                                    <Clock size={16} />
                                    Set Pending
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* User Information Cards */}
            <div className="user-info-section">
                <div className="info-cards">
                    <div className="info-card">
                        <div className="card-icon">
                            <Mail size={20} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Email Address</span>
                            <span className="card-value">{user.email}</span>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="card-icon">
                            <Calendar size={20} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Date Created</span>
                            <span className="card-value">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="card-icon">
                            <Clock size={20} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">Last Login</span>
                            <span className="card-value">
                                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                            </span>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="card-icon">
                            <User size={20} />
                        </div>
                        <div className="card-content">
                            <span className="card-label">User ID</span>
                            <span className="card-value">#{String(user.id).padStart(3, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="stats-section">
                <h2>Ticket Statistics</h2>
                <div className="stats-cards">
                    <div className="stat-card stat-card--total">
                        <div className="stat-icon">
                            <Ticket size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.total}</div>
                            <div className="stat-label">Total Tickets</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card--open">
                        <div className="stat-icon">
                            <AlertCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.open}</div>
                            <div className="stat-label">Open Tickets</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card--resolved">
                        <div className="stat-icon">
                            <CheckCircle size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.resolved}</div>
                            <div className="stat-label">Resolved</div>
                        </div>
                    </div>

                    <div className="stat-card stat-card--priority">
                        <div className="stat-icon">
                            <Star size={24} />
                        </div>
                        <div className="stat-content">
                            <div className="stat-number">{stats.highPriority}</div>
                            <div className="stat-label">High Priority</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tickets Section */}
            <div className="tickets-section">
                <div className="section-header">
                    <div className="header-left">
                        <h2>Handled Tickets</h2>
                        <span className="ticket-count">({filteredTickets.length} tickets)</span>
                    </div>
                    <div className="filters">
                        <div className="filter-group">
                            <Filter size={16} />
                            <select
                                value={ticketFilter}
                                onChange={(e) => setTicketFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Status</option>
                                <option value="open">Open</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">All Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {filteredTickets.length > 0 ? (
                    <div className="tickets-list">
                        {filteredTickets.map((ticket) => (
                            <div key={ticket.id} className="ticket-card">
                                <div className="ticket-header">
                                    <div className="ticket-info">
                                        <div className="ticket-id">
                                            <Ticket size={16} />
                                            {ticket.id}
                                        </div>
                                        <div className="ticket-badges">
                                            {getTicketStatusBadge(ticket.status)}
                                            {getPriorityBadge(ticket.priority)}
                                        </div>
                                    </div>
                                    <div className="ticket-date">
                                        <Calendar size={14} />
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="ticket-content">
                                    <div className="ticket-main">
                                        <h3 className="ticket-reason">{ticket.reason}</h3>
                                        <div className="ticket-details">
                                            <div className="detail-item">
                                                <Package size={14} />
                                                <span>Order #{ticket.orderNumber}</span>
                                            </div>
                                            <div className="detail-item">
                                                <User size={14} />
                                                <span>{ticket.customerName}</span>
                                            </div>
                                            <div className="detail-item">
                                                <Store size={14} />
                                                <span>{ticket.sellerName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {ticket.resolvedAt && (
                                        <div className="resolved-info">
                                            <CheckCircle size={14} />
                                            <span>Resolved on {new Date(ticket.resolvedAt).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-tickets">
                        <div className="empty-icon">
                            <Ticket size={48} />
                        </div>
                        <h3>No tickets found</h3>
                        <p>
                            {ticketFilter === 'all' && priorityFilter === 'all'
                                ? `${user.firstName} hasn't handled any tickets yet.`
                                : 'No tickets match the current filters.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerServiceUserDetails