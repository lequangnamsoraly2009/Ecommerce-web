import React from 'react'
import styled from 'styled-components';

function Footer() {
    return (
        <FooterContainer>
            <p>CopyRight © 2021 - 2021 Ecommerce-App</p>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width: 100%;
    border-top:2px solid #555 ;
    padding-top: 20px;
    background-color: #999;
    height: 100px;
    display: flex;
    >p{
        align-items: center;
        margin: 0 auto;
        margin-top: 25px;
    }
`;

export default Footer
