/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
 
const AuthenticatedRoutes = ({ authentication }) => {
  
  if (!authentication.isLoading) {
    return authentication.isLoggedIn ? <Outlet /> : <Navigate to='login' />
  }
  return null;
}

export default AuthenticatedRoutes;