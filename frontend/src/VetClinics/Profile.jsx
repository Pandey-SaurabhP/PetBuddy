import Sidebar2 from "../components/Sidebar2";
import VetImage from "../assets/vet.jpg"; // Replace with an appropriate vet clinic image
import Footer from "../components/Footer";

export default function VetClinicProfile() {
    const vetClinic = {
        name: "Caring Paws Veterinary Clinic",
        latitude: 37.7749,
        longitude: -122.4194,
        address: "9876 Paws Ave, San Francisco, CA 94103",
        consultationFee: 100.0,
        rating: 4.8,
        services: ["Consultation", "Vaccination", "Surgery", "Emergency Care"],
    };

    const feedbacks = [
        {
            vetClinicId: 1,
            vetClinicName: "Caring Paws Veterinary Clinic",
            feedback: "The vets here are amazing! Took great care of my dog.",
            userId: "user987",
        },
        {
            vetClinicId: 2,
            vetClinicName: "Healthy Pets Vet Clinic",
            feedback: "Very professional and friendly staff.",
            userId: "user654",
        },
        {
            vetClinicId: 3,
            vetClinicName: "Animal Health Clinic",
            feedback: "Quick and efficient service during an emergency.",
            userId: "user321",
        },
    ];

    const appointments = [
        {
            appointmentId: 1,
            petName: "Max",
            appointmentDate: "2024-08-25",
            service: "Consultation",
        },
        {
            appointmentId: 2,
            petName: "Bella",
            appointmentDate: "2024-09-12",
            service: "Vaccination",
        },
        {
            appointmentId: 3,
            petName: "Charlie",
            appointmentDate: "2024-09-30",
            service: "Surgery",
        },
    ];

    return (
        <>
            <Sidebar2 />
            <div className="flex justify-start mt-20 ml-20 mb-10">
                <p className="text-4xl font-extrabold text-gray-800">Vet Clinic Profile</p>
            </div>

            <div className="flex justify-center m-5">
                <div className="flex bg-gradient-to-br from-gray-100 to-blue-50 rounded-3xl w-1/3 shadow-lg">
                    <div className="m-10">
                        <img
                            src={VetImage}
                            alt="Vet Clinic"
                            className="h-full w-full object-cover rounded-xl shadow-md"
                        />
                    </div>
                    <div className="flex flex-col justify-center ml-4 space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">{vetClinic.name}</h3>
                        <p className="text-gray-600">{vetClinic.address}</p>
                        <div className="flex items-center">
                            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-lg font-semibold">
                                Consultation Fee: ${vetClinic.consultationFee.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
                                Rating: {vetClinic.rating} ⭐
                            </span>
                        </div>
                    </div>
                </div>

                <div className="ml-10 w-2/3 p-10">
                    <div className="bg-white shadow-lg rounded-xl p-8">
                        <h2 className="font-extrabold text-4xl text-blue-800 mb-6">{vetClinic.name}</h2>
                        <p className="text-gray-700 leading-8 mb-4">
                            Welcome to Caring Paws Veterinary Clinic, your trusted partner in ensuring the health 
                            and well-being of your pets. Located at 9876 Paws Ave, San Francisco, our clinic offers 
                            top-notch veterinary services with a consultation fee of $100. With a stellar 4.8-star 
                            rating, we provide the best care for your furry friends.
                        </p>
                        <h3 className="text-3xl font-bold text-gray-800 mb-4">Services We Offer</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            {vetClinic.services.map((service, index) => (
                                <li key={index} className="text-lg">{service}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Previous Appointments Section */}
            <div className="flex justify-center py-10 bg-gray-100">
                <div className="w-3/4 bg-white p-10 rounded-xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Previous Appointments</h1>
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.appointmentId} className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-semibold text-gray-700">Pet: {appointment.petName}</h3>
                                <p className="text-gray-500">
                                    <span className="font-semibold">Appointment Date:</span> {appointment.appointmentDate}
                                </p>
                                <p className="text-gray-500">
                                    <span className="font-semibold">Service:</span> {appointment.service}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Feedback Section */}
            <div className="flex justify-center py-10 bg-gradient-to-r from-sky-100 to-sky-300">
                <div className="w-3/4 bg-white p-10 rounded-xl shadow-2xl">
                    <h1 className="text-2xl font-bold text-sky-800 text-center mb-8">Customer Feedback</h1>
                    <div className="space-y-4">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.vetClinicId} className="bg-gray-50 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
                                <h3 className="text-lg font-semibold text-gray-700">{feedback.vetClinicName}</h3>
                                <p className="text-gray-500">
                                    <span className="font-semibold">User ID:</span> {feedback.userId}
                                </p>
                                <p className="text-gray-700 mt-2">{feedback.feedback}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
