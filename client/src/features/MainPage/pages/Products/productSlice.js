import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductsAPI from "../../../../api/ProductsAPI";

export const getProducts = createAsyncThunk(
  "products/getProducst",
  async (params,thunkAPI) => {
    const response =  await ProductsAPI.getProducts();
    return response;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
