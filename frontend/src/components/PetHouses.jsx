import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PetImage from "../assets/pethouses.jpg";
import CustomModal from "./CustomModal";
import BookingSuccessModal from "./ty"; // Import the booking success modal
import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";

export default function PetHouses() {
    const [favorites, setFavorites] = useState([]);
    const [showBookingCard, setShowBookingCard] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [pethouse, setPethouse] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal visibility
    const [filterItem, setFilterItem] = useState(null);
    const [sortedData, setSortedData] = useState(null);
    const [data, setData] = useState([
        {
            id: 1,
            title: "PetHouse A",
            rating: 4,
            address: "123 Sector 18, Noida, U.P.",
            additionalInfo: "Pet Grooming, Diet plans, Vet Available",
            price: 100,
        },
    ]);

    useEffect(() => {
        fetchPetHouses(); // Fetch data when component mounts
    }, []);

    const fetchPetHouses = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/centers"); 
            if (!response.ok) {
                throw new Error("Failed to fetch pet houses");
            }
            const fetchedData = await response.json();
            const transformedData = fetchedData.map((item) => ({
                id: item._id, // Assuming the MongoDB _id field is used as the ID
                title: item.name,
                rating: item.rating,
                address: item.address,
                additionalInfo: item.additionalInfo,
                price: item.price,
            }));
            setData(transformedData);
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
        setShowBookingCard(false); // Close the custom booking modal
        setShowSuccessModal(true); // Open the success modal after custom modal closes
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
                    {(filterItem === "Rating" || filterItem === "Cheapest" ? sortedData : data).map((item, index) => (
                        <div key={index} className="relative rounded overflow-hidden shadow-lg mb-4">
                            <div className="px-6 py-4">
                                <a href="/petHouseProfile">
                                    <div className="flex justify-between items-center">
                                        <img className="h-64" src={PetImage} alt="Pet House" />
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className={`cursor-pointer text-lg ${favorites.includes(item.id) ? "text-red-500" : "text-gray-400"}`}
                                            onClick={() => toggleFavorite(item.id)}
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-bold text-xl">{item.title}</div>
                                            <div className="flex items-center mb-2">
                                                <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                                                    {item.rating}
                                                </span>
                                                {Array.from({ length: item.rating }, (_, i) => (
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
                {showSuccessModal && <BookingSuccessModal modalOpen={showSuccessModal} funcHandle={() => setShowSuccessModal(false)} />}
            </div>
            <Footer />
        </div>
    );
}
