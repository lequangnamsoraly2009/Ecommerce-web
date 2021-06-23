import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../../GlobalState";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? "block" : 'none'
  }

  return (
    <CreateProductContainer>
      <UploadImage>
        <input type="file" name="file" id="file_up" />
        <ImageHere id="file_img" style={styleUpload}>
          <img
            src=""
            alt=""
          />
          <CloseIcon />
        </ImageHere>
      </UploadImage>
      <FormCreate>
        <FormCreateRow>
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows='5'
            
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="5"
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="category">Category</label>
          <select name="category" value={product.category}>
            <option value="">Please select a category</option>
            {categories.categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name.toUpperCase()}
              </option>
            ))}
          </select>
        </FormCreateRow>
        <button type="submit">Create Product</button>
      </FormCreate>
    </CreateProductContainer>
  );
}

const CreateProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  /* flex-direction: column; */
`;

const UploadImage = styled.div`
  max-width: 450px;
  height: 500px;
  width: 100%;
  border: 1px solid #ddd;
  padding: 15px;
  margin: 20px;
  position: relative;
  > input {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
    ::before {
      content: "+";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #fff;
      color: rgb(250, 200, 107);
      font-size: 17rem;
      text-align: center;
      cursor: pointer;
      margin: auto;
    }
  }
`;

const ImageHere = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  > .MuiSvgIcon-root {
    position: absolute;
    width: 40px;
    height: 40px;
    top: -13px;
    right: -13px;
    background: #fff;
    border: 1px solid #666;
    border-radius: 50%;
    cursor: pointer;
    font-weight: 900;
    color: red;
    /* font-size: 10px; */
  }
`;

const FormCreate = styled.form`
  max-width:500px;
  min-width: 250px;
  width: 100%;
  height: 100%;
  margin: 15px 30px;
  >button {
    width:200px;
    height:40px;
    background: rgba(6,165,206,0.9);
    color: #fff;
    text-transform: uppercase;
    letter-spacing:2px;
    font-weight: 900;
    border-radius: 5px;
  }

`;

const FormCreateRow = styled.div`
  width: 100%;
  margin: 15px 0;
  >input,textarea{
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
    resize : none;
  }
  >textarea{
    padding-top: 5px;
  }
  >select{
    padding: 0 5px; 
    margin-left: 20px;
    height: 40px;
    min-width: 180px;
    max-width: 300px;
    >option{
      font-size: 20px;
      font-weight: 800;
    }
  }
`;

export default CreateProduct;
