import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import doctorHero from '../assets/images/doctor-hero-img.png';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-100 to-cyan-50 py-24 px-6 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center z-10 relative">
          <div data-aos="fade-right">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 leading-tight">
              About <span className="text-cyan-600">MedBill</span>
            </h1>
            <p className="text-gray-700 mb-6 text-lg">
              Transforming healthcare billing with innovative digital solutions since 2023
            </p>
          </div>
          <div data-aos="zoom-in">
            <img src={doctorHero} alt="Doctor" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              Simplifying healthcare billing processes to allow medical professionals to focus on what matters most - patient care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-blue-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">For Healthcare Providers</h3>
              <p className="text-gray-700">
                MedBill streamlines your billing workflow, reduces administrative overhead, and minimizes errors. 
                Our platform integrates seamlessly with your existing systems, providing a comprehensive solution 
                for all your billing needs.
              </p>
            </div>
            <div className="bg-cyan-50 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-cyan-700 mb-4">For Patients</h3>
              <p className="text-gray-700">
                We believe in transparency and clarity in healthcare billing. MedBill ensures patients receive 
                detailed, easy-to-understand bills with clear breakdowns of services, making the payment process 
                stress-free and straightforward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12" data-aos="fade-up">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Invoicing",
                desc: "Generate professional, customizable digital invoices in seconds with comprehensive service breakdowns.",
                icon: "📄"
              },
              {
                title: "Patient Management",
                desc: "Maintain detailed patient records, insurance information, and billing history in one secure location.",
                icon: "👥"
              },
              {
                title: "Service Catalog",
                desc: "Create and manage a custom catalog of medical services with flexible pricing and categorization.",
                icon: "🏥"
              },
              {
                title: "Tax & Discount Management",
                desc: "Automatically calculate taxes and apply custom discounts or insurance coverage to bills.",
                icon: "💰"
              },
              {
                title: "PDF Generation",
                desc: "Export professional-looking invoices as PDFs for easy sharing, printing, or archiving.",
                icon: "📑"
              },
              {
                title: "Secure & Compliant",
                desc: "Built with healthcare data security and privacy regulations in mind, ensuring HIPAA compliance.",
                icon: "🔒"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-12" data-aos="fade-up">
            Our Team
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Johnson", role: "Medical Director", bio: "20+ years in healthcare administration" },
              { name: "Alex Chen", role: "Lead Developer", bio: "Expert in healthcare software solutions" },
              { name: "Maria Rodriguez", role: "Customer Success", bio: "Dedicated to client implementation & support" }
            ].map((person, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-md" 
                data-aos="fade-up" 
                data-aos-delay={index * 150}
              >
                <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-800 text-xl font-bold">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-blue-700">{person.name}</h3>
                <p className="text-cyan-600 mb-2">{person.role}</p>
                <p className="text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white py-20 px-6 text-center" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Medical Billing?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join thousands of healthcare providers who have simplified their billing process with MedBill.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/billing" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Get Started
            </Link>
            <Link to="/services" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 