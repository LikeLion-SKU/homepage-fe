import { useEffect, useState } from 'react';

export function useIsPhone() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 375);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 375);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
