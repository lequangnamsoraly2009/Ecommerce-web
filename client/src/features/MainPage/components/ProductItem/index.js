import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <ProductItemContainer>
      <img src={product.images.url} alt="Aloha ahihi" />
      <ProductItemBox>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </ProductItemBox>
      <ProductItemButton>
        <ButtonBuy>
          <Link to="#!">Buy</Link>
        </ButtonBuy>
        <ButtonView>
          <Link to={`/detail/${product._id}`}>View</Link>
        </ButtonView>
      </ProductItemButton>
    </ProductItemContainer>
  );
}

const ProductItemContainer = styled.div`
  max-width: 300px;
  overflow: hidden;
  height: 500px;
  padding: 15px;
  border: 1px solid #999;
  border-radius: 5px;   
  box-shadow: 0 2px 15px rgba(0,0,0,0.2);
  margin: 10px 0;
  position: relative;
  > img {
    width: 100%;
    height: 300px;
    display: block;
    object-fit: cover;
  }
`;

const ProductItemBox = styled.div`
  > h2 {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-transform: capitalize;
    cursor: pointer;
    color: #333;
  }
  > span {
    color: crimson;
  }
  > p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 70px;
    overflow: hidden;
    color: #323232;
  }
`;

const ProductItemButton = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const ButtonBuy = styled.button`
  background: #555;
  margin-right: 5px;
  width: 100px;
  height: 30px;
  > a {
    width: 50%;
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 6px;
  }
`;

const ButtonView = styled.button`
  width: 100px;
  height: 30px;
  > a {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    letter-spacing: 2px;
    padding: 6px;
  }
  background: teal;
  margin-left: 5px;
`;

export default ProductItem;
