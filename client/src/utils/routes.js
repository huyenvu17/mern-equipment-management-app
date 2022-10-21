import ErrorPage from "../containers/404";
import Employees from "../containers/Employees";
import Equipments from "../containers/Equipments";
import Login from "../containers/Login";
import Register from "../containers/Register";

export const pageRouter = [
  {
    path: "/",
    element: <Equipments />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];
