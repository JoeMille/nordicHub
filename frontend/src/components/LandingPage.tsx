import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="floating-elements">
                    <div className="floating-circle"></div>
                    <div className="floating-circle"></div>
                    <div className="floating-circle"></div>
                </div>
                <div className="container">
                    <div className="hero-content text-center">
                        <h1 className="hero-title">Nordic Hub</h1>
                        <p className="hero-subtitle">Professional Signal Processing Platform</p>
                        <p className="hero-description">
                            Advanced monitoring and visualization software for Nordic semiconductor devices. 
                            Process real-time data from nRF52840 and other Nordic chips with powerful analytics 
                            and intuitive dashboards.
                        </p>
                        <div className="cta-buttons d-flex justify-content-center">
                            <Link to="/login" className="btn btn-hero-primary">
                                Get Started
                            </Link>
                            <Link to="/dashboard" className="btn btn-hero-secondary">
                                View Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title text-center">Key Features</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    📡
                                </div>
                                <h3 className="feature-title">Real-time Monitoring</h3>
                                <p className="feature-description">
                                    Monitor sensor data in real-time from Nordic devices via BLE, 
                                    UDP, or J-Link connections with live visualization charts.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    📊
                                </div>
                                <h3 className="feature-title">Advanced Analytics</h3>
                                <p className="feature-description">
                                    Process and analyze signal data with built-in algorithms. 
                                    Export data for further analysis or integration with external tools.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card text-center">
                                <div className="feature-icon">
                                    🔧
                                </div>
                                <h3 className="feature-title">Easy Integration</h3>
                                <p className="feature-description">
                                    Simple API integration with Nordic development tools. 
                                    Support for multiple connection methods and device types.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mx-auto">
                            <div className="about-content">
                                <h2 className="section-title text-center">About Nordic Hub</h2>
                                <p className="lead text-center mb-4">
                                    Nordic Hub is a comprehensive web-based platform designed for developers 
                                    and engineers working with Nordic semiconductor devices.
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4>🎯 Built For</h4>
                                        <ul>
                                            <li>IoT developers</li>
                                            <li>Embedded engineers</li>
                                            <li>Signal processing researchers</li>
                                            <li>Nordic device users</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>🚀 Technologies</h4>
                                        <div className="mt-3">
                                            <span className="tech-badge">React</span>
                                            <span className="tech-badge">TypeScript</span>
                                            <span className="tech-badge">Django</span>
                                            <span className="tech-badge">Python</span>
                                            <span className="tech-badge">Chart.js</span>
                                            <span className="tech-badge">Bootstrap</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-6">
                            <div className="stat-item">
                                <span className="stat-number">99.9%</span>
                                <span className="stat-label">Uptime</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-item">
                                <span className="stat-number">1ms</span>
                                <span className="stat-label">Latency</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-item">
                                <span className="stat-number">50+</span>
                                <span className="stat-label">Device Types</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="stat-item">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Monitoring</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;