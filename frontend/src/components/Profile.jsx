import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar2 from "./Sidebar2";
import User from "../assets/user.jpg";
import Button from "./ButtonG";
import axios from "axios";
import dog1 from "../assets/dog1.jpg"

export default function Profile() {
    const [user, setUser] = useState({
        user_name: "",
        user_address: "",
        mobile_number: "",
    });
    const [pets, setPets] = useState([]);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            if (!token) return console.log('Token Not Set');

            try {
                const response = await axios.post('http://localhost:3001/api/user', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const userDataResponse = await axios.post('http://localhost:3001/api/userData', { user_name: response.data.username });
                setUser(userDataResponse.data);
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (!user.user_name) return;

        const fetchUserPets = async () => {
            try {
                const response = await axios.post("http://localhost:3001/api/pets", { user_name: user.user_name });
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching user's pets:", error.message);
            }
        };

        const fetchUserBookings = async () => {
            try {
                const response = await axios.post("http://localhost:3001/api/bookings", { username: user.user_name });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching user's bookings:", error.message);
            }
        };

        fetchUserPets();
        fetchUserBookings();
    }, [user.user_name]);

    const handlePetClick = (pet) => {
        navigate(pet.pet_name.toLowerCase() === "poco" ? "/personalisedprofile2" : "/personalisedprofile");
    };

    return (
        <>
            <Sidebar2 />
            
            <h1 className="text-4xl font-extrabold text-gray-900 mt-10 ml-40">
                <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
                    Profile
                </span>
            </h1>
            <div className="flex flex-col items-center p-8">
                {/* Profile Section */}
                <div className="flex items-center bg-white shadow-xl rounded-2xl p-10 w-full max-w-7xl text-left border border-gray-300">
                    <img src={User} alt="User" className="w-56 h-56 rounded-full object-cover border-4 border-blue-500 shadow-lg mr-8" />
                    <div>
                    <h3 className="text-4xl font-bold text-gray-900">{user.user_name}</h3>
                    <p className="text-gray-600 text-lg mt-2">{user.user_address}</p>
                    <p className="text-gray-600 text-lg mt-1">📞 {user.mobile_number}</p>
                    <div className="flex gap-6 mt-6">
                        <Button text={"Edit Profile"} className="mt-4" />
                        <Button text={"Add a New Pet"} onClick={() => navigate('/addpet')} className="mt-4" />
                    </div>
                    </div>
                </div>
            </div>

                {/* Pets Section */}
                <h1 className="text-4xl font-extrabold text-gray-900 mt-10 ml-40">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
                        Your Pets 🐾
                    </span>
                </h1>
                
                <div className=" flex flex-col items-center p-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mt-6 bg-gradient-to-br from-gray-50 to-gray-200 shadow-xl p-12 rounded-xl">
                        {pets.map((pet, index) => (
                            <div 
                            key={index} 
                            className="relative bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-80 text-center border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                <img 
                                src={dog1} 
                                alt={pet.pet_name} 
                                className="w-24 h-24 object-cover rounded-full border-4 border-green-400 shadow-lg"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mt-12">{pet.pet_name}</h2>
                            <p className="text-gray-600 mt-1"><span className="font-semibold">Type:</span> {pet.pet_type}</p>
                            <p className="text-gray-600"><span className="font-semibold">Breed:</span> {pet.pet_breed}</p>
                            <button 
                                onClick={() => handlePetClick(pet)} 
                                className="mt-5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                View Details
                            </button>
                            </div>
                        ))}
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900 mt-10 ml-40">
                    <span className="bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
                        Your Bookings
                    </span>
                </h1>

                <div className="flex flex-col items-center p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 max-w-7xl w-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-xl p-12 rounded-xl">
                    {bookings.map((booking, index) => (
                        <div 
                            key={index} 
                            className="relative bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-80 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xl font-bold">{index + 1}</span>
                                </div>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mt-8">{booking.pet_name}</h2>
                            <p className="text-gray-600 mt-2"><span className="font-semibold">Start:</span> {new Date(booking.start_date).toLocaleDateString()}</p>
                            <p className="text-gray-600"><span className="font-semibold">End:</span> {new Date(booking.end_date).toLocaleDateString()}</p>
                            <p className="text-gray-600"><span className="font-semibold">Type:</span> {booking.type}</p>
                            <p className="text-gray-600"><span className="font-semibold">Booking ID:</span> <span className="text-gray-500">{booking._id}</span></p>
                            
                            <button 
                                className="mt-5 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
</div>



                
                
        </>
    );
}
