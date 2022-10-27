import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/helper";

const PrivateRoutes = () => {
  const isAuthenicated = isAuthenticated();
  return isAuthenicated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
