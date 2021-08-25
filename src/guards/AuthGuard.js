import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthGuard = ({ component: Component, ...rest }) => {
  const isAuth = window.localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AuthGuard;
