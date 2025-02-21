import  { Router } from "express";
import { addPerson, deletePerson, getAllPerson } from "../controllers/person.controller.js";


const router = Router();


router.post("/", addPerson);
router.get("/", getAllPerson);
router.delete("/:id", deletePerson);


export default router