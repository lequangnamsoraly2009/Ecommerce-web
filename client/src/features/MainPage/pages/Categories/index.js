import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";
import styled from "styled-components";
import axios from "axios";

function Categories() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  //   console.log(categories);

  if (categories.length === 0) return null;

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert("Update Category Successfully !!! ");
      } else {
        await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        alert("Add Category Successfully !!! ");
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleEditCategory = (e, id, name) => {
    e.preventDefault();
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <CategoriesContainer>
      <form onSubmit={createCategory}>
        <label htmlFor="category">NEW Category</label>
        <InputCate>
          <input
            type="text"
            name="category"
            value={category}
            //   checked
            required
            onChange={(e) => setCategory(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Add"}</button>
        </InputCate>
      </form>
      <CategoriesColumn>
        <h3>Available categories</h3>
        {categories.categories.map((item) => (
          <CategoriesRow key={item._id}>
            <p>{item.name}</p>
            <CategoriesActions>
              <button
                style={{ background: "#7ade98" }}
                onClick={(e) => handleEditCategory(e, item._id, item.name)}
              >
                Edit
              </button>
              <button
                style={{ background: "#f56767" }}
                onClick={(e) => handleDeleteCategory(e, item._id)}
              >
                Delete
              </button>
            </CategoriesActions>
          </CategoriesRow>
        ))}
      </CategoriesColumn>
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 50px 0;
  form {
    width: 300px;
    > label {
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
`;

const InputCate = styled.div`
  margin-top: 15px;
  > input {
    height: 30px;
    width: 220px;
    padding-left: 5px;
  }
  > button {
    margin-left: 10px;
    border: 1px solid #999;
    height: 30px;
    padding: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
      background-color: rgba(0, 165, 206, 0.3);
    }
  }
`;

const CategoriesColumn = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  > h3 {
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const CategoriesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  > p {
    font-size: 16px;
    text-transform: uppercase;
    color: rgba(0, 165, 245, 1);
    margin-top: 5px;
  }
`;

const CategoriesActions = styled.div`
  margin-left: 50px;
  button {
    height: 30px;
    width: 60px;
    margin: 0 10px;
    color: #111;
    border-radius: 5px;
  }
`;

export default Categories;
