import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import doctorHero from '../assets/images/doctor-hero-img.png';
import dentalCare from '../assets/images/dental-care.avif';
import neuroLogy from '../assets/images/neuro-img.webp';
import cardoLogy from '../assets/images/cardiology-img.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './custom-styles.css';

const features = [
  { title: "Fast Billing", icon: dentalCare, desc: "Generate bills instantly with tax, patient breakdown, and medicine details." },
  { title: "Cardiology Records", icon: cardoLogy, desc: "Track heart diagnostics and streamline invoice creation with ease." },
  { title: "Neurology Details", icon: neuroLogy, desc: "Manage neuro service history, diagnostics, and digital documentation." },
];

const faqs = [
  { q: "Is MedBill free to use?", a: "Yes! MedBill offers free access to core features. Pro plans offer more customization and integrations." },
  { q: "Can I customize the bill template?", a: "Absolutely! Upload logos, edit colors, and personalize formats for your clinic." },
  { q: "Is patient data secure?", a: "Yes, all data is encrypted and GDPR compliant, ensuring confidentiality and security." },
  { q: "Can I access billing history?", a: "Yes, MedBill allows easy access and filtering of past patient billing records anytime." }
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-100 to-blue-50 py-24 px-6 text-center overflow-hidden hero-bg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center z-10 relative">
          <div data-aos="fade-right">
            <h1 className="text-5xl font-bold text-blue-900 mb-6 leading-tight">
              MedBill — <span className="text-cyan-600">Smarter</span> Healthcare Billing
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              Digitalize, simplify, and secure your billing workflow with precision & efficiency.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/billing" className="bg-cyan-600 text-white px-6 py-3 rounded shadow hover:bg-cyan-700 transition">Generate Bill</Link>
              <Link to="/about" className="bg-white border border-cyan-600 text-cyan-600 px-6 py-3 rounded shadow hover:bg-cyan-50 transition">Learn More</Link>
            </div>
          </div>
          <div data-aos="zoom-in">
            <img src={doctorHero} alt="Doctor" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12" data-aos="fade-up">Why Choose MedBill</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div key={index} className="p-6 bg-cyan-50 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4 mx-auto rounded-full shadow-lg" />
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative text-white bg-med-bill-works">
        <div className="absolute inset-0 bg-[#1b71a1] bg-opacity-80"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12" data-aos="fade-up">How MedBill Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ step: "1", title: "Enter Patient Info", desc: "Add patient details, diagnostics, and treatment info." }, { step: "2", title: "Review & Customize", desc: "Preview the bill, adjust items and branding if needed." }, { step: "3", title: "Download or Share", desc: "Generate a secure PDF or send via email instantly." }].map((item, index) => (
              <div key={index} className="p-6 bg-white/90 text-blue-900 border border-white rounded-xl shadow hover:shadow-xl transition" data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="text-4xl font-bold mb-4">{item.step}</div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-cyan-700 to-cyan-900 text-white text-center py-20 px-4" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">Start Your Medical Billing in Seconds</h2>
        <p className="mb-6 text-white/90">No paperwork, no delays. Experience fast, accurate digital billing with MedBill.</p>
        <Link to="/billing" className="bg-white text-cyan-700 px-6 py-3 rounded shadow hover:bg-gray-100 transition">Create Your First Bill</Link>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12" data-aos="fade-up">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["Clinic saved hours weekly", "Highly recommended for busy hospitals"].map((msg, id) => (
              <div key={id} className="bg-white p-6 rounded-lg shadow hover:shadow-md" data-aos="fade-up" data-aos-delay={id * 150}>
                <p className="text-gray-700 italic mb-4">"{msg}"</p>
                <div className="text-blue-900 font-semibold">Clinic Partner {id + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12" data-aos="fade-up">Frequently Asked Questions</h2>
          <div className="text-left space-y-6">
            {faqs.map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 200}>
                <h4 className="font-semibold text-blue-800">{item.q}</h4>
                <p className="text-gray-700">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-950 text-white py-20 px-4 text-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Health Tech Insights</h2>
        <p className="mb-6 text-white/90">Stay updated with billing tips, clinic tech, and MedBill releases.</p>
        <form className="flex justify-center gap-2 max-w-xl mx-auto">
          <input type="email" placeholder="Enter your email" className="w-full px-4 py-2 rounded-l bg-white text-gray-800 focus:outline-none" />
          <button type="submit" className="bg-green-500 px-6 py-2 rounded-r hover:bg-green-600 transition">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
