import React from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

function Header() {
  return (
    <HeaderContainer>
      <HeaderMenu>
        <MenuIcon />
      </HeaderMenu>
      <HeaderLogo>
        <h1>
          <Link to="/">SORALY</Link>
        </h1>
      </HeaderLogo>
      <HeaderNavBars>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/user/login">LogIn</Link>
        </li>
        <li>
          <CloseIcon />
        </li>
      </HeaderNavBars>
      <HeaderCart>
        <span>0</span>
        <Link to='/cart'>
          <ShoppingCartIcon />
        </Link>
      </HeaderCart>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
    min-height: 70px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ddd;
`;



const HeaderMenu = styled.div`
display: none;
    > .MuiSvgIcon-root {
        height: 30px;
        width: 30px;
        vertical-align: middle;
        margin-right: 10px;
    }
`;

const HeaderLogo = styled.div`
    flex:1;
    h1 > a {
        text-transform: uppercase;
        color: #555;
    }
`;

const HeaderNavBars = styled.ul`
    > li {
        display: inline-block;
        opacity: 0.7;
        padding: 0 20px;
        :hover{
            opacity: 1;
        }
        >.MuiSvgIcon-root{
            display: none;
        }
    }
`;
const HeaderCart = styled.div`
    position: relative;
    margin-right: 20px;
    >span{
        background-color: crimson;
        border-radius: 20px;
        color: white;
        position: absolute;
        top: -13px;
        right: -10px;
        padding: 5px 7px;
        font-size: 11px;
    }
`;

export default Header;
