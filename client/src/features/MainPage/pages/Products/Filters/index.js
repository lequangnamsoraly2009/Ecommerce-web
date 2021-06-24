import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalState } from "../../../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleChangeCategory = (e)=>{
    setCategory(e.target.value)
    setSearch('');
  }

  return (
    <FilterContainer>
      <FilterRow>
        <span>Filter: </span>
        <select name="category" value={category} onChange={handleChangeCategory}>
          <option value="">All Products</option>
          {categories.categories?.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name.toUpperCase()}
            </option>
          ))}
        </select>
      </FilterRow>
      <input type="text" value={search} placeholder="Enter your search" onChange={e => setSearch(e.target.value.toLowerCase())}/>
      <FilterRow>
        <span>Sort By: </span>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </FilterRow>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
    width: 100%;
    min-height: 40px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px 0;
    >input,select{
        border: 1px solid #ccc;
        outline: none;
        height: 40px;
        padding: 0 5px;
        border-radius: 5px;
        
    }
    >input{
        flex: 1;
        margin: 0 10px;
    }
`;

const FilterRow = styled.div``;

export default Filters;
