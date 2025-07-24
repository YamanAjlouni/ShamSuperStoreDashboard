import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/shamSuperStoreLogo.jpg'
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            // Check credentials and route accordingly
            if (formData.email === 'seller@seller.seller' && formData.password === '123123') {
                localStorage.setItem('userRole', 'seller');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/seller');
            } else if (formData.email === 'admin@admin.admin' && formData.password === '123123') {
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/admin');
            } else if (formData.email === 'delivery@delivery.delivery' && formData.password === '123123') {
                localStorage.setItem('userRole', 'delivery');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/delivery');
            } else if (formData.email === 'admindelivery@admindelivery.admindelivery' && formData.password === '123123') {
                localStorage.setItem('userRole', 'adminDelivery');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/adminDelivery');
            } else if (formData.email === 'websiteadmin@websiteadmin.websiteadmin' && formData.password === '123123') {
                localStorage.setItem('userRole', 'websiteAdmin');
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/websiteAdmin');
            } else {
                setError('Invalid email or password');
            }

            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo">
                        <img src={logo} alt="ShamSuperStore Logo" className="logo-image" />
                        <p>Dashboard</p>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account to continue</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <div className="input-wrapper">
                                <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#">Contact Administrator</a></p>
                    <div className="demo-credentials">
                        <h4>Demo Credentials:</h4>
                        <p><strong>Seller:</strong> seller@seller.seller / 123123</p>
                        <p><strong>Admin:</strong> admin@admin.admin / 123123</p>
                        <p><strong>Delivery:</strong> delivery@delivery.delivery / 123123</p>
                        <p><strong>Admin Delivery:</strong> admindelivery@admindelivery.admindelivery / 123123</p>
                        <p><strong>Website Admin:</strong> websiteadmin@websiteadmin.websiteadmin / 123123</p>
                    </div>
                </div>
            </div>

            <div className="login-background">
                <div className="bg-pattern"></div>
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;