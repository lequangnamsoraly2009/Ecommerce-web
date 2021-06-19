import React from "react";
import styled from "styled-components";

import BtnRender from "../BtnRender";

function ProductItem({ product }) {
  return (
    <ProductItemContainer>
      <img src={product.images.url} alt="Aloha ahihi" />
      <ProductItemBox>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </ProductItemBox>
      <BtnRender product={product} />
      
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



export default ProductItem;
