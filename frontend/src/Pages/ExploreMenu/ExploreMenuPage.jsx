import React, { useState, useEffect } from "react";
import axios from "axios";

const ExploreMenu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('/api/menu');
        setDishes(response.data);
        setFilteredDishes(response.data);
      } catch (error) {
        console.error('Error fetching menu:', error);
        const { data } = await import("../../restApi.json");
        setDishes(data[0].dishes);
        setFilteredDishes(data[0].dishes);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(dishes.filter(dish => dish.category === selectedCategory));
    }
  }, [selectedCategory, dishes]);

  const categories = ["All", "Lunch", "Dinner", "Side", "Other"];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 via-white to-orange-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Our <span className="text-orange-600">Menu</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg max-w-xl mx-auto">
            Discover the authentic flavors of Sri Lanka. Each dish is made with fresh, local ingredients and traditional recipes.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish._id || dish.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-96"
            >
              {dish.image && (
                <div className="overflow-hidden">
                  <img
                    src={dish.image.startsWith('http') ? dish.image : dish.image.startsWith('/uploads/') ? `http://localhost:5000${dish.image}` : `${dish.image}`}
                    alt={dish.title || dish.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{dish.title || dish.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{dish.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                    {dish.category}
                  </span>
                  {dish.price && (
                    <span className="text-xl font-bold text-green-600">
                      ${dish.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreMenu;
