import React from "react";
import { useAuth } from "../../providers";
import { Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./ProtectedRoute.less";

export const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();
  const { pathname } = useLocation();
  const isUserLogged = Boolean(authData.login);

  return isUserLogged ? (
    children
  ) : (
    <Container>
      <div className="placeholder-container">
        <h3 className="placeholder-title">
          You must be logged in to see this page
        </h3>
        <Link to={`/?redirect=${pathname}`}>Log In</Link>
      </div>
    </Container>
  );
};
