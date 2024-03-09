import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_AUTH_DATA = {
  login: localStorage.getItem("user"),
};

const DEFAULT_REDIRECT_URL = "/products";

export const AuthContext = createContext({
  authenticate: () => {},
  logOut: () => {},
  authData: DEFAULT_AUTH_DATA,
});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(DEFAULT_AUTH_DATA);
  const navigate = useNavigate();
  const location = useLocation();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    if (authData.login && location.pathname === "/") {
      const redirectUrl = searchParams.get("redirect") || DEFAULT_REDIRECT_URL;
      navigate(redirectUrl);
    }
  }, [authData.login, location.pathname, navigate, searchParams]);

  const authenticate = (login) => {
    setAuthData({ login });
    localStorage.setItem("user", login);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setAuthData(DEFAULT_AUTH_DATA);
  };

  const value = {
    authenticate,
    logOut,
    authData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
