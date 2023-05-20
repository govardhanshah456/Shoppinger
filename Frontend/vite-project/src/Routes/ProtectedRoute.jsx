import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";

const ProtectedRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading === false) {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        return children;
    }
    else
        <Loader />
};

export default ProtectedRoute;