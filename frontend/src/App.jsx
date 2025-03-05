import Home from "./components/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PetHouses from "./components/PetHouses";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import Profile from "./components/Profile";
import TY from "./components/ty"
import AddPetInfo from "./components/AddPet";
import LoginForm from "./components/LoginPage";
import SignupForm from "./components/SignupPage";
import PetHouseProfile from "./components/PethouseProfile";
import AdminProfile from "./PetHouses/Profile";
import PetHousesLogin from "./PetHouses/Login";
import PetHousesSignUp from "./PetHouses/SignUp";
import AdminDashboard from "./PetHouses/Dashboard";
import CentralLogin from "./components/CentralLogin";
import VetClinics from "./components/VetClinics"
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import VetProfile from "./VetClinics/Profile"
import Appointments from "./VetClinics/Appointments"
import VetLogin from "./components/vetLogin"
import Bookings from "./PetHouses/Bookings";
import PersonalisedProfile from "./components/PersonalisedProfile"
import PersonalisedProfile2 from "./components/PersonalisedProfile2";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="/home" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/Pethouses" element={<PetHouses/>}/>
        <Route path="/Features" element={<Features/>}/>
        <Route path="/ty" element={<TY/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/addpet" element={<AddPetInfo/>}/>
        <Route path="/centrallogin" element={<CentralLogin/>}/>
        {/* <Route path="/AdminLogin" element={<PetHousesLogin/>}/>
        <Route path="/AdminSignUp" element={<PetHousesSignUp/>}/> */}
        <Route path="/AdminProfile" element={<AdminProfile />}/>
        <Route path="/AdminDashboard" element={<AdminDashboard />}/>
        <Route path="/petHouseProfile" element={<PetHouseProfile />}/>
        <Route path="/vetClinics" element={<VetClinics />}/>
        <Route path="/vetProfile" element={<VetProfile />}/>
        <Route path="/appointments" element={<Appointments />}/>
        <Route path="/vetLogin" element={<VetLogin />}/>
        <Route path="/personalisedprofile" element={<PersonalisedProfile />}/>
        <Route path="/personalisedprofile2" element={<PersonalisedProfile2 />}/>
        <Route path="/adminSignup" element={<AdminSignup />}/>
        <Route path="/adminLogin" element={<AdminLogin />}/>
        <Route path="/adminBooking" element={<Bookings />}/>

      </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
