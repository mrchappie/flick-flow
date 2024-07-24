import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthCheck from 'utils/hooks/useAuthCheck';
import { getUserRole } from 'utils/services/auth/Auth';

function AdminRoute({ children }) {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  const { user, authIsLoading } = useAuthCheck();

  const [role, setRole] = useState(null);
  async function userRole() {
    const role = await getUserRole();
    setRole(role);
  }

  useEffect(() => {
    userRole();
  }, []);

  useEffect(() => {
    if (!authIsLoading) {
      // if auth state is not loading
      if (role === 'admin') {
        // console.log(role);
        // if we have an user authenticated redirect to homepage
        navigate(pathname);
        return;
      }

      if (role !== 'admin') {
        // if user is authenticated redirect to home page
        navigate('/home');
        return;
      }

      if (user === null) {
        // if user is authenticated redirect to home page
        navigate('/login');
        return;
      }
    }
  }, [navigate, user, authIsLoading, pathname, role]);

  // Render children only when user is not null
  return children;
}

export default AdminRoute;
