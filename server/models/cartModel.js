import db from '../config/database.js';

export const getProductsByIdsModel = async (ids) => {
  const sql = `SELECT id, naziv, cijena FROM proizvodi WHERE id IN (?)`;
  const [rows] = await db.query(sql, [ids]);
  return rows;
};
