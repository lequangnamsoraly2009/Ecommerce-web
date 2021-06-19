import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import styled from "styled-components";
import ProductItem from "../../components/ProductItem";

function Products() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return <ProductsContainer>
      {
          products.map(product => {
              return <ProductItem key={product._id } />
          })
      }
  </ProductsContainer>;
}

const ProductsContainer = styled.div``;

export default Products;
