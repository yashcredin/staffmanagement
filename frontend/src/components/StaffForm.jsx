import React, { useEffect, useState } from 'react'
import { addStaff, updateStaff } from '../api/staffApi';

const StaffForm = ({ selectedStaff, fetchStaff, clearSelection }) => {
  const [staffData, setStaffData] = useState({ name: "", phone: "", email: "", password: "" });

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (selectedStaff) {
        response = await updateStaff(selectedStaff._id, staffData);
        alert(response.data.message || "Staff updated successfully!");
      } else {
        response = await addStaff(staffData);
        alert(response.data.message || "Staff added successfully!");
      }
      fetchStaff();
      clearSelection();
      setStaffData({ name: "", phone: "", email: "", password: "" });
    } catch (error) {
      console.log(`error from form`,error.response)
      alert(error.response?.data?.message || "Error adding staff");
    }
  };

  useEffect(() => {
    if (selectedStaff) {
      setStaffData({ ...selectedStaff, password: "" });
    }
  }, [selectedStaff]);
  return (
    <form onSubmit={handleSubmit} className="staff-form">
      <input type="text" name="name" placeholder="Name" value={staffData.name} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" value={staffData.phone} onChange={handleChange} required pattern="[0-9]{10}" />
      <input type="email" name="email" placeholder="Email" value={staffData.email} onChange={handleChange} required />
      {!selectedStaff && <input type="password" name="password" placeholder="Password" value={staffData.password} onChange={handleChange} required />}
      <button type="submit">{selectedStaff ? "Update Staff" : "Add Staff"}</button>
    </form>
  )
}

export default StaffForm