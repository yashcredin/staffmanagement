import React, { useState } from "react";
import { deletePerson } from "../api/personApi";

const StaffTable = ({ staffList, fetchStaff, setSelectedStaff }) => {
  const [showModal , setShowModal] = useState(false);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deletePerson(id);
      fetchStaff();
    }
  };

  const handleModal = async(id)=>{
    setShowModal(true)
   
  }

  // console.log(`show modal`, showModal)

  return (
    <>
    <table className="staff-table">
      <thead>
        <tr>
          {/* <th>Staff ID</th> */}
          <th>Name</th>
          <th>Gender</th>
          <th>Loan Principal Amount</th>
          <th>Loan ROI</th>
          <th>Loan Tenure</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {staffList?.map((staff) => (
          <tr key={staff._id}>
            {/* <td>{staff.staffId}</td> */}
            <td>{staff.name.toUpperCase()}</td>
            <td>{staff.gender}</td>
            <td>{staff.loanPrincipalAmount}</td>
            <td>{staff.loanROI}</td>
            <td>{staff.loanTenure}</td>
            <td>
              <button className="edit-btn" onClick={() => handleModal(staff._id)}>View Emi Details</button>
              <button className="delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </>
  );
};

export default StaffTable;
