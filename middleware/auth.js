import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1️⃣ Tìm user chỉ bằng số điện thoại (KHÔNG kèm password ở đây)
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "Sai số điện thoại hoặc mật khẩu" });
    }

    // 2️⃣ Dùng bcrypt để so sánh password nhập vào (123456) với hash trong DB ($2a$10$...)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai số điện thoại hoặc mật khẩu" });
    }

    // 3️⃣ Nếu đúng, tạo token và trả về
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret_key_tam_thoi",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, phone: user.phone, role: user.role },
    });

  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
});

export default router;