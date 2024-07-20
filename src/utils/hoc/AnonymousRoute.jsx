import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from 'utils/hooks/useAuthCheck';

function AnonymousRoute({ children, redirectTo }) {
  const navigate = useNavigate();
  const { user, authIsLoading } = useAuthCheck();
  console.log(user, authIsLoading);
  useEffect(() => {
    if (!authIsLoading) {
      // if auth state is not loading
      if (user) {
        // if we have an user authenticated redirect to homepage
        navigate('/home');
        return;
      }

      if (user === null) {
        // if user is authenticated redirect to home page
        navigate(redirectTo);
        return;
      }
    }
  }, [navigate, user, authIsLoading, redirectTo]);

  // Render children only when user is not null
  return children;
}

export default AnonymousRoute;
