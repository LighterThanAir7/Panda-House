import { Router } from 'express';
import {
  registerUser,
  checkUsername,
  checkEmail,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/profile', authenticateToken, getUserProfile);
router.get('/check-username/:username', checkUsername);
router.get('/check-email/:email', checkEmail);

router.put('/update-profile', authenticateToken, updateUserProfile);
router.put('/reset-password', authenticateToken, resetPassword);


export default router;
