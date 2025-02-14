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

  // ✅ Function to add item to cart (Fix for "Cannot add plan without price" error)
  const addToCart = (plan) => {
    setCart((prevCart) => {
      // ✅ Check if item already exists in cart
      const exists = prevCart.some((item) => item.id === plan.id);
      if (exists) {
        console.warn(`⚠️ Item already exists in the cart: ${plan.name}`);
        return prevCart;
      }

      // ✅ Ensure price exists before adding
      if (!plan.price || isNaN(Number(plan.price))) {
        console.error("❌ Cannot add plan without a valid price!", plan);
        alert("This plan cannot be added because it has no price set.");
        return prevCart; // Don't add item if price is missing
      }

      // ✅ Convert price to a fixed 2 decimal format
      const newItem = {
        ...plan,
        price: Number(plan.price).toFixed(2), // ✅ Ensure proper price format
        currency: plan.currency.toUpperCase(),
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
