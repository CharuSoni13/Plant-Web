import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#024d2f] text-white py-6 w-full">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start px-10">
        
        {/* Left - Logo & Tagline */}
        <div className="mb-6 md:mb-0 max-w-xs text-left">
          <h2 className="text-2xl font-bold mb-2">🌱 Green Roots</h2>
          <p className="text-sm text-gray-300">
            Bringing nature closer to you with fresh and healthy plants.
          </p>
        </div>

        {/* Middle - Quick Links */}
        <div className="mb-6 md:mb-0 text-center">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="flex space-x-6 text-sm">
            <li><a href="/" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-green-400 transition">About</a></li>
            <li><a href="/shop" className="hover:text-green-400 transition">Shop</a></li>
            <li><a href="/contact" className="hover:text-green-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Right - Social Media */}
        <div className="text-right">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-end space-x-4 text-lg">
            <a href="#" className="hover:text-green-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 mt-6 pt-3 text-center text-sm text-gray-400">
        © 2025 <span className="font-semibold text-white">Green Roots</span> | All Rights Reserved 🌿
      </div>
    </footer>
  );
};

export default Footer;




