import React, { useEffect } from 'react';

import useScale from '@/components/main/hooks/useScale';
import { useDragScroll } from '@/hooks/useDragScroll';

import AwardCard from './AwardCard';
import DragCursor from './DragCursor';

function AwardCardList({ cards = [] }) {
  const scale = useScale();
  const { containerRef, cursorRef, clickGuard } = useDragScroll({
    inertia: true,
    inertiaFriction: 0.92,
    dragThreshold: 6,
    wheelToHorizontal: true,
  });

  useEffect(() => {
    // 수상작2 카드(인덱스 1)를 찾아서 중앙에 위치시키기
    const centerCardIndex = cards.findIndex((card) => card.hasDragButton);
    if (centerCardIndex !== -1 && containerRef.current) {
      const cardWidth = (699 / 16) * scale * 16; // px 단위로 변환
      const cardGap = (35 / 16) * scale * 16; // px 단위로 변환
      const viewportWidth = window.innerWidth;

      // 중앙 카드의 시작 위치 계산
      const targetScrollLeft =
        centerCardIndex * (cardWidth + cardGap) - viewportWidth / 2 + cardWidth / 2;

      containerRef.current.scrollLeft = targetScrollLeft;
    }
  }, [cards, scale, containerRef]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: `${(16 / 16) * scale}rem`,
        }}
        className="no-scrollbar award-drag-container"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: 'max-content',
          }}
        >
          {cards.map((card, index) => (
            <AwardCard key={index} title={card.title} image={card.image} onClick={clickGuard} />
          ))}
        </div>
      </div>
      {/* 커서 따라다니는 네모 박스 */}
      <DragCursor cursorRef={cursorRef} />
    </>
  );
}

export default AwardCardList;
