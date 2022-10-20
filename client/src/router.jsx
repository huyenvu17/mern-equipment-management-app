import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./containers/404";
import Equipments from "./containers/Equipments";
import Login from "./containers/Login";
import Register from "./containers/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Equipments />,
    errorElement: <ErrorPage />,
  },
]);
