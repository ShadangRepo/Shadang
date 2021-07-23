import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "./AppContext";

const ProtectedRoute = ({
  component: Component,
  permission,
  location,
  path,
  exact = false,
  ...rest
}) => {
  const { user } = useContext(AppContext);
  const { pathname } = location;
  if (!Array.isArray(permission)) {
    permission = permission ? [permission] : null;
  }
  const redirectRoute =
    pathname.length > 1 ? `/login?redirect=${pathname}` : "/login";
  return (
    <Route path={path} exact={exact}>
      {user ? <Component {...rest} /> : <Redirect to={redirectRoute} />}
    </Route>
  );
};

export { ProtectedRoute };
