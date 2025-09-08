import express from "express";
import { connectDB,collections } from "./db.js";
import dotenv from "dotenv";
import inventoryRouters from "./routers/inventoryRouters.js";
import userRouters from "./routers/userRouter.js";
import stockRouters from "./routers/stockRouters.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { saveMonthlySalesData } from "./controllers/stockController.js";

dotenv.config();



const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials : true
}))
saveMonthlySalesData();
const startServer = async () => {
  try {
    await connectDB();

    // saveMonthlySalesData();

    app.use("/inventory", inventoryRouters);
    app.use("/auth", userRouters);
    app.use("/stock", stockRouters);

    app.listen(5000, () => console.log("server running on port 5000"));
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

startServer();


