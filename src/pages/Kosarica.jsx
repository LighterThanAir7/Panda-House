import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import {Helmet} from "react-helmet";

export default function Kosarica () {
  const { cart, cartProducts, loading, handleIncrement, handleDecrement, handleInputChange, handleRemoveFromCart, calculateTotalPrice } = useContext(CartContext);

  return (
    <>
      <Helmet>
        <title>Košarica</title>
      </Helmet>
      <Header />
      <Banner title="Pregled košarice" />

      <section className="container mx-auto py-40">
        {loading ? (
          <Loader />
        ) : cartProducts.length > 0 ? (
          <div className="racun">
            {cartProducts.map(product => (
              <div key={product.id} className="racun__item">
                <div className="racun__artikl">
                  <p className="racun__artikl-content">{product.naziv}</p>
                </div>
                <div className="racun__amount">
                  <div className="flex">
                    <button className="btn btn--small add-to-cart__change-amount"
                            onClick={() => handleDecrement(product.id)}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input className="add-to-cart__number" type="text" value={cart[product.id]}
                           onChange={(e) => handleInputChange(product.id, e.target.value)} />
                    <button className="btn btn--small add-to-cart__change-amount"
                            onClick={() => handleIncrement(product.id)}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="racun__remove-item">
                  <i className="racun__remove-item-content fa-solid fa-trash"
                     onClick={() => handleRemoveFromCart(product.id)}></i>
                </div>
                <div className="racun__price">
                  <p>{(product.cijena * cart[product.id]).toFixed(2)} €</p>
                </div>
              </div>
            ))}

            <div className="racun__ukupno">
              <Link to="/jelovnik" className="btn flex align-items-center">
                Dodaj još proizvoda<i className="fa-solid fa-cart-shopping ml-8"></i>
              </Link>
              <div className="flex gap-20">
                <Link to={{
                  pathname: "/placanje",
                  state: { totalPrice: calculateTotalPrice() }
                }} className="btn btn--tertiary flex align-items-center">
                  Idi na plaćanje
                  <i className="ml-8 fa-solid fa-money-check-dollar"></i>
                </Link>
                <p className="btn btn--secondary">Ukupno: <span>{calculateTotalPrice()} €</span></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h2>Košarica je trenutno prazna</h2>
            <Link to="/jelovnik" className="btn btn--secondary">
              Dodaj proizvode<i className="fa-solid fa-cart-shopping ml-8"></i>
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
