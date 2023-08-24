import { Router } from "express";
import { getEmployees,getEmployee, createEmployees, updateEmployees, deleteEmployees } from '../controllers/employees.controller.js'

const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployee);

router.post('/employees', createEmployees);

router.patch('/employees/:id', updateEmployees); //actualizar solo un dato

router.delete('/employees/:id', deleteEmployees);

export default router;