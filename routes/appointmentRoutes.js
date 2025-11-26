import express from "express";
import { authMiddleware, adminOnly, adminOrEditor } from "../middleware/authMiddleware.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ✅ cho admin + editor xem danh sách
router.get("/", authMiddleware, adminOrEditor, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ chỉ admin mới được xóa
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
