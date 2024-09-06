import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { createDepartment, deleteDepartment, Departments } from "../controllers/department.js";

const router = express.Router();

router.post("/department/createDepartment", isAuth, createDepartment);
router.get("/department/departments", isAuth, Departments);
router.delete('/department/:id', isAuth, deleteDepartment)

export default router
