import { useEffect } from 'react';

import useScale from '@/components/main/hooks/useScale';

function ClickCursor({ cursorRef }) {
  const scale = useScale();

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.setProperty('--scale', String(scale));
    }
  }, [scale, cursorRef]);

  return (
    <div className="awards-click-cursor" ref={cursorRef} aria-hidden="true">
      <span className="awards-click-cursor-arrow awards-click-cursor-arrow-left">&lt;</span>
      <span className="awards-click-cursor-label">CLICK</span>
      <span className="awards-click-cursor-arrow awards-click-cursor-arrow-right">&gt;</span>
    </div>
  );
}

export default ClickCursor;
