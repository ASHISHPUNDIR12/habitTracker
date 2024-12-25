import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import habitRoutes from "./routes/habit.routes.js";
import connectMongoDB from "./connectMongoDB/connectMongoDB.js";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
  connectMongoDB();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth/", authRoutes);
app.use("/api/habit/", habitRoutes);
