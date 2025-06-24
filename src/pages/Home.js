import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import doctorHero from '../assets/images/doctor-hero-img.png';
import dentalCare from '../assets/images/dental-care.avif';
import neuroLogy from '../assets/images/neuro-img.webp';
import cardoLogy from '../assets/images/cardiology-img.jpg';

const features = [
  { title: "Fast Billing", icon: dentalCare, desc: "Generate medical bills instantly with accurate tax calculations." },
  { title: "Cardiology Records", icon: cardoLogy, desc: "Easily track heart-related service charges and treatments." },
  { title: "Neurology Details", icon: neuroLogy, desc: "Maintain neurological procedure billing history seamlessly." },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 to-blue-50 py-24 px-6 text-center overflow-hidden">
        <motion.div
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center z-10 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 leading-tight"
              variants={fadeInUp}
            >
              MedBill — <span className="text-blue-600">Smarter</span> Healthcare Billing
            </motion.h1>
            <motion.p
              className="text-gray-700 mb-6 text-lg"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Simplify and automate your medical billing process with security, speed, and precision.
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <Link to="/billing" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition">
                Generate Bill
              </Link>
              <Link to="/about" className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded shadow hover:bg-blue-50 transition">
                Learn More
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img src={doctorHero} alt="Doctor"  />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose MedBill</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
              >
                <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4 mx-auto rounded-full shadow-lg" />
                <h4 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center py-20 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Start Your Medical Billing in Seconds</h2>
        <p className="mb-6 text-white/90">No paperwork, no delays. Just fast, digital, and secure billing.</p>
        <Link
          to="/billing"
          className="bg-white text-blue-700 px-6 py-3 rounded shadow hover:bg-blue-100 transition"
        >
          Create Your First Bill
        </Link>
      </motion.section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((id) => (
              <motion.div
                key={id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: id * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 italic mb-4">
                  "MedBill reduced our billing time by 70%. A must-have for clinics!"
                </p>
                <div className="text-blue-800 font-semibold">Clinic Partner {id}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        className="bg-blue-900 text-white py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4">Subscribe to Health Tech Insights</h2>
        <p className="mb-6 text-white/90">Get tips and updates about MedBill and smarter billing practices.</p>
        <form className="flex justify-center gap-2 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-l bg-white text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-500 px-6 py-2 rounded-r hover:bg-green-600 transition"
          >
            Subscribe
          </button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default Home;
