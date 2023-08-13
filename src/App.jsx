import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import CreateService from "./pages/CreateService";

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/signup") {
      return;
    }

    if (!token) {
      return navigate("/");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/services/create" element={<CreateService />} />
    </Routes>
  );
}
