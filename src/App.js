import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Home, Product } from "./domains";
import { AuthProvider } from "./providers";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact index element={<Login />} />
        <Route exact path="products" element={<Home />} />
        <Route exact path="products/:id" element={<Product />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
