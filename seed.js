import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/clinic";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // Xóa hết user cũ
    await User.deleteMany({});

    // Thêm user mới (plain text)
    const users = [
      { phone: "admin", password: "123456", role: "admin" },
      { phone: "editor", password: "123456", role: "editor" },
    ];

    await User.insertMany(users);

    console.log("🎉 Seed thành công!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
