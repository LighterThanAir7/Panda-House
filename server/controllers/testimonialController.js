import {
  createTestimonial,
  getAllTestimonialsModel,
  getFeaturedTestimonialsModel
} from '../models/testimonialModel.js';

export const addTestimonial = async (req, res) => {
  try {
    const { user_id, description, stars_number } = req.body;
    const testimonialId = await createTestimonial({ user_id, description, stars_number });
    res.status(201).json({ testimonialId });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'An error occurred while creating the testimonial.' });
  }
};

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await getAllTestimonialsModel();
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    res.status(500).json({ error: 'An error occurred while fetching all testimonials.' });
  }
};

export const getFeaturedTestimonials = async (req, res) => {
  try {
    const testimonials = await getFeaturedTestimonialsModel();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error('Error fetching featured testimonials:', error);
    res.status(500).json({ error: 'An error occurred while fetching featured testimonials.' });
  }
};
