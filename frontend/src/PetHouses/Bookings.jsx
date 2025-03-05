import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching
        const fetchBookings = () => {
            const mockBookings = [
                {
                    _id: '1',
                    type: 'Pet Boarding',
                    user_name: 'John Doe',
                    pet_name: 'Buddy',
                    start_date: '2024-09-28',
                    end_date: '2024-10-05',
                    datetime_of_booking: '2024-09-25',
                },
                {
                    _id: '2',
                    type: 'Vet Appointment',
                    user_name: 'Jane Smith',
                    pet_name: 'Max',
                    start_date: '2024-09-30',
                    end_date: '2024-09-30',
                    datetime_of_booking: '2024-09-26',
                },
                {
                    _id: '3',
                    type: 'Grooming',
                    user_name: 'Alice Johnson',
                    pet_name: 'Whiskers',
                    start_date: '2024-10-01',
                    end_date: '2024-10-01',
                    datetime_of_booking: '2024-09-27',
                }
            ];
            
            setBookings(mockBookings); // Set the mock bookings data
            setLoading(false); // Set loading to false after data is "fetched"
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

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
                            <h3 className="text-xl font-semibold mb-2">Service: {booking.type}</h3>
                            <p className="mb-1"><strong>User:</strong> {booking.user_name}</p>
                            <p className="mb-1"><strong>Pet:</strong> {booking.pet_name}</p>
                            <p className="mb-1"><strong>Start Date:</strong> {new Date(booking.start_date).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>End Date:</strong> {new Date(booking.end_date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500 mb-4">Booking Date: {new Date(booking.datetime_of_booking).toLocaleDateString()}</p>

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
