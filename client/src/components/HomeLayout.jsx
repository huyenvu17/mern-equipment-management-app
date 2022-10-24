import React from "react";
import Header from "./Header";
import PrivateRoutes from "./PrivateRoutes";

export default function HomeLayout() {
  return (
    <div>
      <Header />
      <PrivateRoutes />
    </div>
  );
}
