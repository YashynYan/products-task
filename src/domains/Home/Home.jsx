import React from "react";
import { RootLayout } from "../../layouts";
import { ProductsProvider } from "../../providers";
import { ProductsTable } from "./ProductsTable";

export const Home = () => {
  return (
    <RootLayout>
      <ProductsProvider>
        <ProductsTable />
      </ProductsProvider>
    </RootLayout>
  );
};
