import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import {UserContext} from "../context/UserContext.jsx";
import {useContext, useState} from "react";
import Loader from "../components/Loader.jsx";
import InputField from "../components/InputField.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";

// Pristupanje varijablama iz .env datoteke
const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Profil () {
  const { user, setUser, loading } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    street: user.street,
    house_number: user.house_number,
    city: user.city,
    postal_code: user.postal_code,
    username: user.username,
    email: user.email,
    card_first_name: user.card_first_name,
    card_last_name: user.card_last_name,
    card_number: user.card_number,
    card_cvv: user.card_cvv,
    card_exp_month: user.card_exp_month,
    card_exp_year: user.card_exp_year,
    orders_completed: user.orders_completed,
  });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <Header />
        <Banner title="Moj profil" />
        <section className="profile | container mx-auto my-40">
          <h2>Podaci o korisniku nisu dostupni.</h2>
        </section>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <Banner title="Učitavanje profila..." />
        <section className="profile | container mx-auto my-40">
          <Loader />
        </section>
      </>
    );
  }

  const isFormDataEqualToUser = (formData, user) => {
    return Object.keys(formData).every(key => formData[key] === user[key]);
  };

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

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      street: user.street,
      house_number: user.house_number,
      city: user.city,
      postal_code: user.postal_code,
      username: user.username,
      email: user.email,
    });
    setErrors({});
    setEditMode(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'Ime je obavezno';
    if (!formData.last_name) newErrors.last_name = 'Prezime je obavezno';
    if (!formData.street) newErrors.street = 'Ulica je obavezna';
    if (!formData.house_number) newErrors.house_number = 'Kućni broj je obavezan';
    if (!formData.city) newErrors.city = 'Grad je obavezan';
    if (!formData.postal_code) newErrors.postal_code = 'Poštanski broj je obavezan';
    if (!formData.username) newErrors.username = 'Korisničko ime je obavezno';
    if (!formData.email) newErrors.email = 'Email je obavezan';
    return newErrors;
  };

  const handleUpdate = async () => {
    if (isFormDataEqualToUser(formData, user)) {
      setEditMode(false);
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsUpdating(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BASE_URL}:${PORT}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setEditMode(false);
        navigate('/poruka', { state: { tip: 'pozitivna', tekst: 'Vaši podaci su uspješno ažurirani', backUrl: '/profil' } });
      } else {
        navigate('/poruka', { state: { tip: 'negativna', tekst: data.error, backUrl: '/profil' } });
      }
    } catch (error) {
      navigate('/poruka', { state: { tip: 'negativna', tekst: 'Došlo je do pogreške prilikom ažuriranja podataka profila', backUrl: '/profil' } });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Profil</title>
      </Helmet>
      <Header />
      <Banner title="Moj profil" />

      <section className="profile | container mx-auto my-40">
        <div className="profile__section">
          <div className="profile__section-title flex justify-content-between mb-20">
            <h2 className="mb-0">Opći podaci</h2>
            {editMode ? (
              <div className="flex gap-20">
                <button className="btn btn--flex btn--secondary" onClick={handleUpdate} disabled={isUpdating}>
                  {isUpdating ? 'Ažuriranje...' :
                    <>
                      Spremi promjene
                      <i className="fs-500 fa-solid fa-check"></i>
                    </>
                  }
                </button>
                <button className="btn btn--flex px-20" onClick={handleCancel}>
                  Odustani
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ) : (
              <button className="btn btn--flex btn--secondary" onClick={() => setEditMode(true)}>
                Promijeni podatke
                <i className="fa-solid fa-pen"></i>
              </button>
            )}
          </div>
          <div className="profile__row">
            <InputField
              label="Ime"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.first_name}
            />
            <InputField
              label="Prezime"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.last_name}
            />
            {errors.update && <p className="error-message">{errors.update}</p>}
          </div>
          <div className="profile__row">
            <InputField
              label="Korisničko ime"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.username}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.email}
            />
          </div>
          {errors.update && <p className="error-message">{errors.update}</p>}
        </div>

        <div className="profile__section">
          <h2 className="profile__section-title">Adresa</h2>
          <div className="profile__row">
            <InputField
              label="Ulica"
              name="street"
              value={formData.street}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.street}
            />
            <InputField
              label="Kućni broj"
              name="house_number"
              value={formData.house_number}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.house_number}
            />
          </div>
          <div className="profile__row">
            <InputField
              label="Grad"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.city}
            />
            <InputField
              label="Poštanski broj"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.postal_code}
            />
          </div>
        </div>

        <div className="profile__section">
          <h2 className="profile__section-title">Podaci o kartici</h2>
          <div className="profile__row">
            <InputField
              label="Ime vlasnika"
              name="card_first_name"
              value={formData.card_first_name}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_first_name}
            />
            <InputField
              label="Prezime vlasnika"
              name="card_last_name"
              value={formData.card_last_name}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_last_name}
            />
          </div>
          <div className="profile__row">
            <InputField
              label="Broj kartice"
              name="card_number"
              value={formData.card_number}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_number}
            />
            <InputField
              label="CVV"
              name="card_cvv"
              value={formData.card_cvv}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_cvv}
            />
          </div>
          <div className="profile__row">
            <InputField
              label="Mjesec isteka"
              name="card_exp_month"
              value={formData.card_exp_month}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_exp_month}
            />
            <InputField
              label="Godina isteka"
              name="card_exp_year"
              value={formData.card_exp_year}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.card_exp_year}
            />
          </div>
        </div>

        <div className="profile__section">
          <h2 className="profile__section-title">Lozinka</h2>
          <div className="flex align-flex-end gap-20">
            <InputField
              extraClasses="w-20"
              label="Lozinka"
              name="password"
              type="password"
              value="password"
              disabled
            />
            <Link to="/promijeni-lozinku" className="btn btn--secondary | mb-16">
              Promijeni lozinku
            </Link>
          </div>
        </div>
      </section>


    </>
  )
}