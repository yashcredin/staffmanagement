import React from "react";
import { deleteStaff } from "../api/staffApi";

const StaffTable = ({ staffList, fetchStaff, setSelectedStaff }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deleteStaff(id);
      fetchStaff();
    }
  };

  return (
    <table className="staff-table">
      <thead>
        <tr>
          <th>Staff ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {staffList?.map((staff) => (
          <tr key={staff._id}>
            <td>{staff.staffId}</td>
            <td>{staff.name}</td>
            <td>{staff.phone}</td>
            <td>{staff.email}</td>
            <td>
              <button className="edit-btn" onClick={() => setSelectedStaff(staff)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;
