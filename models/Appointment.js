import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["admin", "editor"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    note: { type: String },
    called: { type: Boolean, default: false },
    date: { type: Date },
    service: { type: String },

    // 👇 thêm trường mới
    internalNotes: [noteSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
