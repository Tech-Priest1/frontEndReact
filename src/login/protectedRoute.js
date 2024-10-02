import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, isAdmin, children }) => {
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin !== undefined && !isAdmin) {
    return <Navigate to="/member/homeMember" />; // Redirect para membros
  }

  return children;
};

export default ProtectedRoute;