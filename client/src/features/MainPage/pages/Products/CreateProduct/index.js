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

  return (
    <CreateProductContainer>
      <UploadImage>
        <input type="file" name="file" id="file_up" />
        <div id="file_img">
          <img src="" alt="" />
          <CloseIcon />
        </div>
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
          <input
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="content">Content</label>
          <input
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="category">Category</label>
          <select name="category" value={product.category}>
            <option value="">Please select a category</option>
            {
                categories.categories.map(category => (
                    <option value={category._id} key={category._id}>
                        {category.name.toUpperCase()}
                    </option>
                ))
            }
          </select>
        </FormCreateRow>
      </FormCreate>
    </CreateProductContainer>
  );
}

const CreateProductContainer = styled.div``;

const UploadImage = styled.div``;

const FormCreate = styled.form``;

const FormCreateRow = styled.div``;

export default CreateProduct;
