import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { Routes, Route, } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Services from "./pages/Services";
import Billing from "./pages/Billing";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import About from "./pages/About";



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
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <ToastContainer position="top-center" autoClose={1500} />
        </div>
    

      
    
  );
}

export default App;