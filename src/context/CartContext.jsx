import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const PORT = import.meta.env.VITE_PORT;
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (Object.keys(cart).length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const cartIds = Object.keys(cart).map(id => parseInt(id, 10)).reverse();
    if (cartIds.length > 0) {
      fetchCartProducts(cartIds)
        .then(products => setCartProducts(products))
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } else {
      setCartProducts([]);
      setLoading(false);
    }
  }, [cart]);

  const fetchCartProducts = async (cartIds) => {
    const response = await fetch(`${BASE_URL}:${PORT}/api/cart/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: cartIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  };

  const calculateTotalPrice = () => {
    const total = cartProducts.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + (product.cijena * quantity);
    }, 0).toFixed(2);
    return total;
  };

  const handleAddToCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (!newCart[productId]) {
        newCart[productId] = 1;
      }
      return newCart;
    });
  };

  const handleIncrement = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      newCart[productId]++;
      return newCart;
    });
  };

  const handleDecrement = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const handleInputChange = (productId, value) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      const newValue = parseInt(value, 10);
      if (newValue > 0) {
        newCart[productId] = newValue;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartProducts,
      loading,
      handleAddToCart,
      handleIncrement,
      handleDecrement,
      handleInputChange,
      handleRemoveFromCart,
      handleClearCart,
      calculateTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
