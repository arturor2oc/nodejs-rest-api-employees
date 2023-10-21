import { con } from '../connection.js';

/**
 * Obtiene la lista de empleados desde la base de datos y responde con un objeto JSON.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const getEmployees = async (req, res) => {
    try {
        // Intenta realizar una consulta a la base de datos para seleccionar todos los empleados.
        const [rows] = await con.query('SELECT * FROM employee');
        // Responde con un objeto JSON que contiene los resultados de la consulta.
        res.json(rows);
    } catch (error) {
        // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }

};

/**
 * Obtiene un empleado específico desde la base de datos según su ID y responde con un objeto JSON.
 * @param {object} req - Objeto de solicitud HTTP que contiene los parámetros de la URL.
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const getEmployee = async (req, res) => {
    // Obtiene el parámetro 'id' de la URL de la solicitud.
    const id = req.params.id;

    try {
        // Intenta realizar una consulta a la base de datos para seleccionar un empleado con el ID proporcionado.
        const [rows] = await con.query('SELECT * FROM employee WHERE id = ?', [id]);

        // Si no se encuentra ningún empleado con el ID especificado, responde con un código de estado 404 y un mensaje descriptivo.
        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        // Si se encuentra un empleado con el ID, responde con un objeto JSON que contiene los detalles del empleado.
        res.json(rows);
    } catch (error) {
        // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

/**
 * Crea un nuevo empleado en la base de datos y responde con un objeto JSON que contiene los detalles del empleado creado.
 * @param {object} req - Objeto de solicitud HTTP que debe contener en el cuerpo (body) los datos del nuevo empleado, incluyendo el nombre (name) y el salario (salary).
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const createEmployees = async (req, res) => {
    // Obtiene los datos del nuevo empleado del cuerpo de la solicitud.
    const { name, salary } = req.body;

    try {
        // Intenta realizar una inserción en la base de datos con el nombre y salario proporcionados.
        const [rows] = await con.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);

        // Responde con un objeto JSON que contiene el ID del empleado creado, nombre y salario.
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    } catch (error) {
        // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

/**
 * Actualiza un empleado existente en la base de datos según su ID y responde con un objeto JSON que contiene los detalles actualizados del empleado.
 * @param {object} req - Objeto de solicitud HTTP que debe contener el parámetro 'id' en la URL y los datos de actualización en el cuerpo (body) de la solicitud, incluyendo el nombre (name) y el salario (salary).
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const updateEmployees = async (req, res) => {
    // Obtiene el ID del empleado de la URL y los datos de actualización del cuerpo de la solicitud.
    const id = req.params.id;
    const { name, salary } = req.body;

    try {
        // Intenta actualizar el empleado en la base de datos según el ID proporcionado.
        const [result] = await con.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

        // Si no se encuentra ningún empleado con el ID especificado, responde con un código de estado 404 y un mensaje descriptivo.
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        // Recupera los detalles actualizados del empleado y responde con un objeto JSON.
        const [rows] = await con.query('SELECT * FROM employee WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};

/**
 * Elimina un empleado de la base de datos según su ID y responde con un código de estado 204 si la eliminación es exitosa.
 * @param {object} req - Objeto de solicitud HTTP que debe contener el parámetro 'id' en la URL.
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const deleteEmployees = async (req, res) => {
    // Obtiene el ID del empleado de la URL.
    const id = req.params.id;

    try {
        // Intenta eliminar el empleado de la base de datos según el ID proporcionado.
        const [result] = await con.query('DELETE FROM employee WHERE id = ?', [id]);

        // Si no se encuentra ningún empleado con el ID especificado, responde con un código de estado 404 y un mensaje descriptivo.
        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            });
        }

        // Responde con un código de estado 204 para indicar una eliminación exitosa sin contenido.
        res.sendStatus(204);
    } catch (error) {
        // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};