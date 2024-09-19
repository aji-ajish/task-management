import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import {
  createDepartment,
  deleteDepartment,
  Departments,
  singleDepartment,
  updateDepartmentById,
} from "../controllers/department.js";

const router = express.Router();

router.post("/department/createDepartment", isAuth, createDepartment);
router.get("/department/departments", isAuth, Departments);
router.get("/department/:id", isAuth, singleDepartment);
router.put("/department/:id", isAuth, updateDepartmentById);
router.delete("/department/:id", isAuth, deleteDepartment);

export default router;
