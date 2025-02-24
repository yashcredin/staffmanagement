import React, { useState } from "react";
import { deletePerson, getEmiDetailsOnId, updateEMI } from "../api/personApi";

const StaffTable = ({ staffList, fetchStaff, setSelectedStaff }) => {
  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [emiDetails, setEmiDetails] = useState([]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      await deletePerson(id);
      fetchStaff();
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedEmiDetails = [...emiDetails];
    // console.log(`updatedEmi Details`, updatedEmiDetails)
    updatedEmiDetails[index][field] = value;
    setEmiDetails(updatedEmiDetails);
  };

  const handleModal = async (id) => {
    setShowModal(true)
    try {
      const { data } = await getEmiDetailsOnId(id);
      setEmiDetails(data?.data);
    } catch (error) {
      console.error("Error fetching EMI details:", error);
    }
  }

  const handleEdit = async (id) => {
    setEditRow(id)
  }
  const closeModal = () => {
    setShowModal(false);
    setEmiDetails([]);
    setEditRow(null)
  };

  const handleSave = async (emiId, index, personId) => {
    const updatedEMI = emiDetails[index];

    try {
      await updateEMI(emiId, updatedEMI);
      alert("EMI details updated successfully!");
      const { data } = await getEmiDetailsOnId(personId);
      setEmiDetails(data?.data);
      setEditRow(null)

    } catch (error) {
      console.error("Error updating EMI details:", error);
    }
  };

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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>EMI Details</h2>
            {emiDetails.length > 0 ? (
              <table className="emiTable">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>EMI</th>
                    <th>Adjusted Amount</th>
                    <th>Charges</th>
                    <th>Total EMI</th>
                    <th>Amount Paid</th>
                    <th>Balance Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emiDetails.map((emi, index) => (
                    <tr key={emi._id}>
                      <td>{emi.month}</td>
                      <td>{emi.emi}</td>
                      <td>{emi.adjustedAmount}</td>
                      <td>
                        <input
                          type="number"
                          value={emi.charges}
                          min={0}
                          disabled={emi.transactionDone || editRow !== emi?._id}
                          onChange={(e) => handleInputChange(index, "charges", e.target.value)}
                        />
                      </td>
                      <td>{(parseFloat(emi.emi) || 0) + (parseFloat(emi.adjustedAmount) || 0) + (parseFloat(emi.charges) || 0)}</td>
                      <td>
                        <input
                          type="number"
                          value={emi.amountPaid}
                          disabled={emi.transactionDone || editRow !== emi?._id}
                          min={0}
                          onChange={(e) => handleInputChange(index, "amountPaid", e.target.value)}
                        />
                      </td>
                      <td>{(parseFloat(emi.emi) || 0) + (parseFloat(emi.adjustedAmount) || 0) + (parseFloat(emi.charges) || 0) - (parseFloat(emi.amountPaid) || 0)}</td>
                      <td>
                        <button className={`${emi.transactionDone ? "" : "save-btn"}`} disabled={emi.transactionDone} onClick={() => handleSave(emi._id, index, emi.personId)}>Save</button>
                        <button className={`${emi.transactionDone ? "" : "edit-btn"}`} disabled={emi.transactionDone} onClick={() => handleEdit(emi._id)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No EMI records found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffTable;
