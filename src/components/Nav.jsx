import { useContext, useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.jsx';
import { CartContext } from '../context/CartContext.jsx';

export default function Nav () {
  const { user, setUser  } = useContext(UserContext);
  const { cart, handleClearCart } = useContext(CartContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const totalItemsInCart = Object.values(cart).reduce((acc, count) => acc + count, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setUser(null);
    handleClearCart();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // console.log("Current user in Nav:", user);

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to="/jelovnik" className="nav__link">Jelovnik</Link>
        </li>
        <li className="nav__item">
          <Link to="/o-nama" className="nav__link">O nama</Link>
        </li>
        <li className="nav__item">
          <Link to="/recenzije" className="nav__link">Recenzije</Link>
        </li>
        <li className="nav__item">
          <Link to="/kontakt" className="nav__link">Kontakt</Link>
        </li>
      </ul>

      <div className="nav__separator"></div>


      {user ? (
        <div className="nav__user" onClick={() => setDropdownOpen(!isDropdownOpen)} ref={dropdownRef}>
          <p className="nav__user-text">
            <i className="fa-solid fa-user | mr-8"></i>
            {user.first_name}
            <i className="fa-solid fa-caret-down | ml-8"></i>
          </p>
          <div className={`nav__dropdown ${isDropdownOpen ? ' nav__dropdown--open' : ''}`}>
            <ul className="nav__dropdown-list">
              <Link to="/profil" className="nav__dropdown-item">
                Moj profil
              </Link>
              <button className="nav__dropdown-btn btn btn--secondary" onClick={handleLogout}>
                Odjava <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </ul>
          </div>
        </div>
      ) : (
        <Link to="/prijava" className="nav__link">
          <div className="nav__user">
            <i className="fa-solid fa-user | mr-8"></i>
            Log in
          </div>
        </Link>
      )}

      <Link to="/kosarica" className="nav__cart">
        <i className="fa-solid fa-cart-shopping"></i>
        {totalItemsInCart > 0 && <span>{totalItemsInCart}</span>}
      </Link>
    </nav>
  )
}