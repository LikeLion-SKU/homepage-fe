import { useEffect, useRef, useState } from 'react';

function useScale(baseWidth = 1440) {
  const [scale, setScale] = useState(1);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const calculatedScale = windowWidth / (baseWidth * (rootFontSize / 16));
      setScale(calculatedScale);
    };

    // 초기 계산
    calculateScale();

    // 리사이즈 이벤트 핸들러 (debounce 적용)
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        calculateScale();
      }, 16); // 약 60fps (16ms)
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [baseWidth]);

  return scale;
}

export default useScale;
