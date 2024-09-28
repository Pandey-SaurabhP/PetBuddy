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
<<<<<<< HEAD
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email_id" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
=======
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email_id"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
>>>>>>> 35994aa7582ec5c2b32cbf46a91482cb23e243c1
        </div>
    );
};

export default AdminLogin;
