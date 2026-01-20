import { useEffect, useState } from 'react';

import cursorIcon from '@/assets/icons/cursor-pointer.svg';

import './CustomCursor.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverDragArea, setIsOverDragArea] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // 드래그 스크롤 이벤트 리스너
    const handleDragStart = () => {
      setIsDragging(true);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    // Awards 드래그 영역 이벤트 리스너
    const handleDragHover = () => {
      setIsOverDragArea(true);
    };

    const handleDragLeave = () => {
      setIsOverDragArea(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('dragscroll:start', handleDragStart);
    window.addEventListener('dragscroll:end', handleDragEnd);
    window.addEventListener('dragscroll:hover', handleDragHover);
    window.addEventListener('dragscroll:leave', handleDragLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('dragscroll:start', handleDragStart);
      window.removeEventListener('dragscroll:end', handleDragEnd);
      window.removeEventListener('dragscroll:hover', handleDragHover);
      window.removeEventListener('dragscroll:leave', handleDragLeave);
    };
  }, []);

  const shouldHide = isDragging || isOverDragArea;

  return (
    <div
      className={`custom-cursor ${isVisible && !shouldHide ? 'visible' : ''}`}
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
