import db from '../config/database.js';

export const createUser = async (user) => {
  const { first_name, last_name, street, house_number, city, postal_code, username, email, password } = user;
  const sql = 'INSERT INTO users (first_name, last_name, street, house_number, city, postal_code, username, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [result] = await db.query(sql, [first_name, last_name, street, house_number, city, postal_code, username, email, password]);
  return result;
};

export const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await db.query(sql, [username]);
  return rows.length > 0 ? rows[0] : null;
};

export const getUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.query(sql, [email]);
  return rows.length > 0 ? rows[0] : null;
};

export const getUserById = async (userId) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const [rows] = await db.query(sql, [userId]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateUser = async (userId, data) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    return null; // Nema podataka za ažuriranje
  }

  const sql = `
    UPDATE users 
    SET ${fields.map(field => `${field} = ?`).join(', ')}
    WHERE id = ?
  `;

  values.push(userId);
  console.log('Data to update:', data);

  const [result] = await db.query(sql, values);

  if (result.affectedRows === 0) {
    return null;
  }

  const updatedUser = await getUserById(userId);
  console.log('Fetched updated user:', updatedUser);

  return updatedUser;
};

export const updatePassword = async (userId, hashedPassword) => {
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  const [result] = await db.query(sql, [hashedPassword, userId]);

  if (result.affectedRows === 0) {
    return null;
  }

  return await getUserById(userId);
};