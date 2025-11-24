import React from "react";
import { data } from "../restApi.json";
import { HiCheckCircle, HiOutlineSparkles, HiOutlineThumbUp, HiOutlineHeart } from "react-icons/hi";
import { Link } from "react-router-dom"; 

const iconMap = {
  "Fresh Ingredients": <HiCheckCircle className="h-14 w-14 text-orange-600" />,
  "Flavorful Dishes": <HiOutlineSparkles className="h-14 w-14 text-orange-600" />,
  "Friendly Service": <HiOutlineThumbUp className="h-14 w-14 text-orange-600" />,
  "Cozy Ambiance": <HiOutlineHeart className="h-14 w-14 text-orange-600" />
};

const Qualities = () => {
  const qualities = [
    { id: 1, title: "Fresh Ingredients", description: "We use the freshest local produce and spices to ensure every dish bursts with flavor." },
    { id: 2, title: "Flavorful Dishes", description: "Our menu is packed with Sri Lankan classics and fusion favorites that excite your taste buds." },
    { id: 3, title: "Friendly Service", description: "Our team welcomes you with warm smiles and attentive care to make every meal enjoyable." },
    { id: 4, title: "Cozy Ambiance", description: "Relax in a comfortable, vibrant setting that reflects the spirit of Sri Lanka." }
  ];

  return (
    <section
      id="qualities"
      className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why <span className="text-orange-600">Choose Us</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
            Discover what makes <span className="text-orange-600 font-semibold">Lanka Delight</span> your go-to spot for Sri Lankan flavors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {qualities.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6">
                {iconMap[item.title] || <HiCheckCircle className="h-14 w-14 text-orange-600" />}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/menu"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
            Explore Our Menu
            <HiCheckCircle className="ml-2 h-6 w-6" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Qualities;
