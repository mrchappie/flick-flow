import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollMemory() {
  const location = useLocation();

  useEffect(() => {
    const scrollPositionKey = `${location.pathname}${location.search}`;
    const scrollPosition = parseInt(
      window.sessionStorage.getItem(scrollPositionKey)
    );
    // console.log(scrollPosition);

    const saveScrollPostion = () => {
      if (typeof window.scrollY === 'number' && window.scrollY !== 0) {
        // console.log(scrollPositionKey);
        window.sessionStorage.setItem(
          scrollPositionKey,
          window.scrollY.toString()
        );
      } else {
        // console.log(scrollPositionKey, ' : ', scrollPosition);
      }
    };

    if (!scrollPosition) {
      // console.log(scrollPosition);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      // console.log(scrollPosition);
      window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: 'smooth',
      });
    }

    window.addEventListener('scroll', saveScrollPostion);

    return () => {
      window.removeEventListener('scroll', saveScrollPostion);
    };
  }, [location.pathname, location.search]);
}
