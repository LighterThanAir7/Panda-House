import { Router } from 'express';
import { getCartProducts } from '../controllers/cartController.js';

const router = Router();

router.post('/products', getCartProducts);

export default router;