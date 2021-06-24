import styled from "styled-components";
import ProductItem from "../../components/ProductItem";
import Loading from "../../../../components/Loading";
import { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";

function Products() {
  const state = useContext(GlobalState);
  const [products,setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const  [isCheck ,setIsCheck] = useState(false);


  const deleteProduct = async(id,public_id) =>{
    try {
      setLoading(true);
      const deleteImage = axios.post('/api/destroy',{public_id},{
        headers: { Authorization: token },
      })

      const deleteP = axios.delete(`/api/products/${id}`,{
        headers: { Authorization: token },
      })

      await deleteImage;
      await deleteP;
      setCallback(!callback);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  }

  const handleCheck = (id) =>{
    products.forEach(product =>{
      if(product._id ===id) {
        product.checked = !product.checked;
      }
    })
    setProducts([...products]);
  }

  const checkAll = () =>{
    products.forEach(product => {
      product.checked = !isCheck;
    })
    setIsCheck(!isCheck)
    setProducts([...products]);
  }

  const deleteAll = () =>{
    products.forEach(product =>{
      if(product.checked){
        deleteProduct(product._id,product.images.public_id);
      }
    })
  }



  if(loading) return (<LoadingDelete><Loading /></LoadingDelete>)


  return (
    <>
    {
      isAdmin && (
        <DeleteAll>
          <span>Select All</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll}/>
          <button onClick={()=>deleteAll()} >Delete All</button>
        </DeleteAll>
      )
    }
      <ProductsContainer>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              handleCheck = {handleCheck}
              deleteProduct={deleteProduct}
            />
          );
        })}
      </ProductsContainer>
      {products.length === 0 && <Loading />}
    </>
  );
}

const DeleteAll  = styled.div`
  text-align: right; 
  margin: 20px;
  >input{
    height: 25px;
    width: 25px;
    transform: translateY(5px);
    margin: 0 15px; 
  }
  >span{
    text-transform: uppercase;
    color: rgba(6,165,206,1);
    letter-spacing: 1.3px;
  }
  >button{
    border-radius: 5px;
    border: 1px solid crimson;
    padding: 10px 25px 7px;
    color: crimson;
    text-transform: uppercase
  }
`;

const LoadingDelete = styled.div`

`;

const ProductsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin: 20px 0;
`;

export default Products;
