import Sidebar2 from "./Sidebar";
import Cat from "../assets/cats.jpg";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PetHouseProfile() {
    const petHouse = {
        name: "Srishti Wellness Center For Pets",
        latitude: 37.7749,
        longitude: -122.4194,
        address: "Civil Lines, Agra",
        price: 2000.0,
        rating: 3,
        services: ["Pet Housing", "Walking", "Veterinary"],
    };

    const feedbacks = [
        {
            petHouseId: 1,
            petHouseName: "Srishti Wellness Center For Pets",
            feedback: "Great service, my dog loved it here!",
            userId: "user123",
        },
        {
            petHouseId: 2,
            petHouseName: "Srishti Wellness Center For Pets",
            feedback: "Friendly staff and excellent care for my cat.",
            userId: "user456",
        },
        {
            petHouseId: 3,
            petHouseName: "Srishti Wellness Center For Pets",
            feedback: "My rabbit was so happy after staying here!",
            userId: "user789",
        },
    ];

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/getAllBookings`
                );
                setBookings(response.data);

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching centers:", error);
            }
        };

        fetchBookings();
    }, [bookings]);

    return (
        <>
            <Sidebar2 />
            <div className="flex justify-start mt-20 ml-20 mb-10">
                <p className="text-4xl font-extrabold text-gray-800">
                    Your Profile
                </p>
            </div>

            <div className="flex justify-center m-5">
                <div className="flex bg-gradient-to-br from-gray-100 to-blue-50 rounded-3xl w-1/3 shadow-lg">
                    <div className="m-10">
                        <img
                            src={Cat}
                            alt="Pet House"
                            className="h-full w-full object-cover rounded-xl shadow-md"
                        />
                    </div>
                    <div className="flex flex-col justify-center ml-4 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {petHouse.name}
                        </h3>
                        <p className="text-gray-600">{petHouse.address}</p>
                        <div className="flex items-center">
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-lg font-semibold">
                                Price: ₹{petHouse.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
                                Rating: {petHouse.rating} ⭐
                            </span>
                        </div>
                    </div>
                </div>

                <div className="ml-10 w-2/3 p-10">
                    <div className="bg-white shadow-lg rounded-xl p-8">
                        <h2 className="font-extrabold text-4xl text-blue-800 mb-6">
                            {petHouse.name}
                        </h2>
                        <p className="text-gray-700 leading-8 mb-4">
                            Welcome to Srishti Wellness Center For Pets, where pets are
                            pampered with the care and attention they deserve.
                            Located at Civil Lines, Agra, Srishti Wellness Center For Pets
                            offers an affordable daily rate of ₹2000. Our trained staff ensures that your
                            pets are safe, happy, and well cared for.
                        </p>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">
                            Services We Offer
                        </h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {petHouse.services.map((service, index) => (
                                <li key={index} className="text-lg">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Previous Bookings Section */}
            <div className="flex justify-center py-10 bg-gray-100">
                <div className="w-3/4 bg-white p-10 rounded-xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
                        Previous Bookings
                    </h1>
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
                            >
                                <h3 className="text-lg font-semibold text-gray-700">
                                    User: {booking.user_name}
                                </h3>

                                <h3 className="text-lg font-semibold text-gray-700">
                                    Pet: {booking.pet_name}
                                </h3>
                                <p className="text-gray-500">
                                    <span className="font-semibold">
                                        Booking Date:
                                    </span>{" "}
                                    {booking.datetime_of_booking}
                                </p>
                                <p className="text-gray-500">
                                    <span className="font-semibold">
                                        Service:
                                    </span>{" "}
                                    {booking.type}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Feedback Section */}
            <div className="flex justify-center py-10 bg-gradient-to-r from-sky-100 to-sky-300">
                <div className="w-3/4 bg-white p-10 rounded-xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-sky-800 text-center mb-8">
                        Customer Feedback
                    </h1>
                    <div className="space-y-4">
                        {feedbacks.map((feedback) => (
                            <div
                                key={feedback.petHouseId}
                                className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105"
                            >
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {feedback.petHouseName}
                                </h3>
                                <p className="text-gray-500">
                                    <span className="font-semibold">
                                        User ID:
                                    </span>{" "}
                                    {feedback.userId}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    {feedback.feedback}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
