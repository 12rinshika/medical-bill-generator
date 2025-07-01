import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaUserPlus, FaEdit, FaUsers } from "react-icons/fa";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    insurance: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!newPatient.name || !newPatient.age) return;
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/patients/${editingId}`, newPatient);
      } else {
        await axios.post("http://localhost:5000/api/patients", newPatient);
      }
      setNewPatient({ name: "", age: "", gender: "", contact: "", insurance: "" });
      setEditingId(null);
      fetchPatients();
    } catch (err) {
      console.error("Error saving patient", err);
    }
  };

  const handleEdit = (id) => {
    const patient = patients.find((p) => p._id === id);
    setNewPatient(patient);
    setEditingId(id);
  };

  return (
    <motion.div className="p-6 bg-blue-50 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-10 mt-20">
        <FaUsers size={40} className="mx-auto text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold text-blue-800">Patient Management</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <div className="flex items-center gap-2 mb-4 text-blue-700">
          <FaUserPlus size={22} />
          <h3 className="text-xl font-semibold">
            {editingId ? "Edit Patient Details" : "Register New Patient"}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          />
          <select
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPatient.gender}
            onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Contact No."
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPatient.contact}
            onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
          />
          <input
            type="text"
            placeholder="Insurance Details"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newPatient.insurance}
            onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          {editingId ? "Update Patient" : "Register Patient"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Registered Patients</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-blue-100 text-blue-800 font-medium">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Age</th>
                <th className="py-3 px-4 border-b">Gender</th>
                <th className="py-3 px-4 border-b">Contact</th>
                <th className="py-3 px-4 border-b">Insurance</th>
                <th className="py-3 px-4 border-b text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 border-b">{patient.name}</td>
                  <td className="px-4 py-2 border-b">{patient.age}</td>
                  <td className="px-4 py-2 border-b">{patient.gender}</td>
                  <td className="px-4 py-2 border-b">{patient.contact}</td>
                  <td className="px-4 py-2 border-b">{patient.insurance}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleEdit(patient._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Patients;
