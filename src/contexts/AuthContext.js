import React, { useState, useContext, createContext } from "react";

// Define the initial context type
const AuthContextType = {
  user: "",
  signin: null,
  signout: null,
};

// Create the context
const AuthContext = createContext(AuthContextType);

// AuthProvider component
export function AuthProvider({ children }) {
  // State to hold the user information
  const [user, setUser] = useState("");

  // Function to sign in a user
  const signin = (newUser, callback) => {
    setUser(newUser);
    callback(); // Optional callback function
  };

  // Function to sign out a user
  const signout = (callback) => {
    setUser(""); // Clear the user state
    callback && callback(); // Optional callback function
  };
  // Value object for the context provider
  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
