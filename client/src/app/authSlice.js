import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserAPI from "../api/UserAPI";

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (params, thunkAPI) => {
    const response = await UserAPI.refreshToken();
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    token: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [refreshToken.pending]: (state, action) => {
      state.loading = true;
    },
    [refreshToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
  },
});

// export const {} = productSlice.actions;

export default authSlice.reducer;
