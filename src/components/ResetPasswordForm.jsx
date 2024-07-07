import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from '../context/UserContext';
import bcrypt from 'bcryptjs';
import InputField from "./InputField.jsx";

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ResetPasswordForm () {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);
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

  const handleBlur = async () => {
    console.log("Trenutni podaci korisnika: ", user.password);
    console.log("oldPassword", formData.oldPassword);

    const isMatch = await bcrypt.compare(formData.oldPassword, user.password);
    if (!isMatch) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        oldPassword: 'Trenutna lozinka nije ispravna',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = 'Stara lozinka je obavezna';
    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova lozinka je obavezna';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Nova lozinka mora imati barem 8 znakova';
    }
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Lozinke se ne podudaraju';
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
      const response = await fetch(`${BASE_URL}:${PORT}/api/users/reset-password`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');

        navigate('/poruka', { state: { tip: 'pozitivna', tekst: 'Usjpešno ste promijenili lozinku', backUrl: '/profil' } });
      } else {
        setErrors({ login: data.error });
      }
    } catch (error) {
      navigate('/poruka', { state: { tip: 'negativna', tekst: 'Došlo je do pogreške prilikom prijave', backUrl: '/promijeni-lozinku' } });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="text-center">Promjena lozinke</h2>

      <InputField
        label="Trenutna lozinka"
        name="oldPassword"
        placeholder="Unesite trenutnu lozinku"
        value={formData.oldPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.oldPassword && <p className="error-message">{errors.oldPassword}</p>}
      />

      <InputField
        label="Nova lozinka"
        name="newPassword"
        type="password"
        placeholder="●●●●●●●●"
        value={formData.newPassword}
        onChange={handleChange}
        error={errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
      />

      <InputField
        label="Ponovi novu lozinku"
        name="confirmPassword"
        type="password"
        placeholder="●●●●●●●●"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      />

      <button className="btn btn--secondary btn--w-full" type="submit">Promijenite lozinku</button>
    </form>
  )
}