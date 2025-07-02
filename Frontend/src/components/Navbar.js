import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/billing", label: "Billing" },
  { path: "/patients", label: "Patients" },
  { path: "/services", label: "Services" },
  { path: "/admin", label: "Admin Panel" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true";
    setIsAdminLoggedIn(isLoggedIn);
  }, [location.pathname]); // Recheck login on route change

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-white shadow-md fixed w-full top-0 left-0 z-50 px-6 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-blue-700">
          <MdLocalHospital className="text-3xl" />
          <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight">
            MedBill
          </Link>
        </div>

        {/* Toggle button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-blue-700 focus:outline-none">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.path}
                className={`relative text-md font-semibold tracking-wide transition duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-700 rounded"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {isAdminLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 md:hidden bg-blue-50 p-4 rounded-lg shadow-inner"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-md font-medium ${
                    location.pathname === link.path
                      ? "text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAdminLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-600 font-semibold text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
