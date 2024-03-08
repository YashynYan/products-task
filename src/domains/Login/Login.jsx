import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from "@mui/material";
import "./Login.less";
import { useAuth } from "../../providers";

export const Login = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const { authenticate } = useAuth();

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.login && !formData.password) {
      return;
    }

    authenticate(formData.login);
  };
  return (
    <Container maxWidth="sm" className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login</h1>
        <FormControl fullWidth>
          <InputLabel htmlFor="login-input">Login</InputLabel>
          <Input
            onChange={handleFormChange}
            value={formData.login}
            type="text"
            name="login"
            id="login-input"
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <Input
            onChange={handleFormChange}
            value={formData.password}
            type="password"
            name="password"
            id="password-input"
          />
        </FormControl>
        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
};
