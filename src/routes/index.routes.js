import { Router } from "express";
import {ping} from '../controllers/index.controller.js';

//crea una instancia de un enrutador para definir las rutas de la aplicación.
const router = Router();

/*
Configura una ruta que escucha las solicitudes GET a la URL relativa '/ping'. 
Se llama al controlador ping para manejar la solicitud. 
Este controlador proporciona una respuesta simple para verificar la disponibilidad del servidor.
router.get('/ping', ping);
*/
router.get('/ping', ping);

export default router;