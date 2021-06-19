// import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductsAPI  = {
    getProducts: async () => {
        const res = await axios.get('/api/products');
        return res.data.products;
    }
}

export default ProductsAPI
