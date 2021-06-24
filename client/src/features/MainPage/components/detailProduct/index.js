import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProductItem from "../ProductItem";
import {GlobalState} from '../../../../GlobalState';

function DetailProduct() {
  const [detailProduct, setDetailProduct] = useState([]);
  const param = useParams();
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [products] = state.productsAPI.products;
  // console.log(detailProduct);

  useEffect(() => {
    if (param.id) {
      products.forEach((product) => {
        if (product._id === param.id) {
          setDetailProduct(product);
        }
      });
    }
  }, [param.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      <DetailContainer>
        <img src={detailProduct.images.url} alt="" />
        <DetailBox>
          <BoxRow>
            <h2>{detailProduct.title}</h2>
            <h6>ID: {detailProduct.product_id}</h6>
          </BoxRow>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <BuyProduct>
            <Link to="/cart" onClick={()=> addCart(detailProduct)} >Buy Now</Link>
          </BuyProduct>
        </DetailBox>
      </DetailContainer>
      <Related>
        <h2>Related Products</h2>
        <RelatedProducts>
          {products.filter(product => product.price > detailProduct.price).slice(0,3).map((product) => {
            return (product.category === detailProduct.category && product.product_id !== detailProduct.product_id)? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </RelatedProducts>
      </Related>
    </>
  );
}

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 50px;
  font-size: 150%;

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

const BuyProduct = styled.button`
  > a {
    background: #333;
    color: white;
    margin-top: 10px;
    padding: 10px 25px;
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const Related = styled.div``;

const RelatedProducts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin: 20px 0;
`;

export default DetailProduct;
