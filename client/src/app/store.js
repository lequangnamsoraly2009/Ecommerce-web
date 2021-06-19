import {configureStore} from "@reduxjs/toolkit";
import  productReducer from '../features/MainPage/pages/Products/productSlice';
import  userReducer from './authSlice';

// import  cartReducer from '../features/MainPage/pages/Cart/cartSlice';


export const store = configureStore({
    reducer:{ 
        product :  productReducer,
        user: userReducer,
    }
});