import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuestGuard = ({ component: Component, isRestricted, ...rest }) => {
  const isAuth = window.localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        (isRestricted && isAuth) ?  <Redirect to="/todos" /> : <Component {...props} />
      }
    />
  );
};

export default GuestGuard;
