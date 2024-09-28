import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email_id: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/signin', formData);
            console.log(response.data.message);
            localStorage.setItem('token', response.data.token); // Storing token for future API requests
            alert('Login successful');
        } catch (error) {
            console.error('Error during login', error.response?.data?.message || error.message);
            alert('Error during login');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
