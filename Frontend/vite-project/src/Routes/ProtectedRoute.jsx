import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";

const ProtectedRoute = ({ children }) => {
    const { loading, user } = useSelector((state) => state.user);
    // console.log(isAuthenticatedSeller)
    if (loading === true) {
        return <Loader />;
    } else {
        if (!user) {
            return <Navigate to={`/login`} replace />;
        }
        return children;
    }
};

export default ProtectedRoute;