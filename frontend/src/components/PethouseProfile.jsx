import Sidebar2 from "./Sidebar2";

export default function PetHouseProfile() {
  const petHouse = {
    name: "Happy Tails Pet House",
    latitude: 37.7749,
    longitude: -122.4194,
    address: "1234 Bark St, San Francisco, CA 94102",
    price: 75.0,
    rating: 4.5,
  };

  return (
    <>
      <Sidebar2 />
      <div className="h-screen">
        <h1 className=" text-4xl font-semibold">{petHouse.name}</h1>
        <div className="">
            <h2 className=" text-2xl font-serif">
                {petHouse.address}
            </h2>
            
        </div>
      </div>
    </>
  );
}
