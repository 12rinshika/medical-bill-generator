
import Navbar from "./components/Navbar";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Services from "./pages/Services";
import Billing from "./pages/Billing";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

function App() {
  return (
 <div>
<Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/services" element={<Services />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
   <Footer/>
 </div>
 
      
  );
}

export default App;