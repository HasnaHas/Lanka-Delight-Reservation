import React from "react";
import { data } from "../restApi.json";

const Team = () => {
  const teamMembers = data[0].team.slice(0, 3);

  return (
    <section
      id="team"
      className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Our <span className="text-orange-600">Culinary Artisans</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
            Meet the passionate individuals who bring the vibrant flavors of Sri Lanka to your table. Our chefs combine skill, creativity, and local tradition to craft an unforgettable dining experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative group cursor-pointer"
            >
              <div className="mx-auto w-40 h-40 rounded-full overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-orange-600 font-medium">{member.designation}</p>
              </div>

              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-400/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
