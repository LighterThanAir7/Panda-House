import { createContext, useContext, useState, useEffect } from 'react';

const TestimonialContext = createContext();

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const TestimonialProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTestimonials = async () => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/api/testimonial/all-testimonials`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedTestimonials = async () => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/api/testimonial/featured-testimonials`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setFeaturedTestimonials(data);
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = (newTestimonial) => {
    setTestimonials((prevTestimonials) => [newTestimonial, ...prevTestimonials]);
  };

  const getTestimonialCount = () => testimonials.length;

  useEffect(() => {
    fetchAllTestimonials();
    fetchFeaturedTestimonials();
  }, []);

  return (
    <TestimonialContext.Provider value={{ testimonials, featuredTestimonials, loading, addTestimonial, getTestimonialCount, fetchAllTestimonials }}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => useContext(TestimonialContext);
