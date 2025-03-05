import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";// For redirect functionality
import { useNavigate } from "react-router-dom";
export default function BookingSuccessModal({ modalOpen, funcHandle }) {
    const [isModalOpen, setIsModalOpen] = useState(modalOpen); // Hook for page redirection
    const navigate=useNavigate();
    // Handle modal closure
    function closeModal() {
        funcHandle(); // External function to handle modal close
        setIsModalOpen(false);
    }

    // Handle redirection after booking success
    function handleRedirect() {
        history.push("/your-bookings-page"); // Change the path to your desired page
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isModalOpen ? "" : "hidden"}`}>
            {/* Modal overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>

            {/* Modal content */}
            <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    {/* Modal header */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Booking Successful!</h3>
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                {/* Success Message */}
                <div className="p-6">
                    <p className="text-gray-900 dark:text-white mb-4">Your pet booking was successful!</p>
                    <p className="text-gray-500 dark:text-gray-300 mb-6">You can view and manage your bookings from here.</p>

                    {/* Redirect Button */}
                    <button
                        onClick={()=>{navigate("/profile")}}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 focus:outline-none focus:ring-primary-600"
                    >
                        Go to My Bookings
                    </button>
                </div>
            </div>
        </div>
    );
}

