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

    // Calculate summary statistics
    const currentYearData = taxData.quarters.reduce((acc, quarter) => {
        acc.totalIncome += quarter.commissionIncome
        return acc
    }, { totalIncome: 0 })

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

            {/* Tax Reports Content */}
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
        </div>
    )
}

export default AccountantTaxInformation