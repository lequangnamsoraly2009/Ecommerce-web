import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../../../GlobalState";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Loading from "../../../../../components/Loading";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  content: "",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const history = useHistory();
  const param = useParams();
  const [onEdit, setOnEdit] = useState(false);

  const [products] = state.productsAPI.products;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) {
        return alert("Warning: Access Denied");
      }
      const file = e.target.files[0];
      console.log(file);

      if (!file) {
        return alert("File is not exist");
      }

      if (file.size > 1024 * 1024) {
        return alert("File is too large");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("File is incorrect format");
      }

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setImages(response.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("Warning: Access Denied");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (!isAdmin) return alert("Warning: Access Denied");

      if (!images) return alert("HEY! Bro forgot to upload the picture");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setImages(false);
      setProduct(initialState);
      if(onEdit){
        alert("Update product successfully! GoodJob! ");

      }else{
        alert("Create product successfully! Congrats! ");

      }
      history.push("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <CreateProductContainer>
      <UploadImage>
        <input
          type="file"
          name="file"
          id="file_up"
          onChange={handleUploadFile}
        />
        {loading ? (
          <ImageHere id="file_img">
            <Loading />
          </ImageHere>
        ) : (
          <ImageHere id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <CloseIcon onClick={handleDeleteImage} />
          </ImageHere>
        )}
      </UploadImage>
      <FormCreate onSubmit={handleSubmitForm}>
        <FormCreateRow>
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            rows="5"
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
          />
        </FormCreateRow>
        <FormCreateRow>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name.toUpperCase()}
              </option>
            ))}
          </select>
        </FormCreateRow>
        <button type="submit">
          {onEdit ? "Update Product" : "Create Product"}
        </button>
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
  border: 1px solid #777;
  border-radius: 5px;
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
  max-width: 500px;
  min-width: 250px;
  width: 100%;
  height: 100%;
  margin: 15px 30px;
  > button {
    width: 200px;
    height: 40px;
    background: rgba(6, 165, 206, 0.9);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 900;
    border-radius: 5px;
  }
`;

const FormCreateRow = styled.div`
  width: 100%;
  margin: 15px 0;
  > input,
  textarea {
    width: 100%;
    min-height: 40px;
    padding: 0 5px;
    resize: none;
  }
  > textarea {
    padding-top: 5px;
  }
  > select {
    padding: 0 5px;
    margin-left: 20px;
    height: 40px;
    min-width: 180px;
    max-width: 300px;
    > option {
      font-size: 20px;
      font-weight: 800;
    }
  }
`;

export default CreateProduct;
