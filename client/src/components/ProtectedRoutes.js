import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          currentUser ? <Component {...props} /> : <Navigate to="/" replace />
        }
      />
    </>
  );
};

export default ProtectedRoute;
