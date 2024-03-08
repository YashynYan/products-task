import { Button, Container } from "@mui/material";
import React from "react";
import "./RootLayout.less";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers";

export const RootLayout = ({ children }) => {
  const { logOut, authData } = useAuth();
  const isUserLogged = Boolean(authData.login);

  return (
    <>
      <header className="header">
        <nav>
          <Link className="home-link" to="/products" relative="path">
            Home
          </Link>
        </nav>
        {isUserLogged ? (
          <Button onClick={logOut}>Log Out</Button>
        ) : (
          <Link to="/">
            <Button>Login</Button>
          </Link>
        )}
      </header>
      <Container className="root-layout-container">{children}</Container>
    </>
  );
};
