import styled from "styled-components";
import ProductItem from "../../components/ProductItem";
import Loading from "../../../../components/Loading";
import { useContext } from "react";
import {GlobalState} from "../../../../GlobalState";

function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <>
      <ProductsContainer>
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} isAdmin={isAdmin} />;
        })}
      </ProductsContainer>
      {products.length === 0 && <Loading />}
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
