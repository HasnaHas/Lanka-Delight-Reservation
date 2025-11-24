import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <section 
      className="py-16 lg:py-24 bg-gradient-to-br from-white via-orange-50 to-orange-100 relative overflow-hidden"
      id="about">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      
          {/* Text Section */}
          <div className="space-y-8 lg:space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent leading-tight">
                ABOUT US
              </h1>
              <p className="text-xl text-gray-700 font-semibold max-w-lg mx-auto lg:mx-0">
                Fresh Flavors, Friendly Vibes
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0">
                At <span className="font-semibold text-orange-600">Lanka Delight</span>, we make eating out simple and fun. From hearty meals to light bites, our dishes are full of flavor and made to satisfy your cravings.
              </p>
              <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Whether you’re grabbing a quick lunch, sharing a dinner with friends, or enjoying a casual night out, we’ve got you covered. Great food, cozy vibes, and a welcoming atmosphere everything you need for a perfect meal.
              </p>
            </div>
            
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              Explore Menu
              <HiOutlineArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          
          {/* Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img 
                src="./res.png" 
                alt="Modern Sri Lankan Restaurant Ambiance" 
                className="w-full h-80 sm:h-96 lg:h-auto object-cover rounded-3xl shadow-2xl ring-4 ring-orange-200/50 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Fresh & Friendly Vibes
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
