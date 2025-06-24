import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaHospitalAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-blue-900 text-white px-6 py-10  shadow-inner"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <FaHospitalAlt className="text-white" />
            Medicare Hospital
          </h3>
          <p className="text-gray-300 text-sm">
            Providing quality care and health services with love and integrity. Our digital billing
            system ensures transparency, automation, and ease for patients and admins alike.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt />
              123 Health St, Lucknow, India
            </li>
            <li className="flex items-center gap-2">
              <FaPhone />
              +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              support@medicare.com
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Medicare Hospital. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;

