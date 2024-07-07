import db from '../config/database.js';

export const getCategoriesModel = async () => {
  const sql = 'SELECT * FROM kategorije';
  const [rows] = await db.query(sql);
  return rows;
};

export const getSubcategoriesByCategoryId = async (categoryId) => {
  const sql = 'SELECT * FROM podkategorije WHERE id_kategorija = ?';
  const [rows] = await db.query(sql, [categoryId]);
  return rows;
};

export const getProductsByCategoryId = async (categoryId) => {
  const sql = `
    SELECT p.*
    FROM proizvodi p
    JOIN proizvodi_kategorije pk ON p.id = pk.id_proizvod
    WHERE pk.id_kategorija = ?
  `;
  const [rows] = await db.query(sql, [categoryId]);
  return rows;
};

export const getProductsBySubcategoryId = async (subcategoryId) => {
  const sql = `
    SELECT p.*
    FROM proizvodi p
    JOIN proizvodi_kategorije pk ON p.id = pk.id_proizvod
    WHERE pk.id_podkategorija = ?
  `;
  const [rows] = await db.query(sql, [subcategoryId]);
  return rows;
};