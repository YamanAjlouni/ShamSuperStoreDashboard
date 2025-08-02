import { useState } from 'react'
import './AccountantTaxInformation.scss'

const AccountantTaxInformation = () => {
    // Sample tax data - in real app this would come from API
    const [taxData] = useState({
        currentYear: 2025,
        quarters: [
            {
                quarter: 'Q1 2025',
                period: 'Jan - Mar 2025',
                commissionIncome: 18814.58,
                estimatedTaxRate: 0.25,
                estimatedTax: 4703.65,
                taxPaid: 4703.65,
                status: 'Paid',
                dueDate: '2025-04-15',
                paymentDate: '2025-04-10'
            },
            {
                quarter: 'Q2 2025',
                period: 'Apr - Jun 2025',
                commissionIncome: 22456.75,
                estimatedTaxRate: 0.25,
                estimatedTax: 5614.19,
                taxPaid: 0,
                status: 'Pending',
                dueDate: '2025-07-15',
                paymentDate: null
            },
            {
                quarter: 'Q3 2025',
                period: 'Jul - Sep 2025',
                commissionIncome: 0,
                estimatedTaxRate: 0.25,
                estimatedTax: 0,
                taxPaid: 0,
                status: 'Future',
                dueDate: '2025-10-15',
                paymentDate: null
            },
            {
                quarter: 'Q4 2025',
                period: 'Oct - Dec 2025',
                commissionIncome: 0,
                estimatedTaxRate: 0.25,
                estimatedTax: 0,
                taxPaid: 0,
                status: 'Future',
                dueDate: '2026-01-15',
                paymentDate: null
            }
        ],
        monthlyBreakdown: [
            { month: 'January 2025', commissionIncome: 6271.53, estimatedTax: 1567.88 },
            { month: 'February 2025', commissionIncome: 5842.31, estimatedTax: 1460.58 },
            { month: 'March 2025', commissionIncome: 6700.74, estimatedTax: 1675.19 },
            { month: 'April 2025', commissionIncome: 7156.22, estimatedTax: 1789.06 },
            { month: 'May 2025', commissionIncome: 8234.17, estimatedTax: 2058.54 },
            { month: 'June 2025', commissionIncome: 7066.36, estimatedTax: 1766.59 }
        ],
        weeklyBreakdown: [
            { week: 'Week 1 - Aug 2025', commissionIncome: 2234.67, estimatedTax: 558.67 },
            { week: 'Week 2 - Aug 2025', commissionIncome: 1895.43, estimatedTax: 473.86 },
            { week: 'Week 3 - Aug 2025', commissionIncome: 2567.89, estimatedTax: 641.97 },
            { week: 'Week 4 - Aug 2025', commissionIncome: 2123.45, estimatedTax: 530.86 }
        ],
        yearlyComparison: [
            { year: 2023, commissionIncome: 65432.10, taxPaid: 16358.03, effectiveRate: 0.25 },
            { year: 2024, commissionIncome: 78956.45, taxPaid: 19739.11, effectiveRate: 0.25 },
            { year: 2025, commissionIncome: 41271.33, taxPaid: 4703.65, effectiveRate: 0.25 }
        ],
        taxSettings: {
            totalTaxRate: 0.25,
            businessType: 'LLC',
            taxYear: 2025
        }
    })

    const [selectedPeriod, setSelectedPeriod] = useState('quarterly')
    const [selectedYear, setSelectedYear] = useState(2025)
    const [activeTab, setActiveTab] = useState('overview')

    // Calculate summary statistics
    const currentYearData = taxData.quarters.reduce((acc, quarter) => {
        acc.totalIncome += quarter.commissionIncome
        acc.totalTaxDue += quarter.estimatedTax
        acc.totalTaxPaid += quarter.taxPaid
        return acc
    }, { totalIncome: 0, totalTaxDue: 0, totalTaxPaid: 0 })

    const outstandingTax = currentYearData.totalTaxDue - currentYearData.totalTaxPaid
    const nextDueDate = taxData.quarters.find(q => q.status === 'Pending')?.dueDate || 'N/A'

    const handleExportReport = () => {
        alert('Tax report export functionality would be implemented here')
    }

    const handlePrint = () => {
        window.print()
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getFilteredData = () => {
        switch (selectedPeriod) {
            case 'weekly':
                return taxData.weeklyBreakdown
            case 'monthly':
                return taxData.monthlyBreakdown
            case 'quarterly':
                return taxData.quarters
            case 'yearly':
                return taxData.yearlyComparison
            default:
                return taxData.quarters
        }
    }

    return (
        <div className="accountant-tax-information">
            <div className="page-header">
                <div className="header-content">
                    <h1>Tax Information</h1>
                    <p>Tax calculations and reporting based on commission income (read-only access)</p>
                </div>

                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={handlePrint}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                    <button className="btn btn-primary" onClick={handleExportReport}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export Tax Report
                    </button>
                </div>
            </div>

            {/* Tax Summary Cards */}
            <div className="tax-summary">
                <div className="summary-card income">
                    <div className="summary-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                    <div className="summary-content">
                        <h3>Taxable Income ({taxData.currentYear})</h3>
                        <p className="summary-value">{formatCurrency(currentYearData.totalIncome)}</p>
                        <span className="summary-detail">Commission income only</span>
                    </div>
                </div>

                <div className="summary-card tax-due">
                    <div className="summary-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="summary-content">
                        <h3>Total Tax Due</h3>
                        <p className="summary-value">{formatCurrency(currentYearData.totalTaxDue)}</p>
                        <span className="summary-detail">25% of taxable income</span>
                    </div>
                </div>

                <div className="summary-card tax-paid">
                    <div className="summary-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="summary-content">
                        <h3>Tax Paid</h3>
                        <p className="summary-value">{formatCurrency(currentYearData.totalTaxPaid)}</p>
                        <span className="summary-detail">Quarterly payments made</span>
                    </div>
                </div>

                <div className="summary-card outstanding">
                    <div className="summary-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="summary-content">
                        <h3>Outstanding Tax</h3>
                        <p className="summary-value">{formatCurrency(outstandingTax)}</p>
                        <span className="summary-detail">Due: {formatDate(nextDueDate)}</span>
                    </div>
                </div>
            </div>

            {/* Tax Rate Section */}
            <div className="tax-rate-section">
                <div className="section-header">
                    <h2>Current Tax Rate</h2>
                    <p>Tax rate applied to commission income</p>
                </div>

                <div className="tax-rate-display">
                    <div className="rate-card">
                        <h4>Tax Rate</h4>
                        <p className="rate-value">{(taxData.taxSettings.totalTaxRate * 100).toFixed(1)}%</p>
                        <span className="rate-detail">Applied to all commission income</span>
                    </div>
                </div>
            </div>

            {/* Period Filter */}
            <div className="filter-section">
                <div className="filter-header">
                    <h3>View Taxable Income By Period</h3>
                    <p>Select time period to view detailed breakdown</p>
                </div>
                <div className="filter-controls">
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="period-select"
                    >
                        <option value="weekly">Weekly View</option>
                        <option value="monthly">Monthly View</option>
                        <option value="quarterly">Quarterly View</option>
                        <option value="yearly">Yearly View</option>
                    </select>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs-container">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Tax Overview
                    </button>
                    <button
                        className={`tab ${activeTab === 'filtered' ? 'active' : ''}`}
                        onClick={() => setActiveTab('filtered')}
                    >
                        {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Reports
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
                <div className="overview-content">
                    <div className="overview-section">
                        <div className="section-header">
                            <h3>Tax Calculation Method</h3>
                            <p>How we calculate taxable income for the platform</p>
                        </div>

                        <div className="calculation-explanation">
                            <div className="explanation-card">
                                <div className="explanation-icon">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="explanation-content">
                                    <h4>Taxable Income = Commission Only</h4>
                                    <p>Regardless of payment method (ShamPay or Cash), only commission amounts are considered taxable income for the platform:</p>
                                    <ul>
                                        <li><strong>ShamPay:</strong> We collect full payment → Pay sellers/drivers → Keep commission</li>
                                        <li><strong>Cash:</strong> Customer pays directly → No money flow → We earn commission</li>
                                        <li><strong>Result:</strong> In both cases, only commission counts as taxable income</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'filtered' && (
                <div className="filtered-content">
                    <div className="filtered-table-container">
                        <div className="table-header">
                            <span>Period</span>
                            <span>Commission Income</span>
                            <span>Estimated Tax</span>
                            {selectedPeriod === 'quarterly' && <span>Status</span>}
                            {selectedPeriod === 'quarterly' && <span>Due Date</span>}
                            {selectedPeriod !== 'yearly' && <span>Progress</span>}
                            {selectedPeriod === 'yearly' && <span>Growth</span>}
                        </div>

                        {getFilteredData().map((item, index) => (
                            <div key={index} className="table-row">
                                <span className="period-name">
                                    {item.quarter || item.month || item.week || item.year}
                                </span>
                                <span className="commission-income">
                                    {formatCurrency(item.commissionIncome)}
                                </span>
                                <span className="estimated-tax">
                                    {formatCurrency(item.estimatedTax || item.taxPaid || item.commissionIncome * 0.25)}
                                </span>
                                {selectedPeriod === 'quarterly' && (
                                    <span className={`status ${item.status?.toLowerCase()}`}>
                                        {item.status}
                                    </span>
                                )}
                                {selectedPeriod === 'quarterly' && (
                                    <span className="due-date">{formatDate(item.dueDate)}</span>
                                )}
                                {selectedPeriod !== 'yearly' && (
                                    <span className="progress">
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${Math.min((item.commissionIncome / 10000) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </span>
                                )}
                                {selectedPeriod === 'yearly' && index > 0 && (
                                    <span className="growth">
                                        <span className={`growth-indicator ${item.commissionIncome > getFilteredData()[index - 1].commissionIncome ? 'positive' : 'negative'}`}>
                                            {item.commissionIncome > getFilteredData()[index - 1].commissionIncome && '+'}
                                            {(((item.commissionIncome - getFilteredData()[index - 1].commissionIncome) / getFilteredData()[index - 1].commissionIncome) * 100).toFixed(1)}%
                                        </span>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tax Compliance Notice */}
            <div className="compliance-notice">
                <div className="notice-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div className="notice-content">
                    <h4>Tax Compliance & Disclaimer</h4>
                    <p>
                        Tax calculations are based on current rates and commission income only.
                        This system provides estimates for planning purposes. Please consult with a qualified
                        tax professional for official tax preparation and filing. Tax rates and regulations
                        may change, and individual circumstances may affect actual tax liability.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountantTaxInformation