import {useContext, useEffect, useState} from "react";
import { UserContext } from '../context/UserContext.jsx';
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext.jsx';

const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PlacanjeForm () {
  const [formData, setFormData] = useState({
    card_first_name: '',
    card_last_name: '',
    card_number: '',
    card_cvv: '',
    card_exp_month: '',
    card_exp_year: '',
    street: '',
    house_number: '',
    city: '',
    postal_code: '',
  });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { cart, cartProducts, calculateTotalPrice, handleClearCart } = useContext(CartContext);
  const [addressData, setAddressData] = useState(true);
  const [savePaymentData, setSavePaymentData] = useState(false);
  const [errors, setErrors] = useState({});
  const [discount, setDiscount] = useState(0);

  const totalPrice = parseFloat(calculateTotalPrice());
  const discountAmount = totalPrice * discount;
  const finalPrice = totalPrice - discountAmount;

  useEffect(() => {
    if (user) {
      const ordersCompleted = user.orders_completed;
      if (ordersCompleted === 0) {
        setDiscount(0.30); // 30% popusta
      } else if (ordersCompleted % 10 === 0) {
        setDiscount(0.15); // 15% popusta
      } else {
        setDiscount(0); // Nema popusta
      }
    } else {
      setDiscount(0); // Nema popusta
    }
  }, [user]);

  const [showForm, setShowForm] = useState(!!user);

  useEffect(() => {
    if (user && addressData) {
      setFormData(prevData => ({
        ...prevData,
        street: user.street || '',
        house_number: user.house_number || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
        card_first_name: user.card_first_name || '',
        card_last_name: user.card_last_name || '',
        card_number: user.card_number || '',
        card_cvv: user.card_cvv || '',
        card_exp_month: user.card_exp_month || '',
        card_exp_year: user.card_exp_year || '',
      }));
    } else if (!addressData) {
      setFormData(prevData => ({
        ...prevData,
        street: '',
        house_number: '',
        city: '',
        postal_code: '',
        card_first_name: '',
        card_last_name: '',
        card_number: '',
        card_cvv: '',
        card_exp_month: '',
        card_exp_year: '',
      }));
    }
  }, [user, addressData]);

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

  const handleAddressDataChange = (e) => {
    setAddressData(e.target.checked);
  };

  const handleCheckboxChange = (e) => {
    setSavePaymentData(e.target.checked);
  };

  const handleCardDataOnBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = {};

    switch (name) {
      case 'card_number':
        if (value.length !== 16) {
          newErrors.card_number = 'Broj kartice mora imati 16 znamenaka';
        }
        break;
      case 'card_cvv':
        if (value.length !== 3) {
          newErrors.card_cvv = 'CVV mora imati 3 znamenke';
        }
        break;
      case 'card_exp_month':
        if (value.length !== 2 || parseInt(value, 10) > 12 || parseInt(value, 10) < 1) {
          newErrors.card_exp_month = 'Mjesec mora imati 2 znamenke (01-12)';
        }
        break;
      case 'card_exp_year': {
        const currentYear = new Date().getFullYear() % 100; // Zadnje dvije znamenke trenutne godine
        if (value.length !== 2 || parseInt(value, 10) < currentYear) {
          newErrors.card_exp_year = `Godina mora imati 2 znamenke i ne može biti manja od ${currentYear}`;
        }
        break;
      }
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.card_first_name) newErrors.card_first_name = 'Ime je obavezno';
    if (!formData.card_last_name) newErrors.card_last_name = 'Prezime je obavezno';
    if (!formData.card_number) newErrors.card_number = 'Broj kartice je obavezan';
    if (!formData.card_cvv) newErrors.card_cvv = 'CVV je obavezan';
    if (!formData.card_exp_month) newErrors.card_exp_month = 'Mjesec je obavezan';
    if (!formData.card_exp_year) newErrors.card_exp_year = 'Godina je obavezna';
    if (!formData.street) newErrors.street = 'Ulica je obavezna';
    if (!formData.house_number) newErrors.house_number = 'Broj je obavezan';
    if (!formData.city) newErrors.city = 'Grad je obavezan';
    if (!formData.postal_code) newErrors.postal_code = 'Poštanski broj je obavezan';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cartItemsArray = cartProducts.map(product => {
      const quantity = cart[product.id] || 0;
      const unit_price = parseFloat(product.cijena);
      const total_price = (unit_price * quantity).toFixed(2);

      return {
        product_id: product.id,
        quantity: quantity,
        unit_price: unit_price,
        total_price: total_price
      };
    });

    try {
      const token = localStorage.getItem('token');
      const receiptdata = {
        user_id: user ? user.id : null,
        total_amount: totalPrice,
        discount_amount: totalPrice * discount,
        total_amount_with_discount: totalPrice - totalPrice * discount,
        delivery_street: formData.street,
        delivery_house_number: formData.house_number,
        delivery_city: formData.city,
        delivery_postal_code: formData.postal_code,
        cart_items: cartItemsArray
      }


      console.log("Receipt data to send:", receiptdata); // Debugging: Provjeri podatke koje šalješ

      const receiptResponse = await fetch(`${BASE_URL}:${PORT}/api/receipt/create`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( receiptdata ),
      });

      if (!receiptResponse.ok) {
        throw new Error('Failed to create receipt');
      }
      const receiptDataBack = await receiptResponse.json();
      console.log(receiptDataBack)

      if (savePaymentData && user) {
        const updateUserResponse = await fetch(`${BASE_URL}:${PORT}/api/users/update-profile`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            orders_completed: user.orders_completed + 1,
          }),
        });

        const updateUserData = await updateUserResponse.json();

        if (updateUserResponse.ok) {
          setUser(updateUserData.user);
        } else {
          console.error('Error updating user profile:', updateUserData.error);
        }
      }

      handleClearCart();
      navigate('/poruka', { state: { tip: 'pozitivna', tekst: 'Plaćenje je uspješno provedeno', backUrl: '/' } });

    } catch (error) {
      console.error('Error during payment process:', error);
      navigate('/poruka', { state: { tip: 'negativna', tekst: 'Došlo je do pogreške prilikom plaćanja', backUrl: '/placanje' } });
    }
  };

  return (
    <>
      {showForm ? (
        <>
          <form className="form | mt-64" onSubmit={handleSubmit}>
            <h4>Unesite podatke o kartici</h4>

            <div className="form__row">
              <label className="form__label | mb-16">Ime
                <input
                  className="form__input"
                  name="card_first_name"
                  type="text"
                  placeholder="Benjamin"
                  value={formData.card_first_name}
                  onChange={handleChange}/>
                {errors.card_first_name && <p className="error-message">{errors.card_first_name}</p>}
              </label>

              <label className="form__label | mb-16">Prezime
                <input
                  className="form__input"
                  name="card_last_name"
                  type="text"
                  placeholder="Babić"
                  value={formData.card_last_name}
                  onChange={handleChange}/>
                {errors.card_last_name && <p className="error-message">{errors.card_last_name}</p>}
              </label>
            </div>

            <div className="form__row">
              <label className="form__label | mb-16 w-80">Broj kartice
                <input
                  className="form__input form__input--wide-text"
                  name="card_number"
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={formData.card_number}
                  onChange={handleChange}
                  onBlur={handleCardDataOnBlur}
                />
                {errors.card_number && <p className="error-message">{errors.card_number}</p>}
              </label>
              <label className="form__label | mb-16 w-20">CVV
                <input
                  className="form__input"
                  name="card_cvv"
                  type="text"
                  placeholder="123"
                  value={formData.card_cvv}
                  onChange={handleChange}
                  onBlur={handleCardDataOnBlur}
                />
                {errors.card_cvv && <p className="error-message">{errors.card_cvv}</p>}
              </label>
            </div>

            <div className="form__row">
              <label className="form__label | mb-16">Mjesec isteka
                <input
                  className="form__input"
                  name="card_exp_month"
                  type="text"
                  placeholder="MM"
                  value={formData.card_exp_month}
                  onChange={handleChange}
                  onBlur={handleCardDataOnBlur}
                />
                {errors.card_exp_month && <p className="error-message">{errors.card_exp_month}</p>}
              </label>
              <label className="form__label | mb-16">Godina isteka
                <input
                  className="form__input"
                  name="card_exp_year"
                  type="text"
                  placeholder="GG"
                  value={formData.card_exp_year}
                  onChange={handleChange}
                  onBlur={handleCardDataOnBlur}
                />
                {errors.card_exp_year && <p className="error-message">{errors.card_exp_year}</p>}
              </label>
            </div>

            {user && (
              <>
                <label className="form__label form__label--regular form__label--custom-checkbox mb-12">
                  <input
                    className="form__checkbox"
                    name="remember-me"
                    type="checkbox"
                    checked={savePaymentData}
                    onChange={handleCheckboxChange}
                  />
                  <div className="custom-checkbox"></div>
                  Spremi moje podatke za buduća plaćanja
                </label>
                <p className="placanje__save-data">* Kartične podatke možete izmijeniti u postavkama računa</p>
              </>
            )}

            <h4>Adresa dostave</h4>

            <div className="form__row">
              <label className="form__label | mb-16 w-80">Ulica
                <input className="form__input" name="street" type="text" placeholder="Gradišćanska"
                       value={formData.street}
                       onChange={handleChange}/>
                {errors.street && <p className="error-message">{errors.street}</p>}
              </label>
              <label className="form__label | mb-16 w-20">Broj
                <input className="form__input" name="house_number" type="text" placeholder="14"
                       value={formData.house_number}
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
                <input className="form__input" name="postal_code" type="text" placeholder="10000"
                       value={formData.postal_code}
                       onChange={handleChange}/>
                {errors.postal_code && <p className="error-message">{errors.postal_code}</p>}
              </label>
            </div>

            {user && (
              <label className="form__label form__label--regular form__label--custom-checkbox | mb-16">
                <input
                  className="form__checkbox"
                  name="remember-me"
                  type="checkbox"
                  checked={addressData}
                  onChange={handleAddressDataChange}
                />
                <div className="custom-checkbox"></div>
                Povuci podatke sa mog profila
              </label>
            )}

            {discount > 0 ? (
              <div className="placanje__racun">
                <div className="flex justify-content-between">
                  <p>Cijena za platiti</p>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>

                <div className="placanje__popust clr-tertiary-500">
                  <p>Popust na prvu narudžbu</p>
                  <span>{(discount * 100).toFixed(0)} %</span>
                </div>

                <div className="placanje__popust">
                  <p>Iznos popusta</p>
                  <span className="clr-tertiary-500">- {(totalPrice * discount).toFixed(2)} €</span>
                </div>

                <div className="placanje__total">
                  <p>Ukupno: </p>
                  <span>{finalPrice} €</span>
                </div>
              </div>
            ) : (
              <div className="placanje__total placanje__total--border-top">
                <p>Ukupno: </p>
                <span>{finalPrice} €</span>
              </div>
            )}

            <button className="btn btn--tertiary btn--w-full" type="submit">Plati</button>

          </form>
        </>
      ) : (
        <>
          <h2 className="mt-20 mb-40">Odaberite opciju</h2>
          <div className="placanje__options">
            <Link to="/prijava" state={{backUrl: "/placanje"}} className="btn btn--secondary btn--w-full">
              Prijavite se
            </Link>
            <button className="btn btn--w-full mb-16" onClick={() => setShowForm(true)}>Nastavi kao gost</button>

            <p className="placanje__discount">* Prijavi se i ostvari <span
              className="font-bold clr-tertiary-500">30%</span> popusta na svoju prvu narudžbu, a svaku
              desetu <span className="font-bold">15%</span> popusta</p>
          </div>
        </>
      )}
    </>
  );
}
