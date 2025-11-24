import React, { useState } from "react";

const MenuCard = ({ menu, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenu, setEditedMenu] = useState({ ...menu });
  const [imageFile, setImageFile] = useState(null);

  const handleSave = () => {
    const updatedMenu = { ...editedMenu };
    if (imageFile) updatedMenu.image = imageFile;
    onEdit(updatedMenu);
    setIsEditing(false);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200 hover:bg-gray-50 transition">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedMenu.name}
            onChange={(e) => setEditedMenu({ ...editedMenu, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            value={editedMenu.description}
            onChange={(e) => setEditedMenu({ ...editedMenu, description: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            value={editedMenu.price}
            onChange={(e) => setEditedMenu({ ...editedMenu, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={editedMenu.category}
            onChange={(e) => setEditedMenu({ ...editedMenu, category: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Side">Side</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={handleSave} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex-1 flex items-center gap-4">
            {menu.image && (
              <img
                src={`http://localhost:5000/uploads/${menu.image}`}
                alt={menu.name}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <div className="grid grid-cols-4 gap-4 items-center text-sm flex-1">
              <div><strong>Name:</strong> {menu.name}</div>
              <div><strong>Description:</strong> {menu.description}</div>
              <div><strong>Category:</strong> {menu.category}</div>
              <div><strong>Price:</strong> ${menu.price}</div>
            </div>
          </div>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
