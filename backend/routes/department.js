import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { createDepartment, Departments } from "../controllers/department.js";

const router = express.Router();

router.post("/department/createDepartment", isAuth, createDepartment);
router.get("/department/departments", isAuth, Departments);

export default router
