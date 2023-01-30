import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, users }) {
  const token = localStorage.getItem("token");


  if (!token) {
    return <Navigate to="/login" replace="true" />;
  }

  return children;
}

export default ProtectedRoute;
