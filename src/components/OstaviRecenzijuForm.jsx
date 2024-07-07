import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import BrojZvjezdica from "./BrojZvjezdica";
import { useTestimonials } from "../context/TestimonialContext.jsx";

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function OstaviRecenzijuForm() {
  const { user } = useContext(UserContext);
  const { addTestimonial, fetchAllTestimonials } = useTestimonials();
  const [formData, setFormData] = useState({
    description: "",
    stars_number: 0,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/prijava", { state: { backUrl: "/ostavi-recenziju" } });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarChange = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      stars_number: rating,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = "Opis je obavezan";
    if (!formData.stars_number) newErrors.stars_number = "Ocjena je obavezna";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}:${PORT}/api/testimonial/add-testimonial`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          description: formData.description,
          stars_number: formData.stars_number,
        }),
      });

      if (response.ok) {
        const newTestimonial = await response.json();
        addTestimonial(newTestimonial);
        fetchAllTestimonials();
        navigate('/poruka', { state: { tip: 'pozitivna', tekst: 'Recenzija je uspješno poslana', backUrl: '/recenzije' } });
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message });
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setErrors({ submit: 'Došlo je do pogreške prilikom slanja recenzije.' });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="text-center">Ostavi recenziju</h2>

      <BrojZvjezdica onStarChange={handleStarChange} />
      {errors.stars_number && <p className="error-message text-center">{errors.stars_number}</p>}

      <label className="form__label | mb-16">
        <textarea
          className="form__input form__input--textarea"
          name="description"
          placeholder="Napišite vašu recenziju"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </label>
      {errors.submit && <p className="error-message">{errors.submit}</p>}

      <button className="btn btn--tertiary btn--w-full" type="submit">Pošalji</button>
    </form>
  );
}
