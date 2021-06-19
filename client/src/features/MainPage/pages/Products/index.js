import React, { useEffect } from 'react'
import ProductsAPI from '../../../../api/ProductsAPI';
import {useDispatch, useSelector} from 'react-redux'
import { loadProducts } from './productSlice';


function Products() {
    const dispatch = useDispatch();

    dispatch(loadProducts(ProductsAPI().products))

    return (
        <div>
            Products
        </div>
    )
}

export default Products
