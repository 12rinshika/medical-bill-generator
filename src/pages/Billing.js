import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct for v5+
import axios from "axios";

const defaultServices = [
  { _id: "1", name: "Consultation", price: 500 },
  { _id: "2", name: "Lab Tests", price: 1500 },
  { _id: "3", name: "Surgery", price: 10000 },
  { _id: "4", name: "Medications", price: 1200 },
];

const Billing = () => {
  const [patients, setPatients] = useState([]);
  const [services, setServices] = useState(defaultServices);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [taxRate, setTaxRate] = useState(5);
  const [discount, setDiscount] = useState(0);
  const [insurance, setInsurance] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/patients").then((res) => setPatients(res.data));
    axios.get("http://localhost:5000/api/services").then((res) => {
      const backendServices = res.data;
      const allServices = [...defaultServices];
      backendServices.forEach((newSrv) => {
        if (!allServices.some((srv) => srv.name === newSrv.name)) {
          allServices.push(newSrv);
        }
      });
      setServices(allServices);
    });
  }, []);

  const handleServiceToggle = (service) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setSelectedServices(selectedServices.filter((s) => s._id !== service._id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const subtotal = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax - discount - insurance;

  const generatePDF = () => {
    const doc = new jsPDF();
    const patient = patients.find((p) => p._id === selectedPatientId);
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MEDICARE MULTISPECIALITY HOSPITAL", 20, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123 Health Ave, Wellness City, India", 20, 26);
    doc.text("Phone: +91-XXXXXXXXXX | Email: billing@medicare.in", 20, 31);
    doc.line(20, 35, 190, 35);

    // Invoice Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, 45);

    // Patient Info
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${patient?.name || "N/A"}`, 20, 55);
    doc.text(`Age: ${patient?.age || "N/A"}`, 120, 55);
    doc.text(`Gender: ${patient?.gender || "N/A"}`, 20, 62);
    doc.text(`Contact: ${patient?.contact || "N/A"}`, 120, 62);
    doc.text(`Insurance: ${patient?.insurance || "N/A"}`, 20, 69);
    doc.text(`Date: ${date}`, 120, 69);
    doc.line(20, 74, 190, 74);

    // Services Table
    const tableData = selectedServices.map((s, i) => [i + 1, s.name, `Rs. ${s.price}`]);

    autoTable(doc, {
      startY: 80,
      head: [["S.No", "Service", "Price"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 11 },
    });

    const summaryY = doc.lastAutoTable.finalY + 10;

    // Bill Summary
    doc.setFontSize(11);
    doc.text(`Subtotal: Rs. ${subtotal}`, 140, summaryY);
    doc.text(`Tax (${taxRate}%): ${tax.toFixed(2)}`, 140, summaryY + 8);
    doc.text(`Discount: Rs. ${discount}`, 140, summaryY + 16);
    doc.text(`Insurance Covered: Rs. ${insurance}`, 140, summaryY + 24);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs. ${total.toFixed(2)}`, 140, summaryY + 35);

    // Signature & Footer
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature: ___________________", 20, summaryY + 45);
    doc.setFontSize(10);
    doc.text("*Thank you for choosing Medicare Hospital*", 20, summaryY + 55);

    doc.save("invoice.pdf");

    // Save to backend
    axios.post("http://localhost:5000/api/bills", {
      patientId: selectedPatientId,
      services: selectedServices,
      subtotal,
      tax,
      discount,
      insurance,
      total,
    });
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Bill Generator</h2>

      {/* Patient Select */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block mb-2 font-medium">Select Patient</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          <option value="">-- Choose Patient --</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Service Select */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <label
              key={service._id}
              className="flex items-center border p-2 rounded cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                checked={selectedServices.some((s) => s._id === service._id)}
                onChange={() => handleServiceToggle(service)}
                className="mr-2"
              />
              {service.name} (₹{service.price})
            </label>
          ))}
        </div>
      </div>

      {/* Adjustments */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Adjustments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label>Discount (₹)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label>Insurance (₹)</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(parseFloat(e.target.value))}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded shadow mb-6 text-right">
        <p className="mb-1">Subtotal: ₹{subtotal}</p>
        <p className="mb-1">Tax ({taxRate}%): ₹{tax.toFixed(2)}</p>
        <p className="mb-1">Discount: ₹{discount}</p>
        <p className="mb-1">Insurance: ₹{insurance}</p>
        <h4 className="text-xl font-bold mt-2">Total: ₹{total.toFixed(2)}</h4>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download Invoice PDF
        </button>
      </div>
    </motion.div>
  );
};

export default Billing;
