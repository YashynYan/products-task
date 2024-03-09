import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_AUTH_DATA = {
  login: null,
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

  useEffect(() => {
    if (!authData.login) {
      localStorage.removeItem("user");
    } else {
      localStorage.setItem("user", authData.login);
    }
  }, [authData.login]);

  const authenticate = (login) => {
    setAuthData({ login });
  };

  const logOut = () => {
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
