import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function LoginForm () {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const rememberMeState = localStorage.getItem('rememberMe') === 'true';

    if (rememberedUsername && rememberMeState) {
      setFormData({
        username: rememberedUsername,
        password: rememberedPassword,
      });
      setRememberMe(true);
    }
  }, []);

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

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Korisničko ime je obavezno';
    if (!formData.password) newErrors.password = 'Lozinka je obavezna';
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
      const response = await fetch(`${BASE_URL}:${PORT}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
          localStorage.setItem('rememberedPassword', formData.password);
          localStorage.setItem('rememberMe', true);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
          localStorage.setItem('rememberMe', false);
        }
        localStorage.setItem('token', data.token);

        const userResponse = await fetch(`${BASE_URL}:${PORT}/api/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': data.token,
            'Content-Type': 'application/json',
          },
        });

        const userData = await userResponse.json();
        if (userResponse.ok) {
          setUser(userData.user);
          const backUrl = location.state?.backUrl || '/';
          navigate(backUrl);
        } else {
          setErrors({ login: userData.error });
        }
      } else {
        setErrors({ login: data.message });
      }
    } catch (error) {
      navigate('/poruka', { state: { tip: 'negativna', tekst: 'Došlo je do pogreške prilikom prijave', backUrl: '/prijava' } });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="text-center">Prijava</h2>

      <label className="form__label | mb-16">Korisničko ime
        <input
          className="form__input"
          name="username"
          type="text"
          placeholder="bbabic"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </label>

      <label className="form__label | mb-12">Lozinka
        <input
          className="form__input"
          name="password"
          type="password"
          placeholder="●●●●●●●●"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </label>

      {errors.login && <p className="error-message">{errors.login}</p>}

      <div className="flex justify-content-between | fs-300 mb-12">
        <p>Nemate račun?</p>
        <Link to="/registracija" className="form__register">
          Registrirajte se
        </Link>
      </div>

      <label className="form__label form__label--regular form__label--custom-checkbox | mb-16">
        <input
          className="form__checkbox"
          name="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={handleCheckboxChange}
        />
        <div className="custom-checkbox"></div> Zapamti me
      </label>

      <button className="btn btn--secondary btn--w-full" type="submit">Prijavite se</button>
    </form>
  )
}
