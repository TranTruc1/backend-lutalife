import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/clinic";

(async () => {
  await mongoose.connect(MONGO_URI);
  const u = await User.findOne({ phone: "admin" });
  console.log("User:", u?.phone, "role:", u?.role);
  const ok = await bcrypt.compare("123456", u.password);
  console.log("Compare with '123456':", ok);
  process.exit(0);
})();
