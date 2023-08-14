import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import CreateService from "./pages/CreateService";
import ViewService from "./pages/ViewService";
import MyServices from "./pages/MyServices";

export default function AppRoutes() {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/signup") {
      return;
    }

    if (!token) {
      return navigate("/");
    }

    if (userType != "freelancer") {
      if (userType != "customer") {
        return navigate("/");
      }
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/services/create" element={<CreateService />} />
      <Route path="/services/me" element={<MyServices />} />
      <Route path="/services/:id" element={<ViewService />} />
    </Routes>
  );
}
