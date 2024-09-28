import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        admin_id: '',
        user_name: '',
        pethouse_name: '',
        password: '',
        mobile_no: '',
        email_id: '',
        rating: '',
        price: '',
        services: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/admin/signup', formData);
            console.log(response.data.message);
            alert('Signup successful');
        } catch (error) {
            console.error('Error during signup', error.response?.data?.message || error.message);
            alert('Error during signup');
        }
    };

    return (
        <div>
            <h2>Admin Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="admin_id" placeholder="Admin ID" onChange={handleChange} required />
                <input type="text" name="user_name" placeholder="Username" onChange={handleChange} required />
                <input type="text" name="pethouse_name" placeholder="Pet House Name" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="mobile_no" placeholder="Mobile Number" onChange={handleChange} required />
                <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="rating" placeholder="Rating (0-5)" onChange={handleChange} required />
                <input type="text" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="text" name="services" placeholder="Services (comma separated)" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default AdminSignup;
