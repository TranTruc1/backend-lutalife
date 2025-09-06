import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// Lấy danh sách khách hàng
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Thêm khách hàng
router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;
    const newCustomer = new Customer({ name, phone });
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).json({ message: "Không thêm được khách hàng" });
  }
});

export default router;
