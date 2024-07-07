import {useCart} from "../context/CartContext.jsx";

export default function ListMenuItems ({ products }) {
  const { cart, handleAddToCart, handleIncrement, handleDecrement, handleInputChange } = useCart();

  return (
    <div className="menu__items row">
      {products.map((product) => (
        <div key={product.id} className="col-xl-4">
          <div className={`menu__item ${cart[product.id] ? 'menu__item--active' : ''}`}>
            <div className="menu__item-head">
              <h5>{product.naziv}</h5>
              {product.litraza && <span>{product.litraza}</span>}
            </div>
            <div className="menu__item-desc">
              {product.opis && <p>{product.opis}</p>}
            </div>
            <div className="menu__item-order">
              <a className="menu__item-price btn btn-small btn--secondary">{product.cijena} €</a>
              {cart[product.id] ? (
                <div className="flex">
                  <button className="btn btn--small add-to-cart__change-amount"
                          onClick={() => handleDecrement(product.id)}><i className="fa-solid fa-minus"></i></button>
                  <input className="add-to-cart__number" type="text" value={cart[product.id]}
                         onChange={(e) => handleInputChange(product.id, e.target.value)}/>
                  <button className="btn btn--small add-to-cart__change-amount"
                          onClick={() => handleIncrement(product.id)}><i className="fa-solid fa-plus"></i></button>
                </div>
              ) : (
                <button className="btn btn--small add-to-cart" onClick={() => handleAddToCart(product.id)}>Dodaj u
                  košaricu <i className="fa-solid fa-cart-shopping"></i></button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}