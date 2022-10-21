import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Employees from "./containers/Employees";
import Equipments from "./containers/Equipments";
import AuthLayout from "./containers/Layout/AuthLayout";
import HomeLayout from "./containers/Layout/HomeLayout";
import Login from "./containers/Login";
import { isAuthenticated } from "./utils/helper";
import { pageRouter } from "./utils/routes";

function App() {
  // return <RouterProvider router={router} />;
  return (
    <Router>
      <Routes>
        {/* {pageRouter?.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace={true} /> : <Login />
          }
        /> */}
        <Route element={HomeLayout}>
          <Route path="/" element={Equipments} />
          <Route path="/" element={Employees} />
        </Route>
        <Route element={AuthLayout}>
          <Route path="/login" element={Equipments} />
          <Route path="/register" element={Employees} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
