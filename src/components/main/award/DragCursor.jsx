import { useEffect } from 'react';

import useScale from '@/components/main/hooks/useScale';

function DragCursor({ cursorRef }) {
  const scale = useScale();

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.setProperty('--scale', String(scale));
    }
  }, [scale, cursorRef]);

  return (
    <div className="awards-drag-cursor" ref={cursorRef} aria-hidden="true">
      <span className="awards-drag-cursor-arrow awards-drag-cursor-arrow-left">&lt;</span>
      <span className="awards-drag-cursor-label">DRAG</span>
      <span className="awards-drag-cursor-arrow awards-drag-cursor-arrow-right">&gt;</span>
    </div>
  );
}

export default DragCursor;
