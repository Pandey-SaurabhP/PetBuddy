import Sidebar2 from "./Sidebar2";

import Footer from "./Footer";
export default function PersonalisedProfile() {
    const pet = {
        pet_name: "Momo",
        pet_type: "Dog",
        pet_breed: "Labrador",
        age: "4", // Assumed as 4 years; adjust if needed.
        introduction:
            "Momo is a cheerful and energetic Labrador who loves to play fetch and swim. Known for his gentle and loyal temperament, Momo is a beloved companion and always brings joy to everyone around him.",
        allergies: "None", // Update if specific allergies are known.
        medical_history: [
            { date: "2021-08-12", description: "Routine vaccination and deworming" },
            { date: "2022-09-18", description: "Treated for a minor ear infection" },
            { date: "2023-07-22", description: "Annual health check-up" },
        ],
        medication: "Joint supplements to maintain mobility and prevent stiffness",
        meal_plan:
            "Momo enjoys a diet of premium kibble mixed with cooked vegetables and occasional treats of chicken and fish. Special care is taken to avoid overfeeding to maintain his ideal weight.",
    };
    

    return (
        <>
            <Sidebar2 />
            <div className="w-full min-h-screen p-10 bg-gray-100">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-green-600 text-white py-4 px-6">
                        <h1 className="text-4xl font-bold">{pet.pet_name}'s Profile</h1>
                        <p className="text-lg mt-1">Breed: {pet.pet_breed}</p>
                        <p className="text-lg">Age: {pet.age} years</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Introduction</h2>
                            <p className="text-gray-700 mt-2">{pet.introduction}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Allergies</h2>
                            <p className="text-gray-700 mt-2">{pet.allergies}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Medical History</h2>
                            <ul className="list-disc pl-6 mt-2 text-gray-700">
                                {pet.medical_history.map((entry, index) => (
                                    <li key={index}>
                                        <span className="font-bold">{entry.date}:</span> {entry.description}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Current Medication</h2>
                            <p className="text-gray-700 mt-2">{pet.medication}</p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">Personalized Meal Plan</h2>
                            <p className="text-gray-700 mt-2">{pet.meal_plan}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
