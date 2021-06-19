import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import styled from "styled-components";
import ProductItem from "../../components/ProductItem";
import Loading from "../../../../components/Loading";
import { refreshToken } from "../../../../app/authSlice";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      dispatch(refreshToken());
    }
  }, []);

  return (
    <>
    <ProductsContainer>
      {products.map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}
    </ProductsContainer>
    {products.length === 0  && <Loading />}
    </>
  );
}

const ProductsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin: 20px 0;
`;

export default Products;
