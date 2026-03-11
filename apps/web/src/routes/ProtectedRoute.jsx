import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

export function ProtectedRoute({ children }) {
    const location = useLocation();
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}
