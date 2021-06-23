import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Products from "./pages/Products";
import DetailProduct from "./components/detailProduct";
import Cart from "./pages/Cart";
import NotFound from "../../components/NotFound";
import AuthUser from "./pages/Auth";
import { GlobalState } from "../../GlobalState";
import HistoryOrder from "./pages/HistoryOrder";
import HistoryDetail from "./components/HistoryDetail";
import Categories from "./pages/Categories";
import CreateProduct from "./pages/Products/CreateProduct";


function MainPage() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
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
            <Route path="/cart" exact component={Cart} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />

            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={HistoryOrder} />
            <Route path="/history/:id" component={HistoryDetail} />

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
