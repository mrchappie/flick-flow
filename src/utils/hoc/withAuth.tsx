'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent: React.FC) {
  return function WithAuth(props: any) {
    const isAuth = false;
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.push('/login');
      }
    }, [isAuth, router]);

    return <WrappedComponent {...props} />;
  };
}
