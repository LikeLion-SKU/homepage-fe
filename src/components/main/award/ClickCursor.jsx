import { useEffect } from 'react';

import useScale from '@/components/main/hooks/useScale';
import useMediaQuery from '@/hooks/useMediaQuery';

function ClickCursor({ cursorRef }) {
  const scale = useScale();
  // 모바일(터치 디바이스) 체크: 작은 화면 또는 터치 가능한 디바이스
  const isMobile = useMediaQuery('(max-width: 768px) or (pointer: coarse)');

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.setProperty('--scale', String(scale));
      // 모바일에서는 커서 숨기기
      if (isMobile) {
        cursorRef.current.style.opacity = '0';
        cursorRef.current.style.pointerEvents = 'none';
      }
    }
  }, [scale, cursorRef, isMobile]);

  // 모바일에서는 렌더링하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <div className="awards-click-cursor" ref={cursorRef} aria-hidden="true">
      <span className="awards-click-cursor-arrow awards-click-cursor-arrow-left">&lt;</span>
      <span className="awards-click-cursor-label">CLICK</span>
      <span className="awards-click-cursor-arrow awards-click-cursor-arrow-right">&gt;</span>
    </div>
  );
}

export default ClickCursor;
