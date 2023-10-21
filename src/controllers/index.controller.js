import { con } from '../connection.js';

/**
 * Realiza una prueba de ping a la base de datos y responde con el resultado en formato JSON.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
export const ping = async (req, res) => {
    // Realiza una consulta simple a la base de datos (en este caso, 'SELECT 1 + 1 AS result').
    const [result] = await con.query('SELECT 1 + 1 AS result');
    // En caso de error, devuelve una respuesta de error con un código de estado 500 y un mensaje descriptivo.
    res.json(result[0]);
};