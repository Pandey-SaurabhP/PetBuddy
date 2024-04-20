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
        <Route path="/addpet" element={<AddPetInfo/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignupForm/>}/>

      </Routes>
      </BrowserRouter>

    </>

  );
}

export default App;
