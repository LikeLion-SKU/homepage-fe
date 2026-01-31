import { useLayoutEffect, useRef, useState } from 'react';

function useScale(baseWidth = 1440) {
  const [scale, setScale] = useState(1);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    const calculate = () => {
      const vw = window.visualViewport?.width ?? document.documentElement.clientWidth; // innerWidth보다 안정적

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
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });

    //  폰트 로딩 이후에도 1회 재확정 (F12 새로고침에서 특히 도움)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(commit));
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseWidth]);

  return scale;
}

export default useScale;
