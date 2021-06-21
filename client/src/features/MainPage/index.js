import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Products from "./pages/Products";
import DetailProduct from "./components/detailProduct";
import Cart from "./pages/Cart";
import NotFound from "../../components/NotFound";
import AuthUser from "./pages/Auth";
import { GlobalState } from "../../GlobalState";

function MainPage() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  return (
    <>
      {!isLogged ? (
        <>
          <Route path="/user" component={AuthUser} />
          <Route path="/" exact component={Products} />
          <Route path="*" exact component={NotFound} />
        </>
      ) : (
        <>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/cart" exact component={Cart} />
            <Redirect from="user/login" to="/" />
            <Redirect from="user/register" to="/" />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </>
      )}
    </>
  );
}

export default MainPage;
