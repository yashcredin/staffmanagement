import Staff from "../models/employee.model.js";

// Add Staff
export const addStaff = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check if email or phone already exists
    const existingStaff = await Staff.findOne({ $or: [{ email }, { phone }] });
    if (existingStaff) {
      return res.status(400).json({ message: "Email or Phone already exists" });
    }

    // Create new staff
    const newStaff = new Staff({ name, phone, email, password });
    await newStaff.save();
    
    res.status(201).json({ message: "Staff created successfully", data: newStaff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Staff
export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().select("-password"); 
    res.json({data : staffList});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Staff by ID
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).select("-password");
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Staff 
export const updateStaff = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });

 
    staff.name = name || staff.name;
    staff.phone = phone || staff.phone;
    staff.email = email || staff.email;

    await staff.save();
    res.json({ message: "Staff updated successfully", data : staff });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
