import mongoose from "mongoose";

import { v4 as uuidv4 } from "uuid"; 

const staffSchema = new mongoose.Schema({
  staffId: { type: String, unique: true, required: true, default: () => `STF-${uuidv4().slice(0, 8).toUpperCase()}` }, 
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
