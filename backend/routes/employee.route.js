import  { Router } from "express";
import { addStaff, deleteStaff, getAllStaff, updateStaff } from "../controllers/employee.controller.js";
// import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employee.controller.js";


const router = Router();

router.post("/", addStaff);
router.get("/", getAllStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
