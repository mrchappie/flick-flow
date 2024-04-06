import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from 'utils/hooks/useAuthCheck';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { user, authIsLoading } = useAuthCheck();

  useEffect(() => {
    if (!authIsLoading) {
      // if auth state is not loading
      if (user) {
        // if we have an user authenticated redirect to homepage
        navigate('/home');
        return;
      }

      if (user === null) {
        // if user is not authenticated redirect to login page
        navigate('/login');
        return;
      }
    }
  }, [navigate, user, authIsLoading]);

  // Render children only when user is not null
  return children;
}

export default PrivateRoute;
