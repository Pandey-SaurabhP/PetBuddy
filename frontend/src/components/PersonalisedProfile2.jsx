import Sidebar2 from "./Sidebar2";
import Footer from "./Footer";
export default function PetProfile() {
    const pet = {
        pet_name: "Poco",
        pet_type: "Cat",
        pet_breed: "Sphynx Cat",
        age: "3", // You can adjust this as needed.
        introduction:
            "Poco is a unique and affectionate Sphynx Cat known for her playful nature and inquisitive personality. Despite her lack of fur, she is incredibly warm and loves to snuggle up with her favorite humans. Poco's curious demeanor and loving companionship make her a delightful member of the family.",
        allergies: "None", // If there are specific allergies, replace "None" with the actual allergies.
        medical_history: [
            { date: "2022-02-15", description: "Vaccination updated" },
            { date: "2023-05-20", description: "Routine check-up and deworming" },
        ],
        medication: "None", // Add any current medication if applicable.
        meal_plan:
            "Poco's diet consists of high-quality protein-rich cat food with occasional treats of cooked chicken and fish. Being a Sphynx Cat, she requires frequent meals to maintain her energy levels and body temperature.",
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
