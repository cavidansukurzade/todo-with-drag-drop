// import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((store) => store.auth);
  if (!auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default PrivateRoute;
