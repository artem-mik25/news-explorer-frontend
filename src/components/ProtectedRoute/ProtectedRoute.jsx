import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";

function ProtectedRoute({ isLoggedIn, isAuthChecked, onUnauthorized, children }) {
  useEffect(() => {
    if (isAuthChecked && !isLoggedIn) {
      onUnauthorized();
    }
  }, [isAuthChecked, isLoggedIn, onUnauthorized]);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
