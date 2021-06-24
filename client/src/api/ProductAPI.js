// import axios from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react'

function ProductAPI() {
    const [products,setProducts] = useState([]);
    const [callback,setCallback] = useState(false);

    const getProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data.products)
    }
    
    useEffect(()=>{
        getProducts();
    },[callback])
    

    return {
        products: [products,setProducts],
        callback: [ callback, setCallback]
    }
}

export default ProductAPI
