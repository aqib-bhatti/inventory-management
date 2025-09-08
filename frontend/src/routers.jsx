import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import SalesManDashboard from "./pages/SalesManDashorad";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/salesdashboard" element={<SalesManDashboard />} />
      </Routes>
    </>
  );
};
 