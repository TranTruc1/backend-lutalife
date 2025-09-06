import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import appointmentRoutes from "./routes/appointments.js";
import customerRoutes from "./routes/customers.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/customers", customerRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// MongoDB connect (chỉ kết nối 1 lần)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clinic")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Nếu chạy local thì listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
}

// ⚠️ Trên Vercel phải export app
export default app;
