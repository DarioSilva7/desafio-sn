import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/" }) => {
  // const { user } = useAuth();
  if (!isAllowed) {
    // user is not authenticated
    return <Navigate to={redirectTo} />;
  }
  if (children) return children;
  return <Outlet />;
};
