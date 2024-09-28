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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md m-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Enter your username"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Pet House Name</label>
                        <input
                            type="text"
                            name="pethouse_name"
                            placeholder="Enter your Pet House name"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
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
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            name="mobile_no"
                            placeholder="Enter your mobile number"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email_id"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="Enter price for services"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-gray-700">Services</label>
                        <input
                            type="text"
                            name="services"
                            placeholder="Enter services (comma-separated)"
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
