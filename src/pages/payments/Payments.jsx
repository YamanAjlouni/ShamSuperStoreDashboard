import { useState } from 'react'
import {
    DollarSign, CreditCard, Wallet, Check,
    Clock, ArrowRight, Shield, Info,
    AlertCircle, CheckCircle, Save
} from 'lucide-react'
import './Payments.scss'

const Payments = () => {
    const [selectedMethod, setSelectedMethod] = useState('cash')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    // Payment methods data
    const paymentMethods = [
        {
            id: 'cash',
            name: 'Cash Payment',
            description: 'Receive payments in cash directly from customers',
            icon: <DollarSign size={24} />,
            available: true,
            processingTime: 'Instant',
            fees: 'No fees',
            details: 'Perfect for local deliveries and in-person transactions. No processing fees or delays.'
        },
        {
            id: 'visa',
            name: 'Visa Card',
            description: 'Accept payments via Visa credit and debit cards',
            icon: <CreditCard size={24} />,
            available: false,
            processingTime: '1-3 business days',
            fees: '2.9% + $0.30',
            details: 'Secure online payments with instant confirmation. Perfect for online orders.'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            description: 'Receive payments through PayPal digital wallet',
            icon: <Wallet size={24} />,
            available: false,
            processingTime: '1-2 business days',
            fees: '2.9% + $0.30',
            details: 'Global payment solution with buyer protection and easy integration.'
        }
    ]

    // Mock earnings data
    const earningsData = {
        totalEarnings: 2847.50,
        pendingPayments: 425.30,
        thisMonth: 1250.75,
        lastPayout: '2025-06-15',
        nextPayout: '2025-06-30'
    }

    const handleSaveSettings = () => {
        console.log('Selected payment method:', selectedMethod)
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 3000)
    }

    const getMethodStatus = (method) => {
        if (method.available) {
            return (
                <span className="status-badge status--available">
                    <CheckCircle size={14} />
                    Available
                </span>
            )
        } else {
            return (
                <span className="status-badge status--coming-soon">
                    <Clock size={14} />
                    Coming Soon
                </span>
            )
        }
    }

    return (
        <div className="payments-page">
            {/* Header */}
            <div className="payments-header">
                <div className="header-content">
                    <h1>Payment Settings</h1>
                    <p>Choose how you want to receive payments from your customers</p>
                </div>
                <div className="earnings-summary">
                    <div className="earning-item">
                        <span className="earning-value">${earningsData.totalEarnings.toFixed(2)}</span>
                        <span className="earning-label">Total Earnings</span>
                    </div>
                    <div className="earning-item">
                        <span className="earning-value">${earningsData.pendingPayments.toFixed(2)}</span>
                        <span className="earning-label">Pending</span>
                    </div>
                    <div className="earning-item">
                        <span className="earning-value">${earningsData.thisMonth.toFixed(2)}</span>
                        <span className="earning-label">This Month</span>
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="success-message">
                    <CheckCircle size={20} />
                    <span>Payment settings saved successfully!</span>
                </div>
            )}

            <div className="payments-content">
                {/* Payment Methods Selection */}
                <div className="payment-methods-section">
                    <div className="section-header">
                        <h3>Payment Methods</h3>
                        <p>Select your preferred payment method to receive money from customers</p>
                    </div>

                    <div className="payment-methods-grid">
                        {paymentMethods.map(method => (
                            <div
                                key={method.id}
                                className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''
                                    } ${!method.available ? 'disabled' : ''}`}
                                onClick={() => method.available && setSelectedMethod(method.id)}
                            >
                                <div className="card-header">
                                    <div className="method-icon">
                                        {method.icon}
                                    </div>
                                    <div className="method-info">
                                        <h4>{method.name}</h4>
                                        <p>{method.description}</p>
                                    </div>
                                    <div className="method-status">
                                        {getMethodStatus(method)}
                                    </div>
                                </div>

                                <div className="card-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Processing Time:</span>
                                        <span className="detail-value">{method.processingTime}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Fees:</span>
                                        <span className="detail-value">{method.fees}</span>
                                    </div>
                                    <p className="method-description">{method.details}</p>
                                </div>

                                {selectedMethod === method.id && method.available && (
                                    <div className="selected-indicator">
                                        <Check size={20} />
                                        <span>Selected</span>
                                    </div>
                                )}

                                {!method.available && (
                                    <div className="coming-soon-overlay">
                                        <div className="coming-soon-content">
                                            <Clock size={32} />
                                            <h5>Coming Soon</h5>
                                            <p>This payment method will be available in a future update</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Information */}
                <div className="payment-info-section">
                    <div className="info-cards-grid">
                        <div className="info-card">
                            <div className="info-header">
                                <Shield size={20} />
                                <h4>Secure Payments</h4>
                            </div>
                            <p>All payment methods are secured with industry-standard encryption and fraud protection.</p>
                        </div>

                        <div className="info-card">
                            <div className="info-header">
                                <Info size={20} />
                                <h4>Payout Schedule</h4>
                            </div>
                            <p>Cash payments are immediate. Digital payments are processed according to each provider's schedule.</p>
                            <div className="payout-details">
                                <div className="payout-item">
                                    <span>Last Payout:</span>
                                    <span>{new Date(earningsData.lastPayout).toLocaleDateString()}</span>
                                </div>
                                <div className="payout-item">
                                    <span>Next Payout:</span>
                                    <span>{new Date(earningsData.nextPayout).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-header">
                                <AlertCircle size={20} />
                                <h4>Important Notes</h4>
                            </div>
                            <ul>
                                <li>You can change your payment method at any time</li>
                                <li>New payment methods may require verification</li>
                                <li>Processing times may vary during holidays</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="save-section">
                    <button
                        className="save-btn"
                        onClick={handleSaveSettings}
                        disabled={!selectedMethod}
                    >
                        <Save size={16} />
                        Save Payment Settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payments