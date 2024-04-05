import { useLayoutEffect } from 'react';
import { redirect } from 'react-router-dom';

export default function withAuth(WrappedComponentC) {
  return function WithAuth(props) {
    useLayoutEffect(() => {
      const isAuth = false;
      if (!isAuth) {
        redirect('/login');
      }
    }, []);

    return <WrappedComponentC {...props} />;
  };
}
