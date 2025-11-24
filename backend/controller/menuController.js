import Menu from "../models/menuModel.js";

// Get all menu items
export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new menu item
export const addMenu = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const menu = new Menu({ name, description, category, price, image });
    const savedMenu = await menu.save();
    res.json(savedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update menu item
export const updateMenu = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, image },
      { new: true }
    );
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete menu item
export const deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
