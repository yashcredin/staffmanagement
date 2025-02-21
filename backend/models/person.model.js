import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  loanPrincipalAmount: {
    type: String,
    required: true
  },
  loanROI: {
    type: String,
    required: true
  },
  loanTenure: {
    type: String,
    required: true
  }
});



const Person = mongoose.model("Person", personSchema);
export default Person;
