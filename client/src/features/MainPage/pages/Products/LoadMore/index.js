import React, { useContext } from 'react'
import styled from 'styled-components';
import {GlobalState} from '../../../../../GlobalState'


function LoadMore() {
    const state = useContext(GlobalState);
    const [page,setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <LoadMoreContainer>
            {
                result < page*9 ? "" : <button onClick={()=> setPage(page + 1)}>Load More</button>
            }
            
        </LoadMoreContainer>
    )
}

const LoadMoreContainer = styled.div`
    text-align: center;
    >button{
        padding: 10px 25px;
        margin-bottom: 20px;
        border: 1px solid #555;
        text-transform: capitalize;
        border-radius: 10px;
    }
`;

export default LoadMore
