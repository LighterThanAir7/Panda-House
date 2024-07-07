import { useState } from 'react';

export default function BrojZvjezdica({ onStarChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index);
    onStarChange(index);
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="testimonial__stars testimonial__stars--pointer justify-content-center mb-20">
      {[1, 2, 3, 4, 5].map((index) => (
        <i
          key={index}
          className={(index <= (hoverRating || rating)) ? "testimonial__star fa-solid fa-star" : "testimonial__star fa-regular fa-star"}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        ></i>
      ))}
    </div>
  );
}
