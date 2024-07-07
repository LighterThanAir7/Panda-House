import { useEffect, useRef } from "react";
import Testimonial from "./Testimonial.jsx";
import { useTestimonials } from "../context/TestimonialContext.jsx";
import Loader from "./Loader.jsx";

export default function CarouselTestimonial({ testimonials }) {
  const carouselRef = useRef(null);
  const { loading } = useTestimonials();

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="carousel-container">
      <div className="carousel__controls">
        <button onClick={handlePrev}>
          <i className="carousel__button fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={handleNext}>
          <i className="carousel__button fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="carousel" ref={carouselRef}>
        {testimonials.map((testimonial) => (
          <Testimonial
            key={testimonial.id}
            image={"./src/assets/testimonial-1.png"}
            stars={testimonial.stars_number}
            date={testimonial.created_on}
            name={testimonial.full_name}
            text={testimonial.description}
          />
        ))}
      </div>
    </div>
  );
}
