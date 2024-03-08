import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PRODUCTS_DATA = {
  data: null,
  isLoading: true,
  errors: null,
  currentPage: 1,
  totalPages: 0,
  setPage: () => {},
};

export const ProductsContext = createContext({
  ...DEFAULT_PRODUCTS_DATA,
});

const ROWS_PER_PAGE = 5;

export const ProductsProvider = ({ children }) => {
  const loginURL = `${process.env.REACT_APP_API_ENDPOINT}/products`;
  const [productsData, setProductsData] = useState(DEFAULT_PRODUCTS_DATA);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(
    (productsData?.data || []).length / ROWS_PER_PAGE
  );

  const setPage = (pageNum) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: pageNum,
    }));
  };

  useEffect(() => {
    if (productsData.isLoading) {
      fetch(loginURL, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => {
          setProductsData({
            data: data,
            error: null,
            isLoading: false,
          });
        })
        .catch((error) => {
          setProductsData({ data: null, error, isLoading: false });
        });
    }
  }, [currentPage, loginURL, productsData.isLoading]);

  const value = {
    ...productsData,
    data: (productsData.data || []).slice(
      ROWS_PER_PAGE * (currentPage - 1),
      ROWS_PER_PAGE * currentPage
    ),
    currentPage,
    totalPages,
    setPage,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
