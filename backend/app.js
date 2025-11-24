import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservations.js";
import menuRouter from "./routes/menu.js";
import authRouter from "./routes/auth.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174","https://lanka-delight-reservation-v5hl.vercel.app" ];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/reservations", reservationRouter);
app.use("/api/menu", menuRouter);
app.use("/api/auth", authRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;
