import axios from "axios"

const API_URL = "http://localhost:5000/api/person";


export const getAllPerson = async () => {
  return await axios.get(API_URL);
};

export const addPerson = async (personData) => {
  return await axios.post(API_URL, personData);
};

export const updateStaff = async (id, staffData) => {
  return await axios.put(`${API_URL}/${id}`, staffData);
};

export const deletePerson = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};