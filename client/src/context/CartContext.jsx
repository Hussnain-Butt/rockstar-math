import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Cart Context
const CartContext = createContext();

// ✅ Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage when the page loads (With Error Handling)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      setCart([]); // Ensure fallback to empty cart
    }
  }, []);

  // ✅ Save cart to localStorage only when the cart state changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // ✅ Function to add item to cart (Prevents Duplicates)
 const addToCart = (service) => {
  setCart((prevCart) => {
    const exists = prevCart.some((item) => item.id === service.id);
    if (exists) {
      console.warn(`Item already exists in the cart: ${service.name}`);
      return prevCart;
    }

    // Ensure price exists before adding
    if (!service.default_price || !service.default_price.unit_amount) {
      console.error("Service price or currency missing!", service);
      return prevCart;
    }

    return [
      ...prevCart,
      {
        ...service,
        price: (service.default_price.unit_amount / 100).toFixed(2), // Convert cents to dollars
        currency: service.default_price.currency.toUpperCase(),
      },
    ];
  });
};


    // ✅ Store updated cart in localStorage
    const updatedCart = [...prevCart, newItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    return updatedCart;
  });
};


  // ✅ Function to remove item from cart
  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== serviceId));
  };

  // ✅ Function to clear the cart (Optional)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook to Use Cart Context
export const useCart = () => useContext(CartContext);
