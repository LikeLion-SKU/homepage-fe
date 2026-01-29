import { useEffect, useState } from 'react';

export function useIsDesktop() {
  const [isMobile, setIsMobile] = useState(window.innerWidth > 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 760);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
