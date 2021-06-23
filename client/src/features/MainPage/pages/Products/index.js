import styled from "styled-components";
import ProductItem from "../../components/ProductItem";
import Loading from "../../../../components/Loading";
import { useContext, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    };
    getProducts();
  }, [setProducts]);

  return (
    <>
      <ProductsContainer>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
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
