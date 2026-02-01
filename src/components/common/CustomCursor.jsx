import { startTransition, useEffect, useState } from 'react';

import cursorIcon from '@/assets/icons/cursor-pointer.svg';
import useMediaQuery from '@/hooks/useMediaQuery';

import './CustomCursor.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  // 모바일(터치 디바이스) 체크: 작은 화면 또는 터치 가능한 디바이스
  const isMobile = useMediaQuery('(max-width: 768px) or (pointer: coarse)');

  useEffect(() => {
    // 모바일(터치 디바이스)에서는 커스텀 커서 비활성화
    if (isMobile) {
      startTransition(() => {
        setIsVisible(false);
      });
      return;
    }

    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // 모바일에서는 렌더링하지 않음
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isVisible ? 'visible' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <img
        src={cursorIcon}
        alt="cursor"
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 block"
      />
    </div>
  );
}

export default CustomCursor;
