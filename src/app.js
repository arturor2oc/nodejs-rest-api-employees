import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRotes from './routes/index.routes.js';


const app = express();

app.use(express.json());

app.use(indexRotes);
app.use('/api', employeesRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoin Not Found'
    })
});

export default app;