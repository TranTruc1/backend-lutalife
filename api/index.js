import express from "express";
import serverless from "serverless-http";
import mongoose from "mongoose";

import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/users.js";
import appointmentRoutes from "../routes/appointmentRoutes.js";
import customerRoutes from "../routes/customers.js";

const app = express();
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/customers", customerRoutes);

// 👇 cái này là bắt buộc để vercel chạy
export default serverless(app);
