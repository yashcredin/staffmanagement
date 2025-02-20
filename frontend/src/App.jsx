import { useEffect, useState } from 'react'
import './App.css'
import  StaffForm  from './components/StaffForm'
import StaffTable from './components/StaffTable'
import { getAllStaff } from './api/staffApi';

function App() {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const fetchStaff = async () => {
    try {
      const { data } = await getAllStaff();
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
      <h2>Staff Management</h2>
      <StaffForm selectedStaff={selectedStaff} fetchStaff={fetchStaff} clearSelection={() => setSelectedStaff(null)} />
      <StaffTable staffList={staffList} fetchStaff={fetchStaff} setSelectedStaff={setSelectedStaff} />
    </div>
    </>
  )
}

export default App
