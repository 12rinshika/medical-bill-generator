import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error("Error deleting patient", err);
    }
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Patient Management</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-medium mb-2">
          {editingId ? "Edit Patient" : "Register New Patient"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          />
          <select
            className="border p-2 rounded"
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
            className="border p-2 rounded"
            value={newPatient.contact}
            onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
          />
          <input
            type="text"
            placeholder="Insurance Info"
            className="border p-2 rounded"
            value={newPatient.insurance}
            onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update Patient" : "Register Patient"}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Registered Patients</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Age</th>
              <th className="border px-2 py-1">Gender</th>
              <th className="border px-2 py-1">Contact</th>
              <th className="border px-2 py-1">Insurance</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{patient.name}</td>
                <td className="border px-2 py-1">{patient.age}</td>
                <td className="border px-2 py-1">{patient.gender}</td>
                <td className="border px-2 py-1">{patient.contact}</td>
                <td className="border px-2 py-1">{patient.insurance}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(patient._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
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
    </motion.div>
  );
};

export default Patients;

