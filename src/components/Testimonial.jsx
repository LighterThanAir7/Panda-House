export default function Testimonial({ image, name, text, date, stars }) {
  const renderStars = (stars) => {
    const fullStars = Array(stars).fill(<i className="testimonial__star fa-solid fa-star"></i>);
    const emptyStars = Array(5 - stars).fill(<i className="testimonial__star fa-regular fa-star"></i>);

    return [...fullStars, ...emptyStars].map((star, index) => (
      <span key={index}>{star}</span>
    ));
  };

  return (
    <div className="testimonial">
      <div className="flex justify-content-between align-items-center mb-12">
        <img src={image} alt={name} className="testimonial__image"/>
        <div className="testimonial__stars">
          {renderStars(stars)}
        </div>
      </div>

      <div className="flex justify-content-between">
        <h4 className="testimonial__name">{name}</h4>
        <p>{date}</p>
      </div>

      <p className="testimonial__text">{text}</p>
    </div>
  );
}
