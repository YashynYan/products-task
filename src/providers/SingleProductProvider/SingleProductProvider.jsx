import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DEFAULT_PRODUCTS_DATA = {
  data: null,
  isLoading: true,
  errors: null,
};

export const SingleProductContext = createContext({
  ...DEFAULT_PRODUCTS_DATA,
});

export const SingleProductProvider = ({ children }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState(DEFAULT_PRODUCTS_DATA);
  const loginURL = `${process.env.REACT_APP_API_ENDPOINT}/products/${id}`;

  useEffect(() => {
    if (productData.isLoading) {
      fetch(loginURL, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          setProductData({
            data: data,
            error: null,
            isLoading: false,
          });
        })
        .catch((error) => {
          setProductData({ data: null, error, isLoading: false });
        });
    }
  }, [loginURL, productData.isLoading]);

  const value = {
    ...productData,
  };

  return (
    <SingleProductContext.Provider value={value}>
      {children}
    </SingleProductContext.Provider>
  );
};

export const useProduct = () => useContext(SingleProductContext);
