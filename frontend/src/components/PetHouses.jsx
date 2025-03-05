import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import PetImage from "../assets/pethouses.jpg";
import CustomModal from "./CustomModal";
import BookingSuccessModal from "./ty";
import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";

export default function PetHouses() {
    const [favorites, setFavorites] = useState([]);
    const [showBookingCard, setShowBookingCard] = useState(false);
    const [pethouse, setPethouse] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [sortedData, setSortedData] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPetHouses();
    }, []);

    const fetchPetHouses = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/centers");
            if (!response.ok) throw new Error("Failed to fetch pet houses");
            const fetchedData = await response.json();
            const formattedData = fetchedData.map(item => ({
                id: item._id,
                title: item.name,
                rating: item.rating,
                address: item.address,
                additionalInfo: item.additionalInfo,
                price: item.price,
            }));
            setData(formattedData);
            setSortedData(formattedData);
        } catch (error) {
            console.error("Error fetching pet houses:", error);
        }
    };

    const toggleFavorite = (id) => {
        setFavorites(favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id]);
    };

    const handleBookNow = (hotel) => {
        setPethouse(hotel);
        setShowBookingCard(true);
    };

    const modalHandler = () => {
        setShowBookingCard(false);
        setShowSuccessModal(true);
    };

    const sortByRating = () => {
        setSortedData([...data].sort((a, b) => b.rating - a.rating));
    };

    const sortByPrice = () => {
        setSortedData([...data].sort((a, b) => a.price - b.price));
    };

    return (
        <div className="bg-gray-100 min-h-screen ">
            <Sidebar2 />
            <h2 className="text-3xl font-bold text-gray-800 mt-6 ml-24">Explore Premium Pet Houses</h2>
            
            <div className="flex justify-center mt-4 space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600" onClick={sortByRating}>Sort by Rating</button>
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600" onClick={sortByPrice}>Sort by Price</button>
            </div>
            
            <div className="flex flex-wrap justify-center mt-5">
                {(sortedData || data).map((item) => (
                    <div key={item.id} className="relative w-[340px] bg-white shadow-xl rounded-xl overflow-hidden m-4 p-4 transition transform hover:scale-105">
                        <img className="w-full h-52 object-cover rounded-xl" src={PetImage} alt="Pet House" />
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`cursor-pointer text-lg ${favorites.includes(item.id) ? "text-red-500" : "text-gray-400"}`}
                                    onClick={() => toggleFavorite(item.id)}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">{item.rating}</span>
                                {[...Array(Math.floor(item.rating))].map((_, i) => (
                                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 ml-1" />
                                ))}
                            </div>
                            <p className="text-gray-600 mt-2">{item.address}</p>
                            <p className="text-gray-500 text-sm mt-1">{item.additionalInfo}</p>
                            <div className="mt-3 flex justify-between items-center">
                                <p className="text-lg font-semibold text-gray-900">₹{item.price}/day</p>
                                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:scale-105 transition"
                                    onClick={() => handleBookNow(item)}>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showBookingCard && <CustomModal modalOpen={showBookingCard} funcHandle={modalHandler} petHouse={pethouse} />}
            {showSuccessModal && <BookingSuccessModal modalOpen={showSuccessModal} funcHandle={() => setShowSuccessModal(false)} />}
            <Footer />
        </div>
    );
}
