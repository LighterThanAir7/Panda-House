import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    street: '',
    house_number: '',
    city: '',
    postal_code: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleUsernameBlur = async () => {
    if (formData.username.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Korisničko ime mora imati barem 3 znaka',
      }));
      return;
    }

    try {
      console.log("try event");
      const response = await fetch(`${BASE_URL}:${PORT}/api/users/check-username/${formData.username}`);
      const data = await response.json();
      if (data.exists) {
        console.log("Postoji ovakav username");
        setUsernameTaken(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Korisničko ime je zauzeto',
        }));
      } else {
        setUsernameTaken(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: '',
        }));
      }
    } catch (error) {
    }
  };

  const handleEmailBlur = async () => {
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/api/users/check-email/${formData.email}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.exists) {
        setEmailTaken(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email je već registriran',
        }));
      } else {
        setEmailTaken(false);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'Ime je obavezno';
    if (!formData.last_name) newErrors.last_name = 'Prezime je obavezno';
    if (!formData.street) newErrors.street = 'Ulica je obavezna';
    if (!formData.house_number) newErrors.house_number = 'Obavezan';
    if (!formData.city) newErrors.city = 'Grad je obavezan';
    if (!formData.postal_code) newErrors.postal_code = 'Poštanski broj je obavezan';
    if (!formData.username) {
      newErrors.username = 'Korisničko ime je obavezno';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Korisničko ime mora imati barem 3 znaka';
    } else if (usernameTaken) {
      newErrors.username = 'Korisničko ime je zauzeto';
    }
    if (!formData.email) {
      newErrors.email = 'Email je obavezan';
    } else if (emailTaken) {
      newErrors.email = 'Email je već registriran';
    }
    if (!formData.password) {
      newErrors.password = 'Lozinka je obavezna';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Lozinka mora imati barem 8 znakova';
    }
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Lozinke se ne podudaraju';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await fetch(`${BASE_URL}:${PORT}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        street: '',
        house_number: '',
        city: '',
        postal_code: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/poruka', { state: { tip: 'pozitivna', tekst: 'Uspješno ste se registrirali', backUrl: '/prijava'} });
    } else {
      navigate('/poruka', { state: { tip: 'negativna', tekst: 'Došlo je do pogreške prilikom registracije' } });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="text-center">Registracija</h2>

      <div className="form__row">
        <label className="form__label | mb-16">Ime
          <input className="form__input" name="first_name" type="text" placeholder="Benjamin" value={formData.first_name} onChange={handleChange} />
          {errors.first_name && <p className="error-message">{errors.first_name}</p>}
        </label>
        <label className="form__label | mb-16">Prezime
          <input className="form__input" name="last_name" type="text" placeholder="Babić" value={formData.last_name} onChange={handleChange} />
          {errors.last_name && <p className="error-message">{errors.last_name}</p>}
        </label>
      </div>

      <div className="form__row">
        <label className="form__label | mb-16 w-80">Ulica
          <input className="form__input" name="street" type="text" placeholder="Gradišćanska" value={formData.street}
                 onChange={handleChange}/>
          {errors.street && <p className="error-message">{errors.street}</p>}
        </label>
        <label className="form__label | mb-16 w-20">Broj
          <input className="form__input" name="house_number" type="text" placeholder="14" value={formData.house_number}
                 onChange={handleChange}/>
          {errors.house_number && <p className="error-message">{errors.house_number}</p>}
        </label>
      </div>

      <div className="form__row">
        <label className="form__label | mb-16">Grad
          <input className="form__input" name="city" type="text" placeholder="Zagreb" value={formData.city}
                 onChange={handleChange}/>
          {errors.city && <p className="error-message">{errors.city}</p>}
        </label>
        <label className="form__label | mb-16">Poštanski broj
          <input className="form__input" name="postal_code" type="text" placeholder="10000" value={formData.postal_code}
                 onChange={handleChange}/>
          {errors.postal_code && <p className="error-message">{errors.postal_code}</p>}
        </label>
      </div>


      <label className="form__label | mb-16">Korisničko ime
        <input className="form__input" name="username" type="text" placeholder="bbabic" value={formData.username}
               onChange={handleChange} onBlur={handleUsernameBlur}/>
        {errors.username && <p className="error-message">{errors.username}</p>}
      </label>
      <label className="form__label | mb-12">Email
        <input className="form__input" name="email" type="email" placeholder="benibabic@gmail.com"
               value={formData.email} onChange={handleChange} onBlur={handleEmailBlur}/>
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>
      <label className="form__label | mb-12">Lozinka
        <input className="form__input" name="password" type="password" placeholder="●●●●●●●●" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </label>
      <label className="form__label | mb-12">Ponovi lozinku
        <input className="form__input" name="confirmPassword" type="password" placeholder="●●●●●●●●" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </label>

      <div className="flex justify-content-between | fs-200 mb-12">
        <p>Već imate račun?</p>
        <Link to="/prijava" className="form__register">
          Prijavite se
        </Link>
      </div>

      <button className="btn btn--secondary btn--w-full" type="submit">Registrirajte se</button>
    </form>
  );
}