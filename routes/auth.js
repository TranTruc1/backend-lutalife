import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: "Sai số điện thoại hoặc mật khẩu" });
    }

    // So sánh trực tiếp, không bcrypt nữa
    if (password !== user.password) {
      return res.status(400).json({ message: "Sai số điện thoại hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    console.error("❌ Lỗi login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
