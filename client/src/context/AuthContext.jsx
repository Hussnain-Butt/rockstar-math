import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // Debugging state

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token"); // Ensure token exists

    console.log("Saved User in Local Storage:", savedUser); // Debugging
    console.log("Saved Token in Local Storage:", savedToken); // Debugging

    if (savedUser && savedUser !== "null" && savedToken) { // Ensure both user & token exist
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null); // If no valid user/token, reset state
    }
  }, []);

  const login = (userData, token) => {
    console.log("Logging in user:", userData, token); // Debugging output

    // Store both user and token
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser(userData);
    setUpdateCounter((prev) => prev + 1); // Force re-render
  };

  const logout = () => {
    console.log("Logging out user..."); // Debugging output

    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Ensure token is also removed
    setUser(null);
    setUpdateCounter((prev) => prev + 1); // Force re-render

    console.log("User after logout:", users); // Debugging output
  };

  return (
    <AuthContext.Provider value={{ users, login, logout, updateCounter }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
