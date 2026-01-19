import { useEffect, useState } from 'react';

import cursorIcon from '@/assets/icons/cursor-pointer.svg';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-opacity duration-100 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
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
