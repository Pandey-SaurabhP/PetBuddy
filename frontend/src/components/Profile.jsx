import Sidebar2 from "./Sidebar2";
import cat from "../assets/catss.jpg";
import User from "../assets/user.jpg"
import Button from "./ButtonG";
export default function Profile() {
  const user = {
    image: "google.com",
    id: "123456",
    name: "John Doe",
    address: "123 Main Street, Cityville, USA",
    mobile_number: "123-456-7890",
  };
  const pet = {
    pet_id: {
      pet_name: "Fluffy",
      pet_type: "Cat",
      pet_breed: "Persian",
      pet_image: "https://example.com/fluffy.jpg",
    },
    pet_id1: {
      pet_name: "Fluffy",
      pet_type: "Cat",
      pet_breed: "Persian",
      pet_image: "https://example.com/fluffy.jpg",
    },
    pet_id2: {
      pet_name: "Fluffy",
      pet_type: "Cat",
      pet_breed: "Persian",
      pet_image: "https://example.com/fluffy.jpg",
    },
  };
  return (
    <>
      <Sidebar2 />
      <div className="flex justify-normal">
        <div className="flex justify-normal bg-blue-gray-100 m-10 rounded-3xl w-1/3">
          <div className="w-40 h-40 m-10">
            <img src={User} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center ml-4">
            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.address}</p>
            <p className="text-sm text-gray-600">{user.mobile_number}</p>
          </div>
        </div>
        
      </div>

      <div className=" flex justify-center">
        <h1 className=" text-3xl font-semibold">Your Pets </h1>

      </div>
      <div className=" m-5 justify-center flex">
        <Button text={"Add a New Pet"} />
        </div>
      <div className="flex flex-wrap justify-start m-10" >
        {Object.keys(pet).map((key) => (
          <div
            key={key}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded overflow-hidden shadow-lg m-4"
          >
            <img
              className="h-64"
              // pet[key].pet_image
              src={cat}
              alt={pet[key].pet_name}
            />
            <div className="px-6 py-4 flex justify-between bg-blue-gray-200">
              <div className="font-bold text-xl mb-2 ">{pet[key].pet_name}</div>
              <p className="text-gray-700 text-base">
                Type: {pet[key].pet_type}
                <br />
                Breed: {pet[key].pet_breed}
                <br />
                ID: {pet[key].pet_id}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
