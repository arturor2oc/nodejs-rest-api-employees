import { Router } from "express";
import { getEmployees,getEmployee, createEmployees, updateEmployees, deleteEmployees } from '../controllers/employees.controller.js'

const router = Router();

// Configura una ruta que maneja solicitudes GET a '/employees' y dirige esas solicitudes al controlador 'getEmployees'.
router.get('/employees', getEmployees);

// Configura una ruta que maneja solicitudes GET a '/employees:id' y dirige esas solicitudes al controlador 'getEmployees'.
router.get('/employees/:id', getEmployee);

// Configura una ruta que maneja solicitudes post a '/employees' y dirige esas solicitudes al controlador 'getEmployees'.
router.post('/employees', createEmployees);

// Configura una ruta que maneja solicitudes patch a '/employees' y dirige esas solicitudes al controlador 'getEmployees'.
router.patch('/employees/:id', updateEmployees); 

// Configura una ruta que maneja solicitudes delete a '/employees' y dirige esas solicitudes al controlador 'getEmployees'.
router.delete('/employees/:id', deleteEmployees);

export default router;