import { useEffect, useState } from 'react';

function useScale(baseWidth = 1440) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const calculatedScale = windowWidth / (baseWidth * (rootFontSize / 16));
      setScale(calculatedScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [baseWidth]);

  return scale;
}

export default useScale;
