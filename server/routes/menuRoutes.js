import { Router } from 'express';
import {
  getCategories,
  getProductsByCategory,
  getProductsBySubcategory,
  getSubcategories
} from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/categories/:categoryId/subcategories', getSubcategories);

// Svi proizvodi iz kategorije
router.get('/categories/:categoryId/products', getProductsByCategory);

// Svi proizvodi iz subkategorije
router.get('/subcategories/:subcategoryId/products', getProductsBySubcategory);


export default router;