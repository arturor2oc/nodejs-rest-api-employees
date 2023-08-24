import {con} from '../connection.js';

export const ping = async (req, res) => {
    const [result] = await con.query('SELECT 1 + 1 AS result');
    res.json(result[0]);
};