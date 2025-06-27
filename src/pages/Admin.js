import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUpload, FaUserCog, FaTools, FaFileInvoice } from "react-icons/fa";

const Admin = () => {
  const [taxRate, setTaxRate] = useState(5);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [logo, setLogo] = useState(null);

  const [patients, setPatients] = useState([
    { name: "John Doe", age: 30, gender: "Male", contact: "1234567890" },
    { name: "Jane Smith", age: 28, gender: "Female", contact: "9876543210" },
  ]);

  const [services, setServices] = useState([
    { name: "Consultation", category: "General", price: 500 },
    { name: "X-Ray", category: "Radiology", price: 1000 },
  ]);

  const [bills, setBills] = useState([
    { patient: "John Doe", total: 3000, date: "2024-06-22" },
    { patient: "Jane Smith", total: 4500, date: "2024-06-20" },
  ]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
  };

  const deletePatient = (index) => {
    const updated = [...patients];
    updated.splice(index, 1);
    setPatients(updated);
  };

  const deleteService = (index) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  return (
    <motion.div className="p-6 bg-gray-50 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-10">
        <FaUserCog size={40} className="mx-auto text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold text-blue-800">Admin Panel</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-8">
        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-gray-700">Default Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="border w-full p-3 mt-2 rounded focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Default Discount (₹)</label>
            <input
              type="number"
              value={defaultDiscount}
              onChange={(e) => setDefaultDiscount(e.target.value)}
              className="border w-full p-3 mt-2 rounded focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="font-semibold text-gray-700 flex items-center gap-2">
            <FaUpload className="text-blue-600" /> Upload Hospital Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full mt-2 p-2 border rounded"
          />
          {logo && <img src={logo} alt="Hospital Logo" className="mt-4 h-24 object-contain" />}
        </div>

        {/* Patients Table */}
        <div>
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <FaUserCog />
            <h3 className="text-xl font-semibold">Manage Patients</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Age</th>
                  <th className="border px-3 py-2">Gender</th>
                  <th className="border px-3 py-2">Contact</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr key={i} className="hover:bg-blue-50">
                    <td className="border px-3 py-2">{p.name}</td>
                    <td className="border px-3 py-2">{p.age}</td>
                    <td className="border px-3 py-2">{p.gender}</td>
                    <td className="border px-3 py-2">{p.contact}</td>
                    <td className="border px-3 py-2 text-center">
                      <button
                        onClick={() => deletePatient(i)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services Table */}
        <div>
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <FaTools />
            <h3 className="text-xl font-semibold">Manage Services</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Category</th>
                  <th className="border px-3 py-2">Price</th>
                  <th className="border px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={i} className="hover:bg-blue-50">
                    <td className="border px-3 py-2">{s.name}</td>
                    <td className="border px-3 py-2">{s.category}</td>
                    <td className="border px-3 py-2">₹{s.price}</td>
                    <td className="border px-3 py-2 text-center">
                      <button
                        onClick={() => deleteService(i)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bills Table */}
        <div>
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <FaFileInvoice />
            <h3 className="text-xl font-semibold">Bills History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2">Patient</th>
                  <th className="border px-3 py-2">Total (₹)</th>
                  <th className="border px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b, i) => (
                  <tr key={i} className="hover:bg-blue-50">
                    <td className="border px-3 py-2">{b.patient}</td>
                    <td className="border px-3 py-2">₹{b.total}</td>
                    <td className="border px-3 py-2">{b.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
