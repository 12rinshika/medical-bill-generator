// Admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Admin = () => {
  const [taxRate, setTaxRate] = useState(5);
  const [defaultDiscount, setDefaultDiscount] = useState(0);
  const [logo, setLogo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState([]);
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/patients`).then((res) => setPatients(res.data));
    axios.get(`${process.env.REACT_APP_API_URL}/services`).then((res) => setServices(res.data));
    axios.get(`${process.env.REACT_APP_API_URL}/bills`).then((res) => setBills(res.data));
    axios.get(`${process.env.REACT_APP_API_URL}/settings`).then((res) => {
      setTaxRate(res.data.taxRate);
      setDefaultDiscount(res.data.defaultDiscount);
      setLogo(res.data.logoUrl);
    });
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setLogo(base64);
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/settings`, {
        taxRate,
        defaultDiscount,
        logoUrl: logo,
      })
      .then(() => alert("Settings updated successfully"));
  };

  const deletePatient = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/patients/${id}`);
    setPatients(patients.filter((p) => p._id !== id));
  };

  const deleteService = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/services/${id}`);
    setServices(services.filter((s) => s._id !== id));
  };

  const deleteBill = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/bills/${id}`);
    setBills(bills.filter((b) => b._id !== id));
  };

  const getPatientName = (id) => {
    const p = patients.find((p) => p._id === id);
    return p ? p.name : "Unknown";
  };

  return (
    <motion.div className="p-4 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <button
          onClick={() => {
            sessionStorage.removeItem("isAdminLoggedIn");
            navigate("/login");
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-6">
        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Default Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="border w-full p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-medium">Default Discount (₹)</label>
            <input
              type="number"
              value={defaultDiscount}
              onChange={(e) => setDefaultDiscount(Number(e.target.value))}
              className="border w-full p-2 rounded mt-1"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="font-medium">Upload Hospital Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full mt-1"
            />
            {logo && (
              <img
                src={logo}
                alt="Logo Preview"
                className="mt-3 h-20 w-auto object-contain border rounded"
              />
            )}
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>

        {/* Patients */}
        <div>
          <h3 className="text-lg font-semibold mt-6">Manage Patients</h3>
          <div className="overflow-x-auto">
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
                {patients.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{p.name}</td>
                    <td className="border px-2 py-1">{p.age}</td>
                    <td className="border px-2 py-1">{p.gender}</td>
                    <td className="border px-2 py-1">{p.contact}</td>
                    <td className="border px-2 py-1">
                      <button
                        onClick={() => deletePatient(p._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mt-6">Manage Services</h3>
          <div className="overflow-x-auto">
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
                {services.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1">{s.category}</td>
                    <td className="border px-2 py-1">₹{s.price}</td>
                    <td className="border px-2 py-1">
                      <button
                        onClick={() => deleteService(s._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bills */}
        <div>
          <h3 className="text-lg font-semibold mt-6">Bills History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Patient</th>
                  <th className="border px-2 py-1">Total (₹)</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{getPatientName(b.patientId)}</td>
                    <td className="border px-2 py-1">₹{b.total}</td>
                    <td className="border px-2 py-1">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="border px-2 py-1">
                      <button
                        onClick={() => deleteBill(b._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
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
