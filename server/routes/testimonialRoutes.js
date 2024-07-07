import { Router } from 'express';
import {
  addTestimonial,
  getAllTestimonials,
  getFeaturedTestimonials
} from '../controllers/testimonialController.js';

const router = Router();


router.get('/all-testimonials', getAllTestimonials);
router.get('/featured-testimonials', getFeaturedTestimonials);

router.post('/add-testimonial', addTestimonial);

export default router;