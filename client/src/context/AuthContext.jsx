import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);
  const [updateCounter, setUpdateCounter] = useState(0); // Debugging state

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setUpdateCounter((prev) => prev + 1); // Force re-render
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setUpdateCounter((prev) => prev + 1); // Force re-render
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ users, login, logout, updateCounter }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
