import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";

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

  // <Route path="/" element={} />

  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
