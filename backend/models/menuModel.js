import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ["Lunch", "Dinner", "Side", "Other"], default: "Lunch" },
  price: { type: Number, required: true },
  image: String,
});

export default mongoose.model("Menu", MenuSchema);
