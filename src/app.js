import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRotes from './routes/index.routes.js';

const app = express();

// Utiliza el middleware 'express.json()' para analizar el cuerpo (body) de las solicitudes como JSON.
app.use(express.json());

// Utiliza las rutas definidas en 'indexRotes' para manejar ciertas solicitudes.
app.use(indexRotes);
// Utiliza las rutas definidas en 'employeesRoutes' para manejar solicitudes bajo la ruta '/api'.
app.use('/api', employeesRoutes);

// Define un manejador para las solicitudes que no coinciden con las rutas anteriores, respondiendo con un código de estado 404 y un mensaje "Endpoint Not Found".
app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoin Not Found'
    })
});

export default app;