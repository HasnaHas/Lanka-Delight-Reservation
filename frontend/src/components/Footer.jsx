import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Lanka Delight</h2>
          <p className="text-gray-400">
            Enjoy the best Sri Lankan flavors, fresh and vibrant every day.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2">

            <li
              onClick={() => scrollToSection("heroSection")}
              className="hover:text-white cursor-pointer transition-colors duration-300"
            >
              Home
            </li>

            <li
              onClick={() => scrollToSection("about")}
              className="hover:text-white cursor-pointer transition-colors duration-300"
            >
              About
            </li>

            <li
              onClick={() => scrollToSection("qualities")}
              className="hover:text-white cursor-pointer transition-colors duration-300"
            >
              Why Us
            </li>

            <li
              onClick={() => scrollToSection("contact")}
              className="hover:text-white cursor-pointer transition-colors duration-300"
            >
              Contact
            </li>

          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>

          <p className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <FaMapMarkerAlt /> 123 Colombo Street, Sri Lanka
          </p>

          <p className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <FaPhoneAlt /> +94 11 234 5678
          </p>

          <p className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <FaEnvelope /> lankadelight@yums.com
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <FaFacebook className="hover:text-white cursor-pointer transition-colors duration-300" />
            <FaInstagram className="hover:text-white cursor-pointer transition-colors duration-300" />
            <FaTwitter className="hover:text-white cursor-pointer transition-colors duration-300" />
          </div>
        </div>

      </div>

      <hr className="border-gray-700 my-8" />

      <div className="text-center text-gray-500 text-sm space-y-1">
        <p>© {new Date().getFullYear()} Lanka Delight. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;