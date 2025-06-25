import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft, Save, Eye, Percent, DollarSign,
    Calendar, Users, ShoppingCart, Settings,
    Tag, FileText
} from 'lucide-react'
import './CouponForm.scss'

const CouponForm = ({ mode = 'add' }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = mode === 'edit' || id

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'percentage',
        amount: '',
        expireDate: '',
        freeShipping: false,
        minimumSpend: '',
        maximumSpend: '',
        usageLimitPerCoupon: '',
        usageLimitPerUser: '',
        isActive: true
    })

    const [activeTab, setActiveTab] = useState('general')

    const discountTypes = [
        { value: 'percentage', label: 'Percentage discount', icon: <Percent size={16} /> },
        { value: 'fixed_cart', label: 'Fixed cart discount', icon: <DollarSign size={16} /> }
    ]

    useEffect(() => {
        if (isEditMode && id) {
            // Mock loading existing coupon data
            const mockCoupon = {
                code: 'SUMMER20',
                description: 'Summer Sale 20% Off',
                discountType: 'percentage',
                amount: '20',
                expireDate: '2025-08-31',
                freeShipping: false,
                minimumSpend: '50',
                maximumSpend: '500',
                usageLimitPerCoupon: '100',
                usageLimitPerUser: '1',
                isActive: true
            }
            setFormData(mockCoupon)
        }
    }, [isEditMode, id])

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)

        // Here you would typically send the data to your API
        alert(isEditMode ? 'Coupon updated successfully!' : 'Coupon created successfully!')
        navigate('/coupons')
    }

    const generateCouponCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase()
        handleInputChange('code', randomCode)
    }

    const tabs = [
        { id: 'general', label: 'General', icon: <Tag size={16} /> },
        { id: 'usage', label: 'Usage Limits', icon: <Users size={16} /> },
        { id: 'restrictions', label: 'Restrictions', icon: <Settings size={16} /> }
    ]

    return (
        <div className="coupon-form-page">
            <div className="form-header">
                <div className="header-left">
                    <button
                        className="back-btn"
                        onClick={() => navigate('/coupons')}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="header-text">
                        <h1>{isEditMode ? 'Edit Coupon' : 'Add New Coupon'}</h1>
                        <p>{isEditMode ? 'Update coupon information' : 'Create a new coupon for your store'}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        type="button"
                        className="preview-btn"
                        onClick={() => console.log('Preview coupon')}
                    >
                        <Eye size={16} />
                        Preview
                    </button>
                    <button
                        type="submit"
                        form="coupon-form"
                        className="save-btn"
                    >
                        <Save size={16} />
                        {isEditMode ? 'Update Coupon' : 'Save Coupon'}
                    </button>
                </div>
            </div>

            <div className="form-container">
                <div className="form-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form id="coupon-form" onSubmit={handleSubmit} className="coupon-form">
                    {activeTab === 'general' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Coupon Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="code">Coupon Code *</label>
                                        <div className="code-input-wrapper">
                                            <input
                                                type="text"
                                                id="code"
                                                value={formData.code}
                                                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                                                placeholder="Enter coupon code"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={generateCouponCode}
                                                className="generate-btn"
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="isActive">Status</label>
                                        <select
                                            id="isActive"
                                            value={formData.isActive}
                                            onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Describe this coupon"
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Discount Settings</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="discountType">Discount Type *</label>
                                        <select
                                            id="discountType"
                                            value={formData.discountType}
                                            onChange={(e) => handleInputChange('discountType', e.target.value)}
                                            required
                                        >
                                            {discountTypes.map(type => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="amount">Coupon Amount *</label>
                                        <div className="input-with-icon">
                                            {formData.discountType === 'percentage' ? (
                                                <Percent size={16} className="input-icon" />
                                            ) : (
                                                <DollarSign size={16} className="input-icon" />
                                            )}
                                            <input
                                                type="number"
                                                id="amount"
                                                value={formData.amount}
                                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                                placeholder={formData.discountType === 'percentage' ? '0' : '0.00'}
                                                step={formData.discountType === 'percentage' ? '1' : '0.01'}
                                                min="0"
                                                max={formData.discountType === 'percentage' ? '100' : undefined}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="expireDate">Expire Date *</label>
                                        <div className="input-with-icon">
                                            <Calendar size={16} className="input-icon" />
                                            <input
                                                type="date"
                                                id="expireDate"
                                                value={formData.expireDate}
                                                onChange={(e) => handleInputChange('expireDate', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={formData.freeShipping}
                                                onChange={(e) => handleInputChange('freeShipping', e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                            Allow free shipping
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'usage' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Usage Limits</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="usageLimitPerCoupon">Usage limit per coupon</label>
                                        <input
                                            type="number"
                                            id="usageLimitPerCoupon"
                                            value={formData.usageLimitPerCoupon}
                                            onChange={(e) => handleInputChange('usageLimitPerCoupon', e.target.value)}
                                            placeholder="Unlimited"
                                            min="0"
                                        />
                                        <small className="field-hint">
                                            How many times this coupon can be used in total. Leave empty for unlimited.
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="usageLimitPerUser">Usage limit per user</label>
                                        <input
                                            type="number"
                                            id="usageLimitPerUser"
                                            value={formData.usageLimitPerUser}
                                            onChange={(e) => handleInputChange('usageLimitPerUser', e.target.value)}
                                            placeholder="Unlimited"
                                            min="0"
                                        />
                                        <small className="field-hint">
                                            How many times a single customer can use this coupon. Leave empty for unlimited.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'restrictions' && (
                        <div className="tab-content">
                            <div className="form-section">
                                <h3>Spending Restrictions</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="minimumSpend">Minimum spend</label>
                                        <div className="input-with-icon">
                                            <DollarSign size={16} className="input-icon" />
                                            <input
                                                type="number"
                                                id="minimumSpend"
                                                value={formData.minimumSpend}
                                                onChange={(e) => handleInputChange('minimumSpend', e.target.value)}
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                        <small className="field-hint">
                                            Minimum order amount required to use this coupon.
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="maximumSpend">Maximum spend</label>
                                        <div className="input-with-icon">
                                            <DollarSign size={16} className="input-icon" />
                                            <input
                                                type="number"
                                                id="maximumSpend"
                                                value={formData.maximumSpend}
                                                onChange={(e) => handleInputChange('maximumSpend', e.target.value)}
                                                placeholder="No limit"
                                                step="0.01"
                                                min="0"
                                            />
                                        </div>
                                        <small className="field-hint">
                                            Maximum order amount this coupon can be applied to.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Preview Card */}
            {formData.code && (
                <div className="coupon-preview">
                    <h4>Coupon Preview</h4>
                    <div className="preview-card">
                        <div className="preview-header">
                            <span className="preview-code">{formData.code}</span>
                            <span className="preview-amount">
                                {formData.discountType === 'percentage'
                                    ? `${formData.amount || 0}% OFF`
                                    : `$${formData.amount || 0} OFF`
                                }
                            </span>
                        </div>
                        <div className="preview-description">
                            {formData.description || 'No description provided'}
                        </div>
                        <div className="preview-details">
                            {formData.expireDate && (
                                <span className="preview-expire">
                                    Expires: {new Date(formData.expireDate).toLocaleDateString()}
                                </span>
                            )}
                            {formData.freeShipping && (
                                <span className="preview-shipping">
                                    <ShoppingCart size={12} />
                                    Free Shipping
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CouponForm