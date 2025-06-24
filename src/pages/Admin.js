// --- FILE: src/pages/Admin.js ---
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

      <div className="bg-white p-4 rounded shadow space-y-6">
        <div>
          <label className="font-medium">Default Tax Rate (%)</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Default Discount (₹)</label>
          <input
            type="number"
            value={defaultDiscount}
            onChange={(e) => setDefaultDiscount(e.target.value)}
            className="border w-full p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-medium">Upload Hospital Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full mt-1"
          />
          {logo && <img src={logo} alt="Hospital Logo" className="mt-4 h-20 object-contain" />}
        </div>

        <div>
          <h3 className="text-lg font-semibold">Manage Patients</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Age</th>
                <th className="border px-2 py-1">Gender</th>
                <th className="border px-2 py-1">Contact</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.age}</td>
                  <td className="border px-2 py-1">{p.gender}</td>
                  <td className="border px-2 py-1">{p.contact}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => deletePatient(i)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Manage Services</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Category</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{s.name}</td>
                  <td className="border px-2 py-1">{s.category}</td>
                  <td className="border px-2 py-1">₹{s.price}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => deleteService(i)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Bills History</h3>
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Patient</th>
                <th className="border px-2 py-1">Total (₹)</th>
                <th className="border px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{b.patient}</td>
                  <td className="border px-2 py-1">₹{b.total}</td>
                  <td className="border px-2 py-1">{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
