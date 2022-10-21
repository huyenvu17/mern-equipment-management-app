import React from "react";
import { Route } from "react-router-dom";
import { pageRouter } from "../../utils/routes";
export default function MainRoute() {
  return pageRouter?.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
}
