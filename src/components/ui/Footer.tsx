import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterBG from "../../../public/icons/FooterBG.png"

const Footer = () => {
  return (
    // <div className=' absolute w-full bottom-0'>
    <footer className="relative bg-[#8B3131] text-white pt-32 md:pt-40">
      {/* V-shaped slope using two rotated rectangles */}
      <div className="absolute top-0 left-0 right-0 h-32 md:h-40 overflow-hidden">
        {/* Left slope */}
        <div className="absolute top-0 left-0 w-[51%] h-32 md:h-40 bg-white transform origin-top-right rotate-6"></div>
        {/* Right slope */}
        <div className="absolute top-0 right-0 w-[51%] h-32 md:h-40 bg-white transform origin-top-left -rotate-6"></div>
      </div>
      
      {/* Buildings on top of sloped area */}
      <div className="absolute top-0 left-0 right-0 container mx-auto px-4">
        <div className="relative">
          <Image 
            src=""
            alt="City buildings" 
            width={1200} 
            height={150}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Follow us */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Follow us</h3>
            <div className="flex space-x-4 mb-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B3131">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B3131">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B3131">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B3131">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
            <div className="mb-8">
              <Image 
                src="/images/logo.png" 
                alt="HostelsNearMe Logo" 
                width={240} 
                height={100}
                className="h-auto"
              />
            </div>
          </div>
          
          {/* Column 2 - Accommodation */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Accommodation</h3>
            <ul className="space-y-3">
              <li><Link href="/hostels" className="hover:underline">Hostels</Link></li>
            </ul>
            
            <h3 className="text-2xl font-bold mt-8 mb-6">Customer Support</h3>
            <ul className="space-y-3">
              <li><Link href="/talk-to-us" className="hover:underline">Talk to us</Link></li>
              <li><Link href="/help" className="hover:underline">Help</Link></li>
            </ul>
          </div>
          
          {/* Column 3 - Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/explore" className="hover:underline">Explore</Link></li>
              <li><Link href="/destination" className="hover:underline">Destination</Link></li>
              <li><Link href="/student-discount" className="hover:underline">Student Discount</Link></li>
              <li><Link href="/booking-guarantee" className="hover:underline">Booking Guarantee</Link></li>
              <li><Link href="/roamies" className="hover:underline">Roamies</Link></li>
            </ul>
          </div>
          
          {/* Column 4 - About & Work with us */}
          <div>
            <h3 className="text-2xl font-bold mb-6">About us</h3>
            <ul className="space-y-3">
              <li><Link href="/why-us" className="hover:underline">Why us</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/contact-us" className="hover:underline">Contact us</Link></li>
            </ul>
            
            <h3 className="text-2xl font-bold mt-8 mb-6">Work with us</h3>
            <ul className="space-y-3">
              <li><Link href="/hostel-sign-up" className="hover:underline">Hostel Sign up</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p>Hostels NearMe Private Limited © 2024 All Rights Reserved</p>
        </div>
      </div>
    </footer>
    // </div>
  );
};

export default Footer;