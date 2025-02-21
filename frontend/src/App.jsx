import { useEffect, useState } from 'react'
import './App.css'
import  StaffForm  from './components/StaffForm'
import StaffTable from './components/StaffTable'
import PersonForm from './components/PersonForm';
import { getAllPerson } from './api/personApi';

function App() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fetchStaff = async () => {
    try {
      const { data } = await getAllPerson();
      console.log(`data of staff`,data)
      setStaffList(data.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  // console.log(`staff selected`, selectedStaff)
  useEffect(() => {
    fetchStaff();
  }, []);
  return (
    <>
      <div className="container">
      <h2>Loan Management</h2>
      <PersonForm fetchStaff={fetchStaff}/>
      {/* <StaffForm selectedStaff={selectedStaff} fetchStaff={fetchStaff} clearSelection={() => setSelectedStaff(null)} /> */}
      <StaffTable staffList={staffList} fetchStaff={fetchStaff} setSelectedStaff={setSelectedStaff} />
    </div>
    </>
  )
}

export default App
