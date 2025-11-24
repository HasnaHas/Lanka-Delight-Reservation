import React, { useState } from "react";

const MenuCard = ({ menu, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMenu, setEditedMenu] = useState({ ...menu });

  const handleSave = () => {
    onEdit(editedMenu);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition relative">
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
            <option value="Other">Other</option>
          </select>
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={handleSave} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          {menu.image && (
            <img
              src={`http://localhost:5000/uploads/${menu.image}`}
              alt={menu.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-orange-600">{menu.name}</h3>
          <p className="text-gray-700 mt-2">{menu.description}</p>
          <p className="mt-2"><span className="font-semibold">Category:</span> {menu.category}</p>
          <p className="mt-1"><span className="font-semibold">Price:</span> ${menu.price}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
