import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (error) {
      alert("Error deleting service");
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
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Service Management</h2>

      {/* Add Service */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Add New Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            className="border p-2 rounded"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 rounded"
            value={newService.category}
            onChange={(e) => setNewService({ ...newService, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price (₹)"
            className="border p-2 rounded"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Service
        </button>
      </div>

      {/* List of Services */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Available Services</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Price (₹)</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">
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
                <td className="border px-2 py-1">
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
                <td className="border px-2 py-1">
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
                <td className="border px-2 py-1 flex gap-2">
                  {editId === service._id ? (
                    <>
                      <button
                        onClick={() => handleEditSave(service._id)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Services;
