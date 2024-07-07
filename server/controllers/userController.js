import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  updatePassword,
  updateUser
} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.VITE_JWT_SECRET;

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const existingEmail = await getUserByEmail(user.email);
    if (existingEmail) {
      return res.status(400).json({ error: 'Email je već registriran' });
    }
    user.password = await bcrypt.hash(user.password, 10);
    const result = await createUser(user);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Korisničko ime nije pronađeno' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Lozinka nije ispravna' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '3h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Greška u serveru' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('User ID from token:', userId);

    const user = await getUserById(userId);
    console.log('Fetched user:', user);

    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    res.status(500).json({ error: 'Greška prilikom dohvaćanja podataka o korisniku.' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      first_name,
      last_name,
      street,
      house_number,
      city,
      postal_code,
      username,
      email,
      card_first_name,
      card_last_name,
      card_number,
      card_cvv,
      card_exp_month,
      card_exp_year,
      orders_completed
    } = req.body;

    const dataToUpdate = {
      ...(first_name !== undefined && { first_name }),
      ...(last_name !== undefined && { last_name }),
      ...(street !== undefined && { street }),
      ...(house_number !== undefined && { house_number }),
      ...(city !== undefined && { city }),
      ...(postal_code !== undefined && { postal_code }),
      ...(username !== undefined && { username }),
      ...(email !== undefined && { email }),
      ...(card_first_name !== undefined && { card_first_name }),
      ...(card_last_name !== undefined && { card_last_name }),
      ...(card_number !== undefined && { card_number }),
      ...(card_cvv !== undefined && { card_cvv }),
      ...(card_exp_month !== undefined && { card_exp_month }),
      ...(card_exp_year !== undefined && { card_exp_year }),
      ...(orders_completed !== undefined && { orders_completed }),
    };

    const updatedUser = await updateUser(userId, dataToUpdate);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Korisnik nije pronađen.' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Greška prilikom ažuriranja podataka o korisniku.' });
  }
};

export const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Trenutna lozinka nije ispravna' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await updatePassword(userId, hashedPassword);

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    res.status(500).json({ error: 'Greška prilikom promjene lozinke' });
  }
};
