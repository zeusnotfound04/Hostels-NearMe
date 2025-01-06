"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo/logo.png";
import { RiAccountCircleFill } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 md:px-12 py-4 shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <Image
            src={logo}
            alt="Hostels Near Me Logo"
            width={120}
            height={40}
            priority
            quality={100}
            className="hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="#"
            className="text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            Hostels
          </a>
          <a
            href="#"
            className="text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href="#"
            className="text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            About us
          </a>
          <RiAccountCircleFill className="w-8 h-8 text-gray-700 hover:text-red-600 transition-colors duration-200" />
        </div>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 border rounded-md"
        >
          <span className="material-icons text-gray-700">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden mt-4 space-y-4 animate-slide-in"
          style={{
            animation: "slide-in 0.3s ease forwards",
          }}
        >
          <a
            href="#"
            className="block text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            Hostels
          </a>
          <a
            href="#"
            className="block text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href="#"
            className="block text-gray-800 font-semibold hover:text-red-600 transition-colors duration-200"
          >
            About us
          </a>
          <div className="flex items-center justify-center">
            <RiAccountCircleFill className="w-8 h-8 text-gray-700 hover:text-red-600 transition-colors duration-200" />
          </div>
        </div>
      )}

      {/* Custom Animation for Slide-In */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

