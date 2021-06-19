import React from 'react'
import styled from 'styled-components'
import LogoLoading from "../../statics/loading2.svg";

function Loading() {
    return (
        <LoadingContainer>
            <img src={LogoLoading} alt="" />
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    width: 300px;
    height: 300px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

export default Loading
