import React from "react";
import { useProduct } from "../../../providers";
import { Container, Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./ProductDetails.less";
import { Link, useLocation } from "react-router-dom";

export const ProductDetails = () => {
  const { isLoading, data } = useProduct();
  const { state } = useLocation();

  return isLoading ? (
    <Skeleton height={500} />
  ) : (
    <Container>
      <div>
        <Link to={`/products?page=${state?.currentPage || 1}`}>
          <ArrowBackIcon />
        </Link>
      </div>
      <div className="product-container">
        <div className="image-block">
          <img src={data.image} width={400} height={400} alt={data.title} />
          <span>{data.category}</span>
        </div>
        <div className="info-block">
          <h3>{data.title}</h3>
          <div>
            Rating: <span className="rating">{data.rating.rate}</span> (
            {data.rating.count})
          </div>
          <div>{data.description}</div>
        </div>
      </div>
    </Container>
  );
};
