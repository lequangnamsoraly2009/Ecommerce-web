import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function BtnRender({ product }) {
  return (
    <ProductItemButton>
      <ButtonBuy>
        <Link to="#!">Buy</Link>
      </ButtonBuy>
      <ButtonView>
        <Link to={`/detail/${product._id}`}>View</Link>
      </ButtonView>
    </ProductItemButton>
  );
}

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

export default BtnRender;
