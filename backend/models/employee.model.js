import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  staffId: { type: String, unique: true, required: true, default: () => `STF-${Date.now().toString(36).toUpperCase().slice(-8)}` },
  name: { type: String, required: true },
  phone: {
    type: String,
    unique: true,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  password: { type: String, required: true },
});



const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
