import React, { useState } from 'react'
import { addPerson } from '../api/personApi'

const PersonForm = ({fetchStaff}) => {
  const [personData, setPersonData] = useState({
    name: "",
    gender: "",
    loanPrincipalAmount: "",
    loanROI: "",
    loanTenure: ""
  })
  const handleChange = (e) => {
    const {name , value} = e.target
    setPersonData({...personData , [name]:value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await addPerson(personData);
    fetchStaff();
    setPersonData({
      name: "",
      gender: "",
      loanPrincipalAmount: "",
      loanROI: "",
      loanTenure: ""
    })
  }

  return (
    <form onSubmit={handleSubmit} className="staff-form">
      <input type="text" name="name" placeholder="Name" value={personData.name} onChange={handleChange} required />
      <input type="text" name="gender" placeholder="Gender" value={personData.gender} onChange={handleChange} required />
      <input type="text" name="loanPrincipalAmount" placeholder="Loan Principal Amount" value={personData.loanPrincipalAmount} onChange={handleChange} required />
      <input type="text" name="loanROI" placeholder="Loan ROI" value={personData.loanROI} onChange={handleChange} required />
      <input type="text" name="loanTenure" placeholder="Loan Tenure" value={personData.loanTenure} onChange={handleChange} required />
      <button type="submit">Add Person</button>
    </form>
  )
}

export default PersonForm