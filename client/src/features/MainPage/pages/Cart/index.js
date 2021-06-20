import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

function Cart() {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [totalPrice,setTotalPrice] = useState(0);

  if (cart.length === 0)
    return (
      <NoItemCart>
        <h1>CART EMPTY</h1>
        <Link to="/">
          <p>Back</p>
        </Link>
      </NoItemCart>
    );

  return (
    <CartContainer>
      {cart.map((product) => (
        <DetailContainer>
          <img src={product.images.url} alt="" />
          <DetailBox>
            <BoxRow>
              <h2>{product.title}</h2>
            </BoxRow>
            <span>${product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <MountQuantity>
              <button> - </button>
              <span>{product.quantity}</span>
              <button> +</button>
            </MountQuantity>
            <DeleteProduct>
              <CloseIcon />
            </DeleteProduct>
          </DetailBox>
        </DetailContainer>
      ))}
      <TotalMoney>
        <h3>Total: $ {totalPrice}</h3>
        <Link to="#!">PayMent</Link>
      </TotalMoney>
    </CartContainer>
  );
}

const NoItemCart = styled.div`
  display: flex;
  flex-direction: column;
  margin: 200px 0;
  > h1 {
    align-items: center;
    margin: 0 auto;
    color: red;
  }
  a {
    height: 30px;
    width: 50px;
    align-items: center;
    margin: 30px auto;
    border: 1px solid rgb(3, 165, 206);
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    > p {
      align-items: center;
      margin: 0 auto;
    }
    :hover {
      background-color: #44bef2;
      color: white;
      border: 1px solid #111;
    }
  }
`;

const CartContainer = styled.div``;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  font-size: 150%;
  position: relative;
  border: 1px solid #999;
  border-radius: 5px;
  margin-bottom: 5px;
  > img {
    max-width: 400px;
    width: 100%;
    margin: 20px;
    height: 450px;
    object-fit: cover;
    display: block;
    border: 1px solid #999;
    border-radius: 5px;
  }
`;

const DetailBox = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 5px 20px;
  > span {
    text-transform: uppercase;
    color: red;
    letter-spacing: 2px;
    font-weight: 2rem;
  }
  > p {
    line-height: 1.5;
    margin: 10px 0;
    opacity: 0.8;
  }
`;

const BoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > h2 {
    text-transform: uppercase;
    color: blueviolet;
    letter-spacing: 2px;
    font-weight: 2rem;
  }
  > h6 {
    text-transform: uppercase;
    color: black;
    letter-spacing: 2px;
    font-weight: 2rem;
  }
`;

const MountQuantity = styled.div`
  > span {
    color: crimson;
    padding: 0 20px;
  }
  button {
    width: 40px;
    height: 40px;
    border: 1px solid #777;
    font-size: 25px;
    align-items: center;
  }
`;

const DeleteProduct = styled.div`
  > .MuiSvgIcon-root {
      font-size: 30px;
    position: absolute;
    top: 0;
    right: 5px;
    color: red;
    cursor: pointer;
    font-weight: 900;
  }
`;

const TotalMoney = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    >h3{
        color: crimson;

    }
`;

export default Cart;
