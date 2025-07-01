import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import {
  FaUserInjured,
  FaStethoscope,
  FaPercentage,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaDownload,

} from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
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
    axios.get("http://localhost:5000/api/settings").then((res) => {
      setTaxRate(res.data.taxRate);
      setDiscount(res.data.defaultDiscount);
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

  const generatePDF = async () => {
    const doc = new jsPDF();
    const patient = patients.find((p) => p._id === selectedPatientId);
    const date = new Date().toLocaleDateString();

    if (!patient) {
      alert("Please select a valid patient.");
      return;
    }

    try {
      const settingsRes = await axios.get("http://localhost:5000/api/settings");
      const latestLogo = settingsRes.data.logoUrl;
      const renderPDFContent = () => generatePDFContent(doc, patient, date, latestLogo);

      if (latestLogo && latestLogo.startsWith("data:image/")) {
        const img = new Image();
        img.src = latestLogo;
        img.onload = () => {
          try {
            doc.addImage(img, "PNG", 150, 10, 40, 20);
            renderPDFContent();
          } catch (err) {
            console.error("Error adding logo:", err);
            renderPDFContent();
          }
        };
        img.onerror = () => {
          console.error("Logo load failed");
          renderPDFContent();
        };
      } else {
        renderPDFContent();
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      alert("Failed to fetch updated settings.");
    }
  };

  const generatePDFContent = (doc, patient, date, logo) => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MEDICARE MULTISPECIALITY HOSPITAL", 20, 40);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123 Health Ave, Wellness City, India", 20, 46);
    doc.text("Phone: +91-XXXXXXXXXX | Email: billing@medicare.in", 20, 51);
    doc.line(20, 55, 190, 55);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, 65);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Patient Name: ${patient.name || "N/A"}`, 20, 75);
    doc.text(`Age: ${patient.age || "N/A"}`, 120, 75);
    doc.text(`Gender: ${patient.gender || "N/A"}`, 20, 82);
    doc.text(`Contact: ${patient.contact || "N/A"}`, 120, 82);
    doc.text(`Insurance: ${patient.insurance || "N/A"}`, 20, 89);
    doc.text(`Date: ${date}`, 120, 89);
    doc.line(20, 93, 190, 93);

    const tableData = selectedServices.map((s, i) => [i + 1, s.name, `₹${s.price}`]);

    autoTable(doc, {
      startY: 98,
      head: [["S.No", "Service", "Price"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 11 },
    });

    const summaryY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.text(`Subtotal: Rs. ${subtotal}`, 140, summaryY);
    doc.text(`Tax (${taxRate}%): Rs. ${tax.toFixed(2)}`, 140, summaryY + 8);
    doc.text(`Discount: Rs. ${discount}`, 140, summaryY + 16);
    doc.text(`Insurance Covered: Rs. ${insurance}`, 140, summaryY + 24);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: Rs. ${total.toFixed(2)}`, 140, summaryY + 35);

    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature: ___________________", 20, summaryY + 45);
    doc.setFontSize(10);
    doc.text("*Thank you for choosing Medicare Hospital*", 20, summaryY + 55);

    doc.save("invoice.pdf");

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
    <motion.div className="p-6 bg-blue-50 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-10 mt-20">
              <GiReceiveMoney size={40} className="mx-auto text-blue-700 mb-2" />
              <h2 className="text-3xl font-bold text-blue-800">Billing Management</h2>
            </div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
        <FaFileInvoiceDollar /> Bill Generator
      </h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <label className="block mb-2 font-medium flex items-center gap-2 text-gray-700">
          <FaUserInjured /> Select Patient
        </label>
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

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700">
          <FaStethoscope /> Select Services
        </h3>
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

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-700">
          <FaPercentage /> Adjustments
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Tax Rate (%)</label>
            <input
              type="number"
              value={taxRate}
              readOnly
              className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label>Discount (₹)</label>
            <input
              type="number"
              value={discount}
              readOnly
              className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
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

      <div className="bg-white p-4 rounded shadow mb-6 text-right">
        <p className="mb-1">Subtotal: ₹{subtotal}</p>
        <p className="mb-1">Tax ({taxRate}%): ₹{tax.toFixed(2)}</p>
        <p className="mb-1">Discount: ₹{discount}</p>
        <p className="mb-1">Insurance: ₹{insurance}</p>
        <h4 className="text-xl font-bold mt-2 text-blue-800 flex items-center justify-end gap-2">
          <FaCheckCircle /> Total: ₹{total.toFixed(2)}
        </h4>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaDownload /> Download Invoice PDF
        </button>
      </div>
    </motion.div>
  );
};

export default Billing;
