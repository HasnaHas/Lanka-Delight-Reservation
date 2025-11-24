import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddMenu = () => {
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    category: "Lunch",
    price: "",
    image: null,
  });

  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.price || !newMenu.description) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newMenu.name);
    formData.append("description", newMenu.description);
    formData.append("category", newMenu.category);
    formData.append("price", newMenu.price);
    if (newMenu.image) formData.append("image", newMenu.image);

    try {
      await axios.post("/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Menu item added successfully!");
      setNewMenu({ name: "", description: "", category: "Lunch", price: "", image: null });
    } catch (err) {
      console.error("Error adding menu:", err);
      alert("Failed to add menu item.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMenu({ ...newMenu, image: file });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      {/* Header */}
      <header className="bg-amber-600 text-white p-6 shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add New Menu Item</h1>
        <Link
          to="/manage-menu"
          className="px-4 py-2 bg-white text-amber-600 rounded hover:bg-gray-100 transition"
        >
          Manage Menu
        </Link>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        {/* Image Upload First */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
          {newMenu.image && (
            <img
              src={URL.createObjectURL(newMenu.image)}
              alt="Preview"
              className="mt-2 h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Menu Name"
            value={newMenu.name}
            onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenu.price}
            onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <textarea
          placeholder="Description"
          value={newMenu.description}
          onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <select
          value={newMenu.category}
          onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 mb-4"
        >
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Side">Side</option>
          <option value="Other">Other</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleAddMenu}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Menu
          </button>
          <button
            onClick={() => setNewMenu({ name: "", description: "", category: "Lunch", price: "", image: null })}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
