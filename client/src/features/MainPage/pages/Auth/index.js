import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function AuthUser() {
  const match = useRouteMatch();
  console.log({ match });

  
  return (
    <Switch>
      <Redirect exact from="/user" to="/" />
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/register`} component={Register} />
    </Switch>
  );
}

export default AuthUser;
