import express from "express";
import Appointment from "../models/Appointment.js";
// Import middleware từ file của bạn (đảm bảo đường dẫn đúng)
import { authMiddleware, adminOnly, adminOrEditor } from "../middleware/authMiddleware.js";

const router = express.Router();

// 1. GET: Lấy danh sách (Chỉ Admin hoặc Editor mới xem được)
router.get("/", authMiddleware, adminOrEditor, async (req, res) => {
  try {
    // Sắp xếp: Mới nhất lên đầu (-1)
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server: " + err.message });
  }
});

// 2. POST: Tạo đơn hàng/lịch hẹn mới (PUBLIC - Không cần đăng nhập)
// ⚠️ QUAN TRỌNG: Route này cần thiết cho ProductOrderForm hoạt động
router.post("/", async (req, res) => {
  try {
    // Lấy dữ liệu từ frontend
    const { name, phone, address, note, service, date } = req.body;

    const newApp = new Appointment({
      name,
      phone,
      address,
      note,      // Khớp với schema bạn đã sửa
      service,   // Ví dụ: "ĐẶT HÀNG ONLINE"
      date
    });

    await newApp.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi tạo đơn", error: err.message });
  }
});

// 3. DELETE: Xóa đơn hàng (Chỉ Admin mới được xóa)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa", error: err.message });
  }
});

// 4. PUT: Cập nhật trạng thái (nếu cần sau này)
router.put("/:id", authMiddleware, adminOrEditor, async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Lỗi cập nhật", error: err.message });
  }
});

export default router;