import app from "./app.js";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
