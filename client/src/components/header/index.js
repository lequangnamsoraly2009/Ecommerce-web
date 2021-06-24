import React, { useContext, useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { device } from "../../device";

function Header() {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLogged] = state.userAPI.isLogged;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutClick = async (e) => {
    e.preventDefault();
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const LoggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/history">History</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/" onClick={logoutClick}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <HeaderContainer>
      <HeaderMenu onClick={() => setMenu(!menu)}>
        <MenuIcon />
      </HeaderMenu>
      <HeaderLogo>
        <h1>
          <Link to="/">{isAdmin ? "ADMIN" : "SORALY"}</Link>
        </h1>
      </HeaderLogo>
      <HeaderNavBars style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {isLogged ? (
          LoggedRouter()
        ) : (
          <li onClick={() => setMenu(!menu)}>
            <Link to="/user/login">LogIn</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <CloseIcon />
        </li>
      </HeaderNavBars>
      {isAdmin ? (
        ""
      ) : (
        <HeaderCart>
          <span>{cart.length}</span>
          <Link to="/cart">
            <ShoppingCartIcon />
          </Link>
        </HeaderCart>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  @media ${device.tablet} {
    justify-content: space-between;
  }
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
  @media ${device.tablet} {
    display: block;
    cursor: pointer;
    position: absolute;
    top: 20px;
      left: 20px;
    > .MuiSvgIcon-root {
      height: 30px;
      width: 30px;
      vertical-align: middle;
      margin-right: 10px;
      
    }
  }
  display: none;
`;

const HeaderLogo = styled.div`
  @media ${device.tablet} {
    min-width: 115px;
    flex: none;
    margin: 0px auto;
    /* margin-left: 20px; */
  }
  flex: 1;
  h1 > a {
    text-transform: uppercase;
    color: #555;
  }
`;

const HeaderNavBars = styled.ul`
  @media ${device.tablet} {
    /* padding: 10px 0; */
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    opacity: 0.98;
    z-index: 99;
    transition: 0.5s ease-in;
    overflow-y: hidden;
    >li{
      display: flex;
      >.MuiSvgIcon-root{
        display: block !important;
        position: absolute;
        top:20px;
        right: 20px;
        cursor: pointer;
      }
    }
  }

  > li {
    display: inline-block;
    opacity: 0.7;
    padding: 0 20px;
    :hover {
      opacity: 1;
    }
    > .MuiSvgIcon-root {
      display: none;
    }
  }
`;
const HeaderCart = styled.div`
  position: relative;
  margin-right: 20px;
  > span {
    background-color: crimson;
    border-radius: 20px;
    color: white;
    position: absolute;
    top: -13px;
    right: -10px;
    padding: 5px 7px;
    font-size: 11px;
    font-weight: 900;
  }
`;

export default Header;
