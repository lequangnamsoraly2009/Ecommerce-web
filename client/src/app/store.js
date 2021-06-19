import {configureStore} from "@reduxjs/toolkit";
import  productReducer from '../features/MainPage/pages/Products/productSlice';
// import  cartReducer from '../features/MainPage/pages/Cart/cartSlice';


export default configureStore({
    reducer:{ 
        product :  productReducer,
        // cart : cartReducer
    }
})