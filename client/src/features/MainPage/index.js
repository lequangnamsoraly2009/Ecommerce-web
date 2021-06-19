import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import NotFound from "../../components/NotFound";

function MainPage() {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default MainPage;
