import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTools, FaPlusCircle, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", category: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", category: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  const handleAdd = async () => {
    if (!newService.name || !newService.price) return;
    try {
      const res = await axios.post("http://localhost:5000/api/services", {
        ...newService,
        price: parseFloat(newService.price),
      });
      setServices([...services, res.data]);
      setNewService({ name: "", category: "", price: "" });
    } catch (error) {
      alert("Error adding service");
      console.error(error);
    }
  };

  const handleEdit = (service) => {
    setEditId(service._id);
    setEditData({ name: service.name, category: service.category, price: service.price });
  };

  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/services/${id}`, {
        ...editData,
        price: parseFloat(editData.price),
      });
      const updatedServices = services.map((s) => (s._id === id ? res.data : s));
      setServices(updatedServices);
      setEditId(null);
    } catch (error) {
      alert("Error updating service");
      console.error(error);
    }
  };

  return (
    <motion.div className="p-6 bg-blue-50 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-10">
        <FaTools size={40} className="mx-auto text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold text-blue-800">Service Management</h2>
      </div>

      {/* Add Service */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <div className="flex items-center gap-2 text-blue-700 mb-4">
          <FaPlusCircle />
          <h3 className="text-xl font-semibold">Add New Service</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newService.category}
            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            className="border p-3 rounded-md focus:ring-2 focus:ring-blue-400"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">Available Services</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-blue-100 text-blue-800 font-medium">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Price (₹)</th>
                <th className="py-3 px-4 border-b text-center">Edit</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 border-b">
                    {editId === service._id ? (
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    ) : (
                      service.name
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {editId === service._id ? (
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        value={editData.category}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      />
                    ) : (
                      service.category
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {editId === service._id ? (
                      <input
                        type="number"
                        className="border p-1 rounded w-full"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                      />
                    ) : (
                      `₹${service.price}`
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center space-x-2">
                    {editId === service._id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(service._id)}
                          className="text-green-600 hover:text-green-800"
                          title="Save"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No services found.
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

export default Services;
