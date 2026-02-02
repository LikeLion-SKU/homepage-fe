import { useLayoutEffect, useRef, useState } from 'react';

function useScale(baseWidth = 1440) {
  const [scale, setScale] = useState(1);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const calculate = () => {
      // 브라우저 확대/축소에 반응하지 않도록 window.innerWidth 사용
      // visualViewport는 확대/축소 시 변경되므로 사용하지 않음
      const vw = window.innerWidth;

      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;

      return vw / (baseWidth * (rootFontSize / 16));
    };

    const commit = () => setScale(calculate());

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(commit);
    };

    commit(); //  paint 전에 1회 확정
    window.addEventListener('resize', onResize, { passive: true });
    // visualViewport resize 이벤트는 제거하여 브라우저 확대/축소 시 요소가 움직이지 않도록 함

    //  폰트 로딩 이후에도 1회 재확정 (F12 새로고침에서 특히 도움)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(commit));
    }

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseWidth]);

  return scale;
}

export default useScale;
