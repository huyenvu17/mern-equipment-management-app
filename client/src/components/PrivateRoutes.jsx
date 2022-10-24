import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../utils/helper";

const PrivateRoutes = () => {
  const authToken = getAuthToken();
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
