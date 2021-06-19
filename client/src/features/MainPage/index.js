import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/Products";
import DetailProduct from "./components/detailProduct";
import Cart from "./pages/Cart";
import NotFound from "../../components/NotFound";
import AuthUser from "./pages/Auth";

function MainPage() {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/user"  component={AuthUser} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPage;
