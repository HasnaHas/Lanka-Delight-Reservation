import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MenuCard from "src/components/MenuCard.jsx";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;

    try {
      await axios.delete(`/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting menu:", err);
      alert("Failed to delete menu item");
    }
  };

  const handleEditMenu = async (updatedMenu) => {
    const formData = new FormData();
    formData.append("name", updatedMenu.name);
    formData.append("description", updatedMenu.description);
    formData.append("category", updatedMenu.category);
    formData.append("price", updatedMenu.price);
    if (updatedMenu.image) formData.append("image", updatedMenu.image);

    try {
      await axios.put(`/api/menu/${updatedMenu._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchMenuItems();
    } catch (err) {
      console.error("Error updating menu:", err);
      alert("Failed to update menu item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchMenuItems}
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-8">
      {/* Header */}
      <header className="bg-amber-600 text-white p-6 shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Menu Items</h1>
        <Link
          to="/add-menu"
          className="px-4 py-2 bg-white text-amber-600 rounded hover:bg-gray-100 transition"
        >
          Add New Menu
        </Link>
      </header>

      {menuItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg">No menu items found.</p>
          <Link
            to="/add-menu"
            className="mt-4 inline-block px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
          >
            Add Your First Menu Item
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <div className="grid grid-cols-4 gap-4 items-center font-semibold text-gray-700 text-sm">
              <div>Name</div>
              <div>Description</div>
              <div>Category</div>
              <div>Price</div>
            </div>
          </div>
          {menuItems.map((item) => (
            <div key={item._id} className="bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition">
              <div className="flex justify-between items-center">
                <div className="flex-1 flex items-center gap-4">
                  {item.image && (
                    <img src={ item.image.startsWith("http") ? item.image
                       : item.image.startsWith("/uploads/")
                       ? `http://localhost:5000${item.image}`
                      : `http://localhost:5000/uploads/${item.image}`
                        }
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
  />
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center text-sm flex-1 min-w-max">
                    <div><strong>Name:</strong> {item.name}</div>
                    <div><strong>Description:</strong> {item.description}</div>
                    <div><strong>Category:</strong> {item.category}</div>
                    <div><strong>Price:</strong> ${item.price}</div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      const newName = prompt("New name:", item.name);
                      if (newName) {
                        handleEditMenu({ ...item, name: newName });
                      }
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMenu(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
