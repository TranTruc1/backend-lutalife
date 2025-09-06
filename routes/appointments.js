import express from "express";
import Appointment from "../models/Appointment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Lấy tất cả appointments
router.get("/", auth, async (req, res) => {
  try {
    const apps = await Appointment.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Tạo appointment mới (public form)
router.post("/", async (req, res) => {
  try {
    const { name, phone, address, note } = req.body;
    const newApp = new Appointment({ name, phone, address, note });
    await newApp.save();
    res.json(newApp);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi tạo lịch hẹn", error: err.message });
  }
});

// Cập nhật appointment (admin/editor)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi cập nhật", error: err.message });
  }
});

// Xóa appointment (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa" });
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi xóa", error: err.message });
  }
});

export default router;
