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
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/user" component={AuthUser} />
            <Route  component={NotFound} />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id"  component={DetailProduct} />
            <Route path="/cart"  component={Cart} />
            <Redirect from="user/login" to="/" />
            <Redirect from="user/register" to="/" />
            <Route  component={NotFound} />
          </Switch>
        </>
      )}
    </>
  );
}

export default MainPage;
