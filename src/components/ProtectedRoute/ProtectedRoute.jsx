import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}
