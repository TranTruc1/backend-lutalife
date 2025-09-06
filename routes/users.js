import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Lấy danh sách user (admin only)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được xem danh sách user" });
  }
  const users = await User.find().select("-password");
  res.json(users);
});

// Thêm user mới (admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được thêm user" });
  }

  const { phone, password, role } = req.body;
  const exist = await User.findOne({ phone });
  if (exist) return res.status(400).json({ message: "Số điện thoại đã tồn tại" });

  const hashedPw = await bcrypt.hash(password, 10);
  const user = new User({ phone, password: hashedPw, role: role || "editor" });
  await user.save();
  res.json({ message: "✅ Thêm user thành công", user });
});

// Xóa user (admin only)
router.delete("/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới được xóa user" });
  }

  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy user" });

  res.json({ message: "🗑️ Đã xóa user" });
});

export default router;
