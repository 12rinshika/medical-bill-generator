import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/billing", label: "Billing" },
  { path: "/patients", label: "Patients" },
  { path: "/services", label: "Services" },
  { path: "/admin", label: "Admin Panel" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <motion.nav
      className="bg-blue-100 shadow p-4 md:flex justify-between items-center relative z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="flex justify-between items-center md:block">
        <Link to="/" className="text-2xl font-bold text-blue-800">
          🏥 MedBill
        </Link>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-blue-800">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <motion.div key={link.path} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={link.path}
              className={`relative text-md font-medium px-2 py-1 transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-blue-800"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-blue-800 rounded"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex flex-col md:hidden gap-3 bg-blue-50 rounded p-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-md font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-800"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
