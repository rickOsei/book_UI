import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, users }) {
  // const users = useSelector((state) => state.auth.users);
  // const token = localStorage.getItem("token");
  const test = true;

  if (!test) {
    return <Navigate to="/login" replace="true" />;
  }

  return children;
}

export default ProtectedRoute;
