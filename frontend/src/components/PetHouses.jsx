import "@fortawesome/fontawesome-free/css/all.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PetImage from "../assets/pethouses.jpg";
import CustomModal from "./CustomModal";
import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";

export default function PetHouses() {
    const [favorites, setFavorites] = useState([]);
    const [showBookingCard, setShowBookingCard] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [filterItem, setFilterItem] = useState(null);
    const [sortedData, setSortedData] = useState([]);
    const [data, setData] = useState([]);

    const [pethouse, setPethouse] = useState("");

    useEffect(() => {
        fetchPetHouses();
    }, []);

    const fetchPetHouses = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/admin/pethouses");
            if (!response.ok) {
                throw new Error("Failed to fetch pet houses");
            }
            const fetchedData = await response.json();
            console.log('Fetched Data : ', fetchedData.petHouses[0]);

            const transformedData = fetchedData.petHouses.map(item => ({
                _id: item.admin_id, // Using admin_id as the ID
                title: item.pethouse_name,
                rating: Number(item.rating), // Convert to number for sorting
                address: item.mobile_no, // Assuming mobile_no is being used as address
                additionalInfo: item.services.join(", "), // Join services as a string
                price: Number(item.price) // Convert to number for sorting
            }));
            setData(transformedData);
            console.log('Data received from the backend:', transformedData);
        } catch (error) {
            console.error("Error fetching pet houses:", error);
        }
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((favId) => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const handleBookNow = (hotel) => {
        setPethouse(hotel);
        setShowBookingCard(true);
    };

    const modalHandler = () => {
        setShowBookingCard((prevOpn) => !prevOpn);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleFilterChange = (filter) => {
        setFilterItem(filter);
        let sortedData = [];
        if (filter === "Rating") {
            sortedData = [...data].sort((a, b) => b.rating - a.rating);
        } else if (filter === "Cheapest") {
            sortedData = [...data].sort((a, b) => a.price - b.price);
        }
        setSortedData(sortedData);
    };

    return (
        <div>
            <Sidebar2 />
            <h2 className="ml-20 mt-5 text-2xl font-semibold mb-4">
                Showing Results for your search
            </h2>
            <div className="ml-20 flex flex-wrap items-center">
                <button
                    id="Rating"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                    onClick={() => handleFilterChange("Rating")}
                >
                    Rating
                </button>
                <button
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2"
                    onClick={() => handleFilterChange("Cheapest")}
                >
                    Cheapest
                </button>
                <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                    +Filters
                </button>
            </div>
            <div className="flex ml-20 mt-10">
                <div className="w-1/2">
                    {(filterItem === "Rating" || filterItem === "Cheapest" ? sortedData : data).map((item) => (
                        <div
                            key={item.id}
                            className="relative rounded overflow-hidden shadow-lg mb-4"
                        >
                            <div className="px-6 py-4">
                                <a href="/petHouseProfile">
                                    <div className="flex justify-between items-center">
                                        <img
                                            className="h-64"
                                            src={PetImage}
                                            alt={item.title}
                                        />
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className={`cursor-pointer text-lg ${favorites.includes(item.id)
                                                ? "text-red-500"
                                                : "text-gray-400"
                                                }`}
                                            onClick={() => toggleFavorite(item.id)}
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-bold text-xl">{item.title}</div>

                                            <div className="flex items-center mb-2">
                                                <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                                                    {item.rating}
                                                </span>
                                                {Array.from({ length: Math.round(item.rating) }, (_, i) => (
                                                    <i key={i} className="fas fa-star text-yellow-500"></i>
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-base">{item.address}</p>
                                            <p className="text-gray-700 text-sm">{item.additionalInfo}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="absolute bottom-0 right-0 mb-4 mr-4">
                                <p className="text-gray-700 font-semibold">{item.price} Rs</p>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleBookNow(item)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {showBookingCard && <CustomModal modalOpen={showBookingCard} funcHandle={modalHandler} petHouse={pethouse} />}
            </div>
            <Footer />
        </div>
    );
}
