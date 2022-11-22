import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import Equipments from "./pages/Equipments";
import HomeLayout from "./components/HomeLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import IssueAndReturn from "./pages/IssueAndReturn";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />} errorElement={<Error />}>
            <Route index element={<IssueAndReturn/>} exact/>
            <Route path="/employees" element={<Employees />} />
            <Route path="/equipments"  element={<Equipments />}  />
            
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
