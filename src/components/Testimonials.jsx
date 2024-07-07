import SectionHeading from "./SectionHeading.jsx";
import CarouselTestimonial from "./CarouselTestimonial.jsx";
import { useTestimonials } from "../context/TestimonialContext.jsx";
import Loader from "./Loader.jsx";
import {Link} from "react-router-dom";

export default function Testimonials({ type }) {
  const { testimonials, featuredTestimonials, loading, getTestimonialCount } = useTestimonials();

  let testimonialsToShow = testimonials;

  if (type === "featured") {
    testimonialsToShow = featuredTestimonials;
  }

  return (
    <section className="container mx-auto py-150">
      <SectionHeading overline="Gosti o nama" title="Iskustva naših gostiju" />
      {loading ? (
        <Loader />
      ) : (
        <CarouselTestimonial testimonials={testimonialsToShow} />
      )}
      <div className="flex justify-content-between align-items-center mt-48">
        <p><span>{getTestimonialCount()} recenzija</span></p>
        <Link to="/ostavi-recenziju" className="btn btn--tertiary">Ostavi svoju recenziju</Link>
      </div>
    </section>
  );
}
