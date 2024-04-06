import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from 'utils/hooks/useAuthCheck';
function PrivateRoute({ children }) {
  const navigate = useNavigate();

  const isAuthenticated =
    useAuthCheck(); /* Check if the user is authenticated */

  useEffect(() => {
    if (!isAuthenticated) {
      // if user is not logged in, redirect to login page
      navigate('/login');
      return;
    }
  }, [navigate, isAuthenticated]);

  return children;
}
export default PrivateRoute;
