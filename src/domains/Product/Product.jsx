import React from "react";
import { SingleProductProvider } from "../../providers";
import { RootLayout } from "../../layouts";
import { ProductDetails } from "./ProductDetails";
import { ProtectedRoute } from "../../layouts/ProtectedRoute/ProtectedRoute";

export const Product = () => {
  return (
    <RootLayout>
      <ProtectedRoute>
        <SingleProductProvider>
          <ProductDetails />
        </SingleProductProvider>
      </ProtectedRoute>
    </RootLayout>
  );
};
