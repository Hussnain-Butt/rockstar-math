import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Cart Context
const CartContext = createContext();

// ✅ Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage when the page loads (With Error Handling)
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCart(storedCart);
    } catch (error) {
      console.error("❌ Failed to load cart from localStorage:", error);
      setCart([]); // Ensure fallback to empty cart
    }
  }, []);

  // ✅ Save cart to localStorage only when the cart state changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch (error) {
      console.error("❌ Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // ✅ Function to add item to cart (Prevents Duplicates & Ensures Pricing)
  const addToCart = (service) => {
    setCart((prevCart) => {
      // ✅ Check if item already exists in cart
      const exists = prevCart.some((item) => item.id === service.id);
      if (exists) {
        console.warn(`⚠️ Item already exists in the cart: ${service.name}`);
        return prevCart;
      }

      // ✅ Ensure price exists before adding
      if (!service.default_price || !service.default_price.unit_amount) {
        console.error("❌ Cannot add plan without a valid price!", service);
        alert("This plan cannot be added because it has no price set.");
        return prevCart; // Don't add item if price is missing
      }

      // ✅ Convert price from cents to dollars
      const newItem = {
        ...service,
        price: (service.default_price.unit_amount / 100).toFixed(2),
        currency: service.default_price.currency.toUpperCase(),
      };

      // ✅ Update cart state
      const updatedCart = [...prevCart, newItem];

      // ✅ Store updated cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // ✅ Function to remove item from cart
  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== serviceId));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart.filter((item) => item.id !== serviceId))
    );
  };

  // ✅ Function to clear the cart (Optional)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cartItems"); // ✅ Remove cart from localStorage when cleared
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook to Use Cart Context
export const useCart = () => useContext(CartContext);
