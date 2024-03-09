import React from "react";
import { useProducts } from "../../../providers/ProductsProvider/ProductsProvider";
import {
  Pagination,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./ProductsTable.less";
import { Link } from "react-router-dom";

export const ProductsTable = () => {
  const { data, isLoading, setPage, totalPages, currentPage } = useProducts();

  const onPageChange = (e, pageNum) => {
    setPage(pageNum);
  };

  const renderProductsTable = () => {
    return (
      <TableContainer className="products-table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Link to={`/products/${row.id}`} state={{ currentPage }}>
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell>{row.price}$</TableCell>
                <TableCell>
                  <img
                    loading="lazy"
                    src={row.image}
                    alt={`${row.name}`}
                    width={100}
                    height={100}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return isLoading ? (
    <Skeleton height={"500px"} width={"100%"} />
  ) : (
    <>
      {renderProductsTable()}
      <Pagination
        onChange={onPageChange}
        page={currentPage}
        className="pagination"
        count={totalPages}
        shape="rounded"
      />
    </>
  );
};
