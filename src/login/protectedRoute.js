import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, isAdmin, children }) => {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin !== undefined && !isAdmin) {
    return <Navigate to="/member/homeMember" />; // Redirect non-admin users if they try to access admin routes
  }

  return children;
};

export default ProtectedRoute;