import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // Updated import statement

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email_id: '',
        password: '',
    });
    const [adminName, setAdminName] = useState('');

    // Check if a token is already present and decode it to get the admin's username
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwt_decode(token); // Decode the token
                const adminId = decodedToken.adminId; // Assuming adminId is part of the token

                // Fetch admin data based on the decoded adminId (optional if token contains user name)
                fetchAdminDetails(adminId);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    // Fetch admin details by making an API call to get the admin's username
    const fetchAdminDetails = async (adminId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/admin/${adminId}`);
            setAdminName(response.data.user_name);  // Set the admin's username
        } catch (error) {
            console.error('Error fetching admin details', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/signin', formData);
            console.log(response.data.message);
            localStorage.setItem('token', response.data.token); // Store token

            // Decode token and set admin name immediately after login
            const decodedToken = jwt_decode(response.data.token);
            fetchAdminDetails(decodedToken.adminId);

            alert('Login successful');
        } catch (error) {
            console.error('Error during login', error.response?.data?.message || error.message);
            alert('Error during login');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            {adminName && <p>Welcome, {adminName}!</p>} {/* Display admin's name if logged in */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email_id"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
