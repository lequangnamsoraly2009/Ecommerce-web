import { useEffect, useState } from 'react'
import axios from 'axios';

function CategoriesAPI() {
    const [categories,setCategories] = useState([]);
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () =>{
            const response = await axios.get('/api/category');
            setCategories(response.data);
        }   
        getCategories();
    },[callback])
    return {
        categories : [categories,setCategories],
        callback : [callback, setCallback] 
    }
}

export default CategoriesAPI