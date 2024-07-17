import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialLoggedInState = sessionStorage.getItem('token') ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedInState);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
