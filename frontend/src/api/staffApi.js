import axios from "axios"

const API_URL = "http://localhost:5000/api/staff";


export const getAllStaff = async () => {
  return await axios.get(API_URL);
};

export const addStaff = async (staffData) => {
  return await axios.post(API_URL, staffData);
};

export const updateStaff = async (id, staffData) => {
  return await axios.put(`${API_URL}/${id}`, staffData);
};

export const deleteStaff = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};