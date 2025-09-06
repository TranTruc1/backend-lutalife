import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;   // 👈 dùng export default thay vì module.exports
