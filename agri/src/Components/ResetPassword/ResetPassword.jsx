import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`http://localhost:5000/auth/resetPassword/${token}`, { password });
            if (response.data.status) {
                navigate('/login');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            {error && <p className="error">{error}</p>}
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset</button>
            </form>
        </div>
    );
};

export default ResetPassword;
