import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ product ,deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  const scrollTop = () =>{
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  return (
    <ProductItemButton>
      {isAdmin ? (
        <>
          <ButtonBuy>
            <Link to="#!" onClick={()=>deleteProduct(product._id,product.images.public_id)}>Delelte</Link>
          </ButtonBuy>
          <ButtonView>
            <Link onClick={()=> scrollTop()} to={`/edit_product/${product._id}`}>Edit</Link>
          </ButtonView>
        </>
      ) : (
        <>
          <ButtonBuy>
            <Link to="#!" onClick={()=> addCart(product)}>Buy</Link>
          </ButtonBuy>
          <ButtonView>
            <Link onClick={()=> scrollTop()} to={`/detail/${product._id}`}>View</Link>
          </ButtonView>
        </>
      )}
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
  :focus{
    scroll-behavior: smooth;
  }
`;

export default BtnRender;
