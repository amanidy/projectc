import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:5000/auth/forgotPassword', { email });
            if (response.data.status) {
                alert('Check your email for your reset password link');
                navigate('/login');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {error && <p className="error">{error}</p>}
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

