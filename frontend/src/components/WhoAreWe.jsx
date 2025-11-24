import React from "react";
import { data } from "../restApi.json";

const WhoAreWe = () => {
  const stats = data[0].who_we_are; 

  return (
    <section id="who_are_we" className="py-24 bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Who Are We?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Crafting authentic Sri Lankan cuisine with passion and tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start space-y-10">
            {stats.slice(0, 2).map((item) => (
              <div key={item.id} className="text-center lg:text-left">
                <h3 className="text-5xl font-bold text-orange-600">{item.number}</h3>
                <p className="text-gray-700 mt-2 text-lg">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="relative flex justify-center">
            <div className="relative">
              <img
                src="/center.svg"
                alt="Orange Glow Background"
                className="absolute inset-0 w-72 h-72 sm:w-96 sm:h-96 blur-lg opacity-30 -z-10"
              />
              <img
                src="/whoweare.png"
                alt="Sri Lankan Food"
                className="w-64 sm:w-80 lg:w-96 rounded-3xl shadow-xl object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end space-y-10">
            {stats.slice(2).map((item) => (
              <div key={item.id} className="text-center lg:text-right">
                <h3 className="text-5xl font-bold text-orange-600">{item.number}</h3>
                <p className="text-gray-700 mt-2 text-lg">{item.title}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
