import React from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHospitalAlt,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-blue-950 text-white px-6 py-12  shadow-inner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaHospitalAlt className="text-white" />
            MedBill Hospital
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            MedBill simplifies digital medical billing for hospitals and clinics. Transparent,
            secure, and user-friendly — trusted by healthcare providers for efficiency and ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {["Home", "Billing", "Patients", "Services", "Admin Panel"].map((link, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <FaChevronRight className="text-xs" />
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-lg" />
              123 Health St, Ranchi, Jharkhand, India
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-lg" />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-lg" />
              support@medbill.com
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MedBill Hospital. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
