import React from "react";
import { useProduct } from "../../../providers";
import { Container, Skeleton } from "@mui/material";
import "./ProductDetails.less";

export const ProductDetails = () => {
  const { isLoading, data } = useProduct();
  console.log(data);
  return isLoading ? (
    <Skeleton height={500} />
  ) : (
    <Container>
      <div className="prooduct-container">
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
