import Person from "../models/person.model.js";
import EMI from "../models/emi.model.js";


export const addPerson = async (req, res) => {
  try {
    const { name, gender, loanPrincipalAmount, loanROI, loanTenure } = req.body;

    if(!name || !gender || !loanPrincipalAmount || !loanROI || !loanTenure){
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingPerson = await Person.findOne({ name });
    if (existingPerson) {
      return res.status(400).json({ message: "Person already exists" });
    }

    const newPerson = await  Person.create({
      name, gender , loanPrincipalAmount , loanROI , loanTenure 
    })

    const principal = parseFloat(loanPrincipalAmount);
    const roi = parseFloat(loanROI);
    const tenure = parseInt(loanTenure);
    let emiSchedule = [];
    const emi = (principal * roi)/100;

    for(let i=1 ; i<=tenure ; i++){  
      emiSchedule.push({
        personId: newPerson._id,
        month: i,
        emi,
        balanceAmt: 0
      });
    }

    await EMI.insertMany(emiSchedule)

    res.status(201).json({ message: "Person and EMI schedule created successfully", data: newPerson });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllPerson = async(req, res)=>{
  try {
    const personLists = await Person.find();
    res.json({data : personLists});

  } catch (error) {
    console.log(`Error from get All persons`, error , error.message)
  }
}


export const deletePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });


    await EMI.deleteMany({ personId: person._id });


    await Person.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Person and related EMI records deleted successfully" });
  } catch (error) {
    console.error("Error from deletePerson", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};