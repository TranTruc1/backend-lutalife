import jwt from "jsonwebtoken";

// Middleware xác thực token
export const authMiddleware = (req, res, next) => {
  // Lấy token từ header Authorization: "Bearer <token>"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Không có token, quyền truy cập bị từ chối" });
  }

  try {
    // Giải mã token (Thay 'YOUR_SECRET_KEY' bằng biến môi trường thực tế của bạn)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key_tam_thoi");
    req.user = decoded; // Lưu thông tin user vào request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

// Middleware chỉ cho phép Admin
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Truy cập bị từ chối! Chỉ dành cho Admin." });
  }
};

// Middleware cho phép Admin hoặc Editor
export const adminOrEditor = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "editor")) {
    next();
  } else {
    res.status(403).json({ message: "Truy cập bị từ chối! Yêu cầu quyền Admin hoặc Editor." });
  }
};