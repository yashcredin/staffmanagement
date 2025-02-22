import  { Router } from "express";
import { addPerson, deletePerson, getAllPerson, getEmiDetails, updateEmiTransaction } from "../controllers/person.controller.js";


const router = Router();


router.post("/", addPerson);
router.get("/", getAllPerson);
router.delete("/:id", deletePerson);
router.get('/emi/:id', getEmiDetails)
router.put('/emi/:emiId', updateEmiTransaction)


export default router