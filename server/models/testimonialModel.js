import db from '../config/database.js';

export const createTestimonial = async (data) => {
  const { user_id, description, stars_number } = data;
  const sql = `
    INSERT INTO testimonials (user_id, description, stars_number)
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(sql, [user_id, description, stars_number]);
  return result.insertId;
};

export const getAllTestimonialsModel = async () => {
  const sql = `
    SELECT 
      t.id,
      t.description,
      t.stars_number,
      DATE_FORMAT(t.created_on, '%d/%m/%Y') AS created_on,
      t.is_featured,
      CONCAT(u.first_name, ' ', u.last_name) AS full_name
    FROM testimonials t
    JOIN users u ON t.user_id = u.id
    ORDER BY t.created_on DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
};

export const getFeaturedTestimonialsModel = async () => {
  const sql = `
    SELECT 
      t.id,
      t.description,
      t.stars_number,
      DATE_FORMAT(t.created_on, '%d/%m/%Y') AS created_on,
      t.is_featured,
      CONCAT(u.first_name, ' ', u.last_name) AS full_name
    FROM testimonials t
    JOIN users u ON t.user_id = u.id
    WHERE t.is_featured = true
    ORDER BY t.created_on DESC
  `;
  const [rows] = await db.query(sql);
  return rows;
};

