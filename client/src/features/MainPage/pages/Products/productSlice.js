import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
    },
    reducers: {
        loadProducts : (state,action) => {
            return {products: action.payload};
        }
    },
})

export const {loadProducts} = productSlice.actions;

export default productSlice.reducer;