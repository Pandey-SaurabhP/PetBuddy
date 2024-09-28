import React from 'react';
import Sidebar from './Sidebar';

const Bookings = () => {
    
    const bookings = [
        {
            _id: '1',
            service: 'Pet Grooming',
            user: { name: 'Alice' },
            date: '2024-09-28',
            status: 'Confirmed',
            createdAt: '2024-09-01',
        },
        {
            _id: '2',
            service: 'Vet Consultation',
            user: { name: 'Bob' },
            date: '2024-09-29',
            status: 'Pending',
            createdAt: '2024-09-02',
        },
        {
            _id: '3',
            service: 'Pet Boarding',
            user: { name: 'Charlie' },
            date: '2024-09-30',
            status: 'Completed',
            createdAt: '2024-09-03',
        },
    ];

    return (
        <div>
            <Sidebar />
            <div className="container mx-auto px-4 font-inter">
                <h2 className="text-3xl font-bold mb-6 text-center">Current Bookings</h2>
                <div className="flex flex-col gap-6"> 
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="relative bg-white border-2 border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            style={{ paddingBottom: '80px' }} 
                        >
                           
                            <h3 className="text-xl font-semibold mb-2">Service: {booking.service}</h3>
                            <p className="mb-1"><strong>User:</strong> {booking.user.name}</p>
                            <p className="mb-1"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Status:</strong> {booking.status}</p>
                            <p className="text-sm text-gray-500 mb-4">Created on: {new Date(booking.createdAt).toLocaleDateString()}</p>

                            <button className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M3.172 16.172a4 4 0 010-5.656l7.071-7.071a4 4 0 015.656 0l7.071 7.071a4 4 0 010 5.656l-7.071 7.071a4 4 0 01-5.656 0l-7.071-7.071z" />
                                </svg>
                            </button>

                            <button className="absolute bottom-4 left-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 4v-5.586a1 1 0 00-.293-.707L14.414 11a1 1 0 00-.707-.293H6a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1z" />
                                </svg>
                                Chat
                            </button>

                            <button className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                Complete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bookings;