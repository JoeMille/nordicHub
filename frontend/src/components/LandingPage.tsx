import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="container py-5">
            <div className="text-center">
                <h1 className="display-5 fw-bold">Nordic Hub</h1>
                <p className="lead">Signal Processing for Nordic Device</p>
                <p className="mb-4">
                    MONITORING SOFTWARE FOR EXTERNAL POWERED ONRDIC DEVICES
                </p> 
                <div className="d-flex gap-3 justify-content-center">
                    <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
                    <Link to="/dashboard" className="btn btn-outline-secondary btn-lg">View Demo</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;